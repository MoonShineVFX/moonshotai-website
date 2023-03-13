import React from 'react'

function FrontPage() {
  return (
    <div className='min-h-[60vh] relative '>
      <div
        className='min-h-[60vh] bg-cover bg-center bg-no-repeat brightness-75 '
        style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/images/camera_page/c02.jpeg'})`}}
      >
      </div>

      <button 
        type="button" 
        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 
        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          開始拍拍
        </button>

    </div>
  )
}

export default FrontPage