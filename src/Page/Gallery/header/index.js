import React,{useState} from 'react'
import { Link } from "react-router-dom";
import liff from '@line/liff';
import { useNavigate } from 'react-router-dom';
import { FaBars,FaTimes } from "react-icons/fa";
import { MdHomeFilled,MdDashboard,MdLogin, MdAssignmentInd } from "react-icons/md";
import {  useRecoilValue ,useRecoilState } from 'recoil';
import {userState} from '../atoms/galleryAtom'
function Index({isLoggedIn}) {
  const currentUser = useRecoilValue(userState)
  const [isOpen, setIsOpen] = useState(false);
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
    <div className='text-white lg:border-b border-[#3c4756] p-5 w-full  bg-black/0 z-50 flex flex-row flex-wrap 
   justify-between '>
      <div className='  items-center  text-white mr-6 gap-2 hidden lg:flex'>
          <div className='text-3xl font-black w-20 lg:w-32'>
            <img src={process.env.PUBLIC_URL+'/images/ver2_images/mslogo.svg'} alt="" className='w-full'/>
          </div>
          <div className='lg:text-xl'>Gallery</div>
      </div>
      <div className={`grow lg:grow-0 lg:flex lg:items-center hidden lg:block`}>
        
        <div className='flex gap-5 items-center  my-5 md:my-0 '>
          <Link to='/profile' className=' cursor-pointer px-5 py-2 rounded-md hover:bg-gray-600'>Profile </Link>
          <Link to='/gallery' className=' cursor-pointer px-5 py-2 rounded-md hover:bg-gray-600'>Gallery</Link>
          <div className='bg-white/30 w-[1px] h-full'></div>
          {
            isLoggedIn ?
            <div className=' cursor-pointer px-5 py-2 rounded-md hover:bg-gray-600' onClick={handleLogout}>Log Out</div>
            :
            <Link to='/profile' className=' cursor-pointer px-5 py-2 rounded-md hover:bg-gray-600'>Log in</Link>
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
            {
              isLoggedIn ?
              <div className='mt-72 p-2 cursor-pointer rounded-md hover:bg-gray-600 flex items-center gap-3' onClick={handleLogout}>Log Out</div>
              :
              <Link to='/profile' className='mt-72 p-2 cursor-pointer rounded-md hover:bg-gray-600 flex items-center gap-3'><MdLogin color="#88ad48"/>Log in</Link>
            }
          </div>


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
      

    </div>
  )
}

export default Index