import React, { useState, useEffect } from 'react';
import {motion,AnimatePresence} from 'framer-motion'
import { MdNotInterested,MdOutlineNewReleases,MdModeComment } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Header from '../header'
import {LoadingCircle} from '../helpers/componentsHelper'
import {useDevUserLogin,fetchGalleries,initializeLineLogin,getStoredLocalData,refreshToken,fetchComments} from '../helpers/fetchHelper'
import {  useRecoilValue ,useRecoilState } from 'recoil';
import { isLoginState,loginState, imageDataState,imageModalState,lineProfileState,userState} from '../atoms/galleryAtom';
function Index() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginState);
  const [lineProfile, setLineProfile] = useRecoilState(lineProfileState);
  const [linLoginData, setLineLoginData] = useRecoilState(loginState)
  const [currentUser, setCurrentUser] = useRecoilState(userState)
  const [totalPage, setTotalPage]= useState(0)
  const [currentPage, setCurrentPage]= useState(1)
  const [pageSize, setPageSize] = useState(10)
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
            fetchGalleries(headers,currentPage, pageSize).then(galleryData => {
              console.log(galleryData)
              setTotalPage(parseInt((galleryData.count + pageSize - 1) / pageSize))
              setData(galleryData.results);
              // console.log(galleryData.results)
              Promise.all(
                galleryData.results.map((item,index)=>{
                  return fetchComments(item).then(data=>{
                    const updatedItem = { ...item, comments: data.results.length };
                    return updatedItem
                  })
                })
              ).then(dataWithComments=>{
                console.log(dataWithComments)
                setData(dataWithComments);
              })

            });
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
    if(currentPage >= totalPage) {
      console.log('stop')
      return
    } 
    console.log('go')
    const nextPage = currentPage + 1;
    setCurrentPage(prevPage => prevPage + 1)
    fetchGalleries(currentHeaders,currentPage, pageSize).then(galleryData => {
      console.log(galleryData)
      setTotalPage(parseInt((galleryData.count + pageSize - 1) / pageSize))
      setData(galleryData.results);
      // console.log(galleryData.results)
      Promise.all(
        galleryData.results.map((item,index)=>{
          return fetchComments(item).then(data=>{
            const updatedItem = { ...item, comments: data.results.length };
            return updatedItem
          })
        })
      ).then(dataWithComments=>{
        console.log(dataWithComments)
        setData(dataWithComments);
      })

    });
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
          <div className='text-white text-lg  mb-2 font-bold'>Newest</div>
          {!data ? 
          <div className='text-white'>
            <LoadingCircle />
          </div> 
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



                  <div className='text-sm  flex items-start mt-3  space-x-3 w-full   text-white'>
                    <div className='w-9'>
                      <div className='pt-[100%] relative'>
                        <img src={author?.profile_image} alt="" className='absolute top-1/2 left-0 -translate-y-1/2 object-cover w-full h-fulls rounded-full'/>
                      </div>
                    </div>

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