import React from "react";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { IconButton } from "@material-tailwind/react";

import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
// Import Swiper styles
import "swiper/css";
function Section_models() {
  const menuItems = [
    {
      value: "m01",
      image:
        "https://r2.web.moonshine.tw/msweb/moonshotai/home_images/models/xl.webp",
      title: "SDXL 1.0",
      desc: "Stable Diffusion 最新的開源模型。",
    },
    {
      value: "m02",
      image:
        "https://r2.web.moonshine.tw/msweb/moonshotai/home_images/models/ct.jpeg",
      title: "風格化插畫 (CT)",
      desc: "團隊組合多種精選插畫模型，易於創造出戲劇化的構圖與不同質感 (水彩、油畫)等風格圖。",
    },
    {
      value: "m03",
      image:
        "https://r2.web.moonshine.tw/msweb/moonshotai/home_images/models/pr.jpeg",
      title: "Realistic Vision V1.3 (PR)",
      desc: "生成圖具有真實的紋理和逼真色彩，可以生成出場景、人物肖像、動物等寫實風格。",
    },
    {
      value: "m04",
      image:
        "https://r2.web.moonshine.tw/msweb/moonshotai/home_images/models/pc.jpeg",
      title: "Photorealistic Character (PC)",
      desc: "可繪製於寫實人物，細節豐富質感佳，且能營造出精緻的光線變化。",
    },
    {
      value: "m05",
      image:
        "https://r2.web.moonshine.tw/msweb/moonshotai/home_images/models/cm.webp",
      title: "Anything V4.5 (CM)",
      desc: "善於生成 2D 風格圖像，表現穩定入門難度低。",
    },
  ];
  return (
    <div className="flex flex-col text-white">
      <div className="flex justify-between w-full items-center">
        <div className=" flex flex-col items-center w-3/6">
          <div className="text-3xl font-bold relative glow">
            Fulfill Your AI Applications With{" "}
            <span className="text-[#BDDE48]">Diverse Model Styles</span>
            <div
              className=" absolute -top-12 -left-8 md:-left-12"
              style={{ animation: "float_t01 6s ease-in-out infinite" }}
            >
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/images/ver3_images/section02_c01.png"
                }
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="w-1/3 flex gap-10 justify-end">
          <IconButton
            variant="outlined"
            className="slideprev rounded-full text-white border-white"
          >
            <FaAngleLeft />
          </IconButton>
          <IconButton
            variant="outlined"
            className="slidenext rounded-full text-white border-white"
          >
            <FaAngleRight />
          </IconButton>
        </div>
      </div>

      <div className="w-full">
        <Swiper
          key="model"
          spaceBetween={20}
          slidesPerView={4}
          loop={true}
          navigation={{
            nextEl: ".slidenext",
            prevEl: ".slideprev",
          }}
          modules={[Navigation]}
          className="w-full"
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {menuItems.map((item, index) => {
            return (
              <SwiperSlide key={"model" + index}>
                <div className="flex flex-col justify-center items-center  my-20  ">
                  <div className={""}>
                    <img
                      src={item.image}
                      alt=""
                      className="w-full aspect-video object-cover rounded-md object-top"
                    />
                  </div>
                  <div className={" my-6 px-2 "}>
                    <div className="text-sm font-bold text-white">
                      {item.title}
                    </div>
                    <div className="text-xs text-white/80 mt-4">
                      {item.desc}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

export default Section_models;
