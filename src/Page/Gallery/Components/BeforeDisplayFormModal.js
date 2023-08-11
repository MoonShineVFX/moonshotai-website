import React,{useState} from 'react'
import { useForm,Controller,useFieldArray } from 'react-hook-form';
import {motion,AnimatePresence} from 'framer-motion'
import { beforeDisplayModalState, imageDataState,profilePageState } from '../atoms/galleryAtom';
import {  useRecoilValue ,useRecoilState } from 'recoil';
import { MdCheckCircle,MdCircle,MdInfo } from "react-icons/md";
import { Button,Checkbox,Typography,Input,Textarea,Chip,Switch } from "@material-tailwind/react";
function BeforeDisplayForm({userData,handleEdit,handleSetUserProfile,handleSetStorageImage,campaignsData}) {
  const [isShoDisplayFormModal, setIsShowDisplayFormModal] = useRecoilState(beforeDisplayModalState)
  const image = useRecoilValue(imageDataState)
  const profilePage = useRecoilValue(profilePageState)
  const [selectedActivityIds, setSelectedActivityIds] = useState([]);
  const { control,register, handleSubmit,setValue,watch, formState: { errors } } = useForm({
    name:'',facebookId:"",instagramId:"",linkedinId:"",portfolioUrl:"",bio:"",isNsfw:false,location:""
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'activities', // 表單欄位名稱

  });
  const onSubmit = (data) => {
    console.log(data);
    let items ={
      title:data.title ||'',
      description:data.description ||null,
      is_user_nsfw:data.is_user_nsfw ||false,
      display_home:data.display_home ||false,
      activities:data.activities || null
    }
    // console.log(items)
    handleSetStorageImage(image,items,profilePage)
  };
  const modalVariants = {
    close: { opacity: 0, },
    open: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  const handleActivityClick = (activityId) => {
    const activities = watch('activities');
    const updatedActivities = activities.filter(activity => activity.campaign_id !== activityId);
    if (selectedActivityIds.includes(activityId)) {
      setSelectedActivityIds((prevIds) => prevIds.filter((id) => id !== activityId));
      setValue('activities', updatedActivities);
    } else {
      setSelectedActivityIds((prevIds) => [...prevIds, activityId]);
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
        className= 'bg-gray-900 rounded-lg p-4 box-border text-white fixed top-5 left-1/2 -translate-x-1/2 w-11/12  overflow-y-auto max-h-[90vh] pb-12'
      >
        <div className='text-center font-bold'>Check Post Detail </div>
        <div className='text-xs my-3 flex flex-col justify-center items-center text-white/70'>
          <div>#{image?.id}</div>
          <div>Created at {image?.created_at.substr(0,10)}</div>
        </div>


        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid grid-cols-2 gap-2 text-white'>
            <div className='flex flex-col'>
              <label htmlFor="name" className='text-white/50 font-normal my-2'>*標題(必填)</label>
              <Controller
                name="title"
                control={control}
                defaultValue={image?.title}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input {...field} type="text" 
                    color="white" 
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }} 
                    className="focus:!border-t-white !border-t-white" />
                )}
              />
            </div>
          </div>
          <div className='flex flex-col  '>
            <label  className='text-white/50 font-normal my-2'>簡介</label>
            <Controller
                name="description"
                control={control}
                defaultValue={image?.description}
                rules={{ required: false }}
                render={({ field }) => (
                  <Textarea   
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }} 
                    className="focus:!border-white !border-t-white"
                    placeholder='請輸入簡介'/>
                )}
              />
          </div>
          <div className='flex flex-col border border-white/60 rounded-md  mt-4 p-2 '>
              <label htmlFor="name" className='text-white/80 font-normal mb-2'>
                目前可參與的活動
                <div className='text-white/70 text-xs font-normal'>如該活動有外連網址，可於下方欄位填入。</div>
              </label>
              
              <ul className='grid grid-cols-1 gap-3 '>
              {campaignsData.map((item,index) => {
                const isChecked = image.campaigns && image.campaigns.includes(item.id);
                return(
                  <li key={item.id} className='w-full'>
                    <div className='bg-gray-800  rounded-md flex items-center justify-start px-0 w-full'>
                      <label htmlFor={'aa'+item.name} className='flex items-center justify-start space-x-3 w-full pl-3 '>
                        {selectedActivityIds.includes(item.id) && <Chip size="sm" color="green" value="投稿" className='bg-light-green-600 ' />}
                        <Typography color="white" className=' text-sm font-semibold '>
                          {item.name} 
                        </Typography>

                      </label>  
                      <Checkbox
                        id={'aa'+item.name}
                        defaultChecked={isChecked||selectedActivityIds.includes(item.id)}
                        onChange={() => handleActivityClick(item.id)}
                        color="light-green"
                        className=" rounded-full border-white-900/20 bg-gray-300 transition-all hover:scale-105 hover:before:opacity-0 "

                      />
    
                      

                    </div>
                    {(isChecked||selectedActivityIds.includes(item.id)) && item.has_link && (
                      <div className="mt-1">
                          <Controller
                            name={`activities[${index}].campaign_id`}
                            control={control}
                            defaultValue={item?.id}
                            render={({ field }) => (
                              <input {...field} 
                                type="text" 
                                hidden
                                
                              />
                            )}
                          />
                          <Controller
                            name={`activities[${index}].link`}
                            control={control}
                            defaultValue={item?.link}
                            rules={{ required: false }}
                            render={({ field }) => (
                              <Input {...field} 
                                type="url" 
                                color="white" 
                                label="推廣網址"
                              />
                            )}
                          />
                          <Typography
                            variant="small"
                            className="mt-2 flex items-center gap-1 font-normal text-gray-300"
                          >
                            <MdInfo />
                            
                            請輸入活動的外連網址如果有。
                          </Typography>
                      </div>
                    )}
                  </li>
                )}
              )}
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
                    <Switch 
                      ripple={false}
                      className="h-full w-full checked:bg-[#2ec946]"
                      containerProps={{
                        className: "w-11 h-6",
                      }}
                      circleProps={{
                        className: "before:hidden left-0.5 border-none",
                      }}                    
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)} 
                      label="分享圖片到藝廊" 
                      labelProps={{
                        className:'text-white'
                      }}
                    />


                  </label>
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
                  <Switch 
                    ripple={false}
                    className="h-full w-full checked:bg-[#2ec946]"
                    containerProps={{
                      className: "w-11 h-6",
                    }}
                    circleProps={{
                      className: "before:hidden left-0.5 border-none",
                    }}                    
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)} 
                    label="啟用成人內容標籤" 
                    labelProps={{
                      className:'text-white'
                    }}
                  />
                </div>
              )}
            />
          </div>
          
          <div className='mt-6 flex gap-3 justify-center '>
            <Button type="submit" className='bg-light-green-600 text-lg'>儲存送出</Button>
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