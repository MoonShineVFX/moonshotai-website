import React ,{ useState } from 'react'
import ReactFullpage from '@fullpage/react-fullpage';
import Header from "./Header";
import Footer from "./Footer";
import Section1 from "./Section1";
import Section2 from './Section2';
import CallToAction from './CallToAction';
import Section3 from './Section3';
import Section2_ver2 from './Section2_ver2';
import Blog from './Blog';
import Section1_ver2 from './Section1_ver2';
import Section4 from './Section4';
import { AnimatePresence,motion } from "framer-motion";
function Modal(props) {
  return (
    <motion.div 
      className="modal fixed top-0 left-0 w-full h-screen  z-50" style={{ display: props.show ? "block" : "none" }}

    >
      <div className='fixed top-0 left-0 w-full h-screen bg-black/50' onClick={props.onClose}></div>
      {props.show&&
          <motion.div 
            className="modal-content bg-white w-10/12 md:w-8/12 relative mt-10 py-12 px-10 mx-auto  max-h-[90vh] overflow-y-auto  overflow-x-hidden"
            initial={{ opacity: 0,y:0 }}
            animate={{ opacity: 1,y:0 }}
            exit={{ opacity: 0,y:0 }}
            transition={{
              ease: "easeInOut",
              duration: 0.3,
              delay: 0.5,
            }}
          >
            <span className="bg-white top-2 right-2 absolute w-5 h-5 rounded-full flex justify-center items-center text-2xl z-20 cursor-pointer" onClick={props.onClose}>&times;</span>
            <div className='text-2xl font-bold'>關於我們</div>
            <div className='mt-2 mb-8 leading-9'>Moonshot 是一個能夠在 Line 上輕鬆使用的 AI 繪圖工具，可輕易地通過指令切換多個 model 來達到風格轉換，使用「Stable Diffusion」作為運行的基礎，盡可能的在便利與多元使用上取得平衡。
            希望透過此服務讓更多人能夠認識並了解AI繪圖，所以同時也在 Line 上成立討論社群，鼓勵新手勇於提問老手熱心解惑的互動形式，營造良好學習成長環境。</div>
            <div className='text-2xl font-bold'>使用聲明💡 </div>
            <div className='mt-2 mb-8 leading-9'>
             
              <p>本服務僅供娛樂與學習使用，意在推廣AI繪圖技術。使用者的行為與本服務無關。</p> 
              <p>使用者需遵守網路社群使用規定，不得違反社會善良風俗、不使用AI傷害他人、煽動暴力或進行任何惡意行為。</p>
              <p>我們會在可負擔範圍內盡力維持服務的穩定性，但不做任何保證，如果您在使用的過程中遇到問題，可以透過網頁上的聯絡資訊聯繫我們。</p>
              <p>最後，希望使用者能夠理解本服務的宗旨和意圖，並且遵守相關的使用規定。如果您有任何建議，歡迎與我們分享。</p>
           
            </div>

          </motion.div>
      }

    </motion.div>
  );
}

function Index() {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState('');
  const openModal = () => {
    console.log('123')
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <ReactFullpage
      //fullpage options
      licenseKey = {'VKGDI-QLS3J-S8IPJ-NAEY6-JXCCJ'}
      navigation
      scrollingSpeed = {600} /* Options here */
      onLeave={(section, origin, destination, direction)=>{
        console.log(origin.index)
        setCurrentPage(origin.index)
      }}
      render={({ state, fullpageApi }) => {
        return (
          <ReactFullpage.Wrapper>
            <AnimatePresence>
              <Modal show={showModal} onClose={closeModal}  />
            </AnimatePresence>
            <div className="section">

              <Header />
            </div>
            <div className="section">
              <Section2_ver2 />
            </div>
            <div className="section">
              <Section3 />
            </div>
            <div className="section">
              <Section1_ver2 />
            </div>
            <div className="section ">
              <Blog />
            </div>
            <div className="section">
            <Section4 />
            </div>
            <div className="section ">
     
              <CallToAction />
              <Footer openModal={openModal}/>
            </div>

            
          </ReactFullpage.Wrapper>
        )
      }}
    />
  )
}

export default Index