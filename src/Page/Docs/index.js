import React from 'react'
import { AnimatePresence,motion } from "framer-motion";
import Header from './header'
function index() {
  return (
    <div>
      <Header />
      <div className='flex justify-start items-start text-white w-10/12 mx-auto'>
        <div className='  min-h-screen w-1/4 p-10'>
          <div className=' font-bold '>Documentation</div>
          <ul className=' border-l border-white/50 pl-5 mt-4 tracking-widest leading-loose'>
            <li>
              關於我們
            </li>
            <li>
              使用聲明
            </li>
            <li>..</li>
          </ul>
        </div>
        <motion.div className=" modal relative w-full min-h-screen w-10/12 md:w-3/4 relative  px-10 mx-auto text-white ">
          <motion.div 
            className=" pt-0 "
            initial={{ opacity: 0,y:0 }}
            animate={{ opacity: 1,y:0 }}
            exit={{ opacity: 0,y:0 }}
            transition={{
              ease: "easeInOut",
              duration: 0.3,
              delay: 0.5,
            }}
          >  
            <div className='text-3xl font-black w-1/4 my-16'>
              <img src={process.env.PUBLIC_URL+'/images/ver2_images/mslogo.svg'} alt="" className='w-full'/>
            </div>
            <div className='text-2xl font-bold'>關於我們</div>
            <div className='mt-2 mb-8 leading-9 text-white/70'>Moonshot 是一個能夠在 Line 上輕鬆使用的 AI 繪圖工具，可輕易地通過指令切換多個 model 來達到風格轉換，使用「Stable Diffusion」作為運行的基礎，盡可能的在便利與多元使用上取得平衡。
            希望透過此服務讓更多人能夠認識並了解AI繪圖，所以同時也在 Line 上成立討論社群，鼓勵新手勇於提問老手熱心解惑的互動形式，營造良好學習成長環境。</div>
            <div className='text-2xl font-bold'>使用聲明💡 </div>
            <div className='mt-2 mb-8 leading-9 text-white/70'>
              
              <p>本服務僅供娛樂與學習使用，意在推廣AI繪圖技術。使用者的行為與本服務無關。</p> 
              <p>使用者需遵守網路社群使用規定，不得違反社會善良風俗、不使用AI傷害他人、煽動暴力或進行任何惡意行為。</p>
              <p>我們會在可負擔範圍內盡力維持服務的穩定性，但不做任何保證，如果您在使用的過程中遇到問題，可以透過網頁上的聯絡資訊聯繫我們。</p>
              <p>最後，希望使用者能夠理解本服務的宗旨和意圖，並且遵守相關的使用規定。如果您有任何建議，歡迎與我們分享。</p>
            
            </div>

          </motion.div>
        </motion.div>
      </div>


    </div>

  )
}

export default index