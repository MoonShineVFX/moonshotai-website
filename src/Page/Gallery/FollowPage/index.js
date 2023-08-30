import React, { useState, useEffect }  from 'react'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { Link } from "react-router-dom";
import {motion,AnimatePresence} from 'framer-motion'
import { MdErrorOutline } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import {  useRecoilValue ,useRecoilState } from 'recoil';
import { imageFormModalState, imageDataState,imageModalState,beforeDisplayModalState } from '../atoms/galleryAtom';
import { EmptyFollowPage,ImageWithFallback } from '../helpers/componentsHelper';
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
function Index({title,follows,followsResults,currentProfile,handleUnfollow,totalImage}) {
  const [openItems, setOpenItems] = useState([]);
  const [isShowFormModal, setIsShowFormModal] = useRecoilState(imageFormModalState)
  const [isShoDisplayFormModal, setIsShowDisplayFormModal] = useRecoilState(beforeDisplayModalState)
  const [isShowimageModal, setIsShowImageModal] = useRecoilState(imageModalState)
  const [imageData, setImageData] = useRecoilState(imageDataState)
  const [currentItem, setCurrentItem] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
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
  const onHandlUnfollow = (user)=>{
    console.log(user)
    handleUnfollow(user)


    // 
  }
  const onHandleRemoveFollow = (user)=>{
    handleUnfollow(user,'collectionPage')
    setOpen(!open)
  }
  if(totalImage === 0) {
    return <div>
      <div className='text-white text-xl font-bolds  md:text-left md:text-3xl  mb-4'>{title} <div className='text-xs text-white/50'>{totalImage} items</div>  </div>
      <EmptyFollowPage />
    </div>
  }

  return (
    <div >
        <Dialog
            open={open}
            size={"xs"}
            handler={handleOpen}
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0.9, y: -100 },
            }}
            className='bg-gray-900'
          >
            <DialogHeader className='text-lg text-white/80'>移除追隨使用者</DialogHeader>
            <DialogBody 
        
              className=' text-white '>
              你確定要停止追隨這位使用者嗎？
            </DialogBody>
            <DialogFooter className='border-t border-gray-600'>
              <Button
                variant="text"
                color="red"
                onClick={handleOpen}
                className="mr-1"
              >
                <span>取消</span>
              </Button>
              <Button variant="gradient" color="" onClick={()=>onHandleRemoveFollow(currentItem)}>
                <span>確認</span>
              </Button>
            </DialogFooter>
          </Dialog>
      <div className='text-white text-xl font-bolds  md:text-left md:text-3xl  mb-4'>{title}  <div className='text-xs text-white/50'>{totalImage} items</div> </div>
      {!followsResults ?
        <div className='text-white'>Loading</div> 
        : 
        <div className=' space-y-4'>
          {followsResults.map((user,index) => {
            const {id, name, profile_image   } = user
            return (
              <motion.div key={id} 
                variants={imageVariants} initial="hidden" animate="visible" transition={{ delay: index * 0.1 }}
                className='relative w-full  flex items-center '
              >
                <Link  to={`/user/${id}`} className='w-14'>
                  <div className='pt-[100%] relative'>
                    <ImageWithFallback src={profile_image} alt="user avatar"  />
                    
                    {/* <img  
                      src={profile_image} alt={profile_image} 
                      data-id={id}
                      className=' absolute top-1/2 left-0 -translate-y-1/2 object-cover w-full h-full rounded-full'
                    /> */}
                  </div>
                </Link>
                <div className=' flex justify-between  items-center gap-0 p-2 w-full  bottom-0 text-white'>
                  <div className='text-sm'>
                    {name }
                  </div>
                  <div className='flex gap-4'>
                    <Button className=' flex items-center gap-1  text-sm bg-t_lime-600 py-1 px-3 cursor-pointer' onClick={()=> {handleOpen(); setCurrentItem(user); }}>
                      <FaHeart />Unfollow
                    </Button>


                  </div>

                </div>
              </motion.div>

            )

          })}
        </div>

      }
    </div>
  )
}
export default Index