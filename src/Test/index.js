import React, { useEffect, useState } from 'react'

function Index() {
  const apiUrl ='https://api.moonshot.today/'
  const [cData, setCData] = useState([])
  const fetchGalleries = async (token,cursor,pageSize,startDate,endDate,currModels) =>{
    let newCursor = cursor === undefined ? '' : cursor
    const requestOptions = {
      method: 'GET',
      headers: token ? { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } : { 'Content-Type': 'application/json'}
    };
  
    const response = await fetch(apiUrl+'galleries?'+'cursor='+newCursor+'&page_size=50',requestOptions)
    let status = response.status
    let data 
    if(status === 401){
      return 401
    }else{
      data = await response.json()
      console.log(data)
      setCData(data.results)
      return data
    }
  
  }
  useEffect(()=>{
    fetchGalleries()
  },[])

  if(!cData) {
    return <>no</>
  }

  console.log(cData)


  return (
    <div className='text-white'>
      {cData && cData.map((item,index)=>{
      return(
        <div>{item.urls.regular}</div>
      )
    })}</div>
  )
}

export default Index