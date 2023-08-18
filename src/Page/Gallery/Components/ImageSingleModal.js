import React,{useState} from 'react'
import {motion,AnimatePresence} from 'framer-motion'
import { imageDataState,imageModalState } from '../atoms/galleryAtom';
import {  useRecoilValue ,useRecoilState } from 'recoil';
import {getWordFromLetter} from '../helpers/fetchHelper'
import { MdKeyboardArrowLeft,MdOutlineShare,MdModeComment } from "react-icons/md";
import { IoCopyOutline } from "react-icons/io5";
function ImageSingleModal() {
  const [isShowModal, setIsShowModal] = useRecoilState(imageModalState)
  const image = useRecoilValue(imageDataState)
  const [ isCopied , setIsCopied ] = useState(false);
  const handleCopyPrompt=(prompt,negative_prompt)=>{
    const text = prompt+(negative_prompt && ' --'+negative_prompt);
    navigator.clipboard.writeText(text);
    setIsCopied(true)
  }
  console.log(image)
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className=" fixed z-30 w-full max-h-screen h-full overflow-y-auto h-auto  top-0 left-0 bg-black md:w-12/12  space-x-0  md:space-x-10 mx-auto  text-white  flex flex-col md:flex-row " 
      key={image.id} 
    >
        <button  
          onClick={()=>{
            setIsShowModal(false)
          }} 
          className='fixed top-3 left-3 text-white rounded-full  bg-gray-900 z-40 '>
          <MdKeyboardArrowLeft size={32} />
        </button>
      <div className="flex flex-col  justify-center items-center md:justify-start  max-w-full md:py-6 max-h-[100vh] relative  ">
        <div className="flex  justify-center items-center w-full">
          <div className='w-full'>
            <img 
              src={image.urls.regular} 
              alt={image.id} 
              className={`w-[100vw] h-full max-h-[80vh] object-contain`} />
          </div>
        </div>
        <div className=' flex justify-center items-center my-4 space-x-2'>
          <button 
            className='bg-gray-800 text-white text-sm px-4 py-2 rounded-full flex items-center justify-center space-x-2 '
            onClick={()=>handleCopyPrompt(image.prompt,image.negative_prompt)}
            ><IoCopyOutline /> <div>Copy Prompt</div> {isCopied && <span className='text-xs'> Copied! </span>}
          </button>

        </div>
      </div>
      <div className='w-full md:basis-[480px] md:w-full p-4 '> 
        <div className='flex flex-col justify-end  relative pb-20 pt-2 px-2'>
          <div className='text-xs text-white/40 text-center'>#{image.created_at && image.id}</div>
          <div className='text-xs mb-3 text-white/40 text-center'>Created at {image.created_at && image.created_at.substr(0,10)}</div>
          
          <div className='text-white/70 font-semibold my-3 pt-5'>Prompt 提示詞</div>
          <div className='bg-gray-800 relative rounded-md whitespace-normal break-words max-h-32 overflow-hidden overflow-y-auto'>
            <div className='p-3 text-sm'>{image.prompt}</div>
          </div>
          <div className='text-white/70 font-semibold my-3 pt-5'>Negative prompt</div>
          <div className='bg-gray-800 relative rounded-md whitespace-normal break-words max-h-32 overflow-hidden overflow-y-auto'>
            <div className='p-3 text-sm'>{image.negative_prompt} </div>
          </div>
          <div className='mt-5 grid gap-4 grid-cols-2'>
            <div className='text-white font-semibold my-1 flex flex-col gap-2'>
              <div className='text-white/70'>Model</div>
              <span className='bg-gray-800 relative rounded-md whitespace-normal break-words font-normal'> 
                <div className='p-2'>{getWordFromLetter(image?.model)} </div>
              </span>
            </div>
            <div className='text-white font-semibold my-1 flex flex-col gap-2'>
              <div className='text-white/70'>Steps</div>
              <span className='bg-gray-800 relative rounded-md whitespace-normal break-words font-normal'> 
                <div className='p-2'>{image?.steps}</div>
              </span>
            </div>
            <div className='text-white font-semibold my-1 flex flex-col gap-2'>
              <div className='text-white/70'>Sampler_index</div>
              <span className='bg-gray-800 relative rounded-md whitespace-normal break-words font-normal'> 
                <div className='p-2'>{image?.sampler_index}</div>
              </span>
            </div>
            <div className='text-white font-semibold my-1 flex flex-col gap-2'>
              <div className='text-white/70'>Cfg_scale</div>
              <span className='bg-gray-800 relative rounded-md whitespace-normal break-words font-normal'> 
                <div className='p-2'>{image?.cfg_scale}</div>
              </span>
            </div>
            <div className='text-white font-semibold my-1 flex flex-col gap-2'>
              <div className='text-white/70'>Seed</div>
              <span className='bg-gray-800 relative rounded-md whitespace-normal break-words font-normal'> 
                <div className='p-2'>{image?.seed}</div>
              </span>
            </div>
          </div>
        </div>
      </div>


        
 
    </motion.div>
  )
}

export default ImageSingleModal