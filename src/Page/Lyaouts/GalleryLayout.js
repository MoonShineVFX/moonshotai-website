import React from 'react'
import { Outlet} from 'react-router-dom';


import Header from '../Gallery/header'
const GalleryLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default GalleryLayout