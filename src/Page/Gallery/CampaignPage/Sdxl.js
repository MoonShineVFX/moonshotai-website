import React,{useEffect,useState} from 'react'

import { MdNavigateNext,MdNavigateBefore } from "react-icons/md";


const Sdxl = () => {
  const [isMobileWidth, setIsMobileWidth] = useState(false);
  const handleResize = () => {
    setIsMobileWidth(window.innerWidth <= 420);
  };
  useEffect(()=>{
    window.addEventListener('resize', handleResize);

    // 移除監聽器
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  })
  return (
    <div className='pb-20'>
      <div className='w-10/12 md:w-2/3 mx-auto flex justify-center my-8 '>
        <img src="https://moonshine.b-cdn.net/msweb/moonshotai/gallery_banner/sdxl.png" alt="banner" className='max-w-full'/>
      </div>

      <div className="text-white flex flex-col justify-center md:items-center px-10 md:px-4 py-2">
        <h1 className='text-2xl md:text-4xl  font-bold my-2'>Moonshot 限定！</h1>
        




      </div>
      
    </div>
  )
}

export default Sdxl