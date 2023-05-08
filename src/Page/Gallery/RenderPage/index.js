import React, { useState, useEffect }  from 'react'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import {motion,AnimatePresence} from 'framer-motion'
import { FiHeart } from "react-icons/fi";
import { MdBookmark,MdMoreVert,MdBookmarkBorder } from "react-icons/md";
import {getWordFromLetter} from '../helpers/fetchHelper'

function Index({title,images,imagesResults,handleLike,handleNext,handlePrev,handleSetBanner,handleSetAvatar,handleUpdate}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [ isCopied , setIsCopied ] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)
  const [openItems, setOpenItems] = useState([]);
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
    setIsCopied(false)
  };
  const handleModalClose = () => {
    setSelectedImage(null);
  };
  const handleClick = (id) => {
    if (openItems.includes(id)) {
      setOpenItems(openItems.filter((item) => item !== id));
    } else {
      setOpenItems([...openItems, id]);
    }
  };
  const onHandleLike = (image) =>{
    handleLike(image)
    if(image.is_storage === true) return
    const newData = { ...image, is_storage: !image.is_storage  }; 
    handleUpdate(image.id,newData)
  }
  const onHandlePrev = (image) =>{
    handlePrev(title)
  }
  const onHandleNext = (image) =>{
    handleNext(title)
  }
  const onHandleSetBanner = (id)=>{
    handleSetBanner(id)
  }
  const onHandleSetAvatar = (id)=>{
    handleSetAvatar(id)
  }
  const toggleDropdown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const handleCopyPrompt=(model,prompt,negative_prompt)=>{
    const text = model.toUpperCase() +' '+prompt+(negative_prompt && ' --'+negative_prompt);
    navigator.clipboard.writeText(text);
    setIsCopied(true)
  }
  

  useEffect(() => {
  }, []);
  return (
    <div >
      
      <div className='text-lime-100/70 text-xl  md:text-left md:text-3xl  m-4'>{title}  </div>
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
            const {id, urls, created_at, display_home, filename,is_storage   } = image
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

                <div className=' absolute top-0 left-0 text-white w-full hidden'> 
                  <div className='pt-3 pl-2' onClick={()=>{
                    handleClick(id)
                  }}><MdMoreVert size={20} /></div>
                  <motion.div
                    className={`absolute w-full h-screen top-0 left-0 bg-black/60 -z-0 ${openItems.includes(id) ? ' ' : ' hidden'}` }
          
                    onClick={()=>{
                      handleClick(id)
                    }}
                  ></motion.div>
                  <motion.div 
                    className={`text-white  absolute  w-auto  rounded-lg bg-[#444] p-2 mt-2  border-white/20 z-30` }
                    variants={dropdownVariants}
                    initial="closed"
                    animate={openItems.includes(id) ? 'open' : 'closed'}
                  >
                    <div className='hover:bg-[#555] p-2 text-sm rounded-lg'
                      onClick={()=>{
                        handleClick(id)
                        onHandleSetBanner(id)
                      }}
                    >Set as Banner</div>      
                    <div className='hover:bg-[#555] p-2 text-sm rounded-lg'
                      onClick={()=>{
                        handleClick(id)
                        onHandleSetAvatar(id)
                      }}
                    >Set as Avatar</div>                
                  </motion.div>
                </div>
                <div className=' backdrop-blur-md bg-black/30 flex justify-between  gap-0 p-2 w-full  absolute bottom-0 text-white'>
                  <div className=''>
                    {created_at.substr(0,10)}
                  </div>
                  {
                    is_storage ? 
                    <div className='ml-auto flex items-center gap-3 text-white' onClick={()=>onHandleLike(image)}>
                      <MdBookmark />
                    </div>
                    :
                    <div className='ml-auto flex items-center gap-3 text-white' onClick={()=>onHandleLike(image)}>
                      <MdBookmarkBorder />
                    </div>
                  }

                </div>
              </motion.div>

            )

          })}
          </Masonry>
        </ResponsiveMasonry>
      }
    

      <AnimatePresence>
        {selectedImage && (
          <motion.div className=" fixed w-full top-0 left-0 lg:right-0 lg:bottom-0 flex z-50 bg-zinc-800   h-screen overflow-y-auto" key={selectedImage.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="w-full p-4  text-white/80 relative">
              <div className="flex  justify-center items-center w-full">
                <div className='w-full h-full'>
                  <img 
                    src={selectedImage.urls.regular} 
                    alt={selectedImage.id} 
                    className="max-w-full   rounded-md" />
                </div>
              </div>
              <div className='flex flex-col justify-end  relative pb-20 pt-2'>
                <div className='text-xs mb-3 text-white/40'>Created at {selectedImage.created_at && selectedImage.created_at.substr(0,10)}</div>
                
                <div className='text-white font-bold my-3 flex gap-2 items-center'>
                  Model
                  <div className='bg-zinc-700  px-3  py-1 rounded-md'>
                  {getWordFromLetter(selectedImage.model)}
                  </div> 
                </div>
                <div className='text-white font-bold my-3 '>Prompt</div>
                <div className='bg-zinc-700 p-3 rounded-md whitespace-normal break-words'>
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