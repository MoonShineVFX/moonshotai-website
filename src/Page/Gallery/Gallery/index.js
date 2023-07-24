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
  const [pageSize, setPageSize] = useState(14)
  const [startDate, setStartDate] = useState(moment().format('2022-01-01'))
  const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'))
  const [currModels, setCurrModels] = useState('all')
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState(null)
  const [isShowimageModal, setIsShowImageModal] = useRecoilState(imageModalState)
  const [imageData, setImageData] = useRecoilState(imageDataState)
  const [currentHeaders , setCurrentHeaders] = useState({})
  const imageVariants = {
    hidden: { opacity: 0, },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };



  const fetchMoreImages = () => {
    if(currentPage >= totalPage || loading) {
      return
    } 
    const nextPage = currentPage + 1;
    handleGalleries(currentHeaders,nextPage,pageSize,startDate,endDate,currModels)
    
  }
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
    setCurrentPage(1)
    setPageSize(15)
    setStartDate(date)
    handleGalleries(currentHeaders,1,pageSize,date,endDate,currModels)
  }
  const handleSelectModels = (value)=>{
    setCurrentPage(1)
    setPageSize(15)
    setCurrModels(value)
    handleGalleries(currentHeaders,1,pageSize,startDate,endDate,value)
  }
  // get galleries
  const handleGalleries = async (currentHeaders,pageNum,pageSizeNum,sDate,eDate,cModels)=>{
    // console.log(currentHeaders,pageNum,pageSizeNum,sDate,eDate,cModels)
    setLoading(true);
    try {
      let ch = currentHeaders 
      let pg = pageNum || currentPage 
      let pgs = pageSizeNum || pageSize 
      let s = sDate || startDate
      let e = eDate || endDate
      let m = cModels || currModels
      // console.log(pg, pgs,s, e, m)
      const images = await fetchGalleries(ch, pg, pgs,s, e, m);
      const results = images.results;

      if(images === 401){
        // console.log('401')
        return 401
      }
      if(results.length === 0){
        setData(results)
        return 
      }
      setTotalPage(parseInt((images.count + pageSize - 1) / pageSize))

      if(pg === 1){
        setData(results);
      }else{
        setData(prevImages => [...prevImages, ...results]);
        setCurrentPage(pg);
      }
        
      
 
  
      // setCurrentAuthor(images.results[0].author)
    } catch (error) {
      
    } finally {
      setLoading(false);
    }

  }
  const [lastScrollTime, setLastScrollTime] = useState(0);
  const handleScroll = () => {
    // 獲取頁面滾動相關信息
    
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      // 檢查是否滾動到頁面底部
      if (scrollTop + clientHeight >= scrollHeight - 30) {
        const now = Date.now();
        if (now - lastScrollTime >= 1000) {
          console.log('go')
          fetchMoreImages(); // 加載更多圖片
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
    //TODO no login many time
  useEffect(()=>{
    getStoredLocalData().then(data=>{
        setIsLoggedIn(data.isLogin)
        setLineLoginData(data.loginToken)
        setLineProfile(data.lineProfile)
        setCurrentUser(data.currentUser)
        let loginToken = data.loginToken
        let headers = {'Content-Type': 'application/json'} 
        if(data.isLogin){
          // const refreshTokenResult = refreshToken()
          headers = {'Content-Type': 'application/json' ,'Authorization': `Bearer ${loginToken}` }
          setCurrentHeaders(headers)
          handleGalleries(headers,currentPage,pageSize,startDate,endDate,currModels).then((d)=>{
            console.log(d)
            if(d === 401){
              setTimeout(()=>{
                removeLocalStorageItem().then(data=>{
                  window.location.reload();
                })
              },500)
            }
          })
          // refreshToken().then(data =>{
          // })
        }else{
          handleGalleries(headers,currentPage,pageSize,startDate,endDate,currModels).then((d)=>{
            console.log(d)
          })
        }
        
      })
  },[setIsLoggedIn,setLineLoginData,setLineProfile])

  return (
    <div className='w-full '>
      <Header currentUser={currentUser} isLoggedIn={isLoggedIn}/>

      <div className='w-11/12 md:w-9/12 mx-auto my-10'>
          <div className='text-white text-xl  mb-3 font-bold'>Explore Image</div>

          {!data ? 
            <LoadingLogoSpin />
          :
          <div>
            <div className='flex items-center mt-6 mb-4 gap-2  justify-end w-full '>
              <ImgFilter filterItems={filterModelsDate} defaultIndex={0} onHandleSelect={onHandleSelectModels}/>
              <ImgFilter filterItems={filterDateItem} defaultIndex={3} onHandleSelect={onHandleSelectDate}/>
            </div>
            {
              data.length === 0 && <div className='text-white/60'>這個選擇下目前沒有圖片。</div>
            }
            <div className='grid grid-cols-2 md:grid-cols-5 gap-4 my-4'>
              {data.map((image,index)=>{
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
                          className=' absolute top-1/2 left-0 -translate-y-1/2 object-cover w-full h-full rounded-md'
  
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
                          <img src={author?.profile_image} alt="" className='absolute top-1/2 left-0 -translate-y-1/2 object-cover w-full h-fulls rounded-full'/>
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
            {loading && <div className='text-white/80 flex justify-center my-4 text-xs '>
              <div className='bg-zinc-900 px-4 py-2 rounded-md'>載入中..</div> 
            </div>}
          </div>


          }
         


 
       
      </div>


    </div>
  )
}

export default Index