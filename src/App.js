
import React,{useEffect} from 'react'
import Header from "./Header";
import Footer from "./Footer";
import Section1 from "./Section1";
import Section2 from './Section2';
import CallToAction from './CallToAction';
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
      <Section2 />
      <Footer />
      <CallToAction />

    </div>
  );
}

export default App;
