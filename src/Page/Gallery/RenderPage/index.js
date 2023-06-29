import React, { useState, useEffect }  from 'react'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import {motion,AnimatePresence} from 'framer-motion'
import { FiHeart } from "react-icons/fi";
import { MdBookmark,MdMoreVert,MdBookmarkBorder,MdAddCircle,MdRemoveCircle,MdKeyboardArrowDown } from "react-icons/md";
import {getWordFromLetter} from '../helpers/fetchHelper'
import {  useRecoilValue ,useRecoilState } from 'recoil';
import { imageFormModalState, imageDataState,imageModalState } from '../atoms/galleryAtom';
import { EmptyRenderPage } from '../helpers/componentsHelper';
import ImgFilter from '../Components/ImgFilter';

const filterDateItem = [
  {title:'24 小時',type:'時間區間'},
  {title:'7 天',type:'時間區間'},
  {title:'30 天', type:'時間區間'},
  {title:'全部',type:'時間區間'}
]
const filterModelsDate = [
  {title:'全部',type:'Models'},
  {title:'插畫 CT',type:'Models'},
  {title:'寫實 PR',type:'Models'},
  {title:'漫畫 CM', type:'Models'},
  {title:'寫實人像 PC',type:'Models'}
 ]


function Index({title,images,imagesResults,handleUpdate,handleCollection,handleStorage,handleRemoveStorage,fetchMoreImages,currentPage,totalPage,totalImage}) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)
  const [openItems, setOpenItems] = useState([]);
  const [isShowFormModal, setIsShowFormModal] = useRecoilState(imageFormModalState)
  const [isShowimageModal, setIsShowImageModal] = useRecoilState(imageModalState)
  const [imageData, setImageData] = useRecoilState(imageDataState)

  const [currentFilterDateItem, setCurrentFilterDateItem] = useState(filterDateItem[1])

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
  const onHandleSelectDate = (item)=>{
    console.log('click')
  }
  const onHandleSelectModels = (item)=>{
    console.log('click')
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
  if(totalImage === 0) {
    return <div>
      <div className='text-white text-xl font-bolds  md:text-left md:text-3xl  mb-4'>{title} <div className='text-xs text-white/50'>{totalImage} items</div>  </div>
      <EmptyRenderPage />
    </div>
  }
  return (
    <div >
      <div className='text-white text-xl font-bolds  md:text-left md:text-3xl  mb-4'>
        {title} <div className='text-xs text-white/50'>{totalImage} items</div>  
      </div>

      <div className='flex items-center my-3 gap-2  justify-end w-full '>
        <ImgFilter filterItems={filterModelsDate} defaultIndex={0} onHandleSelect={onHandleSelectModels}/>
        <ImgFilter filterItems={filterDateItem} defaultIndex={1} onHandleSelect={onHandleSelectDate}/>
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
                className=' overflow-hidden relative'
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
                  <div className='text-xs text-white/90 absolute bottom-0  bg-zinc-800/40 w-full p-1'>
                      {created_at.substr(0,10)}
                  </div>
                </div>

                <div className={'  flex items-center  justify-center text-xs rounded-full  p-2 w-full mt-1   text-white' + (is_storage ? ' bg-zinc-500 ' : ' bg-zinc-700' )} onClick={()=>onHandleStorage(image)}>
                    {
                      is_storage ? 
                      <div className=' flex items-center  justify-center gap-1 ' >
                        <MdRemoveCircle /><span>移除留存</span>
                      </div>
                      :
                      <div className='flex items-center  justify-center gap-1'>
                        <MdAddCircle /> <span>加入留存</span>
                      </div>
                    }
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