import React,{useState,useEffect} from 'react'
import { useParams,useNavigate,Link } from 'react-router-dom';
import {motion,AnimatePresence} from 'framer-motion'
import { useRecoilValue, useRecoilState } from 'recoil';
import { loginState,isLoginState,lineProfileState,userState,imageDataState } from '../atoms/galleryAtom';
import Header from '../header'

function Cancel() {
  const { id } = useParams();
  const [imageData, setImageData] = useRecoilState(imageDataState)
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginState);
  const [lineProfile, setLineProfile] = useRecoilState(lineProfileState);
  const [linLoginData, setLineLoginData] = useRecoilState(loginState)
  const [currentUser, setCurrentUser] = useRecoilState(userState)
  const navigate = useNavigate();
  return (
    <div>
      <Header currentUser={currentUser} isLoggedIn={isLoggedIn}/>
      <div className='flex flex-col relative text-white mx-5 mt-10 items-center'>
        <div className='w-1/5 mx-auto '>
          <img src={process.env.PUBLIC_URL+'/images/logo.png'} alt="" className=' rounded-full' />
        </div>
        <div className='text-xl font-bold my-4'>感謝！  </div>
        <div className='text-center'>您已經取消訂單。<br /></div>
        
        <div className='text-sm mt-12 mb-2'></div>
        {/* <div className=' text-white/70 my-1 '>訂單號碼:{id}</div> */}
        <button
          className='my-4 p-2 px-4 text-white/90 bg-gray-600 rounded-sm text-sm ' onClick={()=>{
          navigate('/price');}}
        >回到 Price</button>
      </div>
    </div>
  )
}

export default Cancel