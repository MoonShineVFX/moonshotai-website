import React from 'react'

function QuickStart() {
  return (
    <div>
      <div className='my-4' id="quick">
        <div className='text-xl font-bold  mb-4'>Quick Start</div>
        <div className='text-white/90 text-sm space-y-4 '>
          <p>1. Scan the Moonshot QRcode to add as a friend. </p>
          <p>掃描 Moonshot QRcode 並加入好友。</p>
          <div className='w-1/2 mt-8'>
            <img src="https://resource.moonshine.tw/msweb/moonshotai/docs/quick01.jpg" alt="" />
          </div>




        </div>
        <div className='text-white/90 text-sm space-y-2 my-8'>
          <p>2. Click on "Beginner Tutorial." Open chat conversation with Moonshot！ </p>
          <p>點擊「新手教學」，開啟與 Moonshot 的聊天對話！</p>

        </div>

        <div className='text-white/90 text-sm space-y-2 my-8'>
          <p>3. Subscribe to a Moonshot Plan. </p>
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
      <div className='my-4' id="guidelines">
        <div className='text-xl font-bold  mb-4'>Gallery Guidelines</div>
        <div className='text-white/90 text-sm space-y-2 my-8'>
          <p>Moonshot 的公共藝廊提供方便、友善的環境讓大家互相交流、分享創作！
          如果你有很棒的作品，請不要藏私，放上 Gallery 讓大家給你一個掌聲！
          </p>
          <p>【作為創作者，你可以........】</p>
          <p>1. 點擊右上方的「✎ 編輯」鍵。</p>
          <div className='w-1/2'>
            <img src="https://resource.moonshine.tw/msweb/moonshotai/docs/quick02.png" alt="" />
          </div>



        </div>
        <div className='text-white/90 text-sm space-y-2 my-8'>
          <p>2.填寫圖片標題、敘述，並開啟「Show In Gallery」的按鈕，如果圖片有成人內容，請開啟「Add NSFW Tag」</p>
          <div className='w-1/2'>
            <img src="https://resource.moonshine.tw/msweb/moonshotai/docs/quick03.png" alt="" />
          </div>
        </div>

        <div className='text-white/90 text-sm space-y-2 my-8'>
          <p className='text-lg'>【作為拜訪者，你可以........】</p>
          <div className='pl-1'>
            <p>複製圖片的指令</p>
            <p>在圖片下方留言直接與創作者交流</p>
            <p>點選「♡」收藏至珍藏圖片</p>
            <p>將圖片分享給他人</p>

          </div>
          <div className='w-1/2'>
            <img src="https://resource.moonshine.tw/msweb/moonshotai/docs/quick04.png" alt="" />
          </div>
        </div>

        <div className='text-white/90 text-sm space-y-2 my-8'>
          <p className='text-lg'>藝廊公約</p>
          <p>為了創造友善的交流環境，請創作者一起遵守以下規章：</p>
          <div className='pl-1'>
          <p>1. 請避免仇恨言論或霸凌文字，尊重言論自由，保持禮貌友好的交流模式。</p>
          <p>2. 請避免張貼色情、暴力、血腥、恐怖等「有害兒少身心健康」相關討論及內容，若是圖片內容隱含成人內容，請開啟「Add NSFW Tag」的按鈕才能發布、上傳，如有違反則直接刪除並不特別告知。</p>
          <p>3. 請勿張貼非 Moonshot 平台生成之圖片。</p>
          <p>4. 若是違反藝廊規章，官方有權將立即暫時或永久終止您使用本服務之授權。</p>


          </div>
          <div className='w-1/2'>
            <img src="https://resource.moonshine.tw/msweb/moonshotai/docs/quick04.png" alt="" />
          </div>
        </div>


      </div>


    </div>
  )
}

export default QuickStart