import React, { useState, useEffect,useRef } from 'react';
import {motion,AnimatePresence} from 'framer-motion'
import { MdOutlineNewReleases,MdModeComment,MdAlarm } from "react-icons/md";
import { FaHeart,FaRegHeart,FaRegComment,FaComment,FaBookmark,FaRegBookmark } from "react-icons/fa";
import { Link } from "react-router-dom";
import {LoadingLogoSpin,TitleWithLimit,recordPageUrl,CallToLoginModal} from '../helpers/componentsHelper'
import {getStoredLocalData,useGalleries,useCollectionImageMutation,useDelACollectionImageMutation,useLikeImageMutation,useDelLikedImageMutation} from '../helpers/fetchHelper'
import {  useRecoilValue ,useRecoilState } from 'recoil';
import { isLoginState,loginState, imageModalState,lineProfileState,userState} from '../atoms/galleryAtom';
import moment from 'moment';
import ImgFilter from '../Components/ImgFilter';
import debounce from 'lodash.debounce';
import { useQuery, useInfiniteQuery,QueryClient,useQueryClient,useMutation } from 'react-query';
import Masonry from 'react-masonry-css';
import InfiniteScroll from 'react-infinite-scroll-component';
const filterDateItem = [
  {title:'24 hr',type:'時間區間',command:'days',value:'1'},
  {title:'7 天',type:'時間區間',command:'days',value:'7'},
  {title:'30 天', type:'時間區間',command:'days',value:'30'},
  {title:'全部',type:'時間區間',command:'days',value:'all'}
]
const filterModelsDate = [
  {title:'全部',type:'Models',command:'models',value:'all'},
  {title:'插畫 CT',type:'Models',command:'models',value:'ct'},
  {title:'寫實 PR',type:'Models',command:'models',value:'pr'},
  {title:'漫畫 CM', type:'Models',command:'models',value:'cm'},
  {title:'寫實人像 PC',type:'Models',command:'models',value:'pc'},
  {title:'XL',type:'Models',command:'models',value:'xl'}
 ]
function Index() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginState);
  const [lineProfile, setLineProfile] = useRecoilState(lineProfileState);
  const [linLoginData, setLineLoginData] = useRecoilState(loginState)
  const [currentUser, setCurrentUser] = useRecoilState(userState)

  const [totalPage, setTotalPage]= useState(0)
  const [currentPage, setCurrentPage]= useState(1)
  const [pageSize, setPageSize] = useState(12)
  const [startDate, setStartDate] = useState(moment().format('2022-01-01'))
  const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'))
  const [currModels, setCurrModels] = useState('all')
  const [loading, setLoading] = useState(false);

  const [ isLoginForCollection , setIsLoginForCollection] = useState(false)
  const [ isCollected ,setIsCollected] = useState(false)
  const [ isLoginForFuns , setIsLoginForFuns] = useState(false)


  // const [data, setData] = useState(null)
  const [isShowimageModal, setIsShowImageModal] = useRecoilState(imageModalState)
  const [isInitialized, setIsInitialized] = useState(false);
  // const [imageData, setImageData] = useRecoilState(imageDataState)
  const imageVariants = {
    hidden: { opacity: 0, },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  // 在此處檢查 localStorage 內的資料
  useEffect(() => {
    getStoredLocalData().then(data => {
      setIsLoggedIn(data.isLogin);
      setLineLoginData(data.loginToken);
      setLineProfile(data.lineProfile);
      setCurrentUser(data.currentUser);
      setIsInitialized(true);

    });
  }, [setLineLoginData,setCurrentUser]);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    refetch,
  } = useGalleries(linLoginData, pageSize, startDate, endDate, currModels, isInitialized, isLoggedIn);

  const imageData = data?.pages?.flatMap((pageData) => pageData.results) ?? [];

  //ADD Collection
  const collectionAImageMutation = useCollectionImageMutation(linLoginData, ['galleries', linLoginData, startDate, currModels]);
  //DEL Collection 
  const unCollectionAImageMutation = useDelACollectionImageMutation(linLoginData, ['galleries', linLoginData, startDate, currModels]);
  //ADD LIKE
  const likeAImageMutation = useLikeImageMutation(linLoginData, ['galleries', linLoginData, startDate, currModels]);
  //DEL LIKE
  const unLikeAImageMutation = useDelLikedImageMutation(linLoginData, ['galleries', linLoginData, startDate, currModels]);

  const handleLike = async(image,is_like)=>{
    if(!isLoggedIn){
      //  console.log(isLoggedIn)
      setIsLoginForFuns(true)
      }else{
        // console.log(imageData)
        if(is_like){
          unLikeAImageMutation.mutateAsync({image})
        }else{
          likeAImageMutation.mutateAsync({image})
  
        }
        setIsLoginForFuns(false)
      }
  }
  //COLLECTION
  const handleCollection = async (image,is_collection)=>{
    if(!isLoggedIn){
    //  console.log(isLoggedIn)
    setIsLoginForFuns(true)
    }else{
      // console.log(imageData)
      if(is_collection){
        unCollectionAImageMutation.mutateAsync({image})
      }else{
        collectionAImageMutation.mutateAsync({image})

      }
      setIsLoginForFuns(false)
    }
    
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
  const handleSelectDate = (value,date)=>{
    console.log(date)
    setCurrentPage(1)
    setPageSize(12)
    setStartDate(date)
  }
  const handleSelectModels = (value)=>{
    setCurrentPage(1)
    setPageSize(12)
    setCurrModels(value)
  }




  return (
    <div className='w-full '>
      <AnimatePresence>
      {isLoginForFuns && <CallToLoginModal closeModal={()=>setIsLoginForFuns(false)}/>}
      </AnimatePresence>
      <div className=''>
          {!imageData ? 
            <LoadingLogoSpin />
          :
          <div>
            <div className='flex items-center mt-6 mb-4 gap-2  justify-between w-full   '>
                <div className='flex space-x-2  overflow-x-auto scrollbar scrollbar-thin scrollbar-none   '>
                  <div className='flex  space-x-3'>
                    {
                      filterModelsDate.map((item,index)=>{
                        return(
                          <button 
                          key={item.title} 
                          className={`px-3 py-2 text-xs md:text-sm font-semibold  rounded-full hover:brightness-110 ${currModels === item.value ? 'bg-gray-200 text-black' : ' bg-gray-800 text-white'}`}
                          onClick={()=>{
                            onHandleSelectModels(item)
                          }}
                        ><span className='  whitespace-nowrap'>{item.title}</span> </button>
                        )
                      })
                    }
                  </div>

                </div>
                <ImgFilter filterItems={filterDateItem} defaultIndex={3} onHandleSelect={onHandleSelectDate} icon="MdAccessTime"/>
           

            </div>
            {
              imageData.length === 0 && <div className='text-white/60 text-sm my-6 text-center'>這個選擇下目前沒有圖片。</div>
            }
            <InfiniteScroll
              dataLength={imageData ? imageData.length:0}
              next={()=>fetchNextPage()}
              hasMore={hasNextPage}
              loading={<div className='bg-gray-900 px-4 py-2 rounded-md'>載入更多..</div> }
            >
                         <Masonry
              breakpointCols={{
                default: 5,
                1024: 4,
                500: 2,
              }}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {imageData.map((image,index)=>{
                const {id, urls, created_at, display_home, filename,is_storage,is_collection,is_like,title,author,is_user_nsfw,is_nsfw,likes,comments } = image
                return (
                  <motion.div key={'gallery-'+index} 
                    variants={imageVariants} initial="hidden" animate="visible" transition={{ delay: index * 0.1 }}
                    className='  overflow-hidden relative  mb-5'
                  >
                    <Link to={`/post/${id}`} className=' relative group' onClick={recordPageUrl}>
                      <div className=' relative overflow-hidden   rounded-md'>
                        <img  
                          alt={title}
                          src={urls.thumb}
                          data-id={id}
                          className={` object-cover w-full hover:scale-110 transition duration-300 ${is_user_nsfw || is_nsfw ? '  blur-xl  '  : ' blur-0 ' }`}
  
                        />
                      </div>


                      <div>
                        
                      </div>
                    </Link>



                    <div className=' flex flex-col  mt-2 w-full   text-white'>
                      <div className='flex flex-col'>
                        <div className=' text-base font-semibold '><TitleWithLimit title={title} maxLength={12}/> </div>
                      </div>
                      <div className='flex justify-between items-center px-1'>

                        <div className='text-sm flex items-center mt-1 space-x-3 w-full   text-white'>
                          <Link to={`/user/${author?.id}`}  className='w-8' onClick={recordPageUrl}>
                            <div className='pt-[100%] relative'>
                              <img src={author?.profile_image} alt="user avatar" className='absolute aspect-square top-1/2 left-0 -translate-y-1/2 object-cover w-full h-fulls rounded-full'/>
                            </div>
                          </Link>
                          <div className='text-xs text-white/50'>{author?.name}</div>
      
                        </div>
                        <div className='ml-auto flex gap-1 justify-end items-center text-white   transition duration-700 '>
                          <div className='flex items-center space-x-3 text-sm'>
                            <div className='flex items-center  space-x-1 cursor-pointer' onClick={()=>handleLike(image,is_like)}>{is_like ?<FaHeart color="red" />  :<FaRegHeart /> }<span>{likes}</span></div>
                            <div className='flex items-center  space-x-1 cursor-pointer'onClick={()=>handleCollection(image,is_collection)}>
                            {is_collection ?<FaBookmark color="gold" />  :<FaRegBookmark  /> }<span></span></div>
                            
                          </div>



                        </div>
                      </div>




                    </div>



                  </motion.div>

                )
                })}


            </Masonry>


            </InfiniteScroll>


          </div>


          }
         


 
       
      </div>


    </div>
  )
}

export default Index