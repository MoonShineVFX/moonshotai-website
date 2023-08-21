import React from 'react'
import ChatTutorial_ver3 from './ChatTutorial_ver3'
import { Button } from "@material-tailwind/react";
function Section01() {
  return (
    <div className='text-white py-10 md:my-10 flex flex-col md:flex-row items-center justify-around ' >
      <div className='md:w-1/2 flex flex-col items-center order-2 md:order-1'>
        <ChatTutorial_ver3 />
        <Button className='flex flex-col items-center font-bold text-black text-sm capitalize   rounded-full   bg-gradient-to-l from-[#BDDE48] via-[#C0CFA6] to-[#C2C1FD]'>
          <a 
            className=' '
            href="https://liff.line.me/1645278921-kWRPP32q/?accountId=251vgtut"
            target={"_blank"} rel="noreferrer"
          >Start Now !  </a>
        </Button>
      </div>

      <div className='md:w-1/2 order-1 md:order-2 flex flex-col'>
        <div className='mx-12 md:mx-[25%] flex flex-col items-center order-2 md:order-1'>
          <div className='text-3xl font-bold text-center relative'>
            Creating through   simple commands
            <div 
              className=' absolute -top-3 -left-2 md:-left-6'
              style={{animation: 'float_t01 6s ease-in-out infinite'}}  
            >
              <img src={process.env.PUBLIC_URL+'/images/ver3_images/section01_c01.png'} alt="" />
            </div>
          </div>


        </div>
        <div className='w-full order-1 md:order-2'>
          <img src="https://moonshine.b-cdn.net/msweb/moonshotai/home_images/msmodel00.png" alt="" className='max-w-full w-[90%] mx-auto' />
        </div>
      </div>
    </div>
  )
}

export default Section01