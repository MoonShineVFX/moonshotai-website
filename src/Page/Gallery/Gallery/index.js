import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Header from '../header'
import {initializeLineLogin,useDevUserLogin,fetchGalleries} from '../helpers/fetchHelper'
import {  useRecoilValue ,useRecoilState } from 'recoil';
import { loginState} from '../atoms/galleryAtom';

function Index() {
  const [devLogin,isLogin,token] = useDevUserLogin();


  useEffect(()=>{
    
  })

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      // initializeLineLogin()
    }else{
      // devLogin()
    }
  }, [process.env.NODE_ENV]);
  return (
    <div className='w-full'>
      <Header />
      <div className='w-10/12 mx-auto my-10'>
       
        <div className='text-white'>
          Here is Gallery HomePage, nothing yet. You can <Link to='/profile' className='text-blue-400 hover:text-blue-300'>Login with Line Account</Link> 
        </div>
       
      </div>


    </div>
  )
}

export default Index