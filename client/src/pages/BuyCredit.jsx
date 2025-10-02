import React, { useContext } from 'react'
import { assets, plans } from '../assets/assets'
import { motion } from 'motion/react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const BuyCredit = () => {
  const { user, backendUrl, token, setShowLogin, loadCreditsData } = useContext(AppContext)
  const navigate = useNavigate()

  // --- Payment Logic (Kept unchanged) ---
  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Credits Payment',
      description: 'Credits Payment',
      order_id: order.id,
      handler: async (response) => {
        try {
          const {data}=await axios.post(backendUrl+ 'api/user/verify-razor', response,
            {headers:{token}})
            if(data.success){
              loadCreditsData();
              navigate('/')
              toast.success("Credit Added")
            }
        } catch (error) {
          toast.error(error.message)
        }
      },
      prefill: {
        email: user?.email,
        name: user?.name
      },
      theme: { color: '#1e293b' }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const paymentRazorpay = async (planId) => {
    try {
      if (!user) return setShowLogin(true)

      const plan = plans.find(p => p.id === planId)
      if (!plan) return toast.error('Invalid plan selected')

      const { data } = await axios.post(
        backendUrl + 'api/user/pay-razor',
        {
          planId: plan.id,
          amount: plan.price,
          credits: plan.credits
        },
        { headers: { token } }
      )

      if (data.success) initPay(data.order)
    } catch (error) {
      toast.error(error.response?.data?.error || error.message)
    }
  }
  // --- End Payment Logic ---

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className='min-h-[80vh] text-center pt-14 mb-10'
    >
      {/* BADGE/BUTTON: Enhanced to match the theme */}
      <button className='inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-8 py-2 rounded-full border border-indigo-400/50 text-indigo-300 text-sm mb-8
                         shadow-[0_0_10px_rgba(99,102,241,0.5)]'>
        <img src={assets.star_icon} alt="" className='w-4 filter invert'/>
        Our Plans
      </button>

      {/* H1 HEADING: Applied gradient and glow theme */}
      <h1 className='text-center text-4xl sm:text-5xl font-extrabold mb-10 
                   text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-cyan-400
                   drop-shadow-[0_0_15px_rgba(168,85,247,0.8)] leading-tight tracking-wide'>
        Choose the Perfect Plan
      </h1>

      {/* PLANS CONTAINER: Added md:flex-nowrap to force side-by-side view on desktop */}
      <div className='flex flex-wrap md:flex-nowrap justify-center gap-8 text-left'>
        {plans.map((item, index) => (
          // CARD STYLING: Dark, high-tech card design
          <div
            key={index}
            className={`
              relative group overflow-hidden w-full max-w-xs md:max-w-none
              bg-gray-900/80 rounded-2xl p-8 lg:p-10 text-gray-200 border border-gray-700
              shadow-lg hover:shadow-2xl hover:shadow-cyan-900/40 
              transition-all duration-500 hover:scale-[1.03] cursor-pointer
              ${index === 1 ? 'border-cyan-400 border-2 shadow-[0_0_20px_rgba(34,211,238,0.5)]' : ''} 
              `} // Highlight the middle card
          >
            {/* ICON: Inverted and added drop shadow */}
            <img 
              width={50} 
              src={assets.logo_icon} 
              alt="lock" 
              className='filter invert drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]'
            />
            
            {/* Plan ID - Gradient Text */}
            <p className='mt-5 mb-1 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-cyan-300'>
              {item.id}
            </p>
            
            {/* Description */}
            <p className='text-sm text-gray-400'>{item.desc}</p>
            
            {/* Price/Credits */}
            <p className='mt-8'>
              <span className='text-4xl font-extrabold text-white'>₹{item.price}</span>
              <span className='text-gray-400'> / {item.credits} credits</span>
            </p>
            
            {/* BUTTON: Vibrant gradient button */}
            <button
              onClick={() => paymentRazorpay(item.id)}
              className='w-full mt-10 text-white text-base rounded-lg py-3 min-w-52 font-semibold 
                         bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400
                         hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] transition-all duration-300'
            >
              {user ? 'Purchase' : 'Get Started'}
            </button>
            
            {/* BEST VALUE BADGE */}
            {index === 1 && (
              <div className='absolute top-0 right-0 bg-cyan-500 text-gray-900 text-xs font-bold px-3 py-1 rounded-bl-lg'>
                Best Value
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default BuyCredit