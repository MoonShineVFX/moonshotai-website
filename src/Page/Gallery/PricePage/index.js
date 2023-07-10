import React, { useState, useEffect } from 'react';
import {motion,AnimatePresence} from 'framer-motion'
import Header from '../header'
import {LoadingCircle,DisableBuyButton,DisableInputInvite} from '../helpers/componentsHelper'
import {  useRecoilValue ,useRecoilState } from 'recoil';
import { isLoginState,loginState,lineProfileState,userState} from '../atoms/galleryAtom';
import {getStoredLocalData,refreshToken,fetchLinePayRequest,testLinePay,checkUserLiffLoginStatus,postOrder,paymentLinePay,paymentNewebPay} from '../helpers/fetchHelper'
import { MdDoneOutline,MdDone,MdOutlineTrendingFlat,MdPayment,MdCreditCard,MdOutlineCircle,MdCheckCircle,MdArrowRightAlt } from "react-icons/md";
import { useForm,Controller } from 'react-hook-form';
import Footer from '../../Home/Footer';
import { HmacSHA256 } from 'crypto-js';
import { Base64 } from 'js-base64';
import moment from 'moment';
import liff from '@line/liff';
function Index() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginState);
  const [lineProfile, setLineProfile] = useRecoilState(lineProfileState);
  const [linLoginData, setLineLoginData] = useRecoilState(loginState)
  const [currentUser, setCurrentUser] = useRecoilState(userState)
  const [currentHeaders , setCurrentHeaders] = useState({})

  const [isNeddWithin5Days, setIsNeedWithin5Days]= useState(false)
  const [isOrdering,setIsOrdering] = useState(false)
  const [isLoadingReq, setIsLoadingReq] = useState(false);
  const [isNeedLogin, setIsNeedLogin] = useState(false);
  const [isReqError, setReqError] = useState(false);

  const [isInviteLoadingReq, setIsInviteLoadingReq] = useState(false);
  const [isInviteReqError, setInviteReqError] = useState(false);
  const { control,register, handleSubmit, formState: { errors } } = useForm({
    name:''
  });
  const [ order , setOrder] = useState({
      amount : 500,
      currency : 'TWD',
      orderId : 'order20210921003',
      packages : [
        {
          id : "20210921003",
          amount : 90,
          products : [
            {
              name : "MSai90",
              quantity : 1,
              price : 90
            }
          ]
        }
      ],
      redirectUrls : {
        confirmUrl: "http://127.0.0.1:3000/confitmUrl",
        cancelUrl : "http://127.0.0.1:3000/cancelUrl"
      }
    })
  const onSubmit = (data) => {
    if(isLoggedIn){
      setIsInviteLoadingReq(true)
    }else{
      setIsInviteLoadingReq(false)
    }
  }
  const diffDays = (targetday)=>{
    const targetDate = moment(targetday);
    const currentDate = moment();
    const diffDays = targetDate.diff(currentDate, 'days');
    if (diffDays <= 5) {
      return true
    } return false

  }
  const liffID = process.env.REACT_APP_LIFF_LOGIN_ID
  //按下按鈕錢 先驗證是否已登入，要求登入
  const handlePay =(pid)=>{
      if(isLoggedIn){
        console.log('已登入')
        console.log(currentUser)
        if(!currentUser.is_subscribed){
          startLinePayFlow(pid)
        }else{
          if(diffDays(currentUser.subscription_end_at)){
            setIsNeedWithin5Days(false)
            startLinePayFlow(pid)
          }else{
            setIsNeedWithin5Days(true)
          }
        }
      }else{
        console.log('尚未登入需要登入')
        setIsNeedLogin(true)
        liff.init({liffId: liffID}).then(()=>{
          console.log('init完成可準備登入')
          setTimeout(()=>{liff.login();},500)
        })
      }
  }
  const handleBluePay = (pid) =>{
    if(isLoggedIn){
      console.log('已登入')
      console.log(currentUser)
      if(!currentUser.is_subscribed){
        startBluePayFlow(pid)
      }else{
        if(diffDays(currentUser.subscription_end_at)){
          setIsNeedWithin5Days(false)
          startBluePayFlow(pid)
        }else{
          setIsNeedWithin5Days(true)
        }
      }
    }else{
      console.log('尚未登入需要登入')
      setIsNeedLogin(true)
      liff.init({liffId: liffID}).then(()=>{
        console.log('init完成可準備登入')
        setTimeout(()=>{liff.login();},500)
      })
    }
  }
  const startLinePayFlow = (pid)=>{
    setIsOrdering(true)
    setIsLoadingReq(false);
    setReqError(false)
    postOrder(pid,linLoginData).then(odata=>{
      console.log('已建立訂單',odata)
      setIsOrdering(false)
      setIsLoadingReq(true)
      setTimeout(()=>{
        paymentLinePay(odata.serial_number,linLoginData).then(ldata=>{
          setIsLoadingReq(false)
          setReqError(false)
          const url = ldata.payment_url
          if(ldata?.code === "token_not_valid"){
            setReqError(true)
            setIsNeedLogin(true)
            liff.init({liffId: liffID}).then(()=>{
              console.log('init完成可準備登入')
              setTimeout(()=>{liff.login();},500)
            })
            return
          }
          window.location.href = url;
        }).catch(e=>{console.log(e)})
      },500)

    }).catch(e=>{console.log(e)})
  }
  const startBluePayFlow = (pid)=>{
    setIsOrdering(true)
    setIsLoadingReq(false);
    setReqError(false)
    postOrder(pid,linLoginData).then(odata=>{
      console.log('已建立訂單',odata)
      setIsOrdering(false)
      setIsLoadingReq(true)
      setTimeout(()=>{
        paymentNewebPay(odata.serial_number,linLoginData).then(ldata=>{
          setIsLoadingReq(false)
          setReqError(false)
          console.log(ldata)

          // form call 藍新 API
          const form = document.createElement('form');
          form.method = 'post';
          form.action = 'https://ccore.newebpay.com/MPG/mpg_gateway';//藍新金流驗證網址(測試環境)
          for (const key in ldata) {
              if (ldata.hasOwnProperty(key)) {
                  const hiddenField = document.createElement('input');
                  hiddenField.type = 'hidden';
                  hiddenField.name = key;
                  hiddenField.value = ldata[key];
                  form.appendChild(hiddenField);
              }
          }
          document.body.appendChild(form);
          form.submit();

          // const url = ldata.payment_url
          if(ldata?.code === "token_not_valid"){
            setReqError(true)
            setIsNeedLogin(true)
            liff.init({liffId: liffID}).then(()=>{
              console.log('init完成可準備登入')
              setTimeout(()=>{liff.login();},500)
            })
            return
          }
          // window.location.href = url;
        }).catch(e=>{console.log(e)})
      },500)

    }).catch(e=>{console.log(e)})
  }
  const [selectedBlock, setSelectedBlock] = useState(0);
  const handleBlockClick = (blockIndex) => {
    setSelectedBlock(blockIndex);
  };
  const blocks = [
    { title: '免費方案',price:'Free',days:'',basic:['插畫 CT','寫實 PR','漫畫 CM','寫實人像 PC','翻譯 TL','參考 R','直 V','橫 H'],advanced:[],daily_limit:'一天 10 次 (30 張)',storage:'10 張', bgColor: 'white',payment_blue:false,payment_line:false,invite_input:false },
    { title: '開通體驗',price:'Free', days:'5', basic:['插畫 CT','寫實 PR','漫畫 CM','寫實人像 PC','翻譯 TL','參考 R','直 V','橫 H'],advanced:['修改 I','固定 O','骨架 P','放大 ext'],daily_limit:'不限次數',storage:'300 張' ,payment_blue:false,payment_line:false,invite_input:true},
    { title: '標準方案',price:'TWD 99 元', days:'30',basic:['插畫 CT','寫實 PR','漫畫 CM','寫實人像 PC','翻譯 TL','參考 R','直 V','橫 H'],advanced:['修改 I','固定 O','骨架 P','放大 ext'],daily_limit:'不限次數',storage:'300 張',payment_blue:true ,payment_line:true,invite_input:false,plan_id:1},
  ];

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
          })
        }
        
      })
  },[setIsLoggedIn,setLineLoginData,setLineProfile])
  return (
    <div>
      <Header currentUser={currentUser} isLoggedIn={isLoggedIn}/>
      <main className="max-w-6xl mx-auto pt-10 pb-10 px-8">
  
        <div className="max-w-md mx-auto mb-14 text-center">
          <h1 className="text-4xl mb-6 font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-lime-300 to-lime-600">恣意想、任意玩</h1>
          <p className="text-lg text-gray-300 font-medium">進階功能無限使用<br /> 加速算圖以及更多的儲存空間！</p>
          <div className='text-white hidden'>
            <div className='flex items-center text-left gap-4 bg-zinc-800 p-3 my-5 rounded-md'> <span className='text-lime-400'><MdDoneOutline /></span><div>  <div className='text-lg font-bold'>無使用次數限制</div> <div className='text-white/70'>問答、修改、固定、骨架、放大。</div></div> </div>
            <div className='flex items-center text-left gap-4 bg-zinc-800 p-3 my-5 rounded-md'> <span className='text-lime-400'><MdDoneOutline /></span><div> <div className='text-lg font-bold'>加速算圖</div> <div className='text-white/70'>與免費用戶相比更少的等待時間。</div></div></div>
            <div className='flex items-center text-left gap-4 bg-zinc-800 p-3 my-5 rounded-md'> <span className='text-lime-400'><MdDoneOutline /></span><div> <div className='text-lg font-bold'>加大儲存空間</div> <div className='text-white/70'> 增加個人儲存數量至 300 張。</div> </div> </div>
          </div>
        </div>
        <h1 className="text-center text-4xl mb-6 font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-lime-300 to-lime-600">方案選擇</h1>
        <div>
          {blocks.map((block, index) => {
          
          return(
            <motion.div
              key={index}
              className={`text-left px-3 py-5 my-5 rounded-md ${
                selectedBlock === index ? 'border-lime-400 border-2 bg-zinc-800' : 'bg-zinc-800  '
              }`}
              onClick={() => handleBlockClick(index)}
              
            >
              <div className='flex items-center gap-4 '>
                <span className='text-lime-400'>{selectedBlock === index ? <MdCheckCircle /> :<MdOutlineCircle/> }</span>
                <div className='flex justify-between items-center w-full'>
                  <div className={'text-lg font-bold  text-white'}>{block.title}</div>
                  <div className={'text-sm   text-white'}>{block.price} {block.days.length>0 ? <span className=''> / {block.days} 天</span>  : '' }</div>
                </div>

              </div>
              <AnimatePresence initial={false} mode="wait">
              {selectedBlock === index && (
                <motion.div 
                  className={'text-sm text-gray-100 my-2 '}
                  initial={{ height: 0,opacity: 0 }}
                  animate={{ height: "auto",opacity: 1, 
                            transition: {
                              height: {
                                duration: 0.4,
                              },
                              opacity: {
                                duration: 0.25,
                                delay: 0.15,
                              },
                            }, }}
                  exit={{ height: 0,opacity: 0,  
                          transition: {
                            height: {
                              duration: 0.4,
                            },
                            opacity: {
                              duration: 0.25,
                            },
                          },}}
                >
                  <div className='my-2 text-lime-500'>基本功能</div>
                  
                  <ul className=' list-disc pl-4 grid grid-cols-2'>
                  {
                    block.basic.map((item,index)=>{
                      return(
                        <li>{item}</li>
                      )
                    })
                  }
                  </ul>
                  {block.advanced.length>0 && <div>
                    <div className='my-2 text-lime-500'>進階功能</div>
                    <ul className=' list-disc pl-4 grid grid-cols-2'>
                    {
                      block.advanced.map((item,index)=>{
                        return(
                          <li>{item}</li>
                        )
                      })
                    }
                    </ul>
                  </div> }
                  <div className='my-2 text-lime-500'>每日算圖限制</div>
                  <div>
                    {block.daily_limit}
                  </div>
                  <div className='my-2 text-lime-500'>藝廊儲存量</div>
                  <div>
                    {block.storage}
                  </div>
                  <div className='my-2 flex flex-col'>
                    {
                      block.payment_line && <div>
                        <button 
                          className="w-full flex  justify-center items-center gap-2 bg-lime-600  rounded-md py-3  text-center text-white text-sm"
                          onClick={()=>handlePay(block.plan_id)}
                        >
                          <MdCreditCard size={20} />  Line pay (test) <MdArrowRightAlt />
                          {isLoadingReq && <div className='text-xs'>等待回應...</div>}
                          {isReqError && <div className='text-xs'>錯誤，需重新登入</div>}
                          
                        </button>
                        {isNeedLogin&&  <div className='text-xs mt-1'>尚未登入，將引導至 Line 登入</div>}
                        {isNeddWithin5Days &&   <div className='text-xs mt-1'>進階功能使用期限未到期，無法續購。</div>}
                      </div>
                    }
                    {
                      block.payment_blue && <div>
                        <button 
                          className="w-full flex  justify-center items-center gap-2 bg-blue-600  rounded-md py-3 mt-3  text-center text-white text-sm"
                          onClick={()=>handleBluePay(block.plan_id)}
                        >
                          <MdCreditCard size={20} />  藍新支付 (test) <MdArrowRightAlt />
                          {isLoadingReq && <div className='text-xs'>等待回應...</div>}
                          {isReqError && <div className='text-xs'>錯誤，需重新登入</div>}
                          
                        </button>
                        {isNeedLogin&&  <div className='text-xs mt-1'>尚未登入，將引導至 Line 登入</div>}
                        {isNeddWithin5Days &&   <div className='text-xs mt-1'>進階功能使用期限未到期，無法續購。</div>}
                      </div>
                    }
                    {
                      block.invite_input && <div>
                        <div className='text-xs text-white/70 my-2'>需入序號後，將可獲得進階功能 5 天，透過分享推薦序號也可以獲得回饋 5 天</div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div className='flex flex-col gap-2'>
                            <div className='flex flex-col'>
                              <input  type="text" placeholder="輸入推薦序號" className='bg-zinc-700 rounded-md py-3 px-2 text-sm' {...register("invite_number", { required: true })}/>
                              {errors.invite_number && <div className='text-xs text-white/70 my-2'>請確認有輸入推薦序號。</div>}
                            </div>
                            <button type="submit"    
                              className="w-full flex  justify-center items-center gap-2 bg-lime-600  rounded-md py-3  text-center text-white text-sm"
                            >
                              輸入邀請碼
                              <MdOutlineTrendingFlat className='ml-2'/>
                              {isInviteLoadingReq&& <div className='text-xs'>等待回應...</div>}
                            </button>
                          </div>

                        </form>
                      </div>
                    }
                  </div>

                </motion.div>
              )}
              </AnimatePresence>
            </motion.div>
          )})}
        </div>

        
      </main>
      <div className='max-w-md mx-auto mb-14 px-10'>
        <h1 className="text-4xl text-center mb-6 font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-lime-300 to-lime-600">常見問答</h1>
        <div className='my-6 flex flex-col gap-8'>
          <div className='text-white'>
            <div className='text-xl my-3'>進階功能有哪些?</div>
            <div className='text-sm'>
              <ul>
                <li>修改 (I) 能夠使用遮罩畫出想要重繪的部分。</li>
                <li>固定 (O) 能夠使用遮罩來畫出不想被重繪的部分。</li>
                <li>骨架 (P) 能夠抓取參考圖中的人物骨架生成圖片。</li>
                <li>放大 (ext) 能將圖片放大兩倍。</li>
              </ul>
            </div>
          </div> 
          <div className='text-white'>
            <div className='text-xl my-3'>免費會員可以使用進階功能嗎? </div>
            <div className='text-sm'>
            免費會員可以無限使用基本功能，但。
            </div>
          </div>       
          <div className='text-white'>
            <div className='text-xl my-3'>推薦序號分享規則 </div>
            <div className='text-sm'>
            。
            </div>
          </div>
          <div className='text-white'>
            <div className='text-xl my-3'>購買後可以退費嗎 </div>
            <div className='text-sm'>
            。
            </div>
          </div>               



        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Index