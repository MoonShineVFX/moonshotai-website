import React from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
function FrontPage({handleClick}) {
  return (
    <div 
      className='min-h-[90svh] h-[100vh] relative '
    >
      <motion.div
        className='min-h-[90svh] w-full aspect-[9/16] h-[100vh] bg-cover bg-center bg-no-repeat brightness-75 '
        style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/images/camera_page/Background.png'})`}}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
      </motion.div>
      <div class="bg-gradient-to-t from-black  absolute w-full h-[50vh] bottom-0"></div>
      <div className='absolute bottom-0 mb-32 flex flex-col w-full  justify-start px-5 z-50'>
        <motion.div 
          className='text-[2.8rem] font-black leading-none '
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        > 
          <div>Moonshot </div>
          <div>AI CAMERA</div>   
        </motion.div>
        <motion.div 
          className='text-lg font-bold my-4 text-zinc-200 '
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >開啟你的相機看看 AI 給你什麼驚喜吧！</motion.div>
        
        <motion.div 
          className="text-white backdrop-blur-sm bg-white/30 border-1 border-white/80 shadow-[.7px_-.8px_6px_1px_rgba(255,255,255,0.9)]  font-medium rounded-full text-lg px-8 py-4 text-center  flex items-center justify-center gap-2  w-3/5 ml-auto mt-10"
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