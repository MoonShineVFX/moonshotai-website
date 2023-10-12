import React from 'react'
import moment from 'moment';
import {LoadingCircle} from '../helpers/componentsHelper'
const PromptList = ({data}) => {
  return (
    <div className='text-white pb-10'>
      <div className='text-sm text-white/80'>{data.length} items</div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mt-6'>
      {
        data.map((item,index)=>{
          const {id,title,urls,prompt}= item
          return(
            <div className='text-white border  p-4 border-gray-400/0 bg-gray-800 rounded-md ' key={'prompts'+index}>
              <div className='flex justify-between gap-4'>
                <div className=' relative overflow-hidden   rounded-md w-1/4'>
                  <img  
                    alt={title}
                    src={urls.thumb+'?width=200'}
                    data-id={id}
                    className={` object-cover w-full hover:scale-110 transition duration-700`}

                  />
                </div>
                <div className='w-3/4'>
                  <div className='flex flex-col  '>
                    <div className='font-semibold'>Prompt 提示詞</div>
                    <div>{prompt} 1</div>
                    
                  </div>
                  
                </div>

              </div>
            </div>
          )
        })
      }
      </div>

    </div>
  )
}

export default PromptList