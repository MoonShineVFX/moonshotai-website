import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { MdAttachMoney,MdArrowRightAlt,MdHelp } from "react-icons/md";
function SubscriptionsList({subData,plans}) {
  const [isLoadingReq, setIsLoadingReq] = useState(false);
  const [isNeedLogin, setIsNeedLogin] = useState(false);
  const [isReqError, setReqError] = useState(false);

  console.log(plans)
  const SelecPlans = ({id})=>{
    const newData = plans.filter(item=>{
      return item.id === id
    })
    return(
      <div>{newData[0].name}</div>
    )
  }
  const xxxdata = {
    created_at:"2023-06-30T19:28:40.169201+08:00",
    current_plan:1,
    end_at:"2023-07-30T19:28:40.158306+08:00",
    id:5,
    invitation:null,
    is_active:false,
    refund_at:"2023-07-04T20:27:42+08:00",
    start_at:"2023-06-30T19:28:40.158306+08:00",
    user:714
  }
  return (


    <div>
      <div className='text-sm text-white/80'>{subData.length} items</div>
      <div>
      {
          subData.map((item,index)=>{
            const{created_at,current_plan,end_at,id,invitation,is_active,refund_at,start_at,user}=item
            return(
              <div className='text-white border my-6 p-3 border-zinc-400 rounded-md' key={'orders'+index}>
                <div className=' space-y-3'>


                  <div className='flex gap-3 justify-between'>

                    <div>
                      <div className='text-xs opacity-70'>購買 / 活動 / 推薦序號</div>
                      <div>{invitation ? ' 推薦序號' :  ' 購買'}</div>
                    </div>
                    <div>
                      <div className='text-xs opacity-70'>方案名稱</div>
                      <div><SelecPlans id={current_plan} /></div>
                    </div>
                  </div>

                  <div className=' space-y-3'>
                    <div>
                      <div className='text-xs opacity-70'>是否啟用</div>
                      <div className='flex items-center gap-3'>
                          {is_active ? 
                            <span className='text-green-500'> 是</span> : <span className='text-rose-400'> 否，已退款：{moment(refund_at).format('YYYY-MM-DD HH:mm')}</span>} 
                      </div>
                    </div>
                    <div>
                      <div className={'text-xs opacity-70'}>訂閱起始日期</div>
                      <div>{moment(start_at).format('YYYY-MM-DD HH:mm')}</div>
                    </div>
                    <div>
                      <div className={'text-xs opacity-70'}>訂閱結束日期</div>
                      <div>{moment(end_at).format('YYYY-MM-DD HH:mm')}</div>
                    </div>
                  </div>


                </div>
            

              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default SubscriptionsList