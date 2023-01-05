import React,{useState,useEffect} from 'react'
import { workitems,workitems2 } from './Components/ItemData'
import { motion } from "framer-motion";
function Section2() {
  const [data,setData] = useState(workitems)
  const [currentDataIndex , setCurrentDataIndex] = useState(0)
  const [currentItem , setCurrentItem] = useState(0)
  const [mode,setMode] = useState('text')
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
        setData(workitems)
        break;
      default:
        break;
    }
  }
  const menuitems = [
    {
      id:1,
      title:"以字生圖",
      mode:'text'
    },
    {
      id:2,
      title:"以圖生圖",
      mode:'image'
    },
    {
      id:3,
      title:"其他",
      mode:'text'
    },
  ]
  const TextMode = ({data})=>{
    return (
      <ul className="space-y-4 pt-32">
        <li className="flex justify-end">
          <div className=' '>
            <div className='relative max-w-xl text-right text-zinc-400 text-sm font-bold mb-1'>User</div>
            <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-[#85e248] rounded-2xl shadow">
              <span className="block">{data[currentDataIndex].message}</span>
            </div>
          </div>
        </li>

        <li className="flex justify-start">
          <div>
            <div className='relative max-w-xl text-left text-zinc-400 text-sm font-bold mb-1'>Moonshot</div>
            <div id="bot-images" className="relative max-w-xl text-gray-700 rounded shadow overflow-hidden ">
              <div className='flex gap-3 overflow-y-auto pb-3'>
                {
                  data[currentDataIndex].images.map((item,index)=>{
                    return(
                      <img src={process.env.PUBLIC_URL+'/images/'+item} alt=""  className=' rounded-md w-5/12'/>
                    )
                  })
                }

              </div>
            </div>
          </div>
        </li>
      </ul>
    )
  }
  const ImageMode = ({data}) =>{
    return (
      <ul className="space-y-4 pt-10">
        <li className="flex justify-end">
          <div className=' '>
            <div className='relative max-w-xl text-right text-zinc-400 text-sm font-bold mb-1'>User</div>
            <div className="relative max-w-xl px-4 py-2 text-gray-700  rounded-2xl shadow ">
              <img src={process.env.PUBLIC_URL+'/images/'+data[currentDataIndex].image} alt=""  className=' rounded-md w-full'/>
            </div>
          </div>
        </li>
        <li className="flex justify-end">
          <div className=' '>
            <div className='relative max-w-xl text-right text-zinc-400 text-sm font-bold mb-1'>User</div>
            <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-[#85e248] rounded-2xl shadow">
              <span className="block">{data[currentDataIndex].message}</span>
            </div>
          </div>
        </li>

        <li className="flex justify-start">
          <div>
            <div className='relative max-w-xl text-left text-zinc-400 text-sm font-bold mb-1'>Moonshot</div>
            <div id="bot-images" className="relative max-w-xl text-gray-700 rounded shadow overflow-hidden ">
              <div className='flex gap-3 overflow-y-auto pb-3'>
                {
                  data[currentDataIndex].images.map((item,index)=>{
                    return(
                      <img src={process.env.PUBLIC_URL+'/images/'+item} alt=""  className=' rounded-md w-5/12'/>
                    )
                  })
                }

              </div>
            </div>
          </div>
        </li>
      </ul>
    )
  }
  
  useEffect(()=>{
  },[])
  return (
    <div className='my-10 w-11/12 mx-auto md:w-1/2'>
      <div className='text-3xl font-extrabold mb-10 text-white'>
        你可以 <br />
        讓 Moonshot 幫你畫圖
      </div>
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
                  {data && mode === 'image' ? 
                    <ImageMode data={data}/>
                  :
                    <TextMode data={data}/>
                  }

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