import React, { useState, useEffect }  from 'react'
import { MdKeyboardArrowDown,MdAccessTime } from "react-icons/md";
import {motion,AnimatePresence} from 'framer-motion'
function ImgFilter({filterItems,defaultIndex,onHandleSelect}) {
  const [currentFilterDateItem, setCurrentFilterDateItem] = useState(filterItems[defaultIndex])
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)
  const dropdownVariants = {
    open: {
      opacity: 1,
      display:'block',
      transition: {
        duration: 0.2,
      },
    },
    closed: {
      opacity: 0,
      display:'none',
      transition: {
        duration: 0.2,
      },
    },
  };
  const toggleDropdown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };
  const handleClickOption =(item)=>{
    setCurrentFilterDateItem(item)
    setIsDropDownOpen(!isDropDownOpen);
    onHandleSelect(item)

  }
  if(filterItems.length === 0) {
    return(
      <div className='text-white'>Loading</div>
    )
  }
return ( 
    <div className=' relative   '>
      <div 
        className='text-white px-2 py-2 bg-gray-700  rounded-full flex  justify-center items-center min-w-[70px]'
        onClick={toggleDropdown}
      >
        <div className=' absolute text-xs -top-4 left-1 hidden'>{currentFilterDateItem.type}</div>
        <MdAccessTime size={18}/><span className=' rounded-xl px-0 ml-1 text-xs'>{currentFilterDateItem.title} </span> 
      </div>
        <motion.div
          className={`fixed w-full h-screen top-0 left-0 bg-black/30 z-20 ${isDropDownOpen ? ' ' : ' hidden'}` }
          variants={dropdownVariants}
          initial="closed"
          animate={isDropDownOpen ? 'open' : 'closed'}
          onClick={toggleDropdown}
        ></motion.div>
        <motion.div 
          className={`text-white  absolute rounded-lg bg-[#444] my-2 w-full  border-white/20 z-30  ` }
          variants={dropdownVariants}
          initial="closed"
          animate={isDropDownOpen ? 'open' : 'closed'}
        >
          {filterItems.map((item,index)=>{
            return(
              <div 
                key={item.title} 
                className='hover:bg-[#555] px-2 py-3 text-xs rounded-lg'
                onClick={()=>{
                  handleClickOption(item)
                }}
              ><span className=' rounded-xl px-2 py-0 mr-1  whitespace-nowrap'>{item.title}</span> </div>
            )
          })}
        </motion.div>
      


    </div>
  )
}

export default ImgFilter