import React from 'react'

function Section_about() {
  return (
    <div
      className='bg-cover bg-center bg-no-repeat h-[75vh] md:min-h-screen relative'
      style={{backgroundImage: `url(${'https://moonshine.b-cdn.net/msweb/moonshotai/home_images/moon-bg.png'})`}}

    >
    <div className=' absolute top-0 left-0 w-full h-12 md:h-32 bg-gradient-to-b from-black via-black z-0'></div>

    <div className='w-full md:w-8/12 mx-auto bg-white'>
      <div className='w-11/12  rounded-3xl  md:w-1/3 absolute right-1/2 translate-x-1/2 md:translate-x-0 md:right-10 top-32  md:top-1/2 md:-translate-y-1/2 bg-black/60  px-10 md:px-20 py-10'>

        <div className='   flex flex-col'>
          <div className='md:mx-12 flex flex-col items-center'>
            <div className='text-3xl font-bold text-center relative text-[#BDDE48]'>
                About Moonshot
              <div 
                className=' absolute -top-3 -left-2 md:-left-6'
                style={{animation: 'float_t01 6s ease-in-out infinite'}}  
              >
                <img src={process.env.PUBLIC_URL+'/images/ver3_images/section01_c01.png'} alt="" />
              </div>
            </div>


          </div>
          <div className='text-white mt-6 text-lg'>
            <div className='pt-2'>Moonshot 是一個結合 Line 機器人的 AI 繪圖工具。可以輕易地透過對話，產出高質感的 AI 圖。</div>
            <div className='pt-2'>無論是風景、人像、藝術還是科幻風格，都能根據創作者的需求，利用不同的風格模型與工具指令，將想像化為令人驚艷的視覺圖像。準備好了嗎？讓 Moonshot 陪你一起暢遊 AI 宇宙！</div>
          </div>
        </div>
      </div>
    </div>


    </div>
  )
}

export default Section_about