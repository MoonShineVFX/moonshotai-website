/**
 * export const UserStorageAImage = (image) =>{
  const requestOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  fetch('https://api.moonshot.today/images/'+image.id+'/storage', requestOptions)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    });
}
export const fetchUserImages = (uuid,token)=>{
  const requestOptions = {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  if(profile){
    fetch('https://api.moonshot.today/users/'+profile.userId+'/images' ,requestOptions)
    .then(res => res.json())
    .then(images => {

    });
  } else{

  }

}
export const fetchUserStorages = (userid,token) =>{
  const requestOptions = {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  if(userid){
    fetch('https://api.moonshot.today/users/'+userid+'/storages' ,requestOptions)
    .then(res => res.json())
    .then(images => {

    });
  } else{

  }
}
export const fetchUserCollections = (userid,token) =>{
  const requestOptions = {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  if(userid){
    fetch('https://api.moonshot.today/users/'+userid+'/collections' ,requestOptions)
    .then(res => res.json())
    .then(images => {

    });
  } else{

  }
}
**/