import React from 'react'

function CommandDoc() {

  const commendItem = [
    {display_name:"寫實風格",name:"PR"},
    {display_name:"插畫風格",name:"CT"},
    {display_name:"漫畫風格",name:"CM"},
    {display_name:"寫實人像",name:"PC"},
    {display_name:"圖生圖",name:"R__"},
    {display_name:"遮罩修改",name:"I__"},
    {display_name:"遮罩固定",name:"O__"},
    {display_name:"骨架參考",name:"P__"},
  ]
  return (
    <div className='text-white '>
      <div className='px-8'>
        <div className='text-lime-500 font-bold'>Command </div>
        <div className='text-2xl font-bold  mb-4'>指令介紹 </div>
      </div>

      <div className='text-white pt-12 px-8'>
        <div className='mt-2 mb-8 leading-9 text-white/70'>
          <table class="border-collapse border border-slate-400 w-full">
            <thead>
              <tr className='bg-zinc-600 '>
                <th className='border border-slate-300 p-2'>功能</th>
                <th className='border border-slate-300 p-2'>指令</th>
              </tr>
            </thead>
            <tbody>
              {commendItem.map((item,index)=>{
                return(
                  <tr>
                    <td className='border border-slate-300 p-2  text-center'>{item.display_name}</td>
                    <td className='border border-slate-300 p-2 text-center'>{item.name}</td>
                  </tr>
                )
              })}

            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

export default CommandDoc