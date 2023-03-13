import React from 'react'
import Test from './Test'
import ReadyToTake from './ReadyToTake'
function index() {
  return (
    <div className='text-white'> 
      camera index
      <div>Test</div>
      <div className='bg-gray-500 p-10'>
        <Test />
      </div>
      #Welcome page
      #camera page
      #loading
      #result

      <div className=' text-xl text-center py-3'>Take a photo(wip testing)</div>
      <ReadyToTake />

    </div>
  )
}

export default index