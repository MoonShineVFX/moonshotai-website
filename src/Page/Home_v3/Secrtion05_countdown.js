import React from 'react'
import CountdownTimer from './CountdownTimer'
import ReactPlayer from 'react-player'
function Secrtion05_countdown() {
  return (
    <div className=' flex flex-col justify-center items-center'>
      <div className='text-white/70 my-3'>距離 MoonShot 登月時間</div>
      <CountdownTimer />
      <div className=' relative w-full aspect-video mt-6'>
        <ReactPlayer
          className='react-player w-full h-full '
          url='https://www.youtube.com/watch?v=OaaIE11MLj0'
          width='100%'
          height='100%'
        />
      </div>
    </div>
  )
}

export default Secrtion05_countdown