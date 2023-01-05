import React,{useEffect,useState,useRef} from 'react'

import HeaderImagesBg from './Components/HeaderImagesBg'
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import * as THREE from 'three'
import BIRDS from 'vanta/src/vanta.birds'
import WAVES from 'vanta/src/vanta.waves'
function Header() {
  const [vantaEffect, setVantaEffect] = useState(0)
  const vantaRef = useRef(null)
  useEffect(() => {
    if (vantaEffect) {
       setVantaEffect(WAVES({
        el: vantaRef.current,
        THREE:THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x122a
     }))        
     }
     return () => {
       if (vantaEffect) vantaEffect.destroy()
     }
   }, [vantaEffect])
  return (
    <div className='flex flex-col md:flex-row'>

      <div className='w-full md:w-1/2 md:h-screen text-white relative px-[10%] py-[10%] md:px-[10%] md:py-[10%]  overflow-hidden' ref={vantaRef}>
        <motion.div
          initial={{ opacity: 0,y:'15' }}
          animate={{ opacity: 1,y:0 }}
          transition={{
            ease: "easeInOut",
            duration: .6,
            delay: 0.5,
          }}
        >
          <div className='text-5xl font-black my-5'>Moonshot</div>
          <div className='text-base text-zinc-400 my-2'>在Line群組內實現AI繪圖</div>
          <div className='my-6 leading-10 hidden'>
            <div className='flex items-center gap-2'> <FaCheckCircle /> 免安裝</div>
            <div className='flex items-center gap-2'> <FaCheckCircle /> 免下載</div>
            <div className='flex items-center gap-2'> <FaCheckCircle /> 支援中文指令</div>
            <div className='flex items-center gap-2'> <FaCheckCircle /> 自由邀請至自己人群組</div>
            <div className='flex items-center gap-2'> <FaCheckCircle /> 超多隱藏功能等你發現</div>
            <div className='flex items-center gap-2'> <FaCheckCircle /> 持續更新，未來有pro版本</div>
          </div>
          <div className='flex items-center gap-4 md:gap-6 my-12 text-xs md:text-lg'>
            <div className='flex flex-col items-center'>
              <div className='text-sm text-zinc-300 mb-2'>按此加入好友</div> 
              <a 
                className=' flex justify-center w-auto'
                href="https://liff.line.me/1645278921-kWRPP32q/?accountId=251vgtut"
                target={"_blank"}
              >
                <div className='p-3 md:p-4 bg-[#B5DF0F] text-sm hover:bg-[#8aa423] rounded-full font-bold tracking-wide min-w-[180px] text-center'>
                  MoonShot Line
                </div> 
              </a>
            </div>

            <div>或</div>
            <div className='w-1/3'><img src={process.env.PUBLIC_URL+'/images/moonshotqr_white.png'} alt="" className='max-w-full' /></div>
          </div>
          <div className='text-sm text-zinc-400 mt-12 hidden'>*立即加入 MoonShot Line 好友，內有說明引導使用。</div>

        </motion.div>
        

      </div>
      <div className='w-full md:w-1/2 h-[300px] md:h-screen overflow-hidden brightness-75'>
        <div className=' w-[800px] md:w-[1500px]' id="headerBg">
          <HeaderImagesBg />
        </div>

      </div>
    </div>
  )
}

export default Header