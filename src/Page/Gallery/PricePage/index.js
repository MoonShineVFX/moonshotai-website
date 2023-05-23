import React, { useState, useEffect } from 'react';
import {motion,AnimatePresence} from 'framer-motion'
import Header from '../header'
import {LoadingCircle,DisableBuyButton,DisableInputInvite} from '../helpers/componentsHelper'
import {  useRecoilValue ,useRecoilState } from 'recoil';
import { isLoginState,loginState,lineProfileState,userState} from '../atoms/galleryAtom';
import {getStoredLocalData,refreshToken} from '../helpers/fetchHelper'
import { MdDoneOutline,MdDone,MdOutlineTrendingFlat } from "react-icons/md";
import { useForm,Controller } from 'react-hook-form';
function Index() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginState);
  const [lineProfile, setLineProfile] = useRecoilState(lineProfileState);
  const [linLoginData, setLineLoginData] = useRecoilState(loginState)
  const [currentUser, setCurrentUser] = useRecoilState(userState)
  const { control,register, handleSubmit, formState: { errors } } = useForm({
    name:''
  });
  const onSubmit = (data) => {
    console.log(data)
  }
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
        
        <div className="flex flex-col justify-between items-center lg:flex-row lg:items-start gap-6">
          
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

            <DisableBuyButton />
          </div>
          
          <div className="w-full flex-1 p-8  shadow-xl rounded-3xl bg-zinc-900 text-gray-400 sm:w-96 lg:w-full  lg:mt-0">
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
            <DisableBuyButton />
          </div>
          
        </div>
        
      </main>
      <div className='max-w-md mx-auto mb-14 px-10'>
        <h1 className="text-4xl text-center mb-6 font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-lime-300 to-lime-600">訂購說明(製作中)</h1>
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
    </div>
  )
}

export default Index