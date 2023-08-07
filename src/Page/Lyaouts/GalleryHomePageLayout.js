import React from 'react'
import { Link, Outlet,useLocation} from 'react-router-dom';


import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from "swiper";
// Import Swiper styles
import 'swiper/css';
import "swiper/css/pagination";
const bannerData = [
  {url:"https://moonshine.b-cdn.net/msweb/moonshotai/gallery_banner/taiwanfood01.png"}
 ]

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
          pagination={{
            clickable: true,
          }} 
          modules={[Pagination,Autoplay]}
          className='w-full'
          >
          {
            bannerData?.map((item)=>{
              
              return(
                <SwiperSlide>
                  <div>
                    <img src={window.innerWidth <= 450 ? item.url+'?width=400' : item.url} alt="slide" className=' rounded-md' />
                  </div>
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