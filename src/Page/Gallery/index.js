import React, { useState, useEffect } from 'react';
import Login from './Login'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import {motion} from 'framer-motion'
import { MdDownload } from "react-icons/md";
import { FiHeart,FiDownload } from "react-icons/fi";
import Header from './header'
function Index() {
  const [images, setImages] = useState([]);
  const imageVariants = {
    hidden: { opacity: 0, },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  useEffect(() => {
    fetch('https://api.unsplash.com/photos/random/?count=20&query=comic&client_id=DCUhBM_oZlz9QER7d4jrb-Eqq6gqygd8aHwRIFA2TGI')
      .then(res => res.json())
      .then(images => setImages(images));
  }, []);
  return (
    <div className='w-full'>
      <Header />
      <div className='w-10/12 mx-auto my-10'>
        <div className='my-5 text-white flex items-center gap-2'> <span className=' rounded-md bg-zinc-600 text-sm text-white px-3 py- '>User</span>  woodwu testing</div>
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
              <img  src={image.urls.regular} alt={image.description} className='w-full h-auto object-cover' />
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
      </div>


    </div>
  )
}

export default Index