import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'motion/react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const GenerateBtn = () => {
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
  initial={{opacity:0.2, y:100}}
  transition={{duration:1}}
  whileInView={{opacity:1, y:0}}
  viewport={{once:true}}
  className="pb-20 text-center"
>
  <h1 className="text-3xl md:text-4xl font-bold text-gray-100 mb-10">
    See the Magic. Try Now
  </h1>

  <button 
    onClick={onClickHandler}
    className="px-10 py-5 rounded-full text-white font-bold 
bg-gradient-to-r from-purple-500 via-cyan-400 to-blue-500 
hover:from-blue-500 hover:to-purple-500 
shadow-[0_0_15px_rgba(147,51,234,0.5)] 
hover:shadow-[0_0_25px_rgba(56,189,248,0.8)] 
transition-all duration-500 animate-gradient-x">
    Generate Images
    <img src={assets.star_group} alt="" className="h-6"/>
  </button>
</motion.div>

  )
}

export default GenerateBtn
