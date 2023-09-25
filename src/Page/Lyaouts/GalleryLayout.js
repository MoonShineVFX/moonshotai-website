import React,{useEffect,useState} from 'react'
import { Outlet} from 'react-router-dom';


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
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default GalleryLayout