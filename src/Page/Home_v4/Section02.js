import React from 'react'
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
// Import Swiper React components
import {  Navigation } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
// Import Swiper styles
import 'swiper/css';
function Section02() {
  const [activeTab, setActiveTab] = React.useState("g01");
  const menuItems = [
    {value:'g01',gif:"https://moonshine.b-cdn.net/msweb/moonshotai/home_images/g01_230x230.gif",title:"多元風格應用",desc:"無論卡通、漫畫、油畫風格等，Moonshot 能將平凡的圖片轉化為令人驚嘆的插畫作品。還能透過大圖進階功能，將圖片應用於美術概念、平面視覺等創意專案。"},
    {value:'g02',gif:"https://moonshine.b-cdn.net/msweb/moonshotai/home_images/g02_230x230.gif",title:"導入創意製程",desc:"Moonshot 能生成 2D/3D 物件設計、材質貼圖、前期美術概念等參考素材，讓設計師、動畫師和創意愛好者能夠輕鬆地獲取和應用於他們的專案中：角色設計、NFT、3D 渲染圖等項目。"},
    {value:'g03',gif:"https://moonshine.b-cdn.net/msweb/moonshotai/home_images/g03_230x230.gif",title:"寫實照片模擬",desc:"透過寫實逼真的照片模擬指令與關鍵字，生成真人、情境模擬、物件展示等風格圖，並賦予圖片全新的氛圍和情感，可以應用於生成真人廣告海報、影視劇照、視覺、或一切你想像的到的地方！"},
  ]
  return (
    <div className='text-white md:py-20' >
      <div className='mx-12 flex flex-col items-center'>
        <div className='text-3xl font-bold text-center relative glow'>
            Ubiquitous <span className='text-[#BDDE48]'> AI Applications</span>
          <div 
            className=' absolute -top-12 -left-8 md:-left-12'
            style={{animation: 'float_t01 6s ease-in-out infinite'}}  
          >
            <img src={process.env.PUBLIC_URL+'/images/ver3_images/section02_c01.png'} alt="" />
          </div>
        </div>


      </div>

      <div className='w-10/12 mx-auto mt-20 md:mt-20 hidden md:block'>
        <Tabs value="g01" className="">
          <TabsHeader
            className="rounded-none border-b border-gray-50/20 bg-transparent p-0 "
            indicatorProps={{
              className:
                "bg-transparent border-b-0 border-lime-900 shadow-none rounded-none h-1  bg-gradient-to-l from-[#BDDE48] via-[#C0CFA6] to-[#C2C1FD]  mt-8",
            }}
          >
            {menuItems.map(({ title, value }) => (
              <Tab
                key={value}
                value={value}
                onClick={() => setActiveTab(value)}
                className={`tracking-widest ${activeTab === value ? "text-gray-100" : "text-gray-500" }`}
              >
                {title}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            {menuItems.map(({ value, desc,gif,title,index }) => (
              <TabPanel key={value} value={value}>
                <div className='flex flex-col justify-center items-center md:flex-row my-10  '>
                  <div className={' my-5 md:w-1/2 md:px-24 '  }>
                    <div className='text-xl font-bold text-white'>{title}</div>
                    <div className='text-base text-white/80 md:mt-4'>{desc}</div>
                  </div>
                  <div className={'md:w-1/2 '}>
                  <img src={gif} alt="" className='w-8/12 mx-auto md:w-2/3' />
                  </div>
                </div>
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
      <div className='block md:hidden'>
      <Swiper
        key="style"
        spaceBetween={40}
        slidesPerView={1.5}
        centeredSlides={true}
        loop={true}
        navigation
        center
        modules={[Navigation]}
        className='w-full'
      >
        {menuItems.map((item,index)=>{
          return(
            <SwiperSlide key={'style'+index}>
                <div className='flex flex-col justify-center items-center  my-20  '>
                  <div className={'w-full '}>
                    <img src={item.gif} alt="" className='w-full' />
                  </div>
                  <div className={'text-center my-6 px-2 '  }>
                    <div className='text-xl font-bold text-white'>{item.title}</div>
                    <div className='text-xs text-white/80 mt-4'>{item.desc}</div>
                  </div>

                </div>
            </SwiperSlide>
          )
        })
        }

      </Swiper>
      </div>

    </div>
  )
}

export default Section02