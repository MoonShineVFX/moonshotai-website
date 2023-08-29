import React from 'react'
import { Link, Outlet,useLocation} from 'react-router-dom';
import {  Autoplay } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import {fetchTopLikedUser,fetchTopRenderdUser,fetchTopRanking} from '../../Page/Gallery/helpers/fetchHelper'
import { useQuery } from 'react-query';
import LeaderboardComp from '../Gallery/Gallery/LeaderboardComp';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import "swiper/css/pagination";

const bannerData = [
  {url:"https://moonshine.b-cdn.net/msweb/moonshotai/gallery_banner/asusnft2880.png?v2",path:'/asusnft'},
  {url:"https://moonshine.b-cdn.net/msweb/moonshotai/gallery_banner/taiwanfood.png",path:'/taiwanfood'},
  {url:"https://moonshine.b-cdn.net/msweb/moonshotai/gallery_banner/sdxl.png"},
  {url:"https://moonshine.b-cdn.net/msweb/moonshotai/gallery_banner/moonshot01.png"},
 ]

 const pageLinkItems = [
  {title:'最新創作',path:'/gallery'},
  // {title:'活動作品',path:'/campaign'},
 ]
const GalleryHomePageLayout = () => {
  const location = useLocation();
  const { data:topRanking, isLoading:isTopRankingLoading, isError:isTopRankingError } = useQuery('topRanking', fetchTopRanking);

  
  return (
    <div className='w-11/12 md:w-11/12 mx-auto my-6 '>
      <div className='grid grid-cols-7 gap-4'>
          <Swiper
            spaceBetween={1}
            slidesPerView={1}
            loop={true}
            modules={[Autoplay]}
            className='w-full h-auto col-span-3'
            autoplay={{
              delay: 5500,
              disableOnInteraction: false,
            }}
          >
          {
            bannerData?.map((item,index)=>{
              
              return(
                <SwiperSlide key={'banner'+index}>
                  {item.path ? (

                    <Link to={item.path} key={'banner'+index} className=' aspect-[1920/853]'>
                      <img src={window.innerWidth <= 450 ? item.url : item.url} alt="slide" className=' rounded-md  ' />
                    </Link>
                  ) : (
                    <div key={'banner'+index} className=' aspect-[1920/853] bg-blue-gray-300'>
                      <img src={window.innerWidth <= 450 ? item.url : item.url} alt="slide" className=' rounded-md  ' />
                    </div>
                  )
                  }

                </SwiperSlide>
              )
            })
          }  
          </Swiper>

          <LeaderboardComp 
            page={'home'}
            title="人氣作者" 
            data={topRanking?.top_liked_users} 
            isLoading={isTopRankingLoading} 
            customer_sliceNum={4} 
            more={true} 
            containerStyle={''}
            containerTitleStyle={''}
            listContainerStyle={''}
            listStyle={'h-[25%]'}
            listAvatarStyle={'w-7'}
            listNameStyle={'text-sm'}
            is_link={true}
            linkpath={'/user/'}
          />
          <LeaderboardComp 
            page={'home'}
            title="創作次數" 
            data={topRanking?.top_render_users} 
            isLoading={isTopRankingLoading} 
            customer_sliceNum={4} 
            more={true}
            containerStyle={''}
            containerTitleStyle={''}
            listStyle={'h-[25%]'}
            listAvatarStyle={'w-7'}
            listNameStyle={'text-sm'}
            is_link={true}
            linkpath={'/user/'}
          />
          <LeaderboardComp 
            page={'home'}
            title="模型排名" 
            data={topRanking?.top_used_models} 
            isLoading={isTopRankingLoading} 
            customer_sliceNum={4} 
            more={true}
            containerStyle={''}
            containerTitleStyle={''}
            listStyle={'h-[25%]'}
            listAvatarStyle={'w-7'}
            listNameStyle={'text-sm'}
          />
          <LeaderboardComp 
            page={'home'}
            title="Lora 排名" 
            data={topRanking?.top_used_loras} 
            isLoading={isTopRankingLoading} 
            customer_sliceNum={4} 
            more={true}
            containerStyle={''}
            containerTitleStyle={''}
            listStyle={'h-[25%]'}
            listAvatarStyle={'w-7'}
            listNameStyle={'text-sm'}
          />
          

      </div>
      <div className='text-white text-xl  mb-3 font-bold flex space-x-6 mt-14'>
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