import React from 'react'

const GiftsList = ({giftData}) => {
  console.log(giftData)
  return (
    <div className='text-white'>
      <div>
      {
        giftData.map((item,index)=>(
          <div className='text-white border my-6 p-3 border-zinc-400 rounded-md' key={'gifts'+index}>
              {item.name}
          </div>
        ))
      }
      </div>

      <button>Test</button>
    </div>
  )
}

export default GiftsList