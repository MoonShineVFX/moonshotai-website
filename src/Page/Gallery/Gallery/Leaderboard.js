import React from 'react'
import { Link} from 'react-router-dom';

import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { GiShield,GiArson } from "react-icons/gi";
import {LoadingLogoSpin,recordPageUrl} from '../helpers/componentsHelper'

function Leaderboard({title,data,isLoading}) {
  return (
    <div className='flex-1 bg-gray-900 rounded-md p-2'>
      <div className='text-white/90 text-sm '>{title}</div>
      <div className=' space-y-3 mt-3'>
        {
          isLoading ? ( <div className='py-10 '><LoadingLogoSpin /></div>) :
          (
            data.slice(0,5).map((item,index)=>{
              return(
                <div className='flex items-center justify-start gap-1'>
                  <div className='text-white/60 text-xs mr-2'>{index === 0 ?  <GiArson color="red" size={14} /> : '0'+index }</div>
                  <div className='text-sm flex items-center     text-white'>
                    <Link to={`/user/${item.id}`}  className='w-7' onClick={recordPageUrl}>
                      <div className='pt-[100%] relative'>
                        <img src={item?.profile_image} alt="user avatar" className='absolute aspect-square top-1/2 left-0 -translate-y-1/2 object-cover w-full h-fulls rounded-full'/>
                      </div>
                    </Link>
                  </div>
                  <div> 
                    <div className='text-xs text-amber-400'>{item?.name}</div>
                    <div className='flex items-center text-white/70 text-xs'> <MdOutlineLocalFireDepartment color="red" size="13" />{item?.monthly_count}</div>
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

export default Leaderboard