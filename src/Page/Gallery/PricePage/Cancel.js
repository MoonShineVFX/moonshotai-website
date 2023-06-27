import React,{useState,useEffect} from 'react'
import { useParams,useNavigate,Link } from 'react-router-dom';
import {motion,AnimatePresence} from 'framer-motion'
import { useRecoilValue, useRecoilState } from 'recoil';
import { loginState,isLoginState,lineProfileState,userState,imageDataState } from '../atoms/galleryAtom';


function Cancel() {
  const { id } = useParams();
  const [imageData, setImageData] = useRecoilState(imageDataState)
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginState);
  const [lineProfile, setLineProfile] = useRecoilState(lineProfileState);
  const [linLoginData, setLineLoginData] = useRecoilState(loginState)
  const [currentUser, setCurrentUser] = useRecoilState(userState)
  return (
    <div>
      <Header currentUser={currentUser} isLoggedIn={isLoggedIn}/>
      <div className='flex flex-col relative text-white mx-5 mt-10'>
        取得的訂單{id}
      </div>
    </div>
  )
}

export default Cancel