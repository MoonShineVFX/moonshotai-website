import React, { useState, useEffect } from 'react';
import {motion,AnimatePresence} from 'framer-motion'
import EditUserEmailForm from '../Components/EditUserEmailForm';
import {CallToLoginModal} from '../helpers/componentsHelper'
import {  useRecoilValue ,useRecoilState } from 'recoil';
import { isLoginState,loginState,lineProfileState,userState} from '../atoms/galleryAtom';
import {getStoredLocalData,postOrder,paymentLinePay,paymentNewebPay,paymentInviteSerial,patchUserEmail,fetchUserProfile} from '../helpers/fetchHelper'
import { MdDoneOutline,MdOutlineTrendingFlat,MdCreditCard,MdOutlineCircle,MdCheckCircle,MdArrowRightAlt } from "react-icons/md";
import { useForm,Controller } from 'react-hook-form';
import moment from 'moment';
import liff from '@line/liff';
import { Button } from "@material-tailwind/react";
import { getAnalytics, logEvent } from "firebase/analytics";
function Index() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginState);
  const [lineProfile, setLineProfile] = useRecoilState(lineProfileState);
  const [linLoginData, setLineLoginData] = useRecoilState(loginState)
  const [currentUser, setCurrentUser] = useRecoilState(userState)
  const [currentPlan, setCurrentPlan] = useState('')

  const [ isLoginForPrice , setIsLoginForPrice] = useState(false)
  const [isNeddWithin5Days, setIsNeedWithin5Days]= useState(false)
  const [isOrdering,setIsOrdering] = useState(false)
  const [isLoadingReq, setIsLoadingReq] = useState(false);
  const [isLoadingBlueReq, setIsLoadingBlueReq] = useState(false);
  const [isNeedLogin, setIsNeedLogin] = useState(false);
  const [isReqError, setReqError] = useState(false);
  const [isCheckAccount, setIsCheckAccount] = useState(false);
  const [isNeedEmail, setIsNeedEmail] = useState(false);
  const [isSuccessSaveEmail, setIsSuccessSaveEmail] = useState(false);
  const [isReadyToPayPage, setIsReadyToPayPage,] = useState(false);
  const [ flowMsg ,setFlowMsg] = useState('')
  const [ selectPlanId ,setSelectPlanId] = useState(0)
  const [ selectPayment ,setSelectPayment] = useState('')

  const [isInviteLoadingReq, setIsInviteLoadingReq] = useState(false);
  const [isInviteSuccess, setIsInviteSuccess] = useState(false);
  const [isAlreadyUsed, setIsAlreadyUsed] = useState(false);
  const [isYourself, setIsYouself] = useState(false);
  const [isLimits, setIsLimits] = useState(false);
  const [isInviteReqError, setInviteReqError] = useState(false);
  const [inviteSubmitMsg,setInviteSubmitMsg]= useState('');
  
  const { control,register, handleSubmit, formState: { errors } } = useForm({
    name:''
  });
  const analytics = getAnalytics();
  useEffect(()=>{
    logEvent(analytics, '價格介紹頁面_進入訪問')
  },[])

  useEffect(()=>{
    getStoredLocalData().then(data=>{
        setIsLoggedIn(data.isLogin)
        setLineLoginData(data.loginToken)
        setLineProfile(data.lineProfile)
        setCurrentUser(data.currentUser)

        
      })
  },[setIsLoggedIn,setLineLoginData,setLineProfile])
  
  const onSubmit = (data) => {
    setIsInviteLoadingReq(false)
    setIsAlreadyUsed(false) 
    setIsYouself(false)
    setIsInviteSuccess(false)
    setInviteSubmitMsg('')
    if(isLoggedIn){
      console.log('已登入')
      console.log(currentUser)
      setIsInviteLoadingReq(true)
      paymentInviteSerial(data.invite_number,linLoginData).then(d=>{
        console.log(d)
        setTimeout(()=>{
          if(d.status === 500){
            setInviteSubmitMsg('請輸入正確的推薦序號') 
            setIsInviteLoadingReq(false)
            return
          }
          if(d.message=== 'You have already used the invitation'){
            setIsAlreadyUsed(true) 
            setIsInviteLoadingReq(false)
            setInviteSubmitMsg('')
            return
          }
          if(d.message=== "You can't invite yourself"){
            setIsYouself(true)
            setIsInviteLoadingReq(false)
            setInviteSubmitMsg('')
            return
          }
          if(d.message=== "This Invitation code has reached the limit"){
            setIsLimits(true)
            setIsInviteLoadingReq(false)
            setInviteSubmitMsg('')
            return
          }

          if(d.message=== "Invitation success"){
            setIsInviteSuccess(true)
            setIsInviteLoadingReq(false)
            setInviteSubmitMsg('')
          }
          setIsInviteLoadingReq(false)
          setInviteSubmitMsg('')
        },600)


      })
    }else{
      console.log('尚未登入需要登入')
      setIsNeedLogin(true)
      setIsLoginForPrice(true)
    }

  }
  const diffDays = (targetday)=>{
    const targetDate = moment(targetday);
    const currentDate = moment();
    const diffDays = targetDate.diff(currentDate, 'days');
    if(diffDays === null ) return false
    if (diffDays <= 5) {
      return true
    } return false

  }
  const handleSaveEditEmail = (data)=>{
    setFlowMsg('')
    console.log(selectPlanId)
    console.log(selectPayment)
    console.log(data)
    patchUserEmail(currentUser.id,linLoginData,data)
      .then((data)=> {
        if(data.status === 200){
          setTimeout(()=>{
            fetchUserProfile(currentUser.id, linLoginData)
              .then((data)=> {
                // console.log(data)
                setCurrentUser(data)
                localStorage.setItem('currentUser', JSON.stringify(data));
                setTimeout(()=>{
                  // setIsNeedEmail(false)
                  setIsSuccessSaveEmail(true)
                  setFlowMsg('資料確認。')
                },600)
                // STAND BY 這步驟會建立訂單 然後跳轉付款頁面
                setTimeout(()=>{
                  const payment = selectPayment === 'linepay' ? startLinePayFlow(selectPlanId) : startBluePayFlow(selectPlanId) ;
                  console.log('go payment')
                },500)

              })  
              .catch((error) => console.error(error));
          },1000)
        }
      })
      .catch((error) => console.error(error));

  } 
  const liffID = process.env.REACT_APP_LIFF_LOGIN_ID
  //按下按鈕錢 先驗證是否已登入，要求登入
  const handlePay =(pid,payment_type)=>{
      if(isLoggedIn){
        console.log('已登入')
        console.log(currentUser)
        setIsNeedEmail(true)
        setIsCheckAccount(false)
        // startLinePayFlow(pid)
      }else{
        console.log('尚未登入需要登入')
        setIsNeedLogin(true)
        setIsLoginForPrice(true)
        // liff.init({liffId: liffID}).then(()=>{
        //   console.log('init完成可準備登入')
        //   if(!liff.isLoggedIn()){
        //     setTimeout(()=>{liff.login();},500)
        //   }
        // })
      }
  }
  const handleBluePay = (pid) =>{
    if(isLoggedIn){
      console.log('已登入')
      console.log(currentUser)
      startBluePayFlow(pid)
      if(!currentUser.is_subscribed){
        // startBluePayFlow(pid)
      }else{
        if(diffDays(currentUser.subscription_end_at)){
          // setIsNeedWithin5Days(false)
          // startBluePayFlow(pid)
        }else{
          // setIsNeedWithin5Days(true)
        }
      }
    }else{
      console.log('尚未登入需要登入')
      setIsNeedLogin(true)
      setIsLoginForPrice(true)
      // liff.init({liffId: liffID}).then(()=>{
      //   if(!liff.isLoggedIn()){
      //     setTimeout(()=>{liff.login();},500)
      //   }
      // })
    }
  }

  const startLinePayFlow = (pid)=>{
    setTimeout(()=>{
      setFlowMsg('正在建立訂單。')
    },800)

    setIsOrdering(true)
    setIsLoadingReq(false);
    setReqError(false)
    postOrder(pid,linLoginData).then(odata=>{
      console.log('已建立訂單',odata)
      setTimeout(()=>{
        setFlowMsg('訂單建立完成。')
      },1500)

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
              if(!liff.isLoggedIn()){
                setTimeout(()=>{liff.login();},500)
              }
            })
            return
          }
          setIsCheckAccount(false)
          setIsReadyToPayPage(true)
          setTimeout(()=>{
            setFlowMsg('送出訂單資訊，準備跳轉頁面。')
            window.location.href = url;
          },1500)

        }).catch(e=>{console.log(e)})
      },500)

    }).catch(e=>{console.log(e)})
  }
  const startBluePayFlow = (pid)=>{
    setTimeout(()=>{
      setFlowMsg('正在建立訂單。')
    },800)
    setIsOrdering(true)
    setIsLoadingBlueReq(false);
    setReqError(false)
    postOrder(pid,linLoginData).then(odata=>{
      console.log('已建立訂單',odata)
      setTimeout(()=>{
        setFlowMsg('訂單建立完成。')
      },1500)

      setIsOrdering(false)
      setIsLoadingBlueReq(true)
      setTimeout(()=>{
        paymentNewebPay(odata.serial_number,linLoginData).then(ldata=>{
          setIsLoadingBlueReq(false)
          setReqError(false)
          if(ldata?.code === "token_not_valid"){
            setReqError(true)
            setIsNeedLogin(true)
            liff.init({liffId: liffID}).then(()=>{
              if(!liff.isLoggedIn()){
                setTimeout(()=>{liff.login();},500)
              }
            })
            return
          }
          
          setIsCheckAccount(false)
          setIsReadyToPayPage(true)
          setTimeout(()=>{
            setFlowMsg('送出訂單資訊，準備跳轉頁面。')
          },1500)
          // form call 藍新 API
          const form = document.createElement('form');
          form.method = 'post';
          form.action = ldata.payment_url;//藍新金流驗證網址(測試環境)
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
    { title: '免費方案',full_title:'MoonShot 體驗會員 5 天',price:'Free',days:'',basic:['SDXL','麥橘 MJ','插畫 CT','寫實 PR','漫畫 CM','寫實人像 PC','參考 R','翻譯 TL','直/V','橫 /H'],advanced:[],daily_limit:'不限次數',storage:'100 張', bgColor: 'white',payment_blue:false,payment_line:false,invite_input:false },
    { title: '開通推薦序號',full_title:'MoonShot 體驗會員 5 天',price:'Free', days:'5', basic:['SDXL','麥橘 MJ','插畫 CT','寫實 PR','漫畫 CM','寫實人像 PC','參考 R','翻譯 TL','直 /V','橫 /H'],advanced:['修改 I','固定 O','骨架 P','放大 /ext','大圖 /hr','中圖 /mr', '調整步數 /steps:1-50','錯視 Q'],daily_limit:'不限次數',storage:'300 張' ,payment_blue:false,payment_line:false,invite_input:true},
    { title: '進階方案',full_title:'MoonShot 進階方案 30 天', price:'TWD 99 元', days:'30',basic:['SDXL','麥橘 MJ','插畫 CT','寫實 PR','漫畫 CM','寫實人像 PC','參考 R','翻譯 TL','直 /V','橫 /H'],advanced:['修改 I','固定 O','骨架 P','放大 /ext','大圖 /hr','中圖 /mr', '調整步數 /steps:1-50','錯視 Q'],daily_limit:'不限次數',storage:'300 張',payment_blue:true ,payment_line:true,invite_input:false,plan_id:1},
  ];

  return (
    <div>
       <AnimatePresence>
        {isNeedEmail && <EditUserEmailForm closeModal={()=>setIsNeedEmail(false)} handleSaveEditEmail={handleSaveEditEmail} currentUser={currentUser} currentPlan={currentPlan} selectPayment={selectPayment} flowMsg={flowMsg}/>   }
        {isLoginForPrice && <CallToLoginModal closeModal={()=>setIsLoginForPrice(false)}/>}

       </AnimatePresence>
      {/* <Header currentUser={currentUser} isLoggedIn={isLoggedIn}/> */}
      <main className="max-w-6xl mx-auto pt-10 pb-10 px-8">
  
        <div className="max-w-md mx-auto mb-14 text-center">
          <h1 className="text-4xl mb-6 font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-t_lime-300 to-t_lime-600">恣意想、任意玩</h1>
          <p className="text-lg text-gray-300 font-medium">進階功能無限使用<br /> 加速算圖以及更多的儲存空間！</p>
          <div className='text-white hidden'>
            <div className='flex items-center text-left gap-4 bg-gray-800 p-3 my-5 rounded-md'> <span className='text-t_lime-400'><MdDoneOutline /></span><div>  <div className='text-lg font-bold'>無使用次數限制</div> <div className='text-white/70'>問答、修改、固定、骨架、放大。</div></div> </div>
            <div className='flex items-center text-left gap-4 bg-gray-800 p-3 my-5 rounded-md'> <span className='text-t_lime-400'><MdDoneOutline /></span><div> <div className='text-lg font-bold'>加速算圖</div> <div className='text-white/70'>與免費用戶相比更少的等待時間。</div></div></div>
            <div className='flex items-center text-left gap-4 bg-gray-800 p-3 my-5 rounded-md'> <span className='text-t_lime-400'><MdDoneOutline /></span><div> <div className='text-lg font-bold'>加大儲存空間</div> <div className='text-white/70'> 增加個人儲存數量至 300 張。</div> </div> </div>
          </div>
        </div>
        <h1 className="text-center text-4xl mb-6 font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-t_lime-300 to-t_lime-600">方案選擇</h1>
        <div>
          {blocks.map((block, index) => {
          
          return(
            <motion.div
              key={index}
              className={`text-left px-3 py-5 my-5 rounded-md ${
                selectedBlock === index ? 'border-t_lime-400 border-2 bg-gray-800' : 'bg-gray-800  '
              }`}
              onClick={() => handleBlockClick(index)}
              
            >
              <div className='flex items-center gap-4 '>
                <span className='text-t_lime-400'>{selectedBlock === index ? <MdCheckCircle /> :<MdOutlineCircle/> }</span>
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
                  <div className='my-2 text-t_lime-500'>基本功能</div>
                  
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
                    <div className='my-2 text-t_lime-500'>進階功能</div>
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
                  <div className='my-2 text-t_lime-500'>每日算圖限制</div>
                  <div>
                    {block.daily_limit}
                  </div>
                  <div className='my-2 text-t_lime-500'>藝廊儲存量</div>
                  <div>
                    {block.storage}
                  </div>
                  <div className='mt-5 mb-2 flex flex-col'>
                    {block.payment_line || block.payment_blue ?
                      <div>
                        {
                          block.payment_line && <div>
                            <Button 
                              className="w-full flex  justify-center items-center gap-2 bg-t_lime-600 rounded-full py-3  text-center text-white text-sm"
                              onClick={()=>{
                                handlePay('linepay')
                                setCurrentPlan(block.full_title)
                                setSelectPlanId(block.plan_id)
                                setSelectPayment('linepay')
                              }}
                            >
                              <MdCreditCard size={20} />  Line pay <MdArrowRightAlt />
                              {isLoadingReq && <div className='text-xs'>等待回應...</div>}
                              
                            </Button>
                            
                            
                          </div>
                        }
                        {
                          block.payment_blue && <div>
                            <Button 
                              className="w-full flex  justify-center items-center gap-2 bg-blue-600 rounded-full py-3 mt-3  text-center text-white text-sm"
                              onClick={()=>{
                                handlePay('bluepay')
                                setCurrentPlan(block.full_title)
                                setSelectPlanId(block.plan_id)
                                setSelectPayment('bluepay')}
                              }
                            >
                              <MdCreditCard size={20} />  藍新支付 <MdArrowRightAlt />
                              {isLoadingBlueReq && <div className='text-xs'>等待回應...</div>}
                            </Button>
                          
                          </div>
                        }
                          <div className='text-sm text-center text-yellow-500 mt-2'>
                            {isNeedLogin&&  <div className=''>尚未登入會員，無法執行。</div>}
                            {isReqError && <div className=''>錯誤，需重新登入再試。</div>}
                            {isNeddWithin5Days &&   <div className=''>進階功能使用期限未到期，無法續購。</div>}
                            {isCheckAccount &&<div>檢查帳號資料..</div>}
                            {isNeedEmail &&<div>確認購買前需要的必要資料</div>}
                            {isSuccessSaveEmail && <div>填寫資料儲存成功。</div>}
                            {isReadyToPayPage && <div>檢查完成，準備跳轉頁面..</div>}
                          </div>

                      </div>
                      :
                      <div></div>
                    }
                    {
                      block.invite_input && <div>
                        <div className='text-xs text-white/70 my-2'>開通推薦序號：每人可使用一次他人的推薦序號，並擁有一個自己的推薦序號。需入序號後，將可獲得進階功能 5 天，透過分享推薦序號也可以獲得回饋 5 天</div>
                        <div className='text-xs text-white/70 my-2'>推薦序號使用方式：每人的推薦序號能提供給五位不同使用者，僅有五次，用完不補。當對方使用你的推薦序號後，你與對方的進階帳號使用天數會自動 +5 天。</div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div className='flex flex-col gap-2'>
                            <div className='flex flex-col'>
                              <input  type="text" placeholder="輸入推薦序號" className='bg-gray-700 rounded-full py-3 px-2 text-sm' {...register("invite_number", { required: true })}/>
                              {errors.invite_number && <div className='text-xs text-white/70 my-2'>請確認有輸入推薦序號。</div>}

                            </div>
                            <Button type="submit"    
                              className="w-full flex  justify-center items-center gap-2 bg-t_lime-600  rounded-full py-3  text-center text-white text-sm"
                            >
                              輸入推薦序號
                              <MdOutlineTrendingFlat className='ml-2'/>
                              {isInviteLoadingReq&& <div className='text-xs'>等待回應...</div>}
                            </Button>
                            <div className='text-center text-yellow-500'>
                             
                              {isInviteSuccess&& <div className='text-xs'>完成，體驗天數已成功增加。</div>}
                              {isAlreadyUsed&& <div className='text-xs'>已經輸入過序號了，只能開通一次。</div>}
                              {isYourself&& <div className='text-xs'>不可以使用自己的序號。</div>}
                              {isLimits&& <div className='text-xs'>這個序號已經到達使用次數。</div>}
                              {inviteSubmitMsg.length > 0 && <div className='text-xs'>{inviteSubmitMsg}</div>} 
                            </div>
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
      <div className='max-w-md mx-auto mb-14 px-10 hidden'>
        <h1 className="text-4xl text-center mb-6 font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-t_lime-300 to-t_lime-600">常見問答</h1>
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
            免費會員可以無限使用基本功能，但您可以透過輸入推薦序號獲得進階會員功能。
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
    </div>
  )
}

export default Index