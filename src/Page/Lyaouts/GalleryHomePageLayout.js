import React, { Suspense } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

import {
  fetchTopLikedUser,
  fetchTopRenderdUser,
  fetchTopRanking,
} from "../../Page/Gallery/helpers/fetchHelper";
import { LoadingLogoSpin } from "../Gallery/helpers/componentsHelper";

import { useQuery } from "react-query";
import LeaderboardComp from "../Gallery/Gallery/LeaderboardComp";
// Import Swiper styles
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const bannerData = [
  {
    url: "https://r2.web.moonshine.tw/msweb/moonshotai/gallery_banner/asusnftv02_1.png?v2",
    path: "/asusnft",
  },
  {
    url: "https://r2.web.moonshine.tw/msweb/moonshotai/gallery_banner/taiwanfood.png?v2",
    path: "/taiwanfood",
  },
  {
    url: "https://r2.web.moonshine.tw/msweb/moonshotai/gallery_banner/sdxl.png?v2",
    path: "/sdxl",
  },
  {
    url: "https://r2.web.moonshine.tw/msweb/moonshotai/gallery_banner/moonshot01.png?v2",
    path: "/voice",
  },
];

const pageLinkItems = [
  { title: "最新創作", path: "/gallery" },
  // {title:'活動作品',path:'/campaign'},
];
const GalleryHomePageLayout = () => {
  const location = useLocation();
  const {
    data: topRanking,
    isLoading: isTopRankingLoading,
    isError: isTopRankingError,
  } = useQuery("topRanking", fetchTopRanking);

  return (
    <div className="w-11/12 md:w-11/12 mx-auto my-6 ">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-1/2 ">
          <img
            src="https://r2.web.moonshine.tw/msweb/moonshotai/gallery_banner/img001.png?width=750"
            alt=""
            className="aspect-[24/9]  w-full object-cover rounded-md"
          />
        </div>
        <div className="lg:w-1/2 flex flex-row md:flex-row justify-between gap-2 md:gap-4  ">
          <Suspense>
            <LeaderboardComp
              page={"home"}
              title="人氣作者"
              data={topRanking?.top_liked_users}
              isLoading={isTopRankingLoading}
              customer_sliceNum={10}
              more={true}
              containerStyle={""}
              containerTitleStyle={"text-sm"}
              listContainerStyle={"text-sm"}
              listStyle={"h-[20%]"}
              listAvatarStyle={"w-7"}
              listNameStyle={"text-sm"}
              is_link={true}
              linkpath={"/user/"}
              tip={"本月份以來，使用者獲得愛心數量排名。"}
            />
            {/* <LeaderboardComp 
              page={'home'}
              title="創作次數" 
              data={topRanking?.top_render_users} 
              isLoading={isTopRankingLoading} 
              customer_sliceNum={10} 
              more={true}
              containerStyle={''}
              containerTitleStyle={'text-sm'}
              listStyle={'h-[25%]'}
              listAvatarStyle={'w-7'}
              listNameStyle={'text-sm'}
              is_link={true}
              linkpath={'/user/'}
            /> */}
            <LeaderboardComp
              page={"home"}
              title="模型排名"
              data={topRanking?.top_used_models}
              borderType={"model"}
              isLoading={isTopRankingLoading}
              customer_sliceNum={6}
              more={true}
              containerStyle={""}
              containerTitleStyle={"text-sm"}
              listStyle={"h-[25%]"}
              listAvatarStyle={"w-7"}
              listNameStyle={"text-sm"}
              tip={"本月份以來 Models 指令的使用量排名。"}
            />
            <LeaderboardComp
              page={"home"}
              title="LoRA 排名"
              data={topRanking?.top_used_loras}
              isLoading={isTopRankingLoading}
              customer_sliceNum={10}
              more={true}
              containerStyle={""}
              containerTitleStyle={"text-sm"}
              listStyle={"h-[25%]"}
              listAvatarStyle={"w-7"}
              listNameStyle={"text-sm"}
              tip={"本月份以來 LoRA 指令的使用量排名。"}
            />
          </Suspense>
        </div>
      </div>
      <div className="text-white text-xl  mb-3 font-bold flex space-x-6 mt-14">
        {pageLinkItems.map((item, index) => {
          return (
            <Link
              to={item.path}
              key={"pagelink" + index}
              className={`pb-2  ${
                location.pathname === item.path
                  ? " text-white border-b"
                  : " text-white/70"
              }`}
            >
              {item.title}
            </Link>
          );
        })}
      </div>
      <Outlet />
    </div>
  );
};

export default GalleryHomePageLayout;
