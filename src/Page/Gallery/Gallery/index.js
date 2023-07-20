import React, { useState, useEffect } from 'react';
import {motion,AnimatePresence} from 'framer-motion'
import { MdNotInterested,MdOutlineNewReleases,MdModeComment } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Header from '../header'
import {LoadingLogoFly,LoadingLogoSpin} from '../helpers/componentsHelper'
import {useDevUserLogin,fetchGalleries,initializeLineLogin,getStoredLocalData,refreshToken,fetchComments} from '../helpers/fetchHelper'
import {  useRecoilValue ,useRecoilState } from 'recoil';
import { isLoginState,loginState, imageDataState,imageModalState,lineProfileState,userState} from '../atoms/galleryAtom';
import moment from 'moment';
function Index() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginState);
  const [lineProfile, setLineProfile] = useRecoilState(lineProfileState);
  const [linLoginData, setLineLoginData] = useRecoilState(loginState)
  const [currentUser, setCurrentUser] = useRecoilState(userState)

  const [totalPage, setTotalPage]= useState(0)
  const [currentPage, setCurrentPage]= useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [startDate, setStartDate] = useState('2023-01-01')
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

  useEffect(()=>{
    getStoredLocalData().then(data=>{
        setIsLoggedIn(data.isLogin)
        setLineLoginData(data.loginToken)
        setLineProfile(data.lineProfile)
        setCurrentUser(data.currentUser)
        let headers = {'Content-Type': 'application/json'} 
        if(data.isLogin){
          // const refreshTokenResult = refreshToken()
          refreshToken().then(data =>{
            headers = {'Content-Type': 'application/json' ,'Authorization': `Bearer ${data.token}` }
            setCurrentHeaders(headers)
            handleGalleries(headers,currentPage,pageSize,startDate,endDate,currModels)
            // fetchGalleries(headers,currentPage, pageSize).then(galleryData => {
            //   // console.log(galleryData)
            //   setTotalPage(parseInt((galleryData.count + pageSize - 1) / pageSize))
            //   setData(galleryData.results);
            //   // console.log(galleryData.results)
            //   Promise.all(
            //     galleryData.results.map((item,index)=>{
            //       return fetchComments(item).then(data=>{
            //         const updatedItem = { ...item, comments: data.results.length };
            //         return updatedItem
            //       })
            //     })
            //   ).then(dataWithComments=>{
            //     console.log(dataWithComments)
            //     setData(dataWithComments);
            //   })

            // });
          })
        }else{
            setCurrentHeaders(headers)
            fetchGalleries(headers,currentPage, pageSize).then(data=>{
              setTotalPage(parseInt((data.count + pageSize - 1) / pageSize))
              setData(data.results);
              // console.log(data.results)
            })
        }
        
      })
  },[setIsLoggedIn,setLineLoginData,setLineProfile])

  const fetchMoreImages = () => {
    if(currentPage >= totalPage || loading) {
      return
    } 
    const nextPage = currentPage + 1;
    handleGalleries(currentHeaders,nextPage,pageSize,startDate,endDate,currModels)
    // setCurrentPage(prevPage => prevPage + 1)
    // fetchGalleries(currentHeaders,currentPage, pageSize).then(galleryData => {
    //   console.log(galleryData)
    //   setTotalPage(parseInt((galleryData.count + pageSize - 1) / pageSize))
    //   setData(galleryData.results);
    //   // console.log(galleryData.results)
    //   Promise.all(
    //     galleryData.results.map((item,index)=>{
    //       return fetchComments(item).then(data=>{
    //         const updatedItem = { ...item, comments: data.results.length };
    //         return updatedItem
    //       })
    //     })
    //   ).then(dataWithComments=>{
    //     console.log(dataWithComments)
    //     setData(dataWithComments);
    //   })

    // });
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
      console.log(pg, pgs,s, e, m)
      const images = await fetchGalleries(ch, pg, pgs,s, e, m);
      const results = images.results;
      if(results.length === 0){
        setData(results)
        return
      }
      Promise.all(
        results.map((item,index)=>{
          return fetchComments(item).then(data=>{
            const updatedItem = { ...item, comments: data.results.length };
            return updatedItem
          })
        })
      ).then(dataWithComments=>{
        if(pg === 1){
          setData(dataWithComments);
        }else{
          setData(prevImages => [...prevImages, ...dataWithComments]);
          setCurrentPage(pg);
        }
        
      })
      setTotalPage(parseInt((images.count + pageSize - 1) / pageSize))
      // setCurrentAuthor(images.results[0].author)
    } catch (error) {
      
    } finally {
      setLoading(false);
    }

  }
  useEffect(() => {
    const handleScroll = () => {
      // 獲取頁面滾動相關信息
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      // 檢查是否滾動到頁面底部
      if (scrollTop + clientHeight >= scrollHeight) {
        fetchMoreImages(); // 加載更多圖片
      }
    };
    // 監聽滾動事件
    window.addEventListener('scroll', handleScroll);
    return () => {
      // 在組件卸載時移除滾動事件監聽器
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentHeaders,currentPage,totalPage]); // 空依賴數組，只在組件初次渲染時設置監聽器

  return (
    <div className='w-full '>
      <Header currentUser={currentUser} isLoggedIn={isLoggedIn}/>
      <div className='w-11/12 md:w-9/12 mx-auto my-10'>
          <div className='text-white text-xl  mb-3 font-bold'>Explore Image</div>
          {!data ? 
            <LoadingLogoSpin />
          :
          <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
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

          }
         


 
       
      </div>


    </div>
  )
}

export default Index