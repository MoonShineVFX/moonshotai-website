import React,{useEffect,useState,useRef} from 'react'
import * as THREE from 'three'
import HALO from 'vanta/src/vanta.halo'
function Header() {
  const [vantaEffect, setVantaEffect] = useState(0)
  const vantaRef = useRef(null)
  useEffect(() => {
    if (!vantaEffect) {
       setVantaEffect(HALO({
        el: vantaRef.current,
        THREE:THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        backgroundColor: 0x1e1e1e
     }))        
     }
     return () => {
       if (vantaEffect) vantaEffect.destroy()
     }
   }, [vantaEffect])
  return (
    <div className='text-white my-10'>
      <div className='mx-12 flex flex-col items-center'>
        <div className='text-4xl font-bold text-center'>Let Moonshot Create For You.</div>
        <div className='text-center text-sm my-4 '>Extend your creation limits through interaction with Moonshot. 
  Let AI enter your world with amazement.</div>

      </div>
      <div className='w-full h-[40vh] flex justify-center items-center' ref={vantaRef}>
          <div>
            <img src={process.env.PUBLIC_URL+'/images/ver3_images/Home_MS_logo01.png'} alt="" />
          </div>
         
        </div>

    </div>
  )
}

export default Header