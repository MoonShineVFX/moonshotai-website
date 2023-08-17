import React from 'react'

function Footer({openModal}) {
  return (
    <div className='flex gap-4 h-10 text-gray-400 text-xs justify-center items-center '>

      <div>
        {/* 版權所有© 2023 夢想動畫 Moonshine, 國家高速網路與計算中心 */}
        ai@moonshine.tw
      </div>
      <div className= ' cursor-pointer' onClick={()=>window.open('/docs' , "_blank")}>
        Moonshot Docs
      </div>

    </div>
  )
}

export default Footer