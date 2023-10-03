import React,{useEffect} from 'react'
import {Outlet} from 'react-router-dom';
function SpaceshipLayout() {
  useEffect(() => {
    document.body.style.backgroundColor = `#ddd`;

  }, [])
  return (
    <React.Fragment>
        <div className='flex text-white'>
          <Outlet />
        </div>


    </React.Fragment>
  )
}

export default SpaceshipLayout