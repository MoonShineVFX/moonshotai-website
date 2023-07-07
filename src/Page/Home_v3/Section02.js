import React from 'react'

function Section02() {
  const menuItems = [
    {title:"風格插畫"},
    {title:"概念發想"},
    {title:"照片模擬"},
    {title:"素材參考"},
  ]
  return (
    <div className='text-white py-10' >
      <div className='mx-12 flex flex-col items-center'>
        <div className='text-3xl font-bold text-center relative glow'>
          Fulfill Your AI Applications with Diverse Model Styles
          <div 
            className=' absolute -top-12 -left-8'
            style={{animation: 'float_t01 6s ease-in-out infinite'}}  
          >
            <img src={process.env.PUBLIC_URL+'/images/ver3_images/section02_c01.png'} alt="" />
          </div>
          <div 
            className=' absolute -bottom-14 -right-8'
            style={{animation: 'float_t01 5.8s ease-in-out infinite'}}  
          >
            <img src={process.env.PUBLIC_URL+'/images/ver3_images/section02_c02.png'} alt="" />
          </div>
        </div>


      </div>
      <div className='mx-8 mt-16 mb-10'>
        <div className='flex  justify-between items-center text-sm border-t pt-5 '>
          {menuItems.map((item,index)=>{
            return(
              <div>{item.title}</div>
            )
          })}

        </div>


      </div>
      <div
        className='w-full aspect-[16/9]  bg-cover bg-center bg-no-repeat  relative'
        style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/images/ver3_images/section02_bg02.png'})`}}
      >
        <div className=' absolute bg-gradient-to-b from-[#1e1e1e] via-[#1e1e1e00] to-[#1e1e1e] top-0 w-full h-full'></div>
        

        </div>

    </div>
  )
}

export default Section02