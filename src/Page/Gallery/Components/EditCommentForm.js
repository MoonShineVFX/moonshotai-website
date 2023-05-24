import React from 'react'
import { useForm,Controller } from 'react-hook-form';
import {motion,AnimatePresence} from 'framer-motion'
import { imageFormModalState, imageDataState } from '../atoms/galleryAtom';
import {  useRecoilValue ,useRecoilState } from 'recoil';
function EditCommentForm({closeModal}) {
  const { control,register, handleSubmit, formState: { errors } } = useForm({
    name:'',facebookId:"",instagramId:"",linkedinId:"",portfolioUrl:"",bio:"",isNsfw:false,location:""
  });
  const comment = useRecoilValue(imageDataState)
  const onSubmit = (data) => {
    console.log(data);
    const items ={
      title:data.title ||null,
      description:data.description ||null,
      is_user_nsfw:data.is_user_nsfw ||false,
    }
  };
  const handleClose = ()=>{
    closeModal()
  }
  return (
    <div className='fixed z-50 bottom-0 left-0 w-full'>
      <div className='bg-black/50 w-full h-screen' onClick={handleClose}></div>
      <motion.div 
        initial={{ opacity: 0, y: -20 ,x:'-50%'}}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className=' bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#49531F] via-black  to-zinc-800 rounded-lg p-4 box-border text-white fixed top-5 left-1/2 -translate-x-1/2 w-4/5 overflow-y-auto max-h-[85vh]'
      >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col  '>
              <Controller
                name="text"
                control={control}
                defaultValue={comment?.text}
                rules={{ required: false }}
                render={({ field }) => (
                  <textarea {...field} cols="20" rows="5" className='bg-zinc-700 rounded-md py-2 px-2 text-sm' placeholder="Comment"></textarea>
                )}
              />

            
            </div>
            <div className='mt-6 flex gap-3 justify-start text-md'>
              <button type="submit" className='  py-1 px-2 rounded-md bg-[#4c5a13]'>Send Comment</button>
              <button type="button" className='text-white/80' onClick={handleClose}>Cancel</button>
            </div>
          </form>
      </motion.div>
    </div>
  )
}

export default EditCommentForm