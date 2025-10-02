import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'motion/react'
import { AppContext } from '../context/AppContext'

const Result = () => {

    const [image, setImage] = useState(assets.result_img)
    const [isImageLoaded, setIsIamgeLoaded] = useState(false)
    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState('')

    const { generateImage } = useContext(AppContext)

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        if (input) {
            const resultImage = await generateImage(input)
            if (resultImage) {
                setIsIamgeLoaded(true)
                setImage(resultImage)
            }
        }
        setLoading(false)
    }

    return (
        <motion.form
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='flex flex-col min-h-[90vh] justify-center items-center p-4'
            onSubmit={onSubmitHandler}
        >
            {/* IMAGE DISPLAY CONTAINER */}
            <div className='flex flex-col items-center mb-10'>
                <div className='relative'>
                    {/* Image Styling: Stronger border/glow effect */}
                    <img
                        src={image}
                        className='max-w-xs sm:max-w-sm md:max-w-md rounded-xl border-4 border-indigo-500/50 
                                   shadow-2xl shadow-indigo-900/50 transition-all duration-500'
                        alt="Generated Image"
                    />

                    {/* Loading Bar: Enhanced color and glow */}
                    <span
                        className={`absolute bottom-0 left-0 h-1.5 
                                    bg-gradient-to-r from-cyan-400 to-indigo-500 
                                    drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] rounded-bl-lg
                                    ${loading ? 'w-full transition-all duration-[10s]' : 'w-0'}`}
                    />
                </div>

                {/* Loading Text: Centered and styled */}
                <p className={!loading ? 'hidden' : 'mt-4 text-xl text-indigo-400 font-semibold drop-shadow-[0_0_5px_rgba(99,102,241,0.5)]'}>
                    Generating Creativity...
                </p>
            </div>

            {/* --- INPUT FORM (Before image is loaded) --- */}
            {!isImageLoaded &&

                // 1. INPUT BAR CONTAINER: Increased max width from xl to 3xl for more space.
                // Reduced horizontal padding from 'p-1' to 'py-1 px-1' and increased horizontal padding on the input itself.
                <div className='flex w-full max-w-3xl bg-gray-900 text-white text-base py-1 px-1 mt-10 rounded-full 
                                border border-indigo-500 shadow-xl shadow-indigo-900/50'>
                    <input
                        onChange={e => setInput(e.target.value)}
                        value={input}
                        type="text"
                        placeholder={loading ? 'Please wait...' : 'Describe what you want to generate'}
                        disabled={loading}
                        // 2. INPUT FIELD FIX: Use flex-grow and w-0 to claim all available space.
                        // Removed ml-6 and added px-4 for better padding control.
                        className='w-0 flex-grow bg-transparent outline-none px-4 placeholder-gray-400 disabled:opacity-50'
                    />

                    {/* Generate Button Styling: Removed the extra padding (sm:px-12) to make it slightly smaller */}
                    <button
                        type='submit'
                        disabled={loading}
                        className='px-8 py-3 rounded-full text-white font-semibold whitespace-nowrap 
                                   bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 
                                   hover:shadow-[0_0_15px_rgba(168,85,247,0.7)] transition duration-300 disabled:opacity-50'
                    >
                        {loading ? 'Generating...' : 'Generate'}
                    </button>
                </div>}

            {/* --- POST-GENERATION BUTTONS (After image is loaded) --- */}
            {isImageLoaded &&
                <div className='flex gap-4 flex-wrap justify-center text-white text-base mt-10'>

                    {/* Generate Another Button: Inverted styling for a secondary action */}
                    <p onClick={() => { setIsIamgeLoaded(false); setInput(''); }}
                        className='bg-transparent border-2 border-indigo-500 text-indigo-400 px-8 py-3 
                                   rounded-full cursor-pointer hover:bg-indigo-500/20 transition duration-300'>
                        Generate Another Prompt
                    </p>

                    {/* Download Button: Primary action style */}
                    <a href={image} download
                        className='bg-gradient-to-r from-cyan-500 to-indigo-500 px-10 py-3 rounded-full cursor-pointer 
                                   font-semibold hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] transition duration-300'>
                        Download Image
                    </a>
                </div>}
        </motion.form>
    )
}

export default Result