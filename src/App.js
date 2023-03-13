
import React,{useEffect} from 'react'
import { BrowserRouter , Routes, Route} from 'react-router-dom';

import Home from './Page/Home'
import Camera from './Page/Camera'
import AOS from 'aos';
import 'aos/dist/aos.css';
function App() {
  useEffect(() => {
    AOS.init();
  }, [])
  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="/camera" element={<Camera />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
