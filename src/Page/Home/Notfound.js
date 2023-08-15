import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { MdArrowRightAlt } from "react-icons/md";
function Notfound() {

  const navigate = useNavigate();
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/gallery');
    }, 2500); 
  
    return () => clearTimeout(timeout);
  }, [navigate]);
  return (
      <div>
        <div className='flex flex-col relative text-white mx-5 mt-10'>
          <div className='text-xl text-white mx-5   p-4 rounded-md '>
            <div className='w-1/3 mx-auto animate-pulse opacity-25'>
              <img src={process.env.PUBLIC_URL+'/images/logo.png'} alt="" className=' rounded-full' />
            </div>
            <div className='text-3xl font-bold my-6 text-center'>找不到路徑</div>
            <div className='text-lg mt-2'>
            因為從外部瀏覽器登入或找不到頁面的關係，將在3秒後自動跳轉至 Gallery 頁面。
            </div>
            <button className='my-6  p-2 px-4 text-black/80 bg-lime-300 rounded-sm text-sm flex items-center gap-2 ml-auto' onClick={()=>{
              navigate('/gallery');
            }}>Go Gallery <MdArrowRightAlt/> </button>
          </div>

        </div>
      </div>
)
}

export default Notfound