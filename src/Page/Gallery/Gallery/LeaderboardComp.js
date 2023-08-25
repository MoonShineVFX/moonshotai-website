import React from 'react'
import { Link} from 'react-router-dom';

import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { GiShield,GiArson } from "react-icons/gi";
import {LoadingLogoSpin,recordPageUrl,formatNumberWithK,padWithZero} from '../helpers/componentsHelper'

function LeaderboardComp({title,data,isLoading,sliceNum,more,containerStyle,containerTitleStyle,listStyle,listAvatarStyle,listNameStyle,listContainerStyle}) {
  return (
    <div className={`flex-1 bg-gray-900 rounded-md p-2 ${containerStyle}`}>
      <div className='flex items-center justify-between'>
        <div className={`text-white/90 text-sm ${containerTitleStyle} `}>{title}</div>      
        {more &&<Link to="/leaderboard" className='text-white/30 text-sm hover:text-white '>更多</Link>}
      </div>

      <div className={`space-y-3 mt-3 ${listContainerStyle}`}>
        {
          isLoading ? ( <div className='py-10 '><LoadingLogoSpin /></div>) :
          (
            data.slice(0,sliceNum).map((item,index)=>{
              return(
                <div key={title+'_leaderComp_'+index} className={`flex items-center justify-start gap-1 ${listStyle}`}>
                  <div className='text-white/60 text-xs mr-2'>{index === 0 ?  <GiArson color="red" size={14} /> : padWithZero(index+1) }</div>
                  <div className='text-sm flex items-center     text-white'>
                    <Link to={`/user/${item.id}`}  className={` ${listAvatarStyle}`} onClick={recordPageUrl}>
                      <div className='pt-[100%] relative'>
                        <img src={item?.profile_image} alt="user avatar" className='absolute aspect-square top-1/2 left-0 -translate-y-1/2 object-cover w-full h-fulls rounded-full'/>
                      </div>
                    </Link>
                  </div>
                  <div> 
                    <div className={` text-amber-400 ${listNameStyle}`}>{item?.name}</div>
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