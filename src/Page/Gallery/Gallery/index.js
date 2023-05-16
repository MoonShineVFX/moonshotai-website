import React, { useState, useEffect } from 'react';
import {motion,AnimatePresence} from 'framer-motion'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { Link } from "react-router-dom";
import Header from '../header'
import {initializeLineLogin,useDevUserLogin,fetchGalleries} from '../helpers/fetchHelper'
import {  useRecoilValue ,useRecoilState } from 'recoil';
import { loginState} from '../atoms/galleryAtom';

function Index() {
  const [devLogin,isLogin,token] = useDevUserLogin();
  const [data, setData] = useState(null)
  const [headers, setHeaders] = useState({'Content-Type': 'application/json'})
  const imageVariants = {
    hidden: { opacity: 0, },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  useEffect(()=>{
    fetchGalleries(headers).then(data=>setData(data.results))

  },[])
  console.log(data)
  return (
    <div className='w-full'>
      <Header />
      <div className='w-11/12 mx-auto my-10'>

          {!data ? 
          <div className='text-white'>Loading</div> 
          :
          <ResponsiveMasonry
            className=''
            columnsCountBreakPoints={{350: 1, 750: 2, 900: 4,1700:5}}
          >
          <Masonry gutter={10}>
            {data.map((image,index)=>{
              const {id, urls, created_at, display_home, filename,is_storage,title,author   } = image
              return (
                <motion.div key={'render-'+index} 
                  variants={imageVariants} initial="hidden" animate="visible" transition={{ delay: index * 0.1 }}
                  className=' rounded-lg overflow-hidden relative'
                >
                  <img  
                    src={urls.thumb} alt={image?.description} 
                    data-id={id}
                    className='w-full  cursor-pointer  '
                  />
                  <div className=' absolute bottom-16 right-4'>
                    <div 
                      className='w-[65px]  aspect-square rounded-full overflow-hidden bg-center bg-no-repeat bg-cover bg-black border-2 border-zinc-200 '
                      style={{backgroundImage: `url(${author?.profile_image})`}}
                    ></div>
                  </div>

                  <div className='text-sm backdrop-blur-md bg-black/30 flex flex-col justify-between  gap-0 p-2 w-full  absolute bottom-0 text-white'>
                    <div className=''>
                      {title} 
                    </div>
                    <div className='flex gap-4'>
                      <div>收藏</div>
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
  )
}

export default Index