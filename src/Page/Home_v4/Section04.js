import React,{useEffect,useState} from 'react'
import {isMobile} from 'react-device-detect';
import RandomImagesBg from '../../Components/RandomImagesBg';
import {headerImagesItem} from '../../Components/ItemData'
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { Button } from "@material-tailwind/react";
function Section04() {
  const [imgData , setImgData] = useState(headerImagesItem)
  const half = Math.ceil(headerImagesItem.length / 2);    
  const firstHalf = headerImagesItem.slice(0, half)

  function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }
  const shuffledData1 = shuffle(JSON.parse(JSON.stringify(imgData)));
  const shuffledData2 = shuffle(JSON.parse(JSON.stringify(imgData)));
  useEffect(()=>{
    if(isMobile){
      setImgData(firstHalf)
    }
  },[])
  return (
    <div className=' relative my-16'>
      <div className='overflow-hidden'>
        <div className='  w-[1000px] md:w-[2000px] opacity-50 mb-6   relative' id="headerBg2">
          <RandomImagesBg data={shuffledData1} seed={18976}/>
        </div>
        <div className='  w-[1000px] md:w-[2000px] opacity-50  relative' id="headerBg3">
          <RandomImagesBg data={shuffledData2} seed={2345}/>
        </div>
      </div>
      <Button variant="none" className="rounded-full bg-[#423EF5] text-white font-bold capitalize text-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <a 
          href="/gallery"
          target={"_blank"} rel="noreferrer"
        >See Gallery  </a>
      </Button>
      {/* <a 
        className='w-1/2 text-center px-2 py-2 rounded-full bg-[#423EF5] text-white   flex justify-center items-center  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
        href="/gallery"
        target={"_blank"} rel="noreferrer"
      >
        <span className='pr-2  font-bold'>See Gallery</span>   <MdOutlineArrowRightAlt />
      </a> */}
    </div>
  )
}

export default Section04