
import { useInfiniteQuery,useMutation,useQuery,useQueryClient } from 'react-query';
const adminApikey = process.env.REACT_APP_MSADMIN_API_KEY
const apiUrl = process.env.REACT_APP_MOONSHOT_API_URL



export function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${year}/${month}/${day} ${hours}:${minutes}`;
}

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
/** 管理禮物商品 **/
//取得禮物商品
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

//新增禮物商品
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


//編輯禮物商品
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




/** 管理付費會員 **/
//取得付費會員
const adminGetPremiumUser = async ()=>{
  const requestOptions = {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Token ${adminApikey}`
    },
  };
  const response =await fetch(apiUrl+'admin_paid_users', requestOptions)
  const data =await response.json()
  return data
}

export function useAdminPUserList(){
  return useQuery(
    'adminPUserList',
    ({ pageParam }) =>
    adminGetPremiumUser(),
    {
      onSuccess:()=>{}
    }
  )
} 