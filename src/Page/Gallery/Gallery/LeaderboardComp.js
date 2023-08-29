import React,{useState,useEffect} from 'react'
import { Link} from 'react-router-dom';

import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { GiShield,GiArson } from "react-icons/gi";
import {LoadingLogoSpin,recordPageUrl,formatNumberWithK,padWithZero,TitleWithLimit} from '../helpers/componentsHelper'

function LeaderboardComp({page,title,data,isLoading,customer_sliceNum,more,containerStyle,containerTitleStyle,listStyle,listAvatarStyle,listNameStyle,listContainerStyle,is_link,linkpath}) {
  const [sliceNum, setSliceNum] = useState(customer_sliceNum); 
  const [isMobile ,setIsMobile ] = useState(false) 

  function ImageWithFallback({ src, alt, fallbackSrc }) {
    const [imageSrc, setImageSrc] = useState(src);
  
    const handleImageError = () => {
      setImageSrc(fallbackSrc);
    };
  
    return <img src={imageSrc} alt={alt} onError={handleImageError} className='absolute aspect-square top-1/2 left-0 -translate-y-1/2 object-cover w-full h-fulls rounded-full'/>;
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        if(page === 'home'){
          setSliceNum(3);
        }else{
          setSliceNum(15)
        }
  
        setIsMobile(true)
      } else {
        setSliceNum(customer_sliceNum);
        setIsMobile(false)
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div className={`col-span-1 bg-gray-900 rounded-lg p-2  overflow-hidden ${containerStyle}`}>
      <div className='flex items-center justify-between'>
        <div className={`text-white/90 text-sm ${containerTitleStyle} `}>{title}</div>      
        {more &&<Link to="/leaderboard" className='text-white/30 text-sm hover:text-white '>更多</Link>}
      </div>

      <div className={` md:space-y-3 mt-3 flex justify-between md:flex-col  items-center md:items-start ${listContainerStyle} ${page === 'home' ? 'flex-row md:flex-col' : 'flex-col' } `}>
        {
          isLoading ? ( <div className='py-10 '><LoadingLogoSpin /></div>) :
          (
            data.slice(0,sliceNum).map((item,index)=>{
              return(
                <div key={title+'_leaderComp_'+index} className={`flex items-center justify-start gap-1 w-full ${listStyle} ${isMobile && index===0 && ' bg-gray-700/0 p-2 rounded-md '}`}>
                  <div className='text-white/60 text-xs mr-2'>{index === 0 ?  <GiArson color="red" size={14} /> : padWithZero(index+1) }</div>
                  <div className='text-sm flex items-center     text-white'>
                    {item?.image_url && (
                      is_link ?(
                        <Link to={`/user/${item.id}`}  className={` ${listAvatarStyle}`} onClick={recordPageUrl}>
                          <div className='pt-[100%] relative'>
                           <ImageWithFallback src={item?.image_url} alt="user avatar" fallbackSrc={'https://i.stack.imgur.com/SeuQK.jpg'}/>
                            {/* <img src={item?.image_url} alt="user avatar" className='absolute aspect-square top-1/2 left-0 -translate-y-1/2 object-cover w-full h-fulls rounded-full'/> */}
                          </div>
                        </Link>)
                        :
                        (<div className={` ${listAvatarStyle}`} onClick={recordPageUrl}>
                          <div className='pt-[100%] relative'>
                            <ImageWithFallback src={item?.image_url} alt="user avatar" fallbackSrc={'https://i.stack.imgur.com/SeuQK.jpg'}/>
                            {/* <img src={item?.image_url} alt="user avatar" className='absolute aspect-square top-1/2 left-0 -translate-y-1/2 object-cover w-full h-fulls rounded-full'/> */}
                          </div>
                        </div>)
                        
                    )}


                  </div>
                  <div className=' '> 
                    <div className='w-[5em]'>
                      <div className={` text-amber-400 text-sm truncate ${listNameStyle}`}>{isMobile ?  <TitleWithLimit title={item?.name} maxLength={8}  /> :  <TitleWithLimit title={item?.name} maxLength={10}  />}</div>
                    </div>
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