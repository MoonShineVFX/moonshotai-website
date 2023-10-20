import React from 'react'
import NsfwImageForm from '../Components/NsfwImageForm'
import {useAdminImageAddNsfw,useAdminImageDelNsfw} from '../SpaceHelper'
import {auth} from '../../firebaseConfig/fireauth'
import { signOut  } from "firebase/auth";
import { Button } from "@material-tailwind/react";
function Index() {

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
      <h1 className='text-black text-xl font-semibold mb-5'>基本快速功能</h1>
      <div className='flex flex-col'>
        <div className='text-black my-2'>圖片加成人標籤</div>
        <div className='grid grid-cols-3 gap-5 justify-center'>
          <NsfwImageForm title={"輸入圖片 id 加入 Nsfw"} handleAdminFun={handleAddNsfw} />
          <NsfwImageForm title={"輸入圖片 id 刪除 Nsfw"} handleAdminFun={handleDelNsfw} />
        </div>
      </div>



      <div>

      </div>

    </>
  )
}

export default Index