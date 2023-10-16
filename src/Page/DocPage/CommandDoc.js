import React,{useEffect} from 'react'
import { getAnalytics, logEvent } from "firebase/analytics";
function CommandDoc() {
  const analytics = getAnalytics();
  useEffect(()=>{
    logEvent(analytics, 'Doc_指令介紹頁_進入訪問')
  },[])
  const commendItem = [
    {display_name:"寫實風格",name:"PR"},
    {display_name:"插畫風格",name:"CT"},
    {display_name:"漫畫風格",name:"CM"},
    {display_name:"寫實人像",name:"PC"},
    {display_name:"參考圖生圖",name:"R**"},
    {display_name:"遮罩修改",name:"I**"},
    {display_name:"遮罩固定",name:"O**"},
    {display_name:"骨架參考",name:"P**"},
    {display_name:"放大",name:"/ext"},
    {display_name:"大圖",name:"/hr"},
    {display_name:"中圖",name:"/mr"},
    {display_name:"調整步數",name:"/steps:1-50"},
    {display_name:"直圖",name:"/V"},
    {display_name:"橫圖",name:"/H"},
    {display_name:"負面詞",name:"--"},
    {display_name:"加字",name:"+字"},
    {display_name:"文字座標位置",name:"+(x,y,size,一行內有幾個字)"},

  ]

  /*
  【一般指令｜文生圖 】
• 寫實 PR
• 插畫 CT 
• 漫畫 CM 
• 寫實人像 PC

【一般指令｜圖生圖】
• 參考 R**

【進階指令】(**此指令為進階帳戶使用**)
• 修改 I**
• 固定 O**
• 骨架 P** 
• 放大 /ext
• 大圖 /hr
• 中圖 /mr
• 調整步數 steps:1-50

【工具指令】
• 直 /V
• 橫 /H
• ‐‐ 負面詞
• ＋加字
  ＋(x,y,size,一行內有幾個字)
  
  */ 
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
              <tr className='bg-gray-600 '>
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