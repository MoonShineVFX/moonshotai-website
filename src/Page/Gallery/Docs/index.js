import React, { useState, useEffect } from 'react';
import { AnimatePresence,motion } from "framer-motion";
import Header from '../header'
import { animateScroll as scroll, scroller } from 'react-scroll';
import {  useRecoilValue ,useRecoilState } from 'recoil';
import { isLoginState,loginState,lineProfileState,userState} from '../atoms/galleryAtom';
import {getStoredLocalData} from '../helpers/fetchHelper'
import { FaBars,FaTimes,FaChevronDown } from "react-icons/fa";
import Terms from '../../Home_v3/Terms';
import Policy from '../../Home_v3/Policy';
import RefundDoc from '../../Home_v3/RefundDoc';
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
    {title:"如何開始",section:"section1"},
    {title:"指令介紹",section:"section2"},
    {title:"退款流程",section:"section6"},
    {title:"使用條款",section:"section4"},
    {title:"隱私權政策",section:"section5"},

  ]
  const commendItem = [
    {display_name:"寫實風格",name:"PR"},
    {display_name:"插畫風格",name:"CT"},
    {display_name:"漫畫風格",name:"CM"},
    {display_name:"寫實人像",name:"PC"},
    {display_name:"圖生圖",name:"R__"},
    {display_name:"遮罩修改",name:"I__"},
    {display_name:"遮罩固定",name:"O__"},
    {display_name:"骨架參考",name:"P__"},
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
      <div className={` font-bold  bg-white/10 backdrop-blur-lg z-10 text-white   fixed w-full ${isMenuFixed ? 'fixed top-0 left-0 w-full' : ''}`}>
        <div className='flex items-center space-x-3 p-4'>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className='focus:outline-none'
          ><FaChevronDown /></button>
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

      <div className=' justify-start items-start text-white w-full md:w-8/12 mx-auto '>

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
            <div id="section1" className='min-h-screen pt-28 px-8'>
              <div className='text-lime-500 font-bold'>About</div>
              <div className='text-2xl font-bold  mb-4'>關於我們</div>
              <div className='mt-2 mb-8 text-white/70'>
                Moonshot 是一個能夠在 Line 上輕鬆使用的 AI 繪圖工具，可輕易地通過指令切換多個 model 來達到風格轉換，使用「Stable Diffusion」作為運行的基礎，盡可能的在便利與多元使用上取得平衡。
              希望透過此服務讓更多人能夠認識並了解AI繪圖，所以同時也在 Line 上成立討論社群，鼓勵新手勇於提問老手熱心解惑的互動形式，營造良好學習成長環境。
              </div>

            </div>
            <div id="section2" className='min-h-screen  pt-28 px-8'>
              <div className='text-lime-500 font-bold'>Command </div>
              <div className='text-2xl font-bold  mb-4'>指令介紹 </div>
              <div className='mt-2 mb-8 leading-9 text-white/70'>
              <table class="border-collapse border border-slate-400 w-full">
                <thead>
                  <tr className='bg-zinc-600 '>
                    <th className='border border-slate-300 p-2'>功能</th>
                    <th className='border border-slate-300 p-2'>指令</th>
                  </tr>
                </thead>
                <tbody>
                  {commendItem.map((item,index)=>{
                    return(
                      <tr>
                        <td className='border border-slate-300 p-2  text-center'>{item.display_name}</td>
                        <td className='border border-slate-300 p-2 text-center'>{item.name}</td>
                      </tr>
                    )
                  })}

                </tbody>
              </table>
              </div>
            </div>

            <div id="section4" className='min-h-screen  pt-28'>
              <div className='px-8'>
                <div className='text-lime-500 font-bold'>Terms </div>
                <h1 className="text-2xl font-bold mb-4">使用條款</h1>
              </div>

              <Terms />
            </div>

            <div id="section5" className='min-h-screen  pt-28'>
              <div className='px-8'>
                <div className='text-lime-500 font-bold'>Private Policy </div>
                <div className='text-2xl font-bold  mb-4'>隱私權政策 </div>
              </div>

              <Policy />
            </div>

            <div id="section6" className='min-h-screen  pt-28'>
              <div className='px-8'>
                <div className='text-lime-500 font-bold'>Refunds </div>
                <h1 className="text-2xl font-bold mb-4">退款流程</h1>
              </div>
              <RefundDoc />




            </div>



          </motion.div>
        </motion.div>
      </div>


    </div>

  )
}

export default Index