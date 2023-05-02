import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Header from '../header'
function Index() {

  return (
    <div className='w-full'>
      <Header />
      <div className='w-10/12 mx-auto my-10'>
       
        <div className='text-white'>
          Here is Gallery HomePage, nothing yet. You can <Link to='/profile' className='text-blue-400 hover:text-blue-300'>Login with Line Account</Link> 
        </div>
       
      </div>


    </div>
  )
}

export default Index