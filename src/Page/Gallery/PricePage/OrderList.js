import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { MdAttachMoney,MdArrowRightAlt } from "react-icons/md";
function OrderList({orderData,handleRefund}) {
  const [isLoadingReq, setIsLoadingReq] = useState(false);
  const [isNeedLogin, setIsNeedLogin] = useState(false);
  const [isReqError, setReqError] = useState(false);
  return (
    <div className='text-white'>
      <div className='text-sm text-white/80'>{orderData.length} items</div>
      <div>
      {
          orderData.map((item,index)=>{
            const{invoice_number,paid_at,payment_type,serial_number,plan_history,refund_at,status}=item
            return(
              <div className='text-white border my-6 p-3 border-zinc-400 rounded-md' key={'orders'+index}>
                <div className=' space-y-3'>
                  <div>
                    <div className='text-xs opacity-70'>支付方式</div>
                    <div className='flex items-center gap-3'>
                        {payment_type} 
                        <div className={'py-1 px-2 text-xs rounded-md ' + (status === 'Success' ?  'bg-green-600 ' :  ' bg-rose-900')}>{status === 'Success' ? '已完成付款': '已完成退款'}</div>
                    </div>
                  </div>

                  <div className='flex gap-3'>
                    <div>
                      <div className='text-xs opacity-70'>商品名稱</div>
                      <div>{plan_history.name}(進階會員{plan_history.days}天) </div>
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
                    </div>
                  </div>


                </div>
              
                {
                  status === "Success" &&               
                  <div className='p-4'>
                    <button 
                      className="w-full flex  justify-center items-center gap-2 bg-lime-600  rounded-md py-3  text-center text-white text-sm"
                      onClick={()=>handleRefund(serial_number)}
                    >
                      <MdAttachMoney size={20} />  按此退費 <MdArrowRightAlt />
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