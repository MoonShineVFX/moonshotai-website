import React, { useState,useEffect } from 'react'
import {motion,AnimatePresence} from 'framer-motion'
import { useForm,Controller } from 'react-hook-form';
function EditUserEmailForm({handleSaveEditEmail,closeModal}) {
  const { control,register, handleSubmit, formState: { errors } } = useForm();
  // 電子郵件格式驗證的正則表達式
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const onSubmit = (data) => {
    handleSaveEditEmail(data)
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
        className='bg-zinc-900 border border-white/30   rounded-md p-4 box-border text-white fixed top-5 left-1/2 -translate-x-1/2 w-4/5 overflow-y-auto max-h-[85vh]'
      >
          <div className='text-lg text-center font-bold'>輸入 Email</div>
          <div className='text-sm text-center text-white/60'>將儲存於個人資料中</div>
          <form onSubmit={handleSubmit(onSubmit)} className='my-4'>
            <div className='flex flex-col  '>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: '請輸入，不可為空',
                  pattern: {
                    value: emailRegex,
                    message: 'email 格式錯誤',
                  },
                }}
                render={({ field }) => (
                  <div className='flex flex-col'>
                    <input
                      {...field}
                      className='bg-zinc-700 rounded-md py-2 px-2 text-sm'
                      placeholder="Email"
                    />
                    {errors.email && <span className='text-xs text-white/60 mt-2'>{errors.email.message}</span>}
                  </div>
                )}
              />
        
            </div>

            <div className='mt-6 flex gap-3 justify-start text-md'>

              <button type="submit" className='  py-1 px-2 rounded-md bg-[#4c5a13]'>儲存 </button>
 
         
              <button type="button" className='text-white/80' onClick={handleClose}>取消</button>
            </div>
          </form>
      </motion.div>
    </div>
  )
}

export default EditUserEmailForm