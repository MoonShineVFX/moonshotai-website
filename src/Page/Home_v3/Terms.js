import React from 'react'
import Navbar from './Navbar'
function Terms() {
  return (
    <div>
      <Navbar />
      <div className='text-white pt-12 px-8'>
        <div className='my-4'>
          <div className='text-xl font-bold  mb-4'>一、會員服務條款</div>
          <div className='text-white/90 text-sm space-y-2'>
            <p>1.本會員服務條款所稱之「會員」，為依照本站所定之加入會員程序加入完成並通過認證者。</p>
            <p>2.當您使用本站服務時，即表示您同意及遵守本服務條款的規定事項及相關法律之規定。</p>
            <p>3.本站保留有審核加入會員資格之權利，另外已加入會員者，本站亦保留有解除其會員資格之權利。</p>
            <p>4.本會員服務條款之修訂，適用於所有會員，當本站修訂本服務條款時，將於本站上公告。</p>
          </div>
        </div>


        <div className='my-4'>
          <div className='text-xl font-bold  mb-4'>二、隱私權保護</div>
          <div className='text-white/90 text-sm space-y-2'>
            尊重並依據本網站「隱私權保護聲明」保護您的隱私(請參閱「隱私權保護聲明」條款)。
          </div>          
        </div>
      

      </div>
    </div>
  )
}

export default Terms