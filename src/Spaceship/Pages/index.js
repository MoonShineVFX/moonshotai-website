import React,{useState} from 'react'
import NsfwImageForm from '../Components/NsfwImageForm'
import {useAdminImageAddNsfw,useAdminImageDelNsfw} from '../SpaceHelper'
import {auth} from '../../firebaseConfig/fireauth'
import { signOut  } from "firebase/auth";
import { Button,Typography } from "@material-tailwind/react";
function Index() {
  const [ isMsg , setIsMsg] = useState('')
  const addNsfwMutation = useAdminImageAddNsfw()
  const delNsfwMutation = useAdminImageDelNsfw()
  const handleAddNsfw = (imageid)=>{
    addNsfwMutation.mutateAsync({imageid}).then(()=>{
      console.log('add success')
    })
  }
  const handleDelNsfw = (imageid)=>{
    delNsfwMutation.mutateAsync({imageid}).then(()=>{
      console.log('del success')
    })
  }
  return (
    <>
      <Typography variant="h3" color="gray">基本快速功能</Typography>
      <Typography variant="h6" color="black">圖片加成人標籤</Typography>
      <div className='flex flex-col'>
        <div className='grid grid-cols-3 gap-5 justify-center'>
          <NsfwImageForm title={"輸入圖片 id 加入 Nsfw"} handleAdminFun={handleAddNsfw} successMsg={isMsg}/>
          <NsfwImageForm title={"輸入圖片 id 刪除 Nsfw"} handleAdminFun={handleDelNsfw} successMsg={isMsg}/>
        </div>
      </div>



      <div>

      </div>

    </>
  )
}

export default Index