import React,{useState,useEffect} from 'react'
import { workitems,workitems2,workitems3 } from './Components/ItemData'
import { TextMode,ImageMode,EtcMode } from './Components/ModeItems';
import { AnimatePresence,motion } from "framer-motion";
function Section2() {
  const [data,setData] = useState(workitems)
  const [currentDataIndex , setCurrentDataIndex] = useState(0)
  const [currentItem , setCurrentItem] = useState(0)
  const [mode,setMode] = useState('text')
  const [title,setTitle] = useState('')
  const handleClick = (id) =>{
    setCurrentDataIndex(id)
  }
  const handleClickMenu = (mode,index) =>{
    setCurrentItem(index)
    setMode(mode)
    switch (index) {
      case 0:
        setData(workitems)
        break;
      case 1:
        setData(workitems2)
        break;
      case 2:
        setData(workitems3)
        break;
      default:
        break;
    }
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
    },
    {
      id:3,
      title:"其他",
      mode:'etc',
      slogan:"還可以\n單純的聊聊天"
    },
  ]


  
  useEffect(()=>{
  },[])
  return (
    <div className='my-10 w-11/12 mx-auto md:w-[460px]'>
      <AnimatePresence initial={false}> 
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
          {menuitems[currentItem].slogan}
        </motion.div>
      </AnimatePresence>

      <div className='flex flex-col '>
        <div id="menu" className='flex justify-start gap-1  pb-1'>
          {
            menuitems.map((item,index)=>{
              return(
                <div
                  key={'m'+index} 
                  onClick={()=>{handleClickMenu(item.mode,index)}}
                  className={' hover:bg-[#324567]  text-white w-1/3 rounded-t-2xl text-center p-2  cursor-pointer ' + (currentItem === index ? ' bg-[#324567]'  : ' bg-[#273145]' )}
                >{item.title}</div>
              )
            })
          }
        </div>
        <div id="chat" className="mx-auto w-full">
          <div className=" rounded-md bg-[#232F46]">
            <div>
              <div className="w-full">
                <div className="relative w-full p-3 overflow-y-auto min-h-[30rem]">
                 
                  {( ()=>{
                    switch (mode) {
                      case 'image':
                        return <ImageMode data={data} currentDataIndex={currentDataIndex}/>;
                      case 'text':
                        return <TextMode data={data} currentDataIndex={currentDataIndex}/>;
                      case 'etc':
                        return <EtcMode data={data} currentDataIndex={currentDataIndex}/>;
                      default: return null;
                    }
                  }

                  )()}

                </div>
                <div className="grid  grid-cols-4 justify-center w-full p-3 border-t border-gray-600 gap-2"> 
                  {
                    data.map((item,index)=>{
                      return(
                        <div 
                          onClick={()=>{handleClick(index)}}
                          className={'bg-[#B5DF0F] text-zinc-600  text-center p-1  rounded-3xl cursor-pointer ' + (currentDataIndex === index ? 'bg-[#d1e67c]' : ' bg-[#B5DF0F]' )}>{item.title}</div>
                      )
                    })
                  }

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
                
      
    </div>
  )
}

export default Section2