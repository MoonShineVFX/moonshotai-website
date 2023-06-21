import React, { useState, useEffect }  from 'react'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import {motion,AnimatePresence} from 'framer-motion'
import { MdErrorOutline } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import {  useRecoilValue ,useRecoilState } from 'recoil';
import { imageFormModalState, imageDataState,imageModalState,beforeDisplayModalState } from '../atoms/galleryAtom';
import { EmptyFollowPage } from '../helpers/componentsHelper';
function Index({title,follows,followsResults,currentProfile,handleUnfollow,totalImage}) {
  const [openItems, setOpenItems] = useState([]);
  const [isShowFormModal, setIsShowFormModal] = useRecoilState(imageFormModalState)
  const [isShoDisplayFormModal, setIsShowDisplayFormModal] = useRecoilState(beforeDisplayModalState)
  const [isShowimageModal, setIsShowImageModal] = useRecoilState(imageModalState)
  const [imageData, setImageData] = useRecoilState(imageDataState)
  const imageVariants = {
    hidden: { opacity: 0, },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  const dropdownVariants = {
    open: {
      opacity: 1,
      display:'block',
      transition: {
        duration: 0.2,
      },
    },
    closed: {
      opacity: 0,
      display:'none',
      transition: {
        duration: 0.2,
      },
    },
  };
  const onHandlUnfollow = (user)=>{
    console.log(user)
    handleUnfollow(user)


    // 
  }
  if(totalImage === 0) {
    return <div>
      <div className='text-white text-xl font-bolds  md:text-left md:text-3xl  mb-4'>{title} <div className='text-xs text-white/50'>{totalImage} items</div>  </div>
      <EmptyFollowPage />
    </div>
  }

  return (
    <div >
      <div className='text-white text-xl font-bolds  md:text-left md:text-3xl  mb-4'>{title}  <div className='text-xs text-white/50'>{totalImage} items</div> </div>
      {!followsResults ?
        <div className='text-white'>Loading</div> 
        : 
        <div>
          {followsResults.map((user,index) => {
            const {id, name, profile_image   } = user
            return (
              <motion.div key={id} 
                variants={imageVariants} initial="hidden" animate="visible" transition={{ delay: index * 0.1 }}
                className='relative w-full  flex items-center '
              >
                <div className='w-14'>
                  <div className='pt-[100%] relative'>
                    <img  
                      src={profile_image} alt={profile_image} 
                      data-id={id}
                      className=' absolute top-1/2 left-0 -translate-y-1/2 object-cover w-full h-full rounded-full'
                      onClick={() => {
                        // setImageData(user)
                        // setIsShowImageModal(true)
                      }} 
                    />
                  </div>
                </div>
                <div className=' flex justify-between  gap-0 p-2 w-full  bottom-0 text-white'>
                  <div className='text-sm'>
                    {name }
                  </div>
                  <div className='flex gap-4'>
                    <div className=' flex items-center gap-1  text-sm bg-lime-600 py-1 px-3 ' onClick={()=>onHandlUnfollow(user)}>
                      <FaHeart />Unfollow
                    </div>


                  </div>

                </div>
              </motion.div>

            )

          })}
        </div>

      }
    </div>
  )
}
export default Index