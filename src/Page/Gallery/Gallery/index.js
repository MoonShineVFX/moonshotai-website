import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Header from '../header'
import {initializeLineLogin,useDevUserLogin,fetchGalleries} from '../helpers/fetchHelper'
import {  useRecoilValue ,useRecoilState } from 'recoil';
import { loginState} from '../atoms/galleryAtom';

function Index() {
  const [devLogin,isLogin,token] = useDevUserLogin();
  const [data, setData] = useState(null)

  useEffect(()=>{
    fetchGalleries().then(data=>setData(data.results))

  },[])
  console.log(data)
  return (
    <div className='w-full'>
      <Header />
      <div className='w-10/12 mx-auto my-10'>
       
        {data &&

          (
            
            <div>1</div>
          )
        }
       
      </div>


    </div>
  )
}

export default Index