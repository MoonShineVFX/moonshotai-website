import React,{useEffect,useState,useRef}from 'react'
import { motion } from "framer-motion";
import p5 from 'p5'
import TOPOLOGY from 'vanta/src/vanta.topology'
function CallToAction() {
  const [vantaEffect, setVantaEffect] = useState(0)
  const vantaRef = useRef(null)
  useEffect(() => {
    if (!vantaEffect) {
       setVantaEffect(TOPOLOGY({
        el: vantaRef.current,
        p5: p5,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        backgroundColor: 0x161718,
        color: 0xd5555
     }))        
     }
     return () => {
       if (vantaEffect) vantaEffect.destroy()
     }
   }, [vantaEffect])
  return (
    <div className='w-10/12 mx-auto  text-white relative  py-[15%] ' ref={vantaRef}>
      <div className='text-4xl text-center font-bold mb-24'>
          讓機器人幫你實現你的想像
      </div>
      <div className=' overflow-hidden flex justify-center' >
        
        <motion.div
          initial={{ opacity: 0,y:'15' }}
          animate={{ opacity: 1,y:0 }}
          transition={{
            ease: "easeInOut",
            duration: .6,
            delay: 0.5,
          }}
        >
          <div className='flex items-center gap-4 md:gap-6 ext-lg '>
            <div className='flex flex-col items-center '>
              
              <a 
                className=' flex justify-center w-auto'
                href="https://liff.line.me/1645278921-kWRPP32q/?accountId=251vgtut"
                target={"_blank"} rel="noreferrer"
              >
                <div className='p-3 md:p-4 bg-[#B5DF0F] text-sm hover:bg-[#8aa423] rounded-full font-bold tracking-wide min-w-[180px] text-center'>
                  Moonshot Line
                </div> 
                
              </a>
              <div className='text-sm text-zinc-300 mt-2'>按此加入好友</div> 
            </div>

            <div className='text-zinc-300'>或</div>
            <div className='w-1/3'><img src={process.env.PUBLIC_URL+'/images/moonshotqr_b.png'} alt="" className='max-w-[120px] min-w-[60px]' /></div>
          </div>

        </motion.div>

        
        

      </div>
    </div>
  )
}

export default CallToAction