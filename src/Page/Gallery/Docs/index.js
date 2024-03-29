import React, { useState, useEffect } from 'react';
import { AnimatePresence,motion } from "framer-motion";
import Header from '../header'
import { animateScroll as scroll, scroller } from 'react-scroll';
import {  useRecoilValue ,useRecoilState } from 'recoil';
import { isLoginState,loginState,lineProfileState,userState} from '../atoms/galleryAtom';
import {getStoredLocalData} from '../helpers/fetchHelper'
import { FaBars,FaTimes,FaChevronDown,FaAngleRight } from "react-icons/fa";
import Terms from '../../DocPage/Terms';
import Policy from '../../DocPage/Policy';
import RefundDoc from '../../DocPage/RefundDoc';
import QuickStart from '../../DocPage/QuickStart';
import UserDoc from '../../DocPage/UserDoc';
import FaqDoc from '../../DocPage/FaqDoc';
function Index() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginState);
  const [lineProfile, setLineProfile] = useRecoilState(lineProfileState);
  const [linLoginData, setLineLoginData] = useRecoilState(loginState)
  const [currentUser, setCurrentUser] = useRecoilState(userState)
  const [currentKey, setCurrentKey] = useState('main0');
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuFixed, setIsMenuFixed] = useState(false);
  const scrollTo = (target) => {
    scroller.scrollTo(target, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
      offset:-80
    });
  };
  const menuItem = [
    {title:"如何開始",section:"section1" , submenus:[{title:"Quick Start",section:"quick"},{title:"Gallery Guidelines",section:"guidelines"}]},
    {title:"個人帳戶",section:"section2" , submenus:[{title:"Profile",section:"profile"},{title:"Account",section:"account"},{title:"Refeeral",section:"refeeral"},{title:"Orders",section:"orders"}]},
    {title:"常見問答",section:"faq"},
    {title:"指令介紹",section:"section3"},
    {title:"退款流程",section:"section4"},
    {title:"使用條款",section:"section5"},
    {title:"隱私權政策",section:"section6"},

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
  const handleMenuItemClick = (section) => {
    scrollTo(section);
    setCurrentKey(section);
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
      <div className={` font-bold  bg-white/10 backdrop-blur-lg z-10 text-white   fixed w-full md:hidden ${isMenuFixed ? 'fixed top-0 left-0 w-full' : ''}`}>
        <div className='flex items-center space-x-3 p-4'>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className='focus:outline-none'
          ><FaChevronDown /></button>
          <div>Documentation</div> 
        </div>
        <div className={`   md:w-1/5 md:h-screen  md:p-10 absolute bg-gray-800 w-full z-50 top-14 left-0 ${isOpen ? ' opacity-100' : 'hidden opacity-0'}`}> 
          
          <ul className=' border-l border-white/50 p-5 tracking-wide leading-loose text-normal text-white/50'>
            {
              menuItem.map((item,index)=>{
                return(
                  <li 
                  key={'main'+index}
                  className={' cursor-pointer hover:text-white ' } 
                 
                > 
                  <div className={'flex items-center ' + (currentKey === item.section ? ' text-white' : ' text-white/50')}  onClick={() => handleMenuItemClick(item.section)}>
                    {item.title} <FaAngleRight /> 
                  </div>
                  {
                    item?.submenus && 
                    <div className={'pl-2 my-4 space-y-1'}>
                      {item.submenus.map((s,i)=>{
                        return(
                          <div  
                            key={'sub'+index}
                            className={' '  + (currentKey === s.section ? ' text-white' : ' text-white/50')}
                            onClick={() => handleMenuItemClick(s.section)}>{s.title}</div>
                        )
                      })}
                    </div>
                  }

                </li>
                )
              })
            }
          </ul>
        </div>
      </div>
      <div className=' relative '>
        <div  className='sidebar hidden md:block fixed  mt-[65px] top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto  border-r border-white/20 '>
          
          <div className='text-white mt-10 p-10  '>
            <ul className='space-y-3'>
              {
                menuItem.map((item,index)=>{
                  return(
                    <li 
                      key={'main'+index}
                      className={' cursor-pointer hover:text-white ' } 
                     
                    > 
                      <div className={'flex items-center ' + (currentKey === item.section ? ' text-white' : ' text-white/50')}  onClick={() => handleMenuItemClick(item.section)}>
                        {item.title} <FaAngleRight /> 
                      </div>
                      {
                        item?.submenus && 
                        <div className={'pl-2 my-4 space-y-1'}>
                          {item.submenus.map((s,i)=>{
                            return(
                              <div  
                                key={'sub'+index}
                                className={' '  + (currentKey === s.section ? ' text-white' : ' text-white/50')}
                                onClick={() => handleMenuItemClick(s.section)} >{s.title}</div>
                            )
                          })}
                        </div>
                      }

                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
          
        <div className=' justify-start items-start text-white w-full  mx-auto md:pl-[300px]'>

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
              <div id="section1" className='min-h-screen pt-20 px-8'>
                <div className='text-lime-500 font-bold'>Getting Statred</div>
                <div className='text-2xl font-bold  mb-4'>如何開始</div>
                <div className='mt-2 mb-8 text-white/70'>
                  <QuickStart />
                </div>

              </div>
              <div id="section2" className='min-h-screen pt-20 px-8'>
                <div className='text-lime-500 font-bold'>User</div>
                <div className='text-2xl font-bold  mb-4'>個人帳戶</div>
                <div className='mt-2 mb-8 text-white/70'>
                  <UserDoc />
                </div>

              </div>

              <div id="section1" className='min-h-screen pt-20 px-8'>
                <div className='text-lime-500 font-bold'>FAQ</div>
                <div className='text-2xl font-bold  mb-4'>常見問答</div>
                <div className='mt-2 mb-8 text-white/70'>
                  <FaqDoc />
                </div>

              </div> 
              <div id="section3" className='min-h-screen  pt-20 px-8'>
                <div className='text-lime-500 font-bold'>Command </div>
                <div className='text-2xl font-bold  mb-4'>指令介紹 </div>
                <div className='mt-2 mb-8 leading-9 text-white/70'>
                <table class="border-collapse border border-slate-400 w-full">
                  <thead>
                    <tr className='bg-gray-600 '>
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
              <div id="section4" className='min-h-screen  pt-20'>
                <div className='px-8'>
                  <div className='text-lime-500 font-bold'>Refunds </div>
                  <h1 className="text-2xl font-bold mb-4">退款流程</h1>
                </div>
                <RefundDoc />
              </div>

              <div id="section5" className='min-h-screen  pt-20'>
                <div className='px-8'>
                  <div className='text-lime-500 font-bold'>Terms </div>
                  <h1 className="text-2xl font-bold mb-4">使用條款</h1>
                </div>

                <Terms />
              </div>

              <div id="section6" className='min-h-screen  pt-20'>
                <div className='px-8'>
                  <div className='text-lime-500 font-bold'>Private Policy </div>
                  <div className='text-2xl font-bold  mb-4'>隱私權政策 </div>
                </div>

                <Policy />
              </div>





            </motion.div>
          </motion.div>
          </div>

        
      </div>



    </div>

  )
}

export default Index