import React,{useState,useEffect} from 'react'
import { Link} from 'react-router-dom';

import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { GiShield,GiArson } from "react-icons/gi";
import {LoadingLogoSpin,recordPageUrl,formatNumberWithK,padWithZero,TitleWithLimit} from '../helpers/componentsHelper'

function LeaderboardComp({title,data,isLoading,customer_sliceNum,more,containerStyle,containerTitleStyle,listStyle,listAvatarStyle,listNameStyle,listContainerStyle,is_link,linkpath}) {
  const [sliceNum, setSliceNum] = useState(customer_sliceNum); 
  const [isMobile ,setIsMobile ] = useState(false) 


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSliceNum(3);
        setIsMobile(true)
      } else {
        setSliceNum(customer_sliceNum);
        setIsMobile(false)
      }
    };
    // 添加 resize 事件监听
    window.addEventListener('resize', handleResize);

    // 初始设置一次 sliceNum
    handleResize();
    // 清除事件监听，避免内存泄漏
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div className={`flex-1 bg-gray-900 rounded-md p-2 ${containerStyle}`}>
      <div className='flex items-center justify-between'>
        <div className={`text-white/90 text-sm ${containerTitleStyle} `}>{title}</div>      
        {more &&<Link to="/leaderboard" className='text-white/30 text-sm hover:text-white '>更多</Link>}
      </div>

      <div className={`md:space-y-3 mt-3 flex justify-between md:flex-col  gap-2 items-center md:items-start ${listContainerStyle}`}>
        {
          isLoading ? ( <div className='py-10 '><LoadingLogoSpin /></div>) :
          (
            data.slice(0,sliceNum).map((item,index)=>{
              return(
                <div key={title+'_leaderComp_'+index} className={`flex items-center justify-start gap-1 w-full ${listStyle} ${isMobile && index===0 && ' bg-gray-700/0 p-2 rounded-md '}`}>
                  <div className='text-white/60 text-xs mr-2'>{index === 0 ?  <GiArson color="red" size={14} /> : padWithZero(index+1) }</div>
                  <div className='text-sm flex items-center     text-white'>
                    {item?.profile_image && (
                      is_link ?(
                        <Link to={`/user/${item.id}`}  className={` ${listAvatarStyle}`} onClick={recordPageUrl}>
                          <div className='pt-[100%] relative'>
                            <img src={item?.profile_image} alt="user avatar" className='absolute aspect-square top-1/2 left-0 -translate-y-1/2 object-cover w-full h-fulls rounded-full'/>
                          </div>
                        </Link>)
                        :
                        (<div className={` ${listAvatarStyle}`} onClick={recordPageUrl}>
                          <div className='pt-[100%] relative'>
                            <img src={item?.profile_image} alt="user avatar" className='absolute aspect-square top-1/2 left-0 -translate-y-1/2 object-cover w-full h-fulls rounded-full'/>
                          </div>
                        </div>)
                        
                    )}


                  </div>
                  <div> 
                    <div className={` text-amber-400 ${listNameStyle}`}>{isMobile ?  <TitleWithLimit title={item?.name} maxLength={8}  /> :  <TitleWithLimit title={item?.name} maxLength={10}  />}</div>
                    <div className='flex items-center text-white/70 text-xs'> <MdOutlineLocalFireDepartment color="red" size="13" />{item?.monthly_count && formatNumberWithK(item?.monthly_count)}</div>
                  </div>
                </div>
              )
            })
          )
        }
      </div>

    </div>
  )
}

export default LeaderboardComp