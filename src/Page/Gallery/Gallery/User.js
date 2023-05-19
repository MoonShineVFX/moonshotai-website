import React,{useState,useEffect} from 'react'
import {motion,AnimatePresence} from 'framer-motion'
import { useParams,useNavigate,Link } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { loginState,isLoginState,lineProfileState,userState,imageDataState } from '../atoms/galleryAtom';

import { MdKeyboardArrowLeft,MdOutlineShare,MdOutlineNewReleases } from "react-icons/md";
import {fetchUser,getStoredLocalData,userFollowAUser,userUnFollowAUser,fetchUserPublicImages} from '../helpers/fetchHelper'
import {CallToLoginModal} from '../helpers/componentsHelper'

import Header from '../header'
function User() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null)
  const [publicImage, setPublicImage] = useState([])
  const [publicImageResults, setPublicImageResults] = useState([])
  const [imageData, setImageData] = useRecoilState(imageDataState)
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginState);
  const [lineProfile, setLineProfile] = useRecoilState(lineProfileState);
  const [linLoginData, setLineLoginData] = useRecoilState(loginState)
  const [currentUser, setCurrentUser] = useRecoilState(userState)
  const [ isLoginForFollow , setIsLoginForFollow] = useState(false)
  const [currentPage, setCurrentPage]= useState(1)
  const [totalPage, setTotalPage]= useState(1)
  const [pageSize, setPageSize] = useState(30)
  const imageVariants = {
    hidden: { opacity: 0, },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  const handleFollow = ()=>{
    console.log('click')
    if(!isLoggedIn){
     console.log(isLoggedIn)
     setIsLoginForFollow(true)
    }else{
      userFollowAUser(userData,linLoginData)
        .then((data)=> console.log(data))
        .catch((error) => console.error(error));

        setIsLoginForFollow(false)
    }
  }
  useEffect(()=>{
    getStoredLocalData().then(data=>{
        setIsLoggedIn(data.isLogin)
        setLineLoginData(data.loginToken)
        setLineProfile(data.lineProfile)
        setCurrentUser(data.currentUser)
      })
  },[setIsLoggedIn,setLineLoginData,setLineProfile])
  useEffect(()=>{
    fetchUser(id)
      .then(data => {
        console.log(data)
        console.log(id)
        fetchUserPublicImages(data.uid, currentPage, pageSize).then(data=>{
          setPublicImage(data)
          setPublicImageResults(data.results)
        })
        setUserData(data);
  
      })


  },[])
  return (
    <div>
      <Header currentUser={currentUser} isLoggedIn={isLoggedIn}/>
      <AnimatePresence>
      {isLoginForFollow && <CallToLoginModal closeModal={()=>setIsLoginForFollow(false)}/>}
      </AnimatePresence>
      {
        !userData  ? 
        <div className='text-white'>Loading</div> 
        :
        <div className='flex flex-col items-center gap-5 relative text-white'>
              <div
              style={{backgroundImage:`url(${userData.profile_banner})`}}
              className=' absolute top-0 left-0 -z-10  w-full h-[23vh] bg-cover bg-center bg-no-repeat brightness-75'>

              </div>
              <div 
                className='w-[85px] mt-40  aspect-square rounded-full overflow-hidden bg-center bg-no-repeat bg-cover bg-black '
                style={{backgroundImage:`url(${userData.profile_image})` }}
              ></div>

              <div className=' flex flex-col justify-center items-center gap-2'>
                <div className=' text-xl leading-4'>{userData?.name} </div>
                <div className=' text-xs'>{userData?.bio}  </div>
              </div>


              <div className='grid grid-cols-3  divide-x'>
                <div className=' text-xs px-8'>
                  <div>{userData?.total_photos} </div>
                  <div>renders</div> 
                </div>
                <div className=' text-xs px-8'>
                  <div>{userData?.total_collected}</div> 
                  <div>collected</div> 
                </div>
                <div className=' text-xs px-8'>
                  <div>{userData?.total_follower}</div> 
                  <div>follower</div> 
                </div>
              </div>
              <div className='' onClick={handleFollow}>
                <button className='bg-lime-500 px-5 py-2 rounded-md'>Follow</button>
              </div>
         
             
              
            </div>
      }
      <div className='w-11/12 mx-auto my-10'>

      {!publicImageResults ? 
        <div className='text-white'>Loading</div> 
        :
        <div className='grid grid-cols-2 gap-4'>
          {publicImageResults.map((image,index)=>{
            const {id, urls, created_at, display_home, filename,is_storage,title,author,is_user_nsfw,is_nsfw   } = image
            return (
              <motion.div key={'gallery-'+index} 
                variants={imageVariants} initial="hidden" animate="visible" transition={{ delay: index * 0.1 }}
                className='  overflow-hidden relative'
              >
                <Link to={`/post/${id}`} onClick={() => {setImageData(image)}} className=' relative' >
                  <div className='pt-[100%] relative'>
                    <img  
                      src={urls.thumb} alt={image?.description} 
                      data-id={id}
                      className=' absolute top-1/2 left-0 -translate-y-1/2 object-cover w-full h-full rounded-md'
                      onClick={() => {setImageData(image)}} 
                    />
                  </div>

                  <div className='text-orange-500 absolute top-0 p-1 flex gap-1'>
                    {is_user_nsfw && <MdOutlineNewReleases size={20} color="#ff7505" />  }
                    {is_nsfw && <MdOutlineNewReleases size={20} color="#f41818" />  }
                  </div>
                </Link>

                <div className='text-sm  flex items-start mt-3  gap-3 w-full   text-white'>


                  <div className='flex flex-col'>
                    <div className='text-base font-bold'>{title} </div>
                    {/* <div className='text-xs text-white/50'>{author?.name}</div> */}
                  </div>
                </div>
              </motion.div>

            )
            })}


          </div>
      }





</div>
    </div>
  )


}

export default User