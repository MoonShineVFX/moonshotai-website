import React from 'react'
import ChatTutorial_ver3 from './ChatTutorial_ver3'
function Section01() {
  return (
    <div className='text-white py-10' >
      <div className='mx-12 flex flex-col items-center'>
        <div className='text-3xl font-bold text-center relative'>
          Creating through   simple commands
          <div 
            className=' absolute -top-3 -left-5'
            style={{animation: 'float_t01 6s ease-in-out infinite'}}  
          >
            <img src={process.env.PUBLIC_URL+'/images/ver3_images/section01_c01.png'} alt="" />
          </div>
        </div>


      </div>
      <ChatTutorial_ver3 />
      <div className='flex flex-col items-center space-y-6 mt-4'>
        <div className='w-32 text-center px-2 py-2 rounded-full text-black font-bold bg-gradient-to-l from-[#BDDE48] via-[#C0CFA6] to-[#C2C1FD] '>Start Now !  </div>
      </div>
    </div>
  )
}

export default Section01