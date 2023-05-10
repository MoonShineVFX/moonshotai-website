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
      name:data.name ||'',
      email:data.email ||null,
      facebook_id:data.facebookId || null,
      instagram_id:data.instagramId||null,
      linkedin_id:data.linkedinId||null,
      discord_id:data.discordId||null,
      twitter_id:data.twitterId||null,
      display_nsfw:data.isNsfw||false,
      portfolio_url:data.portfolioUrl||null,
      bio:data.bio||null,
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
      <div className=' bg-zinc-700 rounded-lg p-4 box-border text-white fixed top-10 left-1/2 -translate-x-1/2 w-4/5'>
        <div className='text-center font-bold'>Your Profile</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid grid-cols-2 gap-2'>
            <div className='flex flex-col'>
              <label htmlFor="name" className='text-white/50 font-normal my-2'>Name</label>
              <Controller
                name="name"
                control={control}
                defaultValue={userData && userData.name}
                rules={{ required: true }}
                render={({ field }) => (
                  <input {...field} type="text" placeholder="Name" className='bg-zinc-600 rounded-md py-2 px-2 text-sm' />
                )}
              />
            </div>
          </div>

          <div className='flex flex-col  '>
            <label htmlFor="email" className='text-white/50 font-normal my-2'>Email</label>
            <Controller
              name="email"
              control={control}
              defaultValue={userData && userData.email}
              rules={{ required: false }}
              render={({ field }) => (
                <input {...field} type="text" placeholder="email" className='bg-zinc-600 rounded-md py-2 px-2 text-sm' />
              )}
            />
          </div>
          <div className='flex flex-col  '>
            <label htmlFor="bio" className='text-white/50 font-normal my-2'>Bio</label>
            <Controller
              name="bio"
              control={control}
              defaultValue={userData && userData.bio}
              rules={{ required: false }}
              render={({ field }) => (
                <input {...field} type="text" placeholder="Short bio about 20-50 characters" className='bg-zinc-600 rounded-md py-2 px-2 text-sm' />
              )}
            />
          </div>
          <div className='text-center mt-8 text-white/60'>-- Social Media --</div>
          <div className='grid grid-cols-2 gap-2'>
            <div className='flex flex-col  '>
              <label htmlFor="portfolioUrl" className='text-white/50 font-normal my-2'>Website</label>
              <Controller
                name="portfolioUrl"
                control={control}
                defaultValue={userData && userData.portfolio_url}
                rules={{ required: false }}
                render={({ field }) => (
                  <input {...field} type="text" placeholder="portfolio url" className='bg-zinc-600 rounded-md py-2 px-2 text-sm' />
                )}
              />
            </div>
            <div className='flex flex-col  '>
              <label htmlFor="facebookId" className='text-white/50 font-normal my-2'>Facebook</label>
              <Controller
                name="facebookId"
                control={control}
                defaultValue={userData && userData.facebook_id}
                rules={{ required: false }}
                render={({ field }) => (
                  <input {...field} type="text" placeholder="facebookId" className='bg-zinc-600 rounded-md py-2 px-2 text-sm' />
                )}
              />
            </div>
            <div className='flex flex-col '>
              <label htmlFor="instagramId" className='text-white/50 font-normal my-2'>Instagram</label>
              <Controller
                name="instagramId"
                control={control}
                defaultValue={userData && userData.instagram_id}
                rules={{ required: false }}
                render={({ field }) => (
                  <input {...field} type="text" placeholder="instagramId" className='bg-zinc-600 rounded-md py-2 px-2 text-sm' />
                )}
              />
            
            </div>
            <div className='flex flex-col' >
              <label htmlFor="linkedinId" className='text-white/50 font-normal my-2'>LinkedIn</label>
              <Controller
                name="linkedinId"
                control={control}
                defaultValue={userData && userData.linkedin_id}
                rules={{ required: false }}
                render={({ field }) => (
                  <input {...field} type="text" placeholder="linkedinId" className='bg-zinc-600 rounded-md py-2 px-2 text-sm' />
                )}
              />
            
            </div>
            <div className='flex flex-col' >
              <label htmlFor="discordId" className='text-white/50 font-normal my-2'>Discord</label>
              <Controller
                name="discordId"
                control={control}
                defaultValue={userData && userData.discord_id}
                rules={{ required: false }}
                render={({ field }) => (
                  <input {...field} type="text" placeholder="discordId" className='bg-zinc-600 rounded-md py-2 px-2 text-sm' />
                )}
              />
            
            </div>
            <div className='flex flex-col' >
              <label htmlFor="twitterId" className='text-white/50 font-normal my-2'>Twitter</label>
              <Controller
                name="twitterId"
                control={control}
                defaultValue={userData && userData.twitter_id}
                rules={{ required: false }}
                render={({ field }) => (
                  <input {...field} type="text" placeholder="twitterId" className='bg-zinc-600 rounded-md py-2 px-2 text-sm' />
                )}
              />
            
            </div>
          </div>

          
          <Controller
            name="isNsfw"
            control={control}
            defaultValue={userData && userData.display_nsfw}
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
                    toggle NSFW content
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