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

  const [data, setData] = useState(null)
  const [isShowimageModal, setIsShowImageModal] = useRecoilState(imageModalState)
  const [imageData, setImageData] = useRecoilState(imageDataState)
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
            fetchGalleries(headers).then(galleryData => {
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
            fetchGalleries(headers).then(data=>{
              setData(data.results);
              // console.log(data.results)
            })
        }
        
      })
  },[setIsLoggedIn,setLineLoginData,setLineProfile])

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
                  <Link to={`/post/${id}`} onClick={() => {setImageData(image)}} className=' relative' >
                    <div className='pt-[100%] relative'>
                      <img  
                        src={urls.thumb} alt={image?.description} 
                        data-id={id}
                        className=' absolute top-1/2 left-0 -translate-y-1/2 object-cover w-full h-full rounded-md'
                        onClick={() => {setImageData(image)}} 
                      />
                    </div>

                    <div className='absolute bottom-0 p-1 flex gap-1 items-center text-white justify-between w-full px-2'>
                      <div className='flex items-center gap-2'>
                        <div className='flex items-center  gap-2'><FaHeart /> {likes}</div>
                        <div className='flex items-center  gap-2'><MdModeComment /> {likes}</div>
                      </div>

                      <div className='text-red-300'>
                        {is_user_nsfw || is_nsfw ?  <MdOutlineNewReleases size={20}  />  : ""  }
                      </div>


                    </div>
                    <div>
                      
                    </div>
                  </Link>



                  <div className='text-sm  flex items-start mt-3  gap-3 w-full   text-white'>
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