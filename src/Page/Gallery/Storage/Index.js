import React, { useState, useEffect } from 'react'
import Header from '../Components/header'
import liff from '@line/liff';
import { loginState, userState } from '../atoms/galleryAtom';
import {  useRecoilValue ,useRecoilState } from 'recoil';
const liffID = process.env.REACT_APP_LIFF_LOGIN_ID
const dropDownManuItem = [
  {title:"Renders", display:true},
  {title:"Storage", display:false},
  {title:"Collection", display:false},
  {title:"Following",display:false},
]
function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [images, setImages] = useState([]);
  const [imagesResults, setImagesResults] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentProfile, setCurrentProfile] = useRecoilState(userState);
  const [currentDropDownItem, setCurrentDropDownItem] = useState(dropDownManuItem[0])
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)
  const [token, setToken] = useRecoilState(loginState)
  const initializeLineLogin = async () => {
    liff.init({
      liffId: liffID
    }).then(function() {
      console.log('LIFF init');
      if (liff.isLoggedIn()) {
        const accessToken = liff.getAccessToken();
        setIsLoggedIn(true)
        // console.log("getAccessToken", accessToken);
        if(accessToken){

          liff.getProfile().then(profile=>{
            console.log(profile)
            setCurrentProfile(profile)
            fetchUserImages(profile)
            fetchlinelogin(profile)
          }).catch(err => console.log(err))
        }


      } else {
        liff.login();
      }

    
    }).catch(function(error) {
      console.log(error);
    });
  }
  useEffect(() => {
    initializeLineLogin()
  }, []);
  return (
    <div>
      <Header isLoggedIn={isLoggedIn}/>
    </div>
  )
}

export default Index