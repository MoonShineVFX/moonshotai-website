import React from 'react'

function Header() {
  return (
    <div className='text-white my-10'>
      <div className='mx-12 flex flex-col items-center'>
        <div className='text-4xl font-bold text-center'>Let Moonshot Create For You.</div>
        <div className='text-center text-sm my-4 '>Extend your creation limits through interaction with Moonshot. 
  Let AI enter your world with amazement.</div>
        <div>
          <img src={process.env.PUBLIC_URL+'/images/ver3_images/Home_MS_logo01.png'} alt="" />
        </div>
      </div>

    </div>
  )
}

export default Header