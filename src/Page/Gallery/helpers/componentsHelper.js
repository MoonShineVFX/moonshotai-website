import { useState,useEffect } from 'react';
import {motion} from 'framer-motion'
import { MdContentCopy } from "react-icons/md";
import { Link,useNavigate } from "react-router-dom";
import { useForm,Controller } from 'react-hook-form';
import { MdDoneOutline,MdDone,MdOutlineTrendingFlat } from "react-icons/md";
import {handleLogin} from './fetchHelper'
export const SharePostModal = ({closeModal})=>{
  const [ isCopied , setIsCopied ] = useState(false);
  const handleClose = ()=>{
    closeModal()
    setIsCopied(false)
  }
  const handleCopyPrompt=()=>{
    const text = window.location.href
    navigator.clipboard.writeText(text);
    setIsCopied(true)
  }
  return (
    <div className=' fixed z-50 top-0 left-0 w-full'>
      <div className='bg-black/50 w-full h-screen' onClick={handleClose}></div>
      <motion.div 
        initial={{ opacity: 0, scale:0 ,x:'-50%'}}
        animate={{ opacity: 1, scale:1 }}
        exit={{ opacity: 0, scale:0 }}
        className='  bg-zinc-800 rounded-md  p-4 box-border border border-white/20 text-white fixed top-1/3 left-1/2 -translate-x-1/2 w-4/5 md:w-auto overflow-y-auto max-h-[85vh]'
      >
        <div className='flex flex-col justify-center items-center'>
          <div className='text-white'>作品頁面網址</div>
          <div className='my-3 relative mx-2  mx-auto'>
            <div className='flex justify-between mb-2'>
            {isCopied && <div className='text-xs text-right'>Copied!</div>}
            <button className='ml-auto' onClick={handleCopyPrompt}><MdContentCopy /></button>
            </div>

            <div className='text-xs p-2 bg-zinc-600 rounded-md  mx-auto'>
              <div className='break-all '>
                {window.location.href}
              </div>

            </div>
          </div>
          <div className='mt-6 flex flex-col gap-3 justify-center text-md'>
            <button type="button" className='text-white/80' onClick={handleClose}>Close</button>
          </div>
        </div>

      </motion.div>
    </div>
  )
}

export const CallToLoginModal = ({closeModal})=>{
  const handleClose = ()=>{
    closeModal()
  }
  return (
    <div className=' fixed z-50 top-0 left-0 w-full'>
      <div className='bg-black/60 w-full h-screen' onClick={handleClose}></div>
      <motion.div 
        initial={{ opacity: 0, scale:0 ,x:'-50%'}}
        animate={{ opacity: 1, scale:1 }}
        exit={{ opacity: 0, scale:0 }}
        className='  bg-zinc-800 rounded-md  p-4 box-border border border-white/20 text-white fixed top-1/3 left-1/2 -translate-x-1/2 w-4/5 overflow-y-auto max-h-[85vh]'
      >
        <div className='flex flex-col justify-center items-center'>
          <div className=' font-bold'>登入通知</div>
          <div className='text-white/70 text-xs mt-1 mb-4'>當您要使用這些功能時，需要登入網站。</div>
          <div className='mt-6 flex flex-col gap-3 justify-center text-md'>
            <div onClick={handleLogin} className=' bg-lime-600 cursor-pointer px-5 py-2 rounded-md hover:bg-gray-600'>現在登入</div>
            <button type="button" className='text-white/50 text-sm' onClick={handleClose}>下次一定</button>
          </div>
        </div>

      </motion.div>
    </div>
  )
}


export const TestImageModal=()=>{
  return (
    <div className=" fixed top-0 left-0 lg:right-0 lg:bottom-0 flex z-50 bg-zinc-800 h-screen overflow-y-auto" >
      <div className="00 p-4 max-w-screen-lg mx-auto  gap-3 text-white/80 relative my-5">
        <div className="flex   justify-center items-center ">
          <div className='w-full h-full'>
            <img 
              src='https://images.moonshot.today/static/134b166/18079489419501_0.jpg'
              alt='https://images.moonshot.today/static/134b166/18079489419501_0.jpg'
              className="max-h-full  rounded-md" />
          </div>
        </div>
        <div className='flex flex-col justify-end pt-5 relative pb-20 '>
          <div className='text-xs mb-3 text-white/30'>Created at 20220202</div>
          
          <div className='text-white font-bold my-3 flex gap-2 items-center'>
            Model
            <div className='bg-zinc-700  px-3  py-1 rounded-md'>
            selec
            </div> 
          </div>
          <div className='text-white font-bold my-3'>Prompt</div>
          <div className='bg-zinc-700 p-3 rounded-md'>
            selectedImage.prompt selectedImage.prompt selectedImage.prompt selectedImage.prompt selectedImage.prompt selectedImage.prompt selectedImage.prompt selectedImage.prompt selectedImage.prompt selectedImage.prompt selectedImage.prompt selectedImage.prompt selectedImage.prompt selectedImage.prompt selectedImage.prompt selectedImage.prompt
          </div>
          <div className='text-white font-bold my-3'>Negative prompt</div>
          <div className='bg-zinc-700 p-3 rounded-md'>
            selectedImage.negative_prompt
          </div>
          

        </div>
        <div className='flex left-0 gap-2 justify-center items-center py-4 fixed bottom-0 z-50 w-full bg-zinc-800'>
          <button className='bg-gray-600 text-white px-2 py-1 rounded-md w-1/2 '>Copy Prompt</button>
          <button className="  bg-gray-800 text-white px-2 py-1 rounded-md hover:bg-gray-700 focus:bg-gray-700" >Close</button>

        </div>
        
      </div>
    </div>
  )
}

export const LoadingCircle = () =>{
  return (
    <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-zinc-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
  )
}
export const LoadingLogoFly = ()=>{
  return (
    <div className='text-white h-screen/70 flex justify-center items-center'>
      <div id="load" className='text-lime-600'>
        <div>T</div>
        <div>O</div>
        <div>H</div>
        <div>S</div>
        <div>N</div>
        <div>O</div>
        <div>O</div>
        <div>M</div>
      </div>
    </div>

  )
} 
export const LoadingLogoSpin = ()=>{
  return (
    <div className='text-white h-[50vh] flex justify-center items-center relative'>
      <div  className='text-lime-600  w-14 '>
      <span className="loader"></span>
      </div>
    </div>

  )
}  
export const DisableInputInvite = () =>{

  return (

      <form>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col'>
            <input  type="text" placeholder="即將上線" className='bg-zinc-700 rounded-xl py-3 px-2 text-sm' disabled/>
          </div>
          <button type="submit" disabled   className="disabled flex justify-center items-center bg-zinc-700 text-white/30 rounded-xl py-3 px-4 text-center  text-xl">
            輸入邀請碼(即將上線)
            <MdOutlineTrendingFlat className='ml-2'/>
          </button>
        </div>

      </form>


  )
}
export const InputInvite = () =>{
  const { control,register, handleSubmit, formState: { errors } } = useForm({
    name:''
  });
  const onSubmit = (data) => {
    // console.log(data)
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col'>
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <input {...field} type="text" placeholder="邀請碼" className='bg-zinc-700 rounded-xl py-3 px-2 text-sm' />
              )}
            />
          </div>
          <button type="submit"  className="flex justify-center items-center bg-gradient-to-r from-lime-700 to-lime-600 rounded-xl py-3 px-4 text-center text-white text-xl">
            輸入邀請碼
            <MdOutlineTrendingFlat className='ml-2'/>
          </button>
        </div>

      </form>

    </div>
  )
}
export const GenerateInvite = () =>{
  return (
    <div className=' flex '>
      <button type="submit"  className="w-full flex justify-center items-center bg-gradient-to-r from-lime-700 to-lime-600 rounded-xl py-3 px-4 text-center text-white text-xl">
        <div>
        產生邀請碼<div className='text-white/70 text-sm'>邀請一位朋友即可獲得5日免費！</div>
        </div>
      </button>
    </div>
  )
}
export const BuyButton = () =>{
  return (
    <button className="flex justify-center items-center bg-gradient-to-r from-lime-700 to-lime-600 rounded-xl py-5 px-4 text-center text-white text-xl">
      訂購
      <MdOutlineTrendingFlat className='ml-2'/>
    </button>
  )
}
export const DisableBuyButton = () =>{
  return (
    <button disabled className="w-full flex justify-center items-center bg-zinc-700 text-white/30 rounded-xl py-6 px-4 text-center  text-xl">
      即將開賣
      <MdOutlineTrendingFlat className='ml-2'/>
    </button>
  )
}



export const UserPageProfile = ({userData,handleFollow,isFollowed})=>{
  return(
      <>
        {
        !userData  ? 
        <div className='text-white'>Loading</div> 
        :
        <div className='flex flex-col items-center gap-5 relative text-white'>
              <div
              style={{backgroundImage:`url(${userData.profile_banner})`}}
              className=' absolute top-0 left-0 -z-10  w-full h-[23vh] bg-cover bg-center bg-no-repeat brightness-75'>

              </div>
              <div 
                className='w-[85px] mt-40  aspect-square rounded-full overflow-hidden bg-center bg-no-repeat bg-cover bg-black '
                style={{backgroundImage:`url(${userData.profile_image})` }}
              ></div>

              <div className=' flex flex-col justify-center items-center gap-2'>
                <div className=' text-xl leading-4'>{userData?.name} </div>
                <div className=' text-xs'>{userData?.bio}  </div>
              </div>


              <div className='grid grid-cols-3  divide-x'>
                <div className=' text-xs px-8'>
                  <div>{userData?.total_photos} </div>
                  <div>renders</div> 
                </div>
                <div className=' text-xs px-8'>
                  <div>{userData?.total_collected}</div> 
                  <div>collected</div> 
                </div>
                <div className=' text-xs px-8'>
                  <div>{userData?.total_follower}</div> 
                  <div>follower</div> 
                </div>
              </div>
              <div className='' onClick={handleFollow}>
                {
                  isFollowed ? 
                  <button className='bg-lime-600 px-5 py-2 rounded-md'>Following</button>
                  : 
                  <button className='bg-lime-700 px-5 py-2 rounded-md'>Follow</button>
                }
                
              </div>
         
             
              
            </div>
      }
      
      
      </>
  )
}

export const CommentDataFormat = ({data})=>{
  const {text,img} = JSON.parse(data) 
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (index) => {
    setSelectedImage(img[index].url);
  };

  const handleModalClose = () => {
    setSelectedImage(null);
  };
  return(
    <>
      <div>{text}</div>
      {img.length > 0  && (
        <div className='flex gap-2 mt-4'>
          {img.map((item,index)=>(
            <div className='w-12' key={'c'+index}>
              <div className='pt-[100%] relative'>
                <img 
                  src={item.url} 
                  alt="" 
                  className='absolute top-1/2 left-0 -translate-y-1/2 object-cover w-full h-fulls  border border-zinc-400'
                  onClick={() => handleImageClick(index)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedImage && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className='fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-75'>
          <div className='max-w-3xl max-h-3xl'>
            <motion.img 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              src={selectedImage} alt='' className='object-contain h-full w-full' />
            <button
              onClick={handleModalClose}
              className='absolute top-2 right-2 text-white  bg-lime-600  p-2'
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </>
  )
}
export const EmptyRenderPage = ()=>{
  return (
    <div className='flex flex-col justify-center items-center text-white brightness-50 mt-10'>
      <div className='w-1/2'>
        <img src={process.env.PUBLIC_URL+'/images/logo.png'} alt="" className=' rounded-full' />
      </div>
      <div className='mt-10'>
        <div>尚無圖片</div>
        開始用 Moonshot 創造第一張 AI 圖吧！
      </div>
    </div>
  )
}
export const EmptyProfilePage = ()=>{

  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      // 計時器回調函數
      if (countdown > 0) {
        // 如果倒數秒數大於 0，則繼續倒數
        setCountdown(countdown - 1);
      } else {
        // 如果倒數秒數等於 0，則導向藝廊首頁
        navigate('/gallery'); // 導向藝廊首頁路由，請根據您的路由配置調整路由路徑
      }
    }, 1000); // 計時器間隔為 1 秒

    return () => {
      clearTimeout(timer);
    };
  }, [countdown, navigate]);
  return(
    <div className='flex flex-col text-sm justify-center items-center py-12 px-4'>
      <div className='w-1/3 my-8'>
        <img src={process.env.PUBLIC_URL+'/images/logo.png'} alt="" className=' rounded-full' />
      </div>
      <div>在這個頁面您可以管理自己的AI作品。</div>
      <div>您必須登入平台才可以繼續瀏覽。</div>
      <div>請登入您的帳號。</div>
      <div className='pt-10'>{countdown} 秒後自動回到藝廊首頁。</div>
    </div>
  )
}
export const EmptyStoragePage = ()=>{
  return (
    <div className='flex flex-col justify-center items-center text-white brightness-50 mt-10'>
      <div className='w-1/2'>
        <img src={process.env.PUBLIC_URL+'/images/logo.png'} alt="" className=' rounded-full' />
      </div>
      <div className='mt-10'>
        尚無留存的圖片
      </div>
    </div>
  )
}
export const EmptyCollectionPage = ()=>{
  return (
    <div className='flex flex-col justify-center items-center text-white brightness-50 mt-10'>
      <div className='w-1/2'>
        <img src={process.env.PUBLIC_URL+'/images/logo.png'} alt="" className=' rounded-full' />
      </div>
      <div className='mt-10'>
        尚無喜歡的圖片
      </div>
    </div>
  )
}
export const EmptyFollowPage = ()=>{
  return (
    <div className='flex flex-col justify-center items-center text-white brightness-50 mt-10'>
      <div className='w-1/2'>
        <img src={process.env.PUBLIC_URL+'/images/logo.png'} alt="" className=' rounded-full' />
      </div>
      <div className='mt-10'>
        還沒有追隨使用者
      </div>
    </div>
  )
}

export const TitleWithLimit = ({ title, maxLength }) => {
  // 如果 title 的長度大於 maxLength，則截斷並加上省略號
  const validTitle = title || "";
  const truncatedTitle = validTitle.length > maxLength
    ? `${validTitle.slice(0, maxLength)}...`
    : validTitle;

  return <h1>{truncatedTitle}</h1>;
};

export const recordPageUrl = () => {
  const currentPageUrl = window.location.href;
  document.cookie = `pageUrl=${currentPageUrl}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
};

export const navigateToRecordedUrl = () => {
  const savedPageUrl = getCookieValue("pageUrl");
  if (savedPageUrl) {
    window.location.href = savedPageUrl;
  }
};

export const getCookieValue = (name) => {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split("=");
    if (cookie[0] === name) {
      return cookie[1];
    }
  }
  return null;
};

export const deletePageUrlCookie = () => {
  document.cookie = "pageUrl=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  console.log("Page URL cookie deleted.");
};