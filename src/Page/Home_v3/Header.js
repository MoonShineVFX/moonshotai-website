import React from 'react'
import ReactPlayer from 'react-player'
function Header({executeScroll}) {


  return (
    <div className='text-white flex justify-center items-center h-screen' >
      <div className='video-wrapper absolute w-full h-auto  -z-10 top-0 left-0   opacity-10'>
        <video 
          src='https://moonshine.b-cdn.net/msweb/moonshotai/home_images/website_banner_video.mp4' 
          autoPlay loop muted 
          className=' object-cover w-full h-screen pt-10'
        />
      </div> 
      <div className='w-8/12 mx-auto'>
        <div className='text-4xl font-bold text-center'>Let Moonshot Create For You.</div>
        <div className=' flex flex-col items-center relative'>
          
          <div className=' my-5 relative w-full md:w-1/3' >

            <div className=' w-full mx-auto  relative my-10'>
              <div className="circle absolute  -z-10  "></div>
              <img src='https://moonshine.b-cdn.net/msweb/moonshotai/home_images/mslogo_model.png' alt="" className='w-full'/>
            </div>
          
        </div>
        </div>
        <div className='text-center text-base my-4 mx-20 font-semibold'>
          Extend your creation limits through interaction with Moonshot. Let AI enter your world with amazement.
        </div> 
        <div className='flex flex-col md:flex-row justify-around items-center space-y-6 md:space-y-0 mt-4 md:my-20'>
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



    </div>
  )
}

export default Header