import React, { useState, useEffect }  from 'react'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import {motion,AnimatePresence} from 'framer-motion'
import { MdBookmarkRemove,MdMoreVert,MdVisibility,MdVisibilityOff,MdErrorOutline,MdModeEdit,MdRemoveCircle } from "react-icons/md";
import { FaShareSquare } from "react-icons/fa";

import {  useRecoilValue ,useRecoilState } from 'recoil';
import { imageFormModalState, imageDataState,imageModalState,beforeDisplayModalState } from '../atoms/galleryAtom';
import { EmptyStoragePage } from '../helpers/componentsHelper';
import debounce from 'lodash.debounce';
function Index({title,images,imagesResults,currentProfile,handleStorage,handleRemoveStorage,handleSetBanner,handleSetAvatar,handleDisplayHome,handleStorageUpdate,fetchMoreStorageImages,currentStoragePage,totalPage,totalImage,limitImage}) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)
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
  const onHandleRemoveStorage = (image)=>{
    console.log(image)
    if(image.urls.regular === currentProfile.profile_banner || image.urls.regular === currentProfile.profile_image)
    {
      console.log('yes')
      setShow(true)
    }else{   
      console.log('no')
      handleRemoveStorage(image.id)
    }

    // remove後應更新使用者擁有數量
  }
  const handleClick = (id) => {
    if (openItems.includes(id)) {
      setOpenItems(openItems.filter((item) => item !== id));
    } else {
      setOpenItems([...openItems, id]);
    }
  };
  const onHandleDisplayHome = (image)=>{
   
    const items = {
      display_home:!image.display_home
    }
    setIsShowDisplayFormModal(true)
    setImageData(image)
    // if(image.display_home === true){
    //   const newData = { ...image, display_home: !image.display_home  }; 
    //   handleStorageUpdate(image.id,newData)
    //   handleDisplayHome(image.id,items)

    // }else{
    //   setIsShowDisplayFormModal(true)
    //   setImageData(image)
    //   // const newData = { ...image, display_home: !image.display_home  }; 
    //   // handleStorageUpdate(image.id,newData)
    //   // handleDisplayHome(image.id,items)
    // }
  }
  const onHandleSetBanner = (id)=>{
    handleSetBanner(id)
  }
  const onHandleSetAvatar = (id)=>{
    handleSetAvatar(id)
  }
  const onHandleEditImageDetail = (image)=>{
    console.log(image)
  }
  const [show , setShow]=useState(false)
  const ConfirmCancelMsg = ({setShow})=>{
    const handleClose = ()=>{
      setShow(false)
    }
    return (
      <div className=' fixed z-50 top-0 left-0 w-full'>
        <div className='bg-black/50 w-full h-screen' onClick={handleClose}></div>
        <motion.div 
          initial={{ opacity: 0, y: -20 ,x:'-50%'}}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className=' bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#49531F] via-black  to-zinc-800 rounded-lg p-4 box-border text-white fixed top-32 left-1/2 -translate-x-1/2 w-4/5 overflow-y-auto max-h-[25vh]'
        >
          <div className='flex flex-col items-center gap-3'>
            <div><MdErrorOutline size={26} /></div>
            This image is assigned a banner or avatar.
            <button className='  py-1 px-2 rounded-md bg-[#4c5a13]' onClick={handleClose}>OK</button>
          </div>

        </motion.div>
      </div>
    )
  }
  const renderLimitImage = (currentCounter, limitImage)=>{
    const currentCount = parseInt(currentCounter);
    const limit = parseInt(limitImage);
  
    const isExceeded = currentCount > limit;
  
    const textStyle = isExceeded
      ? 'text-red-500' // Red text color for exceeded counter
      : 'text-white/70'; // White text color for within limit counter
  
    return (
      <div className={`text-xs ${textStyle}`}>
        {currentCount} / {limit} items
      </div>
    );
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
          fetchMoreStorageImages(); // 加載更多圖片
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
  }, [currentStoragePage,totalPage]); // 空依賴數組，只在組件初次渲染時設置監聽器
  if(totalImage === 0) {
    return <div>
      <div className='text-white text-xl font-bolds  md:text-left md:text-3xl  mb-4'>{title} <div className='text-xs text-white/50'>{totalImage} items</div>  </div>
      <EmptyStoragePage />
    </div>
  }
  return (
    <div >
          <div className='text-white text-xl font-bolds  md:text-left md:text-3xl  mb-4'>
            {title}   {renderLimitImage(totalImage,limitImage)} 
            <div className='text-xs text-white/50'>免費會員可留存 100 張圖片，進階會員可留存 300 張圖片</div>

          </div>

          {show && <ConfirmCancelMsg setShow={setShow} />  }
          {!imagesResults ?
          <div className='text-white'>Loading</div> 
          : 
          <ResponsiveMasonry
            className=''
            columnsCountBreakPoints={{350: 1, 750: 2, 900: 4,1700:5}}
          >
            <Masonry gutter={20}>
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
                  
                  <div className=' absolute top-0 left-0 text-white w-full flex justify-between items-center  '> 
                    <div className='p-2 ' onClick={()=>{
                      handleClick(id)
                    }}>
                      <div className='rounded-full bg-zinc-800/80 p-2'><MdMoreVert size={15} /></div>
 
                    </div>
                    <div className='text-white p-2'>
                      <div className={'rounded-full p-2' + (display_home ?  ' bg-zinc-100 text-black' : ' bg-zinc-800 text-white' )} onClick={()=>{
                        onHandleDisplayHome(image)
                      }}> <MdModeEdit size={15}/></div>
                    </div>
                    <motion.div
                      className={`absolute w-full h-screen top-0 left-0 bg-black/60 -z-0 ${openItems.includes(id) ? ' ' : ' hidden'}` }
            
                      onClick={()=>{
                        handleClick(id)
                      }}
                    ></motion.div>
                    <motion.div 
                      className={`text-white  absolute top-10  w-auto  rounded-lg bg-[#444] p-2 mt-2  border-white/20 z-30` }
                      variants={dropdownVariants}
                      initial="closed"
                      animate={openItems.includes(id) ? 'open' : 'closed'}
                    >
                      <div className='hover:bg-[#555] p-2 text-sm rounded-lg'
                        onClick={()=>{
                          handleClick(id)
                          onHandleSetBanner(id)
                        }}
                      >Set as Banner</div>      
                      <div className='hover:bg-[#555] p-2 text-sm rounded-lg'
                        onClick={()=>{
                          handleClick(id)
                          onHandleSetAvatar(id)
                        }}
                      >Set as Avatar</div>       
                      <div className='hover:bg-[#555] p-2 text-sm rounded-lg hidden'
                        onClick={()=>{
                          handleClick(id)
                          setIsShowFormModal(true)
                          setImageData(image)
                          onHandleEditImageDetail(image)
                        }}
                      >Edit detail</div>              
                    </motion.div>
                    
                  </div>
                  <div className=' backdrop-blur-md bg-black/30 flex justify-between  gap-0 p-2 w-full  absolute bottom-0 text-white'>
                    <div className='text-sm'>
                      {title ?title : created_at.substr(0,10)}
                    </div>
                    <div className='flex gap-4'>
                      <div className=' flex items-center gap-1  text-sm ' onClick={()=>onHandleRemoveStorage(image)}>
                        <MdRemoveCircle />移除留存
                      </div>


                    </div>

                  </div>
                </motion.div>

              )

            })}
            </Masonry>
          </ResponsiveMasonry>

        }
    </div>
  )
}
export default Index