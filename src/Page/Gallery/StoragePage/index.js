import React, { useState, useEffect }  from 'react'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import {motion,AnimatePresence} from 'framer-motion'
import { MdBookmarkRemove,MdMoreVert,MdVisibility,MdVisibilityOff,MdErrorOutline } from "react-icons/md";
import {  useRecoilValue ,useRecoilState } from 'recoil';
import { imageFormModalState, imageDataState,imageModalState } from '../atoms/galleryAtom';
function Index({title,images,imagesResults,currentProfile,handleStorage,handleRemoveStorage,handleSetBanner,handleSetAvatar,handleDisplayHome,handleStorageUpdate}) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)
  const [openItems, setOpenItems] = useState([]);
  const [isShowFormModal, setIsShowFormModal] = useRecoilState(imageFormModalState)
  const [isShowimageModal, setIsShowImageModal] = useRecoilState(imageModalState)
  const [imageData, setImageData] = useRecoilState(imageDataState)
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
  const onHandleRemoveStorage = (image)=>{
    console.log(image)
    if(image.urls.regular === currentProfile.profile_banner || image.urls.regular === currentProfile.profile_image)
    {
      console.log('yes')
      setShow(true)
    }else{   
      console.log('no')
      handleRemoveStorage(image.id)
    }

    // 
  }
  const handleClick = (id) => {
    if (openItems.includes(id)) {
      setOpenItems(openItems.filter((item) => item !== id));
    } else {
      setOpenItems([...openItems, id]);
    }
  };
  const onHandleDisplayHome = (image)=>{
    const items = {
      display_home:!image.display_home
    }
    if(image.display_home === true){
      const newData = { ...image, display_home: !image.display_home  }; 
      handleStorageUpdate(image.id,newData)
      handleDisplayHome(image.id,items)

    }else{
      const newData = { ...image, display_home: !image.display_home  }; 
      handleStorageUpdate(image.id,newData)
      handleDisplayHome(image.id,items)
    }
  }
  const onHandleSetBanner = (id)=>{
    handleSetBanner(id)
  }
  const onHandleSetAvatar = (id)=>{
    handleSetAvatar(id)
  }
  const onHandleEditImageDetail = (image)=>{
    console.log(image)
  }
  const [show , setShow]=useState(false)
  const ConfirmCancelMsg = ({setShow})=>{
    const handleClose = ()=>{
      setShow(false)
    }
    return (
      <div className=' fixed z-50 top-0 left-0 w-full'>
        <div className='bg-black/50 w-full h-screen' onClick={handleClose}></div>
        <motion.div 
          initial={{ opacity: 0, y: -20 ,x:'-50%'}}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className=' bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#49531F] via-black  to-zinc-800 rounded-lg p-4 box-border text-white fixed top-32 left-1/2 -translate-x-1/2 w-4/5 overflow-y-auto max-h-[25vh]'
        >
          <div className='flex flex-col items-center gap-3'>
            <div><MdErrorOutline size={26} /></div>
            This image is assigned a banner or avatar.
            <button className='  py-1 px-2 rounded-md bg-[#4c5a13]' onClick={handleClose}>OK</button>
          </div>

        </motion.div>
      </div>
    )
  }
  

  return (
    <div >
          <div className='text-lime-100/70 text-xl  md:text-left md:text-3xl  m-4'>{title}  </div>
          {show && <ConfirmCancelMsg setShow={setShow} />  }
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
                  className=' rounded-lg overflow-hidden relative w-full aspect-square  object-cover '
                >
                  <img  
                    src={urls.thumb} alt={image?.description} 
                    data-id={id}
                    className='w-full h-auto object-cover cursor-pointer aspect-square'
                    onClick={() => {
                      setImageData(image)
                      setIsShowImageModal(true)
                    }} 
                  />
                  
                  <div className=' absolute top-0 left-0 text-white w-full flex justify-between items-center p-1 '> 
                    <div className='pt-3 pl-2' onClick={()=>{
                      handleClick(id)
                    }}><MdMoreVert size={20} /></div>
                    <div className='text-white'>
                      { display_home ? 
                        <div className='pt-3 pr-2' onClick={()=>{
                          onHandleDisplayHome(image)
                        }}><MdVisibility size={20}/></div>
                        :
                        <div className='pt-3 pr-2' onClick={()=>{
                          onHandleDisplayHome(image)
                        }}> <MdVisibilityOff size={20}/></div>
                      }
                    </div>
                    <motion.div
                      className={`absolute w-full h-screen top-0 left-0 bg-black/60 -z-0 ${openItems.includes(id) ? ' ' : ' hidden'}` }
            
                      onClick={()=>{
                        handleClick(id)
                      }}
                    ></motion.div>
                    <motion.div 
                      className={`text-white  absolute top-10  w-auto  rounded-lg bg-[#444] p-2 mt-2  border-white/20 z-30` }
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
                      <div className='hover:bg-[#555] p-2 text-sm rounded-lg'
                        onClick={()=>{
                          handleClick(id)
                          setIsShowFormModal(true)
                          setImageData(image)
                          onHandleEditImageDetail(image)
                        }}
                      >Edit detail</div>              
                    </motion.div>
                    
                  </div>
                  <div className=' backdrop-blur-md bg-black/30 flex justify-between  gap-0 p-2 w-full  absolute bottom-0 text-white'>
                    <div className='text-sm'>
                      {created_at.substr(0,10)}
                    </div>
                    <div className='flex gap-4'>
                      <div className=' flex items-center gap-1  text-sm ' onClick={()=>onHandleRemoveStorage(image)}>
                        <MdBookmarkRemove />Remove
                      </div>


                    </div>

                  </div>
                </motion.div>

              )

            })}
            </Masonry>
          </ResponsiveMasonry>

        }
    </div>
  )
}
export default Index