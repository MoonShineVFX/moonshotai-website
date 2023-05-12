import React,{useState} from 'react'
import { useForm,Controller } from 'react-hook-form';
import {motion,AnimatePresence} from 'framer-motion'
import { imageFormModalState, imageDataState } from '../atoms/galleryAtom';
import {  useRecoilValue ,useRecoilState } from 'recoil';
function EditImageForm({userData,handleEdit,handleSetUserProfile}) {
  const [isShowFormModal, setIsShowFormModal] = useRecoilState(imageFormModalState)
  const image = useRecoilValue(imageDataState)
  const { control,register, handleSubmit, formState: { errors } } = useForm({
    name:'',facebookId:"",instagramId:"",linkedinId:"",portfolioUrl:"",bio:"",isNsfw:false,location:""
  });
  const onSubmit = (data) => {
    console.log(data);
    const items ={
      title:data.title ||'',
      description:data.description ||null,
    }
    handleSetUserProfile(items)
  };
  const modalVariants = {
    close: { opacity: 0, },
    open: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div 
      className=' fixed z-50 top-0 left-0 w-full'>
      <div className='bg-black/50 w-full h-screen' onClick={handleEdit}></div>
      
      <motion.div 
        initial={{ opacity: 0, y: -20 ,x:'-50%'}}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className=' bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#49531F] via-black  to-zinc-800 rounded-lg p-4 box-border text-white fixed top-5 left-1/2 -translate-x-1/2 w-4/5 overflow-y-auto max-h-[85vh]'
      >
        <div className='text-center font-bold'>Image detail</div>
        <div className='text-sm my-3 flex flex-col justify-center items-center'>
          <div>#{image.id}</div>
          <div>#{image.id}</div>
          <div className='w-1/2  mt-3'> <img src={image.urls.regular} alt="" className='max-w-full' /></div>
        </div>


        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid grid-cols-2 gap-2'>
            <div className='flex flex-col'>
              <label htmlFor="name" className='text-white/50 font-normal my-2'>Title</label>
              <Controller
                name="title"
                control={control}
                defaultValue={image && image.title}
                rules={{ required: true }}
                render={({ field }) => (
                  <input {...field} type="text" placeholder="title" className='bg-zinc-700 rounded-md py-2 px-2 text-sm' />
                )}
              />
            </div>
          </div>
          <div className='flex flex-col  '>
            <label htmlFor="bio" className='text-white/50 font-normal my-2'>Description</label>
            <Controller
              name="description"
              control={control}
              defaultValue={image && image.description}
              rules={{ required: false }}
              render={({ field }) => (
                <textarea {...field} cols="20" rows="5" className='bg-zinc-700 rounded-md py-2 px-2 text-sm' placeholder="Description,Notes"></textarea>
              )}
            />

           
          </div>
          
          <div className='mt-6 flex gap-3 justify-center text-md'>
            <button type="submit" className='  py-1 px-2 rounded-md bg-[#4c5a13]'>Save</button>
            <button type="button" className='text-white/80' onClick={()=>{
              setIsShowFormModal(false)
            }}>Cancel</button>
          </div>

        </form>

      </motion.div>


    </div>
  )
}

export default EditImageForm