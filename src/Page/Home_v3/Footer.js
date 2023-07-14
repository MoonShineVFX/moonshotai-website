import React from 'react'
import { FaFacebook,FaInstagram,FaTwitter,FaLinkedinIn,FaDiscord,FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <div className='text-white/60 p-4 border-t border-white/20'>
      <div className='flex flex-col text-sm  '>
        <div className='flex flex-col space-y-2'>
          <a href="/terms">Terms of Use</a>
          <a href="/policy">Privacy Policy</a>
        </div>

        <div className=' flex  items-center gap-5 mt-4'>
            <a href='https://twitter.com/MoonshotAI_' target="_blank" rel="noopener noreferrer" ><FaTwitter size={20}  /></a>
            <a href='https://www.youtube.com/channel/UCT0noXFjgZ30lLCwZjJYdgQ' target="_blank" rel="noopener noreferrer" > <FaYoutube size={20} /></a>
          </div>
        <div className=' items-center  text-white gap-2 pt-1 flex  justify-between  mt-14'>
          <a href='/' className='font-black w-20 lg:w-32'>
            <img src={process.env.PUBLIC_URL+'/images/ver2_images/mslogo.svg'} alt="" className='w-full'/>
          </a>
          <div className='text-xs text-white/60'> Copyright 2023   Moonshot</div>
        </div>
      </div>
      
    </div>
  )
}

export default Footer