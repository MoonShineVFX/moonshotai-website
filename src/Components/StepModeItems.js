import React,{useState,useEffect} from 'react'
import { AnimatePresence,motion } from "framer-motion";
import { MdSend,MdReplay } from "react-icons/md";
export const TextSteoMode1 = ({data,currentDataIndex})=>{
  const [currentStep, setCurrentStep] = useState(0);
  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const handleClickStep = (step)=>{
    setCurrentStep(step)
    setShowFirst(true);
  }
  useEffect(() => {
    let timeout;
    if (showFirst) {
      timeout = setTimeout(() => {
        setShowSecond(true);
      }, 1500);
    }
    return () => clearTimeout(timeout);
  }, [showFirst]);
  return (
    <div className="w-full">
      <div className="relative  p-3 overflow-y-auto h-[32rem] flex flex-col justify-end items-end w-full mb-3">
        <ul className="space-y-4 pt-32 ">
          {/* 訊息內容 */}
          {currentStep === 0 && <div className='text-black/40 text-center pr-3 '>等待指令中..</div> }
          {showFirst && 
            <motion.li 
              className="flex justify-end "
              initial={{ opacity: 0,x:0 }}
              animate={{ opacity: 1,x:0 }}
              transition={{
                ease: "easeInOut",
                duration: .6,
                delay: 0.1,
              }}
            >
              <div className=' '>
                <div className='relative max-w-xl text-right text-zinc-400 text-sm font-bold mb-1'></div>
                <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-[#85e248] rounded-2xl shadow">
                  <span className="block">{data.prompt_cht}</span>
                </div>
              </div>
            </motion.li> 
          }
          {showSecond && data.images &&
            <motion.li 
              className="flex justify-start"
              initial={{ opacity: 0,x:0 }}
              animate={{ opacity: 1,x:0 }}
              transition={{
                ease: "easeInOut",
                duration: .6,
                delay: 0.1,
              }}
            >
              <div className=''>
                <div className='relative max-w-xl text-left text-zinc-700 text-xs font-bold mb-2 flex items-center gap-2'>
                  <img src={process.env.PUBLIC_URL+'/images/logo-2.png'} alt="" className='w-[25px] rounded-full aspect-square'/>
                  Moonshot
                </div>
                <div id="bot-images" className="relative max-w-xl text-gray-700 rounded shadow overflow-hidden ">
                  <div className='flex gap-3 overflow-y-auto pb-3'>
                    { 
                        data.images.map((item,index)=>{
                          return(
                            <img src={process.env.PUBLIC_URL+'/images/ver2_images/step/'+item} key={'t'+index} alt=""  className=' rounded-md w-5/12'/>
                          )
                        })
                      }
      
                  </div>
                </div>
              </div>
            </motion.li> 
          }

        </ul>
      </div>
      <div className="flex  justify-center w-full p-3 border-t border-gray-600 gap-2"> 
      <div className='flex justify-between w-full items-center'>  
        <div className='w-3/4 text-sm text-zinc-800 bg-zinc-100 border border-gray-200 py-2 px-4 rounded-full'>{data.prompt_cht} </div>
        <div className='flex gap-2 items-center'>
          <div onClick={()=>{ 
            setShowFirst(false) 
            setShowSecond(false) }} >
            <MdReplay size={18}/>
          </div>
          <div 
            onClick={()=>{handleClickStep(1)}} 
            className={'bg-white  text-center px-4 py-2 text-black  rounded-3xl cursor-pointer flex items-center  justify-center relative' }>
              <MdSend size={18}/>
              {!showFirst && <div className={"before:content-[''] absolute z-50 text-xs font-bold -right-1 -top-1   "}>
                <span class="relative flex h-3 w-3">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-85"></span>
                  <span class="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                </span>
              </div>}
             
            </div>
        </div>

      </div>
        {/* {
          data.steps.map((item,index)=>{
            return(
              <div 
                key={'m2'+index}
                onClick={()=>{handleClickStep(item.mode,index+1,index)}}
                className={'bg-[#B5DF0F] text-zinc-600  text-center px-5 py-2 text-sm rounded-3xl cursor-pointer ' + (currentDataIndex === index ? 'bg-[#d1e67c]' : ' bg-[#B5DF0F]' )}>{item.title}</div>
            )
          })
        } */}

      </div>
    </div>
  )
}
export const ImageStepMode = ({data,currentDataIndex}) =>{
  const [currentStep, setCurrentStep] = useState(0);
  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const [showThird, setShowThird] = useState(false);
  const handleClickStep = (mode,step,index)=>{
    setCurrentStep(step)
    setShowFirst(true);
  }
  useEffect(() => {
    let timeout1, timeout2;
    if (showFirst) {
      timeout1 = setTimeout(() => {
        setShowSecond(true);
      }, 2000);
    }
    if (showSecond) {
      timeout2 = setTimeout(() => {
        setShowThird(true);
      }, 2000);
    }
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [showFirst, showSecond]);
  return (
    <div className="w-full">
      <div className="relative  p-3 overflow-y-auto h-[32rem] flex flex-col justify-end items-end  mb-3">
        <ul className="space-y-3">
          {/* 訊息內容 */}
          {currentStep === 0 && <div className='text-black/40 text-center flex justify-center pr-3'>等待指令中..</div> }
          {showFirst && 
            <motion.li 
              className="flex justify-end "
              initial={{ opacity: 0,x:0 }}
              animate={{ opacity: 1,x:0 }}
              transition={{
                ease: "easeInOut",
                duration: .6,
                delay: 0.1,
              }}
            >
              <div className=' '>
                <div className='relative max-w-xl text-right text-zinc-400 text-sm font-bold mb-1'></div>
                <div className="relative max-w-xl px-1 py-2 text-gray-700  rounded-2xl  flex justify-end ">
                  <img src={process.env.PUBLIC_URL+'/images/ver2_images/step/'+data.refimg} alt=""  className=' rounded-md  w-3/5'/>
                </div>
              </div>
            </motion.li> 
          }
          {showSecond && 
            <motion.li 
              className="flex justify-end "
              initial={{ opacity: 0,x:0 }}
              animate={{ opacity: 1,x:0 }}
              transition={{
                ease: "easeInOut",
                duration: .6,
                delay: 0.1,
              }}
            >
              <div className=' '>
                <div className='relative max-w-xl text-right text-zinc-400 text-sm font-bold mb-1'></div>
                <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-[#85e248] rounded-2xl shadow">
                  <span className="block">{data.prompt_cht}</span>
                </div>
              </div>
            </motion.li> 
          }
          {showThird && data.images &&
            <motion.li 
              className="flex justify-start"
              initial={{ opacity: 0,x:0 }}
              animate={{ opacity: 1,x:0 }}
              transition={{
                ease: "easeInOut",
                duration: .6,
                delay: 0.1,
              }}
            >
              <div className=''>
                <div className='relative max-w-xl text-left text-zinc-700 text-xs font-bold mb-2 flex items-center gap-2'>
                  <img src={process.env.PUBLIC_URL+'/images/logo-2.png'} alt="" className='w-[25px] rounded-full aspect-square'/>
                  Moonshot
                </div>
                <div id="bot-images" className="relative max-w-xl text-gray-700 rounded shadow overflow-hidden ">
                  <div className='flex gap-3 overflow-y-auto pb-3'>
                    { 
                        data.images.map((item,index)=>{
                          return(
                            <img src={process.env.PUBLIC_URL+'/images/ver2_images/step/'+item} key={'t'+index} alt=""  className=' rounded-md w-5/12'/>
                          )
                        })
                      }
      
                  </div>
                </div>
              </div>
            </motion.li> 
          }
        </ul>
      </div>
      <div className="flex  justify-center w-full p-2 border-t border-gray-600 gap-2"> 
        <div className='flex justify-between w-full items-center'>  
          <div className='w-3/4 text-sm text-zinc-800 bg-zinc-100 border border-gray-200 py-2 px-4 rounded-full'>{data.prompt_cht} </div>
          <div className='flex gap-2 items-center'>
            <div onClick={()=>{ 
              setShowFirst(false) 
              setShowSecond(false) 
              setShowThird(false) 
              }} >
              <MdReplay size={18}/>
            </div>
            <div 
              onClick={()=>{handleClickStep(1)}} 
              className={'bg-white  text-center px-4 py-2 text-black  rounded-3xl cursor-pointer flex items-center  justify-center relative' }>
                <MdSend size={18}/>
                {!showFirst && <div className={"before:content-[''] absolute z-50 text-xs font-bold -right-1 -top-1   "}>
                  <span class="relative flex h-3 w-3">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-85"></span>
                    <span class="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                  </span>
                </div>}
              </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export const EtcMode = ({data,currentDataIndex})=>{
  return (
    <ul className="space-y-4 pt-32 w-full">
      <li className="flex justify-end">
        <div className=' '>
          <div className='relative max-w-xl text-right text-zinc-400 text-sm font-bold mb-1'></div>
          <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-[#85e248] rounded-2xl shadow">
            <span className="block">{data[currentDataIndex].message}</span>
          </div>
        </div>
      </li>
      {data[currentDataIndex].images &&
          <li className="flex justify-start">
            <div>
              <div className='relative max-w-xl text-left text-zinc-400 text-sm font-bold mb-1'>Moonshot</div>
              <div id="bot-images" className="relative max-w-xl text-gray-700 rounded shadow overflow-hidden ">
                <div className='flex gap-3 overflow-y-auto pb-3   '>
                  { 
                    data[currentDataIndex].images.map((item,index)=>{
                      return(
                        <img src={process.env.PUBLIC_URL+'/images/'+item} key={'e'+index} alt=""  className='w-5/12 bg-black rounded-md aspect-[1/1] object-contain  '/>
                      )
                    })
                  }
    
                </div>
              </div>
            </div>
          </li>
      }
      {
        data[currentDataIndex].answer &&
        <li className="flex justify-start">
          <div>
            <div className='relative max-w-xl text-left text-zinc-400 text-sm font-bold mb-1'>Moonshot</div>
            <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-[#d2dad2] rounded-2xl shadow">
              <span className="block">{data[currentDataIndex].answer}</span>
            </div>
          </div>
        </li>
      }

    </ul>
  )
}