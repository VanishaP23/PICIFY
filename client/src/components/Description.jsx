import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'motion/react'

const Description = () => {
  return (
    <motion.div
      initial={{opacity:0.2, y:100}}
      transition={{duration:1}}
      whileInView={{opacity:1, y:0}}
      viewport={{once:true}}
      // Increased vertical padding (my-32) for better separation
      className="flex flex-col items-center justify-center my-32 p-6 md:px-28"
    >
      {/* SECTION HEADING: Subtle glow added */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-3 
                   text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-cyan-400
                   drop-shadow-[0_0_15px_rgba(168,85,247,0.8)] leading-tight tracking-wide">
        Create AI Images
      </h1>
      <p className="text-gray-400 mb-14 text-lg italic 
                   drop-shadow-[0_0_5px_rgba(100,100,255,0.1)] tracking-wider">
        Turn your imagination into visuals
      </p>

      {/* CONTENT BLOCK: Added a dark, card-like background and border for definition */}
      <div 
        className="flex flex-col gap-10 md:gap-20 md:flex-row items-center p-8 lg:p-12 
                   bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-indigo-500/30 
                   shadow-2xl shadow-indigo-900/40 transition-all duration-500 hover:border-cyan-400/50"
      >
        
        {/* IMAGE BLOCK: Enhanced border, shadow, and hover effect */}
        <motion.img 
          // New shadow and scale on hover for a dynamic effect
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(99, 102, 241, 0.6)' }}
          transition={{ duration: 0.3 }}
          src={assets.description_img} 
          className="w-80 xl:w-96 rounded-xl border-4 border-indigo-500/50 shadow-2xl shadow-indigo-900/50 cursor-pointer"
        />

        {/* TEXT CONTENT */}
        <div>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-6 max-w-lg">
            Introducing the AI-Powered Text to Image Generator
          </h2>
          <p className="text-gray-300 mb-4 border-l-4 border-purple-500 pl-4">
            Easily bring your ideas to life with our free AI image generator. From product visuals to creative concepts, transform text into eye-catching visuals instantly.
          </p>
          <p className="text-gray-400 pl-4 italic">
            Just type a prompt and our advanced AI model generates high-quality images in seconds. Limitless creativity, powered by AI.
          </p>
          {/* Optional: Add a subtle divider */}
          <div className="w-1/3 h-px bg-white/10 mt-6"/> 
        </div>
      </div>
    </motion.div>
  )
}

export default Description