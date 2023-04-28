import React, { useState, useEffect }  from 'react'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import {motion,AnimatePresence} from 'framer-motion'
import { FiHeart,FiDownload } from "react-icons/fi";
import Header from '../header'
import liff from '@line/liff';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentProfile, setCurrentProfile] = useState(null);
  const imageVariants = {
    hidden: { opacity: 0, },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  const liffID = process.env.REACT_APP_LIFF_LOGIN_ID
  const fetchUserImages = (profile)=>{
    if(profile){
      fetch('https://linebot.moonshot.today/api/gallery?id='+profile.userId)
      .then(res => res.json())
      .then(images => setImages(images));
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

        console.log("getAccessToken", accessToken);
        if(accessToken){
          liff.getProfile().then(profile=>{
            console.log(profile)
            setCurrentProfile(profile)
            fetchUserImages(profile)
          }).catch(err => console.log(err))
        }


      } else {
        liff.login();
      }

    
    }).catch(function(error) {
      console.log(error);
    });
  }
  useEffect(() => {
    initializeLineLogin()
  }, []);
  return (
    <div>
      <Header />
      <div className='w-10/12 mx-auto my-10'>

        <div className='px-6 py-10 bg-gradient-to-b from-zinc-600 to-zinc-800 rounded-lg min-h-20 text-white'>
          <div className='flex items-center gap-5'>
            <div className='w-[64px] h-[64px] rounded-full overflow-hidden'>
              <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" alt="" className='max-w-full' />
            </div>
            <div className=' font-bold text-xl '>{isLoggedIn ? 'NAme' : '用戶未登入'}</div>
          </div>
        </div>
        <div className='flex items-center gap-3 my-5'>
          <div className='bg-zinc-700 hover:bg-zinc-500 text-white rounded-full py-2 px-4 cursor-pointer'>Renders</div>
          <div className='bg-zinc-700 hover:bg-zinc-500 text-white rounded-full py-2 px-4 cursor-pointer'>Collections</div>
          <div className='bg-zinc-700 hover:bg-zinc-500 text-white rounded-full py-2 px-4 cursor-pointer'>Loved</div>
          <div className='bg-zinc-700 hover:bg-zinc-500 text-white rounded-full py-2 px-4 cursor-pointer'>Following</div>
        </div>
        <div>
          <div className='text-white text-3xl my-10'>Renders</div>
          {!images ?
          <div className='text-white'>Loading</div> 
          : 
          <ResponsiveMasonry
            className=''
            columnsCountBreakPoints={{350: 1, 750: 2, 900: 4,1700:5}}
            >
            <Masonry gutter={20}>
            {images.map((image,index) => (
              <motion.div key={image.id} 
                variants={imageVariants} initial="hidden" animate="visible" transition={{ delay: index * 0.1 }}
                className=' rounded-lg overflow-hidden relative'
              >
                <img  
                  src={image.imgurl} alt={image?.description} 
                  className='w-full h-auto object-cover cursor-pointer'
                  onClick={() => handleImageClick(image)} 
                />
                <div className=' backdrop-blur-md bg-black/30 flex flex-col gap-0 p-2 w-full  absolute bottom-0 text-white'>
                  <div className=''>
                    Image Title
                  </div>
                  <div className='ml-auto flex items-center gap-3'>
                    <FiHeart />
                    <FiDownload />
                  </div>
                </div>
              </motion.div>

            ))}
            </Masonry>
          </ResponsiveMasonry>
        }
        </div> 
      </div>

    </div>
  )
}

export default App