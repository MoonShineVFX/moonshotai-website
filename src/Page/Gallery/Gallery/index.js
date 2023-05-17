import React, { useState, useEffect } from 'react';
import {motion,AnimatePresence} from 'framer-motion'
import { MdNotInterested,MdOutlineNewReleases } from "react-icons/md";
import { Link } from "react-router-dom";
import Header from '../header'
import {initializeLineLogin,useDevUserLogin,fetchGalleries} from '../helpers/fetchHelper'
import {  useRecoilValue ,useRecoilState } from 'recoil';
import { isLoginState,loginState, imageDataState,imageModalState} from '../atoms/galleryAtom';
function Index() {
  const currentLoginData = useRecoilValue(loginState)
  const isCurrentLogin = useRecoilValue(isLoginState)
  const [data, setData] = useState(null)
  const [isShowimageModal, setIsShowImageModal] = useRecoilState(imageModalState)
  const [imageData, setImageData] = useRecoilState(imageDataState)
  const [headers, setHeaders] = useState(
    isCurrentLogin ? 
    {'Content-Type': 'application/json' ,'Authorization': `Bearer ${currentLoginData}` }
    : 
    {'Content-Type': 'application/json'} 
    )
  const imageVariants = {
    hidden: { opacity: 0, },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  useEffect(()=>{
    fetchGalleries(headers).then(data=>setData(data.results))

  },[])
  return (
    <div className='w-full'>
      <Header />
      <div className='w-11/12 mx-auto my-10'>

          {!data ? 
          <div className='text-white'>Loading</div> 
          :
          <div className='grid grid-cols-2 gap-4'>
            {data.map((image,index)=>{
              const {id, urls, created_at, display_home, filename,is_storage,title,author,is_user_nsfw,is_nsfw   } = image
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
                        className=' absolute top-1/2 left-0 -translate-y-1/2 object-cover w-full h-full'
                        onClick={() => {setImageData(image)}} 
                      />
                    </div>

                    <div className='text-orange-500 absolute top-0 p-1 flex gap-1'>
                      {is_user_nsfw && <MdOutlineNewReleases size={20} color="#ff7505" />  }
                      {is_nsfw && <MdOutlineNewReleases size={20} color="#f41818" />  }
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