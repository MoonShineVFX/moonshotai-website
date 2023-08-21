import React,{useRef} from 'react'
import Header from './Header'
import Section01 from './Section01'
import Section02 from './Section02'
import Section03 from './Section03'
import Section04 from './Section04'
import Secrtion05Countdown from './Secrtion05_countdown'
import HomeFooter from './HomeFooter'
function Index() {
  const myRef = useRef(null)
  const executeScroll = () => myRef.current?.scrollIntoView({behavior: 'smooth'});
  return (
    <div className=''>

      <div className='md:w-10/12 mx-auto'>
        <Header executeScroll={executeScroll}/>

        <div ref={myRef}>
          <Section01 />
        </div>
        <Section02 />
        <Section03 />
      </div>

      <Section04 />
      <HomeFooter />
    </div>
  )
}

export default Index