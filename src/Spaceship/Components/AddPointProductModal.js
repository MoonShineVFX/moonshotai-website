import React, { useState,useEffect }  from 'react'
import { useForm,Controller } from 'react-hook-form';
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Switch
} from "@material-tailwind/react";
function AddPointProductModal({open ,handleOpen,product,handleCreate}) {
  const { control,register, handleSubmit,setValue,watch, formState: { errors } } = useForm({
    name:'',subscription_days:'',point:''
  });

  const onSubmit = (data) => {
    console.log(data)
    let items = {
      name:data.name,
      subscription_days:parseInt(data.subscription_days),
      point:parseInt(data.point),
      is_active:data.is_active,
    }
    handleCreate(items)
  }
  return (
    <Dialog
      open={open}
      size={"xs"}
      handler={handleOpen}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <DialogHeader className='text-lg text-center '>新增點數商品</DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)} >
      <DialogBody className=' relative flex flex-col gap-4 '>
       
          <Typography className="-mb-2" variant="h6" color="gray">
            商品名稱
          </Typography>
          <Controller
            name="name"
            control={control}
            defaultValue={product?.name}
            rules={{ required: true }}
            render={({ field }) => (
              <Input {...field} type="text" 
                label='商品名稱'/>
            )}
          />
          <Typography className="-mb-2" variant="h6" color="gray">
          兌換天數
          </Typography>
          <Controller
            name="subscription_days"
            control={control}
            defaultValue={product?.subscription_days}
            rules={{ required: true }}
            render={({ field }) => (
              <Input {...field} type="text" 
                label='兌換天數'/>
            )}
          />
          <Typography className="-mb-2" variant="h6" color="gray">
          需求點數
          </Typography>
          <Controller
            name="point"
            control={control}
            defaultValue={product?.point}
            rules={{ required: true }}
            render={({ field }) => (
              <Input {...field} type="text" 
                label='需求點數'/>
            )}
          />
          <Controller
            name="is_active"
            control={control}
            defaultValue={product?.is_active ? product?.is_active : true}
            render={({ field }) => (
              <div className="flex mt-4 ">
                <Switch 
                  ripple={false}
                  className="h-full w-full checked:bg-[#2ec946]"
                  containerProps={{
                    className: "w-11 h-6",
                  }}
                  circleProps={{
                    className: "before:hidden left-0.5 border-none",
                  }}                    
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)} 
                  label="是否啟用" 
                  labelProps={{
                    className:'text-sm text-black'
                  }}
                />
              </div>
            )}
          />

       
      </DialogBody>
      <DialogFooter className='border-t border-gray-600'>
        <Button
          variant="text"
          color="red"
          onClick={handleOpen}
          className="mr-1"
        >
          <span>取消</span>
        </Button>
        <Button variant="gradient" color="" type='submit'>
          <span>新增</span>
        </Button>
      </DialogFooter>
      </form>

    </Dialog>
  )
}

export default AddPointProductModal