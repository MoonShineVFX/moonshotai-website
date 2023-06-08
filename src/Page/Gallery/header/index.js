import React,{useState} from 'react'
import { Link } from "react-router-dom";
import liff from '@line/liff';
import { useNavigate } from 'react-router-dom';
import { FaBars,FaTimes } from "react-icons/fa";
import { MdHomeFilled,MdDashboard,MdLogin, MdAssignmentInd,MdStar } from "react-icons/md";
import {  useRecoilValue ,useRecoilState } from 'recoil';
import {userState,isLoginState,lineProfileState,loginState} from '../atoms/galleryAtom'
import {Logout,removeLocalStorageItem} from '../helpers/fetchHelper'
function Index({currentUser,isLoggedIn}) {
  const isLogin = useRecoilValue(isLoginState)
  // const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginState);
  const [lineProfile, setLineProfile] = useRecoilState(lineProfileState);
  const [token, setToken] = useRecoilState(loginState)
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async()=>{
      try {
        await liff.init({ liffId: process.env.REACT_APP_LIFF_LOGIN_ID });
        if (liff.isLoggedIn()) {
          await liff.logout();
        }
        // setIsLoggedIn(false);
        setLineProfile(null);
        setToken(null);
        console.log('logouting')
        removeLocalStorageItem().then(data=>{
          console.log(data)
          if(data === 'finish'){
            if (window.location.pathname === '/gallery') {
              window.location.reload();
            } else {
              navigate('/gallery');
            }
          }
        })
      } catch (err) {
        console.log('登出失敗');
      }
  }
  return (
    <div className='  top-0 text-white lg:border-b border-[#3c4756] p-5 w-full  bg-white/10 z-50 flex flex-row flex-wrap 
   justify-between '>
      <div className=' items-center  text-white mr-6 gap-2 pt-1 flex lg:flex'>
          <div className='font-black w-24 lg:w-32'>
            <img src={process.env.PUBLIC_URL+'/images/ver2_images/mslogo.svg'} alt="" className='w-full'/>
          </div>
          <div className='lg:text-xl'>Gallery</div>
      </div>
      <div className="block lg:hidden ml-auto">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
          >
            <div className={`fill-current h-3 w-3 ${isOpen ? "hidden" : "block"}`}><FaBars /></div>
            <div className={`fill-current h-3 w-3 ${isOpen ? "block" : "hidden"}`}><FaTimes /></div>
            
          </button>
      </div>
      <div className={`grow lg:grow-0 lg:flex lg:items-center hidden lg:block`}>
        
        <div className='flex gap-5 items-center  my-5 md:my-0 '>
          <Link to='/profile' className=' cursor-pointer px-5 py-2 rounded-md hover:bg-gray-600'>Profile </Link>
          <Link to='/gallery' className=' cursor-pointer px-5 py-2 rounded-md hover:bg-gray-600'>Gallery</Link>
          <Link to='/price' className=' cursor-pointer px-5 py-2 rounded-md hover:bg-gray-600'>Price</Link>
          <div className='bg-white/30 w-[1px] h-full'></div>
          {
            isLoggedIn ?
            <div className='flex items-center flex-col md:flex-row'>
              <div className='w-8'>
                <div className='pt-[100%] relative'>
                  <img src={currentUser?.profile_image} alt="" className='absolute top-1/2 left-0 -translate-y-1/2 object-cover w-full h-fulls rounded-full border border-zinc-400'/>
                </div>
              </div>
              <div className=' cursor-pointer px-5 py-2 rounded-md hover:bg-gray-600' onClick={handleLogout}>Sign Out</div>
            </div>
            
            :
            <Link to='/profile' className=' cursor-pointer px-5 py-2 rounded-md hover:bg-gray-600'>Sign in</Link>
          }
 
        </div>
      </div>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-black/60 fixed w-full h-screen top-0 left-0 ease-in-out transition-all duration-300 z-20 ${isOpen ? ' opacity-100' : 'hidden opacity-0'}`}>
      </div>
      <div className={`bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#49531F] via-black  to-black-600 transform top-0 left-0 w-64 bg-[#333] fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 flex flex-col p-8 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className='flex items-center  text-white mr-6 gap-2 '>
              <div className='text-3xl font-black  lg:w-32'>
                <img src={process.env.PUBLIC_URL+'/images/ver2_images/mslogo.svg'} alt="" className='w-full'/>
              </div>
              <div className='lg:text-xl'>Gallery</div>
          </div>
          <div className='my-7 flex flex-col text-white/90 justify-between'>
            { 
              isLoggedIn ?
              <div className='border-b border-white/20'>
                <div className='flex items-center gap-2'>
                  <div className='w-8'>
                    <div className='pt-[100%] relative'>
                      <img src={currentUser?.profile_image} alt="" className='absolute top-1/2 left-0 -translate-y-1/2 object-cover w-full h-fulls rounded-full border border-zinc-400'/>
                    </div>
                  </div>
                  <div>{currentUser?.name}</div>
                </div>

                <div className=' rounded-md hover:bg-gray-600' onClick={handleLogout}>
                  <button className='my-4 py-1  border rounded-md w-full'> Sign Out</button>
                </div>
              </div>
              :
              <div className='border-b border-white/20 py-4'>
                <Link to='/profile' className='px-2 py-2 cursor-pointer  rounded-md hover:bg-gray-600 flex items-center gap-3'><MdLogin color="#88ad48"/>Sign in</Link>
              </div>
            }
            <div className='my-3'>
              <Link 
                to='/profile' 
                className='p-2 cursor-pointer rounded-md hover:bg-gray-600 flex items-center gap-3'>
                  <MdAssignmentInd color="#88ad48"/> Profile 
              </Link>
              <Link 
                to='/gallery' 
                className='p-2 cursor-pointer rounded-md hover:bg-gray-600 flex items-center gap-3'>
                  <MdDashboard color="#88ad48"/> Gallery
              </Link>
              <Link 
                to='/price' 
                className='p-2 cursor-pointer rounded-md hover:bg-gray-600 flex items-center gap-3'>
                  <MdStar color="#88ad48"/> Price
              </Link>
            </div>


          </div>


      </div>

      

    </div>
  )
}

export default Index