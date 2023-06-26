
import liff from '@line/liff';
import { loginState,isLoginState, userState, imageFormModalState,imageModalState,beforeDisplayModalState } from '../atoms/galleryAtom';
import {  useRecoilValue ,useRecoilState } from 'recoil';

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
      displayName:"WuWood_dev",
      pictureUrl: "https://profile.line-scdn.net/0hohWm3_nEMEd6FCWoI2NOOApEMy1ZZWlVBXIrcUlHOyJHcScTAiJ6KR1Bb3dFdiBEBHIvJxxBPnR2B0chZELMc30kbnBAJXAVX3R_qQ",
      statusMessage:"123",
      userId:"U895f7908fef7f32b717db91a8240ddc2"
    }
    setIsLogin(true)
    fetchLineLogin(profile)
      .then((data)=> {
        setToken(data.token)
        fetchUserProfile(data.user_id, data.token)
          .then((data)=> {
            console.log(data)
            setCurrentProfile(data)
          })
          .catch((error) => console.error(error));

      })
      .catch((error) => console.error(error));
  }

  return [devLogin,isLogin,token]

}
export const refreshToken = async () =>{
  const storedLineProfile = localStorage.getItem('lineProfile');
  const data = await fetchLineLogin(JSON.parse(storedLineProfile))
  return data
}
export const Logout = async ()=>{
  removeLocalStorageItem().then(data=>{
    console.log(data)
    if(data === 'finish'){
      return 'logoutuccess'
    }
  })
}
export const removeLocalStorageItem = async ()=>{
  localStorage.setItem('isLogin',false);
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
export const fetchUserFollowings =async (userid,token) =>{
  const requestOptions = {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  const response =await fetch(apiUrl+'users/'+userid+'/followings' ,requestOptions)
  const data =await response.json()
  return data
    

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
  return data
}
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
export const userDelAStorageImage = async (id,token)=>{
  const requestOptions = {
    method: 'DELETE',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  const response =await fetch(apiUrl+'images/'+id+'/storage', requestOptions)
  const data =await response
  return data
}
export const userDelACollectionImage = async (id,token)=>{
  const requestOptions = {
    method: 'DELETE',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  const response =await fetch(apiUrl+'images/'+id+'/collection', requestOptions)
  const data =await response
  return data
}
export const fetchUserImages =async (uuid,page,pageSize,token)=>{
  const requestOptions = {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  if(uuid){
    const response =await fetch(apiUrl+'users/'+uuid+'/images?'+'page='+page+'&page_size='+pageSize ,requestOptions)
    const data =await response.json()
    return data
    
  } else{

  }

}
export const fetchUserPublicImages =async (uuid,page,pageSize)=>{
  const requestOptions = {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json'
    }
  };
  if(uuid){
    const response =await fetch(apiUrl+'users/'+uuid+'/images?'+'page='+page+'&page_size='+pageSize ,requestOptions)
    const data =await response.json()
    return data
    
  } else{

  }

}
export const fetchUserStorages =async (userid,page,pageSize,token) =>{
  const requestOptions = {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  const response =await fetch(apiUrl+'users/'+userid+'/storages?'+'page='+page+'&page_size='+pageSize ,requestOptions)
  const data =await response.json()
  return data
    

}
export const fetchUserCollections = async (userid,token) =>{
  const requestOptions = {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };

  const response = await fetch(apiUrl+'users/'+userid+'/collections' ,requestOptions)
  const data = await response.json()
  return data

}

export const getWordFromLetter=(letter)=>{
  switch (letter.toLowerCase()) {
    case 'sd':
      return 'PR';
    case 'mj':
      return 'CT';
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
  const data = await response.json()
  return data
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

/**
 * 
 * Images API
 */
//修改保留區圖片資料 (需攜帶JWT 作者本人才能存取)
export const userPatchAStorageImage = async(imgid,token,items)=>{
  const requestOptions = {
    method: 'PATCH',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(items)
  };
  const response = await fetch(apiUrl+'storage_images/'+imgid, requestOptions)
  const data = await response
  return data
}
//修改保留區圖片是否顯示於藝廊 (需攜帶JWT 作者本人才能存取)
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
export const fetchGalleries = async (headers,page,pageSize) =>{
  console.log(headers)
  const requestOptions = {
    method: 'GET',
    headers:headers
  };

  const response = await fetch(apiUrl+'galleries?'+'page='+page+'&page_size='+pageSize ,requestOptions)
  const data = await response.json()
  return data

}

export const fetchGalleriesDetail = async (headers,id) => {
  const requestOptions = {
    method: 'GET',
    headers:headers
  };
  const response = await fetch(apiUrl+'galleries/'+id ,requestOptions)
  const data = await response.json()
  return data
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
  console.log(msgData)
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
  const data =await response
  return data
}
