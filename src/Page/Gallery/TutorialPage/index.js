import React from "react";
import {
  MdClose,
  MdAddCircle,
  MdAdsClick,
  MdRemoveCircle,
  MdMoreVert,
  MdModeEdit,
} from "react-icons/md";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
function Index() {
  const imageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  return (
    <div className=" fixed top-0 left-0 w-full h-screen bg-black/90 z-50">
      <div className="bg-white absolute  rounded-full right-5 top-10">
        <MdClose size={28} />
      </div>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
        className="w-full"
      >
        <SwiperSlide>
          {/* page1 */}
          <div className=" relative text-white py-10 px-2">
            <div className="text-center text-lg font-bold text-white/70 my-4">
              留存圖片是什麼
            </div>
            <div className="text-sm my-2 px-4">
              在 MoonShot 中繪製的圖片，會依序顯示到 Renders
              頁面中，如果要做進一步的分享或編輯圖片資料，必須將圖片留存到
              Storage 頁面。
            </div>
            <div className="text-xs mt-10 text-center text-white/80">
              {" "}
              按下加入留存按鈕 將圖片儲存到 Storage{" "}
            </div>
            <div className="w-1/2 mx-auto my-2">
              <motion.div
                key={"render-"}
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                className=" overflow-hidden relative"
              >
                <div className="pt-[100%] relative">
                  <img
                    src="https://r2.web.moonshine.tw/msweb/moonshotai/static/134b17f/456883438323761330_1.jpg"
                    className=" absolute top-1/2 left-0 -translate-y-1/2 object-cover w-full h-full rounded-md"
                    alt="img"
                  />
                  <div className="text-xs text-white/90 absolute bottom-0  bg-gray-800/40 w-full p-1"></div>
                </div>

                <div
                  className={
                    "  flex items-center  justify-center text-xs rounded-full  p-2 w-full mt-1   text-white  bg-gray-700 relative"
                  }
                >
                  <div className="flex items-center  justify-center gap-1">
                    <MdAddCircle /> <span>加入留存</span>
                  </div>
                </div>
                <div className=" absolute right-1 bottom-2 z-10 text-yellow-500 ">
                  <MdAdsClick size={35} />
                </div>
              </motion.div>
            </div>

            <div className="text-xs mt-10 text-center text-white/80">
              {" "}
              按下移除留存按鈕，取消儲存此圖片。{" "}
            </div>
            <div className="w-1/2 mx-auto my-2">
              <motion.div
                key={"render-"}
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                className=" overflow-hidden relative"
              >
                <div className="pt-[100%] relative">
                  <img
                    src="https://r2.web.moonshine.tw/msweb/moonshotai/static/134b17f/456883438323761330_1.jpg"
                    className=" absolute top-1/2 left-0 -translate-y-1/2 object-cover w-full h-full rounded-md"
                    alt="img"
                  />
                  <div className="text-xs text-white/90 absolute bottom-0  bg-gray-800/40 w-full p-1"></div>
                </div>

                <div
                  className={
                    "  flex items-center  justify-center text-xs rounded-full  p-2 w-full mt-1   text-white  bg-gray-500 relative"
                  }
                >
                  <div className="flex items-center  justify-center gap-1">
                    <MdRemoveCircle /> <span>移除留存</span>
                  </div>
                </div>
                <div className=" absolute right-1 bottom-2 z-10 text-yellow-500 ">
                  <MdAdsClick size={35} />
                </div>
              </motion.div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          {/* page2 */}
          <div className=" relative text-white py-10 px-2">
            <div className="text-center text-lg font-bold text-white/70 my-4">
              分享圖片
            </div>
            <div className="text-sm my-2 px-4">
              點選到 Storage 頁面，圖片左上鉛筆圖案按鈕，可以進行分享設定。
            </div>
            <div className="text-xs mt-10 text-center text-white/80">
              {" "}
              按下編輯按鈕，進行設定{" "}
            </div>
            <div className="w-1/2 mx-auto my-2">
              <motion.div
                key={"render-"}
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                className=" overflow-hidden relative"
              >
                <div className="pt-[100%] relative">
                  <img
                    src="https://r2.web.moonshine.tw/msweb/moonshotai/static/134b17f/456883438323761330_1.jpg"
                    className=" absolute top-1/2 left-0 -translate-y-1/2 object-cover w-full h-full rounded-md"
                    alt="img"
                  />
                  <div className="text-xs text-white/90 absolute bottom-0  bg-gray-800/40 w-full p-1"></div>
                </div>

                <div className=" absolute top-0 left-0 text-white w-full flex justify-between items-center  ">
                  <div className="p-2 ">
                    <div className="rounded-full bg-gray-800/80 p-2">
                      <MdMoreVert size={15} />
                    </div>
                  </div>
                  <div className="text-white p-2">
                    <div className={"rounded-full p-2 bg-gray-800 text-white"}>
                      {" "}
                      <MdModeEdit size={15} />
                    </div>
                  </div>
                </div>

                <div className=" absolute right-0 top-1 z-10 text-yellow-500 ">
                  <MdAdsClick size={35} />
                </div>
              </motion.div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          {/* page3 */}
          <div className=" relative text-white py-10 px-2">
            <div className="text-center text-lg font-bold text-white/70 my-4">
              修改個人資料
            </div>
            <div className="text-sm my-2 px-4">
              點選到 Storage 頁面，圖片左上鉛筆圖案按鈕，可以進行分享設定。
            </div>
            <div className="text-xs mt-10 text-center text-white/80">
              {" "}
              按下編輯按鈕，進行設定{" "}
            </div>
            <div className="w-1/2 mx-auto my-2">
              <motion.div
                key={"render-"}
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                className=" overflow-hidden relative"
              >
                <div className="pt-[100%] relative">
                  <img
                    src="https://r2.web.moonshine.tw/msweb/moonshotai/static/134b17f/456883438323761330_1.jpg"
                    className=" absolute top-1/2 left-0 -translate-y-1/2 object-cover w-full h-full rounded-md"
                    alt="img"
                  />
                  <div className="text-xs text-white/90 absolute bottom-0  bg-gray-800/40 w-full p-1"></div>
                </div>

                <div className=" absolute top-0 left-0 text-white w-full flex justify-between items-center  ">
                  <div className="p-2 ">
                    <div className="rounded-full bg-gray-800/80 p-2">
                      <MdMoreVert size={15} />
                    </div>
                  </div>
                  <div className="text-white p-2">
                    <div className={"rounded-full p-2 bg-gray-800 text-white"}>
                      {" "}
                      <MdModeEdit size={15} />
                    </div>
                  </div>
                </div>

                <div className=" absolute right-0 top-1 z-10 text-yellow-500 ">
                  <MdAdsClick size={35} />
                </div>
              </motion.div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
      </Swiper>

      {/* page2 */}
      {/* page3 */}
      {/* page4 */}
      {/* page5 */}
    </div>
  );
}

export default Index;
