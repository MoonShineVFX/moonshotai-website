import React, { useState, useEffect }  from 'react'
import { MdKeyboardArrowDown,MdAccessTime } from "react-icons/md";
import {motion,AnimatePresence} from 'framer-motion'
import { 
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,Button } from "@material-tailwind/react";
import { Icon } from '../helpers/componentsHelper';
function ImgFilter({filterItems,defaultIndex,onHandleSelect,icon}) {
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
    <Menu className=' relative   ' placement="bottom-end">
      <MenuHandler >  
        <Button className="flex items-center justify-center gap-1  rounded-full py-2 px-1 min-w-[75px] " >
          <Icon nameIcon={icon} propsIcon={{ size: 20 }} /> 
          {currentFilterDateItem.title}
        </Button>
      </MenuHandler>
      <MenuList className='bg-gray-900 text-white border-0 p-2 min-w-[100px]' >

          {filterItems.map((item,index)=>{
            return(
              <MenuItem 
                key={item.title} 
                className='  text-xs  '
                onClick={()=>{
                  handleClickOption(item)
                }}
              ><span className=' whitespace-nowrap'>{item.title}</span> 
              </MenuItem>
            )
          })}
    
      </MenuList>



      


    </Menu>
  )
}

export default ImgFilter