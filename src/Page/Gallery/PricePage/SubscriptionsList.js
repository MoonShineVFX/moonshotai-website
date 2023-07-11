import React from 'react'

function SubscriptionsList({subData}) {
  return (
    <div>
      subData
      <div className='text-sm text-white/80'>{subData.length} items</div>
    </div>
  )
}

export default SubscriptionsList