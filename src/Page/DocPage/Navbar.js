import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { FaBars,FaTimes,FaChevronDown,FaAngleRight } from "react-icons/fa";
import {  useRecoilValue ,useRecoilState } from 'recoil';
import { isLoginState,loginState,lineProfileState,userState} from '../Gallery/atoms/galleryAtom';
import { animateScroll as scroll, scroller } from 'react-scroll';


function Navbar() {
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
    {title:"如何開始",section:"/docs",path:"" , submenus:[{title:"Quick Start",section:"quick"},{title:"Gallery Guidelines",section:"guidelines"}]},
    {title:"個人帳戶",section:"account" ,path:"docs/account", submenus:[{title:"Profile",section:"profile"},{title:"Account",section:"account"},{title:"Refeeral",section:"refeeral"},{title:"Orders",section:"orders"}]},
    {title:"常見問答",section:"faq",path:"docs/faq"},
    {title:"指令介紹",section:"command" ,path:"docs/commend"},
    {title:"退款流程",section:"refunds" ,path:"docs/refund"},
    {title:"使用條款",section:"terms",path:"docs/terms"},
    {title:"隱私權政策",section:"policy",path:"docs/policy"},

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
    // scrollTo(section);
    setCurrentKey(section);
    setIsOpen(false); // 自動隱藏選單
  };
  const handleSubMenuItem = (section) =>{
    scrollTo(section);
  }
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
    <div>

      {/* Mobile Menu */}
      <div className={` font-bold  bg-white/10 backdrop-blur-lg z-10 text-white   fixed w-full md:hidden ${isMenuFixed ? 'fixed top-0 left-0 w-full' : ''}`}>
        <div className='flex items-center space-x-3 p-4'> 
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className='focus:outline-none'
          ><FaChevronDown /></button>
          <div>Documentation</div> 
        </div>
        <div className={` md:w-1/5 md:h-screen  md:p-10 absolute bg-zinc-800 w-full z-50 top-14 left-0 ${isOpen ? ' opacity-100' : 'hidden opacity-0'}`}> 
          
          <ul className=' border-l border-white/50 p-5 tracking-wide leading-loose text-normal text-white/50'>
            {
              menuItem.map((item,index)=>{
                return(
                  <li 
                  key={'main'+index}
                  className={' cursor-pointer hover:text-white ' } 
                
                > 
                  <Link to={item.section} className={'flex items-center ' + (currentKey === item.section ? ' text-white' : ' text-white/50')}  onClick={() => handleMenuItemClick(item.section)}>
                    {item.title} <FaAngleRight /> 
                  </Link>
  

                </li>
                )
              })
            }
          </ul>
        </div>
      </div>

      {/* desktop Menu */}
      <div  className='sidebar hidden md:block fixed  mt-[65px] top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto  border-r border-white/20 '>
          
          <div className='text-white mt-10 p-10  '>
            <ul className='space-y-3'>
              {
                menuItem.map((item,index)=>{
                  const isMainMenuItem = currentKey === item.section;
                  return(
                    <li 
                      key={'main'+index}
                      className={' cursor-pointer hover:text-white ' } 
                     
                    > 
                      <Link
                        to={item.section}
                        className={'flex items-center ' + (currentKey === item.section ? ' text-white' : ' text-white/50')}  
                        onClick={() => handleMenuItemClick(item.section)}>
                        {item.title} <FaAngleRight /> 
                      </Link>
                      {item?.submenus && isMainMenuItem && (
                        <div className="pl-2 my-4 space-y-1">
                          {item.submenus.map((s, subIndex) => {
                            const isSubmenuItem = currentKey === s.section;
                            const uniqueKey = `sub_${index}_${subIndex}`;

                            return (
                              <div
                                key={uniqueKey}
                                className={ 'text-white'}
                                onClick={() => handleSubMenuItem(s.section)}
                              >
                                {s.title}
                              </div>
                            );
                          })}
                        </div>
                      )}

                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>

    </div>

  )
}

export default Navbar