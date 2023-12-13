import React,{useEffect} from 'react'
import { getAnalytics, logEvent } from "firebase/analytics";

function Contract() {
  const analytics = getAnalytics();
  useEffect(()=>{
    logEvent(analytics, 'Doc_藝廊公約頁_進入')
  },[])
  return (
    <div className='text-white '>
      <div className='px-8'>
        <div className='text-lime-500 font-bold'>Gallery Contract</div>
        <div className='text-2xl font-bold  mb-4'>藝廊公約</div>
      </div>
      <div className=' px-8 text-white/90 text-sm space-y-2 my-8 pt-10 border-t border-white/20'>
        <div className='text-xl font-bold  mb-4'>藝廊公約</div>
        <p>Moonshot Line 官方藝廊站規  #2023/08/31 更新</p>
        <p>為了創造友善的交流環境，營造良好的討論風氣，請創作者一起遵守以下規章，並且對個人的言論負責，否則違反法律的話還是會需要負實際法律責任的哦！</p>
        <div className='pl-1 space-y-4 pb-10'>
          <p>1. 請勿發表包含以下狀況的內容或連結：</p>
          <p>(1) 對使用者、特定個人、組織或群體發表中傷、歧視、挑釁、羞辱、謾罵、不雅字詞或人身攻擊等言論， 或對具備共同特徵或屬性的族群發表仇恨性言論，違者將被刪文且視情況退群。</p>
          <p>(2) 禁止張貼色情裸露、性暗示意味濃厚的內容 （如性姿勢與相關動畫或插圖、對身體部位的明顯色情描繪）、暴力、大面積血腥、恐怖等「有害兒少身心健康」相關討論及內容，違者直接刪除並不特別告知，且將視情況退群處理。</p>

          <div className='pl-1 space-y-4 pb-4'>
            <div>＊禁止張貼描述裸露畫面的內容，如暴露性器官（即使以透明衣物遮蔽或若隱若現）或臀部全裸的特寫等</div>
            <div>＊禁止張貼描繪、描述、宣揚或鼓吹性暴力、性虐待或人獸交的內容</div>
            <div>＊禁止張貼展示性姿勢，以及可能聯想色情圖像等內容</div>
            <div>＊禁止張貼未成年裸露、色情內容</div>
            <div>＊禁止張貼於公共場所裸露、進行性行為等相關影音內容</div>
          </div>


          <p>(3) 請勿張貼非 Moonshot 平台生成之圖片。</p>
          <p>(4) 若是違反藝廊規章，官方有權將立即暫時使用藝廊或永久終止您使用本產品服務之授權。</p>
          <p>(5) Moonshot 官方擁有社群規範最終解釋決定權。</p>


        </div>


      </div>

    </div>
  )
}

export default Contract