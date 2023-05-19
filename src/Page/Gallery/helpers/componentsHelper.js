import { useState } from 'react';
import {motion} from 'framer-motion'
import { MdContentCopy } from "react-icons/md";
import { Link } from "react-router-dom";

export const SharePostModal = ({closeModal})=>{
  const [ isCopied , setIsCopied ] = useState(false);
  const handleClose = ()=>{
    closeModal()
    setIsCopied(false)
  }
  const handleCopyPrompt=()=>{
    const text = window.location.href
    navigator.clipboard.writeText(text);
    setIsCopied(true)
  }
  return (
    <div className=' fixed z-50 top-0 left-0 w-full'>
      <div className='bg-black/50 w-full h-screen' onClick={handleClose}></div>
      <motion.div 
        initial={{ opacity: 0, scale:0 ,x:'-50%'}}
        animate={{ opacity: 1, scale:1 }}
        exit={{ opacity: 0, scale:0 }}
        className=' border-lime-500 border bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#49531F] via-black  to-zinc-800  p-4 box-border text-white fixed top-1/3 left-1/2 -translate-x-1/2 w-4/5 overflow-y-auto max-h-[85vh]'
      >
        <div className='flex flex-col justify-center items-center'>
          <div className='text-white/50'>Copy to Share</div>
          <div className='my-3 relative'>
            {isCopied && <div className='text-xs text-right my-1'>Copied!</div>}
            <div className='p-2 bg-zinc-600 rounded-md flex items-center'>
              {window.location.href} <button className='ml-5' onClick={handleCopyPrompt}><MdContentCopy /></button>
            </div>
          </div>
          <div className='mt-6 flex flex-col gap-3 justify-center text-md'>
            <button type="button" className='text-white/80' onClick={handleClose}>Close</button>
          </div>
        </div>

      </motion.div>
    </div>
  )
}

export const CallToLoginModal = ({closeModal})=>{
  const handleClose = ()=>{
    closeModal()
  }
  return (
    <div className=' fixed z-50 top-0 left-0 w-full'>
      <div className='bg-black/50 w-full h-screen' onClick={handleClose}></div>
      <motion.div 
        initial={{ opacity: 0, scale:0 ,x:'-50%'}}
        animate={{ opacity: 1, scale:1 }}
        exit={{ opacity: 0, scale:0 }}
        className=' border-lime-500 border bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#49531F] via-black  to-zinc-800  p-4 box-border text-white fixed top-1/3 left-1/2 -translate-x-1/2 w-4/5 overflow-y-auto max-h-[85vh]'
      >
        <div className='flex flex-col justify-center items-center'>
          <div className=' font-bold'>Message</div>
          <div className='text-white/70'>Please log in to use this feature</div>
          <div className='mt-6 flex flex-col gap-3 justify-center text-md'>
            <Link to='/profile' className=' bg-lime-700/50 cursor-pointer px-5 py-2 rounded-md hover:bg-gray-600'>Log in right now</Link>
            <button type="button" className='text-white/80' onClick={handleClose}>Maybe next time</button>
          </div>
        </div>

      </motion.div>
    </div>
  )
}


export const TestImageModal=()=>{
  return (
    <div className=" fixed top-0 left-0 lg:right-0 lg:bottom-0 flex z-50 bg-zinc-800 h-screen overflow-y-auto" >
      <div className="00 p-4 max-w-screen-lg mx-auto  gap-3 text-white/80 relative my-5">
        <div className="flex   justify-center items-center ">
          <div className='w-full h-full'>
            <img 
              src='https://images.moonshot.today/static/134b166/18079489419501_0.jpg'
              alt='https://images.moonshot.today/static/134b166/18079489419501_0.jpg'
              className="max-h-full  rounded-md" />
          </div>
        </div>
        <div className='flex flex-col justify-end pt-5 relative pb-20 '>
          <div className='text-xs mb-3 text-white/30'>Created at 20220202</div>
          
          <div className='text-white font-bold my-3 flex gap-2 items-center'>
            Model
            <div className='bg-zinc-700  px-3  py-1 rounded-md'>
            selec
            </div> 
          </div>
          <div className='text-white font-bold my-3'>Prompt</div>
          <div className='bg-zinc-700 p-3 rounded-md'>
            selectedImage.prompt selectedImage.prompt selectedImage.prompt selectedImage.prompt selectedImage.prompt selectedImage.prompt selectedImage.prompt selectedImage.prompt selectedImage.prompt selectedImage.prompt selectedImage.prompt selectedImage.prompt selectedImage.prompt selectedImage.prompt selectedImage.prompt selectedImage.prompt
          </div>
          <div className='text-white font-bold my-3'>Negative prompt</div>
          <div className='bg-zinc-700 p-3 rounded-md'>
            selectedImage.negative_prompt
          </div>
          

        </div>
        <div className='flex left-0 gap-2 justify-center items-center py-4 fixed bottom-0 z-50 w-full bg-zinc-800'>
          <button className='bg-gray-600 text-white px-2 py-1 rounded-md w-1/2 '>Copy Prompt</button>
          <button className="  bg-gray-800 text-white px-2 py-1 rounded-md hover:bg-gray-700 focus:bg-gray-700" >Close</button>

        </div>
        
      </div>
    </div>
  )
}