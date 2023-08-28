import React,{useState} from 'react'
import {fetchTopLikedUser,fetchTopRenderdUser,fetchTopRanking} from '../helpers/fetchHelper'
import LeaderboardComp from './LeaderboardComp';
import { useQuery } from 'react-query';
import { motion } from 'framer-motion';
import { ButtonGroup, Button } from "@material-tailwind/react";
function LeaderBoardHome () {
  const [activeTab, setActiveTab] = useState('popularity');
  const { data:topLikedUser, isLoading:isTopLikedUserLoading, isError:isTopLikedUserError } = useQuery('topLikedUsers', fetchTopLikedUser);
  const { data:topRenderUser, isLoading:isTopRenderUserLoading, isError:isTopRenderUserError } = useQuery('topRenderUsers', fetchTopRenderdUser);
  const { data:topRanking, isLoading:isTopRankingLoading, isError:isTopRankingError } = useQuery('topRanking', fetchTopRanking);
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="w-full md:w-10/12  space-x-0  mx-auto  text-white relative py-10">
      <div className='flex gap-3 my-10 justify-center'>
        <Button
        onClick={() => handleTabChange('popularity')}
          className={'relative rounded-full font-bold capitalize text-sm   max-w-[180px] border border-[#BDDE48] ' + (activeTab === 'popularity' ? ' bg-[#BDDE48] text-black '  : ' bg-black  ' )}
        >
          使用者排行榜
        </Button>
        <Button
        onClick={() => handleTabChange('model')}
          className={'relative rounded-full font-bold capitalize text-sm   max-w-[180px] border border-[#BDDE48] ' + (activeTab === 'model' ? ' bg-[#BDDE48] text-black '  : ' bg-black  ' )}
        >
          模型排行榜
        </Button>
      </div>

      {activeTab === 'popularity' && (
        <motion.div 
          key={'1'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className='flex flex-col md:flex-row items-start w-full  md:gap-8 px-4 space-y-6 md:space-y-0'>
    
          <LeaderboardComp 
            title="人氣作者" 
            data={topRanking?.top_liked_users} 
            isLoading={isTopLikedUserLoading} 
            customer_sliceNum={15} 
            containerStyle={'px-3 md:px-8'}
            containerTitleStyle={'text-lg font-semibold '}
            listContainerStyle={''}
            listStyle={'p-2 bg-gray-700/20 rounded-md gap-6'}
            listAvatarStyle={'w-16'}
            listNameStyle={'text-lg'}
            is_link={true}
            linkpath={'/user/'}
          />
          <LeaderboardComp 
            title="創作次數" 
            data={topRanking?.top_render_users} 
            isLoading={isTopRenderUserLoading} 
            customer_sliceNum={15} 
            containerStyle={'px-3 md:px-8'}
            containerTitleStyle={'text-lg font-semibold '}
            listStyle={'p-2 bg-gray-700/20 rounded-md gap-6'}
            listAvatarStyle={'w-16'}
            listNameStyle={'text-lg'}
            is_link={true}
            linkpath={'/user/'}
          />
          
        </motion.div>
      )}
      {activeTab === 'model' && (
        <motion.div 
          key={'2'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className='flex flex-col md:flex-row items-start  md:gap-8 px-4 space-y-6 md:space-y-0'>
    
          <LeaderboardComp 
            title="模型排名" 
            data={topRanking?.top_used_models} 
            isLoading={isTopLikedUserLoading} 
            customer_sliceNum={15} 
            containerStyle={'px-3 md:px-8'}
            containerTitleStyle={'text-lg font-semibold '}
            listContainerStyle={''}
            listStyle={'p-2 bg-gray-700/20 rounded-md gap-6'}
            listAvatarStyle={'w-16'}
            listNameStyle={'text-lg'}
          />
          <LeaderboardComp 
            title="Lora 排名"
            data={topRanking?.top_used_loras} 
            isLoading={isTopRenderUserLoading} 
            customer_sliceNum={15} 
            containerStyle={'px-3 md:px-8'}
            containerTitleStyle={'text-lg font-semibold '}
            listStyle={'p-2 bg-gray-700/20 rounded-md gap-6'}
            listAvatarStyle={'w-16'}
            listNameStyle={'text-lg'}
          />
          
        </motion.div>
      )}
    </div>

  )
}

export default LeaderBoardHome