import React from 'react'

function FaqDoc() {
  return (
    <div className='text-white'>
        <div className='px-8'>
          <div className='text-lime-500 font-bold'>FAQ</div>
          <div className='text-2xl font-bold  mb-4'>常見問答</div>
        </div>
        <div className='mt-10 mb-8 text-white px-8'>
          
          <div className='my-4 pt-10' id="faq">
            <div className='text-xl font-bold  mb-4'>常見問題</div>
            <div className='text-white/90 text-sm space-y-2 my-8'>
              <p className='text-xl font-bold  mb-4'>1. 需要下載或安裝特定軟體嗎？</p>
              <p>Moonshot 是建立在 LINE 上面的 AI 生圖機器人，因此只要你擁有 LINE 帳號，加入 Moonshot 好友即可使用！</p>

            </div>

            <div className='text-white/90 text-sm space-y-2 my-8'>
              <p className='text-xl font-bold  mb-4'>2. 付費進階方案包括哪些額外功能或優勢？</p>
              <p>除了基本功能可以使用外，進階方案更包括以下進階功能：</p>
              <p>修改 I**：使用遮罩將想要重繪的部分讓 Moonshot 重新繪製生圖。</p>
              <p>固定 O**：使用遮罩將不想重新繪製的部分固定。</p>
              <p>骨架 P**：抓取參考圖片的人物骨架來生成圖片。</p>
              <p>放大 ext：圖片兩倍放大。</p>
              <p>大圖 hr：能夠生成出更為精緻的 1024*1024 大圖。(預設圖尺寸為 512*512)</p>
              <p>中圖 mr：能夠生成出精緻的 768*768 中圖。</p>
              <p>調整步數 steps:1-50：自由調整欲生成圖片使用的算圖步數。(預設圖步數為 25)</p>

              <p>Moonshot 團隊也將持續開發、優化好用的指令提供給使用者！也歡迎填寫使用者調查表單向我們許願！</p>
            </div>



            <div className='text-white/90 text-sm space-y-2 my-8'>
              <p className='text-xl font-bold  mb-4'>3. 是否有常見的疑問解答或教學資源可供參考？</p>
              <p>你可以參考 Moonshot 官網中的文章，我們會不定時釋出厲害的創作者使用文章，讓大家參考，你還可以加入 Moonshot 的 Line 討論社群，裡面有許多大師能請教、一起交流。</p>
              <div className='w-1/2'><img src="https://moonshine.b-cdn.net/msweb/moonshotai/docs/quick01.jpg" alt="" /></div>



            </div>

            <div className='text-white/90 text-sm space-y-2 my-8'>
              <p className='text-xl font-bold  mb-4'>4. 如何聯繫客 Moonshot 開發團隊？</p>
              <p>若您有關於服務、商業合作相關問題，請來信至：ai@moonshine.tw，Moonshot 開發團隊專員將與您聯繫。</p>
            </div>



          </div>

          <div className='my-4 pt-10 border-t border-white/20'>
            <div className='text-xl font-bold  mb-4'>【 推薦序號 】</div>
            <div className='text-white/90 text-sm space-y-2 my-8'>
              <p className='text-xl font-bold  mb-4'>1. 推薦序號是什麼？ </p>
              <p>「推薦序號」讓大家可以透過分享，來領取進階帳戶免費體驗。</p>
            </div>

            <div className='text-white/90 text-sm space-y-2 my-8'>
              <p className='text-xl font-bold  mb-4'>2. 哪裡可以取得推薦序號？ </p>
              <p>至【會員資料 Account】頁面即可取得唷。</p>
            </div>

            <div className='text-white/90 text-sm space-y-2 my-8'>
              <p className='text-xl font-bold  mb-4'>3. 除了推薦序號外，還有其他機會可以獲得免費進階帳號天數嗎？</p>
              <p>有的！Moonshot 會定時推出不同的活動，只要有參與體驗，都有機會可以獲得免費天數的機會唷，歡迎隨時關注 Moonshot 的社群粉專！</p>
            </div>

            <div className='text-white/90 text-sm space-y-2 my-8'>
              <p className='text-xl font-bold  mb-4'>4. 現在還有邀請碼嗎？邀請碼跟推薦序是一樣的東西嗎？ </p>
              <p>自 7/20 收費上限後，Moonshot 即取消輸入邀請碼的活動，若是希望可以得到進階帳號的免費天數，歡迎推薦好友使用自己的推薦序號！(上限 5 人)。</p>
            </div>

          </div>

          <div className='my-4 pt-10 pb-10 border-t border-white/20' id="">
            <div className='text-xl font-bold  mb-4'>【 付費問題 】</div>
            <div className='text-white/90 text-sm space-y-2'>
              <p className='text-xl font-bold  mb-4'>1. 我可以取消訂閱嗎？如何處理退款？ </p>
              <p>商品購買內的 48 小時都是可以進行退款的，若是超過 48 小時，在符合退款政策規定的情況下，Moonshot 可以針對某些 Moonshot 交易給予退款，詳見：退款流程</p>
            </div>

          </div>          


        </div>




    </div>
  )
}

export default FaqDoc