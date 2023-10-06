import React from 'react'
import { useForm,Controller } from 'react-hook-form';
import {
  Card,
  CardBody,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
const NsfwImageForm = ({title,handleAdminFun}) => {
  const { control,register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    console.log(data)
    handleAdminFun(data.imgid)
    // let items ={
    //   id:data.id ||null,

    // }
    // console.log(items)
    // handleSetStorageImage(image,items,profilePage,add_activities,remove_activities)


  };
  return (
    <Card color="white" >
      <CardBody>
        <Typography variant="h5" color="blue-gray">
         {title}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-3 mb-2 ">
          <div className="mb-4 flex flex-col gap-6">
            <Controller
              name="imgid"
              control={control}
              defaultValue=''
              rules={{ required: false }}
              render={({ field }) => (
                <Input {...field}  
                  size="lg" 
                  type="text" 
                  label='輸入圖片Id'
                />
              )}
            />
          </div>
          <Button type="submit" className="mt-3" fullWidth>
            送出
          </Button>
        </form>
      </CardBody>

    </Card>
  )
}

export default NsfwImageForm