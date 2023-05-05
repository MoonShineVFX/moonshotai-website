import React, { useState, useEffect }  from 'react'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import {motion,AnimatePresence} from 'framer-motion'
import { FiHeart } from "react-icons/fi";
import { MdKeyboardArrowDown, MdMoreHoriz, MdMoreVert } from "react-icons/md";
import Header from '../header'
import liff from '@line/liff';

import { loginState, userState } from '../atoms/galleryAtom';
import {  useRecoilValue ,useRecoilState } from 'recoil';
import { fetchLineLogin, fetchUserImages, fetchUserStorages, fetchUserCollections, userStorageAImage, fetchUserProfile, patchUserProfile,delUserStorageImage } from '../helpers/fetchHelper';

import RenderPage from '../RenderPage'
import StoragePage from '../StoragePage'
import CollectionPage from '../CollectionPage'
const dropDownManuItem = [
  {title:"Renders", display:true},
  {title:"Storage", display:true},
  {title:"Collection", display:false},
  {title:"Following",display:false},
]
const liffID = process.env.REACT_APP_LIFF_LOGIN_ID
function Index() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [images, setImages] = useState({});
  const [imagesResults, setImagesResults] = useState([]);
  const [storages, setStorages] = useState({});
  const [storagesResults, setStoragesResults] = useState([]);
  const [collections, setCollections] = useState({});
  const [collectionsResults, setCollectionsResults] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentProfile, setCurrentProfile] = useRecoilState(userState);
  const [currentDropDownItem, setCurrentDropDownItem] = useState(dropDownManuItem[0])
  const [currentAuthor,setCurrentAuthor] = useState({})
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)
  const [token, setToken] = useRecoilState(loginState)
  const [ isCopied , setIsCopied ] = useState(false);
  const [currentPage, setCurrentPage]= useState(1)
  const [pageSize, setPageSize] = useState(30)
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
  const handleImageClick = image => {
    setSelectedImage(image);
  };
  const handleModalClose = () => {
    setSelectedImage(null);
  };
  const initializeLineLogin = async () => {
    liff.init({
      liffId: liffID
    }).then(function() {
      console.log('LIFF init');
      if (liff.isLoggedIn()) {
        const accessToken = liff.getAccessToken();
        setIsLoggedIn(true)
        // console.log("getAccessToken", accessToken);
        if(accessToken){

          liff.getProfile().then(profile=>{
            // console.log(profile)
            // setCurrentProfile(profile)

            fetchUserImages(profile.userId , currentPage, pageSize)
              .then((images)=> {
                  setImages(images)
                  setImagesResults(images.results.reverse())
                  setCurrentAuthor(images.results[0].author)
              })
              .catch((error) => console.error(error));
            
            fetchLineLogin(profile)
              .then((data)=> {
                setToken(data.token)
                fetchUserProfile(data.user_id, data.token)
                .then((data)=> {
                  console.log(data)
                  setCurrentProfile(data)})
                .catch((error) => console.error(error));
              })
              .catch((error) => console.error(error));
              
          }).catch(err => console.log(err))
        }
      } else {
        liff.login();
      }
    }).catch(function(error) {
      console.log(error);
    });
  }
  const devLogin = ()=>{
    const profile ={
      displayName:"WuWood_dev",
      pictureUrl: "https://profile.line-scdn.net/0hohWm3_nEMEd6FCWoI2NOOApEMy1ZZWlVBXIrcUlHOyJHcScTAiJ6KR1Bb3dFdiBEBHIvJxxBPnR2B0chZELMc30kbnBAJXAVX3R_qQ",
      statusMessage:"123",
      userId:"U895f7908fef7f32b717db91a8240ddc2"
    }
    setIsLoggedIn(true)
    // setCurrentProfile(profile)

    fetchUserImages(profile.userId , currentPage, pageSize)
      .then((images)=> {
          setImages(images)
          setImagesResults(images.results.reverse())
          setCurrentAuthor(images.results[0].author)
      })
      .catch((error) => console.error(error));
    
    fetchLineLogin(profile)
      .then((data)=> {
        setToken(data.token)

        fetchUserProfile(data.user_id, data.token)
          .then((data)=> {
            console.log(data)
            setCurrentProfile(data)})
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  }
  const handleLike = (image) =>{
    userStorageAImage(image,token)
      .then((data)=> console.log(data))
      .catch((error) => console.error(error));
  }
  const handlePrev = (title)=>{
    setCurrentPage(prevPage => prevPage-1)
  }
  const handleNext = (title)=>{
    setCurrentPage(prevPage => prevPage+1)
  }
  const handleSetBanner = (id)=>{
    const items={
      profile_banner_id:id
    }
    patchUserProfile(currentProfile.id,token,items)
      .then((data)=> console.log(data))
      .catch((error) => console.error(error));
  }
  const handleSetAvatar = (id)=>{
    const items={
      profile_image_id:id
    }
    patchUserProfile(currentProfile.id,token,items)
      .then((data)=> console.log(data))
      .catch((error) => console.error(error));
  }
  const handleRemoveStorage = (id)=>{
    delUserStorageImage(id,token)
      .then((data)=> console.log(data))
      .catch((error) => console.error(error));
  }
  useEffect(() => {
    handleOptionChange(currentDropDownItem);
  }, [currentPage]);
  const toggleDropdown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };
  const handleOptionChange = async (item) => {
    switch (item.title) {
      case 'Renders':
        fetchUserImages(currentProfile.uid,currentPage,pageSize)
          .then((images)=> {
              setImages(images)
              setImagesResults(images.results.reverse())
          })
          .catch((error) => console.error(error));
        break;
      case 'Storage':
        fetchUserStorages(currentProfile.id,token)
          .then((images)=> {
              setStorages(images)
              setStoragesResults(images.results.reverse())
          })
          .catch((error) => console.error(error));
        break;
      case 'Collection':
        fetchUserCollections(currentProfile.id,token)
          .then((images)=> {
              setCollections(images)
              setCollectionsResults(images.results.reverse())
          })
          .catch((error) => console.error(error));
        break;
      case 'Following':
        fetchUserImages(currentProfile.uid,token)
          .then((images)=> {
              setImages(images)
              setImagesResults(images.results.reverse())
          })
          .catch((error) => console.error(error));
        break;
      default: return null;
    }
  };
  const renderComponent =  () => {
    switch (currentDropDownItem.title) {
      case 'Renders':
        return <RenderPage title={currentDropDownItem.title} images={images} imagesResults={imagesResults} handleLike={handleLike} handleNext={handleNext} handlePrev={handlePrev} handleSetBanner={handleSetBanner} handleSetAvatar={handleSetAvatar}/>;
      case 'Storage':
        return <StoragePage title={currentDropDownItem.title} images={storages} imagesResults={storagesResults} handleLike={handleLike} handleRemoveStorage={handleRemoveStorage}/>;
      case 'Collection':
        return <CollectionPage title={currentDropDownItem.title} images={collections} imagesResults={collectionsResults} handleLike={handleLike} />;
      case 'Following':
        return <RenderPage title={currentDropDownItem.title} images={images} imagesResults={imagesResults} handleLike={handleLike}/>;
      default: return null;
    }
  }
  

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      initializeLineLogin()
    }else{
      devLogin()
    }
  }, [process.env.NODE_ENV]);
  return (
    <div >
      <div className=" absolute -z-10 w-full h-[200px] bg-gradient-to-b from-[#49531F]"></div>
      <Header isLoggedIn={isLoggedIn} banner={currentProfile &&currentProfile.profile_banner}/>
      <div className='lg:w-10/12 mx-auto lg:my-10'>

        <div className='px-6 py-10 lg:bg-gradient-to-b from-zinc-600 to-zinc-900 lg:rounded-lg min-h-20 text-white'>
          {
            isLoggedIn ?
            <div className='flex items-center gap-5'>
              <div className='w-[64px] h-[64px] rounded-full overflow-hidden'>
                <img src={currentProfile && currentProfile.profile_image} alt="" className='max-w-full' />
              </div>
              <div className=' flex flex-col justify-end gap-2'>
                <div className=' text-lg leading-4'>{currentProfile && currentProfile.name} </div>
                <div className=' text-xs'>{currentProfile && currentProfile.total_photos} photos </div>
              </div>
              <div className=' text-xs flex items-center ml-auto hidden '> edit<MdMoreVert size={20} /> </div>
              
            </div>
            :
            <div className=' font-bold text-xl '>用戶未登入</div>
          }

        </div>
        <div className='grid-cols-2 md:grid-cols-4  items-center gap-3 my-10 md:my-5 flex-wrap hidden lg:grid'>
          {dropDownManuItem.map((item,index)=>{
            if(!item.display) return
            return(
              <div 
                key={item.title} 
                className='bg-zinc-700 hover:bg-zinc-500 text-white rounded-full py-2 px-4 cursor-pointer md:w-auto'
                onClick={()=>{
                  handleOptionChange(item)
                }}
              >{item.title}</div>
            )
          })}
        </div>
        <div className=' relative p-4 block lg:hidden'>
          <div 
            className='text-white rounded-full bg-[#444] px-3 py-1 w-1/2 flex justify-between items-center'
            onClick={toggleDropdown}
          >{currentDropDownItem.title} <MdKeyboardArrowDown /></div>
            <motion.div
              className={`fixed w-full h-screen top-0 left-0 bg-black/60 z-20 ${isDropDownOpen ? ' ' : ' hidden'}` }
              variants={dropdownVariants}
              initial="closed"
              animate={isDropDownOpen ? 'open' : 'closed'}
              onClick={toggleDropdown}
            ></motion.div>
            <motion.div 
              className={`text-white  absolute rounded-lg bg-[#444] p-2 mt-2 w-1/3  border-white/20 z-30` }
              variants={dropdownVariants}
              initial="closed"
              animate={isDropDownOpen ? 'open' : 'closed'}
            
            >
              {dropDownManuItem.map((item,index)=>{
                if(!item.display) return
                return(
                  <div 
                    key={item.title} 
                    className='hover:bg-[#555] p-2 text-sm rounded-lg'
                    onClick={()=>{
                      setCurrentDropDownItem(item)
                      handleOptionChange(item)
                      toggleDropdown()
                    }}
                  >{item.title}</div>
                )
              })}
            </motion.div>
          


        </div>

        <div className='my-10 m-4'>
          {renderComponent()}
       
        </div> 
      </div>


    </div>
  )
}
export default Index