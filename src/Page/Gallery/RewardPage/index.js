import React, { useState, useEffect } from 'react'
import {motion,AnimatePresence} from 'framer-motion';
import {CallToLoginModal,LoadingLogoSpin} from '../helpers/componentsHelper'

import {  useRecoilValue ,useRecoilState } from 'recoil';
import { isLoginState,loginState,lineProfileState,userState} from '../atoms/galleryAtom';
import {getStoredLocalData,usePointProducts,useRedeemProduct,fetchUserProfileData} from '../helpers/fetchHelper'

import { GiTwoCoins, GiCutDiamond } from "react-icons/gi";
import { getAnalytics, logEvent } from "firebase/analytics";
import {  useQueryClient } from 'react-query';
import ProductList from './ProductList';
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter
} from "@material-tailwind/react";
const menuItems= [
  {id:1, title:'兌換'},
  {id:2, title:'成就'},
]
function Index() {
  const queryClient = useQueryClient();
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [lineProfile, setLineProfile] = useState(null);
  const [linLoginData, setLineLoginData] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [isInitialized, setIsInitialized] = useState(false);
  const [ isLoginForNext , setIsLoginForNext] = useState(false)
  const [selectedItem, setSelectedItem] = useState(menuItems[0]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [buyError, setBuyError] = useState(null);
  const handleOpen = () => setOpen(!open);
  const analytics = getAnalytics();
  useEffect(()=>{
    getStoredLocalData().then(data=>{
        setIsLoggedIn(data.isLogin)
        setLineLoginData(data.loginToken)
        setLineProfile(data.lineProfile)
        setCurrentUser(data.currentUser)
        setIsInitialized(true);
        
      })
  },[setIsLoggedIn,setLineLoginData,setLineProfile])

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    refetch,
  } = usePointProducts(linLoginData,isInitialized,isLoggedIn)


  const handleMenuItemClick = (item) => {
    setSelectedItem(item);
  };
  const redeemProductMutation = useRedeemProduct(linLoginData)
  
  const handleBuyPointProduct = async ()=>{
    logEvent(analytics, 'Rewards頁_禮物卡_按下兌換')
    if(!isLoggedIn){
      //  console.log(isLoggedIn)
      setIsLoginForNext(true)
      }else{
        // console.log(imageData)
        setBuyError(null)
        handleOpen(); 
        setIsLoginForNext(false)
      }
  }
  const onHandleBuyPointProduct = async()=>{
    try {
      await redeemProductMutation.mutateAsync({selectedProduct})
      logEvent(analytics, 'Rewards頁_兌換禮物卡_兌換成功')
      setBuyError(<LoadingLogoSpin /> )
      setTimeout(async()=>{
        setBuyError('訊息：兌換已完成。')
        //update user porfile
        const udata = await fetchUserProfileData(currentUser.id, linLoginData, queryClient);
        console.log(udata)
        localStorage.setItem('currentUser', JSON.stringify(udata));
        setCurrentUser(udata)

        setTimeout( () => {
          setOpen(false); 
          
        }, 1200);
      },1000)
    } catch (error) {
      logEvent(analytics, 'Rewards頁_兌換禮物卡_兌換失敗',{
        msg:error.message 
      })
      setBuyError(<LoadingLogoSpin /> )
      setTimeout(()=>{
          setBuyError('錯誤訊息：兌換失敗。')
      },1000)
    }
  }
  




  
  return (
    <div>
      <AnimatePresence>
        {isLoginForNext && <CallToLoginModal closeModal={()=>setIsLoginForNext(false)}/>}
      </AnimatePresence>
      <Dialog
        open={open}
        size={"xs"}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className='bg-gray-900'
      >
        <DialogHeader className='text-lg text-white/80 p-0'>
          <div className='w-full'>
            <img
              src="https://moonshine.b-cdn.net/msweb/moonshotai/rewards_images/p02.jpeg"
              alt="card-image"
              className='  object-cover  aspect-[4/2.6] '
            />
          </div>
        </DialogHeader>
        <DialogBody className=' text-white '>
          <div className='font-normal text-center'>
            <div className='text-sm '>以點數兌換獎勵</div>
            <div className='text-lg mt-4 mb-4'>{selectedProduct?.name}</div>
            <div className='text-sm'>可獲得 {selectedProduct?.subscription_days} 天進階會員</div>
            <div className='text-sm'>需支付 {selectedProduct?.point} 點數</div>
            <div className='text-sm text-amber-500'>
              你可用的點數：{currentUser?.point} Points
            </div>    
          </div>
      
          <div className='text-red-500 text-sm font-semibold text-center mt-5'>{buyError&& buyError}</div>
        </DialogBody>
        <DialogFooter className='border-t border-gray-600'>
          <Button
            variant="text"
            color="white"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>取消</span>
          </Button>
          <Button 
            variant="gradient" 
            color="" 
            onClick={()=>onHandleBuyPointProduct()}>
            <span>確認支付</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <main className="max-w-6xl mx-auto pt-10 pb-10 px-8">
        <div className="max-w-md mx-auto mb-14 text-center">
          <h1 className="text-4xl mb-6 font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-t_lime-300 to-t_lime-600">Moonshot Rewards <br /> 點數獎勵計劃</h1>
        
          <div className='text-white text-xl mb-6 font-semibold'>點一點、多一點</div>
          <Button 
            variant="none" className="rounded-full bg-[#423EF5] text-white font-bold capitalize text-sm "  
            onClick={()=>{
              logEvent(analytics, 'Rewards頁按鈕_點數累積說明_按下')
            }}>
            點數累積說明
          </Button>
        </div>
        {/*  使用者資訊 */}
        <div className='text-white bg-blue-g-200 rounded-md'>
          {
            currentUser ?
            <div className=' rounded-md bg-gray-800 p-4 my-2 flex justify-between items-center' >
              <div className='flex flex-col  gap-2'>
                <div className='text-xl font-semibold'>{currentUser.name }，您好 </div>
              </div>
              <div className='flex flex-col  gap-2 '> 
                <div>可用的點數</div>
                <div className='flex gap-2 items-center'>
                  <GiTwoCoins className='text-yellow-700' size={20} /> <span className='text-sm font-semibold'>{currentUser.point } Points</span>
                </div>
              </div>
            </div>
            :
            <div>
              無法取得使用者資料，請登入。
            </div>
          }
      
        </div>
        {/*  主功能導航 */}
        <div className='text-white text-base flex justify-center gap-3 mt-10'>
          {
            menuItems.map((item,index)=>{
              return(
                <div 
                  className={'pb-2 cursor-pointer '+ (selectedItem?.id === item.id ? ' font-bold text-white border-b ' : 'font-normal text-white/80')}
                  key={item.id} 
                  onClick={() => handleMenuItemClick(item)}>{item.title}</div>
              )
            })
            }
        </div>
        {selectedItem && (
          <div className=''>
            {selectedItem.title === '兌換' && <ProductList data={data} handleBuyPointProduct={handleBuyPointProduct} setSelectedProduct={setSelectedProduct} />  }
          </div>
        )}

      </main>

    </div>
  )
}

export default Index