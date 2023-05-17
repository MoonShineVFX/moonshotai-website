import React,{useState,useEffect} from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { MdKeyboardArrowLeft,MdOutlineShare } from "react-icons/md";
import {getWordFromLetter,fetchUser} from '../helpers/fetchHelper'
import Header from '../header'
function User() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null)
  useEffect(()=>{
    fetchUser(id)
      .then(data => {
        console.log(data)
        console.log(id)
      
        setUserData(data);
  
      })

  },[])
  return (
    <div>
      <Header />
      {
        !userData  ? 
        <div className='text-white'>Loading</div> 
        :
        <div className='flex flex-col items-center gap-5 relative text-white'>
              <div
              style={{backgroundImage:`url(${userData.profile_banner})`}}
              className=' absolute top-0 left-0 -z-10  w-full h-[23vh] bg-cover bg-center bg-no-repeat brightness-75'>

              </div>
              <div 
                className='w-[85px] mt-40  aspect-square rounded-full overflow-hidden bg-center bg-no-repeat bg-cover bg-black '
                style={{backgroundImage:`url(${userData.profile_image})` }}
              ></div>

              <div className=' flex flex-col justify-center items-center gap-2'>
                <div className=' text-xl leading-4'>{userData?.name} </div>
                <div className=' text-xs'>{userData?.bio}  </div>
              </div>


              <div className='grid grid-cols-3  divide-x'>
                <div className=' text-xs px-8'>
                  <div>{userData?.total_photos} </div>
                  <div>renders</div> 
                </div>
                <div className=' text-xs px-8'>
                  <div>{userData?.total_collected}</div> 
                  <div>collected</div> 
                </div>
                <div className=' text-xs px-8'>
                  <div>{userData?.total_follower}</div> 
                  <div>follower</div> 
                </div>
              </div>
              <div>
                <button className='bg-lime-500 px-5 py-2 rounded-md'>Follow</button>
              </div>
         
             
              
            </div>
      }
    </div>
  )


}

export default User