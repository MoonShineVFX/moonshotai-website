import React, { useState, useEffect }  from 'react'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import {motion,AnimatePresence} from 'framer-motion'
import { FiHeart } from "react-icons/fi";
import { FaShareSquare,FaShare,FaPlus } from "react-icons/fa";
import { MdBookmark,MdMoreVert,MdBookmarkBorder,MdAddCircle,MdRemoveCircle,MdKeyboardArrowDown,MdAdd,MdRemove } from "react-icons/md";
import {getWordFromLetter} from '../helpers/fetchHelper'
import {  useRecoilValue ,useRecoilState } from 'recoil';
import { imageFormModalState, imageDataState,imageModalState,beforeDisplayModalState,profilePageState } from '../atoms/galleryAtom';
import { EmptyRenderPage } from '../helpers/componentsHelper';
import ImgFilter from '../Components/ImgFilter';
import moment from 'moment';
import debounce from 'lodash.debounce';
const filterDateItem = [
  {title:'24 小時',type:'時間區間',command:'days',value:'1'},
  {title:'7 天',type:'時間區間',command:'days',value:'7'},
  {title:'30 天', type:'時間區間',command:'days',value:'30'},
  {title:'全部',type:'時間區間',command:'days',value:'all'}
]
const filterModelsDate = [
  {title:'全部',type:'Models',command:'models',value:'all'},
  {title:'插畫 CT',type:'Models',command:'models',value:'ct'},
  {title:'寫實 PR',type:'Models',command:'models',value:'pr'},
  {title:'漫畫 CM', type:'Models',command:'models',value:'cm'},
  {title:'寫實人像 PC',type:'Models',command:'models',value:'pc'}
 ]


function Index({title,images,imagesResults,handleCollection,handleStorage,handleRemoveStorage,fetchMoreImages,currentPage,totalPage,totalImage,handleSelectDate,handleSelectModels,isAddStorageLoading,isRemoveStorageLoading}) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)
  const [openItems, setOpenItems] = useState([]);
  const [isShowFormModal, setIsShowFormModal] = useRecoilState(imageFormModalState)
  const [isShowimageModal, setIsShowImageModal] = useRecoilState(imageModalState)
  const [imageData, setImageData] = useRecoilState(imageDataState)
  const [profilePage, setProfilePage] = useRecoilState(profilePageState)
  const [isShoDisplayFormModal, setIsShowDisplayFormModal] = useRecoilState(beforeDisplayModalState)
  // console.log('renderpage',imagesResults)
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
      // handleUpdate(image.id,newData)
      handleRemoveStorage(newData)
    }else {
      const newData = { ...image, is_storage: !image.is_storage  }; 
      // handleUpdate(image.id,newData)
      handleStorage(newData)
    }

  }
  const onHandleDisplayHome = (image)=>{
    console.log(image)
    const items = {
      display_home:!image.display_home
    }
    setIsShowDisplayFormModal(true)
    setImageData(image)
    setProfilePage('on_Renderpage')

  }

  const onHandleCollection = (image) =>{
    handleCollection(image)
    // if(image.is_storage === true) return
    // const newData = { ...image, is_storage: !image.is_storage  }; 
    // handleUpdate(image.id,newData)
  }
  const onHandleSelectDate = (item)=>{
    // console.log(item)
    switch (item.value) {
      case '1':
        const oneDayAgo = moment().subtract(1, 'days').format('YYYY-MM-DD');
        handleSelectDate(item.value,oneDayAgo)
        break;
      case '7':
        const sevenDaysAgo = moment().subtract(7, 'days').format('YYYY-MM-DD');
        handleSelectDate(item.value,sevenDaysAgo)
        break;
      case '30':
        const thirtyDaysAgo = moment().subtract(30, 'days').format('YYYY-MM-DD');
        handleSelectDate(item.value,thirtyDaysAgo)
        break;   
      case 'all':
        handleSelectDate(item.value,'2022-01-01')
          break; 
      default:
        handleSelectDate('all','2022-01-01')
        break;
    }

  }
  const onHandleSelectModels = (item)=>{
    // console.log('click')
    handleSelectModels(item.value)
  }

  const toggleDropdown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const [lastScrollTime, setLastScrollTime] = useState(0);
  const handleScroll = () => {
    // 獲取頁面滾動相關信息
    
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      // 檢查是否滾動到頁面底部
      if (scrollTop + clientHeight +100  >= scrollHeight ) {
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
      <EmptyRenderPage />
    </div>
  }


  return (
    <div >
        {/* {
          (()=>{
            const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
            return (
              <div className=' fixed top-2 left-2 bg-black/60 text-white z-50'>

             
                <div>scrollTop:{scrollTop} </div>
                <div>clientHeight:{clientHeight} </div>
                <div>scrollHeight:{scrollHeight}</div>
              </div>
            )
          })()
        } */}
      <div className='text-white text-xl font-bolds  md:text-left md:text-3xl  mb-4'>
        {title} <div className='text-xs text-white/50'>{totalImage} items</div>  
        <div className='text-xs text-white/50'>此區圖片的保存期限為 90 天，如您需要永久保存圖片，可以將圖片下載或是點選〔加入留存〕存放至【 Storage 】。</div>
      </div>
      { isAddStorageLoading&& <motion.div 
              className='bg-zinc-900 border border-white/0 absolute   rounded-md p-4 box-border text-white  top-[20%] left-1/2 -translate-x-1/2'
              initial={{ opacity: 0, y: -20,x:'-50%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              >
                資料處理中
              </motion.div>
      }

      <div className='flex items-center mt-6 mb-4 gap-2  justify-end w-full '>
        <ImgFilter filterItems={filterModelsDate} defaultIndex={0} onHandleSelect={onHandleSelectModels}/>
        <ImgFilter filterItems={filterDateItem} defaultIndex={2} onHandleSelect={onHandleSelectDate}/>
      </div>
      {
        imagesResults.length === 0 && <div className='text-white/60'>沒有圖片。</div>
      }
      {!imagesResults ?
        <div className='text-white'>Loading</div> 
        : 
          <div className='grid grid-cols-2 md:grid-cols-4 gap-3 pb-16'>
          {imagesResults.map((image,index) => {
            const {id, urls, created_at, display_home, filename,is_storage   } = image
            return (
              <motion.div key={'render-'+index} 
                variants={imageVariants} initial="hidden" animate="visible" transition={{ delay: index * 0.1 }}
                className=' overflow-hidden relative border border-white/20 rounded-md '
              >
                <div className='pt-[100%] relative'>
                  <img  
                    src={urls.thumb} alt={image?.description} 
                    data-id={id}
                    className=' absolute top-1/2 left-0 -translate-y-1/2 object-cover w-full h-full '
                    onClick={() => {
                      setImageData(image)
                      setIsShowImageModal(true)
                    }} 
                  />
                  <div className='text-xs text-white/90 absolute bottom-0  bg-zinc-800/40 w-full p-1'>
                      {created_at.substr(0,10)}
                  </div>
                </div>
                <div className='flex justify-end gap-1 p-1 absolute top-0 right-0'>
                  <div className={'  flex items-center  justify-center text-xs rounded-full  p-2  mt-1   ' + (is_storage ? '  bg-white text-[#423EF5] ' : ' bg-white text-[#423EF5]' )} onClick={()=>onHandleStorage(image)}>
                    {
                      is_storage ? 
                      <button disabled={isRemoveStorageLoading} className=' flex items-center  justify-center gap-1 ' >
                        <MdRemove />
                      </button>
                      :
                      <button disabled={isAddStorageLoading}  className='flex items-center  justify-center gap-1'>
                        <MdAdd  />
                      </button>
                    }
                  </div>
                  <div className={' flex items-center  justify-center text-xs rounded-full  p-2  mt-1 ' + (display_home ? ' bg-[#423EF5]   text-white   ' : '   bg-white text-[#423EF5]' ) } onClick={()=>onHandleDisplayHome(image)}>

                    <button 
                      disabled={isAddStorageLoading}  className='flex items-center  justify-center' >
                      <FaShare />
                    </button>
                      
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