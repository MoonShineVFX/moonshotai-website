import React,{useState,useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {motion,AnimatePresence} from 'framer-motion'
import { useParams,useNavigate,Link } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { imageDataState,loginState,isLoginState,lineProfileState,userState,formStatusState,commentDataState } from '../atoms/galleryAtom';
import {getWordFromLetter,fetchGalleries,getStoredLocalData,userCollectionAImage,userDelACollectionImage,refreshToken,fetchUserCollections,fetchComments,userPostCommentToImage,userPatchCommentToImage,fetchUserStorages,fetchGalleriesDetail,userClickCopyPrompt,fetchImageCopyPromptTime,removeLocalStorageItem} from '../helpers/fetchHelper'
import {SharePostModal ,CallToLoginModal,CommentDataFormat,LoadingLogoFly,LoadingLogoSpin,TitleWithLimit,recordPageUrl,getCookieValue} from '../helpers/componentsHelper'
import { MdKeyboardArrowLeft,MdOutlineShare,MdModeComment } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";
import Header from '../header'
import moment from 'moment';
import EditCommentForm from '../Components/EditCommentForm';
import { useQuery, useMutation,useInfiniteQuery } from 'react-query';
function Post() {
  const { id } = useParams();
  const [imageData, setImageData] = useState(null)
  const [comments, setComments] = useState([])
  const [commentsResults, setCommentsResults] = useState([])
  const [storages, setStorages] = useState({});
  const [storagesResults, setStoragesResults] = useState([]);
  const currentLoginData = useRecoilValue(loginState)
  const isCurrentLogin = useRecoilValue(isLoginState)

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lineProfile, setLineProfile] = useState({});
  const [linLoginToken, setLineLoginToken] = useState('')
  const [currentUser, setCurrentUser] = useState({})
  const [formStatus, setFormStatus] = useRecoilState(formStatusState);
  const [currentComment, setCurrentComment] = useRecoilState(commentDataState);
  const [ isCopied , setIsCopied ] = useState(false);

  const [ isLoginForCollection , setIsLoginForCollection] = useState(false)
  const [ isLoginForComment , setIsLoginForComment] = useState(false)
  const [ isShareModel , setIsShareModal] = useState(false)
  const [ isCollected ,setIsCollected] = useState(false)
  const [ isCommentModal, setIsCommentModal]= useState(false)
  const [ isHaveUserComment , setIsHaveUserComment] = useState(false)

  const [currentStoragePage, setCurrentStoragePage]= useState(1)
  const [startDate, setStartDate] = useState(moment().subtract(30, 'days').format('YYYY-MM-DD'))
  const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'))
  const [currModels, setCurrModels] = useState('all')
  const [currentHeaders , setCurrentHeaders] = useState({})

  const [totalPage, setTotalPage]= useState(0)
  const [pageSize, setPageSize] = useState(12)
  const navigate = useNavigate();
  const [isGoingBack, setIsGoingBack] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const handleBackClick = () => {
    const savedPageUrl = getCookieValue("pageUrl");

    if (savedPageUrl !== null &&savedPageUrl.includes(window.location.hostname)) {
      navigate(-1); 
    } else {
      navigate('/gallery'); 
    }
  };

  useEffect(()=>{
    getStoredLocalData().then(localData=>{
        setIsLoggedIn(localData.isLogin)
        setLineLoginToken(localData.loginToken)
        setLineProfile(localData.lineProfile)
        setCurrentUser(localData.currentUser)
        setIsInitialized(true);


      })
  },[setIsLoggedIn,setLineLoginToken,setLineProfile])
  
  const { data: galleryData, isLoading: isGalleryDataLoading, isError: isGalleryDataError } = useQuery(
    ['galleryDetail',linLoginToken,id],
    () => fetchGalleriesDetail(linLoginToken, id),
    {
      enabled:isInitialized && (linLoginToken !== null || isLoggedIn !== null),
      onError: () => {
        // 發生錯誤時處理
      },
      onSuccess: (gData) => {
        // 成功獲取數據後處理
        setImageData(gData);
        fetchComments(gData).then(data => {
          setComments(data);
          setCommentsResults(data.results);
          const isUserid = data.results.some((item, index) => {
            return item.author.id === currentUser.id;
          });
          setIsHaveUserComment(isUserid);
        });
      },
    }
  );
  const { data: userCollection, isLoading: isUserCollectionLoading, isError: issUserCollectionError } = useQuery(
    ['userCollections', currentUser,linLoginToken],
    () => fetchUserCollections(currentUser.id, linLoginToken),
    {
      enabled: isLoggedIn === true, 
      onError: () => {
        // 發生錯誤時處理
      },
      onSuccess: (uData) => {
        // 成功獲取數據後處理
        const findCollectionId = uData.results.some((item)=>{
          return item.id === parseInt(id)
        })
        if(findCollectionId){
          setIsCollected(true)
        }else{
          setIsCollected(false)
        }

      },
    }
  );
  // FETCH Storage IMAGE to PAGE 
  const { data: storageData, isLoading:isStorageDataLoading, fetchNextPage:fetchStorageNextPage, hasNextPage:hasStorageNextPage, isFetchingNextPage:isFetchStorageNextPage, isError:isStorageDataError, refetch:storageDataRefetch } = useInfiniteQuery(
    [ 'storageData',currentUser],
    ({ pageParam }) =>
    fetchUserStorages(currentUser.id, linLoginToken, pageParam, pageSize, startDate, endDate, currModels),
    {
      enabled: isCommentModal,
      getNextPageParam: (lastPage, pages) =>{
        // 檢查是否有下一頁
        if (lastPage.next) {
          const url = new URL(lastPage.next);
          const nextPage = url.searchParams.get("cursor");
          return nextPage ? nextPage : undefined;
        }
        return undefined;
        }
    }
  );
  const storageImages = storageData?.pages?.flatMap((pageData) => pageData.results) ?? [];





  const handleCollection = ()=>{
    console.log('click')
    if(!isLoggedIn){
    //  console.log(isLoggedIn)
     setIsLoginForCollection(true)
    }else{
      // console.log(imageData)
      if(isCollected){
        userDelACollectionImage(imageData.id,linLoginToken)
          .then((data)=> {
            if(data.status===204){
              setIsCollected(false)
              setImageData( {...imageData, likes: imageData.likes-1 })
            
            }
          })
          .catch((error) => console.error(error));
      }else{
        userCollectionAImage(imageData,linLoginToken)
          .then((data)=> {
            if(data.status===200){
              setIsCollected(true)
              setImageData( {...imageData, likes: imageData.likes+1 })
            }
          })
          .catch((error) => console.error(error));
      }
      setIsLoginForCollection(false)
    }
    
  }




  const handleComment = (item)=>{
    // console.log('click')
    // console.log(isHaveUserComment)
    if(!isLoggedIn){
      // console.log(isLoggedIn)
      setIsLoginForComment(true)
     }else{
      if(isHaveUserComment){
        toast('請使用編輯的方式，編輯你的評論內容。', {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      }else{
        setFormStatus('ADD')
        setCurrentComment(null)
        setIsCommentModal(true)
        setIsLoginForComment(false)
        // fetchUserStorages(currentUser.id,linLoginToken,currentStoragePage,pageSize)
        //   .then((images)=> {
        //       setStorages(images)
        //       setStoragesResults(images.results)
        //       // console.log(images)
        //   })
        //   .catch((error) => console.error(error));
      }

     }
  }
  const handleEditComment = ()=>{
    setIsCommentModal(true)
    setIsLoginForComment(false)
    // fetchUserStorages(currentUser.id,linLoginToken,currentStoragePage,pageSize)
    //   .then((images)=> {
    //       setStorages(images)
    //       setStoragesResults(images.results)
    //       // console.log(images)
    //   })
    //   .catch((error) => console.error(error));
  }
  const handleSendComment= (data)=>{
    // console.log(data)
    userPostCommentToImage(imageData,data,linLoginToken)
      .then(data=>{
        setIsCommentModal(false)
        fetchComments(imageData).then(data=>{
          // console.log(data)
          setComments(data)
          setCommentsResults(data.results)
          const isUserid = data.results.some((item,index)=>{
            return item.author.id === currentUser.id
          })
          setIsHaveUserComment(isUserid)
        })
      })
      .catch((error) => console.error(error));
  }
  const handleSaveEditComment = (id,data)=>{
    // console.log(id,data)
    userPatchCommentToImage(id,data,linLoginToken)
      .then(data=>{
        setIsCommentModal(false)
        fetchComments(imageData).then(data=>{
          // console.log(data)
          setComments(data)
          setCommentsResults(data.results)
          const isUserid = data.results.some((item,index)=>{
            return item.author.id === currentUser.id
          })
          setIsHaveUserComment(isUserid)
        })
      })
      .catch((error) => console.error(error));
  }
  const handleSelectStorageImage = ()=>{
    fetchUserStorages(currentUser.id,currentStoragePage,pageSize,linLoginToken)
        .then((images)=> {
            setStorages(images)
            setStoragesResults(images.results)
            // console.log(images)
        })
        .catch((error) => console.error(error));
  }

  const handleShare = ()=>{
    setIsShareModal(true)
     
  }
  
  const handleCopyPrompt=(model,prompt,negative_prompt)=>{
    const text = getWordFromLetter(model) +' '+prompt+(negative_prompt && ' --'+negative_prompt);
    navigator.clipboard.writeText(text);
    fetchImageCopyPromptTime(imageData,linLoginToken)
    setIsCopied(true)
  }

  if (!imageData) {
    return (
        <LoadingLogoSpin />  
    );
  }

  return (
    <div>
      {/* <Header currentUser={currentUser} isLoggedIn={isLoggedIn}/> */}
      <AnimatePresence>
      {isLoginForCollection && <CallToLoginModal closeModal={()=>setIsLoginForCollection(false)}/>}
      {isLoginForComment && <CallToLoginModal closeModal={()=>setIsLoginForComment(false)}/>}
      {isShareModel && <SharePostModal closeModal={()=>setIsShareModal(false)}/>}
      {isCommentModal&& <EditCommentForm handleSendComment={handleSendComment} handleSaveEditComment={handleSaveEditComment}  closeModal={()=>setIsCommentModal(false)} storagesResults={storageImages} handleSelectStorageImage={handleSelectStorageImage}/>}
      </AnimatePresence>
      <ToastContainer />

      {!imageData ?
      <div className='text-white'>Loading</div> 
      :
      <>
        <div className="w-full md:w-12/12  space-x-0  md:space-x-10 mx-auto  text-white relative flex flex-col md:flex-row">
          <div className="flex flex-col  justify-center items-center md:justify-start  max-w-full md:py-6 max-h-[100vh] relative ">
              <div className='w-full  '>
                <img 
                  data-id= {imageData?.id}
                  src={imageData?.urls?.regular} 
                  alt={imageData?.title} 
                  className="w-[100vw] h-full max-h-[80vh] object-contain" />
              </div>
              <button onClick={handleBackClick} className='absolute top-3 left-3 text-white rounded-full  bg-zinc-700 '>
              <MdKeyboardArrowLeft size={32} />
              </button>
              <div className=' flex justify-center items-center my-4 space-x-2'>
                <button 
                  className='bg-zinc-700 text-white text-sm px-4 py-2 rounded-full flex items-center justify-center space-x-2 '
                  onClick={()=>handleCopyPrompt(imageData.model,imageData.prompt,imageData.negative_prompt)}
                  ><IoCopyOutline /> <div>Copy Prompt</div> {isCopied && <span className='text-xs'> Copied! </span>}
                </button>
                <div className=' flex rounded-full bg-zinc-700 space-x-6 px-4 py-2'>
                  <button className='flex items-center space-x-2 ' onClick={handleCollection}>
                    <FaHeart size={15} className={ isCollected ? ' text-rose-400' : ' text-white'} /> <span className='text-sm'>{imageData.likes}</span>
                  </button>
                  <button className=' ' onClick={handleComment}>
                    <MdModeComment className={isHaveUserComment ?  ' text-yellow-400' : ' text-white' } size={15} />
                  </button>
                  <button className='' onClick={handleShare}>
                    <MdOutlineShare size={15} />
                  </button>
                </div>
              </div>
          </div>

          <div className='w-full md:basis-[480px] md:w-full p-4 '> 
            <div className=' flex justify-between items-center flex-wrap'>
              <div className='text-xl text-white font-semibold w-full my-2' data-id={imageData?.id}>
                <TitleWithLimit title={imageData?.title} />
              </div>
              <div>
                <div className=' flex items-center space-x-3 my-2'>
                  <Link to={`/user/${imageData?.author?.id}`} className='flex items-center space-x-2' onClick={recordPageUrl}>
                    <div className='w-7'>
                      <div className='pt-[100%] relative'>
                        <img src={imageData?.author?.profile_image} alt="user avatar" className='absolute aspect-square top-1/2 left-0 -translate-y-1/2 object-cover w-full h-fulls rounded-full border border-zinc-400'/>
                      </div>
                    </div>
                    <div className='text-white/80 text-sm'>{imageData?.author?.name}</div>
                  </Link>
                </div>
              </div>

              <div className=' text-white/60 text-xs'>{imageData?.created_at && imageData?.created_at.substr(0,10)}  Model - {getWordFromLetter(imageData?.model)}   </div> 
            </div>



            <div className='w-full md:w-full flex flex-col justify-end  relative pb-12 pt-'>
              
              <div className='text-white/70 font-bold my-3 pt-5'>Prompt 提示詞</div>
              <div className='bg-zinc-700 relative rounded-md whitespace-normal break-words max-h-32 overflow-hidden overflow-y-auto'>
                <div className='p-3 text-sm'>{imageData?.prompt}</div>
              </div>
              <div className='text-white/70 font-bold my-3 pt-5'>Negative prompt 反向提示詞</div>
              <div className='bg-zinc-700 relative rounded-md whitespace-normal break-words max-h-32 overflow-hidden overflow-y-auto'>
              <div className='p-3'>{imageData?.negative_prompt}</div>
              </div>
              <div className='mt-5 grid gap-4 grid-cols-2'>
                <div className='text-white font-bold my-1 flex flex-col gap-2'>
                  <div className='text-white/70'>Model</div>
                  <span className='bg-zinc-700 relative rounded-md whitespace-normal break-words font-normal'> 
                    <div className='p-2'>{getWordFromLetter(imageData?.model)} </div>
                  </span>
                </div>
                <div className='text-white font-bold my-1 flex flex-col gap-2'>
                  <div className='text-white/70'>Steps</div>
                  <span className='bg-zinc-700 relative rounded-md whitespace-normal break-words font-normal'> 
                    <div className='p-2'>{imageData?.steps}</div>
                  </span>
                </div>
                <div className='text-white font-bold my-1 flex flex-col gap-2'>
                  <div className='text-white/70'>Sampler_index</div>
                  <span className='bg-zinc-700 relative rounded-md whitespace-normal break-words font-normal'> 
                    <div className='p-2'>{imageData?.sampler_index}</div>
                  </span>
                </div>
                <div className='text-white font-bold my-1 flex flex-col gap-2'>
                  <div className='text-white/70'>Cfg_scale</div>
                  <span className='bg-zinc-700 relative rounded-md whitespace-normal break-words font-normal'> 
                    <div className='p-2'>{imageData?.cfg_scale}</div>
                  </span>
                </div>
                <div className='text-white font-bold my-1 flex flex-col gap-2'>
                  <div className='text-white/70'>Seed</div>
                  <span className='bg-zinc-700 relative rounded-md whitespace-normal break-words font-normal'> 
                    <div className='p-2'>{imageData?.seed}</div>
                  </span>
                </div>
              </div>
              {imageData?.description && 
                <div className='my- border-b border-white/30 pb-6 pt-6'>
                  <div className='text-white/70 font-bold my-1 '>Description</div>
                  <div className=' relative rounded-md whitespace-normal break-words '>
                    <div className='p-2'>{imageData?.description}</div>
                  </div>
                </div>
              }
              {/* Comment area */}
              <div className='mt-7'>
                <div className='text-white font-bold my-1 mb-4 text-center '>Discussion</div>
                {
                  commentsResults.length > 0 ?
            
                    commentsResults.map((item,index)=>{
                      // console.log(item)
                      const {author,text,created_at} = item
                      return(
                        <div className=' rounded-md bg-zinc-700 px-4 py-6 my-2'>
                          <div>
                            <div className='flex items-center gap-2'>
                              <div className='w-8'>
                                <div className='pt-[100%] relative'>
                                  <img src={author.profile_image} alt="user avatar" className='absolute top-1/2 left-0 -translate-y-1/2 object-cover w-full h-fulls rounded-full border border-zinc-400'/>
                                </div>
                              </div>
                              <div className='text-white'>{author?.name}</div>
                              <div className='text-sm ml-auto'>{created_at.substr(0,10)}</div>
                              {
                                author.id !== currentUser?.id ?   <div></div>  :  <div onClick={()=>{
                                  setFormStatus('EDIT')
                                  setCurrentComment(item)
                                  handleEditComment(item)
                                }}>Edit</div>
                              }

                            </div>
                          </div>
                          <div className='mt-4'>
                          <CommentDataFormat  data={text}/>
                          </div>
                        </div>
                      )
                    })
                  :
                  <div className='text-white/40 text-center'>No one has commented here yet. </div>

        
                }
              </div>
            </div>

          </div>

          <div className=' hidden flex left-0 space-x-2 justify-center items-center py-4 fixed bottom-0 z-50 w-full bg-zinc-800'>
            <button 
              className='bg-gray-600 text-white px-2 py-1 rounded-md w-1/2 '
              onClick={()=>handleCopyPrompt(imageData.model,imageData.prompt,imageData.negative_prompt)}
              >Copy Prompt {isCopied && <span className='text-xs'> Copied! </span>}</button>


          </div>
          
        </div>
      </>
      }

      
    </div>
  )
}

export default Post