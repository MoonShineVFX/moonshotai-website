import React, { useState, useEffect } from 'react';
import {motion,AnimatePresence} from 'framer-motion'
import Header from '../header'
import {  useRecoilValue ,useRecoilState } from 'recoil';
import { isLoginState,loginState,lineProfileState,userState} from '../atoms/galleryAtom';
import {getStoredLocalData,refreshToken,fetchLinePayRequest,testLinePay,checkUserLiffLoginStatus,postOrder,paymentLinePay,getOrders,postOrder_refund,getSubscriptions} from '../helpers/fetchHelper'
import { MdDoneOutline,MdDone,MdOutlineTrendingFlat,MdPayment,MdCreditCard,MdOutlineCircle,MdAttachMoney,MdArrowRightAlt } from "react-icons/md";
import OrderList from './OrderList';
import SubscriptionsList from './SubscriptionsList';
import moment from 'moment';
import liff from '@line/liff';
const menuItems=[
  {id:1,title:'訂閱紀錄'},
  {id:2,title:'訂單列表'},
]
function Orders() {
  const liffID = process.env.REACT_APP_LIFF_LOGIN_ID
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginState);
  const [lineProfile, setLineProfile] = useRecoilState(lineProfileState);
  const [linLoginData, setLineLoginData] = useRecoilState(loginState)
  const [currentUser, setCurrentUser] = useRecoilState(userState)
  const [currentHeaders , setCurrentHeaders] = useState({})

  const [selectedItem, setSelectedItem] = useState(menuItems[1]);

  const [isLoadingReq, setIsLoadingReq] = useState(false);
  const [isNeedLogin, setIsNeedLogin] = useState(false);
  const [isReqError, setReqError] = useState(false);

  const [orders, setOrders] = useState(null)
  const [subscriptions, setSubscriptions] = useState(null)
  

  const handleRefund = (sn)=>{
    console.log('click')
    if(isLoggedIn){
      console.log('已登入')
      console.log(currentUser)
      startRefundFlow(sn)
    }else{
      console.log('尚未登入需要登入')
      setIsNeedLogin(true)
      liff.init({liffId: liffID}).then(()=>{
        console.log('init完成可準備登入')
        setTimeout(()=>{liff.login();},500)
      })
    }
   
  }
  const startRefundFlow = (sn)=>{
    setIsLoadingReq(true);
    setReqError(false)
    postOrder_refund(sn,linLoginData).then(rdata=>{
      console.log('準備退費')
      setIsLoadingReq(false)
      console.log(rdata)
      updateRefundStatus(sn)

    })
  }
  const updateRefundStatus = (serialNumber) => {
    setOrders(prevOrders => {
      const updatedOrders = prevOrders.map(order => {
        if (order.serial_number === serialNumber) {
          return {
            ...order,
            status: 'Refund' // 更新为退款成功状态
          };
        }
        return order;
      });
      return updatedOrders;
    });
  };
  const handleMenuItemClick = (item) => {
    setSelectedItem(item);
  };
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
              setOrders(odata)
            })
            getSubscriptions(data.token).then(sdata=>{
              console.log(sdata)
              setSubscriptions(sdata)
            })
          })
        }
        
      })
  },[setIsLoggedIn,setLineLoginData,setLineProfile])

  if(!orders){
    return(
      <div>
        <Header currentUser={currentUser} isLoggedIn={isLoggedIn}/>
        <main className="max-w-6xl mx-auto pt-10 pb-10 px-8 text-white">
        <div className=''>
    
        </div>
        <div>目前是空的或請登入後查看。</div>
        </main>
        
      </div>
    )
  }
  return (
    <div>
      <Header currentUser={currentUser} isLoggedIn={isLoggedIn}/>
      <main className="max-w-6xl mx-auto pt-10 pb-10 px-8">
       <div className='text-white text-lg flex gap-3'>
        {
            menuItems.map((item,index)=>{
              return(
                <div 
                  className={ (selectedItem?.id === item.id ? ' font-bold text-white border-b pb-2' : 'font-normal text-white/80')}
                  key={item.id} 
                  onClick={() => handleMenuItemClick(item)}>{item.title}</div>
              )
            })
          }
       </div>
       {selectedItem && (
        <div>
          {selectedItem.title === '訂單列表' && <OrderList orderData={orders} />}
          {selectedItem.title === '訂閱紀錄' && <SubscriptionsList subData={subscriptions}/>}
        </div>
      )}


       <div>

       </div>
      </main>
      
    </div>
  )
}

export default Orders