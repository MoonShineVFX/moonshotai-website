import React,{useState} from 'react'
import {motion,AnimatePresence} from 'framer-motion'
import { imageDataState,imageModalState } from '../atoms/galleryAtom';
import {  useRecoilValue ,useRecoilState } from 'recoil';
import {getWordFromLetter} from '../helpers/fetchHelper'
function ImageSingleModal() {
  const [isShowModal, setIsShowModal] = useRecoilState(imageModalState)
  const image = useRecoilValue(imageDataState)
  const [ isCopied , setIsCopied ] = useState(false);
  const handleCopyPrompt=(model,prompt,negative_prompt)=>{
    const text = getWordFromLetter(model) +' '+prompt+(negative_prompt && ' --'+negative_prompt);
    navigator.clipboard.writeText(text);
    setIsCopied(true)
  }
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className=" fixed w-full top-0 left-0 lg:right-0 lg:bottom-0 flex z-50 bg-zinc-800   h-screen overflow-y-auto" 
      key={image.id} 
    >
      <div className="w-full p-4  text-white/80 relative">
        <div className="flex  justify-center items-center w-full">
          <div className='w-2/3 aspect-[2/1]'>
            <img 
              src={image.urls.regular} 
              alt={image.id} 
              className="max-w-full rounded-md" />
          </div>
        </div>
        <div className='flex flex-col justify-end  relative pb-20 pt-2'>
          <div className='text-xs text-white/40 text-center'>#{image.created_at && image.id}</div>
          <div className='text-xs mb-3 text-white/40 text-center'>Created at {image.created_at && image.created_at.substr(0,10)}</div>
          
          <div className='text-white font-bold my-3 '>Prompt</div>
          <div className='bg-zinc-700 p-3 rounded-md whitespace-normal break-words'>
            {image.prompt}
          </div>
          <div className='text-white font-bold my-3'>Negative prompt</div>
          <div className='bg-zinc-700 p-3 rounded-md'>
            {image.negative_prompt}
          </div>
          <div className='grid grid-cols-2 gap-2'>
            <div>
              <div className='text-white font-bold my-3 '>Model</div>
              <div className='bg-zinc-700 p-3 rounded-md whitespace-normal break-words'>
                {getWordFromLetter(image.model)}
              </div>
            </div>
            <div>
              <div className='text-white font-bold my-3 '>steps</div>
              <div className='bg-zinc-700 p-3 rounded-md whitespace-normal break-words'>
                {image.steps}
              </div>
            </div>
            <div>
              <div className='text-white font-bold my-3 '>sampler_index</div>
              <div className='bg-zinc-700 p-3 rounded-md whitespace-normal break-words'>
                {image.sampler_index}
              </div>
            </div>
            <div>
              <div className='text-white font-bold my-3 '>cfg_scale</div>
              <div className='bg-zinc-700 p-3 rounded-md whitespace-normal break-words'>
                {image.cfg_scale}
              </div>
            </div>
          </div>
        </div>
        <div className='flex left-0 gap-2 justify-center items-center py-4 fixed bottom-0 z-50 w-full bg-zinc-800'>
          <button 
            className='bg-gray-600 text-white px-2 py-1 rounded-md w-1/2 '
            onClick={()=>handleCopyPrompt(image.model,image.prompt,image.negative_prompt)}
            >Copy Prompt {isCopied && <span className='text-xs'> Copied! </span>}</button>
          <button className="  bg-gray-800 text-white px-2 py-1 rounded-md hover:bg-gray-700 focus:bg-gray-700" onClick={()=>{
            setIsShowModal(false)
          }}>Close</button>

        </div>
        
      </div>
    </motion.div>
  )
}

export default ImageSingleModal