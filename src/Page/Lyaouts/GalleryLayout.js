import React from 'react'
import { Outlet} from 'react-router-dom';


import Header from '../Gallery/header'
import Footer from '../Home_v3/Footer';
const GalleryLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default GalleryLayout