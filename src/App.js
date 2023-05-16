
import React,{useEffect} from 'react'
import { BrowserRouter , Routes, Route} from 'react-router-dom';

import Home from './Page/Home'
import Camera from './Page/Camera'
import Docs from './Page/Docs'
import AOS from 'aos';
import 'aos/dist/aos.css';
import Gallery from './Page/Gallery/Gallery';
import Profile from './Page/Gallery/Profile';
import Post from './Page/Gallery/Gallery/Post';
import { RecoilRoot } from 'recoil';
function App() {
  useEffect(() => {
    AOS.init();
  }, [])
  return (
    <RecoilRoot>
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="/camera" element={<Camera />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/storages" element={<Storages />} /> */}

      </Routes>
    </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
