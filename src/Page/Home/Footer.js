import React from 'react'

function Footer({openModal}) {
  return (
    <div className='flex gap-4 h-10 text-zinc-400 text-xs justify-center items-center '>

      <div>
        {/* 版權所有© 2023 夢想動畫 Moonshine, 國家高速網路與計算中心 */}
        service@moonshine.tw
      </div>
      <div className= ' cursor-pointer' onClick={()=>window.open('/about' , "_blank")}>
        關於 Moonshot
      </div>

    </div>
  )
}

export default Footer