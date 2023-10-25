import React,{useEffect} from 'react'
import {Outlet} from 'react-router-dom';
import AdminNavbar from './Components/AdminNavbar';
import AdminSidebar from './Components/AdminSidebar';
function SpaceshipLayout() {
  useEffect(() => {
    document.body.style.backgroundColor = `#ddd`;

  }, [])
  return (
    <div className=' flex flex-col h-screen'>
        <AdminNavbar />
        <div className=' flex overflow-hidden  relative flex-nowrap flex-grow'>
          <AdminSidebar />
          <div className='flex text-white w-full p-4'>
            <div className=' overflow-y-auto min-w-full'>
              <Outlet />
            </div>

            
          </div>
        </div>





    </div>
  )
}

export default SpaceshipLayout