import React, { useState, useEffect } from 'react';
import {motion,AnimatePresence} from 'framer-motion'
import Header from '../header'
import {  useRecoilValue ,useRecoilState } from 'recoil';
import { isLoginState,loginState,lineProfileState,userState} from '../atoms/galleryAtom';
import {getStoredLocalData,refreshToken,fetchLinePayRequest,testLinePay,checkUserLiffLoginStatus,postOrder,paymentLinePay,getOrders,postOrder_refund,getSubscriptions,getPlans,postRefund_surveys} from '../helpers/fetchHelper'
import { MdDoneOutline,MdDone,MdOutlineTrendingFlat,MdPayment,MdCreditCard,MdOutlineCircle,MdAttachMoney,MdArrowRightAlt } from "react-icons/md";
import OrderList from './OrderList';
import SubscriptionsList from './SubscriptionsList';
import ReportModal from './ReportModal';
import { reportModalState,reportDataState } from '../atoms/galleryAtom';
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
  const [isShowReport,setIsShowReport] = useRecoilState(reportModalState)
  const [isRefundLoading , setIsRefundLoading] = useState(false)
  const currentOrder = useRecoilValue(reportDataState)

  const [isLoadingReq, setIsLoadingReq] = useState(false);
  const [isNeedLogin, setIsNeedLogin] = useState(false);
  const [isReqError, setReqError] = useState(false);

  const [orders, setOrders] = useState(null)
  const [subscriptions, setSubscriptions] = useState(null)
  const [plans, setPlans] = useState(null)

  const [ reportMsg , setReportMsg ] = useState('')
  

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
  const handleReport = (items)=>{
    if (isRefundLoading) {
      return;
    }
    setIsRefundLoading(true)

    setReportMsg('')
    if(isLoggedIn){
      console.log('已登入')
      if(currentOrder.is_surveyed){
        setReportMsg('表單已填過。')
        setTimeout(()=>{
          setReportMsg('準備執行退款..')
          
          // startRefundFlow(items.order_serial_number)
        },600)
        setTimeout(()=>{
          setReportMsg('已送出受理退款。')
          setIsShowReport(false)
        },600)
        return
      }
      postRefund_surveys(items,linLoginData).then(data=>{
        if(data.message === 'Survey is done'){
          setReportMsg('表單已送出')
          setTimeout(()=>{
            setReportMsg('準備執行退款..')
            // startRefundFlow(items.order_serial_number)
          },600)
          setTimeout(()=>{
            setReportMsg('已送出受理退款。')
            setIsShowReport(false)
          },600)
        }
      }).catch(err=>console.log(err))

    }else{
      console.log('尚未登入需要登入')
      setIsNeedLogin(true)
      liff.init({liffId: liffID}).then(()=>{
        console.log('init完成可準備登入')
        setTimeout(()=>{liff.login();},500)
      })
      setIsRefundLoading(false)
    }


  }
  const startRefundFlow = (sn)=>{
    setIsLoadingReq(true);
    setReportMsg('準備執行退款流程..')
    setReqError(false)
    setTimeout(()=>{
      console.log('準備退費')
      setReportMsg('正在執行退款流程..')
      postOrder_refund(sn,linLoginData).then(rdata=>{
        
        setIsLoadingReq(false)
        
        if(rdata.message=== "You can't refund a expired order"){
          setReportMsg('已超過48小時無法申請。')
          return
        }
        if(rdata.message=== "Refund success"){
          setReportMsg('這筆訂單已完成退款。')
          return
        }else{
          setReportMsg('此筆訂單退款流程出現問題，如有疑問請與我們客服聯繫: ai@moomshint.tw')
        }
        
     
        setIsRefundLoading(false)
        setTimeout(()=>{
          setIsShowReport(false)
        },500)
        console.log(rdata)
        updateRefundStatus(sn)
  
      })
    },1000)

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
              console.log('subs',sdata)
              setSubscriptions(sdata)
            })
            getPlans().then(pdata=>{
              setPlans(pdata)
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
  const reversedData = orders?.slice().reverse();
  const reversedSubData = subscriptions?.slice().reverse();
  return (
    <div>
      <AnimatePresence>
        {isShowReport && <ReportModal handleReport={handleReport} reportMsg={reportMsg} isRefundLoading={isRefundLoading} is_surveyed={currentOrder.is_surveyed} /> }
      </AnimatePresence>
      <Header currentUser={currentUser} isLoggedIn={isLoggedIn}/>
      <main className="max-w-6xl mx-auto pt-10 pb-10 px-8">
       <div className='text-white text-lg flex gap-3'>
        {
            menuItems.map((item,index)=>{
              return(
                <div 
                  className={'pb-2 '+ (selectedItem?.id === item.id ? ' font-bold text-white border-b ' : 'font-normal text-white/80')}
                  key={item.id} 
                  onClick={() => handleMenuItemClick(item)}>{item.title}</div>
              )
            })
          }
       </div>
       {selectedItem && (
        <div>
          {selectedItem.title === '訂單列表' && <OrderList orderData={reversedData} handleReport={handleReport} />}
          {selectedItem.title === '訂閱紀錄' && <SubscriptionsList subData={reversedSubData} plans={plans}/>}
        </div>
      )}


       <div>

       </div>
      </main>
      
    </div>
  )
}

export default Orders