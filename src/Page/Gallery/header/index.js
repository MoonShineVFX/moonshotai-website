import React from 'react'
import { Link } from "react-router-dom";
import liff from '@line/liff';
import { useNavigate } from 'react-router-dom';
function index({isLoggedIn}) {
  const navigate = useNavigate();
  const handleLogout = async()=>{
      try {
        await liff.init({ liffId: process.env.REACT_APP_LIFF_LOGIN_ID });
        if (liff.isLoggedIn()) {
          await liff.logout();
        }
        navigate('/');
      } catch (err) {
        console.log('登出失敗');
      }
  }
  return (
    <div className='text-white border-b border-white/10 p-5 w-full  bg-black/0 z-50'>
      <div className='flex justify-between flex-col md:flex-row'>
        <div className='flex items-center gap-2 mx-auto md:mx-0'>
            <div className='text-3xl font-black w-32'>
              <img src={process.env.PUBLIC_URL+'/images/ver2_images/mslogo.svg'} alt="" className='w-full'/>
            </div>
            <div className='text-xl'>Gallery</div>
        </div>
        <div className='flex gap-5 items-center mx-auto my-5 md:my-0 md:mx-0'>
          <Link to='/app' className=' cursor-pointer px-5 py-2 rounded-md hover:bg-gray-600'>Home </Link>
          <Link to='/gallery' className=' cursor-pointer px-5 py-2 rounded-md hover:bg-gray-600'>Gallery</Link>
          <div className='bg-white/30 w-[1px] h-full'></div>
          {
            isLoggedIn ?
            <div className=' cursor-pointer px-5 py-2 rounded-md hover:bg-gray-600' onClick={handleLogout}>Log Out</div>
            :
            <Link to='/app' className=' cursor-pointer px-5 py-2 rounded-md hover:bg-gray-600'>Log in</Link>
          }
 
        </div>
      </div>

    </div>
  )
}

export default index