import React,{useEffect} from 'react'
import {Outlet} from 'react-router-dom';
import AdminNavbar from './Components/AdminNavbar';
function SpaceshipLayout() {
  useEffect(() => {
    document.body.style.backgroundColor = `#ddd`;

  }, [])
  return (
    <React.Fragment>
        <AdminNavbar />
        <div className='flex text-white'>

          <Outlet />
        </div>


    </React.Fragment>
  )
}

export default SpaceshipLayout