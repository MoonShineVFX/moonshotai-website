
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
export const userStorageAImage =async (image,token) =>{
  const requestOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  const response =await fetch(apiUrl+'images/'+image.id+'/storage', requestOptions)
  const data =await response.status
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
export const delUserStorageImage = async (id,token)=>{
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
export const fetchUserStorages =async (userid,token) =>{
  const requestOptions = {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  const response =await fetch(apiUrl+'users/'+userid+'/storages' ,requestOptions)
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
export const fetchGalleries = async (token) =>{
  const requestOptions = {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
    }
  };

  const response = await fetch(apiUrl+'/galleries' ,requestOptions)
  const data = await response.json()
  return data

}