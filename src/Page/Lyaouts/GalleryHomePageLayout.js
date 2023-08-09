import React from 'react'
import { Link, Outlet,useLocation} from 'react-router-dom';

import { Pagination, Autoplay, EffectFade } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import "swiper/css/pagination";

const bannerData = [
  {url:"/msweb/moonshotai/gallery_banner/asusnft2880.png",path:'/asusnft'},
  {url:"/msweb/moonshotai/gallery_banner/taiwanfood01.png",path:'/taiwanfood'},
 ]
 const resourceURL = 'https:/resource.moonshine.tw'
 const pageLinkItems = [
  {title:'Gallery',path:'/gallery'},
  {title:'Campaign',path:'/campaign'},
 ]
const GalleryHomePageLayout = () => {
  const location = useLocation();
  return (
    <div className='w-11/12 md:w-11/12 mx-auto my-6'>
      <div >
          <Swiper
          spaceBetween={1}
          slidesPerView={1}
          loop={true}
          modules={[Autoplay]}
          className='w-full'
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          >
          {
            bannerData?.map((item)=>{
              
              return(
                <SwiperSlide>
                  <Link to={item.path}>
                    <img src={window.innerWidth <= 450 ? resourceURL+item.url+'?width=400' : resourceURL+item.url} alt="slide" className=' rounded-md' />
                  </Link>
                </SwiperSlide>
              )
            })
          }  
          </Swiper>
      </div>
      <div className='text-white text-xl  mb-3 font-bold flex space-x-6'>
        {
          pageLinkItems.map((item)=>{
            return(
              <Link to={item.path} className={`pb-2  ${location.pathname === item.path ? ' text-white border-b': ' text-white/70'}` }>{item.title}</Link>
            )
            })
        }
       
      </div>
      <Outlet />
    </div>
  )
}

export default GalleryHomePageLayout