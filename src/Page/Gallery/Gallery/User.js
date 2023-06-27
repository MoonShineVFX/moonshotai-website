import React,{useState,useEffect} from 'react'
import {motion,AnimatePresence} from 'framer-motion'
import { useParams,useNavigate,Link } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { loginState,isLoginState,lineProfileState,userState,imageDataState } from '../atoms/galleryAtom';

import {LoadingLogoFly,LoadingLogoSpin,CallToLoginModal} from '../helpers/componentsHelper'
import {fetchUser,getStoredLocalData,userFollowAUser,userUnFollowAUser,fetchUserPublicImages,refreshToken,fetchUserFollowings} from '../helpers/fetchHelper'
import { MdKeyboardArrowLeft,MdOutlineShare,MdOutlineNewReleases,MdFacebook } from "react-icons/md";
import { FaFacebook,FaInstagram,FaTwitter,FaLinkedinIn,FaDiscord } from "react-icons/fa";
import { HiGlobeAlt } from "react-icons/hi";
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
  const [isFollowed ,setIsFollowed] = useState(false)
  const navigate = useNavigate();
  const imageVariants = {
    hidden: { opacity: 0, },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  const handleBackClick = () => {
    const hasPreviousPage = navigate.length > 1;
    if (hasPreviousPage) {
      navigate(-1); // 返回上一页
    } else {
      navigate('/gallery'); // 导航到指定页面
    }
  };
  const handleFollow = ()=>{
    console.log('click')
    if(!isLoggedIn){
     console.log(isLoggedIn)
     setIsLoginForFollow(true)
    }else{
      if(isFollowed){
        userUnFollowAUser(userData,linLoginData)
          .then((data)=> {
            if(data.status===204){
              setIsFollowed(false)
            }
          })
        .catch((error) => console.error(error));
        

      }else{
        userFollowAUser(userData,linLoginData)
          .then((data)=> {
            if(data.status===200){
              setIsFollowed(true)
            }
          })
          .catch((error) => console.error(error));
      }

      setIsLoginForFollow(false)
    
    }
    
  }
  useEffect(()=>{
    getStoredLocalData().then(data=>{
        setIsLoggedIn(data.isLogin)
        setLineProfile(data.lineProfile)
        setCurrentUser(data.currentUser)
        refreshToken().then(tData =>{
          setLineLoginData(tData.token)
          fetchUserFollowings(currentUser.id,tData.token).then(followings =>{
            console.log(followings)
            const findFollowId = followings.some(item=>{
              return item.id === parseInt(id)
            })
            if(findFollowId){
              setIsFollowed(true)
            }else{
              setIsFollowed(false)
            }
          })
        })
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

  if (!userData) {
    return (
        <LoadingLogoSpin />  
    );
  }
  return (
    <div>
      <Header currentUser={currentUser} isLoggedIn={isLoggedIn}/>
      <AnimatePresence>
      {isLoginForFollow && <CallToLoginModal closeModal={()=>setIsLoginForFollow(false)}/>}
      </AnimatePresence>

      <div className='flex flex-col relative text-white mx-5 mt-10'>
          <div className='flex items-center justify-between'>
            <div className='w-10'>
              <div className='pt-[100%] relative'>
                <img src={userData.profile_image} alt="" className='absolute top-1/2 left-0 -translate-y-1/2 object-cover w-full h-fulls rounded-full border border-zinc-400'/>
              </div>
            </div>

            <div className='ml-auto' onClick={handleFollow}>
              {
                isFollowed ? 
                <button className='bg-lime-600 text-white/90 px-3 py-1 text-sm '>Following</button>
                : 
                <button className='bg-lime-600 text-white/90 px-3 py-1 text-sm '>Follow</button>
              }
            </div>
          </div>
          <div className='flex items-center  space-x-2 mt-3'>
            <div className='text-white'>{userData?.name} </div>
            {userData?.portfolio_url && <a href={userData?.portfolio_url} target="_blank" rel="noopener noreferrer" > <HiGlobeAlt /> </a> }
            {userData?.facebook_id && <a href={userData?.facebook_id} target="_blank" rel="noopener noreferrer" >    <FaFacebook /> </a> }
            {userData?.instagram_id && <a href={userData?.instagram_id} target="_blank" rel="noopener noreferrer" >  <FaInstagram  /></a> }
            {userData?.linkedin_id && <a href={userData?.linkedin_id} target="_blank" rel="noopener noreferrer" >    <FaLinkedinIn  /></a> }
            {userData?.twitter_id && <a href={userData?.twitter_id} target="_blank" rel="noopener noreferrer" >      <FaTwitter color='#359bf0' /></a> }
            {userData?.discord_id && <a href={userData?.discord_id} target="_blank" rel="noopener noreferrer" >      <FaDiscord  /></a> }
          </div>
          <div className='flex text-xs  space-x-3 '>
            <div><span className='text-sm'>{userData?.total_photos}</span> renders</div>
            <div><span className='text-sm'>{userData?.total_collected}</span> collected</div> 
            <div><span className='text-sm'>{userData?.total_follower}</span> follower</div> 
          </div>
          <div className=' text-xs'>
            {userData?.bio}  
          </div>
      </div>
      <div className='w-11/12 mx-auto my-10'>

      {!publicImageResults ? 
        <div className='text-white'>Loading</div> 
        :
        <div className='grid grid-cols-2 md:grid-cols-5  gap-3'>
          {publicImageResults.map((image,index)=>{
            const {id, urls, created_at, display_home, filename,is_storage,title,author,is_user_nsfw,is_nsfw   } = image
            return (
              <motion.div key={'gallery-'+index} 
                variants={imageVariants} initial="hidden" animate="visible" transition={{ delay: index * 0.1 }}
                className='  overflow-hidden relative'
              >
                <Link to={`/post/${id}`} className=' relative' >
                  <div className='pt-[100%] relative'>
                    <img  
                      src={urls.thumb} alt={image?.description} 
                      data-id={id}
                      className=' absolute top-1/2 left-0 -translate-y-1/2 object-cover w-full h-full rounded-md'
                
                    />
                  </div>

                  <div className='text-orange-500 absolute top-0 p-1 flex  space-x-1'>
                    {is_user_nsfw && <MdOutlineNewReleases size={20} color="#ff7505" />  }
                    {is_nsfw && <MdOutlineNewReleases size={20} color="#f41818" />  }
                  </div>
                </Link>

                <div className='text-sm  flex items-start mt-3  space-x-3  w-full   text-white'>


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