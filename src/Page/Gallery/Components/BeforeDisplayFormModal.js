import React,{useEffect, useState} from 'react'
import { useForm,Controller,useFieldArray } from 'react-hook-form';
import {motion,AnimatePresence} from 'framer-motion'
import { beforeDisplayModalState, imageDataState,profilePageState,loginState } from '../atoms/galleryAtom';
import {  useRecoilValue ,useRecoilState } from 'recoil';
import { MdCheckCircle,MdCircle,MdInfo } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { Button,Checkbox,Typography,Input,Textarea,Chip,Switch,  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel, } from "@material-tailwind/react";
import { useQuery } from 'react-query';
import {getImgInCampaign} from '../helpers/fetchHelper'
function BeforeDisplayForm({userData,handleEdit,handleSetUserProfile,handleSetStorageImage,campaignsData,handlePostImage,handlePatchPost,isBanned}) {
  const [isShoDisplayFormModal, setIsShowDisplayFormModal] = useRecoilState(beforeDisplayModalState)
  const image = useRecoilValue(imageDataState)
  const profilePage = useRecoilValue(profilePageState)
  const [selectedActivityIds, setSelectedActivityIds] = useState([]);
  const [selectedIsExistedIds, setSelectedIsExistedIds] = useState([]);
  const [linLoginData, setLineLoginData] = useRecoilState(loginState)
  //
  const [imgCampaignsData, setImgCampaignsData] = useState([])
  const { control,register, handleSubmit,setValue,watch, formState: { errors } } = useForm({
    name:'',isNsfw:false,
  });
  const { fields, append:addActAppend, remove:addActRemove } = useFieldArray({
    control,
    name: 'add_activities', // 表單欄位名稱
  });
  const { fields:removeActFields, append:removeActAppend, remove:removeActRemove } = useFieldArray({
    control,
    name: 'remove_activities', // 表單欄位名稱

  });
  //IMAGE IN campaigns LIST
  const { data:imgCampaign, isLoading:isImgCampaignLoading, isError:isImgCampaignError, refetch:ImgCampaignRefetch } = useQuery(
    [ 'imgCampaigns'],
    ({ pageParam }) =>
      getImgInCampaign(image,linLoginData),
    {
      enabled:false,
      onSuccess:(data)=>{
        setImgCampaignsData(data)

     }
    }
  );
  const onSubmit = (data) => {
    console.log(data)
    const add_activities = data.add_activities.filter(item=>{
      return item.status === 'add'
    })
    const remove_activities = data.remove_activities.filter(item=>{
      return item.status === 'remove'
    })
    let items ={
      title:data.title ||null,
      description:data.description ||null,
      display_prompt:data.display_prompt||false,
      is_user_nsfw:data.is_user_nsfw ||false,
    }
    // console.log(items)
    // handleSetStorageImage(image,items,profilePage,add_activities,remove_activities)
    if(profilePage === 'on_Storagepage'){
      handlePatchPost(image,items,'on_Storagepage')
    }else{
      handlePostImage(image,items)
    }

  };
  const modalVariants = {
    close: { opacity: 0, },
    open: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const handleActivityClick = (activityId) => {
    const activities = watch('add_activities');
    const isSelected = selectedActivityIds.includes(activityId);
    
    if (isSelected) {
      setSelectedActivityIds(prevIds => prevIds.filter(id => id !== activityId));
    } else {
      setSelectedActivityIds(prevIds => [...prevIds, activityId]);
    }

    setValue(
      'add_activities',
      activities.map(activity => {
        if (activity.campaign_id === activityId) {
          return {
            ...activity,
            status: isSelected ? 'none' : 'add'
          };
        }
        return activity;
      })
    );

  };
  const handleIsExistedisClick = (activityId,campaign_id) => {
    const activities = watch('remove_activities');
    const isSelected = selectedIsExistedIds.includes(activityId);
    if (isSelected) {
      console.log('1')
      setSelectedIsExistedIds(prevIds => prevIds.filter(id => id !== activityId));
      const indexToRemove = activities.findIndex(activity => activity.id === activityId);
      if (indexToRemove !== -1) {
        removeActRemove(indexToRemove); // 移除對應項目
      }
    } else {
      console.log('2')
      setSelectedIsExistedIds(prevIds => [...prevIds, activityId]);
      removeActAppend({ id: activityId,campaign_id:campaign_id, status: 'remove' });
    }

  }
  


  useEffect(() => {
    if (image && image.campaigns) {
      setSelectedActivityIds(image.campaigns);
    }
  }, [image]);

  return (
    <div 
      className=' fixed z-[100] top-0 left-0 w-full '>
      <div className='bg-black/50 w-full h-screen'  onClick={()=>{setIsShowDisplayFormModal(false)}}></div>
      
      <motion.div 
        initial={{ opacity: 0, y: -20 ,x:'-50%'}}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className= 'bg-black rounded-lg box-border text-white fixed top-0 left-1/2 -translate-x-1/2 w-full md:w-6/12 h-full '
      >
        <form onSubmit={handleSubmit(onSubmit)} className=' relative flex flex-col h-screen py-4 ju md:justify-center'>
          <div className=' pb-3 overflow-hidden overflow-y-auto h-full md:h-full'>
            <div className='text-center font-bold'>分享圖片至藝廊 </div>
            <Typography
              variant="small"
              className="mt-1 px-6 flex flex-col items-center   justify-center gap-1 font-normal text-gray-300 text-xs"
            >
              提醒您 Moonshot 藝廊禁止公開分享未符合規範的內容。 <a href="/docs/terms" target='_blank' className='text-teal-200'>詳見使用條款。</a>
            </Typography>
            <div className='grid gap-2 text-white px-4'>

              <div className='flex flex-col'>
                {image?.is_nsfw && <div className='text-sm text-red-400 mt-2 text-center'>這張作品有成人內容，所以無法執行發佈。</div> }

                <label htmlFor="name" className='text-white/50 my-2'>標題</label>
                <Controller
                  name="title"
                  control={control}
                  defaultValue={image?.title}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <Input {...field} type="text" 
                      color="white" 
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }} 
                      className="focus:!border-t-white !border-t-white" 
                      placeholder='作品名稱'/>
                  )}
                />
                {errors.title && <span className="text-red-500">圖片標題為必填項目</span>}
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
                      {...field}
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }} 
                      className="text-white focus:!border-white !border-t-white"
                      placeholder='介紹你的作品吧！'/>
                  )}
                />
            </div>
            <div className='flex flex-col  px-4'>
              <Controller
                name="display_prompt"
                control={control}
                defaultValue={image?.display_prompt}
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
                      label="開放顯示 Prompt" 
                      labelProps={{
                        className:'text-white text-sm'
                      }}
                    />
                  </div>
                )}
              />
            </div>

            <Tabs value="add" className="px-4 mt-2 hidden" >
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
              <TabsBody className='border rounded-md border-white/50 mt-2 ' >
                  <TabPanel  key='add' value={'add'}>
                    <div className='text-white text-sm my-1'>如該活動有外連網址，可於下方欄位填入。</div>
                    <ul className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[300px] overflow-hidden overflow-y-auto pr-3'>
                      {campaignsData.map((item,index) => {
                        const isActive =  selectedActivityIds.includes(item.id);
                        const isExisted = image.campaigns.includes(item.id); 
                        if (isExisted) {
                          return null; // 如果已參加，則不顯示
                        }
                        return(
                          <li key={item.id} className='w-full'>
                            <div className='bg-gray-900 rounded-md p-2'>
                              <div className='   flex items-center justify-start px-0 w-full'>
                                <label htmlFor={'aa'+item.name} className='flex items-center justify-start space-x-3 w-full '>
                                  {isActive && <Chip size="sm" color="green" value="投稿" className='bg-light-green-600 ' />}
                                  <Typography color="white" className=' text-sm font-semibold w-full cursor-pointer '>
                                    {item.name} 
                                  </Typography>

                                </label>  
                                <Checkbox
                                  id={'aa'+item.name}
                                  defaultChecked={selectedActivityIds.includes(item.id)}
                                  onChange={() => handleActivityClick(item.id)}
                                  color="light-green"
                                  className=" rounded-full border-white-900/20 bg-gray-300 transition-all hover:scale-105 hover:before:opacity-0 "

                                />
                                <Controller
                                  name={`add_activities[${index}].campaign_id`}
                                  control={control}
                                  defaultValue={item?.id || ''}
                                  render={({ field }) => (
                                    <input {...field} 
                                      type="text" 
                                      hidden
                                    />
                                  )}
                                />
                              </div>
                              {item.has_link  && (
                                  <div className="mt-1">

                                      <Controller
                                        name={`add_activities[${index}].link`}
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
                                            placeholder="輸入外部活動網站網址"
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
                            </div>

            
   

                          </li>
                        )}
                      )}
                    </ul>
                  </TabPanel>
                  <TabPanel  key='isExisted' value={'isExisted'}>
                    <div className='text-white text-sm my-1'>已參加的活動，可取消。</div>
                    <ul className='grid grid-cols-1 md: gap-3 max-h-[330px] overflow-hidden overflow-y-auto pr-3'>
                      {imgCampaignsData.map((item,index) => {
                        const isChecked = selectedIsExistedIds.includes(item.id);
                        return(
                          <li key={item.id} className='w-full'>
                            <div className='bg-gray-800  rounded-md flex items-center justify-start px-2 w-full'>
                              <Chip
                                size="sm"
                                color="green"
                                value={isChecked ? '取消' : '已投稿'}
                                className={isChecked ? 'bg-pink-600' : 'bg-light-green-600'}
                              />
                              
                              <label htmlFor={'aa'+item.campaign_name} className='flex items-center justify-start space-x-3 w-full pl-3 '>
                                <Typography color="white" className=' text-sm font-semibold '>
                                  {item.campaign_name} 
                                </Typography>

                              </label>  
                              <Checkbox
                                id={'aa'+item.campaign_name}
                                onChange={() => handleIsExistedisClick(item.id,item.campaign_id)}
                                color="red"
                                className=" rounded-full border-white-900/20 bg-gray-300 transition-all hover:scale-105 hover:before:opacity-0 "
                              />

            
                            </div>
                            {item.link  && (
                              <div className="mt-1">

                                  {item?.link}

                              </div>
                            )}
                          </li>
                        )}
                      )}
                    </ul>
                    {selectedIsExistedIds.length > 0 && <div className='text-white'>需儲存，以保存選擇。</div>}
                  </TabPanel>
              </TabsBody>
            </Tabs>

          </div>



          <div className=' border-t border-gray-800 w-full  z-50  bg-black px-4 pb-2 '>
              <Controller
                name="display_home"
                control={control}
                defaultValue={image?.is_post}
                render={({ field }) => (
                  <input {...field} 
                  type="text" 
                  hidden
                />
                )}
              />
              <div className='flex items-center justify-between'>

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
                          className:'text-white text-sm'
                        }}
                      />
                    </div>
                  )}
                />

                <div className='mt-6 flex gap-3 justify-center md:justify-start '>
                  <Button type="submit" className='bg-light-green-700 ' disabled={image?.is_nsfw || isBanned}>發佈</Button>
                  <button type="button" className='text-white/80' onClick={()=>{
                    setIsShowDisplayFormModal(false)
                  }}>取消</button>
                </div>
              </div>


          </div>


        </form>

      </motion.div>


    </div>
  )
}

export default BeforeDisplayForm