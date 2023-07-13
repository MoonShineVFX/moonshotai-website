import React, { useState } from 'react'
import {motion,AnimatePresence} from 'framer-motion'
import {  useRecoilValue,useRecoilState  } from 'recoil';
import { reportModalState,reportDataState } from '../atoms/galleryAtom';
import { MdClear } from "react-icons/md";
import { useForm,Controller } from 'react-hook-form';
import {LoadingCircle} from '../helpers/componentsHelper'
const options = [
  '產品與預期不符',
  '操作難度高，不好理解',
  '生圖速度慢',
  '使用頻率過低',
  '能使用的模組太少',
  '已經有其他同質性的產品',
  '其他',
];
function ReportModal() {
  const currentOrder = useRecoilValue(reportDataState)
  const [isShowReport,serIsShowReport] = useRecoilState(reportModalState)
  const { handleSubmit, control } = useForm();
  const [isShowForm , setIsShowForm] = useState(false)
  const [isShowLoading , setIsShowLoading] = useState(false)

  const handleShowForm = () =>{
    setIsShowLoading(true)
    setTimeout(()=>{
      setIsShowForm(true)
      setIsShowLoading(false)
    },2000)
 
  }
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div 

      className='text-white fixed  top-0 left-0 w-full  z-20  '>
      <div className='bg-black/50 w-full h-screen' onClick={()=>{serIsShowReport(false)}}></div>
      <motion.div 
      initial={{ opacity: 0, y: -20,x:'-50%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className='text-white bg-gray-900 border border-white/20  absolute  top-5 left-1/2 -translate-x-1/2  z-20 p-4 w-11/12 '>
        <div className='ml-auto w-8 h-8 text-center' onClick={()=>{serIsShowReport(false)}}><MdClear size={24} /></div>
        <div className='border-b border-white/60 text-white/60 pb-2 text-xl '>MoonShot 客服</div>
        <div className='my-3 space-y-3'>
          <div className='font-bold'>訂單序號：{currentOrder.serial_number}</div>

          <div className='font-bold'>1. 訂單問題協助</div>
          <div className='text-white/50 text-xs'> 
            關於退款申請規則，可於我們的使用說明頁面查看，針對購買未滿 48 小時的的商品可以進行退款申請，如不符合以上條件，您也可以提出，我們會視情況決定是否受理。
            <div>對於訂單疑問或建議，請透過此信箱聯繫我們 </div> 
            <div>service@moonshine.tw</div> 
          </div>
          <div>2. 申請退款</div>
          <div className='text-white/50 text-xs flex items-center gap-2'>按此
            <div className='bg-gray-700 rounded-md px-2 py-1 text-white/80' onClick={handleShowForm}>申請單筆訂單退款</div>並填表。</div>
          {isShowLoading && 
            <div className='h-32 flex justify-center items-center'>
              <LoadingCircle />
            </div>}
          {
            isShowForm &&
            <div className='py-5'>
            <div className='font-bold text-md'>您在 Moonshot 產品中遇到什麼問題？</div>
            <div className='text-xs text-white/50'>確定填妥後按送出，將會執行退款。</div>
            
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='text-xs my-1'>原因(必選)</div>
              <div className=' space-y-2 text-xs my-2'>
                {options.map((option, index) => (
                  <div key={index} className=''>
                    <Controller
                      name="reason"
                      control={control}
                      defaultValue=""
                      rules={{ required: true }}
                      render={({ field }) => (
                        
                        <div 
                          onClick={() => field.onChange(option)}
                          className={`cursor-pointer b p-1 px-3 ${field.value === option ? 'bg-gray-700 border border-white/60' : 'bg-zinc-700'}`}>
                          <label  >
                            <input type="radio" value={option} {...field} className=' hidden' />
                            <span >
                              {option}
                            </span>
                          </label>
                        </div>

                      )}
                    />
                  </div>
                ))}
              </div>
              <div className='text-xs my-1'>註記</div>
              <div>
                <Controller
                  name="otherReason"
                  control={control}
                  defaultValue=""
                  rules={{ required: false }}
                  render={({ field }) => (
                    <textarea rows="4" {...field} className='w-full bg-zinc-700'></textarea>
                  )}
                />
              </div>

              <button type="submit" className='border border-gray-700 px-2 py-1'>Submit</button>
            </form>

          </div>
          }

        </div>
      </motion.div>

    </div>
  )
}

export default ReportModal