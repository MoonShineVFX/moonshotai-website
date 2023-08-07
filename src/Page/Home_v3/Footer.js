import React,{useState,useEffect} from 'react'
import { FaFacebook,FaInstagram,FaTwitter,FaLinkedinIn,FaDiscord,FaYoutube } from "react-icons/fa";

function Footer() {
  const [stickyClass, setStickyClass] = useState(false);
  const stickNavbar = () => {
    console.log('scroll')
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 200 ? setStickyClass(true) : setStickyClass(false);
    }
  };
  useEffect(()=>{
    // setStickyClass(false)
    
    window.addEventListener('scroll', stickNavbar);

    return () => {
      window.removeEventListener('scroll', stickNavbar);
    };
  },[])
  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50  text-white/80 p-2 border-t border-white/30 bg-black transition duration-500 space-y-2 md:space-y-0 delay-75 flex justify-center items-center flex-col md:flex-row md:space-x-5 ${stickyClass ? '  translate-y-32 opacity-0  ' :  '  translate-y-0 opacity-100 '} `}>
        <div className='flex  items-center justify-center space-x-5 '>
          <a href='https://twitter.com/MoonshotAI_' target="_blank" rel="noopener noreferrer" ><FaTwitter size={16}  /></a>
          <a href='https://www.youtube.com/channel/UCT0noXFjgZ30lLCwZjJYdgQ' target="_blank" rel="noopener noreferrer" > 
          <FaYoutube size={16} />
          </a>
        </div>     
        <div className='flex items-center space-x-7 justify-center text-xs '>
          <div className='flex items-center '>  ©  
            <a href='/' className=' w-20 lg:w-20'>
              <img src={process.env.PUBLIC_URL+'/images/ver2_images/mslogo.svg'} alt="logo" className='ml-2 w-full p-0 mt-0'/>
            </a>
          </div>
          <a href="/docs/terms" className='font-semibold whitespace-nowrap'>Terms of Use</a>
          <a href="/docs/policy" className='font-semibold whitespace-nowrap'>Privacy Policy</a>

        </div> 

    </div>
  )
}

export default Footer