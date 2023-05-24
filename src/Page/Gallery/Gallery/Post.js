import React,{useState,useEffect} from 'react'
import {motion,AnimatePresence} from 'framer-motion'
import { useParams,useNavigate,Link } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { imageDataState,imageByIdSelector,loginState,isLoginState,lineProfileState,userState } from '../atoms/galleryAtom';
import {getWordFromLetter,fetchGalleries,getStoredLocalData,userCollectionAImage,userDelACollectionImage,refreshToken,fetchUserCollections} from '../helpers/fetchHelper'
import {SharePostModal ,CallToLoginModal} from '../helpers/componentsHelper'
import { MdKeyboardArrowLeft,MdOutlineShare,MdModeComment } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import Header from '../header'
function Post() {
  const { id } = useParams();
  const [imageData, setImageData] = useRecoilState(imageDataState)
  const currentLoginData = useRecoilValue(loginState)
  const isCurrentLogin = useRecoilValue(isLoginState)

  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginState);
  const [lineProfile, setLineProfile] = useRecoilState(lineProfileState);
  const [linLoginData, setLineLoginData] = useRecoilState(loginState)
  const [currentUser, setCurrentUser] = useRecoilState(userState)

  const [ isCopied , setIsCopied ] = useState(false);

  const [ isLoginForCollection , setIsLoginForCollection] = useState(false)
  const [ isLoginForComment , setIsLoginForComment] = useState(false)
  const [ isShareModel , setIsShareModal] = useState(false)
  const [isCollected ,setIsCollected] = useState(false)
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
            fetchGalleries(headers).then(gData=>{
              const newImageData = gData.results.find((item)=>{
                return item.id === parseInt(id)
              })
              console.log(newImageData)
              setImageData(newImageData);
        
              return newImageData;
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
          fetchGalleries(headers).then(data=>{
            const newImageData = data.results.find((item)=>{
              return item.id === parseInt(id)
            })
            console.log(newImageData)
            setImageData(newImageData);
      
            return newImageData;
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
  const handleComment = ()=>{
    console.log('click')
    if(!isLoggedIn){
      console.log(isLoggedIn)
      setIsLoginForComment(true)
     }else{
      setIsLoginForComment(false)
     }
  }
  const handleShare = ()=>{
    setIsShareModal(true)
     
  }
  
  const handleCopyPrompt=(model,prompt,negative_prompt)=>{
    const text = model.toUpperCase() +' '+prompt+(negative_prompt && ' --'+negative_prompt);
    navigator.clipboard.writeText(text);
    setIsCopied(true)
  }

  if (!imageData) {
    return (
      <div>
        <h2>Post ID: {id}</h2>
        <div>No image found.</div>
      </div>
    );
  }

  return (
    <div>
      <Header currentUser={currentUser} isLoggedIn={isLoggedIn}/>
      <AnimatePresence>
      {isLoginForCollection && <CallToLoginModal closeModal={()=>setIsLoginForCollection(false)}/>}
      {isLoginForComment && <CallToLoginModal closeModal={()=>setIsLoginForComment(false)}/>}
      {isShareModel && <SharePostModal closeModal={()=>setIsShareModal(false)}/>}
      </AnimatePresence>


      {!imageData ?
      <div className='text-white'>Loading</div> 
      :
      <>
        <div className="w-full md:w-10/12 gap-0 md:gap-10 mx-auto  p-4  text-white relative flex flex-col md:flex-row">
          <div className='w-full md:w-1/2 '> 
            <button onClick={handleBackClick} className='text-white'>
              <MdKeyboardArrowLeft size={42} />
            </button>
            <div className='text-xs text-white/40 leading-3'>#{ imageData?.id}</div>
            <div className='text-xl text-white font-semibold'>{imageData.title}</div> 
            <div className=' flex items-center  gap-3 my-2'>
              <Link Link to={`/user/${imageData.author.id}`} className='flex items-center gap-2'>
                <div className='w-8'>
                  <div className='pt-[100%] relative'>
                    <img src={imageData?.author.profile_image} alt="" className='absolute top-1/2 left-0 -translate-y-1/2 object-cover w-full h-fulls rounded-full border border-zinc-400'/>
                  </div>
                </div>
                <div className='text-white/80'>{imageData?.author?.name}</div>
              </Link>

            </div>
            <div className="flex flex-col  justify-center items-center w-full">
              <div className='w-full my-5'>
                <img 
                  src={imageData.urls.regular} 
                  alt={imageData.id} 
                  className="w-full" />
              </div>
            </div>
            <div className=' flex flex-col justify-end  relative pt-2'>
              <div className='flex items-center gap-2 text-white '>
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
            <div className='mt-3 text-white/60 text-sm'>{imageData.created_at && imageData.created_at.substr(0,10)}  Model - {getWordFromLetter(imageData.model)}   </div> 
            <div className='text-white font-bold my-3 '>Prompt</div>
            <div className='bg-zinc-700 relative rounded-md whitespace-normal break-words max-h-32 overflow-hidden overflow-y-auto'>
              <div className='p-3'>{imageData.prompt}</div>
              <div className='  absolute h-4 bottom-0 z-10 w-full bg-gradient-to-t from-[#1e1e1e] via-black/0 '></div>
            </div>
            <div className='text-white font-bold my-3'>Negative prompt</div>
            <div className='bg-zinc-700 relative rounded-md whitespace-normal break-words max-h-32 overflow-hidden overflow-y-auto'>
            <div className='p-3'>{imageData.negative_prompt}</div>
              <div className='  absolute h-4 bottom-0 z-10 w-full bg-gradient-to-t from-[#1e1e1e] via-black/0 '></div>
            </div>
            <div className='mt-4'>
                <div className='text-white font-bold my-1 '>Model: <span className='whitespace-normal break-words font-normal'> {getWordFromLetter(imageData.model)}</span> </div>
                <div className='text-white font-bold my-1'>Steps:<span className='whitespace-normal break-words font-normal'> {imageData.steps}</span></div>
                <div className='text-white font-bold my-1'>Sampler_index:<span className='whitespace-normal break-words font-normal'> {imageData.sampler_index}</span></div>
                <div className='text-white font-bold my-1 '>Cfg_scale:<span className='whitespace-normal break-words font-normal'> {imageData.cfg_scale}</span></div>
            </div>
            {imageData.description && 
              <div className='my-2'>
                <div className='text-white font-bold my-1 '>Description:</div>
                <div className='relative whitespace-normal break-words '>
                  <div className=''>{imageData.description}</div>
                </div>
              </div>
            }

          </div>
          <div className='flex left-0 gap-2 justify-center items-center py-4 fixed bottom-0 z-50 w-full bg-zinc-800'>
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