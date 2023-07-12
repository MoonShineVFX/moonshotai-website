import React,{useEffect,useState,useRef} from 'react'
import {isMobile} from 'react-device-detect';
import HeaderImagesBg from '../../Components/HeaderImagesBg'
import {headerImagesItem} from '../../Components/ItemData'
import { MdArticle,MdLaunch,MdOutlineArrowRightAlt } from "react-icons/md";
function Section04() {
  const [imgData , setImgData] = useState(headerImagesItem)
  const half = Math.ceil(headerImagesItem.length / 2);    
  const firstHalf = headerImagesItem.slice(0, half)
  useEffect(()=>{
    if(isMobile){
      setImgData(firstHalf)
    }
    console.log(imgData)
  },[])
  return (
    <div className=' relative my-6'>
      
      <div className='  w-[1000px] md:w-[2500px] opacity-50 h-[450px] overflow-hidden' id="headerBg">
        <HeaderImagesBg  data={imgData}/>
      </div>
      <a 
        className='w-1/2 text-center px-2 py-2 rounded-full bg-gradient-to-l from-[#BDDE48] via-[#C0CFA6] to-[#C2C1FD] text-black  flex justify-center items-center  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
        href="https://medium.com/@ai_72180"
        target={"_blank"} rel="noreferrer"
      >
        <span className='pr-2'>See Gallery</span>   <MdOutlineArrowRightAlt />
      </a>
    </div>
  )
}

export default Section04