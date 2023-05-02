export const TestImageModal=()=>{
  return (
    <div className=" fixed top-0 left-0 lg:right-0 lg:bottom-0 flex z-50 bg-zinc-800 h-screen overflow-y-auto" >
      <div className="00 p-4 max-w-screen-lg mx-auto  gap-3 text-white/80 relative my-5">
        <div className="flex   justify-center items-center ">
          <div className='w-full h-full'>
            <img 
              src='https://images.moonshot.today/static/134b166/18079489419501_0.jpg'
              alt='https://images.moonshot.today/static/134b166/18079489419501_0.jpg'
              className="max-h-full  rounded-md" />
          </div>
        </div>
        <div className='flex flex-col justify-end pt-5 relative pb-20 '>
          <div className='text-xs mb-3 text-white/30'>Created at 20220202</div>
          
          <div className='text-white font-bold my-3 flex gap-2 items-center'>
            Model
            <div className='bg-zinc-700  px-3  py-1 rounded-md'>
            selec
            </div> 
          </div>
          <div className='text-white font-bold my-3'>Prompt</div>
          <div className='bg-zinc-700 p-3 rounded-md'>
            selectedImage.prompt selectedImage.prompt selectedImage.prompt selectedImage.prompt selectedImage.prompt selectedImage.prompt selectedImage.prompt selectedImage.prompt selectedImage.prompt selectedImage.prompt selectedImage.prompt selectedImage.prompt selectedImage.prompt selectedImage.prompt selectedImage.prompt selectedImage.prompt
          </div>
          <div className='text-white font-bold my-3'>Negative prompt</div>
          <div className='bg-zinc-700 p-3 rounded-md'>
            selectedImage.negative_prompt
          </div>
          

        </div>
        <div className='flex left-0 gap-2 justify-center items-center py-4 fixed bottom-0 z-50 w-full bg-zinc-800'>
          <button className='bg-gray-600 text-white px-2 py-1 rounded-md w-1/2 '>Copy Prompt</button>
          <button className="  bg-gray-800 text-white px-2 py-1 rounded-md hover:bg-gray-700 focus:bg-gray-700" >Close</button>

        </div>
        
      </div>
    </div>
  )
}