import React from 'react'

function Footer() {
  return (
    <div className='text-white/60 p-4 border-t border-white/20'>
      <div className='flex flex-col text-sm '>
        <a href="/terms">Terms of Use</a>
        <a href="/policy">Privacy Policy</a>
        <div className=' items-center  text-white gap-2 pt-1 flex  justify-between  mt-10'>
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