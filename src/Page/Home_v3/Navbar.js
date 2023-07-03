import React,{useState} from 'react'
import { Link } from "react-router-dom";
import { FaBars,FaTimes } from "react-icons/fa";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className=' top-0 text-white lg:border-b border-[#3c4756] p-3 w-full  bg-white/10 z-50 flex flex-row flex-wrap 
   justify-between '>
          <div className=' items-center  text-white mr-6 gap-2 pt-1 flex lg:flex'>
              <a href='/' className='font-black w-24 lg:w-32'>
                <img src={process.env.PUBLIC_URL+'/images/ver2_images/mslogo.svg'} alt="" className='w-full'/>
              </a>
              <div className='lg:text-xl'></div>
          </div>
          <div className="block lg:hidden ml-auto">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
              >
                <div className={`fill-current h-3 w-3 ${isOpen ? "hidden" : "block"}`}><FaBars /></div>
                <div className={`fill-current h-3 w-3 ${isOpen ? "block" : "hidden"}`}><FaTimes /></div>
              </button>
          </div>
   </div>
  )
}

export default Navbar