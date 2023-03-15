import React from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
function FrontPage({handleClick}) {
  return (
    <div 
      className='min-h-[100svh] relative '
    >
      <motion.div
        className='min-h-[100svh] bg-cover bg-center bg-no-repeat brightness-75 '
        style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/images/camera_page/Background.png'})`}}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
      </motion.div>
      <div class="bg-gradient-to-t from-black  absolute w-full h-[50vh] bottom-0"></div>
      <div className='absolute bottom-0 mb-32 flex flex-col w-full  justify-start px-5 z-50'>
        <motion.div 
          className='text-[5rem] font-black leading-none '
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div>AI</div>   
          <div>CAMERA</div> 
        </motion.div>
        <motion.div 
          className='text-lg font-bold my-4 text-zinc-200 '
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >拿起你的相機，創建屬於自己的 AI 圖吧！</motion.div>
        <motion.div 
          className="text-white backdrop-blur-sm bg-white/30 border border-white/50  font-medium rounded-full text-lg px-8 py-4 text-center  flex items-center justify-center gap-2  w-3/5 ml-auto mt-10"
          initial={{ opacity: 0, x: '-40px' }}
          animate={{ opacity: 1, x: 0  , transition:{delay:.5, duration:.8}}}
          exit={{ opacity: 0 }}
          
          onClick={handleClick}
        >
            Get Started <FaArrowRight />
        </motion.div>

      </div>


    </div>
  )
}

export default FrontPage