import React, { useState, useEffect } from 'react';
import Login from './Login'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import {motion,AnimatePresence} from 'framer-motion'
import { MdDownload } from "react-icons/md";
import { FiHeart,FiDownload } from "react-icons/fi";
import Header from './header'
import liff from '@line/liff';
function Index() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentProfile, setCurrentProfile] = useState(null);
  const imageVariants = {
    hidden: { opacity: 0, },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  const liffID = '1660658719-0BvpAjkG'

  const fetchUserImages = (profile)=>{
    if(profile){
      fetch('https://linebot.moonshot.today/api/gallery?id='+currentProfile.userId)
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
    // initializeLineLogin();
  }, []);
  return (
    <div className='w-full'>
      <Header />
      <div className='w-10/12 mx-auto my-10'>
        <div className='my-5 text-white/80 flex items-center gap-2'> <span className=' rounded-md bg-zinc-600 text-sm text-white px-3 py- '>User</span> {currentProfile && currentProfile.displayName}</div>
        {!images ?
          <div className='text-white'>Loading</div> 
          : 
          <ResponsiveMasonry
            className=''
            columnsCountBreakPoints={{350: 1, 750: 2, 900: 4}}
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
        
        <AnimatePresence>
          {selectedImage && (
            <motion.div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50" key={selectedImage.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="bg-zinc-800 rounded-md shadow-lg p-4 max-w-screen-lg mx-auto flex gap-3 text-white/80 ">
                <div className="flex w-1/2 relative justify-center items-center ">
                  <div className='w-full h-full'>
                    <img src={selectedImage.imgurl} alt={selectedImage?.description } className="max-h-full  rounded-md" />
                  </div>
                  
                  <button className="absolute top-2 right-2 bg-gray-800 text-white px-2 py-1 rounded-md hover:bg-gray-700 focus:bg-gray-700" onClick={handleModalClose}>Close</button>
                </div>
                <div className='border border-zinc-500 rounded-md p-3 w-1/2'>
                  <div className='text-xs mb-3 text-white/30'>Created at {selectedImage?.created_at.substr(0,10)}</div>
                  <div className='text-white font-bold mb-3'>Description</div>
                  {selectedImage?.description && <p className="">{selectedImage?.description}</p>}

                  <div className='text-white font-bold my-3'>Prompt</div>
                  <div className='bg-zinc-700 p-3 rounded-md'>
                    1girl, (hanfu), sidelighting, wallpaper,
                  </div>
                  <div className='text-white font-bold my-3'>Negative prompt</div>
                  <div className='bg-zinc-700 p-3 rounded-md'>
                    (worst quality:2, low quality:2), (zombie, sketch, interlocked fingers, comic),
                  </div>
                  
                </div>
                
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>


    </div>
  )
}

export default Index