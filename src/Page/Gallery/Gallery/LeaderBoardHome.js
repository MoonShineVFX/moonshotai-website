import React from 'react'
import {fetchTopLikedUser,fetchTopRenderdUser} from '../helpers/fetchHelper'
import LeaderboardComp from './LeaderboardComp';
import { useQuery } from 'react-query';
function LeaderBoardHome () {
  const { data:topLikedUser, isLoading:isTopLikedUserLoading, isError:isTopLikedUserError } = useQuery('topLikedUsers', fetchTopLikedUser);
  const { data:topRenderUser, isLoading:isTopRenderUserLoading, isError:isTopRenderUserError } = useQuery('topRenderUsers', fetchTopRenderdUser);
  return (
    <div className="w-full md:w-10/12  space-x-0  mx-auto  text-white relative">
      <div className='text-xl font-bold text-center my-10'>MoonShot 排行榜</div>
      <div className='flex flex-col md:flex-row items-start  md:gap-8 px-4 space-y-6 md:space-y-0'>
  
        <LeaderboardComp 
          title="人氣作者" 
          data={topLikedUser} 
          isLoading={isTopLikedUserLoading} 
          sliceNum={15} 
          containerStyle={'px-3 md:px-8'}
          containerTitleStyle={'text-lg font-semibold '}
          listContainerStyle={''}
          listStyle={'p-2 bg-gray-700/20 rounded-md gap-6'}
          listAvatarStyle={'w-16'}
          listNameStyle={'text-lg'}
        />
        <LeaderboardComp 
          title="創作次數" 
          data={topRenderUser} 
          isLoading={isTopRenderUserLoading} 
          sliceNum={15} 
          containerStyle={'px-3 md:px-8'}
          containerTitleStyle={'text-lg font-semibold '}
          listStyle={'p-2 bg-gray-700/20 rounded-md gap-6'}
          listAvatarStyle={'w-16'}
          listNameStyle={'text-lg'}
        />
        
      </div>
    </div>

  )
}

export default LeaderBoardHome