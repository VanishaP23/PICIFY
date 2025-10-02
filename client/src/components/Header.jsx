import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'motion/react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Header = () => {

  const { user, setShowLogin } = useContext(AppContext)
  const navigate = useNavigate()

  const onClickHandler = () => {
    if (user) {
      navigate('/result')
    } else {
      setShowLogin(true)
    }
  }

  return (
    <motion.div 
  className="flex flex-col justify-center items-center text-center my-20 bg-black "
  initial={{ opacity: 0.2, y: 100 }}
  transition={{ duration: 1 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
>
  {/* Badge */}
  <motion.div 
    className="inline-flex items-center gap-2 bg-black backdrop-blur-md px-6 py-1 rounded-full border border-white/20 text-gray-300 text-sm"
    initial={{ opacity: 0.2, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6, duration: 0.8 }}
  >  
    <p>Best text to image generator</p>
    <img src={assets.star_icon} alt=""/>
  </motion.div>

  {/* Heading */}
  <motion.h1 className="text-5xl sm:text-7xl font-extrabold leading-tight mt-10 max-w-3xl text-gray-100">
    Turn Text into{" "}
    <motion.span 
      className="bg-gradient-to-r from-indigo-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent"
      initial={{opacity:0}}
      animate={{opacity:1}}
      transition={{delay:0.8, duration:2}}
    >
      Images
    </motion.span>
    , Instantly.
  </motion.h1>

  {/* Subtitle */}
  <motion.p 
    className="text-gray-400 text-lg mt-6 max-w-xl"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1, duration: 0.8 }}
  >
    Unleash your creativity with AI. Transform imagination into visuals in seconds — just type, and watch the magic happen.
  </motion.p>

  {/* CTA Button */}
  <motion.button 
    onClick={onClickHandler} 
    className="sm:text-lg mt-10 px-10 py-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 text-white font-semibold shadow-lg hover:shadow-[0_0_25px_rgba(99,102,241,0.8)] transition-all duration-300"
    whileHover={{ scale: 1.08 }}
    whileTap={{ scale: 0.97 }}
  >
    Generate Images <img src={assets.star_icon} alt="" className="inline w-5"/>
  </motion.button>

  {/* Sample images */}
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.2 , duration: 1 }}
    className="flex flex-wrap justify-center mt-16 gap-3"
  >
    {Array(6).fill('').map((item, index) => (
      <motion.img 
        whileHover={{ scale: 1.10 }}
        className="rounded-lg border border-white/10 hover:shadow-[0_0_15px_rgba(168,85,247,0.6)] transition-all duration-300 cursor-pointer max-sm:w-10" 
        src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1} 
        alt="" 
        key={index} 
        width={150} 
      />
    ))}
  </motion.div>

  <motion.p 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.4 , duration: 0.8 }}
    className="mt-5 text-gray-400"
  >
    Generated with <span className="text-indigo-400">PICIFY</span>
  </motion.p>
</motion.div>

  )
}

export default Header
