import React ,{ useState } from 'react'
import Header from "./Header";
import Footer from "./Footer";
import Section1 from "./Section1";
import Section2 from './Section2';
import CallToAction from './CallToAction';
import Section3 from './Section3';
import Section2_ver2 from './Section2_ver2';
import Blog from './Blog';
import { AnimatePresence,motion } from "framer-motion";
function Modal(props) {
  return (
    <motion.div 
      className="modal fixed top-0 left-0 w-full h-screen bg-black/50 z-50" style={{ display: props.show ? "block" : "none" }}

    >
      {props.show&&
          <motion.div 
            className="modal-content bg-white w-10/12 md:w-8/12 relative mt-10 py-12 px-10 mx-auto  h-[90vh] overflow-y-auto  overflow-x-hidden"
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
            <div className='mt-2 mb-8'>Moonshot 是一個能夠在 Line 上輕鬆使用的 AI 繪圖工具，可輕易地通過指令切換多個 model 來達到風格轉換，使用「Stable Diffusion」作為運行的基礎，盡可能的在便利與多元使用上取得平衡。
            希望透過此服務讓更多人能夠認識並了解AI繪圖，所以同時也在 Line 上成立討論社群，鼓勵新手勇於提問老手熱心解惑的互動形式，營造良好學習成長環境。</div>
            <div className='text-2xl font-bold'>使用聲明</div>
            <div className='mt-2 mb-8'>💡 本服務僅供娛樂與學習使用，意在推廣AI繪圖技術。使用者的行為與本服務無關。
            使用者需遵守網路社群使用規定，不得違反社會善良風俗、不使用AI傷害他人、煽動暴力或進行任何惡意行為。
    
            我們會在可負擔範圍內盡力維持服務的穩定性，但不做任何保證，如果您在使用的過程中遇到問題，可以透過網頁上的聯絡資訊聯繫我們。
    
            最後，希望使用者能夠理解本服務的宗旨和意圖，並且遵守相關的使用規定。如果您有任何建議，歡迎與我們分享。
            </div>
            <div className='text-2xl font-bold'>模組介紹</div>
            <div className='mt-2 mb-8'>
             <p> 寫實使用了「Realistic Vision V1.3 」這個 Modle，優點在於它可以生成照片類型的圖片，其生成的圖像具有真實的紋理及材質和逼真的色彩，模型涵蓋元素廣，不論是室內外場景、人物肖像、動物都能夠生成。</p>
    
              <span>---</span> 
    
              <p>插畫使用了「concept_mix」這個 Model，是 Moonshot 團隊為了讓”插畫”能夠有更多樣的元素產出而組合成的 Model ，更容易創造出較戲劇化的構圖、幻想中的物件或場景、3D建模感或水彩、油畫、水墨等藝術類型的風格。</p> 
    
              <span>---</span> 
    
              <p>漫畫使用了「Anything-V4.5」這個 Model，擅長生成2D風格的圖像，各式動漫風格或動畫感較強的畫面，元素多樣，表現相對穩定且入門難度較低。</p> 
    
              <span>---</span> 
    
               <p>由於寫實生成的人物較自然，特別新增非常熱門的「chilloutmix」作為寫實人像這個子分項的 Model，擅長繪製人物，細節豐富且質感較佳，整體而言生成的圖象銳利感較強，光線較豐富。</p> 
            </div>
          </motion.div>
      }

    </motion.div>
  );
}

function Index() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    console.log('123')
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <div id="home">
      <AnimatePresence>
        <Modal show={showModal} onClose={closeModal} content="This is the content of the modal." />
      </AnimatePresence>
      
      <Header />
      <Section2_ver2 />
      <Section3 />
      
      <Section1 />
      <Blog />
      <CallToAction />
      <Footer openModal={openModal}/>
    </div>
  )
}

export default Index