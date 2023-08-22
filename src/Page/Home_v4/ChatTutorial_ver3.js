import React,{useState} from 'react'
import { ver2LineItem } from '../../Components/ItemData'
import { ImageStepModeV3,TextSteoMode1V3 } from '../../Components/StepModeItems';
import { Button } from "@material-tailwind/react";
function ChatTutorial_ver3() {
  const [data,setData] = useState(ver2LineItem[0])
  const [currentDataIndex , setCurrentDataIndex] = useState(0)
  const [mode,setMode] = useState('text')
  const handleClick = (mode,index) =>{
    setCurrentDataIndex(index)
    setMode(mode)
    setData(ver2LineItem[index])
  }


  return (
    <div className='mx-8  md:w-8/12 md:mx-auto'>

    <div className='py-5 md:py-10  '>

      <div className='flex flex-col'>
        <div id="menu" className='text-center text-sm my-4 md:my-10 flex justify-between items-center md:w-2/3 mx-auto gap-3'>
          {
            ver2LineItem.map((item,index)=>{
              return(
                <Button
                  key={'m'+index} 
                  onClick={()=>{handleClick(item.mode,index)}}
                  className={'relative rounded-full font-bold capitalize text-sm   max-w-[180px] border border-[#BDDE48] ' + (currentDataIndex === index ? ' bg-[#BDDE48] text-black '  : ' bg-black  ' )}
                >
    
                  {item.title}

                </Button>
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