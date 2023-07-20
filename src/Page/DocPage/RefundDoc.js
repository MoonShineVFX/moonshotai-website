import React from 'react'

function RefundDoc() {
  return (
    <div className='text-white'>
      <div className='px-8'>
        <div className='text-lime-500 font-bold'>Refunds </div>
        <h1 className="text-2xl font-bold mb-4">退款流程</h1>
      </div>
      <div className='text-white pt-12 px-8'>

        <div className='my-4'>
          <div className='text-xl font-bold  mb-4'>
            瞭解 Moonshot 退款相關資訊
          </div>
          <div className='text-white/90 text-sm space-y-2'>
            在符合退款政策規定的情況下，Moonshot 可以針對某些 Moonshot 交易給予退款，詳見下方說明。您也可以直接與 <a href="mailto:ai@moonshine.tw" className='text-blue-400 underline'>Moonshot 官方開發團隊聯絡</a>，。
          </div>
        </div>

        <div className='my-4'>
          <div className='text-xl font-bold  mb-4'>一、會員服務條款</div>
          <div className='text-white/90 text-sm space-y-2'>
            <p>● 如果您的好友或家庭成員不小心使用了您的帳戶購物，或有陌生人使用您的信用卡或其他付款方式在Moonshot消費，您可以前往 Moonshot 網站 (退款頁面)，於契約訂單生效的 48 小時內申請退款。</p>
            <p>● 本商品屬於通訊交易解除權合理例外情事適用準則第2條第4款之商品及服務，不適用消保法7天內無條件解約退款之規定。</p>
            <p>● Moonshot在收到您退款請求後，便會立即啟動退款流程。您的退款會根據訂購時的付款方式而定。</p>
            <p>● 請注意，我們只能退款至台灣的銀行帳戶，而且該銀行帳戶持有人姓名必須與該退貨訂單上所填寫的帳單聯絡人一致。</p>
            <p>● 如果退款申請通過核准，請參閱如下「退款處理時間」。</p>

          </div>
          <table className="border-collapse border border-slate-400 w-full my-4 ">
            <thead>
              <tr className='bg-zinc-600 '>
                <th className='border border-slate-300 p-2'>功能</th>
                <th className='border border-slate-300 p-2'>指令</th>
              </tr>
            </thead>
            <tbody>

                  <tr>
                    <td className='border border-slate-300 p-2  text-center'>信用卡或簽帳金融卡</td>
                    <td className='border border-slate-300 p-2 text-center'>
                      <p>3-5 個工作天</p>
                      <p>處理時間可能因發卡機構而異，最慢需要 10 個工作天。</p>
                      <p>如果您的信用卡已失效，Moonshot 會將款項退還至您的發卡銀行，請向銀行洽詢相關事宜。</p>
                    </td>
                  </tr>
                  <tr>
                    <td className='border border-slate-300 p-2  text-center'>Line Pay </td>
                    <td className='border border-slate-300 p-2 text-center'>
                      <p>3-5 個工作天</p>
                      <p>退款將顯示在使用者的帳戶中。</p>
                    </td>
                  </tr>
            </tbody>
          </table>
        </div>

        <div className='my-8 pt-10 border-t border-white/20'>
          <div className='text-xl font-bold  mb-4'>瞭解退款申請選項</div>
          <div className='text-lg font-bold  mb-4'>方法一：前往 Moonshot 網站申請退款</div>
          <div className='text-white/90 text-sm space-y-2'>
            <p>如果距離您購買 Moonshot 服務的時間不到 48 小時，可以透過 Moonshot 申請退款。</p>
            <div className='pl-1'>

              <p>1. 前往 moonshot.today (退款頁面)。</p>
              <p>2. 點選「訂單列表」。</p>
              <p>3. 選取要退回的訂單，按一下「回報問題」。</p>
              <p>4. 視情況選擇合適的選項。</p>
              <p>5. 填妥表單並註明要申請退款。</p>
              <p>6. 按一下「提交」。</p>

            </div>



          </div>
          <div className='text-lg font-bold  mb-4 pt-10'>方法二：向 Moonshot 開發團隊人員尋求支援</div>
          <div className='text-white/90 text-sm space-y-2'>
            <p>遇到下列情況時，建議您與應用程式開發人員聯絡：</p>

            <div className='pl-1'>
              <p>● 您有 Moonshot 工具相關問題。</p>
              <p>● 您在進行應用程式內購交易後並未收到相應內容，或是該內容不符預期。</p>
            </div>

            <p>如您想要退款，但距離交易已超過 48 小時，可連絡開發人員協助處理，於此特殊情形本公司保有是否退款之決定權。</p>
            <p>請將退款特殊原因來信至： <a href="mailto:ai@moonshine.tw" className='text-blue-400 underline'>ai@moonshine.tw</a>，由 Moonshot 開發團隊評估審查，感謝。</p>
          </div>            
        </div>

        

      </div>
    </div>
  )
}

export default RefundDoc