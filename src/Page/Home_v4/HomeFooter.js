import React from 'react'
import { FaFacebook,FaInstagram,FaYoutube } from "react-icons/fa";
function HomeFooter() {
  return (
    <div className='text-white/60 p-4 border-t border-white/20'>
      <div className='flex flex-col text-sm  '>
        <div className='flex flex-col space-y-2'>
          <a href="/docs/terms">Terms of Use</a>
          <a href="/docs/policy">Privacy Policy</a>
        </div>
        <div className=' flex  items-center gap-5 mt-4 '>
              <a href='https://twitter.com/MoonshotAI_' target="_blank" rel="noopener noreferrer" >
                <img src="https://moonshine.b-cdn.net/msweb/moonshotai/web_icons/twitter-x.svg" className='min-w-3 w-3  object-contain' alt="" />
              </a>
              <a href='https://www.youtube.com/channel/UCT0noXFjgZ30lLCwZjJYdgQ' target="_blank" rel="noopener noreferrer" > 
              <FaYoutube size={16} />
              </a>
              <a href='https://www.instagram.com/moonshot_ai' target="_blank" rel="noopener noreferrer" > 
              <FaInstagram size={16} />
              </a>
              <a href='https://www.facebook.com/groups/547117463595869' target="_blank" rel="noopener noreferrer" > 
              <FaFacebook size={16} />
              </a>
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

export default HomeFooter