
import liff from '@line/liff';
const liffID = process.env.REACT_APP_LIFF_LOGIN_ID
const apiUrl = process.env.REACT_APP_MOONSHOT_API_URL
export const initializeLineLogin = async()=>{} 

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
  const response =await fetch(apiUrl+'images/'+image.id+'/collections', requestOptions)
  const data =await response.status
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
  const data =await response.status
  return data
}
export const fetchUserImages =async (uuid,page,pageSize)=>{
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