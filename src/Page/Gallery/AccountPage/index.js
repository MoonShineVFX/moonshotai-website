import React, { useState, useEffect }  from 'react'
import {  useRecoilValue ,useRecoilState } from 'recoil';
import { isLoginState,loginState,lineProfileState, userState, imageFormModalState,imageModalState,beforeDisplayModalState } from '../atoms/galleryAtom';
import { fetchLineLogin, fetchUserStorages, fetchUserCollections, userStorageAImage, fetchUserProfile, fetchUser, patchUserProfile,userDelAStorageImage,userCollectionAImage,userDelACollectionImage,userPatchDisplayHome,userPatchAStorageImage,fetchUserFollowings,userUnFollowAUser,getStoredLocalData,refreshToken,getSubscriptions } from '../helpers/fetchHelper';
import {LoadingLogoSpin} from '../helpers/componentsHelper'
import { useForm,Controller } from 'react-hook-form';
import liff from '@line/liff';
import Header from '../header'
import moment from 'moment';
import { MdContentCopy } from "react-icons/md";

const liffID = process.env.REACT_APP_LIFF_LOGIN_ID
function Index() {
  const { control,register, handleSubmit, formState: { errors } } = useForm({
    name:'',facebookId:"",instagramId:"",linkedinId:"",portfolioUrl:"",bio:"",isNsfw:false,location:""
  });
  const [ isCopied , setIsCopied ] = useState(false);
  //CHECK IS USER LOGIN DATABASE
  const [currentHeaders , setCurrentHeaders] = useState({})
  const [subsData, setSubsData] = useState({})
  const [currentUser, setCurrentUser] = useRecoilState(userState)
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginState);
  const [linLoginData, setLineLoginData] = useRecoilState(loginState)
  const [lineProfile, setLineProfile] = useRecoilState(lineProfileState);
  const [token, setToken] = useRecoilState(loginState)
  const [currentProfile, setCurrentProfile] = useRecoilState(userState);

  const [ isSaveSuccess , setIsSaveSuccess] = useState(false)

  const onSubmit = (data) => {
    // console.log(data);
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
      bio:data.bio||null
    }
    setIsSaveSuccess(false)
    handleSetUserProfile(items)
    
  };
  const handleSetUserProfile = (items)=>{
    patchUserProfile(currentProfile.id,linLoginData,items)
      .then((data)=> {
        if(data.status === 200){
          setIsSaveSuccess(true)
          setTimeout(()=>{
            fetchUserProfile(currentProfile.id, token)
              .then((data)=> {
                // console.log(data)
                setCurrentProfile(data)
                localStorage.setItem('currentUser', JSON.stringify(data));
                
              })
              .catch((error) => console.error(error));
          },1000)
        }
      })
      .catch((error) => console.error(error));
  }
  const diffDays = (targetday)=>{
    const targetDate = moment(targetday);
    const currentDate = moment();
    const diffDays = targetDate.diff(currentDate, 'days');
    if (diffDays <= 5) {
      return(
        <div className='text-sm text-white/80'>進階會員快到囉，可以續訂。</div>
      )
    } return(  <div className='hidden'>no</div>)

  }
  const handleCopy=(text)=>{
    navigator.clipboard.writeText(text);
    setIsCopied(true)
  }
  //TODO no login many time
  const initializeLineLogin = async () => {
    liff.init({
      liffId: liffID
    }).then(function() {
      console.log('LIFF init');
      if (liff.isLoggedIn()) {
        const accessToken = liff.getAccessToken();
        setIsLoggedIn(true)
        localStorage.setItem('isLogin', true);
        // console.log("getAccessToken", accessToken);
        if(accessToken){

          liff.getProfile().then(profile=>{
            // console.log(profile)
            setLineProfile(profile)
            localStorage.setItem('lineProfile', JSON.stringify(profile));
            fetchLineLogin(profile)
              .then((data)=> {
                setToken(data.token)
                localStorage.setItem('loginTokenData', JSON.stringify(data));
                fetchUserProfile(data.user_id, data.token)
                  .then((data)=> {
                    // console.log(data)
                    setCurrentProfile(data)
                    localStorage.setItem('currentUser', JSON.stringify(data));
                  })
                    
                  .catch((error) => console.error(error));
              })
              .catch((error) => console.error(error));
              
          }).catch(err => console.log(err))
        }
      } else {
        console.log('not yet login')
        liff.login();
      }
    }).catch(function(error) {
      console.log(error);
    });
  }
  //TODO no login many time
  const devLogin = ()=>{
    const profile ={
      displayName:  process.env.REACT_APP_NAME,
      pictureUrl: process.env.REACT_APP_TEST_URL,
      statusMessage:"123",
      userId:process.env.REACT_APP_TEST_UID
    }
    setIsLoggedIn(true)
    setLineProfile(profile)
    localStorage.setItem('isLogin', true);
    localStorage.setItem('lineProfile', JSON.stringify(profile));
    // setCurrentProfile(profile)

    fetchLineLogin(profile)
      .then((data)=> {
        setToken(data.token)
        setLineLoginData(data.token)
        localStorage.setItem('loginTokenData', JSON.stringify(data));
        fetchUserProfile(data.user_id, data.token)
          .then((data)=> {
            // console.log(data)
            setCurrentProfile(data)
            // console.log(data)
            localStorage.setItem('currentUser', JSON.stringify(data));
          })
          .catch((error) => console.error(error));
        // handleRenders(profile.userId ,data.token)


      })
      .catch((error) => console.error(error));
  }
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      // initializeLineLogin()
      getStoredLocalData().then(data=>{
        setIsLoggedIn(data.isLogin)
        setLineLoginData(data.loginToken)
        setLineProfile(data.lineProfile)
        setCurrentUser(data.currentUser)
        let user = data.currentUser
        let loginToken = data.loginToken
        let lineProfile = data.lineProfile
        let headers = {'Content-Type': 'application/json'} 
        if(data.isLogin){
          console.log('profilePage is login:', data.isLogin)

            // headers = {'Content-Type': 'application/json' ,'Authorization': `Bearer ${data.token}` }
            // setCurrentHeaders(headers)
            setToken(loginToken)
            getSubscriptions(loginToken).then(odata=>{
              // console.log(odata)
              setSubsData(odata)
            })
            fetchUserProfile(user.id,loginToken).then((udata)=>{
              if(udata === 401){
                setCurrentUser({})
              } else{
                setCurrentUser(udata)
              }
            })


          // refreshToken().then(data =>{
          // })
        }else{
          // initializeLineLogin()
        }
        
      })

    }else{
      // devLogin()
    }
  }, [process.env.NODE_ENV,setIsLoggedIn,setLineLoginData,setLineProfile]);

  if(!currentProfile){
    return (
      <LoadingLogoSpin />  
  );
  }
  return (
    <div className='text-white'>
      <Header isLoggedIn={isLoggedIn} currentUser={currentProfile}/>

      <div className='md:w-8/12 mx-auto'>
        <div className='mx-4 my-4 '>
          <div className='text-center font-bold'>您的帳號資料</div>
          <div className='text-lime-500'>個人資料</div>
          
          <div>
            <div className='text-white/70 my-2 text-xs'>會員狀態</div>
            <div className='flex items-center gap-1 border-b border-zinc-700 pb-2 text-white/80'>  
              <div>{currentProfile.is_subscribed  ? '進階' : 'FREE'}   </div>          
              {currentProfile.is_subscribed && 
                <div htmlFor="name" className='text-sm '>至 {moment(currentProfile.subscription_end_at).format('YYYY-MM-DD HH:mm') }</div>
              }
              
            </div>
            {diffDays(currentProfile.subscription_end_at)}
          
    
          </div>
          <div>
            <div className='text-white/70 my-2 text-xs'>推薦序號(個人專屬)</div>
            <div className='flex items-center  gap-3'>
              <div onClick={()=>handleCopy(currentProfile.invitation_code)}>{currentProfile.invitation_code} </div>
              <div className='text-xs flex items-center ' onClick={()=>handleCopy(currentProfile.invitation_code)}> <MdContentCopy size={18}/>  {isCopied ?'Copied!'  :''}</div>
            </div>
            

          </div>
          <div className='my-4'>
            <div className='text-white/70 my-2 text-xs'>使用量</div>
            <div className='text-xs text-white/ㄞ0 mt-1 space-y-1 '>
              <div className='flex justify-between'> 推薦序號被使用次數:(上限 5)  <span>{currentProfile.total_invitations}</span> </div>
              <div className='flex justify-between'> 製圖總圖片量         <span>{currentProfile.total_photos}</span>          </div>
              <div className='flex justify-between'> 已保留圖片數         <span>{currentProfile.total_storages}</span>          </div>
              <div className='flex justify-between'> 已收藏圖片數         <span>{currentProfile.total_collections}</span>         </div>
              <div className='flex justify-between'> 被收藏圖片數         <span>{currentProfile.total_collected}</span>         </div>
              <div className='flex justify-between'> 已追隨人數       <span>{currentProfile.total_follows}</span>         </div>
              <div className='flex justify-between'> 被追隨人數           <span>{currentProfile.total_followers}</span>         </div>
            </div>
          </div>
    
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='mx-4 my-6'>
            <div className='grid grid-cols-2 gap-2'>
              <div className='flex flex-col'>
                <label htmlFor="name" className='text-white/70 my-2 text-xs'>顯示名稱</label>
                <Controller
                  name="name"
                  control={control}
                  defaultValue={currentProfile && currentProfile.name}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <input {...field} type="text" placeholder="Name" className='bg-zinc-900 border border-zinc-700  rounded-md py-2 px-2 text-sm' />
                  )}
                />
              </div>
            </div>

            <div className='flex flex-col   '>
              <label htmlFor="email" className='text-white/70 my-2 text-xs'>Email</label>
              <Controller
                name="email"
                control={control}
                defaultValue={currentProfile && currentProfile.email}
                rules={{ required: false }}
                render={({ field }) => (
                  <input {...field} type="text" placeholder="email" className='bg-zinc-900 border border-zinc-700 rounded-md py-2 px-2 text-sm' />
                )}
              />
            </div>
            <div className='flex flex-col  '>
              <label htmlFor="bio" className='text-white/70 my-2 text-xs'>關於我</label>
              <Controller
                name="bio"
                control={control}
                defaultValue={currentProfile && currentProfile.bio}
                rules={{ required: false }}
                render={({ field }) => (
                  <input {...field} type="text" placeholder="Short bio about 20-70 characters" className='bg-zinc-900 border border-zinc-700  rounded-md py-2 px-2 text-sm' />
                )}
              />
            </div>
            <div className='mt-8 text-lime-500'>其他設定</div>
            <div className='grid grid-cols-2 gap-2 '>
              <div className='flex flex-col  '>
                <label htmlFor="portfolioUrl" className='text-white/70 my-2 text-xs'>Website</label>
                <Controller
                  name="portfolioUrl"
                  control={control}
                  defaultValue={currentProfile && currentProfile.portfolio_url}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <input {...field} type="text" placeholder="portfolio url" className='bg-zinc-900 border border-zinc-700 rounded-md py-2 px-2 text-sm' />
                  )}
                />
              </div>
              <div className='flex flex-col  '>
                <label htmlFor="facebookId" className='text-white/70 my-2 text-xs'>Facebook</label>
                <Controller
                  name="facebookId"
                  control={control}
                  defaultValue={currentProfile && currentProfile.facebook_id}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <input {...field} type="text" placeholder="facebookId" className='bg-zinc-900 border border-zinc-700 rounded-md py-2 px-2 text-sm' />
                  )}
                />
              </div>
              <div className='flex flex-col '>
                <label htmlFor="instagramId" className='text-white/70 my-2 text-xs'>Instagram</label>
                <Controller
                  name="instagramId"
                  control={control}
                  defaultValue={currentProfile && currentProfile.instagram_id}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <input {...field} type="text" placeholder="instagramId" className='bg-zinc-900 border border-zinc-700 rounded-md py-2 px-2 text-sm' />
                  )}
                />
              
              </div>
              <div className='flex flex-col' >
                <label htmlFor="linkedinId" className='text-white/70 my-2 text-xs'>LinkedIn</label>
                <Controller
                  name="linkedinId"
                  control={control}
                  defaultValue={currentProfile && currentProfile.linkedin_id}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <input {...field} type="text" placeholder="linkedinId" className='bg-zinc-900 border border-zinc-700 rounded-md py-2 px-2 text-sm' />
                  )}
                />
              
              </div>
              <div className='flex flex-col' >
                <label htmlFor="discordId" className='text-white/70 my-2 text-xs'>Discord</label>
                <Controller
                  name="discordId"
                  control={control}
                  defaultValue={currentProfile && currentProfile.discord_id}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <input {...field} type="text" placeholder="discordId" className='bg-zinc-900 border border-zinc-7000 rounded-md py-2 px-2 text-sm' />
                  )}
                />
              
              </div>
              <div className='flex flex-col' >
                <label htmlFor="twitterId" className='text-white/70 my-2 text-xs'>Twitter</label>
                <Controller
                  name="twitterId"
                  control={control}
                  defaultValue={currentProfile && currentProfile.twitter_id}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <input {...field} type="text" placeholder="twitterId" className='bg-zinc-900 border border-zinc-700 rounded-md py-2 px-2 text-sm' />
                  )}
                />
              
              </div>
            </div>

            
            <Controller
              name="isNsfw"
              control={control}
              defaultValue={currentProfile && currentProfile.display_nsfw}
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
                          ? 'peer-checked:after:translate-x-full peer-checked:bg-green-700'
                          : ''
                      } peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}
                    ></div>
                    <span className="ml-2 text-sm font-medium text-white/80">
                      啟用顯示包含成人內容
                    </span>
                  </label>
                </div>
              )}
            />
            
            <div className='mt-6 flex gap-3 justify-center text-md'>
              <button type="submit" className='w-full  py-1 px-2 rounded-md bg-lime-700'>儲存變更</button>
            </div>
            {isSaveSuccess && <div className=''>修改完成。</div>}

        </form>

      </div>

    </div>
  )
}

export default Index