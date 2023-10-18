
import React,{useEffect} from 'react'
import { BrowserRouter , Routes, Route} from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
//
import HomeLayout from './Page/Lyaouts/HomeLayout';
import HomeV3 from './Page/Home_v3'
import HomeV4 from './Page/Home_v4'

//
import Camera from './Page/Camera'

//
import DocLayout from './Page/Lyaouts/DocLayout';
import QuickStart from './Page/DocPage/QuickStart';
import UserDoc from './Page/DocPage/UserDoc';
import FaqDoc from './Page/DocPage/FaqDoc';
import CommandDoc from './Page/DocPage/CommandDoc';
import RefundDoc from './Page/DocPage/RefundDoc';
import Terms from './Page/DocPage/Terms';
import Policy from './Page/DocPage/Policy';
import Contract from './Page/DocPage/Contract';

//
import GalleryLayout from './Page/Lyaouts/GalleryLayout';
import Gallery from './Page/Gallery/Gallery';

import CampaignGallery from './Page/Gallery/Gallery/CampaignGallery';
import CampaignList from './Page/Gallery/Gallery/CampaignList';
import GalleryV2 from './Page/Gallery/Gallery/index_v2';
import Profile from './Page/Gallery/Profile';
import Work from './Page/Gallery/Profile';
import Account from './Page/Gallery/AccountPage'
import Post from './Page/Gallery/Gallery/Post';
import User from './Page/Gallery/Gallery/User';
import Price from './Page/Gallery/PricePage';
import Confirm from './Page/Gallery/PricePage/Confirm';
import Cancel from './Page/Gallery/PricePage/Cancel';
import Orders from './Page/Gallery/PricePage/Orders';
import TaiwanFood from './Page/Gallery/CampaignPage/TaiwanFood';
import AsusNFT from './Page/Gallery/CampaignPage/AsusNFT';
import Sdxl from './Page/Gallery/CampaignPage/Sdxl';
import Voice from './Page/Gallery/CampaignPage/Voice';
import LeaderBoardHome from './Page/Gallery/Gallery/LeaderBoardHome';
import Rewards from './Page/Gallery/RewardPage'

import  Command from  './Page/Command';
import  Generator from './Page/Generator'
import GalleryHomePageLayout from './Page/Lyaouts/GalleryHomePageLayout';
import Docs from './Page/Gallery/Docs'
import Notfound from './Page/Home/Notfound';
import Cooming from './Page/Gallery/Cooming';
import {removeLocalStorageItem} from './Page/Gallery/helpers/fetchHelper'
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from "react-query/devtools";
import LeaderBoard from './Page/Gallery/Gallery/LeaderBoardHome';

// login
import { AuthProvider } from './Spaceship/Auth';
import Login from './Spaceship/Login';
import ProtectedRoutes from './Spaceship/ProtectedRoutes';
import AdminHome from './Spaceship/Pages'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect:false,
    },
  },
})
function App() {
  useEffect(() => {
    AOS.init();
  }, [])


  return (
    <QueryClientProvider client={queryClient}>
    <RecoilRoot>
    <AuthProvider>
    <BrowserRouter>
      <Routes> 
        <Route path="/login" element={<Login />} />
        
        <Route path="spaceship"  element={ <ProtectedRoutes/>}>
          <Route path="" element={<AdminHome />} />
        </Route>

        <Route path="/camera" element={<Camera />} />
        <Route path="/command" element={<Command />} />
        <Route path="/generator" element={<Generator />} />
        
        <Route path="/" element={<GalleryLayout/> }>
          <Route path="*" element={<Notfound />} />
          <Route path="" element={<HomeV4 />} />

          <Route path="/" element={<GalleryHomePageLayout/> }>

            <Route path="gallery" element={<Gallery />} />
            {/* <Route path="campaign" element={<CampaignGallery />} /> */}
            {/* <Route path="campaign/:id"  element={<CampaignList />} /> */}
          </Route>

          <Route path="taiwanfood" element={<TaiwanFood />} />
          <Route path="asusnft" element={<AsusNFT />} />
          <Route path="sdxl" element={<Sdxl />} />
          <Route path="voice" element={<Voice />} />
          <Route path="leaderboard" element={<LeaderBoardHome />} />
          <Route path="rewards" element={<Rewards />} />

 
          <Route path="post/:id" element={<Post />} />
          <Route path="user/:id" element={<User />} />
          <Route path="price" element={<Price />} />
          <Route path="profile" element={<Profile />} />
          <Route path="account" element={<Account />} />
          <Route path="confirm/:id" element={<Confirm />} />
          <Route path="cancel/:id" element={<Cancel />} />
          <Route path="orders" element={<Orders />} />

          <Route path="/docs" element={<DocLayout/> }>
            <Route path="" element={<QuickStart />}/>
            <Route path="account" element={<UserDoc />}/>
            <Route path="faq" element={<FaqDoc />}/>
            <Route path="command" element={<CommandDoc />}/>
            <Route path="refunds" element={<RefundDoc />}/>
            <Route path="terms" element={<Terms />} />
            <Route path="policy" element={<Policy />} />
            <Route path="contract" element={<Contract />} />
          </Route>
        </Route>



        {/* <Route path="/gallery" element={<Gallery />} /> */}
        {/* <Route path="/post/:id" element={<Post />} /> */}
        {/* <Route path="/user/:id" element={<User />} /> */}
        {/* <Route path="/work" element={<Profile />} /> */}
        


        <Route path="/come" element={<Cooming />} />

        {/* <Route path="/storages" element={<Storages />} /> */}

      </Routes>
    </BrowserRouter>
    </AuthProvider>
    </RecoilRoot>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
