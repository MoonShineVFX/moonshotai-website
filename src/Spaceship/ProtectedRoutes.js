import React, { useContext }  from 'react';

import {Navigate, Outlet} from 'react-router-dom'
import { AuthContext } from "./Auth";
import SpaceshipLayout from './SpaceshipLayout';
const useAuth=()=>{
  const user = useContext(AuthContext);
  if(user.currentUser){
    return true
  } else {
    return false
  }
}

const  ProtectedRoutes=() =>{

  const auth=useAuth()

  return auth?  (<SpaceshipLayout><Outlet/></SpaceshipLayout>) : <Navigate to="/"/>
}

export default ProtectedRoutes;