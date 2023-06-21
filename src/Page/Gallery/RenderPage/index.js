import React, { useState, useEffect }  from 'react'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import {motion,AnimatePresence} from 'framer-motion'
import { FiHeart } from "react-icons/fi";
import { MdBookmark,MdMoreVert,MdBookmarkBorder } from "react-icons/md";
import {getWordFromLetter} from '../helpers/fetchHelper'
import {  useRecoilValue ,useRecoilState } from 'recoil';
import { imageFormModalState, imageDataState,imageModalState } from '../atoms/galleryAtom';
function Index({title,images,imagesResults,handleUpdate,handleCollection,handleStorage,handleRemoveStorage,fetchMoreImages,currentPage,totalPage,totalImage}) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)
  const [openItems, setOpenItems] = useState([]);
  const [isShowFormModal, setIsShowFormModal] = useRecoilState(imageFormModalState)
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

  const handleClick = (id) => {
    if (openItems.includes(id)) {
      setOpenItems(openItems.filter((item) => item !== id));
    } else {
      setOpenItems([...openItems, id]);
    }
  };
  const onHandleStorage = (image) =>{
    
    if(image.is_storage === true) {
      const newData = { ...image, is_storage: !image.is_storage  }; 
      handleUpdate(image.id,newData)
      handleRemoveStorage(image.id)
    }else {
      const newData = { ...image, is_storage: !image.is_storage  }; 
      handleUpdate(image.id,newData)
      handleStorage(image)
    }

  }
  const onHandleCollection = (image) =>{
    handleCollection(image)
    // if(image.is_storage === true) return
    // const newData = { ...image, is_storage: !image.is_storage  }; 
    // handleUpdate(image.id,newData)
  }

  const toggleDropdown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

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
  }, [currentPage,totalPage]); // 空依賴數組，只在組件初次渲染時設置監聽器

  useEffect(() => {
  }, []);
  return (
    <div >
      <div className='text-white text-xl font-bolds  md:text-left md:text-3xl  mb-4'>
        {title} <div className='text-xs text-white/50'>{totalImage}</div>  
      </div>
      <div className='flex gap-4 items-center my-3 text-white/70 justify-end text-sm hidden'>
        {/* <div className='py-1 px-2 rounded-full'>{images.previous ? 
          <div onClick={onHandlePrev}>Previous</div>  
          : 
          <span className="text-white/10 cursor-not-allowed">Previous</span> }
        </div>
        <div className='py-1 px-2 rounded-full'>{images.next ?     
          <div onClick={onHandleNext}>Next</div>      
          : 
          <span className="text-white/10 cursor-not-allowed">Next</span>}
        </div> */}
      </div>
      {!imagesResults ?
        <div className='text-white'>Loading</div> 
        : 
          <div className='grid grid-cols-3 md:grid-cols-4 gap-3'>
          {imagesResults.map((image,index) => {
            const {id, urls, created_at, display_home, filename,is_storage   } = image
            return (
              <motion.div key={'render-'+index} 
                variants={imageVariants} initial="hidden" animate="visible" transition={{ delay: index * 0.1 }}
                className=' rounded-lg overflow-hidden relative'
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
                  <div className='text-xs'>
                     {created_at.substr(0,10)}
                  </div>
                  <div className='flex gap-4'>
                    {
                      is_storage ? 
                      <div className='ml-auto flex items-center gap-3 text-white' onClick={()=>onHandleStorage(image)}>
                        <MdBookmark />
                      </div>
                      :
                      <div className='ml-auto flex items-center gap-3 text-white' onClick={()=>onHandleStorage(image)}>
                        <MdBookmarkBorder />
                      </div>
                    }
                    
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