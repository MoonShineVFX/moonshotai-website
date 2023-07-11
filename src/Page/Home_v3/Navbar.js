import React,{useState} from 'react'
import { Link } from "react-router-dom";
import { FaBars,FaTimes } from "react-icons/fa";
import { MdHomeFilled,MdDashboard,MdLogin, MdAssignmentInd,MdStar,MdDocumentScanner,MdAssignment } from "react-icons/md";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='  text-white lg:border-b border-[#3c4756] w-full z-50 relative '>
          <div className='flex flex-row flex-wrap justify-between z-50  relatives bg-[#1e1e1e] p-3 '>
            <div className=' items-center  text-white mr-6 gap-2 pt-1  flex lg:flex'>
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

          <div 
            onClick={() => setIsOpen(!isOpen)}
            className={`bg-black/60 fixed w-full h-screen top-0 left-0 ease-in-out transition-all duration-300 -z-20  ${isOpen ? ' opacity-100' : 'hidden opacity-0'}`}>
          </div>
          <div className={`bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#49531F] via-black  to-black-600 transform top-0 left-0 w-full bg-[#333] fixed h-auto overflow-auto ease-in-out transition-all duration-500 -z-10 flex flex-col p-8 ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
          <div className='flex items-center  text-white mr-6 gap-2 '>
              <div className='text-3xl font-black w-24  lg:w-32'>
                <img src={process.env.PUBLIC_URL+'/images/ver2_images/mslogo.svg'} alt="" className='w-full'/>
              </div>
          </div>
          <div className='my-7 flex flex-col text-white/90 justify-between items-center'>

              <div className='my-3 text-center flex flex-col  font-bold'>
                <Link 
                  to='/' 
                  className='p-2 cursor-pointer  hover:bg-gray-600 '>
                  Home  
                </Link>
                <Link 
                  to='/price' 
                  className='p-2 cursor-pointer  hover:bg-gray-600'>
                    Price
                </Link>
                <Link 
                  to='/gallery' 
                  className='p-2 cursor-pointer  hover:bg-gray-600 '>
                    Gallery
                </Link>
                <Link 
                  to='/docs' 
                  className='p-2 cursor-pointer  hover:bg-gray-600 '>
                   Documents
                </Link>

              </div>


            </div>


        </div>
   </div>
  )
}

export default Navbar