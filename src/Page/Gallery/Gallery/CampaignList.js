import React,{useState,useEffect} from 'react'
import {motion,AnimatePresence} from 'framer-motion'
import { useParams,useNavigate,Link } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';

import { loginState,isLoginState,lineProfileState,userState,imageDataState } from '../atoms/galleryAtom';
import {LoadingLogoSpin,CallToLoginModal,TitleWithLimit,recordPageUrl,getCookieValue} from '../helpers/componentsHelper'
import {getStoredLocalData,fetchCampaignImages,fetchCampaigns} from '../helpers/fetchHelper'
import { useQuery, useMutation,useQueryClient,useInfiniteQuery } from 'react-query';

import { FaHeart } from "react-icons/fa";
import { MdNotInterested,MdOutlineNewReleases,MdModeComment,MdAlarm } from "react-icons/md";
import Masonry from 'react-masonry-css';
function CampaignList() {
  const { id } = useParams();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginState);
  const [lineProfile, setLineProfile] = useRecoilState(lineProfileState);
  const [linLoginToken, setLineLoginToken] = useRecoilState(loginState)
  const [currentUser, setCurrentUser] = useRecoilState(userState)

  const [pageSize, setPageSize] = useState(20)
  const [isInitialized, setIsInitialized] = useState(false);
  const [ currentCampign , setCurrentCampaign] = useState({})
  const navigate = useNavigate();
  const imageVariants = {
    hidden: { opacity: 0, },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  useEffect(()=>{
    getStoredLocalData().then(localData=>{
      setIsLoggedIn(localData.isLogin)
      setLineLoginToken(localData.loginToken)
      setLineProfile(localData.lineProfile)
      setCurrentUser(localData.currentUser)
      setIsInitialized(true);
  
    })
  },[setIsLoggedIn,setLineLoginToken,setLineProfile])

  const { data: campaignImage, isLoading: isCampaignImageLoading, isError: isCampaignImageError } = useInfiniteQuery(
    ['campaignImages', id,  pageSize],
    ({ pageParam }) => fetchCampaignImages(id, pageParam, pageSize),
    {
        enabled: isInitialized && (!!id || isLoggedIn !== null), // 只有在 id 不為空時才啟用 useQuery
        getNextPageParam: (lastPage, pages) =>{
        // 檢查是否有下一頁
        if (lastPage.next) {
          const url = new URL(lastPage.next);
          const nextPage = url.searchParams.get("cursor");
          return nextPage ? nextPage : undefined;
        }
        return undefined;
        }
    }
  );
  const campaignImageData = campaignImage?.pages?.flatMap((pageData) => pageData.results) ?? [];
  const { data:campaigns, isLoading:isCampaignsLoading, isError:isCampaignsError, refetch:campaignsRefetch } = useQuery(
    [ 'campaigns'],
    ({ pageParam }) =>
      fetchCampaigns(),
    {
     onSuccess:(data)=>{
     const filterCamp = data.filter((item)=>{
        return item.id === Number(id)
      })
      setCurrentCampaign(filterCamp[0])

     }
    }
  );
  return (
    <div>
        <div className='text-white text-lg my-6 font-semibold '>{currentCampign?.name}</div>
        <Masonry
          breakpointCols={{
            default: 5,
            1024: 4,
            500: 2,
          }}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
 
          {campaignImageData.map((image,index)=>{
            const {id, urls, created_at, filename,is_storage,title,author,is_user_nsfw,is_nsfw,likes,comments   } = image
            return (
              <motion.div key={'campList-'+index} 
                variants={imageVariants} initial="hidden" animate="visible" transition={{ delay: index * 0.1 }}
                className='  overflow-hidden relative  mb-5'
              >
                <Link to={`/post/${id}`} className=' relative group' onClick={recordPageUrl}>
                  <div className=' relative overflow-hidden   rounded-md'>
                    <img  
                      alt={title}
                      src={urls.thumb}
                      data-id={id}
                      className=' object-cover w-full hover:scale-110 transition duration-300 '

                    />
                  </div>

                  <div className='absolute bottom-0 p-1 flex gap-1 items-center text-white justify-between w-full px-2 md:opacity-0 md:group-hover:opacity-100 transition duration-700'>
                    <div className='flex items-center space-x-2'>
                      <div className='flex items-center  space-x-2 '><FaHeart /> <span>{likes}</span></div>
                      <div className='flex items-center  space-x-2'><MdModeComment />  <span>{comments}</span></div>
                    </div>

                    <div className='text-red-300'>
                      {is_user_nsfw || is_nsfw ?  <MdOutlineNewReleases size={20}  />  : ""  }
                    </div>


                  </div>
                  <div>
                    
                  </div>
                </Link>



                <div className='text-sm  flex items-center mt-2 space-x-3 w-full   text-white'>
                  <Link to={`/user/${author?.id}`}  className='w-8' onClick={recordPageUrl}>
                    <div className='pt-[100%] relative'>
                      <img src={author?.profile_image} alt="user avatar" className='absolute aspect-square top-1/2 left-0 -translate-y-1/2 object-cover w-full h-fulls rounded-full'/>
                    </div>
                  </Link>

                  <div className='flex flex-col'>
                    <div className='text-base font-bold '><TitleWithLimit title={title} maxLength={12}/> </div>
                    <div className='text-xs text-white/50'>{author?.name}</div>
                  </div>
                </div>



              </motion.div>

            )
            })}


        </Masonry>
    </div>
  )
}

export default CampaignList