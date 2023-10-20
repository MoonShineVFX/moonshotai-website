
import { useInfiniteQuery,useMutation,useQuery,useQueryClient } from 'react-query';
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

const adminGetPointProduct = async ()=>{
  const requestOptions = {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Token ${adminApikey}`
    },
  };
  const response =await fetch(apiUrl+'admin_point_products', requestOptions)
  const data =await response.json()
  return data
}

export function useAdminPPList(){
  return useQuery(
    'adminPPList',
    ({ pageParam }) =>
    adminGetPointProduct(),
    {
      onSuccess:()=>{}
    }
  )
} 

const adminCreatePointProduct = async (items)=>{

  const requestOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Token ${adminApikey}`
    },
    body: JSON.stringify(items)
    
  };
  const response =await fetch(apiUrl+'admin_point_products', requestOptions)
  const data =await response
  return data
}
export function useAdminCreatePointProduct(fnKey){
  const queryClient = useQueryClient();
  const adminCreateMutation = useMutation((updatedData)=> 
  adminCreatePointProduct(updatedData.imageid,updatedData.items),
    {
      onSuccess:(data, variables)=>{
        queryClient.invalidateQueries(fnKey);
      }
    }
  )
  return adminCreateMutation;

}
const adminPatchPointProduct = async (currentItem,items)=>{

  const requestOptions = {
    method: 'PATCH',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Token ${adminApikey}`
    },
    body: JSON.stringify(items)
    
  };
  const response =await fetch(apiUrl+'admin_point_products/'+currentItem.id, requestOptions)
  const data =await response
  return data
}

export function useAdminPatchPointProduct(fnKey){
  const queryClient = useQueryClient();
  const adminCreateMutation = useMutation((updatedData)=> 
  adminPatchPointProduct(updatedData.currentItem,updatedData.items),
    {
      onSuccess:(data, variables)=>{
        queryClient.invalidateQueries(fnKey);
      }
    }
  )
  return adminCreateMutation;

}