import React, { useState,useEffect }  from 'react'
import {motion} from 'framer-motion'
import { Link } from "react-router-dom";
import { FaHeart,FaBookmark,FaMinus } from "react-icons/fa";
import {  useRecoilValue ,useRecoilState } from 'recoil';
import { imageFormModalState, imageDataState,imageModalState,beforeDisplayModalState } from '../atoms/galleryAtom';
import {EmptyCollectionPage,ImageWithFallback,TitleWithLimit} from '../helpers/componentsHelper'
import { getAnalytics, logEvent } from "firebase/analytics";
import debounce from 'lodash.debounce';
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
function Index({title,images,imagesResults,currentProfile,handleRemoveCollection,totalImage,isFetchingNextPage,isBanned,fetchMoreImages,currentPage,totalPage}) {
  const [isShowFormModal, setIsShowFormModal] = useRecoilState(imageFormModalState)
  const [isShoDisplayFormModal, setIsShowDisplayFormModal] = useRecoilState(beforeDisplayModalState)
  const [isShowimageModal, setIsShowImageModal] = useRecoilState(imageModalState)
  const [imageData, setImageData] = useRecoilState(imageDataState)
  const [open, setOpen] = React.useState(false);
  const [currentItem, setCurrentItem] = React.useState({});
  const handleOpen = () => setOpen(!open);
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
  const analytics = getAnalytics();
  useEffect(()=>{
    logEvent(analytics, 'Profile_Collections頁面_進入訪問')
  },[])
  const onHandleRemoveCollection = (image)=>{
    handleRemoveCollection(image,'collectionPage')
    setOpen(!open)
  }
  const [lastScrollTime, setLastScrollTime] = useState(0);
  const handleScroll = () => {
    // 獲取頁面滾動相關信息
    
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      // 檢查是否滾動到頁面底部
      if (scrollTop + clientHeight +300  >= scrollHeight ) {
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
  }, [currentPage,totalPage]); // 空依賴數組，只在組件初次渲染時設置監聽器  
  if(totalImage === 0) {
    return <div>
      <div className='text-white text-xl font-bolds  md:text-left md:text-3xl  mb-4'>{title} <div className='text-xs text-white/50'>{totalImage} items</div>  </div>
      <EmptyCollectionPage />
    </div>
  }

  return (
    <div >
        <Dialog
          open={open}
          size={"xs"}
          handler={handleOpen}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
          className='bg-gray-900'
        >
          <DialogHeader className='text-lg text-white/80'>移除這張收藏</DialogHeader>
          <DialogBody 
      
            className=' text-white '>
            此動作不會直接從算圖圖庫中刪除圖片，僅為移除收藏。你確定要將圖片移除收藏嗎？
          </DialogBody>
          <DialogFooter className='border-t border-gray-600'>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>取消</span>
            </Button>
            <Button variant="gradient" color="" onClick={()=>onHandleRemoveCollection(currentItem)}>
              <span>確認</span>
            </Button>
          </DialogFooter>
        </Dialog>
      <div className='text-white text-xl font-bolds  md:text-left md:text-3xl  mb-4'>{title} <div className='text-xs text-white/50'>{totalImage} items</div>  </div>
      {!imagesResults ?
        <div className='text-white'>Loading</div> 
        : 
        <div className='grid grid-cols-2 md:grid-cols-6 gap-3 pb-3'>
          {imagesResults.map((image,index) => {
            const {id, urls, created_at, filename,title,author   } = image
            return (
              <motion.div key={id} 
                variants={imageVariants} initial="hidden" animate="visible" transition={{ delay: index * 0.1 }}
                className=' rounded-lg  relative w-full aspect-square  object-cover '
              >
                <div className='pt-[100%] relative'>
                  <picture>
                    <source  
                      src={urls.thumb+'?format=webp&width=300'} alt={image?.description} 
                      data-id={id}
                      className=' absolute top-1/2 left-0 -translate-y-1/2 object-cover w-full h-full rounded-md'
                      onClick={() => {
                        setImageData(image)
                        setIsShowImageModal(true)
                      }}
                      type='image/webp' 
                    />
                    <img  
                      src={urls.thumb+'?width=300'} alt={image?.description} 
                      data-id={id}
                      className=' absolute top-1/2 left-0 -translate-y-1/2 object-cover w-full h-full rounded-md'
                      onClick={() => {
                        setImageData(image)
                        setIsShowImageModal(true)
                      }} 
                    />
                  </picture>

                </div>
                
                <div className='  flex flex-col justify-between  gap-0 p-2 w-full    text-white'>
                  <div className='text-sm'>
                    <TitleWithLimit title={title} maxLength={12}/>
                  </div>
                  <div className='flex justify-between items-center '>
                    <div className='text-sm flex items-center mt-1 space-x-2    text-white'>
                      <Link to={`/user/${author?.id}`}  className='w-8' >
                        <div className='pt-[100%] relative'>
                          <ImageWithFallback src={author?.profile_image} alt="user avatar" />
                          {/* <img src={author?.profile_image} alt="user avatar" className='absolute aspect-square top-1/2 left-0 -translate-y-1/2 object-cover w-full h-fulls rounded-full'/> */}
                        </div>
                      </Link>
                      <div className='text-xs text-white/50'>{author?.name}</div>

                    </div>

                    <div className='flex gap-4'>
                      <Button 
                        className='p-0 flex items-center gap-1  text-sm  cursor-pointer ' 
                        onClick={()=> {handleOpen(); setCurrentItem(image); }}
                        disabled={isBanned}
                        >
                        
                        <div className=' relative mr-1'>
                          <div className=' absolute -top-1 -right-1 rounded-full bg-black p-[1px]'><FaMinus  size={10} /></div>

                          <FaBookmark />
                        </div>
                        移除
                      </Button>
                    </div>
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