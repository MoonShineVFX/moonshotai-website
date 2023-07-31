import React, { useState, useEffect } from 'react';
import {motion,AnimatePresence} from 'framer-motion'
import { MdNotInterested,MdOutlineNewReleases,MdModeComment } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Header from '../header'
import {LoadingLogoFly,LoadingLogoSpin} from '../helpers/componentsHelper'
import {useDevUserLogin,fetchGalleries,initializeLineLogin,getStoredLocalData,refreshToken,fetchComments,removeLocalStorageItem} from '../helpers/fetchHelper'
import {  useRecoilValue ,useRecoilState } from 'recoil';
import { isLoginState,loginState, imageDataState,imageModalState,lineProfileState,userState} from '../atoms/galleryAtom';
import moment from 'moment';
import ImgFilter from '../Components/ImgFilter';
import debounce from 'lodash.debounce';
import { useQuery, useInfiniteQuery,QueryClient } from 'react-query';
const filterDateItem = [
  {title:'24 小時',type:'時間區間',command:'days',value:'1'},
  {title:'7 天',type:'時間區間',command:'days',value:'7'},
  {title:'30 天', type:'時間區間',command:'days',value:'30'},
  {title:'全部',type:'時間區間',command:'days',value:'all'}
]
const filterModelsDate = [
  {title:'全部',type:'Models',command:'models',value:'all'},
  {title:'插畫 CT',type:'Models',command:'models',value:'ct'},
  {title:'寫實 PR',type:'Models',command:'models',value:'pr'},
  {title:'漫畫 CM', type:'Models',command:'models',value:'cm'},
  {title:'寫實人像 PC',type:'Models',command:'models',value:'pc'}
 ]
function Index() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginState);
  const [lineProfile, setLineProfile] = useRecoilState(lineProfileState);
  const [linLoginData, setLineLoginData] = useRecoilState(loginState)
  const [currentUser, setCurrentUser] = useRecoilState(userState)

  const [totalPage, setTotalPage]= useState(0)
  const [currentPage, setCurrentPage]= useState(1)
  const [pageSize, setPageSize] = useState(12)
  const [startDate, setStartDate] = useState(moment().format('2022-01-01'))
  const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'))
  const [currModels, setCurrModels] = useState('all')
  const [loading, setLoading] = useState(false);

  // const [data, setData] = useState(null)
  const [isShowimageModal, setIsShowImageModal] = useRecoilState(imageModalState)
  // const [imageData, setImageData] = useRecoilState(imageDataState)
  const [currentHeaders , setCurrentHeaders] = useState({})
  const imageVariants = {
    hidden: { opacity: 0, },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  // 在此處檢查 localStorage 內的資料
  useEffect(() => {
    getStoredLocalData().then(data => {
      setIsLoggedIn(data.isLogin);
      setLineLoginData(data.loginToken);
      setLineProfile(data.lineProfile);
      setCurrentUser(data.currentUser);
      let loginToken = data.loginToken
      let headers = {'Content-Type': 'application/json'} 
      setCurrentHeaders(headers)
      if(data.isLogin){
        headers = {'Content-Type': 'application/json' ,'Authorization': `Bearer ${loginToken}` }
        setCurrentHeaders(headers)
      }
    });
  }, []);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError, refetch } = useInfiniteQuery(
    [ 'galleries',currentHeaders, startDate, currModels],
    ({ pageParam }) =>
      fetchGalleries(currentHeaders, pageParam, pageSize, startDate, endDate, currModels),
    {
      getNextPageParam: (lastPage, pages) =>{
        // 檢查是否有下一頁
        if (lastPage.next) {
          const url = new URL(lastPage.next);
          const nextPage = url.searchParams.get("cursor");
          return nextPage ? nextPage : undefined;
        }
        return undefined;
        }
    }
  );
  const imageData = data?.pages?.flatMap((pageData) => pageData.results) ?? [];




  const onHandleSelectDate = (item)=>{
    // console.log(item)
    switch (item.value) {
      case '1':
        const oneDayAgo = moment().subtract(1, 'days').format('YYYY-MM-DD');
        handleSelectDate(item.value,oneDayAgo)
        break;
      case '7':
        const sevenDaysAgo = moment().subtract(7, 'days').format('YYYY-MM-DD');
        handleSelectDate(item.value,sevenDaysAgo)
        break;
      case '30':
        const thirtyDaysAgo = moment().subtract(30, 'days').format('YYYY-MM-DD');
        handleSelectDate(item.value,thirtyDaysAgo)
        break;   
      case 'all':
        handleSelectDate(item.value,'2022-01-01')
          break; 
      default:
        handleSelectDate('all','2022-01-01')
        break;
    }

  }
  const onHandleSelectModels = (item)=>{
    // console.log('click')
    handleSelectModels(item.value)
  }
  const handleSelectDate = (value,date)=>{
    console.log(date)
    setCurrentPage(1)
    setPageSize(12)
    setStartDate(date)
  }
  const handleSelectModels = (value)=>{
    setCurrentPage(1)
    setPageSize(12)
    setCurrModels(value)
  }

  const [lastScrollTime, setLastScrollTime] = useState(0);
  const handleScroll = () => {
    // 獲取頁面滾動相關信息
    
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      // 檢查是否滾動到頁面底部
      if (scrollTop + clientHeight >= scrollHeight - 30) {
        const now = Date.now();
        if (now - lastScrollTime >= 1000) {
          // fetchMoreImages(); // 加載更多圖片
          fetchNextPage();
          setLastScrollTime(now);
        }

      }
  };
  const debouncedHandleScroll = debounce(handleScroll, 500);
  useEffect(() => {
    // 監聽滾動事件
    window.addEventListener('scroll', debouncedHandleScroll);
    return () => {
      // 在組件卸載時移除滾動事件監聽器
      window.removeEventListener('scroll', debouncedHandleScroll);
    };
  }, [currentHeaders,currentPage,totalPage]); // 空依賴數組，只在組件初次渲染時設置監聽器


  return (
    <div className='w-full '>
      <Header currentUser={currentUser} isLoggedIn={isLoggedIn}/>

      <div className='w-11/12 md:w-11/12 mx-auto my-10'>
          <div className='text-white text-xl  mb-3 font-bold'>Explore Image</div>

          {!imageData ? 
            <LoadingLogoSpin />
          :
          <div>
            <div className='flex items-center mt-6 mb-4 gap-2  justify-end w-full '>
              <ImgFilter filterItems={filterModelsDate} defaultIndex={0} onHandleSelect={onHandleSelectModels}/>
              <ImgFilter filterItems={filterDateItem} defaultIndex={3} onHandleSelect={onHandleSelectDate}/>
            </div>
            {
              imageData.length === 0 && <div className='text-white/60 text-sm my-6 text-center'>這個選擇下目前沒有圖片。</div>
            }
            <div className='grid grid-cols-2 md:grid-cols-5 gap-4 my-4'>
              {imageData.map((image,index)=>{
                const {id, urls, created_at, display_home, filename,is_storage,title,author,is_user_nsfw,is_nsfw,likes,comments   } = image
                return (
                  <motion.div key={'gallery-'+index} 
                    variants={imageVariants} initial="hidden" animate="visible" transition={{ delay: index * 0.1 }}
                    className='  overflow-hidden relative'
                  >
                    <Link to={`/post/${id}`} className=' relative' >
                      <div className='pt-[100%] relative'>
                        <img  
                          src={urls.thumb} alt={image?.description} 
                          data-id={id}
                          className='aspect-square absolute top-1/2 left-0 -translate-y-1/2 object-cover w-full h-full rounded-md'
  
                        />
                      </div>

                      <div className='absolute bottom-0 p-1 flex gap-1 items-center text-white justify-between w-full px-2'>
                        <div className='flex items-center space-x-2'>
                          <div className='flex items-center  space-x-2 '><FaHeart /> <span>{likes}</span></div>
                          <div className='flex items-center  space-x-2'><MdModeComment />  <span>{comments}</span></div>
                        </div>

                        <div className='text-red-300'>
                          {is_user_nsfw || is_nsfw ?  <MdOutlineNewReleases size={20}  />  : ""  }
                        </div>


                      </div>
                      <div>
                        
                      </div>
                    </Link>



                    <div className='text-sm  flex items-center mt-3  space-x-3 w-full   text-white'>
                      <Link to={`/user/${author?.id}`}  className='w-8'>
                        <div className='pt-[100%] relative'>
                          <img src={author?.profile_image} alt="" className='absolute aspect-square top-1/2 left-0 -translate-y-1/2 object-cover w-full h-fulls rounded-full'/>
                        </div>
                      </Link>

                      <div className='flex flex-col'>
                        <div className='text-base font-bold'>{title} </div>
                        <div className='text-xs text-white/50'>{author?.name}</div>
                      </div>
                    </div>



                  </motion.div>

                )
                })}


            </div>
            {isFetchingNextPage && <div className='text-white/80 flex justify-center my-4 text-xs '>
              <div className='bg-zinc-900 px-4 py-2 rounded-md'>載入更多..</div> 
            </div>}
          </div>


          }
         


 
       
      </div>


    </div>
  )
}

export default Index