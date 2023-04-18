import React from 'react'

function index() {
  return (
    <div className='text-white border-b border-white/50 p-6 w-full'>
      <div className='w-4/5 mx-auto flex items-center gap-10'>
          <div className='text-3xl font-black w-32'>
            <img src={process.env.PUBLIC_URL+'/images/ver2_images/mslogo.svg'} alt="" className='w-full'/>
          </div>
          <div>documentation</div>
      </div>
    </div>
  )
}

export default index