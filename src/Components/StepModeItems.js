import React,{useState,useEffect} from 'react'
import { AnimatePresence,motion } from "framer-motion";
import { MdSend,MdReplay } from "react-icons/md";
import TypingEffect from './TypingEffect';
export const TextSteoMode1 = ({data,currentDataIndex})=>{
  const [currentStep, setCurrentStep] = useState(0);
  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const [showThird, setShowThird] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const handleClickStep = (step)=>{
    setCurrentStep(step)
    setShowFirst(true);
  }
  const handleTypingComplete = () => {
    setIsTypingComplete(true);
  };
  useEffect(() => {
    let timeout;
    if (showFirst) {
      // timeout = setTimeout(() => {
      //   setShowSecond(true);
      // }, 1500);
    }
    if(isTypingComplete){
      timeout = setTimeout(() => {
        setShowSecond(true);
      }, 1500);
    }
    return () => clearTimeout(timeout);
  }, [showFirst,isTypingComplete]);
  return (
    <div className="w-full ">
      <div className="relative  p-3 overflow-y-auto h-[32rem] flex flex-col justify-end items-end w-full  border-x-2">
        <ul className="space-y-4 pt-32 ">
          {/* 訊息內容 */}
          {currentStep === 0 && <div className='text-white/60 text-center pr-3 '>等待指令中..</div> }
          {isTypingComplete && 
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
                <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-white rounded-2xl shadow">
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
                <div className='relative max-w-xl text-left text-zinc-200 text-xs font-bold mb-2 flex items-center gap-2'>
                  <img src={process.env.PUBLIC_URL+'/images/logo-2.png'} alt="" className='w-[25px] rounded-full aspect-square '/>
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
      <div className="flex  justify-center w-full p-3  gap-2 bg-white rounded-b-lg"> 
      <div className='flex justify-between w-full items-center'>  
        <div className='w-3/4 text-sm text-zinc-800 bg-zinc-100 border border-gray-200 py-2 px-4 rounded-full h-10'>
          {
            showFirst ? <TypingEffect text={data.prompt_cht} speed={100} onTypingComplete={handleTypingComplete} /> : <div className='animate-fade-loop'>_</div>
          } 
        </div>
        <div className='flex gap-2 items-center'>
          <div 
          className=' cursor-pointer'
          onClick={()=>{ 
            setShowFirst(false) 
            setShowSecond(false) }} >
            <MdReplay size={18}/>
          </div>
          <div 
            onClick={()=>{handleClickStep(1)}} 
            className={'bg-white  text-center px-4 py-2 text-black pr-2  rounded-full cursor-pointer flex items-center  justify-center relative border border-zinc-300' }>
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
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const handleClickStep = (mode,step,index)=>{
    setCurrentStep(step)
    setShowFirst(true);
  }
  const handleTypingComplete = () => {
    setIsTypingComplete(true);
  };
  useEffect(() => {
    let timeout1, timeout2;
    if (showFirst) {
      timeout1 = setTimeout(() => {
        setShowSecond(true);
      }, 2000);
    }
    if (isTypingComplete) {
      timeout2 = setTimeout(() => {
        setShowThird(true);
      }, 2000);
    }
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [showFirst, showSecond,isTypingComplete]);
  return (
    <div className="w-full">
      <div className="relative  p-3 overflow-y-auto h-[32rem] flex flex-col justify-end items-end  border-x-2">
        <ul className="space-y-3">
          {/* 訊息內容 */}
          {currentStep === 0 && <div className='text-white/60 text-center flex justify-center pr-3'>等待指令中..</div> }
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
          {isTypingComplete && 
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
      <div className="flex  justify-center w-full p-2 gap-2 bg-white rounded-b-lg"> 
        <div className='flex justify-between w-full items-center'>  
          <div className='w-3/4 text-sm text-zinc-800 bg-zinc-100 border border-gray-200 py-2 px-4 rounded-full h-10'>
          {
            showSecond && <TypingEffect text={data.prompt_cht} speed={100} onTypingComplete={handleTypingComplete}/> 
          }
          </div>
          <div className='flex gap-2 items-center'>
            <div 
              className=' cursor-pointer'
              onClick={()=>{ 
              setShowFirst(false) 
              setShowSecond(false) 
              setShowThird(false) 
              }} >
              <MdReplay size={18}/>
            </div>
            <div 
              onClick={()=>{handleClickStep(1)}} 
              className={'bg-white  text-center px-4 py-2 pr-2 text-black  rounded-3xl cursor-pointer flex items-center  justify-center relative border border-zinc-300' }>
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


// VER 3.0
export const TextSteoMode1V3 = ({data,currentDataIndex})=>{
  const [currentStep, setCurrentStep] = useState(0);
  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const [showThird, setShowThird] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const handleClickStep = (step)=>{
    setCurrentStep(step)
    setShowFirst(true);
  }
  const handleTypingComplete = () => {
    setIsTypingComplete(true);
  };
  useEffect(() => {
    let timeout;
    if (showFirst) {
      // timeout = setTimeout(() => {
      //   setShowSecond(true);
      // }, 1500);
    }
    if(isTypingComplete){
      timeout = setTimeout(() => {
        setShowSecond(true);
      }, 1500);
    }
    return () => clearTimeout(timeout);
  }, [showFirst,isTypingComplete]);
  return (
    <div className="w-full ">
      <div className="relative  p-5 overflow-y-auto h-[28rem] flex flex-col justify-end items-csnter w-full">
        <ul className="space-y-4 pt-32 ">
          {/* 訊息內容 */}
          <motion.li 
              className="flex justify-start w-4/5"
              initial={{ opacity: 0,x:0 }}
              animate={{ opacity: 1,x:0 }}
              transition={{
                ease: "easeInOut",
                duration: .6,
                delay: 0.1,
              }}
            >
              <div className=''>
                <div className='relative max-w-xl text-right text-zinc-400 text-sm font-bold mb-1'></div>
                <div className="relative max-w-xl px-5 py-3 text-white bg-[#263421] rounded-2xl shadow text-sm flex items-center gap-1 ">
                  <span className="block">點擊下方【傳送】按鈕</span>
                  <MdSend size={18}/>
                </div>
              </div>
            </motion.li> 
            <motion.li 
              className="flex justify-start w-4/5"
              initial={{ opacity: 0,x:0 }}
              animate={{ opacity: 1,x:0 }}
              transition={{
                ease: "easeInOut",
                duration: .6,
                delay: 0.1,
              }}
            >
              <div className=''>
                <div className='relative max-w-xl text-right text-zinc-400 text-sm font-bold mb-1'></div>
                <div className=" relative max-w-xl px-5 py-3 text-white bg-[#263421]  shadow text-sm flex items-center gap-1  rounded-tl-2xl rounded-tr-2xl rounded-br-2xl">
                  <span className="block">您可以選擇以文生圖 / 以圖生圖，並於對話中輸入欲生成圖片的風格 (Model) 與關鍵字，讓我陪你一起創造！</span>
                  <div className=' absolute bottom-0 -left-[17px]'>
                    <div className='w-[20px] h-[23px] bg-[#1e1e1e] absolute bottom-[1px] -left-[7px]  rotate-[60.33deg]'></div>
                    <div className='w-[17px] h-[10px]  bg-[#263421]'></div>
                  </div>
                </div>
              </div>
            </motion.li> 
          {currentStep === 0 && <div className='text-white/60 text-sm text-center pr-3 '>等待指令中..</div> }
          {isTypingComplete && 
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
                <div className="relative max-w-xl px-5 py-3 text-white bg-[#2F2E56] rounded-2xl shadow text-sm">
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
                <div className='relative max-w-xl text-left text-zinc-200 text-xs font-bold mb-2 flex items-center gap-2'>
                  <img src={process.env.PUBLIC_URL+'/images/logo-2.png'} alt="" className='w-[25px] rounded-full aspect-square '/>
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
      <div className="flex  justify-center w-full p-3  gap-2 border-t border-[#C2C1FD] rounded-b-lg"> 
      <div className='flex justify-between w-full items-center '>  
        <div className='w-3/4 text-sm text-white bg-[#C2C1FD20]  border border-[#C2C1FD] py-2 px-4 rounded-xl h-10'>
          {
            showFirst ? <TypingEffect text={data.prompt_cht} speed={100} onTypingComplete={handleTypingComplete} /> : <div className='animate-fade-loop'>_</div>
          } 
        </div>
        <div className='flex gap-2 items-center'>
          <div 
          className=' cursor-pointer'
          onClick={()=>{ 
            setShowFirst(false) 
            setShowSecond(false) }} >
            <MdReplay size={18}/>
          </div>
          <div 
            onClick={()=>{handleClickStep(1)}} 
            className={'bg-[#C2C1FD20]  text-center px-4 py-2 text-white pr-2  rounded-xl cursor-pointer flex items-center  justify-center relative border border-[#C2C1FD]' }>
              <MdSend size={18}/>
              {!showFirst && <div className={"before:content-[''] absolute z-50 text-xs font-bold -right-1 -top-1   "}>
                <span class="relative flex h-3 w-3">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-85"></span>
                  <span class="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
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



export const ImageStepModeV3 = ({data,currentDataIndex}) =>{
  const [currentStep, setCurrentStep] = useState(0);
  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const [showThird, setShowThird] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const handleClickStep = (mode,step,index)=>{
    setCurrentStep(step)
    setShowFirst(true);
  }
  const handleTypingComplete = () => {
    setIsTypingComplete(true);
  };
  useEffect(() => {
    let timeout1, timeout2;
    if (showFirst) {
      timeout1 = setTimeout(() => {
        setShowSecond(true);
      }, 2000);
    }
    if (isTypingComplete) {
      timeout2 = setTimeout(() => {
        setShowThird(true);
      }, 2000);
    }
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [showFirst, showSecond,isTypingComplete]);
  return (
    <div className="w-full">
      <div className="relative  p-5 overflow-y-auto h-[28rem] flex flex-col justify-end items-end  ">
        <ul className="space-y-3">
          {/* 訊息內容 */}
          <motion.li 
              className="flex justify-start w-4/5"
              initial={{ opacity: 0,x:0 }}
              animate={{ opacity: 1,x:0 }}
              transition={{
                ease: "easeInOut",
                duration: .6,
                delay: 0.1,
              }}
            >
              <div className=''>
                <div className='relative max-w-xl text-right text-zinc-400 text-sm font-bold mb-1'></div>
                <div className="relative max-w-xl px-5 py-3 text-white bg-[#263421] rounded-2xl shadow text-sm flex items-center gap-1 ">
                  <span className="block">點擊下方【傳送】按鈕</span>
                  <MdSend size={18}/>
                </div>
              </div>
            </motion.li> 
            <motion.li 
              className="flex justify-start w-4/5"
              initial={{ opacity: 0,x:0 }}
              animate={{ opacity: 1,x:0 }}
              transition={{
                ease: "easeInOut",
                duration: .6,
                delay: 0.1,
              }}
            >
              <div className=''>
                <div className='relative max-w-xl text-right text-zinc-400 text-sm font-bold mb-1'></div>
                <div className=" relative max-w-xl px-5 py-3 text-white bg-[#263421]  shadow text-sm flex items-center gap-1  rounded-tl-2xl rounded-tr-2xl rounded-br-2xl">
                  <span className="block">您可以選擇以文生圖 / 以圖生圖，並於對話中輸入欲生成圖片的風格 (Model) 與關鍵字，讓我陪你一起創造！</span>
                  <div className=' absolute bottom-0 -left-[17px]'>
                    <div className='w-[20px] h-[23px] bg-[#1e1e1e] absolute bottom-[1px] -left-[7px]  rotate-[60.33deg]'></div>
                    <div className='w-[17px] h-[10px]  bg-[#263421]'></div>
                  </div>
                </div>
              </div>
            </motion.li> 
          {currentStep === 0 && <div className='text-white/60 text-sm text-center flex justify-center pr-3'>等待指令中..</div> }
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
          {isTypingComplete && 
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
                <div className="relative max-w-xl px-5 py-3 text-white bg-[#2F2E56] rounded-2xl shadow text-sm">
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
                <div className='relative max-w-xl text-left text-white text-xs font-bold mb-2 flex items-center gap-2'>
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
      <div className="flex  justify-center w-full p-2 gap-2 border-t border-[#C2C1FD]  rounded-b-lg"> 
        <div className='flex justify-between w-full items-center '>  
          <div className='w-3/4 text-sm text-white bg-[#C2C1FD20]  border border-[#C2C1FD] py-2 px-4 rounded-full h-10   overflow-x-auto overflow-y-hidden '>
            <div className=' whitespace-nowrap'>
            {
              showSecond && <TypingEffect text={data.prompt_cht} speed={100} onTypingComplete={handleTypingComplete}/> 
            }
            </div>

          </div>
          <div className='flex gap-2 items-center'>
            <div 
              className=' cursor-pointer'
              onClick={()=>{ 
              setShowFirst(false) 
              setShowSecond(false) 
              setShowThird(false) 
              }} >
              <MdReplay size={18}/>
            </div>
            <div 
              onClick={()=>{handleClickStep(1)}} 
              className={'bg-[#C2C1FD20]   text-center px-4 py-2 pr-2 text-white rounded-xl cursor-pointer flex items-center  justify-center relative border border-zinc-300' }>
                <MdSend size={18}/>
                {!showFirst && <div className={"before:content-[''] absolute z-50 text-xs font-bold -right-1 -top-1   "}>
                  <span class="relative flex h-3 w-3">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-85"></span>
                    <span class="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                  </span>
                </div>}
              </div>
          </div>

        </div>

      </div>
    </div>
  )
}