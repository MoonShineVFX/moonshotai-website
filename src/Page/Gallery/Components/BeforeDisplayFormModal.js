import React,{useEffect, useState} from 'react'
import { useForm,Controller,useFieldArray } from 'react-hook-form';
import {motion,AnimatePresence} from 'framer-motion'
import { beforeDisplayModalState, imageDataState,profilePageState } from '../atoms/galleryAtom';
import {  useRecoilValue ,useRecoilState } from 'recoil';
import { MdCheckCircle,MdCircle,MdInfo } from "react-icons/md";
import { Button,Checkbox,Typography,Input,Textarea,Chip,Switch,  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel, } from "@material-tailwind/react";

function BeforeDisplayForm({userData,handleEdit,handleSetUserProfile,handleSetStorageImage,campaignsData}) {
  const [isShoDisplayFormModal, setIsShowDisplayFormModal] = useRecoilState(beforeDisplayModalState)
  const image = useRecoilValue(imageDataState)
  const profilePage = useRecoilValue(profilePageState)
  const [selectedActivityIds, setSelectedActivityIds] = useState([]);
  
  const { control,register, handleSubmit,setValue,watch, formState: { errors } } = useForm({
    name:'',isNsfw:false,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'activities', // 表單欄位名稱

  });
  const isExisted = (activityId)=>{
    return image.campaigns.includes(activityId);
  }
  const onSubmit = (data) => {

    const updatedActivities = data.activities.map((activity) => {
       console.log(activity.campaign_id)
      if (selectedActivityIds.includes(activity.campaign_id)) {
        // 如果是已被勾選過的活動
        if ( activity.status === "add" || activity.status === "del") {
          // add 或 del，
          console.log('維持')
          return activity;
        } else {
          // 如果原本就是 isExisted，則維持不變
          return { ...activity, status: isExisted(activity.campaign_id) ? "isExisted" : "add" };
        }
      } else {
        // 如果是未被勾選的活動
        return { ...activity, status: "none" };
      }
    });

    console.log(updatedActivities);
    console.log(data)
    let items ={
      title:data.title ||'',
      description:data.description ||null,
      is_user_nsfw:data.is_user_nsfw ||false,
      display_home:data.display_home ||false,
      activities:data.activities || null
    }
    // console.log(items)
    // handleSetStorageImage(image,items,profilePage)
  };
  const modalVariants = {
    close: { opacity: 0, },
    open: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const handleActivityClick = (activityId, hasLink) => {
    const activities = watch('activities');
    const isActive = selectedActivityIds.includes(activityId);
    const isExisted = image.campaigns.includes(activityId);

    if (isActive) {
      setSelectedActivityIds(prevIds => prevIds.filter(id => id !== activityId));
        if (isExisted) {
          setValue(
            'activities',
            activities.map(activity => {
              if (activity.campaign_id === activityId) {
                return {
                  ...activity,
                  status: isExisted ? 'del' : 'isExisted'
                };
              }
              return activity;
            })
          );
        }
    } else {
      setSelectedActivityIds(prevIds => [...prevIds, activityId]);
      setValue(
        'activities',
        activities.map(activity => {
          if (activity.campaign_id === activityId) {
            return {
              ...activity,
              status: isActive ? 'add' : 'none'
            };
          }
          return activity;
        })
      );
    }

  };


  useEffect(() => {
    if (image && image.campaigns) {
      setSelectedActivityIds(image.campaigns);
    }
  }, [image]);

  return (
    <div 
      className=' fixed z-[100] top-0 left-0 w-full'>
      <div className='bg-black/50 w-full h-screen' onClick={handleEdit}></div>
      
      <motion.div 
        initial={{ opacity: 0, y: -20 ,x:'-50%'}}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className= 'bg-gray-900 rounded-lg box-border text-white fixed top-0 left-1/2 -translate-x-1/2 w-full  h-full pb-20'
      >



        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='text-center font-bold'>Check Post Detail </div>
          <div className='grid grid-cols-2 gap-2 text-white px-4'>
            <div className='flex flex-col'>
              <label htmlFor="name" className='text-white/50 my-2'>*標題(必填)</label>
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
          <div className='flex flex-col  px-4'>
            <label  className='text-white/50  my-2'>簡介</label>
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
          <Tabs value="add" className="px-4 mt-2 ">
            <TabsHeader className=''>

                <Tab key='add' value={'add'}>
                  <div className="flex items-center gap-2">
                    目前可參與的活動
                  </div>
                </Tab>

                <Tab  key='isExisted' value={'isExisted'}>
                  <div className="flex items-center gap-2">
                    已參與的活動
                  </div>
                </Tab>
            </TabsHeader>
            <TabsBody className='border rounded-md border-white/50 mt-2'>
                <TabPanel  key='add' value={'add'}>
                  <div className='text-white text-sm my-1'>如該活動有外連網址，可於下方欄位填入。</div>
                  <ul className='grid grid-cols-1 gap-3 max-h-[300px] overflow-hidden overflow-y-auto pr-3'>
                    {campaignsData.map((item,index) => {
                      const isChecked = image.campaigns && image.campaigns.includes(item.id);
                      const isActive =  selectedActivityIds.includes(item.id);
                      const isExisted = image.campaigns.includes(item.id); 
                      if (isExisted) {
                        return null; // 如果已參加，則不顯示
                      }
                      return(
                        <li key={item.id} className='w-full'>
                          <div className='bg-gray-800  rounded-md flex items-center justify-start px-0 w-full'>
                            <label htmlFor={'aa'+item.name} className='flex items-center justify-start space-x-3 w-full pl-3 '>
                              {isActive && <Chip size="sm" color="green" value="投稿" className='bg-light-green-600 ' />}
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
                          {item.has_link  && (
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
                                      label=""
                                      className="!border !border-gray-300 text-white shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-white focus:ring-gray-900/10"
                                      labelProps={{
                                        className: ' hidden'
                                      }}
                                      placeholder="推廣網址"
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
                </TabPanel>
                <TabPanel  key='isExisted' value={'isExisted'}>
                  <div className='text-white text-sm my-1'>已參加的活動，可取消。</div>
                  <ul className='grid grid-cols-1 gap-3 '>
                    {campaignsData.map((item,index) => {
                      const isChecked = image.campaigns && image.campaigns.includes(item.id);
                      const isExisted = image.campaigns.includes(item.id); 
                      if (!isExisted) {
                        return null; // 如果已參加，則不顯示
                      }
                      return(
                        <li key={item.id} className='w-full'>
                          <div className='bg-gray-800  rounded-md flex items-center justify-start px-2 w-full'>
                            <Chip size="sm" color="green" value="已投稿" className='bg-light-green-600 ' />
                            <label htmlFor={'aa'+item.name} className='flex items-center justify-start space-x-3 w-full pl-3 '>
                              <Typography color="white" className=' text-sm font-semibold '>
                                {item.name} 
                              </Typography>

                            </label>  
                            <Checkbox
                              id={'aa'+item.name}
                              defaultChecked={isExisted}
                              onChange={() => handleActivityClick(item.id)}
                              color="light-green"
                              className=" rounded-full border-white-900/20 bg-gray-300 transition-all hover:scale-105 hover:before:opacity-0 "

                            />
          
                          </div>
                          {item.has_link  && (
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
                                {item?.link}

                            </div>
                          )}
                        </li>
                      )}
                    )}
                  </ul>
                </TabPanel>
            </TabsBody>
          </Tabs>


          <div className='fixed bottom-0 border-t border-gray-800 w-full z-50 bg-gray-900 px-4 pb-2'>
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

              <div className='mt-6 flex gap-3 justify-center '>
                <Button type="submit" className='bg-light-green-600 '>儲存送出</Button>
                <button type="button" className='text-white/80' onClick={()=>{
                  setIsShowDisplayFormModal(false)
                }}>取消</button>
              </div>
          </div>


        </form>

      </motion.div>


    </div>
  )
}

export default BeforeDisplayForm