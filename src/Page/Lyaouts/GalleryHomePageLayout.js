import React from 'react'
import { Link, Outlet,useLocation} from 'react-router-dom';
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { GiShield,GiArson } from "react-icons/gi";
import {  Autoplay } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import {fetchTopLikedUser,fetchTopRenderdUser} from '../../Page/Gallery/helpers/fetchHelper'
import {LoadingLogoSpin,recordPageUrl} from '../../Page/Gallery/helpers/componentsHelper'
import { useQuery } from 'react-query';
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
  const { data:topLikedUser, isLoading:isTopLikedUserLoading, isError:isTopLikedUserError } = useQuery('topLikedUsers', fetchTopLikedUser);
  const { data:topRenderUser, isLoading:isTopRenderUserLoading, isError:isTopRenderUserError } = useQuery('topRenderUsers', fetchTopRenderdUser);
  function formatNumberWithK(number) {
    if (number >= 1000) {
      const formattedNumber = (number / 1000).toFixed(1) + 'k';
      return formattedNumber;
    }
    return number.toString();
  }
  
  return (
    <div className='w-11/12 md:w-11/12 mx-auto my-6 '>
      <div className='flex gap-3 justify-center'>
          <Swiper
          spaceBetween={1}
          slidesPerView={1}
          loop={true}
          modules={[Autoplay]}
          className='w-1/2 h-auto'
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          >
          {
            bannerData?.map((item,index)=>{
              
              return(
                <SwiperSlide >
                  <Link to={item.path} key={'banner'+index}>
                    <img src={window.innerWidth <= 450 ? item.url+'?width=400' : item.url} alt="slide" className=' rounded-md object-cover h-full' />
                  </Link>
                </SwiperSlide>
              )
            })
          }  
          </Swiper>
          <div className='flex w-1/2 gap-2'>
            <div className='flex-1 bg-gray-900 rounded-md p-2'>
              <div className='text-white text-sm'>人氣作者</div>
              <div className=' space-y-3 mt-3'>
                {
                  isTopLikedUserLoading ? (<LoadingLogoSpin />) :
                  (
                    topLikedUser.slice(0,5).map((item,index)=>{
                      return(
                        <div className='flex items-center justify-start gap-1'>
                          <div className='text-white/80 text-sm mr-2'>{index === 0 ?  <GiArson color="gold" size={14} /> : '0'+index }</div>
                          <div className='text-sm flex items-center     text-white'>
                            <Link to={`/user/${item.id}`}  className='w-7' onClick={recordPageUrl}>
                              <div className='pt-[100%] relative'>
                                <img src={item?.profile_image} alt="user avatar" className='absolute aspect-square top-1/2 left-0 -translate-y-1/2 object-cover w-full h-fulls rounded-full'/>
                              </div>
                            </Link>
                          </div>
                          <div> 
                            <div className='text-xs text-amber-400'>{item?.name}</div>
                            <div className='flex items-center text-white/70 text-xs'> <MdOutlineLocalFireDepartment color="red" size="13" />{item.monthly_likes}</div>
                          </div>
                        </div>
                      )
                    })
                  )
                }
              </div>

            </div>
            <div className='flex-1 bg-gray-900 rounded-md p-2'>
              <div className='text-white text-sm'>創作次數</div>
              <div className=' space-y-3 mt-3'>
                {
                  isTopRenderUserLoading ? (<LoadingLogoSpin />) :
                  (
                    topRenderUser.slice(0,5).map((item,index)=>{
                      return(
                        <div className='flex items-center justify-start gap-1'>
                          <div className='text-white/80 text-sm mr-2'>{index === 0 ?  <GiArson color="gold" size={14} /> : '0'+index }</div>
                          <div className='text-sm flex items-center     text-white'>
                            <Link to={`/user/${item.id}`}  className='w-7' onClick={recordPageUrl}>
                              <div className='pt-[100%] relative'>
                                <img src={item?.profile_image} alt="user avatar" className='absolute aspect-square top-1/2 left-0 -translate-y-1/2 object-cover w-full h-fulls rounded-full'/>
                              </div>
                            </Link>
                          </div>
                          <div> 
                            <div className='text-xs text-amber-400'>{item?.name}</div>
                            <div className='flex items-center text-white/70 text-xs'> <MdOutlineLocalFireDepartment color="red" size="13" />{formatNumberWithK(item.monthly_renders)}</div>
                          </div>
                        </div>
                      )
                    })
                  )
                }
              </div>
            </div>
            <div className='flex-1 bg-gray-900 rounded-md p-2'>
              <div className='text-white text-sm'>模型排名</div>
              <div className=' space-y-3 mt-3'>
               
              </div>
            </div>

          </div>
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