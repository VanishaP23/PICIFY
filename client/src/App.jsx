import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home'
import BuyCredit from './pages/BuyCredit'
import Result from './pages/Result'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import { AppContext } from './context/AppContext'


const App = () => {
  const { showLogin } = useContext(AppContext)

  return (
    // PRIMARY CONTAINER: Use Flexbox to stack items vertically and fill the screen
    <div className="relative min-h-screen w-screen overflow-hidden px-4 sm:px-10 md:px-14 lg:px-28 bg-black text-gray-200 flex flex-col">

      {/* 🔮 Futuristic Glow Backgrounds (Keep these) */}
      <div className="absolute inset-0 -z-10">
        {/* Glowing purple orb */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 opacity-20 rounded-full blur-3xl animate-pulse"></div>

        {/* Glowing cyan orb */}
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-400 opacity-20 rounded-full blur-3xl animate-pulse"></div>

        {/* Subtle starry dots */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#22d3ee_1px,transparent_0)] bg-[length:20px_20px] opacity-10"></div>
      </div>

      {/* Toast notifications */}
      <ToastContainer position="bottom-right" />

      {/* Navbar (Stays at the top) */}
      <Navbar />

      {/* Login Popup */}
      {showLogin && <Login />}

      {/* NEW MAIN CONTENT WRAPPER: Takes up all available space and centers its content */}
      <main className="flex-grow flex flex-col justify-center items-center w-full 
                           sm:justify-center md:justify-center lg:justify-center 
                           min-h-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/buy" element={<BuyCredit />} />
            <Route path="/result" element={<Result />} />
          </Routes>
      </main>

      {/* Footer (Pushed to the bottom) */}
      <Footer />
    </div>
  )
}

export default App

