import React, { useState, useEffect }  from 'react'
import {motion} from 'framer-motion'
import { MdMoreVert,MdErrorOutline,MdRemove } from "react-icons/md";
import { FaShare } from "react-icons/fa";

import {  useRecoilValue ,useRecoilState } from 'recoil';
import { imageFormModalState, imageDataState,imageModalState,beforeDisplayModalState,profilePageState } from '../atoms/galleryAtom';
import { EmptyStoragePage } from '../helpers/componentsHelper';
import debounce from 'lodash.debounce';
function Index({title,images,imagesResults,currentProfile,handleStorage,handleRemoveStorage,handleSetBanner,handleSetAvatar,handleDisplayHome,fetchMoreStorageImages,currentStoragePage,totalPage,totalImage,limitImage,isStorageDataLoading,isFetchingNextPage}) {
  const [openItems, setOpenItems] = useState([]);
  const [isShowFormModal, setIsShowFormModal] = useRecoilState(imageFormModalState)
  const [isShoDisplayFormModal, setIsShowDisplayFormModal] = useRecoilState(beforeDisplayModalState)
  const [isShowimageModal, setIsShowImageModal] = useRecoilState(imageModalState)
  const [imageData, setImageData] = useRecoilState(imageDataState)
  const [profilePage, setProfilePage] = useRecoilState(profilePageState)
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
      setShow(true)
    }else{   
      handleRemoveStorage(image,'on_Storagepage')
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
    console.log(image)
    const items = {
      display_home:!image.display_home
    }
    setIsShowDisplayFormModal(true)
    const newData = { ...image, is_storage: true };
    setImageData(newData)
    setProfilePage('on_Storagepage')

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
          className=' bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#49531F] via-black  to-gray-800 rounded-lg p-4 box-border text-white fixed top-32 left-1/2 -translate-x-1/2 w-4/5 overflow-y-auto max-h-[25vh]'
        >
          <div className='flex flex-col items-center gap-3'>
            <div><MdErrorOutline size={26} /></div>
              這張圖片正在使用中，被指定為頭像或banner,請先取消指定，再進行操作。
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
      if (scrollTop + clientHeight+300 >= scrollHeight) {
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
          { isStorageDataLoading&& <motion.div 
              className='bg-gray-900 border border-white/0 absolute   rounded-md p-4 box-border text-white  top-[20%] left-1/2 -translate-x-1/2'
              initial={{ opacity: 0, y: -20,x:'-50%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              >
                資料處理中
              </motion.div>
          }
          {show && <ConfirmCancelMsg setShow={setShow} />  }

          {!imagesResults ?
          <div className='text-white'>Loading</div> 
          : 
          <div className='grid grid-cols-2 md:grid-cols-4 gap-3 pb-3'>
            {imagesResults.map((image,index) => {
              const {id, urls, created_at, display_home,title   } = image
              return (
                <motion.div key={'storage-'+id} 
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
                      <button  className='rounded-full bg-gray-800/80 p-2'><MdMoreVert size={15} /></button>
 
                    </div>
                    <div className='flex justify-end gap-1 p-1'>
                      <button  className=' flex items-center   text-sm bg-white text-black  rounded-full   p-2 border border-white/30 ' onClick={()=>onHandleRemoveStorage(image)}>
                        <MdRemove />
                      </button>
                      <button className={'rounded-full p-2 flex  items-center border border-white/30 ' + (display_home ?  ' bg-gray-800 text-white/80' : ' bg-white text-gray-800' )} onClick={()=>{
                        onHandleDisplayHome(image)
                      }}> <FaShare size={12}/></button>

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
                      >設定為背景</div>      
                      <div className='hover:bg-[#555] p-2 text-sm rounded-lg'
                        onClick={()=>{
                          handleClick(id)
                          onHandleSetAvatar(id)
                        }}
                      >設定為頭像</div>    
                      <div className='hover:bg-[#555] p-2 text-sm rounded-lg'>
                        刪除
                      </div>   
                      <div className='hover:bg-[#555] p-2 text-sm rounded-lg '
                        onClick={()=>{
                          handleClick(id)
                          setIsShowFormModal(true)
                          setImageData(image)
                          onHandleEditImageDetail(image)
                        }}
                      >編輯</div>              
                    </motion.div>
                    
                  </div>
                  <div className=' bg-gradient-to-t from-gray-900/80 flex items-center justify-between  gap-0 p-2 w-full  absolute bottom-0 text-white'>
                    <div className='text-sm'>
                      {title ?title : created_at.substr(0,10)}
                    </div>
                    <div className='text-white'>

                    </div>

                  </div>
                </motion.div>

              )

            })}

            </div>

        }
        {isFetchingNextPage && <div className='text-white/80 flex justify-center my-4 text-xs '>
            <div className='bg-gray-900 px-4 py-2 rounded-md'>載入更多..</div> 
          </div>}
    </div>
  )
}
export default Index