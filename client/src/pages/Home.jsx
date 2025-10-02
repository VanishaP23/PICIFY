import React from 'react'
import Header from '../components/Header'
import Steps from '../components/Steps'
import Description from '../components/Description'
import Testimonials from '../components/Testimonials'
import GenerateBtn from '../components/GenerateBtn'

const Home = () => {
  return (
    /* w-screen ensures the black background spans the viewport width */
    <div className="min-h-screen w-screen bg-black text-gray-200 flex flex-col justify-center items-center">
      {/* Center your page content while background stays full width */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <Header/>
        <Steps/>
        <Description/>
        <Testimonials/>
        <GenerateBtn/>
      </div>
    </div>
  )
}

export default Home
