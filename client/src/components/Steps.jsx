import React from 'react'
import { stepsData } from '../assets/assets'
import { motion } from "motion/react"

const Steps = () => {
  return (  
    <motion.div 
      initial={{opacity:0.2, y:100}}
      transition={{duration:1}}
      whileInView={{opacity:1, y:0}}
      viewport={{once:true}}
      // Increased vertical padding for better section separation
      className="flex flex-col items-center justify-center my-32 px-6"
    >
      {/* SECTION HEADING (H1) - Good to go! */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-3 
                   text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-cyan-400
                   drop-shadow-[0_0_15px_rgba(168,85,247,0.8)] leading-tight tracking-wide">How It Works?</h1>
      
      {/* SUBTITLE - Good to go! */}
      <p className="text-gray-400 mb-14 text-lg italic 
                   drop-shadow-[0_0_5px_rgba(100,100,255,0.1)] tracking-wider">Transform words into stunning AI visuals</p>

      {/* OUTER CONTAINER: Use the dark background you introduced, and increase max-width */}
      <div 
        className="w-full max-w-4xl p-4 sm:p-8 
                   bg-gray-900 rounded-3xl border border-indigo-500/20 
                   shadow-[0_0_20px_rgba(99,102,241,0.2)]" // Enhanced shadow for an overall glow
      >
        {/* STEPS CONTAINER: Uses space-y to separate the individual step items */}
        <div className="space-y-4">
          {stepsData.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15, duration: 0.8, type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
              
              // *** STEP CARD STYLING - High-Tech, Interactive Modules ***
              className="flex items-center gap-6 p-4 sm:p-6 rounded-2xl 
                         relative overflow-hidden group 
                         bg-gray-800/80 hover:bg-gray-800 transition-colors duration-300"
            >
              {/* Step Number/Indicator - New Glowing Accent */}
              <div 
                className="absolute left-0 top-0 bottom-0 w-1.5 
                           bg-gradient-to-b from-indigo-500 to-cyan-400 
                           group-hover:w-2 transition-all duration-300" 
              />
              
              {/* Icon - Increased size, color filter, and a small rotation effect */}
              <img 
                width={56} // Larger icon size
                src={item.icon} 
                className="filter invert drop-shadow-[0_0_8px_rgba(99,102,241,0.5)] 
                           group-hover:rotate-6 transition-transform duration-500 ml-4" // ml-4 to offset the accent
              />
              
              {/* Text Content */}
              <div>
                {/* Title - Gradient text for prominence */}
                <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-cyan-300 mb-0.5">
                  {item.title}
                </h2>
                {/* Description - Lighter text for good contrast */}
                <p className="text-gray-300 text-sm">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default Steps