import React,{useEffect} from 'react'
import moment from 'moment';
import {LoadingCircle} from '../helpers/componentsHelper'
import { getAnalytics, logEvent } from "firebase/analytics";
const GiftsList = ({giftData,handleOpenGift,isMutationLoading,currentlyUpdatingGiftId,setCurrentlyUpdatingGiftId}) => {
  const analytics = getAnalytics();
  useEffect(()=>{
    logEvent(analytics, 'Order_禮物箱頁面_進入')
  },[])
  return (
    <div className='text-white pb-10'>
      <div className='text-sm text-white/80'>{giftData.length} items</div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mt-6'>
      {
        giftData.map((item,index)=>{
          const {id,created_at, expired_at, is_used,name,used_at}= item
          return(
            <div className='text-white p-4 border-4 border-gray-400/0  hover:border-t_lime-600 bg-gray-800 rounded-md  ' key={'gifts'+index}>
              <div className='flex justify-between'>
                <div>
                  <div className='text-xs opacity-70'> {moment(created_at).format('YYYY-MM-DD')}</div>
                  <div className='flex items-center font-semibold'>
                    {name} 
                  </div>
                  
                </div>
                <div>
                  <div className='text-xs opacity-70'>狀態</div>
                  <div className='flex items-center'>
                    {is_used ? '已領取' : '未領取' }
                  </div>
                  
                </div>
              </div>


              <div className='flex justify-between mt-4 gap-3'>

                <div>
                  <div className='text-xs opacity-70'>領取期限</div>
                  {expired_at !== null ? moment(expired_at).format('YYYY-MM-DD') : '無限制'}
                </div>


              </div>

              <div className='flex-center flex justify-start items-center mt-6'>
                {
                  !is_used ? <button className={'py-2 px-4 text-sm rounded-md bg-blue-800 '} onClick={()=>{
                    setCurrentlyUpdatingGiftId(id)
                    handleOpenGift(id)
                  }}>
                    領取禮物
                  </button>
                  :
                  <button disabled className={' py-2 px-4 text-sm rounded-md bg-gray-700 text-white/80 '}>已領取</button>
                }
                <div className='ml-4'>
                  <div className='text-xs opacity-70'>兌換日</div>
                  {used_at !== null ? moment(used_at).format('YYYY-MM-DD'): '--'}
                </div>
              </div>
              <div>
              {isMutationLoading && id === currentlyUpdatingGiftId && <p><LoadingCircle /></p>}
              </div>
            </div>
          )
        })
      }
      </div>

    </div>
  )
}

export default GiftsList