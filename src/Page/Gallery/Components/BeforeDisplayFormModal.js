import React,{useState} from 'react'
import { useForm,Controller } from 'react-hook-form';
import {motion,AnimatePresence} from 'framer-motion'
import { beforeDisplayModalState, imageDataState } from '../atoms/galleryAtom';
import {  useRecoilValue ,useRecoilState } from 'recoil';
import { MdCheckCircle,MdCircle } from "react-icons/md";
function BeforeDisplayForm({userData,handleEdit,handleSetUserProfile,handleSetStorageImage}) {
  const [isShoDisplayFormModal, setIsShowDisplayFormModal] = useRecoilState(beforeDisplayModalState)
  const image = useRecoilValue(imageDataState)
  const { control,register, handleSubmit, formState: { errors } } = useForm({
    name:'',facebookId:"",instagramId:"",linkedinId:"",portfolioUrl:"",bio:"",isNsfw:false,location:""
  });
  const onSubmit = (data) => {
    console.log(data);
    const items ={
      title:data.title ||'',
      description:data.description ||null,
      is_user_nsfw:data.is_user_nsfw ||false,
      display_home:true

    }
    handleSetStorageImage(image,items,'before')
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
        <div className='text-center font-bold'>Check detail before public</div>
        <div className='text-xs my-3 flex flex-col justify-center items-center text-white/70'>
          <div>#{image?.id}</div>
          <div>Created at {image?.created_at.substr(0,10)}</div>
        </div>


        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid grid-cols-2 gap-2'>
            <div className='flex flex-col'>
              <label htmlFor="name" className='text-white/50 font-normal my-2'>*Title</label>
              <Controller
                name="title"
                control={control}
                defaultValue={image?.title}
                rules={{ required: true }}
                render={({ field }) => (
                  <input {...field} type="text" placeholder="title" className='bg-zinc-700 rounded-md py-2 px-2 text-sm focus:outline-lime-400 ' />
                )}
              />
            </div>
          </div>
          <div className='flex flex-col  '>
            <label htmlFor="bio" className='text-white/50 font-normal my-2'>Description</label>
            <Controller
              name="description"
              control={control}
              defaultValue={image?.description}
              rules={{ required: false }}
              render={({ field }) => (
                <textarea {...field} cols="20" rows="3" className='bg-zinc-700 rounded-md py-2 px-2 text-sm focus:outline-lime-400' placeholder="Description,Notes"></textarea>
              )}
            />

           
          </div>
          <div className='flex flex-col  mt-4 '>
            <Controller
              name="is_user_nsfw"
              control={control}
              defaultValue={image?.is_user_nsfw}
              render={({ field }) => (
                <div className="flex mt-4 ">
                  <label className="inline-flex relative items-center mr-5 cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                    <div
                      className={`w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-green-300 ${
                        field.value
                          ? 'peer-checked:after:translate-x-full peer-checked:bg-green-600'
                          : ''
                      } peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}
                    ></div>
                    <span className="ml-2 text-sm font-medium text-white/80">
                      toggle NSFW image tag
                    </span>
                  </label>
                </div>
              )}
            />
          </div>
          
          <div className='mt-6 flex gap-3 justify-center text-md'>
            <button type="submit" className='  py-1 px-2 rounded-md bg-[#4c5a13]'>Public to Gallery</button>
            <button type="button" className='text-white/80' onClick={()=>{
              setIsShowDisplayFormModal(false)
            }}>Cancel</button>
          </div>

        </form>

      </motion.div>


    </div>
  )
}

export default BeforeDisplayForm