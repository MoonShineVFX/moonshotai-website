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
    <div className='my-16 w-11/12 mx-auto md:w-[460px]'>
      <AnimatePresence > 
        <motion.div 
        initial={{ opacity: 0,y:'15' }}
        animate={{ opacity: 1,y:0 }}
        exit={{ opacity: 0,y:'15' }}
        transition={{
          ease: "easeInOut",
          duration: .6,
          delay: 0.5,
        }}
        className='text-3xl font-extrabold mb-10 text-white break-all  whitespace-pre-wrap'>
          {ver2LineItem[currentDataIndex].slogan}
        </motion.div>
      </AnimatePresence>

      <div className='flex flex-col '>
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
                
      
    </div>
  )
}

export default Section2_ver2