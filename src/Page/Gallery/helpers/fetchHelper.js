
import liff from '@line/liff';
const liffID = process.env.REACT_APP_LIFF_LOGIN_ID
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
  const response = await fetch('https://api.moonshot.today/line_login', requestOptions)
  const data = await response.json()
  return data


}
export const UserStorageAImage =async (image,token) =>{
  const requestOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  const response =await fetch('https://api.moonshot.today/images/'+image.id+'/storage', requestOptions)
  const data =await response.json()
  return data
}
export const fetchUserImages =async (uuid,token)=>{
  const requestOptions = {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  if(uuid){
    const response =await fetch('https://api.moonshot.today/users/'+uuid+'/images' ,requestOptions)
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
  if(userid){
    const response =await fetch('https://api.moonshot.today/users/'+userid+'/storages' ,requestOptions)
    const data =await response.json()
    return data
    
  } else{

  }
}
export const fetchUserCollections = async (userid,token) =>{
  const requestOptions = {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  if(userid){
    const response = await fetch('https://api.moonshot.today/users/'+userid+'/collections' ,requestOptions)
    const data = await response.json()
    return data
  } else{

  }
}
