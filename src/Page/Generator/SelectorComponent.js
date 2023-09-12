import React,{useState,useEffect} from 'react'
import { useForm } from "react-hook-form";
import { promptPresets,models} from './promptPresets'
import { motion } from 'framer-motion';
import { FaXmark } from "react-icons/fa6";

import { Button, 
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter, 
  Typography,
  IconButton
} from "@material-tailwind/react";


export const ModelSelector = ({data, onModelChange}) =>{
  const [ currentModel , setCurrentModel] = useState(data[0])
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur)=> !cur);
  const handleModelClick = (model) => {
    setCurrentModel(model);
    handleOpen(); // 设置当前模型后关闭模态框
    onModelChange(model)
  };
  return(
    <>
      <div className='w-full ' onClick={handleOpen}>
        <div className={`relative  text-sm border-gray-600 break-keep  my-2`}>模型 </div>
        <div className='bg-white/20  border border-white/40 text-white  font-bold rounded-md flex items-center h-16 overflow-hidden relative'>
          <div className='w-1/2 overflow-hidden'>
            <img src={currentModel.image+'?width=400'} alt="" className=' object-cover object-center '/>
          </div>
          <div className='flex justify-center items-center w-full text-base'>{currentModel.title}</div>
        </div>
      </div>
      <Dialog
          open={open}
          handler={handleOpen}
          animate={{
            mount: {  y: 0 },
            unmount: {  y: -100 },
          }}
          className='bg-gray-900'
        >
          <DialogHeader className="justify-between">
            <Typography variant="h5" color="white">
              選擇模型指令
            </Typography>
            <IconButton
              color="blue-gray"
              size="sm"
              variant="text"
              onClick={handleOpen}
            >
              <div><FaXmark /></div>
            </IconButton>
          </DialogHeader>
          <DialogBody >
            <div className='  space-y-4'>
              {data.map((model) => (
                <div 
                  key={model.command} 
                  onClick={() => handleModelClick(model) }
                  className='bg-white/10  border border-white/30 text-white  font-bold rounded-md flex items-center h-16 overflow-hidden relative'>
                  <div className='w-1/2 overflow-hidden'>
                    <img src={model.image+'?width=400'} alt={model.title} className=' object-cover object-center '/>
                  </div>
                  <div className='flex justify-center items-center w-full text-lg'>{model.title}</div>
                </div>

              ))}
            </div>

          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="gray"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>關閉</span>
            </Button>

          </DialogFooter>
        </Dialog>

    </>
  )
}


export const StyleSelector = ({data, onStyleChange}) =>{
  const [ currentStyle , setCurrentStyle] = useState(data[0])
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur)=> !cur);
  const handleModelClick = (item) => {
    setCurrentStyle(item);
    handleOpen(); // 设置当前模型后关闭模态框
    onStyleChange(item)
  };
  return(
    <>
      <div className='w-full ' onClick={handleOpen}>
        <div className={`relative  text-sm border-gray-600 break-keep  my-2`}>風格 </div>
        <div 
          className='border border-white/40 text-white text-xl font-bold rounded-md overflow-hidden  relative h-16 flex justify-center items-center'
        >
          <img src={currentStyle.image} alt="" className=' absolute  object-cover object-center opacity-60 -z-10' />
          {currentStyle.label}
        </div>
      </div>
      <Dialog
          open={open}
          handler={handleOpen}
          animate={{
            mount: {  y: 0 },
            unmount: {  y: -100 },
          }}
          className='bg-gray-900'
        >
          <DialogHeader className="justify-between">
            <Typography variant="h5" color="white">
              選擇風格
            </Typography>
            <IconButton
              color="blue-gray"
              size="sm"
              variant="text"
              onClick={handleOpen}
            >
              <div><FaXmark /></div>
            </IconButton>
          </DialogHeader>
          <DialogBody className=' ' >
            <div className='grid grid-cols-2  gap-5 relative  overflow-y-auto h-[80vh] pr-4'>
              {data.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => handleModelClick(item) }
                  className='border h-24 border-white/40 text-white text-xl font-bold rounded-md overflow-hidden  relative flex justify-center items-cente'>
                  <img src={item.image+'?width=400'} alt={item.label} className=' absolute  object-cover object-center opacity-60 z-0 '/>
                  <div className='flex justify-center items-center w-full text-lg z-10'>{item.label}</div>
                </div>

              ))}
            </div>

          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="gray"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>關閉</span>
            </Button>

          </DialogFooter>
        </Dialog>

    </>
  )
}