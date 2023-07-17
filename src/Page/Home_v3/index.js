import React,{useRef} from 'react'
import Navbar from './Navbar'
import Header from './Header'
import Section01 from './Section01'
import Section02 from './Section02'
import Section03 from './Section03'
import Section04 from './Section04'
import Secrtion05_countdown from './Secrtion05_countdown'
import Footer from './Footer'
function Index() {
  const myRef = useRef(null)
  const executeScroll = () => myRef.current?.scrollIntoView({behavior: 'smooth'});
  return (
    <div className=''>
      <div className='w-10/12 mx-auto'>
        <Header executeScroll={executeScroll}/>
        <Secrtion05_countdown />
        <div ref={myRef}>
          <Section01 />
        </div>
        <Section02 />
        <Section03 />
      </div>

  
      <Section04 />

    </div>
  )
}

export default Index