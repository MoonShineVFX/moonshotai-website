import React, { useState, useEffect }  from 'react'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import {motion,AnimatePresence} from 'framer-motion'
import { MdErrorOutline } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import {  useRecoilValue ,useRecoilState } from 'recoil';
import { imageFormModalState, imageDataState,imageModalState,beforeDisplayModalState } from '../atoms/galleryAtom';
import {EmptyCollectionPage} from '../helpers/componentsHelper'

function Index({title,images,imagesResults,currentProfile,handleRemoveCollection,totalImage}) {
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
  const onHandleRemoveCollection = (image)=>{
    console.log(image)
    handleRemoveCollection(image.id)


    // 
  }
  if(totalImage === 0) {
    return <div>
      <div className='text-white text-xl font-bolds  md:text-left md:text-3xl  mb-4'>{title} <div className='text-xs text-white/50'>{totalImage} items</div>  </div>
      <EmptyCollectionPage />
    </div>
  }

  return (
    <div >
      <div className='text-white text-xl font-bolds  md:text-left md:text-3xl  mb-4'>{title} <div className='text-xs text-white/50'>{totalImage} items</div>  </div>
      {!imagesResults ?
        <div className='text-white'>Loading</div> 
        : 
        <div className='grid grid-cols-2 md:grid-cols-4 gap-3 pb-16'>
          {imagesResults.map((image,index) => {
            const {id, urls, created_at, display_home, filename,title   } = image
            return (
              <motion.div key={id} 
                variants={imageVariants} initial="hidden" animate="visible" transition={{ delay: index * 0.1 }}
                className=' rounded-lg overflow-hidden relative w-full aspect-square  object-cover '
              >
                <div className='pt-[100%] relative'>
                  <img  
                    src={urls.thumb} alt={image?.description} 
                    data-id={id}
                    className=' absolute top-1/2 left-0 -translate-y-1/2 object-cover w-full h-full rounded-md'
                    onClick={() => {
                      setImageData(image)
                      setIsShowImageModal(true)
                    }} 
                  />
                </div>
                
                <div className=' backdrop-blur-md bg-black/30 flex justify-between  gap-0 p-2 w-full  absolute bottom-0 text-white'>
                  <div className='text-sm'>
                    {title ?title : created_at.substr(0,10)}
                  </div>
                  <div className='flex gap-4'>
                    <div className=' flex items-center gap-1  text-sm ' onClick={()=>onHandleRemoveCollection(image)}>
                      <FaHeart />Remove
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