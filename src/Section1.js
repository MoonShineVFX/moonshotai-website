import React from 'react'
import { FaArrowRight } from "react-icons/fa";
function Section1() {
  return (
    <div className='text-white my-28'>
      <div className='text-4xl text-center font-bold mb-20'>如何加入</div>
        <div className='flex  justify-center  items-center'>
          <div className='flex flex-col items-center justify-center gap-5 w-1/3' data-aos="fade-up">
            <div><img src={process.env.PUBLIC_URL+'/images/step1.png'} alt="" className='saturate-50' /></div>
            <div className='text-sm text-blue-600 font-bold'>STEP 01</div>
            <div className='text-2xl font-bold  '>掃描QRcode</div> 
            <div className='text-base text-zinc-300'>點選超連結或掃描 QRCdoe 都可以將 Moonshot 加入好友</div> 
          </div>
          <div> <FaArrowRight size={30} /> </div>
          <div className='flex flex-col items-center justify-center gap-5 w-1/3' data-aos="fade-up">
            <div><img src={process.env.PUBLIC_URL+'/images/step2.png'} alt="" className='saturate-50' /></div>
            <div className='text-sm text-purple-600 font-bold'>STEP 02</div>
            <div className='text-2xl font-bold '>邀請至群組 </div> 
            <div className='text-base text-zinc-300'>將 Moonshot 邀請到拰的你與好友群組</div> 
          </div>
          <div> <FaArrowRight size={30} /> </div>
          <div className='flex flex-col items-center justify-center gap-5 w-1/3' data-aos="fade-up">
            <div><img src={process.env.PUBLIC_URL+'/images/step3.png'} alt="" className='saturate-50' /></div>
            <div className='text-sm text-orange-600 font-bold'>STEP 03</div>
            <div className='text-2xl font-bold '>開始使用 </div> 
            <div className='text-base text-zinc-300'>可輸入/?出現使用說明，就可以立即使用</div> 
          </div>
        </div>
    </div>

  )
}

export default Section1