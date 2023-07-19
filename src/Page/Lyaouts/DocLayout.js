import React from 'react'
import { Outlet} from 'react-router-dom';

import MainNavbar from '../Home_v3/Navbar';
import Navbar from '../DocPage/Navbar';

function DocLayout() {
  return (
    <>
      <MainNavbar />
      <div className=' relative'>
        <Navbar />
        <div className='  w-full  mx-auto px-5 pt-20 md:pt-10 md:pl-[300px]'>
          <Outlet />
        </div>

      </div>

    </>
  )
}

export default DocLayout