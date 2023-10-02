import React,{useState,useEffect} from 'react'
import {auth} from '../firebaseConfig/fireauth'
import {  onAuthStateChanged } from "firebase/auth";

export const AuthContext = React.createContext();

export const AuthProvider = ({children}) =>{
  const [currentUser , setCurrentUser] = useState(null)
  const [pending, setPending] = useState(true);

  useEffect(()=>{
    onAuthStateChanged(auth , (user)=>{
      setCurrentUser(user)
      setPending(false)
    })
  },[])
  if(pending){
    return <>Loading...</>
  }

  return (
    <AuthContext.Provider
    value={{currentUser}}
    >
      {children}

    </AuthContext.Provider>
  )
}
