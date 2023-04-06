import React,{useState,useEffect} from 'react'
import { workitems,workitems2,workitems3,ver2LineItem } from '../../Components/ItemData'
import { TextSteoMode1,ImageStepMode,EtcMode } from '../../Components/StepModeItems';
import { AnimatePresence,motion } from "framer-motion";
import { MdKeyboardArrowLeft,MdVerifiedUser } from "react-icons/md";

function Section2_ver2() {
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
    <div className='my-16 w-11/12 mx-auto  flex flex-col md:flex-row items-center justify-center gap-20'>
      <motion.div 
      className='mb-2 text-white break-all  whitespace-pre-wrap w-full flex flex-col justify-center items-center block md:hidden'>
        <div className='text-5xl md:text-5xl text-center font-bold mb-3 text-white'>
          Let 
          <span className='font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-lime-300 to-lime-500'> Moonshot </span>
          <div className=' md:indent-32'>
            <span className='font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-lime-300 to-lime-500'> Create </span>For You
          </div>  
        </div>
        <div className='text-white/70 text-lg text-left'>
          {ver2LineItem[currentDataIndex].slogan2}
        </div>
        <div className='my-2'>
          {ver2LineItem[currentDataIndex].description}
        </div>

      </motion.div>
      <div className='flex flex-col w-11/12 md:w-[460px]'>
        <div id="menu" className='flex justify-start gap-1  pb-1'>
          {
            ver2LineItem.map((item,index)=>{
              return(
                <div
                  key={'m'+index} 
                  onClick={()=>{handleClick(item.mode,index)}}
                  className={' hover:bg-[#8CABD8] hover:text-black   w-1/3 rounded-t-2xl text-center p-2  cursor-pointer ' + (currentDataIndex === index ? ' text-black bg-[#8CABD8]'  : ' text-white/40 bg-[#273145]' )}
                >{item.title}</div>
              )
            })
          }
        </div>
        <div id="chat" className="mx-auto w-full">
          <div className=" rounded-md bg-[#8CABD8]">
            <div className='flex items-center  p-2 gap-2'>

              <div className=' text-md font-bold flex items-center'> <MdKeyboardArrowLeft size={28} />   Moonshot</div>
              
            </div>
            <div>
              {( ()=>{
                  switch (mode) {
                    case 'text':
                      return <TextSteoMode1 data={data} />;
                    case 'image':
                      return <ImageStepMode data={data} />;
                    case 'etc':
                      return <TextSteoMode1 data={data}/>;
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
  )
}

export default Section2_ver2