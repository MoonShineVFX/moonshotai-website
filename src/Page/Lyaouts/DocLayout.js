import React,{useEffect} from 'react'
import { Outlet} from 'react-router-dom';

import MainNavbar from '../Home_v3/Navbar';
import Navbar from '../DocPage/Navbar';
import { useLocation } from 'react-router-dom';
function DocLayout() {
  const { pathname } = useLocation();

  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      {/* <MainNavbar /> */}
      <div className=' relative'>
        <Navbar />
        <div className=' w-full  mx-auto px-0 pt-20 md:pt-10 md:pl-[300px]'>
          <Outlet />
        </div>

      </div>

    </>
  )
}

export default DocLayout