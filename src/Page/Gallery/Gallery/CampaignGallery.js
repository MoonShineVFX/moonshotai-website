import React, { useState, useEffect } from 'react';
import {motion,AnimatePresence} from 'framer-motion'
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { MdNotInterested,MdOutlineNewReleases,MdModeComment,MdAlarm,MdKeyboardArrowRight,MdArrowOutward } from "react-icons/md";

import {fetchGalleries,getStoredLocalData,fetchCampaigns,fetchCampaignImages} from '../helpers/fetchHelper'

import { isLoginState,loginState, imageDataState,imageModalState,lineProfileState,userState} from '../atoms/galleryAtom';
import {LoadingLogoFly,LoadingLogoSpin,TitleWithLimit,recordPageUrl} from '../helpers/componentsHelper'

import {  useRecoilValue ,useRecoilState } from 'recoil';
import { Button } from "@material-tailwind/react";
import moment from 'moment';
import { useQuery, useInfiniteQuery,QueryClient,useQueries } from 'react-query';
function CampaignGallery() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginState);
  const [lineProfile, setLineProfile] = useRecoilState(lineProfileState);
  const [linLoginData, setLineLoginData] = useRecoilState(loginState)
  const [currentUser, setCurrentUser] = useRecoilState(userState)
  const [isInitialized, setIsInitialized] = useState(false);

  const [totalPage, setTotalPage]= useState(0)
  const [currentPage, setCurrentPage]= useState(1)
  const [pageSize, setPageSize] = useState(12)
  const [startDate, setStartDate] = useState(moment().format('2022-01-01'))
  const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'))
  const [currModels, setCurrModels] = useState('all')
  const [loading, setLoading] = useState(false);

  const [ campaignsData , setCampaignsData] = useState([])
  const imageVariants = {
    hidden: { opacity: 0, },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  // 在此處檢查 localStorage 內的資料
  useEffect(() => {
    getStoredLocalData().then(data => {
      setIsLoggedIn(data.isLogin);
      setLineLoginData(data.loginToken);
      setLineProfile(data.lineProfile);
      setCurrentUser(data.currentUser);
      setIsInitialized(true);

    });
  }, [setLineLoginData,setCurrentUser]);
  //FETCH campaigns LIST
  const { data:campaigns, isLoading:isCampaignsLoading, isError:isCampaignsError, refetch:campaignsRefetch } = useQuery(
    [ 'campaigns'],
    ({ pageParam }) =>
      fetchCampaigns(),
    {
     onSuccess:(data)=>{
      setCampaignsData(data)

     }
    }
  );
  // Define an array of query keys for images of all campaigns
  const imageQueries = campaignsData?.map((campaign) => ({
    queryKey: ['campImages', campaign.id],
    queryFn: () => fetchCampaignImages(campaign.id,7), // Replace with your API call to fetch images by campaignId
    config: {
      enabled: true, // Fetch images for all campaigns immediately
    },
  }));
  const imageResults = useQueries(imageQueries);



  if (isCampaignsLoading) {
    return <LoadingLogoSpin />;
  }

  if (isCampaignsError) {
    return <div>Error: Campaigns data could not be loaded</div>;
  }


  return (
    <div className='w-full text-white'>

      <ul>
        {campaignsData.map((campaign, index) => (
          <li key={campaign.id}>
            <div>
              <div className='flex justify-between items-end'>
                <h3 className='text-sm font-semibold text-white/80 flex  items-center'>{campaign.name} <MdKeyboardArrowRight className='ml-4'/></h3>
                <Link to={`/campaign/${campaign.id}`} className='text-sm text-white/60 '>
                 <Button variant="outlined"  className='p-1 opacity-40 flex items-center gap-1' color="white" > 觀看更多  <MdArrowOutward/></Button>
                </Link>
              </div>

              <div  className='grid grid-cols-2 md:grid-cols-7 gap-4 my-4'>
                {imageResults[index].data?.results.length > 0 ? (
                  imageResults[index].data.results.map((image) => {
                    const { id: campaignId } = campaign;
                    const {id:imageId, urls, created_at, filename,is_storage,title,author,is_user_nsfw,is_nsfw,likes,comments   } = image
                    return (
                      <motion.div key={`campGallery-${campaignId}-${imageId}`} 
                        variants={imageVariants} initial="hidden" animate="visible" transition={{ delay: index * 0.1 }}
                        className='  overflow-hidden relative  mb-5'
                      >
                        <Link to={`/post/${imageId}`} className=' relative group' onClick={recordPageUrl}>
                          <div className=' relative overflow-hidden   rounded-md'>
                            <img  
                              alt={title}
                              src={urls.thumb}
                              data-id={imageId}
                              className=' aspect-square object-cover w-full hover:scale-110 transition duration-300 '
      
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
    
                        <div className='flex flex-col mt-2'>
                          <div className='text-base font-light '><TitleWithLimit title={title} maxLength={12}/> </div>
                          <div className='text-sm  flex items-center space-x-3 w-full mt-1   text-white'>
                            <Link to={`/user/${author?.id}`}  className='w-6' onClick={recordPageUrl}>
                              <div className='pt-[100%] relative'>
                                <img src={author?.profile_image} alt="user avatar" className='absolute aspect-square top-1/2 left-0 -translate-y-1/2 object-cover w-full h-fulls rounded-full'/>
                              </div>
                            </Link>
                            <div className='text-xs text-white/50'>{author?.name}</div>
                            
                          </div>
                        </div>
    
    
    
                      </motion.div>
    
                    )
                  })
                ) : (
                  <li className='text-white/40 text-sm' >這個活動還沒有人參與.</li>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>

      
    </div>
  )
}

export default CampaignGallery