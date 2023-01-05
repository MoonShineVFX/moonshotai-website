import React,{useEffect,useState,useRef}from 'react'
import { motion } from "framer-motion";

function CallToAction() {

  return (
    <div className='w-10/12 mx-auto  text-white relative  py-[10%] '>
      <div className='text-4xl text-center font-bold mb-20'>
        讓機器人幫你畫出你的想像
      </div>
      <div className=' overflow-hidden flex justify-center flex-col gap-8 md:flex-row' >
        <motion.div
          initial={{ opacity: 0,y:'15' }}
          animate={{ opacity: 1,y:0 }}
          transition={{
            ease: "easeInOut",
            duration: .6,
            delay: 0.5,
          }}
        >
          <div className='flex items-center gap-4 md:gap-8 ext-lg flex-col justify-center'>
            <div className=' mx-auto mb-4'><img src={process.env.PUBLIC_URL+'/images/moonshotqr_b.png'} alt="" className='max-w-[120px] min-w-[60px]' /></div>
            <div className='flex flex-col items-center justify-center '>
              
              <a 
                className=' flex justify-center w-auto'
                href="https://liff.line.me/1645278921-kWRPP32q/?accountId=251vgtut"
                target={"_blank"} rel="noreferrer"
              >
                <div className='p-3 md:p-4 bg-[#B5DF0F] text-base hover:bg-[#cee76d] text-zinc-700 rounded-full font-bold tracking-wide min-w-[180px] text-center'>
                  Moonshot Line
                </div> 
                
              </a>
              <div className='text-sm text-zinc-300 mt-2'>按此加入好友</div> 
            </div>

           
          </div>

        </motion.div>
        <motion.div
          initial={{ opacity: 0,y:'15' }}
          animate={{ opacity: 1,y:0 }}
          transition={{
            ease: "easeInOut",
            duration: .6,
            delay: 0.5,
          }}
        >
          <div className='flex items-center gap-4 md:gap-8 ext-lg flex-col justify-center mt-7 md:mt-0'>
            <div className=' mx-auto mb-4'><img src={process.env.PUBLIC_URL+'/images/lineqr.png'} alt="" className='max-w-[120px] min-w-[60px]' /></div>
            <div className='flex flex-col items-center justify-center '>
              
              <a 
                className=' flex justify-center w-auto'
                href="https://line.me/ti/g2/0nEqJgPJlUZitp5pYpwLeoPKmswnBuzpRGoBnw?utm_source=invitation&utm_medium=link_copy&utm_campaign=default"
                target={"_blank"} rel="noreferrer"
              >
                <div className='p-3 md:p-4 bg-[#423EF5] text-base hover:bg-[#3532d6] text-zinc-200 rounded-full font-bold tracking-wide min-w-[180px] text-center'>
                  Moonshot 交流群
                </div> 
                
              </a>
              <div className='text-sm text-zinc-300 mt-2'>按此加入交流群</div> 
            </div>

           
          </div>

        </motion.div>
        
        

      </div>
    </div>
  )
}

export default CallToAction