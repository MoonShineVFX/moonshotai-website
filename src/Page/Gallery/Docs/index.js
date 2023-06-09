import React, { useState, useEffect } from 'react';
import { AnimatePresence,motion } from "framer-motion";
import Header from '../header'
import { animateScroll as scroll, scroller } from 'react-scroll';
import {  useRecoilValue ,useRecoilState } from 'recoil';
import { isLoginState,loginState,lineProfileState,userState} from '../atoms/galleryAtom';
import {getStoredLocalData} from '../helpers/fetchHelper'
import { FaBars,FaTimes } from "react-icons/fa";
function Index() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginState);
  const [lineProfile, setLineProfile] = useRecoilState(lineProfileState);
  const [linLoginData, setLineLoginData] = useRecoilState(loginState)
  const [currentUser, setCurrentUser] = useRecoilState(userState)
  const [currentKey, setCurrentKey] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuFixed, setIsMenuFixed] = useState(false);
  const scrollTo = (target) => {
    scroller.scrollTo(target, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
    });
  };
  const menuItem = [
    {title:"關於moonshot",section:"section1"},
    {title:"指令介紹",section:"section2"},
    {title:"模型介紹",section:"section3"},
    {title:"社群規章",section:"section4"},
    {title:"使用聲明",section:"section5"},
  ]
  const handleMenuItemClick = (index) => {
    scrollTo(menuItem[index].section);
    setCurrentKey(index);
    setIsOpen(false); // 自動隱藏選單
  };
  useEffect(()=>{
    getStoredLocalData().then(data=>{
        setIsLoggedIn(data.isLogin)
        setLineLoginData(data.loginToken)
        setLineProfile(data.lineProfile)
        setCurrentUser(data.currentUser)
        let headers = {'Content-Type': 'application/json'} 
        
      })
  },[setIsLoggedIn,setLineLoginData,setLineProfile])
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const isFixed = scrollTop > 0; // 檢查是否滾動超過頂部

      setIsMenuFixed(isFixed);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className=''>
      <Header currentUser={currentUser} isLoggedIn={isLoggedIn}/>
      <div className={` font-bold  bg-white/10 backdrop-blur-lg z-30 text-white   fixed w-full ${isMenuFixed ? 'fixed top-0 left-0 w-full' : ''}`}>
        <div className='flex items-center space-x-3 p-4'>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className='focus:outline-none'
          ><FaBars /></button>
          <div>Documentation</div> 
        </div>
        <div className={`   md:w-1/5 md:h-screen  md:p-10 absolute bg-zinc-800 w-full z-50 top-14 left-0 ${isOpen ? ' opacity-100' : 'hidden opacity-0'}`}> 
          <ul className=' border-l border-white/50 p-5 tracking-wide leading-loose text-normal text-white/50'>
            {
              menuItem.map((item,index)=>{
                return(
                  <li 
                    className={' cursor-pointer hover:text-white' + (currentKey === index ? ' text-white' : ' text-white/50')} 
                    onClick={() => handleMenuItemClick(index)}
                  >{item.title}</li>
                )
              })
            }
          </ul>
        </div>
      </div>

      <div className=' justify-start items-start text-white w-10/12 md:w-8/12 mx-auto '>

        <motion.div className=" modal relative  min-h-screen w-full   md:px-10 mx-auto text-white flex-auto overflow-y-auto ">
          <motion.div 
            className=" pt-0 "
            initial={{ opacity: 0,y:0 }}
            animate={{ opacity: 1,y:0 }}
            exit={{ opacity: 0,y:0 }}
            transition={{
              ease: "easeInOut",
              duration: 0.3,
              delay: 0.5,
            }}
          >  
            <div id="section1" className='min-h-screen pt-28'>
              <div className='text-lime-500 font-bold'>About</div>
              <div className='text-2xl font-bold  mb-4'>關於我們</div>
              <div className='mt-2 mb-8 text-white/70'>
                Moonshot 是一個能夠在 Line 上輕鬆使用的 AI 繪圖工具，可輕易地通過指令切換多個 model 來達到風格轉換，使用「Stable Diffusion」作為運行的基礎，盡可能的在便利與多元使用上取得平衡。
              希望透過此服務讓更多人能夠認識並了解AI繪圖，所以同時也在 Line 上成立討論社群，鼓勵新手勇於提問老手熱心解惑的互動形式，營造良好學習成長環境。
              </div>

            </div>
            <div id="section2" className='min-h-screen  pt-28'>
              <div className='text-lime-500 font-bold'>Command </div>
              <div className='text-2xl font-bold  mb-4'>指令介紹 </div>
              <div className='mt-2 mb-8 leading-9 text-white/70'>
              
                <ul>
                  <li>PC</li>
                  <li>PR</li>
                  <li>CT</li>
                </ul>
              </div>
            </div>
            <div id="section3" className='min-h-screen  pt-28'>
              <div className='text-lime-500 font-bold'>Model </div>
              <h1 className="text-2xl font-bold mb-4">模型介紹</h1>
              <div className='mt-2 mb-8 leading-9 text-white/70'>

              </div>

            </div>

            <div id="section4" className='min-h-screen  pt-28'>
              <div className='text-lime-500 font-bold'>Community Standards </div>
              <h1 className="text-2xl font-bold mb-4">社群規章</h1>
              <div className='mt-2 mb-8 leading-9 text-white/70'>

              </div>
            </div>

            <div id="section5" className='min-h-screen  pt-28'>
              <div className='text-lime-500 font-bold'>Terms </div>
              <div className='text-2xl font-bold  mb-4'>使用聲明💡 </div>
              <ul className=' space-y-2 list-disc text-white/70 list-inside'>
                <li>本服務僅供娛樂與學習使用，意在推廣AI繪圖技術。使用者的行為與本服務無關。</li> 
                <li>使用者需遵守網路社群使用規定，不得違反社會善良風俗、不使用AI傷害他人、煽動暴力或進行任何惡意行為。</li>
                <li>我們會在可負擔範圍內盡力維持服務的穩定性，但不做任何保證，如果您在使用的過程中遇到問題，可以透過網頁上的聯絡資訊聯繫我們。</li>
                <li>最後，希望使用者能夠理解本服務的宗旨和意圖，並且遵守相關的使用規定。如果您有任何建議，歡迎與我們分享。</li>
              </ul>
            </div>



          </motion.div>
        </motion.div>
      </div>


    </div>

  )
}

export default Index