import React, { useState, useEffect }  from 'react'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import {motion,AnimatePresence} from 'framer-motion'
import { FiHeart } from "react-icons/fi";
import { MdKeyboardArrowDown, MdMoreHoriz, MdMoreVert,MdDone,MdClear } from "react-icons/md";
import Header from '../header'
import liff from '@line/liff';

import { isLoginState,loginState,lineProfileState, userState, imageFormModalState,imageModalState,beforeDisplayModalState } from '../atoms/galleryAtom';
import {  useRecoilValue ,useRecoilState } from 'recoil';
import { fetchLineLogin, fetchUserImages, fetchUserStorages, fetchUserCollections, userStorageAImage, fetchUserProfile, fetchUser, patchUserProfile,delUserStorageImage,userCollectionAImage,userPatchDisplayHome,userPatchAStorageImage } from '../helpers/fetchHelper';

import RenderPage from '../RenderPage'
import StoragePage from '../StoragePage'
import CollectionPage from '../CollectionPage'
import EditUserForm from '../Components/EditUserForm';
import EditImageForm from '../Components/EditImageForm';
import ImageSingleModal from '../Components/ImageSingleModal';
import BeforeDisplayFormModal from '../Components/BeforeDisplayFormModal';
const dropDownManuItem = [
  {title:"Renders", display:true},
  {title:"Storage", display:true},
  {title:"Collection", display:false},
  {title:"Following",display:false},
]
const liffID = process.env.REACT_APP_LIFF_LOGIN_ID
function Index() {

  const [images, setImages] = useState({});
  const [imagesResults, setImagesResults] = useState([]);
  const [storages, setStorages] = useState({});
  const [storagesResults, setStoragesResults] = useState([]);
  const [collections, setCollections] = useState({});
  const [collectionsResults, setCollectionsResults] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentDropDownItem, setCurrentDropDownItem] = useState(dropDownManuItem[0])
  const [currentAuthor,setCurrentAuthor] = useState({})
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)
  const [ isCopied , setIsCopied ] = useState(false);
  const [currentPage, setCurrentPage]= useState(1)
  const [totalPage, setTotalPage]= useState(1)
  const [pageSize, setPageSize] = useState(30)
  const [objectData, setObjectData] = useState({}); // 使用物件來儲存資料
  const [isEdit , setIsEdit] = useState(false)
  const [name,setName]= useState('')

  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginState);
  const [lineProfile, setLineProfile] = useRecoilState(lineProfileState);
  const [token, setToken] = useRecoilState(loginState)
  const [currentProfile, setCurrentProfile] = useRecoilState(userState);

  const [isShowFormModal, setIsShowFormModal] = useRecoilState(imageFormModalState)
  const isShowModal = useRecoilValue(imageFormModalState)
  const isShowImageModal = useRecoilValue(imageModalState)
  const [isShoDisplayFormModal, setIsShowDisplayFormModal] = useRecoilState(beforeDisplayModalState)
  const isShowBeforeDisplayModal = useRecoilValue(beforeDisplayModalState)
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
            setLineProfile(profile)
            fetchLineLogin(profile)
              .then((data)=> {
                setToken(data.token)

                fetchUserProfile(data.user_id, data.token)
                  .then((data)=> {
                    console.log(data)
                    setCurrentProfile(data)})
                  .catch((error) => console.error(error));

                fetchUserImages(profile.userId , currentPage, pageSize,data.token)
                  .then((images)=> {
                      const results = images.results
                      setImages(images)
                      setImagesResults(results)
                      setCurrentAuthor(images.results[0].author)
                  })
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
    setLineProfile(profile)
    // setCurrentProfile(profile)

    fetchLineLogin(profile)
      .then((data)=> {
        setToken(data.token)
        fetchUserProfile(data.user_id, data.token)
          .then((data)=> {
            console.log(data)
            setCurrentProfile(data)
          })
          .catch((error) => console.error(error));
        fetchUserImages(profile.userId , currentPage, pageSize,data.token)
          .then((images)=> {
              const results = images.results
              setImages(images)
              setImagesResults(results)
              setCurrentAuthor(images.results[0].author)
          })
          .catch((error) => console.error(error));

      })
      .catch((error) => console.error(error));
  }
  const handleStorage = (image) =>{
    userStorageAImage(image,token)
      .then((data)=> console.log(data))
      .catch((error) => console.error(error));
  }
  const handleCollection = (image) =>{
    userCollectionAImage(image,token)
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
      .then((data)=> {
        if(data.status === 200){
          setTimeout(()=>{
            fetchUserProfile(currentProfile.id, token)
              .then((data)=> {
                console.log(data)
                setCurrentProfile(data)})
              .catch((error) => console.error(error));
          },1000)
        }
      })
      .catch((error) => console.error(error));


  }
  const handleSetAvatar = (id)=>{
    const items={
      profile_image_id:id
    }
    patchUserProfile(currentProfile.id,token,items)
      .then((data)=> {
        if(data.status === 200){
          setTimeout(()=>{
            fetchUserProfile(currentProfile.id, token)
              .then((data)=> {
                console.log(data)
                setCurrentProfile(data)})
              .catch((error) => console.error(error));
          },1000)
        }
      })
      .catch((error) => console.error(error));
  }
  const handleSetName = ()=>{
    const items={
      name:name
    }
    patchUserProfile(currentProfile.id,token,items)
      .then((data)=> {
        if(data.status === 200){
          setTimeout(()=>{
            fetchUserProfile(currentProfile.id, token)
              .then((data)=> {
                console.log(data)
                setCurrentProfile(data)})
              .catch((error) => console.error(error));
          },1000)
        }
      })
      .catch((error) => console.error(error));
  }
  const handleSetUserProfile = (items)=>{

    patchUserProfile(currentProfile.id,token,items)
      .then((data)=> {
        if(data.status === 200){
          setTimeout(()=>{
            fetchUserProfile(currentProfile.id, token)
              .then((data)=> {
                console.log(data)
                setCurrentProfile(data)
                setTimeout(()=>{setIsEdit(false)},500)
              })
              .catch((error) => console.error(error));
          },1000)
        }
      })
      .catch((error) => console.error(error));
  }
  /**
   * Storage API 
   * start
   * */ 
  const handleSetStorageImage = (image,items,status) =>{

    userPatchAStorageImage(image.id,token,items)
      .then((data)=>{
        const newData = { ...image, ...items  }; 
        handleStorageUpdate(image.id,newData)
        if(status === 'before'){
          setIsShowDisplayFormModal(false)
        }else{
          setIsShowFormModal(false)
        }
      })
      .catch((error) => console.error(error));
  }
  const handleDisplayHome = (id,items)=>{
    userPatchDisplayHome(id,token,items)
      .then((data)=>{
        console.log('display home update')
      })
      .catch((error) => console.error(error));
  }
  const handleRemoveStorage = (id)=>{
    delUserStorageImage(id,token)
      .then((data)=> {
        if(data.status === 200 || data.status === 204){
          setTimeout(()=>{
            fetchUserStorages(currentProfile.id,token)
            .then((images)=> {
                setStorages(images)
                setStoragesResults(images.results)
            })
            .catch((error) => console.error(error));
          },1000)
        }
      })
      .catch((error) => console.error(error));
  }
  const handleStorageUpdate = (id,newData)=>{
    setStoragesResults(prevData => {
      const index = prevData.findIndex(item => item.id === id);
      if (index === -1) {
        // 如果没有找到对应的元素，直接返回原来的状态
        return prevData;
      }
      const updatedData = [...prevData];
      updatedData[index] = {...updatedData[index], ...newData};
      return updatedData;
    });
  }
  /**
   * Storage API 
   * End
   * */ 
  const handleUpdate = (id, newData) => {
    // 找到要更新的資料並進行更新
    setImagesResults(prevData => {
      const index = prevData.findIndex(item => item.id === id);
      if (index === -1) {
        // 如果没有找到对应的元素，直接返回原来的状态
        return prevData;
      }
      const updatedData = [...prevData];
      updatedData[index] = {...updatedData[index], ...newData};
      return updatedData;
    });
  };

  

  useEffect(() => {
    handleOptionChange(currentDropDownItem);
  }, [currentPage]);
  const toggleDropdown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };
  const handleOptionChange = async (item) => {
    switch (item.title) {
      case 'Renders':
        fetchUserImages(currentProfile.uid,currentPage,pageSize,token)
          .then((images)=> {
              const results = images.results
              setImages(images)
              setImagesResults(results)
          })
          .catch((error) => console.error(error));
        break;
      case 'Storage':
        fetchUserStorages(currentProfile.id,token)
          .then((images)=> {
              setStorages(images)
              setStoragesResults(images.results)
          })
          .catch((error) => console.error(error));
        break;
      case 'Collection':
        fetchUserCollections(currentProfile.id,token)
          .then((images)=> {
              setCollections(images)
              setCollectionsResults(images.results)
          })
          .catch((error) => console.error(error));
        break;
      case 'Following':
        fetchUserImages(currentProfile.uid,token)
          .then((images)=> {
              setImages(images)
              setImagesResults(images.results)
          })
          .catch((error) => console.error(error));
        break;
      default: return null;
    }
  };
  const renderComponent =  () => {
    switch (currentDropDownItem.title) {
      case 'Renders':
        return <RenderPage title={currentDropDownItem.title} images={images} imagesResults={imagesResults} handleStorage={handleStorage} handleCollection={handleCollection} handleNext={handleNext} handlePrev={handlePrev} handleUpdate={handleUpdate} currentPage={currentPage} totalPage={totalPage} handleRemoveStorage={handleRemoveStorage} />;
      case 'Storage':
        return <StoragePage title={currentDropDownItem.title} images={storages} imagesResults={storagesResults} currentProfile={currentProfile} handleStorage={handleStorage} handleRemoveStorage={handleRemoveStorage} handleCollection={handleCollection} handleSetBanner={handleSetBanner} handleSetAvatar={handleSetAvatar} handleDisplayHome={handleDisplayHome} handleStorageUpdate={handleStorageUpdate} />;
      case 'Collection':
        return <CollectionPage title={currentDropDownItem.title} images={collections} imagesResults={collectionsResults} handleStorage={handleStorage} />;
      case 'Following':
        return <RenderPage title={currentDropDownItem.title} images={images} imagesResults={imagesResults} handleStorage={handleStorage}/>;
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
      <AnimatePresence>
        {isEdit && (<EditUserForm userData={currentProfile} handleEdit={()=>setIsEdit(!isEdit)} handleSetUserProfile={handleSetUserProfile}/>
          )}
        {isShowModal && (<EditImageForm handleSetStorageImage={handleSetStorageImage}/>)}
        {isShowImageModal && (<ImageSingleModal/>)}
        {isShowBeforeDisplayModal && (<BeforeDisplayFormModal handleSetStorageImage={handleSetStorageImage}/>)}

      </AnimatePresence>

      <Header isLoggedIn={isLoggedIn} banner={currentProfile &&currentProfile.profile_banner}/>

      <div className='lg:w-10/12 mx-auto lg:my-10'>

        <div className='px-6 py-5 lg:bg-gradient-to-b from-zinc-600 to-zinc-900 lg:rounded-lg min-h-20 text-white'>
          {
            isLoggedIn ?
            <div className='flex flex-col items-center gap-5'>
              <div 
                style={{backgroundImage:`url(${currentProfile?.profile_banner})`}}
                className=' absolute top-0 left-0 -z-10  w-full h-[23vh] bg-cover bg-center bg-no-repeat brightness-75'>
                <div className='absolute -bottom-2 left-0 w-full h-32 z-10 bg-gradient-to-t from-[#1e1e1e]  '></div>

              </div>
              <div 
                className='w-[85px]  aspect-square rounded-full overflow-hidden bg-center bg-no-repeat bg-cover bg-black '
                style={{backgroundImage:currentProfile  ?  `url(${currentProfile.profile_image})` : 'none'}}
              ></div>
              <div 
                className=' text-xs flex items-center ml-auto absolute top-32 right-5  '
                onClick={()=>setIsEdit(true)}
              > 
                edit<MdMoreVert size={20} /> 
              </div>
              <div className=' flex flex-col justify-center items-center gap-2'>
                <div className=' text-xl leading-4'>{currentProfile && currentProfile.name} </div>
                <div className=' text-xs'>{currentProfile && currentProfile.bio}  </div>
              </div>


              <div className='grid grid-cols-3  divide-x'>
                <div className=' text-xs px-8'>
                  <div>{currentProfile && currentProfile.total_photos} </div>
                  <div>renders</div> 
                </div>
                <div className=' text-xs px-8'>
                  <div>{currentProfile && currentProfile.total_collections}</div> 
                  <div>collections</div> 
                </div>
                <div className=' text-xs px-8'>
                  <div>{currentProfile && currentProfile.total_follows}</div> 
                  <div>follows</div> 
                </div>
              </div>
         
             
              
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
        <div className=' relative p-4  w-2/3 mx-auto block lg:hidden'>
          <div 
            className='text-white rounded-full bg-[#444] px-3 py-2 flex justify-between items-center'
            onClick={toggleDropdown}
          >
            {currentDropDownItem.title} <MdKeyboardArrowDown />
          </div>
            <motion.div
              className={`fixed w-full h-screen top-0 left-0 bg-black/60 z-20 ${isDropDownOpen ? ' ' : ' hidden'}` }
              variants={dropdownVariants}
              initial="closed"
              animate={isDropDownOpen ? 'open' : 'closed'}
              onClick={toggleDropdown}
            ></motion.div>
            <motion.div 
              className={`text-white  absolute rounded-lg bg-[#444] my-2 w-2/3  border-white/20 z-30` }
              variants={dropdownVariants}
              initial="closed"
              animate={isDropDownOpen ? 'open' : 'closed'}
            
            >
              {dropDownManuItem.map((item,index)=>{
                if(!item.display) return
                return(
                  <div 
                    key={item.title} 
                    className='hover:bg-[#555] px-4 py-4 text-sm rounded-lg'
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