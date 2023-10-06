
import { useInfiniteQuery,useMutation,useQueryClient } from 'react-query';
const adminApikey = process.env.REACT_APP_MSADMIN_API_KEY
const apiUrl = process.env.REACT_APP_MOONSHOT_API_URL

const adminImageAddNsfw = async (imageid)=>{
  let items = {
    tag_ids:[1]
  }
  const requestOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Token ${adminApikey}`
    },
    body: JSON.stringify(items)
    
  };
  const response =await fetch(apiUrl+'admin_posts/'+imageid+'/tags', requestOptions)
  const data =await response
  return data
}

export function useAdminImageAddNsfw(fnKey){
  const queryClient = useQueryClient();
  const adminImageMutation = useMutation((updatedData)=> 
    adminImageAddNsfw(updatedData.imageid),
    {
      onSuccess:()=>{}
    }
  )
  return adminImageMutation;

}


const adminImageDelNsfw = async (imageid)=>{
  let items = {
    tag_ids:[1]
  }
  const requestOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Token ${adminApikey}`
    },
    body: JSON.stringify(items)
    
  };
  const response =await fetch(apiUrl+'admin_posts/'+imageid+'/delete_tags', requestOptions)
  const data =await response
  return data
}

export function useAdminImageDelNsfw(fnKey){
  const queryClient = useQueryClient();
  const adminImageMutation = useMutation((updatedData)=> 
    adminImageDelNsfw(updatedData.imageid),
    {
      onSuccess:()=>{}
    }
  )
  return adminImageMutation;

}