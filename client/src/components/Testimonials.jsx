import React from 'react'
import { testimonialsData, assets } from '../assets/assets'
import { motion } from 'motion/react'

const Testimonials = () => {
  return (
    <motion.div 
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center my-20 py-12 px-6"
    >
      {/* Heading - Changed text-gray-800 to text-gray-100 */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-3 
                   text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-cyan-400
                   drop-shadow-[0_0_15px_rgba(168,85,247,0.8)] leading-tight tracking-wide">
        Customer Testimonials {/* Changed to indigo-400 for better contrast */}
      </h1>
      {/* Subtitle - Changed text-gray-500 to text-gray-400 */}
      <p className="text-gray-400 mb-14 text-lg italic 
                   drop-shadow-[0_0_5px_rgba(100,100,255,0.1)] tracking-wider">
        What our users are saying
      </p>

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-8">
        {testimonialsData.map((testimonial, index) => (
          <div 
            key={index} 
            // *** CRITICAL CHANGES HERE: Replaced bg-white/70 with a dark background ***
            // Added bg-gray-900, border-white/10, and removed light shadow
            className="bg-gray-900 p-8 rounded-2xl shadow-xl w-80 
                       cursor-pointer transition-all duration-300 hover:scale-[1.05] 
                       hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] border border-white/10"
          >
            {/* Profile */}
            <div className="flex flex-col items-center">
              <img 
                src={testimonial.image} 
                alt={testimonial.name} 
                className="rounded-full w-16 h-16 ring-2 ring-indigo-400" // Changed ring color for better contrast
              />
              <div className="text-center mt-4">
                {/* Name - Changed text-gray-800 to text-gray-100 */}
                <h2 className="text-xl font-semibold text-gray-100">{testimonial.name}</h2>
                {/* Role - Changed text-gray-500 to text-gray-400 */}
                <p className="text-gray-400 text-sm">{testimonial.role}</p>
              </div>
            </div>

            {/* Stars - You might need to add a 'filter-invert' to the star image if it's dark */}
            <div className="flex justify-center my-4">
              {Array(testimonial.stars).fill().map((_, i) => (
                <img 
                  key={i} 
                  src={assets.rating_star} 
                  alt="star" 
                  className="w-5 h-5 filter-invert" // Added filter-invert
                />
              ))}
            </div>

            {/* Testimonial text - Changed text-gray-600 to text-gray-300 */}
            <p className="text-center text-gray-300 text-sm leading-relaxed">
              “{testimonial.text}”
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default Testimonials