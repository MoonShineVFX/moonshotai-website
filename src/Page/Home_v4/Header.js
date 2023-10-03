import React from 'react'
import { Button } from "@material-tailwind/react";
function Header({executeScroll}) {


  return (
    <div className='text-white flex justify-center items-center relative py-10 md:py-20  z-0' >
      <video 
        src='https://moonshine.b-cdn.net/msweb/moonshotai/home_images/website_banner_video.mp4' 
        autoPlay loop muted 
        className=' object-cover w-full min-h-screen  absolute top-0 opacity-20 -z-20'
      />
      <div className=' absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-blacks pointer-events-none'></div>

      <div className='w-8/12 mx-auto flex flex-col'>

        <div className='text-4xl font-bold text-center order-1'>Let Moonshot Create For You.</div>
        <div className=' flex flex-col items-center relative order-3 md:order-2'>
          
          <div className=' my-5 relative w-full md:w-1/3' >

            <div className=' w-full mx-auto  relative md:my-7'>
              <div className="circle absolute  -z-10  "></div>
              <img src='https://moonshine.b-cdn.net/msweb/moonshotai/home_images/mslogo_model.png' alt="" className='w-full'/>
            </div>
          
        </div>
        </div>
        <div className='text-center text-base my-4 md:mx-20 font-semibold order-2 md:order-3'>
          <div> Extend your creation limits through interaction with Moonshot. </div>
          <div>Let AI enter your world with amazement.</div>
        </div> 
        <div className='text-lg  flex flex-col md:flex-row justify-around items-center space-y-6 md:space-y-0 mt-4 md:my-10 order-4'>
           
          <Button variant="outlined" color='white' className="rounded-full  font-bold capitalize text-sm"  onClick={executeScroll}>
            Learn More
          </Button>
          <Button className="rounded-full bg-[#BDDE48] text-black font-bold capitalize text-sm ">
          <a 
            href="https://liff.line.me/1645278921-kWRPP32q/?accountId=251vgtut"
            target={"_blank"} rel="noreferrer"
          >Start For Free </a>
          </Button>
          <Button variant="none" className="rounded-full bg-[#423EF5] text-white font-bold capitalize text-sm">
          <a 
            href="/gallery"
            target={"_blank"} rel="noreferrer"
          >See Gallery </a>
         </Button>
        </div>

      </div>



    </div>
  )
}

export default Header