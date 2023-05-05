import React, { useState, useEffect }  from 'react'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import {motion,AnimatePresence} from 'framer-motion'
import { FiHeart } from "react-icons/fi";
import { MdBookmark } from "react-icons/md";
import {getWordFromLetter} from '../helpers/fetchHelper'

function Index({title,images,imagesResults,handleLike,handleNext,handlePrev}) {

  const [selectedImage, setSelectedImage] = useState(null);
  const [ isCopied , setIsCopied ] = useState(false);

  const imageVariants = {
    hidden: { opacity: 0, },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  const handleImageClick = image => {
    setSelectedImage(image);
    setIsCopied(false)
  };
  const handleModalClose = () => {
    setSelectedImage(null);
  };
  
  const onHandleLike = (image) =>{
    handleLike(image)
  }
  const onHandlePrev = (image) =>{
    handlePrev(title)
  }
  const onHandleNext = (image) =>{
    handleNext(title)
  }

  const handleCopyPrompt=(model,prompt,negative_prompt)=>{
    const text = model.toUpperCase() +' '+prompt+(negative_prompt && ' --'+negative_prompt);
    navigator.clipboard.writeText(text);
    setIsCopied(true)
  }
  

  useEffect(() => {
  }, []);
  return (
    <div >
      
      <div className='text-lime-100/70 text-xl  md:text-left md:text-3xl  m-4'>{images && images.count } {title}  </div>
      <div className='flex gap-4 items-center my-3 text-white/70 justify-end text-sm'>
        <div className='py-1 px-2 rounded-full'>{images.previous ? 
          <div onClick={onHandlePrev}>Previous</div>  
          : 
          <span className="text-white/10 cursor-not-allowed">Previous</span> }
        </div>
        <div className='py-1 px-2 rounded-full'>{images.next ?     
          <div onClick={onHandleNext}>Next</div>      
          : 
          <span className="text-white/10 cursor-not-allowed">Next</span>}
        </div>
      </div>
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
                  src={urls.thumb} alt={image?.description} 
                  data-id={id}
                  className='w-full h-auto object-cover cursor-pointer'
                  onClick={() => handleImageClick(image)} 
                />
                <div className=' backdrop-blur-md bg-black/30 flex justify-between  gap-0 p-2 w-full  absolute bottom-0 text-white'>
                  <div className=''>
                    {created_at.substr(0,10)}
                  </div>
                  <div className='ml-auto flex items-center gap-3' onClick={()=>onHandleLike(image)}>
                    <MdBookmark />
                  </div>
                </div>
              </motion.div>

            )

          })}
          </Masonry>
        </ResponsiveMasonry>
      }
    

      <AnimatePresence>
        {selectedImage && (
          <motion.div className="fixed top-0 left-0 lg:right-0 lg:bottom-0 flex z-50 bg-zinc-800 h-screen overflow-y-auto" key={selectedImage.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className=" p-4 max-w-screen-lg mx-auto  gap-3 text-white/80 relative my-5">
              <div className="flex  justify-center items-center ">
                <div className='w-full h-full'>
                  <img 
                    src={selectedImage.urls.regular} 
                    alt={selectedImage.id} 
                    className="max-h-full  rounded-md" />
                </div>
              </div>
              <div className='flex flex-col justify-end  relative pt-5 pb-20'>
                <div className='text-xs mb-3 text-white/30'>Created at {selectedImage.created_at && selectedImage.created_at.substr(0,10)}</div>
                
                <div className='text-white font-bold my-3 flex gap-2 items-center'>
                  Model
                  <div className='bg-zinc-700  px-3  py-1 rounded-md'>
                  {getWordFromLetter(selectedImage.model)}
                  </div> 
                </div>
                <div className='text-white font-bold my-3'>Prompt</div>
                <div className='bg-zinc-700 p-3 rounded-md'>
                  {selectedImage.prompt}
                </div>
                <div className='text-white font-bold my-3'>Negative prompt</div>
                <div className='bg-zinc-700 p-3 rounded-md'>
                  {selectedImage.negative_prompt}
                </div>
              </div>
              <div className='flex left-0 gap-2 justify-center items-center py-4 fixed bottom-0 z-50 w-full bg-zinc-800'>
                <button 
                  className='bg-gray-600 text-white px-2 py-1 rounded-md w-1/2 '
                  onClick={()=>handleCopyPrompt(selectedImage.model,selectedImage.prompt,selectedImage.negative_prompt)}
                  >Copy Prompt {isCopied && <span className='text-xs'> Copied! </span>}</button>
                <button className="  bg-gray-800 text-white px-2 py-1 rounded-md hover:bg-gray-700 focus:bg-gray-700" onClick={handleModalClose}>Close</button>

              </div>
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
export default Index