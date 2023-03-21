import React,{useState} from 'react'
import { motion, AnimatePresence } from "framer-motion";
import ReadyToTake from './ReadyToTake'
import FrontPage from './FrontPage'
function Index() {
  const [showNextPage, setShowNextPage] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const handleButtonClick = () => {
    setIsButtonVisible(false);
    setTimeout(() => setShowNextPage(true), 500);
  };
  const handleBackButtonClick = () => {
    setShowNextPage(false);
    setTimeout(() => setIsButtonVisible(true), 500);
  };
  return (
    <div className='text-white'>  

      <AnimatePresence>
        {
          isButtonVisible && <FrontPage handleClick={handleButtonClick} /> 
        }
      </AnimatePresence>
      <AnimatePresence>
        {showNextPage && <ReadyToTake handleBackClick={handleBackButtonClick}/>
        }

      </AnimatePresence>





    </div>
  )
}

export default Index