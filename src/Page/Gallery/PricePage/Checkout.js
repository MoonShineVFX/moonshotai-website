import React, { useState, useEffect } from 'react';
import Header from '../header'
import {  useRecoilValue ,useRecoilState } from 'recoil';
import { isLoginState,loginState,lineProfileState,userState} from '../atoms/galleryAtom';
function Checkout() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginState);
  const [lineProfile, setLineProfile] = useRecoilState(lineProfileState);
  const [linLoginData, setLineLoginData] = useRecoilState(loginState)
  const [currentUser, setCurrentUser] = useRecoilState(userState)
  return (
    <div>
      <Header currentUser={currentUser} isLoggedIn={isLoggedIn}/>
      <div className='max-w-6xl mx-auto pt-10 pb-10 px-8 text-white'>
        <div className='text-base'>
          <div>訂單頁面 </div>
          <div>Checkout</div>
        </div>
        <div className=' border-t my-4 border-white/50'></div>
        <div className='mt-2'>
          購買的產品
          <div className='mt-2'>
            <div className='text-xl'>Moonshot 30 day </div>
            <div className='text-sm text-white/90'>購買後可使用日期至 2023/03/02</div>
            <ul className=' text-white/70 text-sm list-disc pl-3 my-2'>
              <li>修改 (無限制)</li>
              <li>固定 (無限制)</li>
              <li>骨架 (無限制)</li>
              <li>放大 (無限制) (1920)</li>
              <li>加速</li>
              <li>藝廊可儲存的圖 從100 張 提升到 300 張</li>
            </ul>
            <div className='flex justify-between items-center'>
              <div>費用</div>
              <div>新台幣 90 元 </div>
            </div>
          </div>
          <div className=' border-t my-4 border-white/50'></div>
          支付方式(任一)
          <div className='flex flex-col space-y-2 mt-3'>
            <button className='rounded-md bg-lime-500 py-2 '>Line Pay</button>
            <button className='rounded-md bg-blue-500 py-2'>藍新支付(信用卡)</button>
            <div className='text-center'>取消購買</div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Checkout