import React,{useState,useEffect} from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { imageDataState,imageByIdSelector } from '../atoms/galleryAtom';
import {getWordFromLetter,fetchGalleries} from '../helpers/fetchHelper'
import { MdKeyboardArrowLeft,MdOutlineShare } from "react-icons/md";

function Post() {
  const { id } = useParams();
  const [imageData, setImageData] = useRecoilState(imageDataState)
  const [ isCopied , setIsCopied ] = useState(false);
  const [headers, setHeaders] = useState({'Content-Type': 'application/json'})
  const navigate = useNavigate();
  const [isGoingBack, setIsGoingBack] = useState(true);
  const handleBackClick = () => {
    const hasPreviousPage = navigate.length > 1;
    if (hasPreviousPage) {
      navigate(-1); // 返回上一页
    } else {
      navigate('/gallery'); // 导航到指定页面
    }
  };
  

  useEffect(()=>{
    fetchGalleries(headers)
      .then(data => {
        console.log(data)
        console.log(id)
        const newImageData = data.results.find((item)=>{
          return item.id === parseInt(id)
        })
        console.log(newImageData)
        setImageData(newImageData);
  
        return newImageData;
      })

  },[])



  const handleCopyPrompt=(model,prompt,negative_prompt)=>{
    const text = model.toUpperCase() +' '+prompt+(negative_prompt && ' --'+negative_prompt);
    navigator.clipboard.writeText(text);
    setIsCopied(true)
  }

  if (!imageData) {
    return (
      <div>
        <h2>Post ID: {id}</h2>
        <div>No image found.</div>
      </div>
    );
  }

  return (
    <div>
      <div className='flex items-center '>
        <button onClick={handleBackClick} className='text-white p-3'>
          <MdKeyboardArrowLeft size={42} />
        </button>
        <button className='text-white p-3'>
          <MdOutlineShare size={22} />
        </button>
      </div>

      {!imageData ?
      <div className='text-white'>Loading</div> 
      :
      <>
        <div className="w-full p-4  text-white/80 relative">
          <div className='text-2xl text-white font-bold '>{imageData.title}</div>
          <div className=' flex items-center  gap-3 my-6'>
            <div className='text-white font-bold my-3'>Author</div> 
            <div 
              className='w-[40px]  aspect-square rounded-full overflow-hidden bg-center bg-no-repeat bg-cover bg-black border border-zinc-400 '
              style={{backgroundImage: `url(${imageData?.author.profile_image})`}}
            ></div>
            <div className=''>{imageData?.author?.name}</div>
          </div>
          <div className="flex  justify-center items-center w-full">
            <div className='w-2/3 aspect-[2/1]'>
              <img 
                src={imageData.urls.regular} 
                alt={imageData.id} 
                className="max-w-full   rounded-md" />
            </div>
          </div>
          <div className='flex flex-col justify-end  relative pb-20 pt-2'>
            <div className='text-xs text-white/40 text-center'>#{imageData.created_at && imageData.id}</div>
            <div className='text-xs mb-3 text-white/40 text-center'>Created at {imageData.created_at && imageData.created_at.substr(0,10)}</div>
            
            <div className='text-white font-bold my-3 '>Prompt</div>
            <div className='bg-zinc-700 p-3 rounded-md whitespace-normal break-words'>
              {imageData.prompt}
            </div>
            <div className='text-white font-bold my-3'>Negative prompt</div>
            <div className='bg-zinc-700 p-3 rounded-md'>
              {imageData.negative_prompt}
            </div>
            <div className='grid grid-cols-2 gap-2'>
              <div>
                <div className='text-white font-bold my-3 '>Model</div>
                <div className='bg-zinc-700 p-3 rounded-md whitespace-normal break-words'>
                  {getWordFromLetter(imageData.model)}
                </div>
              </div>
              <div>
                <div className='text-white font-bold my-3 '>steps</div>
                <div className='bg-zinc-700 p-3 rounded-md whitespace-normal break-words'>
                  {imageData.steps}
                </div>
              </div>
              <div>
                <div className='text-white font-bold my-3 '>sampler_index</div>
                <div className='bg-zinc-700 p-3 rounded-md whitespace-normal break-words'>
                  {imageData.sampler_index}
                </div>
              </div>
              <div>
                <div className='text-white font-bold my-3 '>cfg_scale</div>
                <div className='bg-zinc-700 p-3 rounded-md whitespace-normal break-words'>
                  {imageData.cfg_scale}
                </div>
              </div>
            </div>
          </div>
          <div className='flex left-0 gap-2 justify-center items-center py-4 fixed bottom-0 z-50 w-full bg-zinc-800'>
            <button 
              className='bg-gray-600 text-white px-2 py-1 rounded-md w-1/2 '
              onClick={()=>handleCopyPrompt(imageData.model,imageData.prompt,imageData.negative_prompt)}
              >Copy Prompt {isCopied && <span className='text-xs'> Copied! </span>}</button>


          </div>
          
        </div>
      </>
      }
      
    </div>
  )
}

export default Post