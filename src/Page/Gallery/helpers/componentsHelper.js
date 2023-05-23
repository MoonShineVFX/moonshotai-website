import { useState } from 'react';
import {motion} from 'framer-motion'
import { MdContentCopy } from "react-icons/md";
import { Link } from "react-router-dom";
import { useForm,Controller } from 'react-hook-form';
import { MdDoneOutline,MdDone,MdOutlineTrendingFlat } from "react-icons/md";
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

export const LoadingCircle = () =>{
  return (
    <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-zinc-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
  )
}
export const DisableInputInvite = () =>{

  return (

      <form>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col'>
            <input  type="text" placeholder="即將上線" className='bg-zinc-700 rounded-xl py-3 px-2 text-sm' disabled/>
          </div>
          <button type="submit" disabled   className="disabled flex justify-center items-center bg-zinc-700 text-white/30 rounded-xl py-3 px-4 text-center  text-xl">
            輸入邀請碼(即將上線)
            <MdOutlineTrendingFlat className='ml-2'/>
          </button>
        </div>

      </form>


  )
}
export const InputInvite = () =>{
  const { control,register, handleSubmit, formState: { errors } } = useForm({
    name:''
  });
  const onSubmit = (data) => {
    console.log(data)
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col'>
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <input {...field} type="text" placeholder="邀請碼" className='bg-zinc-700 rounded-xl py-3 px-2 text-sm' />
              )}
            />
          </div>
          <button type="submit"  className="flex justify-center items-center bg-gradient-to-r from-lime-700 to-lime-600 rounded-xl py-3 px-4 text-center text-white text-xl">
            輸入邀請碼
            <MdOutlineTrendingFlat className='ml-2'/>
          </button>
        </div>

      </form>

    </div>
  )
}
export const GenerateInvite = () =>{
  return (
    <div className=' flex '>
      <button type="submit"  className="w-full flex justify-center items-center bg-gradient-to-r from-lime-700 to-lime-600 rounded-xl py-3 px-4 text-center text-white text-xl">
        <div>
        產生邀請碼<div className='text-white/70 text-sm'>邀請一位朋友即可獲得5日免費！</div>
        </div>
      </button>
    </div>
  )
}
export const BuyButton = () =>{
  return (
    <button className="flex justify-center items-center bg-gradient-to-r from-lime-700 to-lime-600 rounded-xl py-5 px-4 text-center text-white text-xl">
      訂購
      <MdOutlineTrendingFlat className='ml-2'/>
    </button>
  )
}
export const DisableBuyButton = () =>{
  return (
    <button disabled className="w-full flex justify-center items-center bg-zinc-700 text-white/30 rounded-xl py-6 px-4 text-center  text-xl">
      即將開賣
      <MdOutlineTrendingFlat className='ml-2'/>
    </button>
  )
}


