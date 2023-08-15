import React, { useState, useEffect } from 'react';
import {motion,AnimatePresence} from 'framer-motion'
import Header from '../header'
import {  useRecoilValue ,useRecoilState } from 'recoil';
import { isLoginState,loginState,lineProfileState,userState} from '../atoms/galleryAtom';
import {getStoredLocalData,getOrders,postOrder_refund,getSubscriptions,getPlans,postRefund_surveys,fetchUserGifts,postOpenGiftMutation} from '../helpers/fetchHelper'
import OrderList from './OrderList';
import SubscriptionsList from './SubscriptionsList';
import ReportModal from './ReportModal';
import { useQuery, useMutation } from 'react-query';
import { reportModalState,reportDataState } from '../atoms/galleryAtom';
import moment from 'moment';
import liff from '@line/liff';
import GiftsList from './GiftsList';
const liffID = process.env.REACT_APP_LIFF_LOGIN_ID

const menuItems=[
  {id:1,title:'訂閱紀錄'},
  {id:2,title:'訂單列表'},
  {id:3,title:'禮物箱'},
]

function Orders() {

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
  const [gifts, setGifts] = useState(null)
  const [plans, setPlans] = useState(null)

  const [ reportMsg , setReportMsg ] = useState('')
  useEffect(()=>{
    getStoredLocalData().then(data=>{
        setIsLoggedIn(data.isLogin)
        setLineLoginData(data.loginToken)
        setLineProfile(data.lineProfile)
        setCurrentUser(data.currentUser)
        let loginToken = data.loginToken
        let headers = {'Content-Type': 'application/json'} 

      })
  },[setIsLoggedIn,setLineLoginData,setLineProfile])
  //FETCH ORDER
  const { data: orderData, isLoading: isOrdersLoading, isError: isOrdersError } = useQuery(
    ['orders', linLoginData],
    () => getOrders(linLoginData),
    {
      enabled: linLoginData !== null,
      onSuccess: (odata)=>{
        setOrders(odata)
      }
    }
  );
  // FETCH SUBS
  const { data: subsData, isLoading: isSubsLoading, isError: isSubsError } = useQuery(
    ['subs', linLoginData],
    () => getSubscriptions(linLoginData),
    {
      enabled: linLoginData !== null,
      onSuccess: (sdata)=>{
        setSubscriptions(sdata)
      }
    }
  );
  // FETCH PLAN 
  const { data: PlansData, isLoading: isPlansLoading, isError: isPlansError } = useQuery(
    ['subs', linLoginData],
    () => getPlans(linLoginData),
    {
      enabled: linLoginData !== null,
      onSuccess: (pdata)=>{
        setPlans(pdata)
      }
    }
  );
  //FETCH GIFT
  const { data: giftsData, isLoading: isGiftsLoading, isError: isGiftsError, refetch: refetchGifts } = useQuery(
    ['gifts', linLoginData],
    () => fetchUserGifts(linLoginData),
    {
      enabled: linLoginData !== null,
      onSuccess: (gdata)=>{
        setGifts(gdata)
      }
    }
  );
  const [currentlyUpdatingGiftId, setCurrentlyUpdatingGiftId] = useState(null);
  const { mutate, isLoading: isMutationLoading, isError } = useMutation(postOpenGiftMutation,{
    onSuccess:()=>{
      refetchGifts()
      setCurrentlyUpdatingGiftId(null)
    }
  });
  const handleOpenGift =(gift_id)=>{
    mutate({ gift_id, linLoginData });
  }
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



  
  if(!orders ){
    return(
      <div>
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
  const reversedGiftData = gifts;
  return (
    <div>
      <AnimatePresence>
        {isShowReport && <ReportModal handleReport={handleReport} reportMsg={reportMsg} isRefundLoading={isRefundLoading} is_surveyed={currentOrder.is_surveyed} /> }
      </AnimatePresence>
      <main className="max-w-6xl mx-auto pt-10 pb-10 px-8">
       <div className='text-white text-lg flex gap-3'>
        {
            menuItems.map((item,index)=>{
              return(
                <div 
                  className={'pb-2 cursor-pointer '+ (selectedItem?.id === item.id ? ' font-bold text-white border-b ' : 'font-normal text-white/80')}
                  key={item.id} 
                  onClick={() => handleMenuItemClick(item)}>{item.title}</div>
              )
            })
          }
       </div>
       {selectedItem && (
        <div>
          {selectedItem.title === '訂單列表' && <OrderList orderData={reversedData} handleReport={handleReport} />}
          {selectedItem.title === '訂閱紀錄' && <SubscriptionsList subData={reversedSubData} plans={plans} currentUser={currentUser}/>}
          {selectedItem.title === '禮物箱' && <GiftsList giftData={reversedGiftData} currentUser={currentUser} handleOpenGift={handleOpenGift} isMutationLoading={isMutationLoading} setCurrentlyUpdatingGiftId={setCurrentlyUpdatingGiftId} currentlyUpdatingGiftId={currentlyUpdatingGiftId} />}
        </div>
      )}


       <div>

       </div>
      </main>
      
    </div>
  )
}

export default Orders