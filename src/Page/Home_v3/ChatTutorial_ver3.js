import React,{useState,useEffect} from 'react'
import { workitems,workitems2,workitems3,ver2LineItem } from '../../Components/ItemData'
import { TextSteoMode1,ImageStepModeV3,EtcMode,TextSteoMode1V3 } from '../../Components/StepModeItems';
import { AnimatePresence,motion } from "framer-motion";
import { MdKeyboardArrowLeft,MdVerifiedUser } from "react-icons/md";

function ChatTutorial_ver3() {
  const [data,setData] = useState(ver2LineItem[0])
  const [currentDataIndex , setCurrentDataIndex] = useState(0)
  const [currentItem , setCurrentItem] = useState(0)
  const [mode,setMode] = useState('text')
  const [title,setTitle] = useState('')
  const [currentStep, setCurrentStep] = useState(0);
  const handleClick = (mode,index) =>{
    setCurrentDataIndex(index)
    setMode(mode)
    setData(ver2LineItem[index])
  }
  const handleClickStep = (mode,step,index)=>{
    
    setCurrentStep(step)
    

  }
  const menuitems = [
    {
      id:1,
      title:"以字生圖",
      mode:'text',
      slogan:"你可以\n讓 Moonshot 幫你畫圖"
    },
    {
      id:2,
      title:"以圖生圖",
      mode:'image',
      slogan:"也可以\n利用參考圖來延伸做畫"
    }
  ]


  return (
    <div className='mx-8  md:w-8/12 md:mx-auto'>

    <div className='py-5 md:py-10  '>

      <div className='flex flex-col'>
        <div id="menu" className='text-center text-sm my-4 md:my-10 flex justify-between items-center w-2/3 mx-auto gap-3'>
          {
            ver2LineItem.map((item,index)=>{
              return(
                <div
                  key={'m'+index} 
                  onClick={()=>{handleClick(item.mode,index)}}
                  className={'relative    w-1/2 max-w-[180px] ' + (currentDataIndex === index ? '  '  : '  ' )}
                >
                  <div className=' absolute top-0 left-0'>
                    <img src={process.env.PUBLIC_URL+'/images/ver3_images/left_icon.png'} alt="" />
                  </div>
                  {item.title}
                  <div className=' absolute top-0 right-0'>
                    <img src={process.env.PUBLIC_URL+'/images/ver3_images/right_icon.png'} alt="" />
                  </div>
                </div>
              )
            })
          }
        </div>
        <div id="chat" className="mx-auto w-full  ">
          <div className=" rounded-md bg-gradient-to-b from-[#BDDE48] via-[#C0CFA6] to-[#C2C1FD] p-[2px]">

            <div className='rounded-md h-full w-full bg-[#000]'>
              {( ()=>{
                  switch (mode) {
                    case 'text':
                      return <TextSteoMode1V3 data={data} />;
                    case 'image':
                      return <ImageStepModeV3 data={data} />;
                    case 'etc':
                      return <TextSteoMode1V3 data={data}/>;
                    default: return null;
                  }
                }
              )()}
            </div>
          </div>
        </div>
      </div>

                
      
    </div>
    </div>
  )
}

export default ChatTutorial_ver3