import React from 'react'
import { Link, Outlet,useLocation} from 'react-router-dom';

import {  Autoplay } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import "swiper/css/pagination";

const bannerData = [
  {url:"https://moonshine.b-cdn.net/msweb/moonshotai/gallery_banner/asusnft2880.png?v2",path:'/asusnft'},
  {url:"https://moonshine.b-cdn.net/msweb/moonshotai/gallery_banner/taiwanfood01.png",path:'/taiwanfood'},
 ]

 const pageLinkItems = [
  {title:'最新創作',path:'/gallery'},
  // {title:'活動作品',path:'/campaign'},
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
            bannerData?.map((item,index)=>{
              
              return(
                <SwiperSlide>
                  <Link to={item.path} key={'banner'+index}>
                    <img src={window.innerWidth <= 450 ? item.url+'?width=400' : item.url} alt="slide" className=' rounded-md' />
                  </Link>
                </SwiperSlide>
              )
            })
          }  
          </Swiper>
      </div>
      <div className='text-white text-xl  mb-3 font-bold flex space-x-6'>
        {
          pageLinkItems.map((item,index)=>{
            return(
              <Link to={item.path} key={'pagelink'+index} className={`pb-2  ${location.pathname === item.path ? ' text-white border-b': ' text-white/70'}` }>{item.title}</Link>
            )
            })
        }
       
      </div>
      <Outlet />
    </div>
  )
}

export default GalleryHomePageLayout