import React,{useState,useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {motion,AnimatePresence} from 'framer-motion'
import { useParams,useNavigate,Link } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { imageDataState,imageByIdSelector,loginState,isLoginState,lineProfileState,userState,formStatusState,commentDataState } from '../atoms/galleryAtom';
import {getWordFromLetter,fetchGalleries,getStoredLocalData,userCollectionAImage,userDelACollectionImage,refreshToken,fetchUserCollections,fetchComments,userPostCommentToImage,userPatchCommentToImage,fetchUserStorages,fetchGalleriesDetail,userClickCopyPrompt} from '../helpers/fetchHelper'
import {SharePostModal ,CallToLoginModal,CommentDataFormat,LoadingLogoFly,LoadingLogoSpin} from '../helpers/componentsHelper'
import { MdKeyboardArrowLeft,MdOutlineShare,MdModeComment } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import Header from '../header'
import EditCommentForm from '../Components/EditCommentForm';
function Post() {
  const { id } = useParams();
  const [imageData, setImageData] = useState(null)
  const [comments, setComments] = useState([])
  const [commentsResults, setCommentsResults] = useState([])
  const [storages, setStorages] = useState({});
  const [storagesResults, setStoragesResults] = useState([]);
  const currentLoginData = useRecoilValue(loginState)
  const isCurrentLogin = useRecoilValue(isLoginState)

  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginState);
  const [lineProfile, setLineProfile] = useRecoilState(lineProfileState);
  const [linLoginData, setLineLoginData] = useRecoilState(loginState)
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
  const navigate = useNavigate();
  const [isGoingBack, setIsGoingBack] = useState(true);
  const handleBackClick = () => {
    const hasPreviousPage = navigate.length > 1;
    if (hasPreviousPage) {
      navigate(-1); // 返回上一页
    } else {
      navigate('/gallery'); // 导航到指定页面
    }
  };
  useEffect(()=>{
    getStoredLocalData().then(localData=>{
        setIsLoggedIn(localData.isLogin)
        
        setLineProfile(localData.lineProfile)
        setCurrentUser(localData.currentUser)
        let currentUser = localData.currentUser
        let headers = {'Content-Type': 'application/json'} 
        if(localData.isLogin){
          // const refreshTokenResult = refreshToken()
          refreshToken().then(tData =>{
            setLineLoginData(tData.token)
            headers = {'Content-Type': 'application/json' ,'Authorization': `Bearer ${tData.token}` }
            fetchGalleriesDetail(headers,id).then(gData=>{
              console.log(gData)
              setImageData(gData);
              // 
              fetchComments(gData).then(data=>{
                  console.log(data)
                  setComments(data)
                  setCommentsResults(data.results)
                  const isUserid = data.results.some((item,index)=>{
                    return item.author.id === currentUser.id
                  })
                  setIsHaveUserComment(isUserid)
                })
            })
            fetchUserCollections(currentUser.id,tData.token).then(collections=>{
              const findCollectionId = collections.results.some((item)=>{
                return item.id === parseInt(id)
              })
              if(findCollectionId){
                setIsCollected(true)
              }else{
                setIsCollected(false)
              }
            })

          })
        }else{
          fetchGalleriesDetail(headers,id).then(gdata=>{

            setImageData(gdata);
            fetchComments(gdata).then(data=>{
              console.log(data)
              setComments(data)
              setCommentsResults(data.results)
              const isUserid = data.results.some((item,index)=>{
                return item.author.id === currentUser.id
              })
              setIsHaveUserComment(isUserid)
            })
          })
        }

      })
  },[setIsLoggedIn,setLineLoginData,setLineProfile])


  const handleCollection = ()=>{
    console.log('click')
    if(!isLoggedIn){
     console.log(isLoggedIn)
     setIsLoginForCollection(true)
    }else{
      console.log(imageData)
      if(isCollected){
        userDelACollectionImage(imageData.id,linLoginData)
          .then((data)=> {
            if(data.status===204){
              setIsCollected(false)
            }
          })
          .catch((error) => console.error(error));
      }else{
        userCollectionAImage(imageData,linLoginData)
          .then((data)=> {
            if(data.status===200){
              setIsCollected(true)
            }
          })
          .catch((error) => console.error(error));
      }
      setIsLoginForCollection(false)
    }
    
  }
  const handleComment = (item)=>{
    console.log('click')
    console.log(isHaveUserComment)
    if(!isLoggedIn){
      console.log(isLoggedIn)
      setIsLoginForComment(true)
     }else{
      if(isHaveUserComment){
        toast('You have already commented on this image. Please edit it.', {
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
        fetchUserStorages(currentUser.id,linLoginData)
          .then((images)=> {
              setStorages(images)
              setStoragesResults(images.results)
              console.log(images)
          })
          .catch((error) => console.error(error));
      }

     }
  }
  const handleEditComment = ()=>{
    setIsCommentModal(true)
    setIsLoginForComment(false)
    fetchUserStorages(currentUser.id,linLoginData)
      .then((images)=> {
          setStorages(images)
          setStoragesResults(images.results)
          console.log(images)
      })
      .catch((error) => console.error(error));
  }
  const handleSendComment= (data)=>{
    console.log(data)
    userPostCommentToImage(imageData,data,linLoginData)
      .then(data=>{
        setIsCommentModal(false)
        fetchComments(imageData).then(data=>{
          console.log(data)
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
    console.log(id,data)
    userPatchCommentToImage(id,data,linLoginData)
      .then(data=>{
        setIsCommentModal(false)
        fetchComments(imageData).then(data=>{
          console.log(data)
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
    fetchUserStorages(currentUser.id,linLoginData)
        .then((images)=> {
            setStorages(images)
            setStoragesResults(images.results)
            console.log(images)
        })
        .catch((error) => console.error(error));
  }

  const handleShare = ()=>{
    setIsShareModal(true)
     
  }
  
  const handleCopyPrompt=(model,prompt,negative_prompt)=>{
    const text = getWordFromLetter(model) +' '+prompt+(negative_prompt && ' --'+negative_prompt);
    navigator.clipboard.writeText(text);
    userClickCopyPrompt(imageData,linLoginData)
    setIsCopied(true)
  }

  if (!imageData) {
    return (
        <LoadingLogoSpin />  
    );
  }

  return (
    <div>
      <Header currentUser={currentUser} isLoggedIn={isLoggedIn}/>
      <AnimatePresence>
      {isLoginForCollection && <CallToLoginModal closeModal={()=>setIsLoginForCollection(false)}/>}
      {isLoginForComment && <CallToLoginModal closeModal={()=>setIsLoginForComment(false)}/>}
      {isShareModel && <SharePostModal closeModal={()=>setIsShareModal(false)}/>}
      {isCommentModal&& <EditCommentForm handleSendComment={handleSendComment} handleSaveEditComment={handleSaveEditComment}  closeModal={()=>setIsCommentModal(false)} storagesResults={storagesResults} handleSelectStorageImage={handleSelectStorageImage}/>}
      </AnimatePresence>
      <ToastContainer />

      {!imageData ?
      <div className='text-white'>Loading</div> 
      :
      <>
        <div className="w-full md:w-10/12  space-x-0  md:space-x-10 mx-auto  p-4  text-white relative flex flex-col md:flex-row">
          <div className='w-full md:w-1/2 '> 
            <button onClick={handleBackClick} className='text-white'>
              <MdKeyboardArrowLeft size={42} />
            </button>
            <div className='text-xs text-white/40 leading-3'>#{ imageData?.id}</div>
            <div className='text-xl text-white font-semibold'>{imageData?.title}</div> 
            <div className=' flex items-center space-x-3 my-2'>
              <Link to={`/user/${imageData?.author?.id}`} className='flex items-center space-x-2'>
                <div className='w-8'>
                  <div className='pt-[100%] relative'>
                    <img src={imageData?.author?.profile_image} alt="" className='absolute top-1/2 left-0 -translate-y-1/2 object-cover w-full h-fulls rounded-full border border-zinc-400'/>
                  </div>
                </div>
                <div className='text-white/80'>{imageData?.author?.name}</div>
              </Link>

            </div>
            <div className="flex flex-col  justify-center items-center w-full">
              <div className='w-full my-5'>
                <img 
                  src={imageData?.urls?.regular} 
                  alt={imageData?.id} 
                  className="w-full" />
              </div>
            </div>
            <div className=' flex flex-col justify-end  relative pt-2'>
              <div className='flex items-center space-x-2 text-white '>
                <button className='flex items-center gap-2 p-2 ' onClick={handleCollection}>
                  <FaHeart size={20} className={ isCollected ? ' text-rose-400' : ' text-white'} /> {imageData.likes}
                </button>
                <button className='p-2' onClick={handleComment}>
                  <MdModeComment size={20} />
                </button>
                <button className='p-2' onClick={handleShare}>
                  <MdOutlineShare size={20} />
                </button>
              </div>
            </div>
          </div>
          <div className='w-full md:w-1/2 flex flex-col justify-end  relative pb-20 pt-2'>
            <div className='mt-3 text-white/60 text-sm'>{imageData?.created_at && imageData?.created_at.substr(0,10)}  Model - {getWordFromLetter(imageData?.model)}   </div> 
            <div className='text-white font-bold my-3 '>Prompt</div>
            <div className='bg-zinc-700 relative rounded-md whitespace-normal break-words max-h-32 overflow-hidden overflow-y-auto'>
              <div className='p-3'>{imageData?.prompt}</div>
            </div>
            <div className='text-white font-bold my-3'>Negative prompt</div>
            <div className='bg-zinc-700 relative rounded-md whitespace-normal break-words max-h-32 overflow-hidden overflow-y-auto'>
            <div className='p-3'>{imageData?.negative_prompt}</div>
            </div>
            <div className='mt-4'>
                <div className='text-white font-bold my-1 '>Model: <span className='whitespace-normal break-words font-normal'> {getWordFromLetter(imageData?.model)}</span> </div>
                <div className='text-white font-bold my-1'>Steps:<span className='whitespace-normal break-words font-normal'> {imageData?.steps}</span></div>
                <div className='text-white font-bold my-1'>Sampler_index:<span className='whitespace-normal break-words font-normal'> {imageData?.sampler_index}</span></div>
                <div className='text-white font-bold my-1 '>Cfg_scale:<span className='whitespace-normal break-words font-normal'> {imageData?.cfg_scale}</span></div>
            </div>
            {imageData?.description && 
              <div className='my-2'>
                <div className='text-white font-bold my-1 '>Description:</div>
                <div className='relative whitespace-normal break-words '>
                  <div className=''>{imageData?.description}</div>
                </div>
              </div>
            }
            {/* Comment area */}
            <div className='mt-6'>
              <div className='text-white font-bold my-1 mb-4 '>Discussion</div>
              {
                commentsResults.length > 0 ?
           
                  commentsResults.map((item,index)=>{
                    const {author,text,created_at} = item
                    return(
                      <div className=' rounded-md bg-zinc-600 px-4 py-6'>
                        <div>
                          <div className='flex items-center gap-2'>
                            <div className='w-8'>
                              <div className='pt-[100%] relative'>
                                <img src={author.profile_image} alt="" className='absolute top-1/2 left-0 -translate-y-1/2 object-cover w-full h-fulls rounded-full border border-zinc-400'/>
                              </div>
                            </div>
                            <div className='text-white'>{author?.name}</div>
                            <div className='text-sm ml-auto'>{created_at.substr(0,10)}</div>
                            <div onClick={()=>{
                              setFormStatus('EDIT')
                              setCurrentComment(item)
                              handleEditComment(item)
                            }}>Edit</div>
                          </div>
                        </div>
                        <div className='mt-4'>
                        <CommentDataFormat  data={text}/>
                        </div>
                      </div>
                    )
                  })
                :
                <div className='text-white/50 '>No one has commented here yet. </div>

      
              }
            </div>

          </div>

          <div className='flex left-0 space-x-2 justify-center items-center py-4 fixed bottom-0 z-50 w-full bg-zinc-800'>
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