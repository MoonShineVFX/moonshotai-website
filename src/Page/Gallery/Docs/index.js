import React, { useState, useEffect } from 'react';
import { AnimatePresence,motion } from "framer-motion";
import Header from '../header'
import { animateScroll as scroll, scroller } from 'react-scroll';
import {  useRecoilValue ,useRecoilState } from 'recoil';
import { isLoginState,loginState,lineProfileState,userState} from '../atoms/galleryAtom';
import {getStoredLocalData} from '../helpers/fetchHelper'
import { FaBars,FaTimes } from "react-icons/fa";
import Terms from '../../Home_v3/Terms';
import Policy from '../../Home_v3/Policy';
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
    {title:"使用條款",section:"section4"},
    {title:"隱私權政策",section:"section5"},
    {title:"退款流程",section:"section6"},
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
            <div id="section3" className='min-h-screen  pt-28 px-8'>
              <div className='px-8'></div>
              <div className='text-lime-500 font-bold'>Model </div>
              <h1 className="text-2xl font-bold mb-4">模型介紹</h1>
              <div className='mt-2 mb-8 leading-9 text-white/70'>

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
              <div className='text-white pt-12 px-8'>
                <div className='my-4'>
                  <div className='text-white/90 text-sm space-y-2'>
                    <p> 在符合退款政策規定的情況下，Moonshot 可以針對某些 Moonshot 交易給予退款，詳見下方說明。您也可以直接與 Moonshot 官方開發團隊聯絡 (超連結 ms 信箱)。</p>

                  </div>
                </div>

                <div className='my-4'>
                  <div className='text-white/90 text-sm space-y-2'>
                    <p>如果您的好友或家庭成員不小心使用了您的帳戶購物，您可以前往 Moonshot 網站 (退款頁面)，於契約訂單生效的 48 小時內申請退款。</p>
                    <p>如果發現有陌生人使用你的信用卡或其他付款方式在 Moonshot 消費，消費者可以於開始行使契約訂單的 48 小時內，至 Moonshot 網站申請退款。</p>
                    <p>如果退款申請通過核准，請參閱如下「退款處理時間」。</p>
                    <table class="border-collapse border border-slate-400 w-full">
                      <thead>
                        <tr className='bg-zinc-600 '>
                          <th className='border border-slate-300 p-2'>功能</th>
                          <th className='border border-slate-300 p-2'>指令</th>
                        </tr>
                      </thead>
                      <tbody>

                            <tr>
                              <td className='border border-slate-300 p-2  text-center'>信用卡或簽帳金融卡</td>
                              <td className='border border-slate-300 p-2 text-center'>
                                <p>3-5 個工作天</p>
                                <p>處理時間可能因發卡機構而異，最慢需要 10 個工作天。</p>
                                <p>如果您的信用卡已失效，Moonshot 會將款項退還至您的發卡銀行，請向銀行洽詢相關事宜。</p>
                              </td>
                            </tr>
                            <tr>
                              <td className='border border-slate-300 p-2  text-center'>Line Pay </td>
                              <td className='border border-slate-300 p-2 text-center'>
                                <p>3-5 個工作天</p>
                                <p>退款應該會顯示在使用者的帳戶中。</p>
                              </td>
                            </tr>
                      </tbody>
                    </table>

                  </div>
                </div>

                <div className='my-4'>
                  <div className='text-xl font-bold  mb-4'>瞭解退款申請選項</div>
                  <div className='text-xl font-bold  mb-4'>方法一：前往 Moonshot 網站申請退款</div>
                  <div className='text-white/90 text-sm space-y-2'>
                    <p>如果距離您購買 Moonshot 服務的時間不到 48 小時，可以透過 Moonshot 申請退款。</p>
                    <p>前往 moonshot.today (退款頁面)。</p>
                    <p>點選「訂單列表」。</p>
                    <p>選取要退回的訂單，按一下「回報問題」。</p>
                    <p>視情況選擇合適的選項。</p>
                    <p>填妥表單並註明要申請退款。</p>
                    <p>按一下「送出」。</p>


                  </div>
                  <div className='text-xl font-bold  mb-4'>方法二：向 Moonshot 開發團隊人員尋求支援</div>
                  <div className='text-white/90 text-sm space-y-2'>
                    <p>遇到下列情況時，建議您與應用程式開發人員聯絡：</p>
                    <p>您有 Moonshot 工具相關問題。</p>
                    <p>您在進行應用程式內購交易後並未收到相應內容，或是該內容不符預期。</p>
                    <p>您想要退款，但距離交易已超過 48 小時。開發人員可協助處理購買問題，並根據自家政策和適用法規處理退款事宜。</p>
                  </div>            
                </div>
              </div>



            </div>



          </motion.div>
        </motion.div>
      </div>


    </div>

  )
}

export default Index