
import React,{useEffect} from 'react'
import Header from "./Header";
import Footer from "./Footer";
import Section1 from "./Section1";
import AOS from 'aos';
import 'aos/dist/aos.css';
function App() {
  useEffect(() => {
    AOS.init();
  }, [])
  return (
    <div className="App">
      <Header />
      <Section1 />
      <div>2</div>
      <Footer />

    </div>
  );
}

export default App;
