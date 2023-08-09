import React,{useEffect,useState} from 'react'
import { Pagination, Autoplay,Navigation } from "swiper";
import { Swiper, SwiperSlide,useSwiper } from 'swiper/react';
import { MdNavigateNext,MdNavigateBefore } from "react-icons/md";
// Import Swiper styles
import 'swiper/css';
import "swiper/css/pagination";
import 'swiper/css/navigation';
const bannerData = [
  {url:"https://moonshine.b-cdn.net/msweb/moonshotai/campaign/taiwanfood/stepimg/01.jpg"},
  {url:"https://moonshine.b-cdn.net/msweb/moonshotai/campaign/taiwanfood/stepimg/02.jpg"},
  {url:"https://moonshine.b-cdn.net/msweb/moonshotai/campaign/taiwanfood/stepimg/03.jpg"},
  {url:"https://moonshine.b-cdn.net/msweb/moonshotai/campaign/taiwanfood/stepimg/04.jpg"},
  {url:"https://moonshine.b-cdn.net/msweb/moonshotai/campaign/taiwanfood/stepimg/05.jpg"},
  {url:"https://moonshine.b-cdn.net/msweb/moonshotai/campaign/taiwanfood/stepimg/06.jpg"},
  {url:"https://moonshine.b-cdn.net/msweb/moonshotai/campaign/taiwanfood/stepimg/07.jpg"},
 ]
const TaiwanFood = () => {
  const [isMobileWidth, setIsMobileWidth] = useState(false);
  const swiper = useSwiper();
  const handleResize = () => {
    setIsMobileWidth(window.innerWidth <= 420);
  };
  useEffect(()=>{
    window.addEventListener('resize', handleResize);

    // 移除監聽器
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  })
  return (
    <div className='pb-20'>
      <div className='w-2/3 mx-auto flex justify-center my-8 '>
        <img src="https://resource.moonshine.tw/msweb/moonshotai/campaign/taiwanfood/taiwanfood_banner_2k.png" alt="banner" className='max-w-full'/>
      </div>

      <div className="text-white flex flex-col justify-center md:items-center px-10 md:px-4 py-2">
        <h1 className='text-2xl md:text-4xl  font-bold my-2'>Moonshot 限定｜台灣美食 LoRa 第一彈！</h1>
        
        <div className='text-xs md:text-base'>
          <div className='flex flex-col justify-center md:items-center  my-4 md:my-10 gap-1 '>
            <p>＼各位客官，Moonshot 限定的台灣美食 LoRa，上菜／</p>
            <p className=''>豆花、滷肉飯、蚵仔煎....多達 20 種的台灣美食 LoRa 讓你算到撐 🤤</p>
          </div>

          <div className='flex flex-col justify-center md:items-center my-4 md:my-10 gap-1 '>
            <p>喔對，除了生圖，你還有這些用法......</p>
            <p >女友肚子餓怎麼辦？ Moonshot 開起來直接點餐。</p>
            <p>外國友人來台吃啥？ Moonshot 必比登美食推薦。</p>
            <p>減肥的朋友快放棄？ 打開 Moonshot 肚子飽三圈。</p>

          </div>
          <div className='flex flex-col justify-center md:items-center gap-1'>
            <h2 className='text-xl font-bold my-3 '>如何使用指令？</h2>
            <p>​​➊ 對話框中輸入「/台灣美食」</p>
            <p>➋ 點擊圖片按鈕即可獲得指令！</p>
            <div className='md:w-full w-4/5 mx-auto mt-10 max-w-[512px] relative'>
              <Swiper
                spaceBetween={1}
                slidesPerView={1}
                loop={true}
                modules={[Autoplay,Navigation]}
                navigation={{
                  nextEl: ".slidenext",
                  prevEl: ".slideprev"
                }}
                className='w-full'
                autoplay={{
                  delay: 5000,
                }}
              >
              {
                bannerData?.map((item,index)=>{
                  return(
                    <SwiperSlide key={'tf'+index}>
                        <img src={item.url} alt="slide" className=' aspect-square object-cover ' />
                    </SwiperSlide>
                  )
                })
              }  
              <div className='flex w-full justify-between  z-50 top-1/2 -translate-y-[70%] absolute px-4'>
                <button className='slideprev bg-white/80 text-black/80 rounded-full border border-black/30' ><MdNavigateBefore size={33} /></button>
                <button className='slidenext bg-white/80 text-black/80 rounded-full border border-black/30' ><MdNavigateNext size={33}/></button>
              </div>
  
              </Swiper>

            </div>
          </div>
          
        </div>



      </div>
      
    </div>
  )
}

export default TaiwanFood