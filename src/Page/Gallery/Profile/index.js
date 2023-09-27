import React, { useState, useEffect }  from 'react'
import {motion,AnimatePresence} from 'framer-motion'
import { MdKeyboardArrowDown, MdMoreVert,MdViewModule,MdBookmark,MdSupervisedUserCircle,MdImage } from "react-icons/md";
import { FaHeart,FaFacebook,FaInstagram,FaTwitter,FaLinkedinIn,FaDiscord,FaImages } from "react-icons/fa";
import { HiGlobeAlt } from "react-icons/hi";
import Header from '../header'

import { isLoginState,loginState,lineProfileState, userState, imageFormModalState,imageModalState,beforeDisplayModalState } from '../atoms/galleryAtom';
import {  useRecoilValue ,useRecoilState } from 'recoil';
import { fetchLineLogin, fetchUserImages, fetchUserStorages, fetchUserCollections, userStorageAImage, fetchUserProfile, fetchUser, patchUserProfile,userDelAStorageImage,userCollectionAImage,userDelACollectionImage,userPatchDisplayHome,userPatchAStorageImage,fetchUserFollowings,userUnFollowAUser,getStoredLocalData,fetchCampaigns,postImgtoCampaign,removeImgtoCampaign,useUpdateUserMutation,fetchUserPublicImages,useCollectionImageMutation,useDelACollectionImageMutation,usePostImageMutation,useDelPostImageMutation,usePatchPostImageMutation } from '../helpers/fetchHelper';
import {EmptyProfilePage} from '../../Gallery/helpers/componentsHelper'
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RenderPage from '../RenderPage'
import StoragePage from '../StoragePage'
import CollectionPage from '../CollectionPage'
import FollowPage from '../FollowPage'
import EditUserForm from '../Components/EditUserForm';
import EditImageForm from '../Components/EditImageForm';
import ImageSingleModal from '../Components/ImageSingleModal';
import BeforeDisplayFormModal from '../Components/BeforeDisplayFormModal';
import TutorialPage from '../TutorialPage'
import { useInfiniteQuery,useMutation,useQueryClient,useQuery } from 'react-query';
import { Chip } from '@material-tailwind/react';
import { GiTwoCoins, GiGoldBar } from "react-icons/gi";
const dropDownManuItem = [
  {title:"Renders", display:true,data_name:"total_photos"},
  {title:"Post", display:true,data_name:"total_post"},
  {title:"Collections", display:true,data_name:"total_collections"},
  {title:"Following",display:true,data_name:"total_follows"},
]

function Index() {
  const [storagesResults, setStoragesResults] = useState([]);
  const [collections, setCollections] = useState({});
  const [collectionsResults, setCollectionsResults] = useState([]);
  const [follows, setFollows] = useState({});
  const [followsResults, setFollowsResults] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentDropDownItem, setCurrentDropDownItem] = useState(dropDownManuItem[0])
  const [currentAuthor,setCurrentAuthor] = useState({})
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)
  const [ isCopied , setIsCopied ] = useState(false);
  const [loading, setLoading] = useState(false);

  //API FILTER QUERY 
  const [currentPage, setCurrentPage]= useState(1)
  const [currentStoragePage, setCurrentStoragePage]= useState(1)
  const [totalPage, setTotalPage]= useState(0)
  const [pageSize, setPageSize] = useState(19)
  const [startDate, setStartDate] = useState(moment().subtract(30, 'days').format('YYYY-MM-DD'))
  const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'))
  const [currModels, setCurrModels] = useState('all')
  const [optionPage,setOptionPage] = useState('Renders')

  const [isEdit , setIsEdit] = useState(false)
  const [name,setName]= useState('')

  //CHECK IS USER LOGIN DATABASE
  const [subsData, setSubsData] = useState({})
  const [currentUser, setCurrentUser] = useRecoilState(userState)
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginState);
  const [linLoginData, setLineLoginData] = useRecoilState(loginState)
  const [lineProfile, setLineProfile] = useRecoilState(lineProfileState);
  const [token, setToken] = useRecoilState(loginState)
  const [currentProfile, setCurrentProfile] = useRecoilState(userState);

  const [isShowFormModal, setIsShowFormModal] = useRecoilState(imageFormModalState)
  const isShowModal = useRecoilValue(imageFormModalState)
  const isShowImageModal = useRecoilValue(imageModalState)
  const [isShoDisplayFormModal, setIsShowDisplayFormModal] = useRecoilState(beforeDisplayModalState)
  const isShowBeforeDisplayModal = useRecoilValue(beforeDisplayModalState)

  const [isComplete , setIsComplete] = useState(false)

  const imageVariants = {
    hidden: { opacity: 0, },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  const dropdownVariants = {
    open: {
      opacity: 1,
      display:'block',
      transition: {
        duration: 0.2,
      },
    },
    closed: {
      opacity: 0,
      display:'none',
      transition: {
        duration: 0.2,
      },
    },
  };
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      // initializeLineLogin()
      getStoredLocalData().then(data=>{
        setIsLoggedIn(data.isLogin)
        setLineLoginData(data.loginToken)
        setLineProfile(data.lineProfile)
        setCurrentUser(data.currentUser)
        let user = data.currentUser
        let lineProfile = data.lineProfile
        let loginToken = data.loginToken
        if(data.isLogin){
            console.log('profilePage is login:', data.isLogin)
            setToken(loginToken)
        }else{
        }
        
      })

    }else{
      devLogin()
    }
  }, [process.env.NODE_ENV,setIsLoggedIn,setLineLoginData,setLineProfile]);

  // FETCH Render IMAGE to PAGE 
  const { data: renderData, isLoading:isRenderDataLoading, fetchNextPage:fetchRenderNextPage, hasNextPage, isFetchingNextPage, isError:isRenderDataError, refetch:renderDataRefetch } = useInfiniteQuery(
    [ 'rendersData',currentUser,linLoginData, startDate, currModels],
    ({ pageParam }) =>
    fetchUserImages(currentUser.id, linLoginData, pageParam, pageSize, startDate, endDate, currModels),
    {
      enabled: optionPage === 'Renders',
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
  const renderImages = renderData?.pages?.flatMap((pageData) => pageData.results) ?? [];
 
  
  // FETCH Storage IMAGE to PAGE 
  const { data: storageData, isLoading:isStorageDataLoading, fetchNextPage:fetchStorageNextPage, hasNextPage:hasStorageNextPage, isFetchingNextPage:isFetchStorageNextPage, isError:isStorageDataError, refetch:storageDataRefetch } = useInfiniteQuery(
    [ 'storageData',currentUser,linLoginData, startDate, currModels],
    ({ pageParam }) =>
    fetchUserStorages(currentUser.id, linLoginData, pageParam, pageSize, startDate, endDate, currModels),
    {
      enabled: optionPage === 'Storage',
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
  const storageImages = storageData?.pages?.flatMap((pageData) => pageData.results) ?? [];

  // FETCH POST  IMAGE to PAGE 
  const { data: postsData, isLoading:isPostsDataLoading, fetchNextPage:fetchPostsNextPage, hasNextPage:hasPostsNextPage, isFetchingNextPage:isFetchPostsNextPage, isError:isPostsDataError, refetch:PostsDataRefetch } = useInfiniteQuery(
    [ 'userPostsData',currentUser,linLoginData, startDate, currModels],
    ({ pageParam }) =>
    fetchUserPublicImages(linLoginData,currentUser.id, pageParam, pageSize, startDate, endDate, currModels),
    {
      enabled: optionPage === 'Post',
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
  const postImages = postsData?.pages?.flatMap((pageData) => pageData.results) ?? [];

  // ADD  Render data to STORAGE
  const queryClient = useQueryClient();

  const storageMutation = useMutation((updatedData) => {
    // 在此處呼叫 API 更新圖片內容
    return userStorageAImage(updatedData.newData,linLoginData); // 假設 fetchUpdateImage 為更新圖片內容的 API 請求函數
  }, {
    // 定義更新成功後的行為
    onSuccess: (data, variables) => {
      console.log(variables)
      if(variables.status === 'on_Renderpage'){
        queryClient.setQueryData(['rendersData', currentUser, linLoginData, startDate, currModels], (prevData) => {
          const newData = prevData.pages.map((page) => ({
            
            ...page,
            results: page.results.map((image) =>
              image.id === variables.newData.id ? { ...image,...variables.newData} : image
            ),
          }));
          return { pages: newData };
        });
      }
    },
  });

  // REMOVE STORAGE Render data
    const unStorageMutation = useMutation((updatedData) => {
      // 在此處呼叫 API 更新圖片內容
      return userDelAStorageImage(updatedData.newData,linLoginData); // 假設 fetchUpdateImage 為更新圖片內容的 API 請求函數
    }, {
      // 定義更新成功後的行為
      onSuccess: (data, variables) => {
        if(variables?.status  === 'on_Storagepage'){
          storageDataRefetch()
        }else{
          renderDataRefetch()
        }

      },
    });
  const handleStorage = (newData,status) => {
    // 呼叫更新函數
    storageMutation.mutate({newData,status});
  };
  const handleRemoveStorage = (newData,status)=>{
    unStorageMutation.mutate({newData,status});
  }

  //棄用
  const handleRemoveFromStorage = (image,status)=>{
    let newData = image
    //移除分享+移除留存
    if(image.is_post === true){
      try {
        let items ={display_home:false}
        updateImageMutation.mutate({ image, items, status });
  
      } catch (error) {
        console.log(error)
      }
    }
    try {
      unStorageMutation.mutate({newData,status});
    } catch (error) {
      console.log(error)
    }
   

  }

  const updateImageMutation = useMutation((updatedData) =>{ 
    userPatchAStorageImage(updatedData.image, linLoginData, updatedData.items)}, 
    {
      onSuccess: (data, variables) => {
        // 執行更新成功後的操作
        if(variables?.status === 'on_Renderpage'){
          // renderDataRefetch()
          queryClient.setQueryData(['rendersData', currentUser, linLoginData, startDate, currModels], (prevData) => {
            const newData = prevData.pages.map((page) => ({
              
              ...page,
              results: page.results.map((image) =>
                image.id === variables.image.id ? { ...image,...variables.items} : image
              ),
            }));
            return { pages: newData };
          });
        }else{
          // storageDataRefetch()
          queryClient.setQueryData([ 'storageData',currentUser,linLoginData, startDate, currModels], (prevData) => {
            const newData = prevData.pages.map((page) => ({
              ...page,
              results: page.results.map((image) =>
                image.id === variables.image.id ? { ...image,...variables.items} : image
              ),
            }));
            return { pages: newData };
          });

        }
        setIsShowDisplayFormModal(false);
      },
  });

  //POST IMAGE campaigns
  const postImgtoCampaignMutation = useMutation((updatedData)=>{
    postImgtoCampaign(updatedData.imgid, updatedData.items, linLoginData)
    },
    {
      onSuccess: (data, variables) => {
        if(variables?.status === 'on_Renderpage'){
          queryClient.setQueryData(['rendersData', currentUser, linLoginData, startDate, currModels], (prevData) => {
            const newData = prevData.pages.map((page) => ({
              ...page,
              results: page.results.map((image) =>
                image.id === variables.imgid ? { ...image, campaigns: [...image.campaigns, variables.items.campaign_id]} : image
              ),
            }));
            return { pages: newData };
          });
        }else{
          queryClient.setQueryData([ 'storageData',currentUser,linLoginData, startDate, currModels], (prevData) => {
            const newData = prevData.pages.map((page) => ({
              ...page,
              results: page.results.map((image) =>
                image.id === variables.imgid ? { ...image, campaigns: [...image.campaigns, variables.items.campaign_id]} : image
              ),
            }));
            return { pages: newData };
          });

        }
      }
    }
  )
  //DEL  IMAGE campaigns
  const removeImgtoCampaignMutation = useMutation((updatedData)=>{
    removeImgtoCampaign(updatedData.imgid, updatedData.items, linLoginData)
    },
    {
      onSuccess: (data, variables) => {
        if(variables?.status === 'on_Renderpage'){
          // renderDataRefetch()
          queryClient.setQueryData(['rendersData', currentUser, linLoginData, startDate, currModels], (prevData) => {
            const newData = prevData.pages.map((page) => ({
              ...page,
              results: page.results.map((image) =>
                image.id === variables.imgid ? { ...image, campaigns: image.campaigns.filter((campaign) => campaign !== variables.items.campaign_id)} : image
              ),
            }));
            return { pages: newData };
          });
        }else{
          // storageDataRefetch()
          queryClient.setQueryData([ 'storageData',currentUser,linLoginData, startDate, currModels], (prevData) => {
            const newData = prevData.pages.map((page) => ({
              ...page,
              results: page.results.map((image) =>
                image.id === variables.imgid ? { ...image, campaigns: [...image.campaigns, variables.items.campaign_id]} : image
              ),
            }));
            return { pages: newData };
          });

        }
      }
    }
  )

  //
  // FETCH Collection IMAGE to PAGE 
  const { data: collectionData, isLoading:isCollectioDataLoading, fetchNextPage:fetchCollectioNextPage, hasNextPage:hasCollectioNextPage, isFetchingNextPage:isFetchCollectionNextPage, isError:isCollectioDataError, refetch:collectionDataRefetch } = useInfiniteQuery(
    [ 'collectionData',currentUser,linLoginData, startDate, currModels],
    ({ pageParam}) =>
    fetchUserCollections(currentUser.id, linLoginData, pageParam, pageSize, startDate, endDate, currModels),
    {
      enabled: optionPage === 'Collections',
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
  const collectionImages = collectionData?.pages?.flatMap((pageData) => pageData.results) ?? [];

  //
  // FETCH Follow IMAGE to PAGE 
  const { data: followData, isLoading:isFollowDataLoading, fetchNextPage:fetchFollowNextPage, hasNextPage:hasFollowNextPage, isFetchingNextPage:isFetchFollowNextPage, isError:isFollowDataError, refetch:followDataRefetch } = useInfiniteQuery(
    [ 'followData',currentUser,linLoginData, startDate, currModels],
    ({ pageParam }) =>
    fetchUserFollowings(currentUser.id, linLoginData, pageParam, pageSize, startDate, endDate, currModels),
    {
      enabled: optionPage === 'Following',
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
  const followImages = followData?.pages?.flatMap((pageData) => pageData) ?? [];

  // Todo updateUserMutation

  // FETCH Campaigns to PAGE 
  const { data: campaignData, isLoading:isCampaignDataLoading, fetchNextPage:fetchCampaignNextPage, hasNextPage: hasCampaignNextPage, isFetchingNextPage:isFetchingCampaignNextPage, isError:isCampaignDataError, refetch:campaignDataRefetch } = useInfiniteQuery(
    [ 'campaignData'],
    ({ pageParam }) =>
    fetchCampaigns(),
    {
      enabled: isShowBeforeDisplayModal,
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
  const campaigns = campaignData?.pages?.flatMap((pageData) => pageData) ?? [];

  const switchIcons = (name)=>{
    switch (name) {
      case 'Renders':
        return <MdViewModule size={15} />
        break;
      case 'Post':
        return <FaImages size={15}/>
        break;
      case 'Collections':
        return <MdBookmark size={13}/>
        break;
      case 'Following':
        return <MdSupervisedUserCircle size={15}/>
        break;
      default:
        return <MdBookmark />
        break;
    }
  } 
  const handleImageClick = image => {
    setSelectedImage(image);
  };
  const handleModalClose = () => {
    setSelectedImage(null);
  };

 
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
            localStorage.setItem('currentUser', JSON.stringify(data));
          })
          .catch((error) => console.error(error));



      })
      .catch((error) => console.error(error));
  }
  //ADD POST rendersData
  const postImageMutation = usePostImageMutation(linLoginData,[ 'rendersData',currentUser,linLoginData, startDate, currModels]);
  //DEL POST rendersData
  const unPostImageMutation = useDelPostImageMutation(linLoginData,[ 'userPostsData',currentUser,linLoginData, startDate, currModels]);
  const patchPostImageMutation = usePatchPostImageMutation(linLoginData,[ 'userPostsData',currentUser,linLoginData, startDate, currModels]);
  
  const handlePostImage = (image,items) =>{
    postImageMutation.mutateAsync({image,items}).then(()=>{
      setIsShowDisplayFormModal(false)
      setIsComplete(true)
    })
  }
  const handleRemovePost = (image)=>{
    unPostImageMutation.mutateAsync({image})
  }
  const handlePatchPost = (image,items)=>{
    //
    patchPostImageMutation.mutateAsync({image,items}).then(()=>{
      setIsShowDisplayFormModal(false)
      setIsComplete(true)
    })
  }
  //ADD Collection
  const collectionAImageMutation = useCollectionImageMutation(linLoginData, [ 'rendersData',currentUser,linLoginData, startDate, currModels]);
  //DEL Collection 
  const unCollectionAImageMutation = useDelACollectionImageMutation(linLoginData, [ 'rendersData',currentUser,linLoginData, startDate, currModels]);
  const handleCollection = (image,is_collection) =>{
    if(is_collection){
      unCollectionAImageMutation.mutateAsync({image})
    }else{
      collectionAImageMutation.mutateAsync({image})
    }
  }
  const unCollectionAImageMutation_C = useDelACollectionImageMutation(linLoginData, [ 'collectionData',currentUser,linLoginData, startDate, currModels]);
  const handleRemoveCollection = (image ,status)=>{
    unCollectionAImageMutation_C.mutateAsync({image,status})
  }



  const updateUserMutation = useUpdateUserMutation();
  const handleSetBanner = (id)=>{
    const items={
      profile_banner_id:id
    }
    // updateUserMutation.mutate({ items });
    updateUserMutation.mutate({currentProfile,linLoginData,items})
  }
  const handleSetAvatar = (id)=>{
    const items={
      profile_image_id:id
    }
    // useUpdateUserMutation);
    updateUserMutation.mutate({currentProfile,linLoginData,items})
  }
  const handleSetName = ()=>{
    const items={
      name:name
    }
    patchUserProfile(currentProfile.id,token,items)
      .then((data)=> {
        if(data.status === 200){
          setTimeout(()=>{
            fetchUserProfile(currentProfile.id, token)
              .then((data)=> {
                // console.log(data)
                setCurrentProfile(data)})
              .catch((error) => console.error(error));
          },1000)
        }
      })
      .catch((error) => console.error(error));
  }
  const handleSetUserProfile = (items)=>{

    patchUserProfile(currentProfile.id,token,items)
      .then((data)=> {
        if(data.status === 200){
          setTimeout(()=>{
            fetchUserProfile(currentProfile.id, token)
              .then((data)=> {
                // console.log(data)
                setCurrentProfile(data)
                setTimeout(()=>{setIsEdit(false)},500)
              })
              .catch((error) => console.error(error));
          },1000)
        }
      })
      .catch((error) => console.error(error));
  }
  // POST 

  /**
   * Storage API 
   * start 
   * 不需要 Storage 了
   * */ 
  const handleSetStorageImage = async(image,items,status,add_activities,remove_activities) =>{
    // console.log(image.is_storage,status)
    if(!image.is_storage){
      const newData = { ...image, is_storage: !image.is_storage  }; 
      try{
        await storageMutation.mutateAsync({newData});
      } catch (error){
        console.error('Storage mutation failed:', error);
        return;
      }
      try {
        await updateImageMutation.mutateAsync({ image, items, status });
      } catch (error) {
        console.error('Image update failed:', error);
      }
      if(add_activities.length > 0){
        // mapImageToCampaign(image.id,add_activities,status)
      }
      if(remove_activities.length>0){
        // mapImageToRemoveCampaign(image.id,remove_activities,status)
      }
    }else{
      
      await updateImageMutation.mutateAsync({ image, items, status });
      if(add_activities.length > 0){
        // mapImageToCampaign(image.id,add_activities,status)
      }
      if(remove_activities.length>0){
        // mapImageToRemoveCampaign(image.id,remove_activities,status)
      }
    }

  }

  //TODO 延遲執行避免出錯
  const mapImageToCampaign = async(imgid,data,status)=>{
    const delay = 1000; // 延遲時間，以毫秒為單位，這裡設定為1秒
    for (const [index, items] of data.entries()) {
      console.log(items)
      try {
        await postImgtoCampaignMutation.mutate({imgid, items, status});
      } catch (error) {
        console.error('Error mapping image to campaign:', error);
        // 處理錯誤，比如顯示一個錯誤訊息給使用者
      }

      if (index < data.length - 1) {
        // 不是最後一個項目，執行時間延遲
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
  const mapImageToRemoveCampaign = async(imgid,data,status)=>{
    const delay = 1000; // 延遲時間，以毫秒為單位，這裡設定為1秒
    for (const [index, items] of data.entries()) {
      console.log(items)
      try {
        await removeImgtoCampaignMutation.mutate({imgid, items, status});
      } catch (error) {
        console.error('Error mapping image to campaign:', error);
        // 處理錯誤，比如顯示一個錯誤訊息給使用者
      }

      if (index < data.length - 1) {
        // 不是最後一個項目，執行時間延遲
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }



  const handleDisplayHome = (id,items)=>{
    console.log(items)
    userPatchDisplayHome(id,token,items)
      .then((data)=>{
        console.log('display home update')
      })
      .catch((error) => console.error(error));
  }

  const handleUnfollow = (user)=>{
    userUnFollowAUser(user,token)
      .then(data=>{
        if( data.status === 204){
          setTimeout(()=>{
            setCurrentProfile({...currentProfile, total_follows
              : currentProfile.total_follows
              -1});
            fetchUserFollowings(currentProfile.id,token)
              .then((folloings)=> {
                  setFollows(folloings)
                  setFollowsResults(folloings)
              })
              .catch((error) => console.error(error));
          },1000)
        }
      })
  }
  const handleStorageUpdate = (id,newData)=>{
    setStoragesResults(prevData => {
      const index = prevData.findIndex(item => item.id === id);
      if (index === -1) {
        // 如果没有找到对应的元素，直接返回原来的状态
        return prevData;
      }
      const updatedData = [...prevData];
      updatedData[index] = {...updatedData[index], ...newData};
      return updatedData;
    });
  }


  const toggleDropdown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };
  const handleOptionChange = async (item) => {
    setCurrentPage(1)
    setPageSize(15)
    setOptionPage(item.title)
  };
  const handleSelectDate = (value,date)=>{
    setCurrentPage(1)
    setPageSize(15)
    setStartDate(date)
  }
  const handleSelectModels = (value)=>{
    console.log(value)
    setCurrentPage(1)
    setPageSize(15)
    setCurrModels(value)
  }
  const renderComponent =  () => {
    switch (currentDropDownItem.title) {
      case 'Renders':
        return <RenderPage title={currentDropDownItem.title} totalImage={currentUser?.total_photos}  imagesResults={renderImages} handleStorage={handleStorage} handleCollection={handleCollection}  currentPage={currentPage} totalPage={totalPage} handleRemoveStorage={handleRemoveStorage} fetchMoreImages={fetchRenderNextPage} handleSelectDate={handleSelectDate} handleSelectModels={handleSelectModels}  isAddStorageLoading={storageMutation.isLoading} isRemoveStorageLoading={unStorageMutation.isLoading} isFetchingNextPage={isFetchingNextPage} isBanned={currentUser?.is_banned}/>;
      case 'Post':
        return <StoragePage title={currentDropDownItem.title} totalImage={postImages.length} limitImage={currentUser?.is_subscribed ? '300' : '100'}  imagesResults={postImages} currentProfile={currentUser} handleStorage={handleStorage} handleRemoveStorage={handleRemoveStorage} handleCollection={handleCollection} handleSetBanner={handleSetBanner} handleSetAvatar={handleSetAvatar} handleDisplayHome={handleDisplayHome} handleStorageUpdate={handleStorageUpdate} fetchMoreStorageImages={fetchStorageNextPage} currentStoragePage={currentStoragePage} totalPage={totalPage} isStorageDataLoading={isStorageDataLoading} isFetchingNextPage={isFetchStorageNextPage} handleRemoveFromStorage={handleRemoveFromStorage} handleRemovePost={handleRemovePost} isBanned={currentUser?.is_banned} />;
      case 'Collections':
        return <CollectionPage title={currentDropDownItem.title} totalImage={collectionImages.length} imagesResults={collectionImages} fetchMoreImages={fetchCollectioNextPage} currentPage={currentPage} totalPage={totalPage}  handleRemoveCollection={handleRemoveCollection} isFetchingNextPage={isFetchCollectionNextPage} />;
      case 'Following':
        return <FollowPage title={currentDropDownItem.title} totalImage={followImages.length} follows={follows} followsResults={followImages} handleUnfollow={handleUnfollow}/>;
      default: return null;
    }
  }
  

  //CompletionMessage
  function CompletionMessage({title,isComplete}) {
    useEffect(() => {
      if (isComplete) {
        // 在3秒后自动隐藏消息
        const timeoutId = setTimeout(() => {
          setIsComplete(false)
        }, 3000);
  
        // 清除计时器，以避免内存泄漏
        return () => clearTimeout(timeoutId);
      }
    }, [isComplete]);
  
    return (
      <motion.div 
          initial={{ opacity: 0, y: -20,x:'-50%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        className=' fixed p-2 top-[30%] left-1/2 -translate-x-1/2  text-sm rounded-md bg-gray-900 text-white z-50 border border-white/30'>
        {title} 完成!
      </motion.div>
    );
  }


  if(isLoggedIn === false || !currentUser ){
    return <div className='text-white/70 text-xl    md:text-left md:text-3xl  mb-4  md:w-8/12 mx-auto'>

       <EmptyProfilePage />
    </div>
    
  }
  return (
    <div >
      <AnimatePresence>
 
        {isEdit && (<EditUserForm userData={currentUser} handleEdit={()=>setIsEdit(!isEdit)} handleSetUserProfile={handleSetUserProfile}/>
          )}
        {isShowModal && (<EditImageForm handleSetStorageImage={handleSetStorageImage}/>)}
        {isShowImageModal && (<ImageSingleModal/>)}
        {isShowBeforeDisplayModal && (<BeforeDisplayFormModal handleSetStorageImage={handleSetStorageImage} handlePostImage={handlePostImage} handlePatchPost={handlePatchPost} campaignsData={campaigns} isBanned={currentUser?.is_banned}/>)}
        {/* {currentUser?.finish_tutorial && <TutorialPage/> } */}

      </AnimatePresence>
      <ToastContainer />
      {isComplete && <CompletionMessage title="圖片分享" isComplete={isComplete} />}
      {/* <Header isLoggedIn={isLoggedIn} currentUser={currentProfile}/> */}

      <div className='lg:w-10/12 mx-auto lg:my-10'>

        <div className='px-6 py-5   min-h-20 text-white'>
          {
            isLoggedIn ?
            <div className='flex flex-col items-center gap-5'>
              <div 
                style={{backgroundImage:`url(${currentUser?.profile_banner})`}}
                className=' absolute top-0 left-0 -z-10  w-full h-[23vh] bg-cover bg-center bg-no-repeat brightness-75'>
                <div className='absolute -bottom-2 left-0 w-full h-32 z-10 bg-gradient-to-t from-[#1e1e1e]  '></div>

              </div>
              <div 
                className='w-[85px]  aspect-square rounded-full overflow-hidden bg-center bg-no-repeat bg-cover bg-black '
                style={{backgroundImage:currentUser  ?  `url(${currentUser.profile_image})` : 'none'}}
              ></div>

              <div className=' flex flex-col justify-center items-center gap-2'>
                <div className=' text-xl leading-4'>{currentUser && currentUser.name} </div>
                {currentUser?.point &&  <div className='flex items-center gap-2 '> <GiTwoCoins className='text-yellow-700' size={20} /> <span className='text-sm font-semibold'>{currentUser?.point } </span></div>}
                {currentUser && currentUser.is_banned && <div className='flex flex-col items-center'>
                  <Chip color="red" value="你已遭暫停使用網站功能。" />
                  <div className='text-xs mt-1'>很抱歉，因您違反  <a href="/docs" target='_blank' className='text-teal-200'>藝廊公約</a> 將暫停使用藝廊服務五日。如持續惡意違規，官方有權立即永久終止您使用本產品服務之授權。</div>
                </div>    }
                <div className='text-white flex gap-3 my-2 items-center'>
                {currentUser?.portfolio_url && <a href={currentUser?.portfolio_url} target="_blank" rel="noopener noreferrer" > <HiGlobeAlt /> </a> }
                {currentUser?.facebook_id && <a href={currentUser?.facebook_id} target="_blank" rel="noopener noreferrer" >    <FaFacebook /> </a> }
                {currentUser?.instagram_id && <a href={currentUser?.instagram_id} target="_blank" rel="noopener noreferrer" >  <FaInstagram  /></a> }
                {currentUser?.linkedin_id && <a href={currentUser?.linkedin_id} target="_blank" rel="noopener noreferrer" >    <FaLinkedinIn  /></a> }
                {currentUser?.twitter_id && <a href={currentProfile?.twitter_id} target="_blank" rel="noopener noreferrer" >      <FaTwitter /></a> }
                {currentUser?.discord_id && <a href={currentUser?.discord_id} target="_blank" rel="noopener noreferrer" >      <FaDiscord  /></a> }
                
               
                </div>
                <div className=' text-xs'>{currentUser && currentUser.bio}  </div>
              </div>              
            </div>
            :
            <div className=' font-bold text-xl '>用戶未登入</div>
          }

        </div>
        <div className='grid grid-cols-4 space-x-1 w-full px-2 '>
          {dropDownManuItem.map((item,index)=>{
          if(!item.display) return
          return(
            <div 
              key={item.title} 
              className={'text-xs text-white cursor-pointer pb-2 w-full flex flex-col justify-center items-center  text-center  '+ ( currentDropDownItem.title === item.title ? ' border-b ' : ' brightness-50'  )}
              onClick={()=>{
                setCurrentDropDownItem(item)
                handleOptionChange(item)
              }}
            >
              <div className='mb-1'>{switchIcons(item.title)}</div> 

              <div >{item.title} </div>
              
            </div>
          )
        })}
        </div>
        <div className='grid-cols-2 md:grid-cols-4  items-center gap-3 my-10 md:my-5 flex-wrap hidden lg:hidden'>
          {dropDownManuItem.map((item,index)=>{
            if(!item.display) return
            return(
              <div 
                key={item.title} 
                className='bg-gray-700 hover:bg-gray-500 text-white rounded-full py-2 px-4 cursor-pointer md:w-auto'
                onClick={()=>{
                  setCurrentDropDownItem(item)
                  handleOptionChange(item)
                }}
              >{item.title}</div>
            )
          })}
        </div>
        <div className=' relative p-4  w-2/3 mx-auto hidden lg:hidden'>
          <div 
            className='text-white rounded-full bg-[#444] px-3 py-2 flex justify-between items-center'
            onClick={toggleDropdown}
          >
            {currentDropDownItem.title} <MdKeyboardArrowDown />
          </div>
            <motion.div
              className={`fixed w-full h-screen top-0 left-0 bg-black/60 z-20 ${isDropDownOpen ? ' ' : ' hidden'}` }
              variants={dropdownVariants}
              initial="closed"
              animate={isDropDownOpen ? 'open' : 'closed'}
              onClick={toggleDropdown}
            ></motion.div>
            <motion.div 
              className={`text-white  absolute rounded-lg bg-[#444] my-2 w-2/3  border-white/20 z-30` }
              variants={dropdownVariants}
              initial="closed"
              animate={isDropDownOpen ? 'open' : 'closed'}
            
            >
              {dropDownManuItem.map((item,index)=>{
                if(!item.display) return
                return(
                  <div 
                    key={item.title} 
                    className='hover:bg-[#555] px-4 py-4 text-sm rounded-lg'
                    onClick={()=>{
                      setCurrentDropDownItem(item)
                      handleOptionChange(item)
                      toggleDropdown()
                    }}
                  >{item.title}</div>
                )
              })}
            </motion.div>
          


        </div>

        <div className='my-10 m-4'>
          {renderComponent()}
        </div> 
      </div>


    </div>
  )
}
export default Index