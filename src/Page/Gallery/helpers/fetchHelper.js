
import React, { useState }  from 'react'
import liff from '@line/liff';
import {   useRecoilState } from 'recoil';
import { useInfiniteQuery,useMutation,useQueryClient,useQuery } from 'react-query';
import {userState,isLoginState,lineProfileState,loginState} from '../atoms/galleryAtom'
const liffID = process.env.REACT_APP_LIFF_LOGIN_ID
const apiUrl = process.env.REACT_APP_MOONSHOT_API_URL

/**
 * Login
 */
//liff login api
export const initializeLineLogin = async ()=>{
  liff.init({liffId: liffID})
    .then(function(){
      if(liff.isLoggedIn()){
        const accessToken = liff.getAccessToken();
        if(accessToken){
          const profile = liff.getProfile()
          localStorage.setItem('lineProfile',profile);
          return profile
        }
      }
    })
} 
export const useDevUserLogin = () =>{
  const [token, setToken] = useRecoilState(loginState)
  const [isLogin, setIsLogin] = useRecoilState(isLoginState)
  const [currentProfile, setCurrentProfile] = useRecoilState(userState);
  
  const devLogin = ()=>{
    const profile ={
      displayName:  process.env.REACT_APP_NAME,
      pictureUrl: process.env.REACT_APP_TEST_URL,
      statusMessage:"123",
      userId:process.env.REACT_APP_TEST_UID
    }
    setIsLogin(true)
    fetchLineLogin(profile)
      .then((data)=> {
        setToken(data.token)
        fetchUserProfile(data.user_id, data.token)
          .then((data)=> {
            // console.log(data)
            setCurrentProfile(data)
          })
          .catch((error) => console.error(error));

      })
      .catch((error) => console.error(error));
  }

  return [devLogin,isLogin,token]

}
export const handleLogin = async()=>{
  try {
    await liff.init({ liffId: liffID });
    console.log(liff.isLoggedIn())
    if (liff.isLoggedIn()) {
      const accessToken = liff.getAccessToken();
      localStorage.setItem('isLogin', true);
      if (accessToken) {
        console.log('ＯＫ可以做站內登入')
        const profile = await liff.getProfile();
        localStorage.setItem('lineProfile', JSON.stringify(profile));
        const lined = await fetchLineLogin(profile);
        localStorage.setItem('loginTokenData', JSON.stringify(lined));
        const udata = await fetchUserProfile(lined.user_id, lined.token);
        localStorage.setItem('currentUser', JSON.stringify(udata));
      } else {
        // 用戶未取得 accessToken，可能需要進行其他處理
      }
    } else {
      // 用戶未登入，可以進行其他處理，例如顯示登入按鈕
      console.log('用戶 未line 登入');
      liff.login();
    }
  } catch (error) {
    console.error('Error handling user login: ', error);
  }
}
export const refreshToken = async () =>{
  const storedLineProfile = localStorage.getItem('lineProfile');
  // console.log('refreshToken', storedLineProfile)
  const data = await fetchLineLogin(JSON.parse(storedLineProfile))
  return data
}
export const Logout = async ()=>{
  removeLocalStorageItem().then(data=>{
    // console.log(data)
    if(data === 'finish'){
      return 'logoutuccess'
    }
  })
}
export const removeLocalStorageItem = async ()=>{
  localStorage.removeItem('isLogin');
  localStorage.removeItem('loginTokenData');
  localStorage.removeItem('lineProfile');
  localStorage.removeItem('currentUser');

  return 'finish'
}
export const checkUserLiffLoginStatus = async () => {
  // localStorage.setItem('isLoggedIn', 'true');
  await liff.init({liffId: liffID})
  try {
    const isLoggedIn = await liff.isLoggedIn();
    if (isLoggedIn) {
      // 用户已登录
      return('User is logged in.');
    } else {
      // 用户未登录
      return('User is not logged in.');
    }
  } catch (error) {
    return('Failed to check user login status: ');
  }
};
export const getStoredLocalData = async ()=>{
  const storedIsLogin = localStorage.getItem('isLogin');
  const storedLoginTokenData = localStorage.getItem('loginTokenData');
  const storedLineProfile = localStorage.getItem('lineProfile');
  const storedCurrentUser = localStorage.getItem('currentUser');

  return{
    isLogin: JSON.parse(storedIsLogin),
    loginToken: JSON.parse(storedLoginTokenData)?.token,
    loginUserId: JSON.parse(storedLoginTokenData)?.user_id,
    lineProfile: JSON.parse(storedLineProfile),
    currentUser: JSON.parse(storedCurrentUser)
  }
}

export const fetchLineLogin = async (profile) =>{
  const requestOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Token ${process.env.REACT_APP_MOONSHOT_LINELOGIN_APIKEY}`
    },
    body: JSON.stringify({ 
      uid:  profile.userId,
      name: profile.displayName,
      profile_image: profile.pictureUrl
    })
  };
  const response = await fetch(apiUrl+'line_login', requestOptions)
  const data = await response.json()
  return data
}
export const fetchUserFollowings =async (userid,token,cursor) =>{
  let newCursor = cursor === undefined ? '' : cursor
  const requestOptions = {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  const response =await fetch(apiUrl+'users/'+userid+'/followings?cursor='+ newCursor ,requestOptions)
  let status = response.status
  let data 
  if(status === 401){
    return 401
  }else{
    data = await response.json()
    return data
  }

}
export const fetchUserFollowers =async (userid,token) =>{
  const requestOptions = {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  const response =await fetch(apiUrl+'users/'+userid+'/followers' ,requestOptions)
  const data =await response.json()
  return data
    

}
export const userFollowAUser =async (user,token) =>{
  const requestOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  const response =await fetch(apiUrl+'users/'+user.id+'/follow', requestOptions)
  const data =await response
  return data
}
export const userUnFollowAUser =async (user,token) =>{
  const requestOptions = {
    method: 'DELETE',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  const response =await fetch(apiUrl+'users/'+user.id+'/follow', requestOptions)
  const data =await response
  return data
}
export const userStorageAImage =async (image,token) =>{
  const requestOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  const response =await fetch(apiUrl+'images/'+image.id+'/storage', requestOptions)
  const data =await response
  // console.log(response.json())
  return data
}
//USER POST-post 
export const userPostAImage =async (image,items,token) =>{
  const requestOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(items)
    
  };
  const response =await fetch(apiUrl+'images/'+image.id+'/post', requestOptions)
  const data =await response
  return data
}
//use USER POST 
export function usePostImageMutation(linLoginData,fnKey) {
  const queryClient = useQueryClient();
  const [isPostComplete, setIsPostComplete] = useState(false);
  const postImageMutation = useMutation((updatedData) =>
  userPostAImage(updatedData.image,updatedData.items, linLoginData),
    {
      onSuccess: (data, variables) => {
        queryClient.setQueryData(fnKey, (prevData) => {
          const newData = prevData.pages.map((page) => ({
            ...page,
            results: page.results.map((image) =>
              image.id === variables.image.id
                ? { ...image,...variables.items }
                : image
            ),
          }));
          return { pages: newData };
        });

        setIsPostComplete(true);
      },
    }
  );

  return postImageMutation;
}
//USER DEL-post 
export const userDelAPostImage = async (image,token)=>{
  const requestOptions = {
    method: 'DELETE',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  const response =await fetch(apiUrl+'posts/'+image.id, requestOptions)
  const data =await response
  return data
}
//use USER POST DEL
export function useDelPostImageMutation(linLoginData,fnKey) {
  const queryClient = useQueryClient();
  const [isPostComplete, setIsPostComplete] = useState(false);
  const postImageMutation = useMutation((updatedData) =>
  userDelAPostImage(updatedData.image, linLoginData),
    {
      onSuccess: (data, variables) => {
        queryClient.setQueryData(fnKey, (prevData) => {
          const newData = prevData.pages.map((page) => ({
            ...page,
            results: page.results.filter((image) => image.id !== variables.image.id),
          }));
          return { pages: newData };
        });
      },
    }
  );

  return postImageMutation;
}

//PATCH post image
export const userPatchAPostImage = async(img,items,token)=>{
  const requestOptions = {
    method: 'PATCH',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(items)
  };
  const response = await fetch(apiUrl+'posts/'+img.id, requestOptions)
  const data = await response
  return data
}
//use PATCH USER POST img
export function usePatchPostImageMutation(linLoginData,fnKey) {
  const queryClient = useQueryClient();
  const postImageMutation = useMutation((updatedData) =>
  userPatchAPostImage(updatedData.image,updatedData.items, linLoginData),
    {
      onSuccess: (data, variables) => {
        queryClient.setQueryData(fnKey, (prevData) => {
          const newData = prevData.pages.map((page) => ({
            ...page,
            results: page.results.map((image) =>
              image.id === variables.image.id
                ? { ...image,...variables.items }
                : image
            ),
          }));
          return { pages: newData };
        });

      },
    }
  );

  return postImageMutation;
}

//Like a image
export const userLikeAImage =async (image,token) =>{
  const requestOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  const response =await fetch(apiUrl+'images/'+image.id+'/like', requestOptions)
  const data =await response
  return data
}
//use Like a image
export function useLikeImageMutation(linLoginData, fnKey) {
  const queryClient = useQueryClient();

  const likeImageMutation = useMutation((updatedData) =>
    userLikeAImage(updatedData.image, linLoginData),
    {
      onSuccess: (data, variables) => {
        queryClient.setQueryData(fnKey, (prevData) => {
          console.log(prevData)
          const newData = prevData.pages.map((page) => ({
            ...page,
            results: page.results.map((image) =>
              image.id === variables.image.id
                ? { ...image, is_like: true,likes: (parseInt(image.likes) + 1).toString() }
                : image
            ),
          }));
          return { pages: newData };
        });
      },
    }
  );

  return likeImageMutation;
}
//DEL Like a image
export const userDelALikedImage = async (image,token)=>{
  const requestOptions = {
    method: 'DELETE',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  const response =await fetch(apiUrl+'images/'+image.id+'/like', requestOptions)
  const data =await response
  return data
}
//use DEL Like a image
export function useDelLikedImageMutation(linLoginData, fnKey) {
  const queryClient = useQueryClient();

  const unlikeImageMutation = useMutation((updatedData) =>
  userDelALikedImage(updatedData.image, linLoginData),
    {
      onSuccess: (data, variables) => {
        queryClient.setQueryData(fnKey, (prevData) => {
          const newData = prevData.pages.map((page) => ({
            ...page,
            results: page.results.map((image) =>
              image.id === variables.image.id
                ? { ...image, is_like: false,likes: (parseInt(image.likes) - 1).toString() }
                : image
            ),
          }));
          return { pages: newData };
        });
      },
    }
  );

  return unlikeImageMutation;
}

//ADD Collection
export const userCollectionAImage =async (image,token) =>{
  const requestOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  const response =await fetch(apiUrl+'images/'+image.id+'/collection', requestOptions)
  const data =await response
  return data
}
//use ADD Collection
export function useCollectionImageMutation(linLoginData, fnKey) {
  const queryClient = useQueryClient();
  const collectionImageMutation = useMutation((updatedData) =>
    userCollectionAImage(updatedData.image, linLoginData),
    {
      onSuccess: (data, variables) => {
        queryClient.setQueryData(fnKey, (prevData) => {
          const newData = prevData.pages.map((page) => ({
            ...page,
            results: page.results.map((image) =>
              image.id === variables.image.id
                ? { ...image, is_collection: true }
                : image
            ),
          }));
          return { pages: newData };
        });
      },
    }
  );

  return collectionImageMutation;
}
//DEL Collection
export const userDelACollectionImage = async (image,token)=>{
  const requestOptions = {
    method: 'DELETE',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  const response =await fetch(apiUrl+'images/'+image.id+'/collection', requestOptions)
  const data =await response
  return data
}
//use DEL Collection
export function useDelACollectionImageMutation(linLoginData, fnKey) {
  const queryClient = useQueryClient();

  const uncollectionImageMutation = useMutation((updatedData) =>
  userDelACollectionImage(updatedData.image, linLoginData),
    {
      onSuccess: (data, variables) => {
        if(variables.status === 'collectionPage'){
          queryClient.setQueryData(fnKey, (prevData) => {
            const newData = prevData.pages.map((page) => ({
              ...page,
              results: page.results.filter((image) => image.id !== variables.image.id),
            }));
            return { pages: newData };
          });
        } else{
          queryClient.setQueryData(fnKey, (prevData) => {
            const newData = prevData.pages.map((page) => ({
              ...page,
              results: page.results.map((image) =>
                image.id === variables.image.id
                  ? { ...image, is_collection: false }
                  : image
              ),
            }));
            return { pages: newData };
          });
        }

      },
    }
  );

  return uncollectionImageMutation;
}
export const userDelAStorageImage = async (image,token)=>{
  const requestOptions = {
    method: 'DELETE',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  const response =await fetch(apiUrl+'images/'+image.id+'/storage', requestOptions)
  const data =await response
  return data
}

export const fetchUserImages =async (userid,token,cursor,pageSize,startDate,endDate,currModels)=>{
  let newCursor = cursor === undefined ? '' : cursor
  const requestOptions = {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  
  const response =await fetch(apiUrl+'users/'+userid+'/images?'+'cursor='+newCursor+'&page_size='+pageSize+'&start_date='+startDate+'&end_date='+endDate+'&model='+currModels ,requestOptions)
  let status = response.status
  let data 
  if(status === 401){
    return 401
  }else{
    data = await response.json()
    return data
  }
  

}
// users/<int:id>/posts 看post的公開圖
export const fetchUserPublicImages =async (token,uid,cursor,pageSize)=>{
  let newCursor = cursor === undefined ? '' : cursor

  const requestOptions = {
    method: 'GET',
    headers: token ? { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } : { 'Content-Type': 'application/json'}
  };
  if(uid){
    const response =await fetch(apiUrl+'users/'+uid+'/posts?'+'cursor='+newCursor+'&page_size='+pageSize ,requestOptions)
    const data =await response.json()
    return data
    
  } else{

  }

}
//use function :  users/<int:id>/posts 
export function useUserPublicImages(linLoginToken,id, pageSize,isInitialized,isLoggedIn) {
  return useInfiniteQuery(
    ['publicImages', id, pageSize],
    ({ pageParam }) =>
    fetchUserPublicImages(linLoginToken,id, pageParam, pageSize),
    {
      enabled: isInitialized && (!!id || isLoggedIn !== null),
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.next) {
          const url = new URL(lastPage.next);
          const nextPage = url.searchParams.get("cursor");
          return nextPage ? nextPage : undefined;
        }
        return undefined;
      }
    }
  );
}

export const fetchUserStorages =async (userid,token,cursor,pageSize,) =>{
  let newCursor = cursor === undefined ? '' : cursor
  const requestOptions = {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  const response =await fetch(apiUrl+'users/'+userid+'/storages?'+'cursor='+newCursor+'&page_size='+pageSize ,requestOptions)
  const data =await response.json()
  return data
    

}
export const fetchUserCollections = async (userid,token,cursor) =>{
  let newCursor = cursor === undefined ? '' : cursor
  const requestOptions = {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };

  const response = await fetch(apiUrl+'users/'+userid+'/collections?cursor='+newCursor ,requestOptions)
  const data = await response.json()
  return data

}

export const getWordFromLetter=(letter)=>{
  switch (letter.toLowerCase()) {
    case 'sd':
      return 'PR';
    case 'mj':
      return 'MJ';
    case 'nv':
      return 'CM';
    case 'av':
      return 'PC';
    default:
      return letter.toUpperCase();
  }
}
export const fetchUsersList = ()=>{

}

export const fetchUser = async (userid) =>{
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json'}
  };

  const response = await fetch(apiUrl+'users/'+userid ,requestOptions)
  const data = await response.json()
  return data
}

export const fetchUserProfile = async (userid,token) =>{
  const requestOptions = {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };

  const response = await fetch(apiUrl+'user_profile/'+userid ,requestOptions)
  let data 
  let status =  response.status
  if(status === 401){
    return 401
  }else{
    data = await response.json()
    return data
  }
  
}
//ReactQuery
export const fetchUserProfileData = async (userId, token, queryClient) => {
  return await queryClient.fetchQuery(['userProfile', userId, token], () =>
    fetchUserProfile(userId, token)
  );
};
// use 
export function useFetchUserProfile(userId, token,isInitialized,isLoggedIn){
  return useQuery(
    ['userProfile', userId, token],
    ({pageParam})=>
    fetchUserProfile(userId,token),
    {
      enabled: isInitialized && (token !== null || isLoggedIn !== null),
      onSuccess:async(data, variables) => { 
        // to local
        console.log(data)

      }
    }
  )
}

export const patchUserProfile = async (userid,token,items) =>{
  const requestOptions = {
    method: 'PATCH',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(items)
  };
  const response = await fetch(apiUrl+'user_profile/'+userid, requestOptions)
  const data = await response
  return data
}
export const useUpdateUserMutation = () => {
  const [currentUser, setCurrentUser] = useRecoilState(userState)
  const queryClient = useQueryClient();
  const updateUserMutation = useMutation((updatedData) =>{ 
    patchUserProfile(updatedData.currentProfile.id,updatedData.linLoginData,updatedData.items)}, 
   {
      onSuccess: async(data, variables) => { 
        // const udata =  await fetchUserProfileData(variables.currentProfile.id, variables.linLoginData, queryClient);
        // setCurrentUser(udata);
        // console.log(variables)
        queryClient.setQueryData(['userProfile',variables.currentProfile.id, variables.linLoginData], (prevData) => {
          console.log(prevData)
          const newData = prevData.pages.map((page) => ({
            ...page,
            results: page.results.map((image) =>
            image.id === variables.image.id ? { ...image,...variables.items} : image
            ),
          }));
          return { pages: newData };
        });

        await queryClient.invalidateQueries(['userProfile', variables.currentProfile.id, variables.linLoginData]);
      },  
    })
  return updateUserMutation;
}




export const patchUserEmail = async (userid,token,items) =>{
  const requestOptions = {
    method: 'PATCH',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(items)
  };
  const response = await fetch(apiUrl+'user_profile/'+userid, requestOptions)
  const data = await response
  return data
}
/**
 * 
 * Images API
 */
//修改保留區圖片資料 (需攜帶JWT 作者本人才能存取)
export const userPatchAStorageImage = async(img,token,items)=>{
  const requestOptions = {
    method: 'PATCH',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(items)
  };
  const response = await fetch(apiUrl+'storage_images/'+img.id, requestOptions)
  const data = await response
  return data
}

//修改保留區圖片是否顯示於藝廊 (需攜帶JWT 作者本人才能存取) 已棄用
export const userPatchDisplayHome = async(imgid,token,items)=>{
  const requestOptions = {
    method: 'PATCH',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(items)
  };
  const response = await fetch(apiUrl+'storage_images/'+imgid+'/display_home', requestOptions)
  const data = await response.json
  return data
}

/**
 * 
 * Galleries API
 */
export const fetchGalleries = async (token,cursor,pageSize,startDate,endDate,currModels) =>{
  let newCursor = cursor === undefined ? '' : cursor
  const requestOptions = {
    method: 'GET',
    headers: token ? { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } : { 'Content-Type': 'application/json'}
  };

  const response = await fetch(apiUrl+'galleries?'+'cursor='+newCursor+'&page_size='+pageSize+'&start_date='+startDate+'&end_date='+endDate+'&model='+currModels ,requestOptions)
  let status = response.status
  let data 
  if(status === 401){
    return 401
  }else{
    data = await response.json()
    return data
  }

}

//use function
export function useGalleries(linLoginData, pageSize,startDate,endDate, currModels,isInitialized,isLoggedIn) {
  return useInfiniteQuery(
    ['galleries', linLoginData, startDate, currModels],
    ({ pageParam }) =>
      fetchGalleries(linLoginData, pageParam, pageSize, startDate, endDate, currModels),
    {
      enabled: isInitialized && (linLoginData !== null || isLoggedIn !== null),
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.next) {
          const url = new URL(lastPage.next);
          const nextPage = url.searchParams.get("cursor");
          return nextPage ? nextPage : undefined;
        }
        return undefined;
      }
    }
  );
}


export const fetchGalleriesDetail = async (token,id) => {
  const requestOptions = {
    method: 'GET',
    headers: token ? { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } : { 'Content-Type': 'application/json'}
  };
  const response = await fetch(apiUrl+'galleries/'+id ,requestOptions)
  let status = response.status
  let data 
  if(status === 401){
    return 401
  }else{
    data = await response.json()
    return data
  }
}
/**
 * copy prompt galleries/<int:id>/prompt_copy
 */
export const fetchImageCopyPromptTime =async (imgdata,token) =>{
  const requestOptions = {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  const response =await fetch(apiUrl+'galleries/'+imgdata.id+'/prompt_copy', requestOptions)
  const data =await response
  return data
}
export const userClickCopyPrompt =async (imgdata,token) =>{
  const requestOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  const response =await fetch(apiUrl+'galleries/'+imgdata.id+'/prompt_copy', requestOptions)
  const data =await response
  return data
}

/**
 * Comment API
 * **/ 
export const fetchComments = async (image)=>{
  const requestOptions = {
    method: 'GET',
    headers:{ 'Content-Type': 'application/json'}
  };
  const response = await fetch(apiUrl+'/images/'+image.id+'/comments' ,requestOptions)
  const data = await response.json()
  return data
}
export const userPostCommentToImage = async (image,msgData,token)=>{
  const requestOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ 
      text:  msgData,
    })
  };
  const response = await fetch(apiUrl+'/images/'+image.id+'/comments' ,requestOptions)
  const data = await response.json()
  return data
}
export const userPatchCommentToImage = async (commentId,msgData,token)=>{
  // console.log(msgData)
  const requestOptions = {
    method: 'PATCH',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ 
      text:  msgData,
    })
  };
  const response = await fetch(apiUrl+'/comments/'+commentId ,requestOptions)
  const data = await response.json()
  return data
}
export const userDelCommentToImage = async (commentId,token)=>{
  const requestOptions = {
    method: 'DELETE',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  const response = await fetch(apiUrl+'/comments/'+commentId ,requestOptions)
  const data = await response.json()
  return data
}


// line pay test
export const testLinePay =async (token) =>{
  const requestOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  const response =await fetch(apiUrl+'request_payment', requestOptions)
  const data =await response.json()
  return data
}
//get plans
export const getPlans =async (token) =>{
  const requestOptions = {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
    }
  };
  const response =await fetch(apiUrl+'plans ', requestOptions)
  const data =await response.json()
  return data
}
//get subscriptions
export const getSubscriptions =async (token) =>{
  const requestOptions = {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  const response =await fetch(apiUrl+'subscriptions ', requestOptions)
  const data =await response.json()
  return data
}
//get order
export const getOrders =async (token) =>{
  const requestOptions = {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  const response =await fetch(apiUrl+'orders ', requestOptions)
  const data =await response.json()
  return data
}
//post order
export const postOrder =async (pid,token) =>{
  const requestOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ 
      plan_id:  pid,
    })
  };
  const response =await fetch(apiUrl+'orders ', requestOptions)
  const data =await response.json()
  return data
}

//linepay
export const paymentLinePay =async (serNum,token) =>{
  const requestOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ 
      serial_number:  serNum,
    })
  };
  const response =await fetch(apiUrl+'request_linepay_payment', requestOptions)
  const data =await response.json()
  return data
}

//newebpay
export const paymentNewebPay =async (serNum,token) =>{
  const requestOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ 
      serial_number:  serNum,
    })
  };
  const response =await fetch(apiUrl+'request_newebpay_payment', requestOptions)
  const data =await response.json()
  return data
}

//邀請碼
export const paymentInviteSerial =async (inviteSerial,token) =>{
  const requestOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ 
      invitation_code:  inviteSerial,
    })
  };
  const response =await fetch(apiUrl+'invitations', requestOptions)
  console.log(response)
  let data 
  if(response.status === 500){
    data = await response
  }else{
    data = await response.json()
    
  }
 
  return data
  
}

//退費
export const postOrder_refund =async (serNum,token) =>{
  const requestOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ 
      serial_number:  serNum,
    })
  };
  const response =await fetch(apiUrl+'order_refund', requestOptions)
  const data =await response.json()
  return data
}

// 退費問券 POST /refund_surveys
export const postRefund_surveys =async (items,token) =>{
  const requestOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(items)
  };
  const response =await fetch(apiUrl+'refund_surveys', requestOptions)
  const data =await response.json()
  return data
}

//gifts
export const fetchUserGifts =async (token,cursor) =>{
  let newCursor = cursor === undefined ? '' : cursor
  const requestOptions = {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  const response =await fetch(apiUrl+'my_gifts' ,requestOptions)
  const data =await response.json()
  return data
    
}

//open gift
export const postOpenGiftMutation = (mutaionData) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${mutaionData.linLoginData}`,
    },
    body: JSON.stringify({
      gift_record_id: mutaionData.gift_id,
    }),
  };

  return fetch(apiUrl + 'open_gift', requestOptions).then((response) => response.json());
};



// GET /campaigns 取得活動列表
export const fetchCampaigns =async (cursor) =>{
  let newCursor = cursor === undefined ? '' : cursor

  const requestOptions = {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
    }
  };
  const response =await fetch(apiUrl+'campaigns' ,requestOptions)
  const data =await response.json()
  return data
    
}

// 圖片id 取得圖片參加活動紀錄(image_campaign)列表
export const getImgInCampaign= (image,token) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  };

  return fetch(apiUrl +'storage_images/'+image.id +'/campaigns', requestOptions).then((response) => response.json());
};
// POST storage_images/<int:id>/campaigns 幫圖片加活動
export const postImgtoCampaign= (imgid,items,token) => {
  console.log(items)
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      campaign_id: items.campaign_id,
      link:items.link
    }),
  };

  return fetch(apiUrl +'storage_images/'+imgid +'/campaigns', requestOptions).then((response) => response.json());
};
export const removeImgtoCampaign= (imgid,items,token) => {
  console.log(items)
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  };

  return fetch(apiUrl +'image_campaigns/'+items.id, requestOptions).then((response) => response.status);
};

// GET /campaigns 取得活動所屬圖片列表
export const fetchCampaignImages =async (campaign_id,page_size) =>{
  console.log(page_size)

  const requestOptions = {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
    }
  };
  const response =await fetch(apiUrl+'campaigns/'+campaign_id+'/images?page_size='+page_size ,requestOptions)
  const data =await response.json()
  return data
    
}


// top_liked_users
export const fetchTopLikedUser =async () =>{

  const requestOptions = {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
    }
  };
  const response =await fetch(apiUrl+'top_liked_users' ,requestOptions)
  const data =await response.json()
  return data
}

// top_render_users
export const fetchTopRenderdUser =async () =>{

  const requestOptions = {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
    }
  };
  const response =await fetch(apiUrl+'top_render_users' ,requestOptions)
  const data =await response.json()
  return data
}

// top_render_users
export const fetchTopRanking =async () =>{

  const requestOptions = {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
    }
  };
  const response =await fetch(apiUrl+'top_ranking' ,requestOptions)
  const data =await response.json()
  return data
}

// points system
// prompt points system
// USER POST-  prompt_buy
export const userPromptBuyAImage =async (image,token) =>{
  const requestOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    
  };
  const response =await fetch(apiUrl+'galleries/'+image.id+'/prompt_buy', requestOptions)
  if (!response.ok) {
    const errorData = await response.json();
    console.log(errorData)
    throw new Error(errorData.message);
  }
  const data =await response
  return data
}
//use USER POST prompt_buy
export function usePromptBuyMutation(linLoginData,fnKey) {
  const queryClient = useQueryClient();
  const imageMutation = useMutation((updatedData) =>
  userPromptBuyAImage(updatedData.imageData, linLoginData),
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(fnKey);

      },
    }
  );

  return imageMutation;
}

// users/<int:id>/bought_prompts
export const fetchUserOwnPrompts =async (token,uid,cursor,pageSize)=>{
  let newCursor = cursor === undefined ? '' : cursor

  const requestOptions = {
    method: 'GET',
    headers: token ? { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } : { 'Content-Type': 'application/json'}
  };
  if(uid){
    const response =await fetch(apiUrl+'users/'+uid+'/bought_prompts?'+'cursor='+newCursor+'&page_size='+pageSize ,requestOptions)
    const data =await response.json()
    return data
    
  } else{

  }

}
//use function :  users/<int:id>/posts 
export function useUserOwnPrompts(linLoginToken,id, pageSize,isInitialized,isLoggedIn) {
  return useInfiniteQuery(
    ['ownPrompts', id, pageSize],
    ({ pageParam }) =>
    fetchUserOwnPrompts(linLoginToken,id, pageParam, pageSize),
    {
      enabled: isInitialized && (!!id || isLoggedIn !== null),
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.next) {
          const url = new URL(lastPage.next);
          const nextPage = url.searchParams.get("cursor");
          return nextPage ? nextPage : undefined;
        }
        return undefined;
      }
    }
  );
}


// point products
export const fetchPointProducts =async (token) =>{
  const requestOptions = {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  const response =await fetch(apiUrl+'point_products ', requestOptions)
  const data =await response.json()
  return data
}
//use function : point products
export function usePointProducts(linLoginData,isInitialized,isLoggedIn) {
  return useQuery(
    'pointProducts',
    ({ pageParam }) =>
    fetchPointProducts(linLoginData,pageParam),
    {
      enabled: isInitialized && (linLoginData !== null || isLoggedIn !== null),
    }

  );
}

//User BUY(userRedeemPointProduct) Point product 購買點數商品
export const userRedeemPointProduct =async (product,token) =>{
  const requestOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    
  };
  const response =await fetch(apiUrl+'point_products/'+product.id+'/purchase', requestOptions)
  if (!response.ok) {
    const errorData = await response.json();
    console.log(errorData)
    throw new Error(errorData.message);
  }
  const data =await response
  return data
}
//use USER BUY(userRedeemPointProduct) Point product
export function useRedeemProduct(linLoginData,fnKey) {
  const queryClient = useQueryClient();
  const imageMutation = useMutation((updatedData) =>
  userRedeemPointProduct(updatedData.selectedProduct, linLoginData),
    {
      onSuccess: (data, variables) => {
      
      },
    }
  );

  return imageMutation;
}



