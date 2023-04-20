import React from 'react'

function index() {
  return (
    <div className='text-white border-b border-black/50 p-5 w-full  bg-black/50 z-50'>
      <div className='w-10/12 mx-auto flex items-center gap-2'>
          <div className='text-3xl font-black w-32'>
            <img src={process.env.PUBLIC_URL+'/images/ver2_images/mslogo.svg'} alt="" className='w-full'/>
          </div>
          <div className='text-xl'>Gallery</div>
      </div>
    </div>
  )
}

export default index