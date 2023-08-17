import React from 'react'

function UserDoc() {
  return (
    <div className='text-white'>
      <div className='px-8'>
        <div className='text-lime-500 font-bold'>User</div>
        <div className='text-2xl font-bold  mb-4'>個人帳戶</div>
      </div>
      <div className='mt-10 mb-8 text-white px-8'>
        <div className='my-4 pt-10' id="profile">
          <div className='text-xl font-bold  mb-4'>個人頁面 Profile </div>
          <div className='text-white/90 text-sm space-y-2 my-8'>
            <p className='text-xl font-bold  mb-4'>Renders</p>
            <p>你所有的算圖都可以在這邊找到，不過請注意，此區圖片的保存期限為 90 天，如果你需要永久保存圖片，可以將圖片下載或是點選〔加入留存〕存放至【Storage】中。</p>
          </div>

          <div className='text-white/90 text-sm space-y-2 my-8'>
            <p className='text-xl font-bold  mb-4'>Storage</p>
            <p>這裡為留存珍藏圖片的位置，若是想分享至公共藝廊，請點選圖片上的「✎ 編輯」並開啟「展示至藝廊」的按鈕，即成功分享圖片。</p>
            <div className='w-1/2'>
              <img src="https://moonshine.b-cdn.net/msweb/moonshotai/docs/user01.jpg" alt="" />
            </div>

          </div>

          <div className='text-white/90 text-sm space-y-2 my-8'>
            <p className='text-xl font-bold  mb-4'>Collections</p>
            <p>點選圖片上的「♡」即可收藏喜歡的圖片。</p>
          </div>

          <div className='text-white/90 text-sm space-y-2 my-8'>
            <p className='text-xl font-bold  mb-4'>Following</p>
            <p>歡迎追蹤喜歡的創作者。</p>
          </div>
        </div>

        <div className='my-4 pt-10  border-t border-white/20' id="account">
          <div className='text-xl font-bold  mb-4'>會員資料 Account </div>
          <div className='text-white/90 text-sm space-y-2 my-8'>
            <p>個人資料：可填寫帳戶對外的個人簡介。</p>
            <p>會員狀態：顯示該會員帳戶目前使用的方案與期限。</p>
            <p>推薦序號：分享推薦序號，即可領取免費進階帳戶天數！</p>
            <p>敏感內容：開啟按鈕則代表允許帳戶顯示可能隱含成人性質的內容。</p>

          </div>
        </div>

        <div className='my-4 pt-10 border-t border-white/20' id="refeeral">
          <div className='text-xl font-bold  mb-4'>推薦序號 Referral Code </div>
          <div className='text-white/90 text-sm space-y-2 my-8'>
            <p >每一個帳戶皆有自己的推薦序號，可以在【會員資料 Account】中取得。</p>
            <p> • 開通推薦序號：每人可使用一次他人的推薦序號，並擁有一個自己的推薦序號。</p>
            <p> • 推薦序號使用方式：每人的推薦序號能提供給五位不同使用者，僅有五次，用完不補。當對方使用
              你的推薦序號後，你與對方的進階帳號使用天數會自動＋5 天。</p>


          </div>
          <div className='text-white/90 text-sm space-y-2 my-8 pt-10'>
            <p className='text-xl font-bold  mb-4'>如何取得推薦序號？</p>
            <p>至【會員資料 Account】中取得自己的推薦序號並複製。</p>
            <div className='w-1/2'>
              <img src="https://moonshine.b-cdn.net/msweb/moonshotai/docs/user02.png" alt="" />
            </div>
          </div>

          <div className='text-white/90 text-sm space-y-2 my-8 pt-10'>
            <p className='text-xl font-bold  mb-4'>如何開通推薦序號？</p>
            <p>拿到好友的推薦序號後，進入【方案頁面 Price】點擊「開通推薦序號」，輸入推薦序號並送出。</p>
            <div className='w-1/2'>
              <img src="https://moonshine.b-cdn.net/msweb/moonshotai/docs/user03.png" alt="" />
            </div>
          </div>

          <div className='text-white/90 text-sm space-y-2 my-8 pt-10'>
            <p className='text-xl font-bold  mb-4'>如何查看推薦序號是否開通成功？</p>
            <p>可至【訂單紀錄 Orders】裡的「訂閱紀錄」查看免費進階帳戶使用期限。</p>
            <div className='w-1/2'>
              <img src="https://moonshine.b-cdn.net/msweb/moonshotai/docs/user04.png" alt="" />
            </div>
          </div>
        </div>

        <div className='my-4 pt-10 border-t border-white/20' id="orders">
          <div className='text-2xl font-bold  mb-4'>訂單紀錄 Orders </div>
          <div className='text-white/90 text-sm space-y-2 my-8'>
            <p>可以查找所有的訂單紀錄、方案起始期限與退款事宜。</p>
            <p>辦理退款，請查閱退款流程</p>
          </div>
        </div>

      </div>







    </div>
  )
}

export default UserDoc