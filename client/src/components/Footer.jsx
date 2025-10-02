import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    // Ensured the container takes up the full width, which is likely already happening.
    <div className='flex items-center justify-between gap-4 py-3 mt-20 bg-black'>
      {/* Again, check if the logo needs a filter-invert if it's a dark logo */}
      <img src={assets.logo} alt="" width={150}/>
      
      {/* Changed border-gray-400 to a lighter border and text-gray-500 to text-gray-400 */}
      <p className='flex-1 border-l border-white/20 pl-4 text-sm text-gray-400 max-sm:hidden'>
        Copyright @Vanisha_Pathak All rights reserved.</p>
        
      {/* The social media icons (assets.facebook_icon) might also need a filter-invert 
          if they are dark icons and you want them to be white on the black background. */}
      <div className='flex gap-2.5'>
        {/* If the icon is a dark color, apply 'filter-invert' to make it light */}
        <img src={assets.facebook_icon} alt="" width={35} className='filter-invert'/> 
        <img src={assets.facebook_icon} alt="" width={35} className='filter-invert'/> 
        <img src={assets.facebook_icon} alt="" width={35} className='filter-invert'/>
      </div>
    </div>
  )
}

export default Footer