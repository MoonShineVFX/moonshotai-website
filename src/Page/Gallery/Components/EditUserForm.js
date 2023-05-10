import React,{useState} from 'react'
import { useForm,Controller } from 'react-hook-form';
import {motion,AnimatePresence} from 'framer-motion'
function EditUserForm({userData,handleEdit,handleSetUserProfile}) {
  const { control,register, handleSubmit, formState: { errors } } = useForm({
    name:'',facebookId:"",instagramId:"",linkedinId:"",portfolioUrl:"",bio:"",isNsfw:false,location:""
  });
  const [enabled, setEnabled] = useState(false);
  const onSubmit = (data) => {
    console.log(data);
    const items ={
      name:data.name? data.name : '',
      facebook_username:data.facebookId ?data.facebookId :"",
      instagram_username:data.instagramId?data.instagramId:"",
      linkdin_username:data.linkedinId?data.linkedinId:"",
      display_nsfw:data.isNsfw?data.isNsfw:false,
      // portfolio_url:data.portfolioUrl?data.portfolioUrl:"",
      // bio:data.bio?data.bio:"",

      // location:data.location?data.location:"",
    }
    handleSetUserProfile(items)
  };
  const modalVariants = {
    close: { opacity: 0, },
    open: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      variants={modalVariants}
      className=' fixed z-50 top-0 left-0 w-full'>
      <div className='bg-black/50 w-full h-screen' onClick={handleEdit}></div>
      <div className=' bg-zinc-600 rounded-lg p-6 text-white absolute top-32 left-1/2 -translate-x-1/2 w-2/3'>
        <div className='text-center font-bold'>Your Profile</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col'>
            <label htmlFor="name" className='text-white/50 font-normal my-2'>Name</label>
            <Controller
              name="name"
              control={control}
              defaultValue={userData && userData.name}
              rules={{ required: true }}
              render={({ field }) => (
                <input {...field} type="text" placeholder="Name" className='bg-zinc-500 rounded-md py-2 px-2 text-sm' />
              )}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="facebook-id" className='text-white/50 font-normal my-2'>Facebook account</label>
            <Controller
              name="facebookId"
              control={control}
              defaultValue={userData && userData.facebook_username}
              rules={{ required: false }}
              render={({ field }) => (
                <input {...field} type="text" placeholder="facebookId" className='bg-zinc-500 rounded-md py-2 px-2 text-sm' />
              )}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="instagram-id" className='text-white/50 font-normal my-2'>Instagram account</label>
            <Controller
              name="instagramId"
              control={control}
              defaultValue={userData && userData.instagram_username}
              rules={{ required: false }}
              render={({ field }) => (
                <input {...field} type="text" placeholder="facebookId" className='bg-zinc-500 rounded-md py-2 px-2 text-sm' />
              )}
            />
           
          </div>
          <div className='flex flex-col' >
            <label htmlFor="linkedin-id" className='text-white/50 font-normal my-2'>LinkedIn account</label>
            <Controller
              name="linkedinId"
              control={control}
              defaultValue={userData && userData.linkdin_username}
              rules={{ required: false }}
              render={({ field }) => (
                <input {...field} type="text" placeholder="facebookId" className='bg-zinc-500 rounded-md py-2 px-2 text-sm' />
              )}
            />
           
          </div>
          <Controller
            name="isNsfw"
            control={control}
            defaultValue={enabled}
            render={({ field }) => (
              <div className="flex mt-4">
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
                    NSFW
                  </span>
                </label>
              </div>
            )}
          />
          
          <div className='mt-6 flex gap-3 justify-center text-sm'>
            <button type="submit" className='border  py-1 px-2 rounded-md'>Save</button>
            <button type="button" className='text-white/80' onClick={handleEdit}>Cancel</button>
          </div>

        </form>

      </div>


    </motion.div>
  )
}

export default EditUserForm