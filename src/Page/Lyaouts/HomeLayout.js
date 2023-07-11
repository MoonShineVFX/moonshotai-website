import React from 'react'
import { Outlet} from 'react-router-dom';

import Navbar from '../Home_v3/Navbar';
import Footer from '../Home_v3/Footer';

function HomeLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default HomeLayout