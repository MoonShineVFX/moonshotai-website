import React,{useEffect,useState,useRef} from 'react'
import * as THREE from 'three'
import HALO from 'vanta/src/vanta.halo'
function Header() {
  const [vantaEffect, setVantaEffect] = useState(0)
  const vantaRef = useRef(null)

  return (
    <div className='text-white py-10' >
      <div className='mx-12 flex flex-col items-center'>
        <div className='text-4xl font-bold text-center'>Let Moonshot Create For You.</div>
        <div className='text-center text-sm my-4 '>Extend your creation limits through interaction with Moonshot. 
  Let AI enter your world with amazement.</div>
        <div className=' my-5 relative w-full' >
          <div 
            className=' w-3/5 absolute top-1/2 left-1/2 '
            style={{animation: 'float_center 6s ease-in-out infinite'}}
          >
            <img src={process.env.PUBLIC_URL+'/images/ver3_images/Home_MS_logo01.png'} alt="" className='w-full'/>
          </div>
          <div className='glow w-full'>
            <img src={process.env.PUBLIC_URL+'/images/ver3_images/ms_logo_acc01.png'} alt="" className='w-full' />
          </div>
       </div>
      </div>
      <div className='flex flex-col items-center space-y-6 mt-4'>
        <div className='w-32 text-center px-2 py-2 rounded-full border'>Learn More</div>
        <div className='w-32 text-center px-2 py-2 rounded-full text-black bg-[#BDDE48] '>Start For Free </div>
        <div className='w-32 text-center px-2 py-2 rounded-full bg-[#423EF5]'>See Gallery </div>
      </div>


    </div>
  )
}

export default Header