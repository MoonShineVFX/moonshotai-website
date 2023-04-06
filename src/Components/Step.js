import React from 'react'
import { AnimatePresence,motion } from "framer-motion";
function Step({ isActive, children }) {
  const variants = {
    hidden: {
      opacity: 0,
      x: 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
      },
    },
  };
  return (
    <motion.div 
      variants={variants}
      initial="hidden"
      animate={isActive ? 'visible' : 'hidden'}
      className='text-white'
      style={{ display: isActive ? 'block' : 'none' }}>
      {children}
    </motion.div>
  )
}

export default Step