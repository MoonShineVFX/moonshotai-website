import React,{useState,useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {motion,AnimatePresence} from 'framer-motion'
import { useParams,useNavigate,Link } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { imageDataState,loginState,isLoginState,lineProfileState,userState,formStatusState,commentDataState } from '../atoms/galleryAtom';
import {getWordFromLetter,fetchGalleries,getStoredLocalData,userCollectionAImage,userDelACollectionImage,refreshToken,fetchUserCollections,fetchComments,userPostCommentToImage,userPatchCommentToImage,fetchUserStorages,fetchGalleriesDetail,fetchImageCopyPromptTime,userLikeAImage,userDelALikedImage,fetchUserPublicImages,usePromptBuyMutation,fetchUserProfileData} from '../helpers/fetchHelper'
import {SharePostModal ,CallToLoginModal,CommentDataFormat,LoadingLogoSpin,TitleWithLimit,recordPageUrl,getCookieValue} from '../helpers/componentsHelper'
import { MdKeyboardArrowLeft,MdOutlineShare } from "react-icons/md";
import { FaHeart,FaRegHeart,FaCommentAlt,FaRegCommentAlt,FaBookmark,FaRegBookmark } from "react-icons/fa";

import { IoCopyOutline } from "react-icons/io5";
import Header from '../header'
import moment from 'moment';
import EditCommentForm from '../Components/EditCommentForm';
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Chip
} from "@material-tailwind/react";
import { useQuery, useMutation,useInfiniteQuery,useQueryClient, QueryClient } from 'react-query';
import { getAnalytics, logEvent } from "firebase/analytics";
function Post() {
  const { id } = useParams();
  const queryClient = useQueryClient();
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
  const [currentUser, setCurrentUser] = useRecoilState(userState)
  const [formStatus, setFormStatus] = useRecoilState(formStatusState);
  const [currentComment, setCurrentComment] = useRecoilState(commentDataState);
  const [ isCopied , setIsCopied ] = useState(false);

  const [ isLoginForCollection , setIsLoginForCollection] = useState(false)
  const [ isLoginForComment , setIsLoginForComment] = useState(false)
  const [ isShareModel , setIsShareModal] = useState(false)
  const [ isCollected ,setIsCollected] = useState(false)
  const [ isCommentModal, setIsCommentModal]= useState(false)
  const [ isHaveUserComment , setIsHaveUserComment] = useState(false)

  const [totalPage, setTotalPage]= useState(0)
  const [pageSize, setPageSize] = useState(12)
  const navigate = useNavigate();
  const [isGoingBack, setIsGoingBack] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  const handleOpen = () => setOpen(!open);
  const [open, setOpen] = React.useState(false);
  const [buyError, setBuyError] = useState(null);
  const handleBackClick = () => {
    const savedPageUrl = getCookieValue("pageUrl");

    if (savedPageUrl !== null &&savedPageUrl.includes(window.location.hostname)) {
      navigate(-1); 
    } else {
      navigate('/gallery'); 
    }
  };
  const analytics = getAnalytics();
  useEffect(()=>{
    logEvent(analytics, '單張圖頁面_進入',{
      imgid:id
    })
  },[])
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
  const { data:postsData , isLoading:isPostsDataLoading, isError:isPostsDataError} = useQuery(
    [ 'userPosts',currentUser],
    ({ pageParam }) =>
    fetchUserPublicImages(linLoginToken,currentUser.id, pageParam, pageSize),
    {
      enabled: isCommentModal,
    }
  );
  const postsImages =  postsData?.results || []
  //ADD Collection
  const collectionAImageMutation = useMutation((updatedData)=>
    {userCollectionAImage(updatedData.imageData,linLoginToken) },
    {
      onSuccess:(data,variables)=>{
        setImageData( {...imageData, is_collection: true })
        setIsCollected(true)
      }
    }
  )
  //DEL Collection 
  const unCollectionAImageMutation = useMutation((updatedData)=>
    {userDelACollectionImage(updatedData.imageData,linLoginToken) },
    {
      onSuccess:(data,variables)=>{
        setImageData( {...imageData, is_collection: false })
        setIsCollected(false)
      }
    }
  )
  //ADD Like
  const likeAImageMutation = useMutation((updatedData)=>
  {userLikeAImage(updatedData.imageData,linLoginToken) },
  {
    onSuccess:(data,variables)=>{
      setImageData( {...imageData,is_like: true, likes: imageData.likes+1 })
      setIsCollected(true)
    }
  }
)
//DEL Like
  const unLikeAImageMutation = useMutation((updatedData)=>
  {userDelALikedImage(updatedData.imageData,linLoginToken) },
  {
    onSuccess:(data,variables)=>{
      setImageData( {...imageData,is_like: false, likes: imageData.likes-1 })
      setIsCollected(false)
    }
  }
)


  const handleCollection = async ()=>{
    if(!isLoggedIn){
    //  console.log(isLoggedIn)
     setIsLoginForCollection(true)
    }else{
      // console.log(imageData)
      if(imageData.is_collection){
        unCollectionAImageMutation.mutateAsync({imageData})
      }else{
        collectionAImageMutation.mutateAsync({imageData})
      }
      setIsLoginForCollection(false)
    }
    
  }

  //BUY PROMPT
  const buyPromptMutation = usePromptBuyMutation(linLoginToken,['galleryDetail',linLoginToken,id])
  const handleBuyPrompt = async ()=>{
    logEvent(analytics, '單張圖頁面_購買咒語按鈕_提示支付')
    if(!isLoggedIn){
      //  console.log(isLoggedIn)
       setIsLoginForCollection(true)
      }else{
        // console.log(imageData)
        setBuyError(null)
        handleOpen(); 
        setIsLoginForCollection(false)
      }
  }
  const onHandleBuyPrompt = async()=>{
    console.log(imageData)
    try {
      await buyPromptMutation.mutateAsync({imageData})
      logEvent(analytics, '單張圖頁面_購買咒語按鈕_支付成功')
      setBuyError(<LoadingLogoSpin /> )
      setTimeout(async()=>{
        setBuyError('訊息：購買已完成。')
        //update user porfile
        const udata = await fetchUserProfileData(currentUser.id, linLoginToken, queryClient);
        console.log(udata)
        localStorage.setItem('currentUser', JSON.stringify(udata));
        setCurrentUser(udata)
        setTimeout(() => {
          setOpen(false); 
        }, 1000);
      },1000)
    

      
    } catch (error) {
      logEvent(analytics, '單張圖頁面_購買咒語按鈕_支付失敗',{
        msg:error.message 
      })
      setBuyError(<LoadingLogoSpin /> )
      setTimeout(()=>{
        if(error.message === 'Your already bought the prompt'){
          setBuyError('錯誤訊息：你已經購買過這個了。')
        }else{
          setBuyError('錯誤訊息：操作錯誤，可能是點數不足。')
        }
      },1000)

      
    }
   
  }
  const handleLike = async ()=>{
    if(!isLoggedIn){
      //  console.log(isLoggedIn)
       setIsLoginForCollection(true)
      }else{
        // console.log(imageData)
        if(imageData.is_like){
          unLikeAImageMutation.mutateAsync({imageData})
        }else{
          likeAImageMutation.mutateAsync({imageData})
        }
        setIsLoginForCollection(false)
      }
  }




  const handleComment = (item)=>{
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

      }

     }
  }
  const handleEditComment = ()=>{
    setIsCommentModal(true)
    setIsLoginForComment(false)

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


  const handleShare = ()=>{
    setIsShareModal(true)
     
  }
  
  const handleCopyPrompt=(prompt,negative_prompt)=>{
    const text = prompt+(negative_prompt && ' --'+negative_prompt);
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
      {isCommentModal&& <EditCommentForm handleSendComment={handleSendComment} handleSaveEditComment={handleSaveEditComment}  closeModal={()=>setIsCommentModal(false)} storagesResults={postsImages} />}
      </AnimatePresence>
      <ToastContainer />
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
        <DialogHeader className='text-lg text-white/80'>購買 Prompt</DialogHeader>
        <DialogBody 
    
          className=' text-white '>
          你可用的點數 <span className='text-amber-500'>{currentUser?.point} Points</span> <br />
          將以 <span className='text-amber-500'>{imageData.prompt_sale_point} Points</span> 開啟這個 Prompt 。
          <div className='text-red-500 text-sm  text-center mt-5'>{buyError&& buyError}</div>
        </DialogBody>
        <DialogFooter className='border-t border-gray-600'>
          <Button
            variant="text"
            color="white"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>取消</span>
          </Button>
          <Button 
            variant="gradient" 
            color="" 
            onClick={()=>onHandleBuyPrompt()}>
            <span>確認支付</span>
          </Button>
        </DialogFooter>
      </Dialog>

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
                  className={`w-[100vw] h-full max-h-[80vh] object-contain ${imageData.is_user_nsfw || imageData.is_nsfw ? '  blur-xl  '  : ' blur-0 ' }`} />
              </div>
              <button onClick={handleBackClick} className='absolute top-3 left-3 text-white rounded-full  bg-gray-900 '>
              <MdKeyboardArrowLeft size={32} />
              </button>
              <div className=' flex justify-center items-center my-4 space-x-2'>
                <button 
                  className='bg-gray-800 text-white text-sm px-4 py-2 rounded-full flex items-center justify-center space-x-2 '
                  onClick={()=>handleCopyPrompt(imageData.prompt,imageData.negative_prompt)}
                  ><IoCopyOutline /> <div>Copy Prompt</div> {isCopied && <span className='text-xs'> Copied! </span>}
                </button>
                <div className=' flex rounded-full bg-gray-800 space-x-6 px-4 py-2'>
                  <div className='flex items-center  space-x-1 cursor-pointer' onClick={()=>handleLike()}>
                    {imageData.is_like ?  <FaHeart color="red" />  :<FaRegHeart /> }<span>{imageData.likes}</span>
                  </div>
                  <div className='flex items-center  space-x-1 cursor-pointer'onClick={()=>handleCollection()}>
                    {imageData.is_collection ?<FaBookmark color="gold" />  :<FaRegBookmark  /> }<span></span>
                  </div>
                  <button className=' ' onClick={handleComment}>
                    {isHaveUserComment ? <FaRegCommentAlt /> : <FaCommentAlt /> }
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
                        <img src={imageData?.author?.profile_image} alt="user avatar" className='absolute aspect-square top-1/2 left-0 -translate-y-1/2 object-cover w-full h-fulls rounded-full border border-gray-400'/>
                      </div>
                    </div>
                    <div className='text-white/80 text-sm'>{imageData?.author?.name}</div>
                  </Link>
                </div>
              </div>

              <div className=' text-white/60 text-xs'>{imageData?.created_at && imageData?.created_at.substr(0,10)}  Model - {getWordFromLetter(imageData?.model)}   </div> 
            </div>



            <div className='w-full md:w-full flex flex-col justify-end  relative pb-12 pt-'>
              
              <div className='flex  justify-between items-center my-3 pt-5'>
                <div className='text-white/70 font-semibold '>Prompt 提示詞</div>
                {/*
                  imageData?.author?.id !== currentUser?.id  &&
                  <Chip 
                    variant={'gradient'}  
                    color={imageData.is_prompt_sale ? imageData.is_prompt_bought ? 'green' : 'green' : 'gray'}  
                    value={imageData.is_prompt_sale ? imageData.is_prompt_bought ? '您已買過' : imageData.prompt_sale_point+' Points' : '未販售'} 
                    className="rounded-lg py-1 " 
                  /> 
                */}

              </div>
              <div>
                <div className='bg-gray-800 relative rounded-md whitespace-normal break-words max-h-32 overflow-hidden overflow-y-auto'>
                  {/* {imageData?.display_prompt ? <div className='p-3 text-sm'>{imageData?.prompt}</div> : <div className=' text-center px-2 py-4 text-xs text-white/70 bg-black/50'>這張作品目前沒有開放分享 Prompt 。</div>} */}
                  {/* {imageData?.is_prompt_sale ? <div className='p-3 text-sm'>{imageData?.prompt}</div> : <div className=' text-center px-2 py-4 text-xs text-white/70 bg-black/50'>這張作品目前沒有開放分享 Prompt 。</div>} */}
                  {imageData?.author?.id === currentUser?.id ? 
                    <div className='p-3 text-sm'>{imageData?.prompt}</div>  
                    : 
                    imageData?.is_prompt_sale  ?
                      imageData?.is_prompt_bought ? 
                      <div className='p-3 text-sm border-t-2 border-t_lime-400'>
                        {imageData?.prompt}
                        
                      </div>
                      :
                      <div className=' text-center px-2 py-4 text-xs text-white/70 bg-black/50'>
                        <div>以 <span className='text-amber-500'>{imageData.prompt_sale_point} Points</span> 取得此 Prompt 。</div>
                        
                        <Button size="sm" color="light-green" className='mt-3' onClick={()=>handleBuyPrompt(imageData.prompt_sale_point)}>支付 {imageData.prompt_sale_point} Points 給作者</Button>
                      </div> 
                      : 
                      <div className=' text-center px-2 py-4 text-xs text-white/70 bg-black/50'>這張作品目前沒有開放分享 Prompt 。</div>
                  }
                </div>
              </div>

              <div className='text-white/70 font-semibold my-3 pt-5'>Negative prompt 反向提示詞</div>
              <div className='bg-gray-800 relative rounded-md whitespace-normal break-words max-h-32 overflow-hidden overflow-y-auto'>
                <div className='p-3'>{imageData?.negative_prompt}</div>
              </div>
              <div className='mt-5 grid gap-4 grid-cols-2'>
                <div className='text-white font-semibold my-1 flex flex-col gap-2'>
                  <div className='text-white/70'>Model</div>
                  <span className='bg-gray-800 relative rounded-md whitespace-normal break-words font-normal'> 
                    <div className='p-2'>{getWordFromLetter(imageData?.model)} </div>
                  </span>
                </div>
                <div className='text-white font-semibold my-1 flex flex-col gap-2'>
                  <div className='text-white/70'>Steps</div>
                  <span className='bg-gray-800 relative rounded-md whitespace-normal break-words font-normal'> 
                    <div className='p-2'>{imageData?.steps}</div>
                  </span>
                </div>
                <div className='text-white font-semibold my-1 flex flex-col gap-2'>
                  <div className='text-white/70'>Sampler_index</div>
                  <span className='bg-gray-800 relative rounded-md whitespace-normal break-words font-normal'> 
                    <div className='p-2'>{imageData?.sampler_index}</div>
                  </span>
                </div>
                <div className='text-white font-semibold my-1 flex flex-col gap-2'>
                  <div className='text-white/70'>Cfg_scale</div>
                  <span className='bg-gray-800 relative rounded-md whitespace-normal break-words font-normal'> 
                    <div className='p-2'>{imageData?.cfg_scale}</div>
                  </span>
                </div>
                <div className='text-white font-semibold my-1 flex flex-col gap-2'>
                  <div className='text-white/70'>Seed</div>
                  <span className='bg-gray-800 relative rounded-md whitespace-normal break-words font-normal'> 
                    <div className='p-2'>{imageData?.seed}</div>
                  </span>
                </div>
              </div>
              {imageData?.description && 
                <div className='my- border-b border-white/30 pb-6 pt-6'>
                  <div className='text-white/70 font-semibold my-1 '>Description</div>
                  
                  <div className=' relative rounded-md whitespace-normal break-words '>
                    <div className='p-2'>{imageData?.description}</div>
                  </div>
                </div>
              }
              {imageData?.campaigns === '12' && 
                <div className='mt-1'>
                  <div className='text-white/70 font-semibold my-3 pt-5'>參與投稿</div>
                  <Card className="w-96 bg-gray-900 text-white">
                    <List>
                    {imageData?.campaigns.map((item,index)=>{
                      return(
                        <ListItem className='hover:bg-gray-800'>
                          <ListItemPrefix>
                           <div className='bg-amber-800 rounded-full aspect-square w-8 text-black/80 flex justify-center items-center'> {item.name.substr(0,1)}</div>
                          </ListItemPrefix>
                          <div>
                            <Typography variant="h6" color="white">
                              <a href={`/campaign/${item.id}`}>{item.name}</a>
                            </Typography>
                            <Typography variant="small"  className="font-normal text-white/70">
                              <a href={item.link} target='_blank' >{item.link}</a> 
                            </Typography>
                          </div>
                        </ListItem>
                      )
                      })
                    }
                    </List>
                  </Card>

                </div>
              }
              {/* Comment area */}
              <div className='mt-7'>
                <div className='text-white font-semibold my-1 mb-4 text-center '>Discussion</div>
                {
                  commentsResults.length > 0 ?
            
                    commentsResults.map((item,index)=>{
                      // console.log(item)
                      const {author,text,created_at} = item
                      return(
                        <div className=' rounded-md bg-gray-800 px-4 py-6 my-2'>
                          <div>
                            <div className='flex items-center gap-2'>
                              <div className='w-8'>
                                <div className='pt-[100%] relative'>
                                  <img src={author.profile_image} alt="user avatar" className='absolute top-1/2 left-0 -translate-y-1/2 object-cover w-full h-fulls rounded-full border border-gray-400'/>
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


          
        </div>
      </>
      }

      
    </div>
  )
}

export default Post