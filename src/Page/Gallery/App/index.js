import React, { useState, useEffect }  from 'react'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import {motion,AnimatePresence} from 'framer-motion'
import { FiHeart,FiDownload } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";

import Header from '../header'
import liff from '@line/liff';

import { loginState, userState } from '../atoms/modalAtom';
import {  useRecoilValue ,useRecoilState } from 'recoil';
const dropDownManuItem = [
  {title:"Renders", display:true},
  {title:"Storage", display:false},
  {title:"Collection", display:false},
  {title:"Following",display:false},
]
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [images, setImages] = useState([]);
  const [imagesResults, setImagesResults] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentProfile, setCurrentProfile] = useRecoilState(userState);
  const [currentDropDownItem, setCurrentDropDownItem] = useState(dropDownManuItem[0])
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)
  const [token, setToken] = useRecoilState(loginState)

  const imageVariants = {
    hidden: { opacity: 0, },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  const dropdownVariants = {
    open: {
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
    closed: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };
  const liffID = process.env.REACT_APP_LIFF_LOGIN_ID
  const fetchUserImages = (profile)=>{
    if(profile){
      fetch('https://linebot.moonshot.today/api/gallery?id='+profile.userId)
      .then(res => res.json())
      .then(images => {
        setImages(images)
        setImagesResults(images)
      });
    } else{

    }

  }
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
            console.log(profile)
            setCurrentProfile(profile)
            fetchUserImages(profile)
            fetchlinelogin(profile)
          }).catch(err => console.log(err))
        }


      } else {
        liff.login();
      }

    
    }).catch(function(error) {
      console.log(error);
    });
  }
  const fetchlinelogin = (profile)=>{
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Token ${process.env.REACT_APP_MOONSHOT_LINELOGIN_APIKEY}`
      },
      body: JSON.stringify({ 
        uid:  profile.userId,
        name: profile.displayName,
        profile_image: profile.pictureUrl
      })
    };
    fetch('https://api-dev.moonshot.today/line_login', requestOptions)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setToken(data)
      });
  }
  const toggleDropdown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  useEffect(() => {
    initializeLineLogin()
  }, []);
  return (
    <div >
      <div className=" absolute -z-10 w-full h-[200px] bg-gradient-to-b from-[#49531F]"></div>
      <Header isLoggedIn={isLoggedIn}/>
      <div className='lg:w-10/12 mx-auto lg:my-10'>

        <div className='px-6 py-10 lg:bg-gradient-to-b from-zinc-600 to-zinc-900 lg:rounded-lg min-h-20 text-white'>
          {
            isLoggedIn ?
            <div className='flex items-center gap-5'>
              <div className='w-[64px] h-[64px] rounded-full overflow-hidden'>
                <img src={currentProfile && currentProfile.pictureUrl} alt="" className='max-w-full' />
              </div>
              <div className=' font-bold text-xl '>{currentProfile && currentProfile.displayName}</div>
            </div>
            :
            <div className=' font-bold text-xl '>用戶未登入</div>
          }

        </div>
        <div className='grid-cols-2 md:grid-cols-4  items-center gap-3 my-10 md:my-5 flex-wrap hidden lg:grid'>
          <div className='bg-zinc-700 hover:bg-zinc-500 text-white rounded-full py-2 px-4 cursor-pointer md:w-auto'>Renders</div>
          <div className='bg-zinc-700 hover:bg-zinc-500 text-white rounded-full py-2 px-4 cursor-not-allowed md:w-auto opacity-30' >Collections</div>
          <div className='bg-zinc-700 hover:bg-zinc-500 text-white rounded-full py-2 px-4 cursor-not-allowed md:w-auto opacity-30'>Loved</div>
          <div className='bg-zinc-700 hover:bg-zinc-500 text-white rounded-full py-2 px-4 cursor-not-allowed md:w-auto opacity-30'>Following</div>
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
                return(
                  <div 
                    key={item.title} 
                    className='hover:bg-[#555] p-2 text-sm rounded-lg'
                    onClick={()=>{
                      setCurrentDropDownItem(item)
                      toggleDropdown()
                    }}
                  >{item.title}</div>
                )
              })}
            </motion.div>
          


        </div>

        <div className='my-10 m-4'>
          <div className='text-lime-100/70 text-xl  md:text-left md:text-3xl  m-4'>{currentDropDownItem.title} {images && images.count } </div>
          {!imagesResults ?
          <div className='text-white'>Loading</div> 
          : 
          <ResponsiveMasonry
            className=''
            columnsCountBreakPoints={{350: 1, 750: 2, 900: 4,1700:5}}
            >
            <Masonry gutter={20}>
            {imagesResults.map((image,index) => {
              const {id, urls, created_at, display_home, filename   } = image
              return (
                <motion.div key={id} 
                  variants={imageVariants} initial="hidden" animate="visible" transition={{ delay: index * 0.1 }}
                  className=' rounded-lg overflow-hidden relative'
                >
                  <img  
                    src={image.imgurl} alt={image?.description} 
                    className='w-full h-auto object-cover cursor-pointer'
                    onClick={() => handleImageClick(image)} 
                  />
                  <div className=' backdrop-blur-md bg-black/30 flex flex-col gap-0 p-2 w-full  absolute bottom-0 text-white'>
                    <div className=' opacity-0'>
                      Image Title
                    </div>
                    <div className='ml-auto flex items-center gap-3'>
                      <FiHeart />
                    </div>
                  </div>
                </motion.div>

              )

            })}
            </Masonry>
          </ResponsiveMasonry>
        }
        </div> 
      </div>
        <AnimatePresence>
          {selectedImage && (
            <motion.div className="fixed top-0 left-0 lg:right-0 lg:bottom-0 flex items-center justify-center z-50 bg-black h-screen" key={selectedImage.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="bg-zinc-800 rounded-md p-4 max-w-screen-lg mx-auto  gap-3 text-white/80 ">
                <div className="flex   justify-center items-center ">
                  <div className='w-full h-full'>
                    <img 
                      src={selectedImage.imgurl} 
                      alt={selectedImage.description && selectedImage.description  } 
                      className="max-h-full  rounded-md" />
                  </div>
                </div>
                <div className='max-h-[50vh] flex flex-col justify-end py-10'>
                  <div className='text-xs mb-3 text-white/30'>Created at {selectedImage.created_at && selectedImage.created_at.substr(0,10)}</div>
                  <div className='text-white font-bold my-3'>Prompt</div>
                  <div className='bg-zinc-700 p-3 rounded-md'>
                    1girl, (hanfu), sidelighting, wallpaper,
                  </div>
                  <div className='text-white font-bold my-3'>Negative prompt</div>
                  <div className='bg-zinc-700 p-3 rounded-md'>
                    (worst quality:2, low quality:2), (zombie, sketch, interlocked fingers, comic),
                  </div>

                  <div className='flex gap-2 justify-center items-center mt-10'>
                    <button className='bg-gray-600 text-white px-2 py-1 rounded-md w-1/2 '>Copy Prompt</button>
                    <button className="  bg-gray-800 text-white px-2 py-1 rounded-md hover:bg-gray-700 focus:bg-gray-700" onClick={handleModalClose}>Close</button>

                  </div>

                  
                </div>
                
              </div>
            </motion.div>
          )}
        </AnimatePresence>

    </div>
  )
}

export default App