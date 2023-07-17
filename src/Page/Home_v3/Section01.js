import React from 'react'
import ChatTutorial_ver3 from './ChatTutorial_ver3'
function Section01() {
  return (
    <div className='text-white py-10 my-10' >
      <div className='mx-12 flex flex-col items-center'>
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
      <ChatTutorial_ver3 />
      <div className='flex flex-col items-center space-y-6 mt-4 md:mt-0'>
        <a 
          className='w-32 md:w-1/2 text-center px-2 py-2 rounded-full text-black font-bold bg-gradient-to-l from-[#BDDE48] via-[#C0CFA6] to-[#C2C1FD] '
          href="https://liff.line.me/1645278921-kWRPP32q/?accountId=251vgtut"
          target={"_blank"} rel="noreferrer"
        >Start Now !  </a>
      </div>
    </div>
  )
}

export default Section01