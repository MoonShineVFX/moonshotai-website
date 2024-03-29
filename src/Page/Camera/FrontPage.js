import React,{useEffect} from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
function FrontPage({handleClick}) {
  useEffect(()=>{
    fetch(process.env.PUBLIC_URL+'/images/test/00127-2318642455.png')
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const image = new Image();
        image.onload = () => {
          console.log("Image width: ", image.width);
          console.log("Image height: ", image.height);
        };
        console.log(blob)
      });
  },[])
  return (
    <div 
      className='min-h-[90svh] h-[100vh] relative landscape:bg-white'
    >
      <motion.div
        className='min-h-[90svh] w-full aspect-[9/16] h-[100vh] bg-cover bg-center bg-no-repeat brightness-75 landscape:bg-[center_top_-32rem] '
        style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/images/camera_page/Background.png'})`}}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
      </motion.div>
      <div class="bg-gradient-to-t from-black  absolute w-full h-[50vh] bottom-0"></div>
      <div className='absolute bottom-0 mb-32 flex flex-col w-full  justify-start px-5 z-50 landscape:mb-20 landscape:px-20 landscape:justify-center'>
        <motion.div 
          className='text-[3.2rem] font-black  leading-tight'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        > 
          <div>Moonshot </div>
          <div>AI Camera</div>   
        </motion.div>
        <motion.div 
          className='text-lg font-bold my-4 text-gray-200 '
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >開啟你的相機看看 AI 給你什麼驚喜吧！</motion.div>
        
        <motion.div 
          className="text-white backdrop-blur-sm bg-white/30 border-1 border-white/80 shadow-[.7px_-.8px_6px_1px_rgba(255,255,255,0.9)]  font-medium rounded-full text-lg px-8 py-4 text-center  flex items-center justify-center gap-2  w-3/5 ml-auto mt-10 landscape:w-1/3"
          initial={{ opacity: 0, x: '-40px' }}
          animate={{ opacity: 1, x: 0  , transition:{delay:.5, duration:.8}}}
          exit={{ opacity: 0 }}
          onClick={handleClick}
        >
            Get Started <FaArrowRight />
        </motion.div>
        

      </div>
      <div className='text-sm text-white/30  text-center p-2'>
        This site is protected by reCAPTCHA and the Google
        <a href="https://policies.google.com/privacy">Privacy Policy</a> and
        <a href="https://policies.google.com/terms">Terms of Service</a> apply.
      </div>

    </div>
  )
}

export default FrontPage