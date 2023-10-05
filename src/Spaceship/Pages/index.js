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
    <div>
      <Button onClick={() => signOut(auth)}>登出</Button>
      <div className='grid grid-cols-3 gap-5 justify-center'>
        <NsfwImageForm title={"Add Nsfw"} handleAdminFun={handleAddNsfw} />
        <NsfwImageForm title={"Del Nsfw"} handleAdminFun={handleDelNsfw} />
      </div>
      <div>

      </div>

    </div>
  )
}

export default Index