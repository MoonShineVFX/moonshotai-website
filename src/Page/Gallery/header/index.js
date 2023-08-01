import React,{useState,useEffect} from 'react'
import { Link } from "react-router-dom";
import liff from '@line/liff';
import { useNavigate } from 'react-router-dom';
import { FaBars,FaTimes } from "react-icons/fa";
import { MdHome,MdHomeFilled,MdDashboard,MdLogin, MdAssignmentInd,MdStar,MdDocumentScanner,MdAssignment,MdViewModule,MdAccountBox } from "react-icons/md";
import {  useRecoilValue ,useRecoilState } from 'recoil';
import {userState,isLoginState,lineProfileState,loginState} from '../atoms/galleryAtom'
import {Logout,removeLocalStorageItem,fetchLineLogin,fetchUserProfile,getStoredLocalData,handleLogin} from '../helpers/fetchHelper'
import { useQuery, useQueryClient } from 'react-query';
const liffID = process.env.REACT_APP_LIFF_LOGIN_ID

function Index({}) {

  //CHECK IS USER LOGIN DATABASE
  const [currentUser, setCurrentUser] = useRecoilState(userState)
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginState);
  // const [linLoginToken, setLineLoginToken] = useRecoilState(loginState)
  const [lineProfile, setLineProfile] = useRecoilState(lineProfileState);
  const isLogin = useRecoilValue(isLoginState)
  const [token, setToken] = useRecoilState(loginState)
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessLogout, setIsProcessLogout] = useState(false);
  const [isLiffInitialized, setIsLiffInitialized] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async()=>{
    if (!isProcessLogout) {
      setIsProcessLogout(true);
      if (!isLiffInitialized) {
        try{
          await liff.init({liffId: liffID}) 
          setIsLiffInitialized(true);
        }catch (error) {
          console.error('Error initializing LIFF: ', error.message);
          setIsProcessLogout(false);
          return;
        }
      }
      if(liff.isLoggedIn()){
          console.log('init完成可處理登出')
          setIsProcessLogout(true)
          setLineProfile(null);
          setToken(null);
          liff.logout();
          removeLocalStorageItem().then(data=>{
            console.log(data)
            if(data === 'finish'){
              setTimeout(()=>{
                if (window.location.pathname === '/gallery') {
                  window.location.reload();
                } else {
                  navigate('/gallery');
                }
              },2000)
            }
          }).catch(()=>{
            console.log('error')
          })
        
      }else{
        setTimeout(()=>{
          setIsProcessLogout(true)
          setLineProfile(null);
          setToken(null);
          removeLocalStorageItem().then(data=>{
            console.log(data)
            if(data === 'finish'){
              if (window.location.pathname === '/gallery') {
                window.location.reload();
              } else {
                navigate('/gallery');
              }
            }
          }).catch(()=>{
            console.log('error')
          })
        },500)
      }
      
    }        
 

  }

  //針對頭像檢查
  const checkUserForHeader = async()=>{
    const storedLoginTokenData = localStorage.getItem('loginTokenData');
    if(storedLoginTokenData){
      try{
        const userLoginData = JSON.parse(storedLoginTokenData)
        const udata = await fetchUserProfile(userLoginData.user_id, userLoginData.token);
        if(udata === 401){
          setCurrentUser({})
        } else{
          setCurrentUser(udata)
        }

      } catch (error){
        console.error('Error initializing LIFF: ', error.message);
      }
    } else {
        // 未找到登入資訊，執行其他操作或導向登入頁面
    }
  }
  const [isCheckUserLoginExecuted, setIsCheckUserLoginExecuted] = useState(false);
  const queryClient = useQueryClient();
  const checkUserLogin = async () => {
    if (isCheckUserLoginExecuted) {
      return;
    }
    setIsCheckUserLoginExecuted(true);
    const storedLoginTokenData = localStorage.getItem('loginTokenData');
    if (storedLoginTokenData) {
      try {
        const userLoginData = JSON.parse(storedLoginTokenData);
        // 使用 react-query 來執行 fetchUserProfile API
        const udata = await queryClient.fetchQuery(['userProfile', userLoginData.user_id, userLoginData.token], () =>
          fetchUserProfile(userLoginData.user_id, userLoginData.token)
        );

        // 其他邏輯...
        setCurrentUser(udata);
      } catch (error) {
        console.error('Error initializing LIFF: ', error.message);
      }
    } else {
      // 未找到登入資訊，執行其他操作或導向登入頁面
      await liff.init({ liffId: liffID });
      console.log(liff.isLoggedIn());
      if (!liff.isLoggedIn()) {
        return;
      }
      const accessToken = liff.getAccessToken();
      if (accessToken) {
        const profile = await liff.getProfile();
        localStorage.setItem('lineProfile', JSON.stringify(profile));
        const lined = await fetchLineLogin(profile);
        localStorage.setItem('loginTokenData', JSON.stringify(lined));

        // 使用 react-query 來執行 fetchUserProfile API
        const udata = await queryClient.fetchQuery(['userProfile', lined.user_id, lined.token], () =>
          fetchUserProfile(lined.user_id, lined.token)
        );
        localStorage.setItem('currentUser', JSON.stringify(udata));
        localStorage.setItem('isLogin', true);
        setIsLoggedIn(true)
        setCurrentUser(udata);

        // 其他邏輯...
        // setCurrentUser(udata);
      }
    }
  };
  
  useEffect(()=>{
    checkUserLogin()

  },[queryClient])
  
  return (
    <div className='  top-0 text-white lg:border-b border-[#3c4756] p-3 w-full  bg-white/10 z-50 flex flex-row flex-wrap 
   justify-between '>
      <div className=' items-center  text-white mr-6 gap-2 pt-1 flex lg:flex'>
          <a href='/' className='font-black w-24 lg:w-32'>
            <img src={process.env.PUBLIC_URL+'/images/ver2_images/mslogo.svg'} alt="" className='w-full'/>
          </a>
          <div className='lg:text-xl'></div>
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
      <div className={`grow lg:grow-0 lg:flex lg:items-center hidden `}>
        
        <div className='flex gap-5 items-center  my-5 md:my-0 '>
          <Link to='/gallery' className=' cursor-pointer px-5 py-2 rounded-md hover:bg-gray-600' >Gallery</Link>
          <Link to='/price' className=' cursor-pointer px-5 py-2 rounded-md hover:bg-gray-600'>Price</Link>

          <div className='bg-white/30 w-[1px] h-full'></div>
          {
            isLoggedIn ?
            <div className='flex items-center flex-col md:flex-row '>
                <Link to='/profile'  className='flex items-center gap-2' onClick={() => setIsOpen(!isOpen)}>
                  <div className='w-12'>
                    <div className='pt-[100%] relative'>
                      <img src={currentUser?.profile_image} alt="" className='absolute top-1/2 left-0 -translate-y-1/2 object-cover w-full h-fulls rounded-full border border-zinc-400 aspect-square'/>
                    </div>
                  </div>
                  <div>{currentUser?.name}</div>
                </Link>
            </div>
            
            :
            <div onClick={() => {handleLogin()}}   className=' cursor-pointer px-5 py-2 rounded-md hover:bg-gray-600'>Sign in</div>
          }
          <div className="block  ml-auto">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
              >
                <div className={`fill-current h-3 w-3 ${isOpen ? "hidden" : "block"}`}><FaBars /></div>
                <div className={`fill-current h-3 w-3 ${isOpen ? "block" : "hidden"}`}><FaTimes /></div>
                
              </button>
          </div>
 
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
          <div className='my-7 flex flex-col text-white/90 justify-between '>
            { 
              isLoggedIn ?
              <div className='border-b border-white/20 text-sm '>
                <Link to='/profile'  className='flex items-center gap-2'  onClick={() => setIsOpen(!isOpen)}>
                  <div className='w-12'>
                    <div className='pt-[100%] relative'>
                      <img src={currentUser?.profile_image} alt="" className='absolute top-1/2 left-0 -translate-y-1/2 object-cover w-full h-fulls rounded-full border border-zinc-400 aspect-square'/>
                    </div>
                  </div>
                  <div>{currentUser?.name}</div>
                </Link>

                <div className=' rounded-md hover:bg-gray-600' onClick={handleLogout}>
                  <button className='my-4 py-1  border border-zinc-500 rounded-md w-full'> Sign Out</button>
                </div>
              </div>
              :
              <div className='border-b border-white/20 py-4'>
                <div 
                  className='px-2 py-2 cursor-pointer  rounded-md hover:bg-gray-600 flex items-center gap-3' 
                  onClick={() => {
                    handleLogin()
                    setIsOpen(!isOpen)
                    }}><MdLogin color="#88ad48"/>Sign in to</div>
              </div>
            }
            <div className='my-3 '>
              <Link 
                to='/' 
                className='p-2 cursor-pointer  hover:bg-gray-600 flex items-center gap-3 '
                onClick={()=>setIsOpen(false)}
                
              >
                <MdHome color="#88ad48" size={20}/>  Home  
              </Link>

              <Link 
                to='/gallery' 
                onClick={()=>setIsOpen(false)}
                className='p-2 cursor-pointer rounded-md hover:bg-gray-600 flex items-center gap-3'>
                  <MdDashboard color="#88ad48" size={20}/> Gallery
              </Link>
              <Link 
                to='/price' 
                onClick={()=>setIsOpen(false)}
                className='p-2 cursor-pointer rounded-md hover:bg-gray-600 flex items-center gap-3'>
                  <MdStar color="#88ad48" size={20}/> Price
              </Link>

              <Link 
                to='/docs' 
                onClick={()=>setIsOpen(false)}
                className='p-2 cursor-pointer rounded-md hover:bg-gray-600 flex items-center gap-3'>
                  <MdDocumentScanner color="#88ad48" size={20}/> Documents
              </Link>

            </div>

            <div className='my-3 '>
              <Link 
                to='/profile' 
                onClick={()=>setIsOpen(false)}
                className='p-2 cursor-pointer rounded-md hover:bg-gray-600 flex items-center gap-3'>
                  <MdViewModule color="#88ad48" size={20}/> Profile 
              </Link>
              {
              isLoggedIn &&
              <>
                <Link 
                  to='/account' 
                  onClick={()=>setIsOpen(false)}
                  className='p-2 cursor-pointer rounded-md hover:bg-gray-600 flex items-center gap-3'>
                    <MdAccountBox color="#88ad48" size={20}/> Account 
                </Link>
                <Link 
                  to='/orders' 
                  onClick={()=>setIsOpen(false)}
                  className='p-2 cursor-pointer rounded-md hover:bg-gray-600 flex items-center gap-3'>
                    <MdAssignment color="#88ad48" size={20}/> Orders
                </Link>
              </>
              }
            </div>




          </div>


      </div>

      

    </div>
  )
}

export default Index