import React from 'react'

function Section02() {
  const menuItems = [
    {gif:"g01.gif",title:"多元風格應用",desc:"無論卡通、漫畫、油畫風格等，Moonshot 能將平凡的圖片轉化為令人驚嘆的插畫作品。還能透過大圖進階功能，將圖片應用於美術概念、平面視覺等創意專案。"},
    {gif:"g02.gif",title:"導入創意製程",desc:"Moonshot 能生成 2D/3D 物件設計、材質貼圖、前期美術概念等參考素材，讓設計師、動畫師和創意愛好者能夠輕鬆地獲取和應用於他們的專案中：角色設計、NFT、3D 渲染圖等項目。"},
    {gif:"g03.gif",title:"寫實照片模擬",desc:"透過寫實逼真的照片模擬指令與關鍵字，生成真人、情境模擬、物件展示等風格圖，並賦予圖片全新的氛圍和情感，可以應用於生成真人廣告海報、影視劇照、視覺、或一切你想像的到的地方！"},
  ]
  return (
    <div className='text-white py-10' >
      <div className='mx-12 flex flex-col items-center'>
        <div className='text-3xl font-bold text-center relative glow'>
          Fulfill Your AI Applications with Diverse Model Styles
          <div 
            className=' absolute -top-12 -left-8 md:-left-12'
            style={{animation: 'float_t01 6s ease-in-out infinite'}}  
          >
            <img src={process.env.PUBLIC_URL+'/images/ver3_images/section02_c01.png'} alt="" />
          </div>
          <div 
            className=' absolute -bottom-14 -right-8 md:-right-12'
            style={{animation: 'float_t01 5.8s ease-in-out infinite'}}  
          >
            <img src={process.env.PUBLIC_URL+'/images/ver3_images/section02_c02.png'} alt="" />
          </div>
        </div>


      </div>

      <div className='w-10/12 mx-auto mt-10 md:mt-20'>
        {menuItems.map((item,index)=>{
          return(
            <div className='flex flex-col justify-center items-center md:flex-row my-10  '>
              <div className={'md:w-1/2 ' + (index === 1 ? ' md:order-2' : ' md:order-1')}>
               <img src={process.env.PUBLIC_URL+'/images/ver3_images/'+item.gif} alt="" className='w-8/12 mx-auto md:w-2/3' />
              </div>

              <div className={'text-center my-5 md:w-1/2 md:px-24 '  + (index === 1 ? 'md: order-1' : ' md:order-2')}>
                <div className='text-lg font-bold'>{item.title}</div>
                <div className='text-xs text-white/70 md:mt-4'>{item.desc}</div>
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default Section02