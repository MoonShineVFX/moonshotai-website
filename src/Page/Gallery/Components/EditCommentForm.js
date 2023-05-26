import React, { useState,useEffect } from 'react'
import { useForm,Controller } from 'react-hook-form';
import {motion,AnimatePresence} from 'framer-motion'
import { imageFormModalState, commentDataState,formStatusState } from '../atoms/galleryAtom';
import {  useRecoilValue ,useRecoilState } from 'recoil';
function EditCommentForm({closeModal,handleSendComment,handleSaveEditComment,handleSelectStorageImage,storagesResults}) {
  const { control,register, handleSubmit, formState: { errors } } = useForm({
    name:'',facebookId:"",instagramId:"",linkedinId:"",portfolioUrl:"",bio:"",isNsfw:false,location:""
  });
  const [imageArray, setImageArray] = useState([])
  const [selectedImages, setSelectedImages] = useState([]);
  const comment = useRecoilValue(commentDataState)
  const formStatus = useRecoilValue(formStatusState);
  const onSubmit = (data) => {
    let items ={
      text:data.text,
      img:[]
    }
    console.log(data);
    if(data.method ==='ADD'){
       items ={
        text:data.text,
        img:selectedImages
      }
      handleSendComment(JSON.stringify(items,null,2))
    }else if (data.method==='EDIT'){
       items ={
        text:data.text,
        img:selectedImages
      }
      handleSaveEditComment(comment.id,JSON.stringify(items,null,2))
    }

  };
  const toggleImageSelection = (image) => {
    console.log(selectedImages)
    if (isSelected(image)) {
      setSelectedImages(selectedImages.filter((selectedImage) => selectedImage.id !== image.id));
    } else {
      if (selectedImages.length < 3) {
        setSelectedImages([...selectedImages, image]);
      } else {
        // 超過選擇數量上限時，不進行任何操作或提供提示
        // 可以在此處顯示提示訊息或採取其他反應
      }
    }
  };
  const isSelected = (image) => {
    return selectedImages.some((selectedImage) => selectedImage.id === image.id);
  };
  const handleClose = ()=>{
    closeModal()
  }
  useEffect(() => {
    if (comment?.text) {
      const parsedComment = JSON.parse(comment.text);
      setSelectedImages(parsedComment.img);
    }
  }, [comment]);

  return (
    <div className='fixed z-50 bottom-0 left-0 w-full'>
      <div className='bg-black/50 w-full h-screen' onClick={handleClose}></div>
      <motion.div 
        initial={{ opacity: 0, y: -20 ,x:'-50%'}}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className=' bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#49531F] via-black  to-zinc-800 rounded-lg p-4 box-border text-white fixed top-5 left-1/2 -translate-x-1/2 w-4/5 overflow-y-auto max-h-[85vh]'
      >
          <div className='text-xl text-center font-bold'>{formStatus === 'ADD' ? 'New Comment' : 'Edit Comment'}</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col  '>
              <Controller
                name="text"
                control={control}
                defaultValue={comment && JSON.parse(comment?.text).text}
                rules={{ required: false }}
                render={({ field }) => (
                  <textarea {...field} cols="20" rows="5" className='bg-zinc-700 rounded-md py-2 px-2 text-sm' placeholder="Comment"></textarea>
                )}
              />

            
            </div>
            <div className='flex flex-col items-end text-sm'>
              <button type="button" className='mt-2 text-sm text-white/80 bg-lime-600 py-1 px-2 rounded-md' onClick={handleSelectStorageImage}>Add a Image</button>
              <div  className='w-full text-white/80 bg-zinc-600 py-1 px-2 rounded-md my-2' >
                <div >Your storage images ({selectedImages.length } / 3)</div>
                <div className=' grid grid-cols-4 gap-1 mt-2 max-h-64 overflow-y-auto'>
                  {storagesResults.length>0 &&
                    storagesResults.map((item,index)=>{
                      const {id,urls} = item
                      const isImageSelected = isSelected({ id, url: urls.thumb });
                      return(
                        <div key={id} className={`relative ${isImageSelected ? 'border-4 border-blue-500' : ''}`}>
                          <div className='pt-[100%] relative'>
                            <img  
                              src={urls.thumb} 
                              alt={`Image ${id}`}
                              className=' absolute top-1/2 left-0 -translate-y-1/2 object-cover w-full h-full'
                              onClick={() => toggleImageSelection({ id, url: urls.thumb })}
                            />
                          </div>

                        </div>
                      )
                    })
                  }
                </div>

              </div>

            </div>
            <div className='mt-6 flex gap-3 justify-start text-md'>
              {
                formStatus === 'EDIT' ? 
                <button type="submit" className='  py-1 px-2 rounded-md bg-[#4c5a13]'>Edit Comment <input type="hidden" value="EDIT"  {...register('method')}/></button>
                :
                <button type="submit" className='  py-1 px-2 rounded-md bg-[#4c5a13]'>Send Comment <input type="hidden" value="ADD"  {...register('method')}/></button>
              }
              <button type="button" className='text-white/80' onClick={handleClose}>Cancel</button>
            </div>
          </form>
      </motion.div>
    </div>
  )
}

export default EditCommentForm