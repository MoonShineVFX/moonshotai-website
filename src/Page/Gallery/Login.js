import React, { useState, useEffect } from 'react';
import liff from '@line/liff';
function Login() {
  const [profile, setProfile] = useState(null);
  const [token, setToken] = useState(null);
  const initializeLineLogin = async () => {
    try {
      await liff.init({ liffId: "1660658719-0BvpAjkG" })
      if (liff.isLoggedIn()) {
        const profile = await liff.getProfile();
        console.log(profile)
        setProfile(profile);
        fetchlinelogin(profile)
      } else {
        liff.login();
      } 
    } catch (error) {
      console.log(error)
    }
  };
  const fetchlinelogin = ()=>{
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Token ${process.env.REACT_APP_MOONSHOT_LINELOGIN_APIKEY}`
      },
      body: JSON.stringify({ 
        uid:  profile.userId,
        name: profile.displayName ,
        profile_image: profile.pictureUrl ,
      })
    };
    fetch('https://api.moonshot.today/line_login', requestOptions)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setToken(data)
      });
  }
  const handleClick = () => {
    initializeLineLogin()
  };
  const logout = ()=>{
    liff.logout()
    window.location.reload();
  }
  const getLineProfile =  () => {
    liff.getProfile().then(profile=>{
      console.log(profile)
      setProfile(profile)
    }).catch(err => console.log(err))

  };


  useEffect(() => {

    // initializeLineLogin();
  }, []);

  return (
    <div className='text-white'>
      <div>
      <button onClick={handleClick}>Login with LINE</button>
        {profile &&
          <div>
            <p>{`Hello, ${profile.displayName}`}</p>
            <p>{`Your user ID is: ${profile.userId}`}</p>
          </div>
        }
      </div>
    </div>
  )
}

export default Login