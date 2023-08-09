import React, { useState, useEffect } from 'react';
import {motion,AnimatePresence} from 'framer-motion'
import {useDevUserLogin,fetchGalleries,initializeLineLogin,getStoredLocalData,refreshToken,fetchComments,removeLocalStorageItem} from '../helpers/fetchHelper'

import { isLoginState,loginState, imageDataState,imageModalState,lineProfileState,userState} from '../atoms/galleryAtom';
import {LoadingLogoFly,LoadingLogoSpin,TitleWithLimit,recordPageUrl} from '../helpers/componentsHelper'

import {  useRecoilValue ,useRecoilState } from 'recoil';
import moment from 'moment';
import { useQuery, useInfiniteQuery,QueryClient } from 'react-query';
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
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage,isLoading, isError, refetch } = useInfiniteQuery(
    [ 'galleries',linLoginData, startDate, currModels],
    ({ pageParam }) =>
      fetchGalleries(linLoginData, pageParam, pageSize, startDate, endDate, currModels),
    {
      enabled:isInitialized && (linLoginData !== null || isLoggedIn !== null),
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
  const imageData = data?.pages?.flatMap((pageData) => pageData.results) ?? [];


  if(isLoading){
    return(
      <LoadingLogoSpin />
    )
  }
  return (
    <div className='w-full '>
       <div className='text-white'>Campaign title Here </div>
      {
        imageData.length === 0 && <div className='text-white/60 text-sm my-6 text-center'>這個選擇下目前沒有圖片。</div>
      }
      <div className='grid grid-cols-2 md:grid-cols-5 gap-4 my-4'>
        <motion.div 
          variants={imageVariants} initial="hidden" animate="visible" 
          className='text-white'>Campaign images Here</motion.div>
      </div>
    </div>
  )
}

export default CampaignGallery