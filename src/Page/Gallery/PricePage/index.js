import React, { useState, useEffect } from 'react';
import {motion,AnimatePresence} from 'framer-motion'
import Header from '../header'
import {LoadingCircle,DisableBuyButton,DisableInputInvite} from '../helpers/componentsHelper'
import {  useRecoilValue ,useRecoilState } from 'recoil';
import { isLoginState,loginState,lineProfileState,userState} from '../atoms/galleryAtom';
import {getStoredLocalData,refreshToken,fetchLinePayRequest,testLinePay} from '../helpers/fetchHelper'
import { MdDoneOutline,MdDone,MdOutlineTrendingFlat,MdPayment,MdCreditCard,MdOutlineCircle,MdCheckCircle,MdArrowRightAlt } from "react-icons/md";
import { useForm,Controller } from 'react-hook-form';
import Footer from '../../Home/Footer';
import { HmacSHA256 } from 'crypto-js';
import { Base64 } from 'js-base64';
function Index() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginState);
  const [lineProfile, setLineProfile] = useRecoilState(lineProfileState);
  const [linLoginData, setLineLoginData] = useRecoilState(loginState)
  const [currentUser, setCurrentUser] = useRecoilState(userState)

  const [isLoadingReq, setIsLoadingReq] = useState(false);
  const [isReqError, setReqError] = useState(false);
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
    console.log(data)
  }

  //按下按鈕錢 先驗證是否已登入，要求登入
  const testpay =()=>{
    setIsLoadingReq(true);
    setReqError(false)
      testLinePay(linLoginData).then(data=>{
        //payment_url
        //transaction_id
        setIsLoadingReq(false)
        setReqError(false)
        const url = data.payment_url
        console.log(data)
        if(data.payment_url === undefined){
          setReqError(true)
          return
        }
        window.location.href = url;

        // console.log(data)
    }).catch(e=>{
      setIsLoadingReq(false);
      setReqError(true)
      console.log(e)
    })
  }
  const [selectedBlock, setSelectedBlock] = useState(0);
  const handleBlockClick = (blockIndex) => {
    setSelectedBlock(blockIndex);
  };
  const blocks = [
    { title: '免費方案',price:'Free',days:'',basic:['插畫 CT','寫實 PR','漫畫 CM','寫實人像 PC','翻譯 TL','參考 R','直 V','橫 H'],advanced:[],daily_limit:'一天 10 次 (30 張)',storage:'10張', bgColor: 'white',payment_blue:false,payment_line:false },
    { title: '透過邀請碼開通',price:'Free', days:'5', basic:['插畫 CT','寫實 PR','漫畫 CM','寫實人像 PC','翻譯 TL','參考 R','直 V','橫 H'],advanced:['修改 I','固定 O','骨架 P','放大'],daily_limit:'不限次數',storage:'300張' ,payment_blue:false,payment_line:false},
    { title: '標準方案',price:'TWD90元', days:'30',basic:['插畫 CT','寫實 PR','漫畫 CM','寫實人像 PC','翻譯 TL','參考 R','直 V','橫 H'],advanced:['修改 I','固定 O','骨架 P','放大'],daily_limit:'不限次數',storage:'300張',payment_blue:true ,payment_line:true},
  ];

  useEffect(()=>{
    getStoredLocalData().then(data=>{
        setIsLoggedIn(data.isLogin)
        setLineLoginData(data.loginToken)
        setLineProfile(data.lineProfile)
        setCurrentUser(data.currentUser)
        let headers = {'Content-Type': 'application/json'} 
        
      })
  },[setIsLoggedIn,setLineLoginData,setLineProfile])
  return (
    <div>
      <Header currentUser={currentUser} isLoggedIn={isLoggedIn}/>
      <main className="max-w-6xl mx-auto pt-10 pb-10 px-8">
  
        <div className="max-w-md mx-auto mb-14 text-center">
          <h1 className="text-4xl mb-6 font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-lime-300 to-lime-600">恣意想、任意玩</h1>
          <p className="text-lg text-gray-300 font-medium">進階功能無限使用<br /> 加速算圖以及更多的儲存空間！</p>
          <div className='text-white '>
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
                <div className='flex justify-between w-full'>
                  <div className={'text-lg font-bold  text-white'}>{block.title}</div>
                  <div className={'text-sm   text-white'}>{block.price} {block.days.length>0 ? <span className=''> / {block.days}天</span>  : '' }</div>
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
                  
                  <ul className=' list-disc pl-4'>
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
                    <ul className=' list-disc pl-4'>
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
                                        onClick={testpay}
                                      >
                                        <MdCreditCard size={20} />  Line pay <MdArrowRightAlt />
                                        {isLoadingReq && <div className='text-xs'>等待回應...</div>}
                                        {isReqError && <div className='text-xs'>請求錯誤</div>}
                                      </button>
                      </div>
                    }
                  </div>

                </motion.div>
              )}
              </AnimatePresence>
            </motion.div>
          )})}
        </div>
        <div className="flex flex-col justify-between items-center lg:flex-row lg:items-start gap-6 hidden">
          
          <div className="w-full flex-1 p-8  shadow-xl rounded-3xl bg-zinc-900 text-gray-400 sm:w-96 lg:w-full  lg:mt-0 ">
            <div className="mb-7 pb-7 flex justify-between  items-center border-b border-gray-300">
              <img src={process.env.PUBLIC_URL+'/images/price/01.jpg'}  alt="" className="rounded-3xl w-20 h-20" />
              <div className="-5">
                <span className="block text-2xl font-semibold text-white text-right">免費開通</span>
                <div className='flex flex-col  items-end mt-1'>
                  <div> <span className="text-4xl font-bold text-white"> 5 day</span></div>
                </div>
              </div>
            </div>
            <div>
              {/* form start */}
              <DisableInputInvite />

            </div>
            


          </div>
          
          <div className="w-full flex-1 p-8  shadow-xl rounded-3xl bg-zinc-800 text-gray-400 sm:w-96 lg:w-full  lg:mt-0">
            <div className="mb-8 pb-8 flex justify-between items-center border-b border-gray-600">
              <img src={process.env.PUBLIC_URL+'/images/price/02.jpg'}  alt="" className="rounded-3xl w-20 h-20" />
              <div className="-5">
                <span className="block text-2xl font-semibold text-white text-right">單月體驗</span>
                <div className='flex flex-col  items-end mt-1'>
                  <div> <span className="font-medium text-xl align-top">NTD$&thinsp;</span><span className="text-4xl font-bold text-white"> 90</span></div>
                  <div className="font-medium mt-1">30 Day</div>
                </div>
              </div>
            </div>
            {/* buy button */}
            <DisableBuyButton />
            {/* <button 
              onClick={handlePayment}
              className="flex justify-center items-center bg-gradient-to-r from-lime-700 to-lime-600 rounded-xl py-5 px-4 text-center text-white text-xl">
              訂購(test)
              <MdOutlineTrendingFlat className='ml-2'/>
            </button> */}
          </div>
          
          {/* <div className="w-full flex-1 p-8  shadow-xl rounded-3xl bg-zinc-900 text-gray-400 sm:w-96 lg:w-full  lg:mt-0">
            <div className="mb-7 pb-7 flex justify-between items-center border-b border-gray-300">
              <img src={process.env.PUBLIC_URL+'/images/price/03.jpg'}  alt="" className="rounded-3xl w-20 h-20" />
              <div className="-5">
                <span className="block text-2xl font-semibold text-white text-right">超值方案</span>
                <div className='flex flex-col  items-end mt-1'>
                  <div> <span className="font-medium text-xl align-top">NTD$&thinsp;</span><span className="text-4xl font-bold text-white"> 300</span></div>
                  <div className="font-medium mt-1">180 Day</div>
                </div>
              </div>
            </div>
            buy button 
            <DisableBuyButton />
          </div> */}
          
        </div>
        
      </main>
      <div className='max-w-md mx-auto mb-14 px-10'>
        <h1 className="text-4xl text-center mb-6 font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-lime-300 to-lime-600">常見問答</h1>
        <div className='my-6 flex flex-col gap-8'>
          <div className='text-white'>
            <div className='text-2xl my-3'>進階功能有哪些?</div>
            <div>
              <ul>
                <li>修改 (I) 能夠使用遮罩畫出想要重繪的部分。</li>
                <li>固定 (O) 能夠使用遮罩來畫出不想被重繪的部分。</li>
                <li>骨架 (P) 能夠抓取參考圖中的人物骨架生成圖片。</li>
                <li>放大 (ext) 能將圖片放大兩倍。</li>
              </ul>
            </div>
          </div> 
          <div className='text-white'>
            <div className='text-2xl my-3'>不購買可以使用進階功能嗎? </div>
            <div>
            不購買也可以使用進階功能，每人每天會有 5次 使用的機會。並無特別限制這5次只能用於那些功能，可隨意使用。
            </div>
          </div>                 



        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Index