
import React,{useEffect} from 'react'
import { BrowserRouter , Routes, Route} from 'react-router-dom';

import Home from './Page/Home'
import Camera from './Page/Camera'
// import Docs from './Page/Docs'
import AOS from 'aos';
import 'aos/dist/aos.css';
import Gallery from './Page/Gallery/Gallery';
import GalleryV2 from './Page/Gallery/Gallery/index_v2';
import Profile from './Page/Gallery/Profile';
import Post from './Page/Gallery/Gallery/Post';
import User from './Page/Gallery/Gallery/User';
import Price from './Page/Gallery/PricePage';
import Confirm from './Page/Gallery/PricePage/Confirm';
import Cancel from './Page/Gallery/PricePage/Cancel';
import Docs from './Page/Gallery/Docs'
import Notfound from './Page/Home/Notfound';
import {removeLocalStorageItem} from './Page/Gallery/helpers/fetchHelper'
import { RecoilRoot } from 'recoil';

function App() {
  useEffect(() => {
    AOS.init();
  }, [])
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (performance.navigation.type !== 1) {
        // removeLocalStorageItem().then(data=>console.log(data))
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <RecoilRoot>
    <BrowserRouter>
      <Routes> 
        <Route path="*" element={<Notfound />} />

        <Route path="/" element={<Home />} />
        <Route path="/camera" element={<Camera />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gv2" element={<GalleryV2 />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/price" element={<Price />} />
        <Route path="/confirm/:id" element={<Confirm />} />
        <Route path="/cancel/:id" element={<Cancel />} />

        {/* <Route path="/storages" element={<Storages />} /> */}

      </Routes>
    </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
