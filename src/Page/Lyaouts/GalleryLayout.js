import React,{useEffect,useState} from 'react'
import { Outlet,Link} from 'react-router-dom';


import Header from '../Gallery/header'
import Footer from '../Home_v3/Footer';
const GalleryLayout = () => {
  const [stickyClass, setStickyClass] = useState(false);
  const stickNavbar = () => {
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
    <>
      <a href='https://asusmeta.co/nft_plaza/event' target='_blank' rel="noreferrer" className={`fixed bottom-16 right-4 z-50 block w-[22vw] max-w-[110px] transition delay-500 duration-300 ${stickyClass ? '  translate-x-32 opacity-0  ' :  '  translate-x-0 opacity-100 '}`}><img src="https://moonshine.b-cdn.net/msweb/moonshotai/campaign/asus_nft/nft_icon.png" alt="asus nft" className='w-full' /></a>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default GalleryLayout