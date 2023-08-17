import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from "@material-tailwind/react";
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
          <div className='text-xl text-white mx-5 flex flex-col items-center    p-4 rounded-md '>
            <div className=' opacity-50 w-1/2 max-w-[300px] mx-auto   '>
              <img src={process.env.PUBLIC_URL+'/images/logo.png'} alt="logo" className='max-w-full rounded-full' />
            </div>
            <div className='text-2xl font-bold my-6 text-center'>找不到路徑</div>
            <div className='text-sm text-white/070 mt-2'>
            因為從外部瀏覽器登入或找不到頁面的關係，將在3秒後自動跳轉至 Gallery 頁面。
            </div>
            <Button  
              onClick={()=>{
                navigate('/gallery');
              }}
              className="flex items-center gap-2 text-base mt-4" color="white">
              回到藝廊{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Button>
          </div>

        </div>
      </div>
)
}

export default Notfound