import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const { user, setShowLogin, logout, credit } = useContext(AppContext)
  const navigate = useNavigate()

  return (
    // Added text-white to the main container to ensure all unstyled text is light.
    // Added border-b and border-white/10 for a subtle futuristic separator.
    <div className='flex items-center justify-between py-4 text-white border-b border-white/10'> 
      <Link to='/'>
        <img src={assets.logo} alt="" className='w-28 sm:w-32 lg:w-40' /> 
      </Link>

      <div>
        {user ? (
          <div className='flex items-center gap-2 sm:gap-3'>
            <button
              onClick={() => navigate('/buy')}
              // Changed bg-blue-100 to a dark, contrasting background
              className='flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full
                         hover:scale-105 transition-all duration-700'
            >
              <img className='w-5' src={assets.credit_star} alt="" />
              {/* Changed text-gray-600 to text-white for visibility */}
              <p className='text-xs sm:text-sm font-medium text-white'>
                Credits left : {credit}
              </p>
            </button>

            {/* Changed text-gray-600 to text-gray-400 for visibility */}
            <p className='text-gray-400 max-sm:hidden pl-4'>Hi, {user.name}</p>

            <div className='relative group'>
              <img src={assets.profile_icon} className='w-10 drop-shadow filter-invert' alt="" /> {/* Added filter-invert if icon is dark */}
              {/* The logout dropdown will still be white with black text, which is fine for visibility */}
              <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
                  <li onClick={logout} className='py-1 px-2 cursor-pointer pr-10'>
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className='flex items-center gap-2 sm:gap-5'>
            {/* Changed 'Pricing' text color for visibility */}
            <p onClick={() => navigate('/buy')} className='cursor-pointer text-gray-200 hover:text-indigo-400 transition-colors'>
              Pricing
            </p>
            <button
              onClick={() => setShowLogin(true)}
              // Changed the login button to use your primary gradient colors
              className='bg-gradient-to-r from-indigo-500 to-cyan-400 text-white 
                         px-7 py-2 sm:px-7 text-sm rounded-full 
                         hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all duration-300'
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar