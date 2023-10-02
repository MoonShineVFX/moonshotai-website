import React,{useEffect, useRef} from 'react'
import Header from './Header'
import Section01 from './Section01'
import Section02 from './Section02'
import Section03 from './Section03'
import Section04 from './Section04'
import Secrtion05Countdown from './Secrtion05_countdown'
import Section_about from './Section_about'
import Section_models from './Section_models'
import HomeFooter from './HomeFooter'
import { getAnalytics, logEvent } from "firebase/analytics";
function Index() {
  const myRef = useRef(null)
  const executeScroll = () => myRef.current?.scrollIntoView({behavior: 'smooth'});
  const analytics = getAnalytics();
  useEffect(()=>{
    logEvent(analytics, 'homepage_visited')
  },[])
  return (
    <div className=''>

     
      <Header executeScroll={executeScroll}/>
      <Section_about />
      <div className='md:w-9/12 mx-auto'>    
        <div ref={myRef}>
      
          <Section01 />
          <Section02 />
        </div>
        <Section_models />
        <Section03 />


      </div>
      <Section04 />
      <HomeFooter />
    </div>
  )
}

export default Index