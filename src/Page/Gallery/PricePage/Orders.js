import React, { useState, useEffect } from 'react';
import {motion,AnimatePresence} from 'framer-motion'
import Header from '../header'
import {  useRecoilValue ,useRecoilState } from 'recoil';
import { isLoginState,loginState,lineProfileState,userState} from '../atoms/galleryAtom';
import {getStoredLocalData,refreshToken,fetchLinePayRequest,testLinePay,checkUserLiffLoginStatus,postOrder,paymentLinePay,getOrders} from '../helpers/fetchHelper'
import moment from 'moment';
import liff from '@line/liff';
function Orders() {
  const liffID = process.env.REACT_APP_LIFF_LOGIN_ID
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginState);
  const [lineProfile, setLineProfile] = useRecoilState(lineProfileState);
  const [linLoginData, setLineLoginData] = useRecoilState(loginState)
  const [currentUser, setCurrentUser] = useRecoilState(userState)
  const [currentHeaders , setCurrentHeaders] = useState({})

  const [data, setData] = useState(null)
  useEffect(()=>{
    liff.init({liffId: liffID}).then(()=>{
      console.log(liff.isLoggedIn())

    })
  },[])
  useEffect(()=>{
    getStoredLocalData().then(data=>{
        setIsLoggedIn(data.isLogin)
        setLineLoginData(data.loginToken)
        setLineProfile(data.lineProfile)
        setCurrentUser(data.currentUser)
        let headers = {'Content-Type': 'application/json'} 
        if(data.isLogin){
          refreshToken().then(data =>{
            headers = {'Content-Type': 'application/json' ,'Authorization': `Bearer ${data.token}` }
            setCurrentHeaders(headers)
            setLineLoginData(data.token)
            getOrders(data.token).then(odata=>{
              console.log(odata)
              setData(odata)
            })
          })
        }
        
      })
  },[setIsLoggedIn,setLineLoginData,setLineProfile])

  if(!data){
    return(
      <div>
        <Header currentUser={currentUser} isLoggedIn={isLoggedIn}/>
        <main className="max-w-6xl mx-auto pt-10 pb-10 px-8 text-white">
        <div className=''>訂單列表 </div>
        <div>目前是空的或請登入後查看。</div>
        </main>
        
      </div>
    )
  }
  return (
    <div>
      <Header currentUser={currentUser} isLoggedIn={isLoggedIn}/>
      <main className="max-w-6xl mx-auto pt-10 pb-10 px-8">
       <div className='text-white'>訂單列表 </div>
       <div className='text-sm text-white/80'>{data.length} items</div>
       <div>
        {
          data.map((item,index)=>{
            const{invoice_number,paid_at,payment_type,serial_number,plan_history,refund_at,status}=item
            return(
              <div className='text-white border my-6 border-gray-400' key={'orders'+index}>
                <table class="table-auto   divide-y  divide-gray-600 w-full text-sm">
                  <thead className='bg-zinc-700 '>
                    <tr>
                      <th className='p-2 '>訂單序號</th>
                      <th className='p-2'>支付管道</th>
                    </tr>
                  </thead>
                  <tbody className='text-center'>
                    <tr>
                      <td className='py-2 px-6 text-sm font-medium text-white whitespace-nowrap '>{serial_number}</td>
                      <td className='py-2 px-6 text-sm font-medium text-white whitespace-nowrap '>{payment_type}</td>
                      
                    </tr>
                  </tbody>
                </table>
                <table class="table-auto   divide-y  divide-gray-600 w-full text-sm">
                  <thead className='bg-zinc-700'>
                    <tr>
                      <th className='p-2'>商品名稱</th>
                      <th className='p-2'>價格</th>
                    </tr>
                  </thead>
                  <tbody className='text-center'>
                    <tr>
                      <td className='py-2 px-6 text-sm font-medium text-white whitespace-nowrap '>{plan_history.name}(進階會員{plan_history.days}天)</td>
                      <td className='py-2 px-6 text-sm font-medium text-white whitespace-nowrap '>{plan_history.price}元</td>
                      
                    </tr>
                  </tbody>
                </table>
                <table class="table-auto   divide-y  divide-gray-600 w-full text-sm">
                  <thead className='bg-zinc-700'>
                    <tr>
                      <th className='p-2'>支付日期{refund_at ? '(退款)': '(付款)'}</th>
                      <th className='p-2'>支付狀態</th>

                    </tr>
                  </thead>
                  <tbody className='text-center'>
                    <tr>
                      <td className='py-2 px-6 text-sm font-medium text-white whitespace-nowrap '>{refund_at ? moment(refund_at).format('YYYY-MM-DD HH:mm'): ` ${moment(paid_at).format('YYYY-MM-DD HH:mm')}`} </td>
                      <td className='py-2 px-6 text-sm font-medium text-white whitespace-nowrap '>{refund_at ? '已完成退款': '已完成付款'}</td>

                      
                    </tr>
                  </tbody>
                </table>

              </div>
            )
          })
        }
       </div>
      </main>
      
    </div>
  )
}

export default Orders