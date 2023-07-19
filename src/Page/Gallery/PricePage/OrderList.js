import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { MdAttachMoney,MdArrowRightAlt,MdHelp,MdInfo } from "react-icons/md";
import {  useRecoilValue ,useRecoilState } from 'recoil';
import { reportModalState,reportDataState } from '../atoms/galleryAtom';
function OrderList({orderData,handleRefund,handleReport}) {
  const [isLoadingReq, setIsLoadingReq] = useState(false);
  const [isNeedLogin, setIsNeedLogin] = useState(false);
  const [isReqError, setReqError] = useState(false);
  const [isShowReport,serIsShowReport] = useRecoilState(reportModalState)
  const [currentOrder,setCurrentOrder] = useRecoilState(reportDataState)
  const onHandleRoport  = (item)=>{
    handleReport(item)
  }

  const isPast48Hours = (date) => {
    const now = moment();
    const specifiedDate = moment(date);
    const diffHours = now.diff(specifiedDate, 'hours');
    return diffHours >= 48;
  };

  return (
    <div className='text-white'>
      <div className='text-sm text-white/80'>{orderData.length} items</div>
      <div>
      {
          orderData.map((item,index)=>{
            const{invoice_number,paid_at,payment_type,serial_number,plan_history,refund_at,status,is_surveyed}=item
            return(
              <div className='text-white border my-6 p-3 border-zinc-400 rounded-md' key={'orders'+index}>
                <div className=' space-y-3'>
                  <div>
                    <div className='text-xs opacity-70'>支付方式</div>
                    <div className='flex items-center gap-3'>

                        {payment_type} 
                        {
                          status === "Refund" ? 

                          <div className={'py-1 px-2 text-xs rounded-md bg-rose-800 '}>已完成退款</div>
                          : 
                          <div className='flex items-center'>
                            <div className={'py-1 px-2 text-xs rounded-md bg-lime-800 '}>已完成付款</div>
                            {is_surveyed && <div className={'py-1 px-2 text-xs rounded-md bg-yellow-800'}>正在受理退款流程</div>}
                          </div>
                        }
                        

                        
                    </div>
                  </div>

                  <div className='flex gap-3'>
                    <div>
                      <div className='text-xs opacity-70'>商品名稱</div>
                      <div>{plan_history.name}</div>
                    </div>
                    <div>
                      <div className='text-xs opacity-70'>商品金額</div>
                      <div> {parseInt(plan_history.price)} 元</div>
                    </div>
                  </div>

                  <div className=' space-y-3'>
                    <div>
                      <div className='text-xs opacity-70'>訂單序號</div>
                      <div>{serial_number} </div>
                    </div>
                    <div>
                      <div className={'text-xs opacity-70'}>日期{status === 'Success' ? <span className='text-green-500'> (付款)</span> : <span className='text-rose-400'> (退款)</span>}</div>
                      <div>{refund_at ? moment(refund_at).format('YYYY-MM-DD HH:mm'): ` ${moment(paid_at).format('YYYY-MM-DD HH:mm')}`}</div>
                      <div>
                        {!refund_at ? 
                          <div className='text-xs flex  items-center text-white/50 mt-1'>
                           <MdInfo /> {isPast48Hours(paid_at) ? '已過48小時無法申請退款' : '可以申請退款'}
                          </div>
                        : ''

                        }
                      </div>
                    </div>
                  </div>


                </div>
              
                {
                  status === "Success" &&               
                  <div className='my-3'>
                    <button 
                      className="ml-auto px-3 flex  justify-center items-center gap-2 bg-amber-600  rounded-md py-2  text-center text-white text-sm"
                      onClick={()=>{
                        setCurrentOrder(item)
                        serIsShowReport(true)
                      }}
                    >
                      <MdHelp size={20} />  回報訂單問題
                      {isLoadingReq && <div className='text-xs'>等待回應...</div>}
                      {isReqError && <div className='text-xs'>錯誤，需重新登入</div>}
                    </button>
                  </div>
                }


              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default OrderList