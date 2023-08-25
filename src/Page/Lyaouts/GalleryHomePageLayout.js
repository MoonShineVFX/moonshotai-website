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
  const { data:topRanking, isLoading:isTopRankingLoading, isError:isTopRankingError } = useQuery('topRanking', fetchTopRanking);

  
  return (
    <div className='w-11/12 md:w-11/12 mx-auto my-6 '>
      <div className='flex gap-6 justify-center'>
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
                <SwiperSlide key={'banner'+index}>
                  <Link to={item.path} key={'banner'+index}>
                    <img src={window.innerWidth <= 450 ? item.url+'?width=400' : item.url} alt="slide" className=' rounded-md object-cover h-full' />
                  </Link>
                </SwiperSlide>
              )
            })
          }  
          </Swiper>
          <div className='flex w-1/2 gap-2'>
            <LeaderboardComp 
              title="人氣作者" 
              data={topRanking?.top_liked_users} 
              isLoading={isTopRankingLoading} 
              sliceNum={5} 
              more={true} 
              containerStyle={''}
              containerTitleStyle={''}
              listStyle={''}
              listAvatarStyle={'w-7'}
              listNameStyle={'text-sm'}
            />
            <LeaderboardComp 
              title="創作次數" 
              data={topRanking?.top_render_users} 
              isLoading={isTopRankingLoading} 
              sliceNum={5} 
              more={true}
              containerStyle={''}
              containerTitleStyle={''}
              listStyle={''}
              listAvatarStyle={'w-7'}
              listNameStyle={'text-sm'}
            />
            <LeaderboardComp 
              title="模型排名" 
              data={topRanking?.top_used_models} 
              isLoading={isTopRankingLoading} 
              sliceNum={5} 
              more={true}
              containerStyle={''}
              containerTitleStyle={''}
              listStyle={''}
              listAvatarStyle={'w-7'}
              listNameStyle={'text-sm'}
            />
            <LeaderboardComp 
              title="Lora 排名" 
              data={topRanking?.top_used_loras} 
              isLoading={isTopRankingLoading} 
              sliceNum={5} 
              more={true}
              containerStyle={''}
              containerTitleStyle={''}
              listStyle={''}
              listAvatarStyle={'w-7'}
              listNameStyle={'text-sm'}
            />
          </div>

           
          
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