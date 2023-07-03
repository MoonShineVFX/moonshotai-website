import React, { useState, useEffect } from 'react';
import {motion,AnimatePresence} from 'framer-motion'
import Header from '../header'
import {  useRecoilValue ,useRecoilState } from 'recoil';
import { isLoginState,loginState,lineProfileState,userState} from '../atoms/galleryAtom';
import {getStoredLocalData,refreshToken,fetchLinePayRequest,testLinePay,checkUserLiffLoginStatus,postOrder,paymentLinePay,getOrder,getSubscriptions,getPlans} from '../helpers/fetchHelper'
import moment from 'moment';
import liff from '@line/liff';

function Subscriptions() {
  const liffID = process.env.REACT_APP_LIFF_LOGIN_ID
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginState);
  const [lineProfile, setLineProfile] = useRecoilState(lineProfileState);
  const [linLoginData, setLineLoginData] = useRecoilState(loginState)
  const [currentUser, setCurrentUser] = useRecoilState(userState)
  const [currentHeaders , setCurrentHeaders] = useState({})

  const [plansList, setPlansList]=useState(null)

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
            getPlans().then(data=>{
              setPlansList(data)
              console.log(data)
            })
            getSubscriptions(data.token).then(odata=>{
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
            const{created_at,current_plan,end_at,invitation,is_active,refund_at,start_at,user}=item
            return(
              <div className='text-white border my-6 border-lime-500 p-2 rounded-sm' key={'subs'+index}>
                <div className='text-sm'>
                  {current_plan}
                  <div className='flex gap-2'>
                    <div>起始日期</div>
                    <div>{moment(start_at).format('YYYY-MM-DD HH:mm')}  </div>
                  </div>
                  <div className='flex gap-2'>
                    <div>結束日期</div>
                    <div>{moment(end_at).format('YYYY-MM-DD HH:mm')}  </div>
                  </div>

                </div>


              </div>
            )
          })
        }
       </div>
      </main>
      
    </div>
  )
}

export default Subscriptions