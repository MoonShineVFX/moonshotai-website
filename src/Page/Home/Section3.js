import React,{useState} from 'react'
import { newVerWorkItem2 } from '../../Components/ItemData'
import { AnimatePresence,motion } from "framer-motion";
import { MdArrowForward } from "react-icons/md";

function Section3() {
  const [data,setData] = useState(newVerWorkItem2)
  const [currentDataIndex , setCurrentDataIndex] = useState(0)
  const [currentItem , setCurrentItem] = useState(0)
  const handleClick = (id) =>{
    setCurrentDataIndex(id)
  }
  return (
    <div className='text-white my-36 w-11/12 mx-auto'>
      <div className='text-4xl text-center font-bold mb-8'>Make Your <span className='font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-lime-300 to-lime-500'>Own Creation</span></div>
      {newVerWorkItem2 && <div className='flex flex-col md:flex-row justify-center gap-4'>
        {
          newVerWorkItem2.map((item,index)=>{
            const {id,title,pro} = item
            return(
              <div 
                key={'new'+id} 
                onClick={()=>{handleClick(index)}}
                className={' py-2 px-5 rounded-full text-sm transition-all cursor-pointer hover:text-black hover:bg-[#BDDE48] relative '  + (currentDataIndex === index ? ' bg-[#BDDE48] text-black'  : ' bg-gray-700 text-white/60' )}>
                  {title}
                  {pro && <div className={"before:content-[''] absolute z-50 text-xs font-bold -right-1 -top-1  rotate-12 " + (currentDataIndex === index ? '  text-rose-400 '  : '  text-rose-400' )}>PRO</div> }
              </div>
            )
          })
        }
      </div>

      }
      <AnimatePresence mode="wait"  initial={false} > 
      <motion.div  className='flex flex-col md:flex-row items-start justify-center gap-10 my-32 w-10/12 mx-auto relative min-h-[400px] ' key={'item'+newVerWorkItem2[currentDataIndex].id}>
      {
        newVerWorkItem2 &&
          
            newVerWorkItem2[currentDataIndex].images.map((item,index)=>{
            return(
              <motion.div
                className=' relative w-full  md:w-1/3 hover:w-1/2 transition-all duration-300'
                initial={{ opacity: 0,y:0 }}
                animate={{ opacity: 1,y:0 }}
                exit={{ opacity: 0,y:0 }}
                transition={{
                  ease: "easeInOut",
                  duration: 0.3,
                  delay: 0,
                }}
              > 
                <div className=' relative'>
                  <img src={ process.env.PUBLIC_URL+'/images/ver2_images/work/'+item.img} alt=""  className='w-full rounded-3xl'/>
                </div>
                <div className='flex flex-col justify-center my-4 '>
                  <div className='text-center text-white/80'>{item.title}</div> 
                  <div className='text-sm text-white/30 my-2 whitespace-normal border p-3 rounded-md border-white/20 hidden'>{item.description}</div>
                </div>
              </motion.div>
            )
          })

      }
      </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default Section3