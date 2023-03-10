import React,{useEffect,useState,useRef} from 'react'

import HeaderImagesBg from '../../Components/HeaderImagesBg'
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import * as THREE from 'three'
import WAVES from 'vanta/src/vanta.waves'

import {headerImagesItem} from '../../Components/ItemData'
import {isMobile} from 'react-device-detect';

function Header() {
  const [imgData , setImgData] = useState(headerImagesItem)
  const half = Math.ceil(headerImagesItem.length / 2);    
  const firstHalf = headerImagesItem.slice(0, half)
  
  useEffect(()=>{
    if(isMobile){
      setImgData(firstHalf)
    }
    console.log(imgData)
  },[])
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

      <div className='w-full md:w-1/2 md:h-screen text-white relative flex items-center justify-center overflow-hidden drop-shadow-2xl ' ref={vantaRef}>
        <motion.div
          initial={{ opacity: 0,y:'15' }}
          animate={{ opacity: 1,y:0 }}
          transition={{
            ease: "easeInOut",
            duration: .6,
            delay: 0.5,
          }}
        >
          <div className='flex flex-row items-center mx-auto w-[350px] my-20 md:my-36 '>
            <div className='w-[100px] mr-5 hover:translate-y-[1px] cursor-pointer '>
              <img src={process.env.PUBLIC_URL+'/images/logo-2.png'} alt="" className='min-w-[80px] rounded-full aspect-square'/>
            </div>
            <div className='w-4/5 text-justify flex flex-col '>
              <div className='text-5xl font-black mb-3'>Moonshot</div>
              <div className=' text-white text-justify w-full tracking-[0.2rem]'>????????????????????????????????????</div>
            </div>
          </div>
          
          
          <div className='my-6 leading-10 hidden '>
            <div className='flex items-center gap-2'> <FaCheckCircle /> ?????????</div>
            <div className='flex items-center gap-2'> <FaCheckCircle /> ?????????</div>
            <div className='flex items-center gap-2'> <FaCheckCircle /> ??????????????????</div>
            <div className='flex items-center gap-2'> <FaCheckCircle /> ??????????????????????????????</div>
            <div className='flex items-center gap-2'> <FaCheckCircle /> ??????????????????????????????</div>
            <div className='flex items-center gap-2'> <FaCheckCircle /> ????????????????????????pro??????</div>
          </div>
          <div className='flex items-center gap-4 md:gap-6 mt-20 md:mt-36 text-xs md:text-lg hidden'>
            <div className='flex flex-col items-center'>
              
              <a 
                className=' flex justify-center w-auto'
                href="https://liff.line.me/1645278921-kWRPP32q/?accountId=251vgtut"
                target={"_blank"} rel="noreferrer"
              >
                <div className='p-3 md:p-4 bg-[#B5DF0F] text-sm hover:bg-[#8aa423] rounded-full font-bold tracking-wide min-w-[180px] text-center'>
                  Moonshot Line
                </div> 
              </a>
              <div className='text-sm text-zinc-300 mt-2'>??????????????????</div> 
            </div>

            <div className='text-zinc-300'>???</div>
            <div className='w-1/3'><img src={process.env.PUBLIC_URL+'/images/moonshotqr_b.png'} alt="" className='max-w-full min-w-[80px]' /></div>
          </div>
          <div className='text-sm text-zinc-400 mt-12 hidden'>*???????????? MoonShot Line ????????????????????????????????????</div>

        </motion.div>
        <div className=' absolute mx-auto bottom-5 left-0 right-0 flex-col items-center hidden md:flex'>
          <div className='scroll-down '></div>
          <div className='text-xs text-zinc-400'>?????????????????????</div>
        </div>
        
        

      </div>
      <div className='w-full md:w-1/2 h-[300px] md:h-screen overflow-hidden brightness-75'>
        <div className=' w-[800px] md:w-[1500px]' id="headerBg">
          <HeaderImagesBg  data={imgData}/>
        </div>

      </div>
      
    </div>
  )
}

export default Header