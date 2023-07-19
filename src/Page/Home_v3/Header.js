import React,{useEffect,useState,useRef} from 'react'
import * as THREE from 'three'
import HALO from 'vanta/src/vanta.halo'
function Header({executeScroll}) {
  const [vantaEffect, setVantaEffect] = useState(0)
  const vantaRef = useRef(null)

  return (
    <div className='text-white py-10 md:w-8/12 mx-auto' >
      <div className='mx-12 flex flex-col items-center'>
        <div className='text-4xl font-bold text-center'>Let Moonshot Create For You.</div>
        <div className='text-center text-sm my-4 '>Extend your creation limits through interaction with Moonshot. 
  Let AI enter your world with amazement.</div>
        <div className=' my-5 relative w-full md:w-1/2' >
          <div 
            className=' w-3/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
            // style={{animation: 'float_center 12s ease-in-out infinite'}}
          >
            <div className="circle absolute  -z-10  "></div>
            <img src={process.env.PUBLIC_URL+'/images/ver3_images/Home_MS_logo01.png'} alt="" className='w-full'/>
            <div 
            className=' absolute -top-12 -right-16'
            style={{animation: 'float_t01 5s ease-in-out infinite', animationDelay:'400ms' }}  
          >
            <img src={process.env.PUBLIC_URL+'/images/ver3_images/header_c01.png'} alt="" />
          </div>
          <div 
            className=' absolute -bottom-14 -left-10'
            style={{animation: 'float_t01 6s ease-in-out infinite' , animationDelay:'1000ms'}}  
          >
            <img src={process.env.PUBLIC_URL+'/images/ver3_images/header_c02.png'} alt="" />
          </div>
          
          </div>


          <div className=' w-full relative'>

            <img src={process.env.PUBLIC_URL+'/images/ver3_images/header_logo_acc01.png'} alt="" className='w-full' />
            <div className=' absolute top-4 left-4' style={{animation: 'float_t02 10s ease-in-out infinite' , animationDelay:'1000ms'}} >
              <img src={process.env.PUBLIC_URL+'/images/ver3_images/header_logo_acc02.png'} alt="" className='max-w-full scale-75' />
            </div>
            <div className=' absolute bottom-12 right-10' style={{animation: 'float_t03 8s ease-in-out infinite' , animationDelay:'1500ms'}} >
              <img src={process.env.PUBLIC_URL+'/images/ver3_images/header_logo_acc03.png'} alt="" className='max-w-full scale-75' />
            </div>
            <div className=' absolute bottom-2 right-4' style={{animation: 'float_t03 8s ease-in-out infinite' , animationDelay:'2000ms'}} >
              <img src={process.env.PUBLIC_URL+'/images/ver3_images/header_logo_acc04.png'} alt="" className='max-w-full scale-75' />
            </div>
          </div>

       </div>
      </div>
      <div className='flex flex-col md:flex-row justify-around items-center space-y-6 md:space-y-0 mt-4 md:my-8'>
        <div className='w-32 text-center px-2 py-2 rounded-full border' onClick={executeScroll}>Learn More</div>
        <a 
          className='w-32 text-center px-2 py-2 rounded-full text-black bg-[#BDDE48] '
          href="https://liff.line.me/1645278921-kWRPP32q/?accountId=251vgtut"
          target={"_blank"} rel="noreferrer"
        >Start For Free </a>
        <a 
          className='w-32 text-center px-2 py-2 rounded-full bg-[#423EF5]'
          href="/gallery"
          target={"_blank"} rel="noreferrer"
        >See Gallery </a>
      </div>


    </div>
  )
}

export default Header