import React from 'react'
import Header from "./Header";
import Footer from "./Footer";
import Section1 from "./Section1";
import Section2 from './Section2';
import CallToAction from './CallToAction';
function index() {
  return (
    <div id="home">
      <Header />
      <Section2 />

      
      <Section1 />
      <CallToAction />
      <Footer />
    </div>
  )
}

export default index