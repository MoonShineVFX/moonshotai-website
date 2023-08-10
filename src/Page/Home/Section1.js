import React from 'react'
import { FaArrowRight,FaArrowDown } from "react-icons/fa";
function Section1() {
  return (
    <div className='text-white my-28' >
      <div className='text-4xl text-center font-bold mb-20' data-aos="fade" data-aos-duration="1000">如何加入</div>
        <div className='flex flex-col md:flex-row  justify-center  items-center'>
          <div className='flex flex-col items-center justify-center gap-5 w-3/4 mx-auto md:w-1/3' data-aos="fade-up" data-aos-duration="1000">
            <div><img src={process.env.PUBLIC_URL+'/images/step1.png'} alt="" className='saturate-50' /></div>
            <div className='text-sm text-orange-600 font-bold'>STEP 01</div>
            <div className='text-2xl font-bold  '>掃描QRcode</div> 
            <div className='text-base text-gray-300 text-center'>點連結或掃描 QRCdoe 加入 Moonshot。</div> 
          </div>
          <div className='hidden md:block'> <FaArrowRight size={30} /> </div>
          <div className='md:hidden my-6'> <FaArrowDown size={30} /> </div>
          <div className='flex flex-col items-center justify-center gap-5  w-3/4 mx-auto md:w-1/3' data-aos="fade-up" data-aos-duration="1000">
            <div><img src={process.env.PUBLIC_URL+'/images/step2.png'} alt="" className='saturate-50' /></div>
            <div className='text-sm text-orange-600 font-bold'>STEP 02</div>
            <div className='text-2xl font-bold '>邀請至群組 </div> 
            <div className='text-base text-gray-300 text-center'>將 Moonshot 邀請到你與好友的群組。</div> 
          </div>
          <div className='hidden md:block'> <FaArrowRight size={30} /> </div>
          <div className='md:hidden my-6'> <FaArrowDown size={30} /> </div>
          <div className='flex flex-col items-center justify-center gap-5  w-3/4 mx-auto md:w-1/3' data-aos="fade-up" data-aos-duration="1000">
            <div><img src={process.env.PUBLIC_URL+'/images/step3.png'} alt="" className='saturate-50' /></div>
            <div className='text-sm text-orange-600 font-bold'>STEP 03</div>
            <div className='text-2xl font-bold '>開始使用 </div> 
            <div className='text-base text-gray-300 text-center'>輸入 / ? 使用說明。</div> 
          </div>
        </div>
    </div>

  )
}

export default Section1