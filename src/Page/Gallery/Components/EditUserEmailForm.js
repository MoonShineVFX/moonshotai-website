import React, { useState,useEffect } from 'react'
import {motion,AnimatePresence} from 'framer-motion'
import { useForm,Controller } from 'react-hook-form';
import { toUpper } from 'lodash';
function EditUserEmailForm({handleSaveEditEmail,closeModal,currentUser,currentPlan,flowMsg,selectPayment}) {
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
        className='bg-zinc-900 border border-white/30   rounded-md p-4 box-border text-white fixed top-[20%] left-1/2 -translate-x-1/2 w-4/5 overflow-y-auto max-h-[85vh]'
      >
          <div className='text-lg text-center font-bold'>訂購前確認</div>
          <div className='text-xs text-center text-white/60 my-1 mb-6 mx-2'>請確認以下顯示資料是否正確，確認後送出即會跳轉付款流程，謝謝。</div>
          <div>
            <div className='text-sm text-white/60 my-1'>您即將購買的是</div>
            <div className='text-sm'>{currentPlan}</div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className='my-4'>
            <div className='flex flex-col  '>
              <Controller
                name="email"
                control={control}
                defaultValue={currentUser && currentUser.email}
                rules={{
                  required: '請輸入，Email為必填項目。',
                  pattern: {
                    value: emailRegex,
                    message: 'email 格式錯誤',
                  },
                }}
                render={({ field }) => (
                  <div className='flex flex-col'>
                   <div className='text-sm text-white/60 my-1'> Email (用於發票寄送，請務必填寫。)</div>
                    <input
                      {...field}
                      className='bg-zinc-700 rounded-md py-2 px-2 text-sm'
                      placeholder="請輸入 Email"
                    />
                    {errors.email && <span className='text-xs text-white/60 mt-2'>{errors.email.message}</span>}
                  </div>
                )}
              />
        
            </div>
            <div className='mt-4'>
              <div className='text-sm text-white/60 my-1'>選擇的支付方式是</div>
              <div className='text-sm'>{toUpper(selectPayment) }</div>
            </div>
            
            <div className='my-2 text-center text-sm text-yellow-500'>
              <div>{flowMsg}</div>
            </div>

            <div className='mt-6 flex flex-col gap-3 justify-start text-md'>

              <button type="submit" className='  py-2 px-2 rounded-md bg-lime-600'>確認並繼續 </button>
 
         
              <button type="button" className='text-white/80' onClick={handleClose}>取消</button>
            </div>
          </form>
      </motion.div>
    </div>
  )
}

export default EditUserEmailForm