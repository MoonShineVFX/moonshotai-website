import React, { useState, useEffect } from 'react';
import liff from '@line/liff';
function Login() {
  const [profile, setProfile] = useState(null);
  const initializeLineLogin = async () => {
    try {
      await liff.init({ liffId: "1660658719-0BvpAjkG" })
      if (liff.isLoggedIn()) {
        const profile = await liff.getProfile();
        setProfile(profile);
      } else {
        liff.login();
      } 
    } catch (error) {
      console.log(error)
    }
  };
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