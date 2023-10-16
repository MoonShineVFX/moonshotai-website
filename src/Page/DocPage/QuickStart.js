import React,{useEffect} from 'react'
import { getAnalytics, logEvent } from "firebase/analytics";
function QuickStart() {
  const analytics = getAnalytics();
  useEffect(()=>{
    logEvent(analytics, 'Doc_GettingStarted頁_進入訪問')
  },[])
  return (
    <div className='text-white '>
      <div className='px-8'>
        <div className='text-lime-500 font-bold'>Getting Statred</div>
        <div className='text-2xl font-bold  mb-4'>如何開始</div>
      </div>

      <div className='mt-10 mb-8 text-white px-8'>
        <div className='my-4' id="quick">
          <div className='text-2xl font-bold  mb-4'>Quick Start</div>
          <div className='text-white/90 text-sm space-y-4 '>
            <div className='text-xl font-bold  mb-4'>1. Scan the Moonshot QRcode to add as a friend. </div>
            <p>掃描 Moonshot QRcode 並加入好友。</p>
            <div className='w-1/2 mt-8'>
              <img src="https://moonshine.b-cdn.net/msweb/moonshotai/docs/quick01.jpg" alt="" />
            </div>




          </div>
          <div className='text-white/90 text-sm space-y-2 my-8'>
          <div className='text-xl font-bold  mb-4'>2. Click on "Beginner Tutorial." Open chat conversation with Moonshot！ </div>
            <p>點擊「新手教學」，開啟與 Moonshot 的聊天對話！</p>

          </div>

          <div className='text-white/90 text-sm space-y-2 my-8'>
            <p className='text-xl font-bold  mb-4'>3. Subscribe to a Moonshot Plan. </p>
            <p>訂閱 Moonshot 計畫</p>
            <p>前往 <a href="/price">Moonshot 付款頁面</a>，使用已驗證的 LINE 帳號登入。</p>
            <p>有免費方案和進階方案兩種選擇，兩者可使用的內容指令不同：</p>
            <p>1/ 免費方案：可使用一般功能指令，不限算圖次數，藝廊圖片儲存量為 100 張。</p>
            <p>2/ 進階方案：除了可使用一般功能指令外，還能使用進階功能指令，每日不限算圖數量，藝廊圖片儲存量為 300 張。</p>

            <p>同時，我們也提供「推薦序號」讓大家可以透過分享，來領取進階帳戶免費體驗。</p>
            <p>1/ 開通推薦序號：每人可使用一次他人的推薦序號，並擁有一個自己的推薦序號。</p>
            <p>2/ 推薦序號使用方式：每人的推薦序號能提供給五位不同使用者，僅有五次，用完不補。當對方使用你的推薦序號後，你與對方的進階帳號使用天數會自動＋5 天。</p>


          </div>
        </div>
        <div className='my-4 pt-10 pb-10 border-t border-white/20' id="guidelines">
          <div className='text-2xl font-bold  mb-4'>Gallery Guidelines</div>
          <div className='text-white/90 text-sm space-y-2 my-8'>
            <p>Moonshot 的公共藝廊提供方便、友善的環境讓大家互相交流、分享創作！
            如果你有很棒的作品，請不要藏私，放上 Gallery 讓大家給你一個掌聲！
            </p>
            <div className='text-xl font-bold  mb-4 pt-10'>【作為創作者，你可以........】</div>
            <div className='text-xl font-bold  mb-4'>1. 點擊右上方的「✎ 編輯」鍵。</div>
            <div className='w-1/2'>
              <img src="https://moonshine.b-cdn.net/msweb/moonshotai/docs/quick02.png" alt="" />
            </div>



          </div>
          <div className='text-white/90 text-sm space-y-2 my-8'>
              <div className='text-xl font-bold  mb-4'>2.填寫圖片標題、敘述，並開啟「Show In Gallery」的按鈕，如果圖片有成人內容，請開啟「Add NSFW Tag」</div>
              <div className='w-1/2'>
                <img src="https://moonshine.b-cdn.net/msweb/moonshotai/docs/quick03.png" alt="" />
              </div>
          </div>

          <div className='text-white/90 text-sm space-y-2 my-8 pt-10'>
            <div className='text-xl font-bold  mb-4'>【作為拜訪者，你可以........】</div>
            <div className='pl-1 space-y-4 pb-4'>
              <p>1. 複製圖片的指令</p>
              <p>2. 在圖片下方留言直接與創作者交流</p>
              <p>3. 點選「♡」收藏至珍藏圖片</p>
              <p>4. 將圖片分享給他人</p>

            </div>
            <div className='w-1/2'>
              <img src="https://moonshine.b-cdn.net/msweb/moonshotai/docs/quick04.png" alt="" />
            </div>
          </div>


          </div>

      </div>



    </div>
  )
}

export default QuickStart