export const TextMode = ({data,currentDataIndex})=>{
  return (
    <ul className="space-y-4 pt-32 ">
      <li className="flex justify-end ">
        <div className=' '>
          <div className='relative max-w-xl text-right text-zinc-400 text-sm font-bold mb-1'></div>
          <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-[#85e248] rounded-2xl shadow">
            <span className="block">{data[currentDataIndex].message}</span>
          </div>
        </div>
      </li>
      {data[currentDataIndex].images &&
          <li className="flex justify-start">
            <div>
              <div className='relative max-w-xl text-left text-zinc-400 text-sm font-bold mb-1'>Moonshot</div>
              <div id="bot-images" className="relative max-w-xl text-gray-700 rounded shadow overflow-hidden ">
                <div className='flex gap-3 overflow-y-auto pb-3'>
                  { 
                    data[currentDataIndex].images.map((item,index)=>{
                      return(
                        <img src={process.env.PUBLIC_URL+'/images/'+item} alt=""  className=' rounded-md w-5/12'/>
                      )
                    })
                  }
    
                </div>
              </div>
            </div>
          </li>
      }

    </ul>
  )
}
export const ImageMode = ({data,currentDataIndex}) =>{
  return (
    <ul className="space-y-4 pt-5">
      <li className="flex justify-end">
        <div className=' '>
          <div className='relative max-w-xl text-right text-zinc-400 text-sm font-bold mb-1'></div>
          <div className="relative max-w-xl px-4 py-2 text-gray-700  rounded-2xl shadow ">
            <img src={process.env.PUBLIC_URL+'/images/'+data[currentDataIndex].image} alt=""  className=' rounded-md w-full'/>
          </div>
        </div>
      </li>
      <li className="flex justify-end">
        <div className=' '>
          <div className='relative max-w-xl text-right text-zinc-400 text-sm font-bold mb-1'></div>
          <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-[#85e248] rounded-2xl shadow">
            <span className="block">{data[currentDataIndex].message}</span>
          </div>
        </div>
      </li>

      <li className="flex justify-start">
        <div>
          <div className='relative max-w-xl text-left text-zinc-400 text-sm font-bold mb-1'>Moonshot</div>
          <div id="bot-images" className="relative max-w-xl text-gray-700 rounded shadow overflow-hidden ">
            <div className='flex gap-3 overflow-y-auto pb-3'>
              {
                data[currentDataIndex].images.map((item,index)=>{
                  return(
                    <img src={process.env.PUBLIC_URL+'/images/'+item} alt=""  className=' rounded-md w-5/12'/>
                  )
                })
              }

            </div>
          </div>
        </div>
      </li>
    </ul>
  )
}

export const EtcMode = ({data,currentDataIndex})=>{
  return (
    <ul className="space-y-4 pt-32 w-full">
      <li className="flex justify-end">
        <div className=' '>
          <div className='relative max-w-xl text-right text-zinc-400 text-sm font-bold mb-1'></div>
          <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-[#85e248] rounded-2xl shadow">
            <span className="block">{data[currentDataIndex].message}</span>
          </div>
        </div>
      </li>
      {data[currentDataIndex].images &&
          <li className="flex justify-start">
            <div>
              <div className='relative max-w-xl text-left text-zinc-400 text-sm font-bold mb-1'>Moonshot</div>
              <div id="bot-images" className="relative max-w-xl text-gray-700 rounded shadow overflow-hidden ">
                <div className='flex gap-3 overflow-y-auto pb-3   '>
                  { 
                    data[currentDataIndex].images.map((item,index)=>{
                      return(
                        <img src={process.env.PUBLIC_URL+'/images/'+item} alt=""  className='w-5/12 bg-black rounded-md aspect-[1/1] object-contain  '/>
                      )
                    })
                  }
    
                </div>
              </div>
            </div>
          </li>
      }
      {
        data[currentDataIndex].answer &&
        <li className="flex justify-start">
          <div>
            <div className='relative max-w-xl text-left text-zinc-400 text-sm font-bold mb-1'>Moonshot</div>
            <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-[#d2dad2] rounded-2xl shadow">
              <span className="block">{data[currentDataIndex].answer}</span>
            </div>
          </div>
        </li>
      }

    </ul>
  )
}