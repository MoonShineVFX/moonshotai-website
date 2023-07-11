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
    <div className='mx-8'>

    <div className='py-5 lg:py-28  '>

      <div className='flex flex-col'>
        <div id="menu" className='text-center text-sm my-4 flex justify-between items-center w-2/3 mx-auto gap-3'>
          {
            ver2LineItem.map((item,index)=>{
              return(
                <div
                  key={'m'+index} 
                  onClick={()=>{handleClick(item.mode,index)}}
                  className={'relative    w-1/2 ' + (currentDataIndex === index ? '  '  : '  ' )}
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
      <motion.div 
      initial={{ opacity: 0}}
      animate={{ opacity: 1}}
      transition={{
        ease: "easeInOut",
        duration: .6,
        delay: 0.5,
      }}
      className='mb-10 text-white break-all  whitespace-pre-wrap w-1/2  flex-col justify-center items-center hidden md:flex'>
        <div className='text-5xl text-center font-bold mb-3 text-white'>
          Let 
          <span className='font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-lime-300 to-lime-500'> Moonshot </span>
          <div className=' indent-32'>
            <span className='font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-lime-300 to-lime-500'> Create </span>For You
          </div>  
        </div>
        <div className='text-white/70 text-xl text-left'>
          {ver2LineItem[currentDataIndex].slogan2}
        </div>
        <div className='my-14'>
          {ver2LineItem[currentDataIndex].description}
        </div>

      </motion.div>
                
      
    </div>
    </div>
  )
}

export default ChatTutorial_ver3