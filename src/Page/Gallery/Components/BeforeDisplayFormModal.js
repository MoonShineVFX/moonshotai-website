import React,{useState} from 'react'
import { useForm,Controller } from 'react-hook-form';
import {motion,AnimatePresence} from 'framer-motion'
import { beforeDisplayModalState, imageDataState,profilePageState } from '../atoms/galleryAtom';
import {  useRecoilValue ,useRecoilState } from 'recoil';
import { MdCheckCircle,MdCircle } from "react-icons/md";
function BeforeDisplayForm({userData,handleEdit,handleSetUserProfile,handleSetStorageImage,campaignsData}) {
  const [isShoDisplayFormModal, setIsShowDisplayFormModal] = useRecoilState(beforeDisplayModalState)
  const image = useRecoilValue(imageDataState)
  const profilePage = useRecoilValue(profilePageState)
  const [selectedActivityId, setSelectedActivityId] = useState(null);
  const { control,register, handleSubmit, formState: { errors } } = useForm({
    name:'',facebookId:"",instagramId:"",linkedinId:"",portfolioUrl:"",bio:"",isNsfw:false,location:""
  });
  const onSubmit = (data) => {
    // console.log(data);
    const items ={
      title:data.title ||'',
      description:data.description ||null,
      is_user_nsfw:data.is_user_nsfw ||false,
      display_home:data.display_home ||false

    }
    handleSetStorageImage(image,items,profilePage)
  };
  const modalVariants = {
    close: { opacity: 0, },
    open: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  console.log(campaignsData)
  const handleActivityClick = (activityId) => {
    console.log(activityId)
    if (selectedActivityId === activityId) {
      setSelectedActivityId(null); // 取消勾選
    } else {
      setSelectedActivityId(activityId);
    }
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
        <div className='text-center font-bold'>Check Post Detail </div>
        <div className='text-xs my-3 flex flex-col justify-center items-center text-white/70'>
          <div>#{image?.id}</div>
          <div>Created at {image?.created_at.substr(0,10)}</div>
        </div>


        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid grid-cols-2 gap-2'>
            <div className='flex flex-col'>
              <label htmlFor="name" className='text-white/50 font-normal my-2'>*標題(必填)</label>
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
            <label htmlFor="bio" className='text-white/50 font-normal my-2'>簡介</label>
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
          <div className='flex flex-col'>
              <label htmlFor="name" className='text-white/50 font-normal my-2'>可參與的活動</label>
              <ul>
              {campaignsData.map(item => (
                <li key={item.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedActivityId === item.id}
                      onChange={() => handleActivityClick(item.id)}
                    />
                    {item.name}
                  </label>

                  <div className='text-white/70 font-normal my-2'>已勾選的活動</div>
                  <div className='text-white/50 font-normal my-2'>如該活動有外連網址可以於下方填入。</div>
                  {selectedActivityId === item.id && item.has_link && (
                    <div className="mt-2">
                     
                      <div>
                        <label htmlFor="url" className='text-white/90 font-normal my-2'>"{item.name}"的推廣網址</label>
                        <input
                          type="text"
                          id="url"
                          value=""
                          className='bg-zinc-700 rounded-md py-2 px-2 w-full text-sm focus:outline-lime-400 '
                        />
                      </div>

                    </div>
                  )}
                </li>
              ))}
            </ul>
            </div>
          <div className='flex flex-col  mt-4 '>
            <Controller
              name="display_home"
              control={control}
              defaultValue={image?.display_home}
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

                  </label>
                  <span className="flex items-center text-xs font-medium text-white/80">
                      分享圖片到藝廊
                  </span>
                </div>
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
                  <label className="flex  relative items-center  mr-5 cursor-pointer">
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

                  </label>
                  <span className="flex items-center text-xs font-medium text-white/80">
                      啟用成人內容標籤
                  </span>

                </div>
              )}
            />
          </div>
          
          <div className='mt-6 flex gap-3 justify-center text-sm'>
            <button type="submit" className='  py-1 px-2 rounded-md bg-[#4c5a13]'>儲存送出</button>
            <button type="button" className='text-white/80' onClick={()=>{
              setIsShowDisplayFormModal(false)
            }}>取消</button>
          </div>

        </form>

      </motion.div>


    </div>
  )
}

export default BeforeDisplayForm