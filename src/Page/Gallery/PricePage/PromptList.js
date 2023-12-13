import React,{useState,useEffect} from 'react'
import moment from 'moment';
import {LoadingCircle} from '../helpers/componentsHelper'
import { getAnalytics, logEvent } from "firebase/analytics";
import { IoCopyOutline } from "react-icons/io5";
import { FaEye } from "react-icons/fa6";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
  Button,
} from "@material-tailwind/react";
const PromptList = ({data}) => {
  const analytics = getAnalytics();
  const [ isCopied , setIsCopied ] = useState(false);
  const handleCopyPrompt=(prompt)=>{
    const text = prompt;
    navigator.clipboard.writeText(text);
    setIsCopied(true)
  }
  useEffect(()=>{
    logEvent(analytics, 'Order_已購咒語頁面_進入')
  },[])
  return (
    <div className='text-white pb-10'>
      <div className='text-sm text-white/80'>{data.length} items</div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mt-6'>
      {
        data.map((item,index)=>{
          const {id,title,urls,prompt}= item
          return(
            <Card color="gray" variant="gradient" className="mt-6 ">
              <CardHeader 
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 rounded-none h-44 "
              >
                <picture>
                  <source
                    src={urls.thumb+'?format=webp&width=300'}
                    alt="card-image"
                    className='w-full object-cover object-center h-full'
                    type='image/webp'
                  />
                  <img
                    src={urls.thumb+'?width=300'}
                    alt="card-image"
                    className='w-full object-cover object-center h-full'
                  />
                </picture>

                <div className='  absolute bottom-0 right-0 p-2 z-50'>
                  <Tooltip
                    placement="bottom"
                    className="m-0 p-2"
                    content={
                      <div className="w-[120px] m-0 p-0">
                        <img src={urls.thumb+'?width=120'} alt="" />
                      </div>
                    }
                  >
                    <div><FaEye color="white" size={18} /></div>
                  </Tooltip>
                </div>

              </CardHeader>
              <CardBody className=''>
                <Typography variant="h5"  color="white" className="mb-2">
                  Prompt 提示詞
                </Typography>
                <div className='max-h-44 overflow-x-hidden overflow-y-auto '>
                  <Typography className="text-sm whitespace-normal ">
                    {prompt}
                  </Typography>
                </div>

              </CardBody>
              <CardFooter className="pt-0 mt-auto">
                <Button color="white" className='flex items-center space-x-2'  onClick={()=>handleCopyPrompt(prompt)}><IoCopyOutline /> <span>Copy Prompts</span></Button>
              </CardFooter>
            </Card>
          )
        })
      }
      </div>

    </div>
  )
}

export default PromptList