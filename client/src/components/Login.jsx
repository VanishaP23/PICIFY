import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { motion } from 'motion/react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [state, setState] = useState('Login');
  const { setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === 'Login') {
        const { data } = await axios.post(backendUrl + 'api/user/login', { email, password });

        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem('token', data.token); // ✅ fixed here
          setShowLogin(false);
          toast.success('Login Successful');
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + 'api/user/register', { name, email, password });

        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem('token', data.token);
          setShowLogin(false);
          toast.success('Account Created Successfully');
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm'>
      <motion.form
        onSubmit={onSubmitHandler}
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className='relative bg-white p-10 rounded-xl text-slate-500 shadow-lg'
      >
        <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
        <p className='text-sm mb-4'>Welcome Back! Please Sign In to continue</p>

        {state !== 'Login' && (
          <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
            <img src={assets.user_icon} alt='user' className='w-5' />
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type='text'
              className='outline-none text-sm flex-1'
              placeholder='Full Name'
              required
            />
          </div>
        )}

        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
          <img src={assets.email_icon} alt='email' className='w-5' />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type='email'
            className='outline-none text-sm flex-1'
            placeholder='Email Id'
            required
          />
        </div>

        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
          <img src={assets.lock_icon} alt='lock' className='w-5' />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type='password'
            className='outline-none text-sm flex-1'
            placeholder='Password'
            required
          />
        </div>

        <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forgot Password?</p>
        <button className='bg-blue-600 w-full text-white py-2 rounded-full'>
          {state === 'Login' ? 'Login' : 'Create Account'}
        </button>

        {state === 'Login' ? (
          <p className='mt-5 text-center'>
            Don't have an Account?
            <span className='text-blue-600 cursor-pointer' onClick={() => setState('Sign Up')}>
              {' '}
              Sign Up
            </span>
          </p>
        ) : (
          <p className='mt-5 text-center'>
            Already have an Account?
            <span className='text-blue-600 cursor-pointer' onClick={() => setState('Login')}>
              {' '}
              Login
            </span>
          </p>
        )}

        <img
          onClick={() => setShowLogin(false)}
          src={assets.cross_icon}
          alt='close'
          className='absolute top-5 right-5 cursor-pointer'
        />
      </motion.form>
    </div>
  );
};

export default Login;
