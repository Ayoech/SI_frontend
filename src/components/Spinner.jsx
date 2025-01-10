import React from 'react';
import { motion } from 'framer-motion';

const Spinner = () => {
  return (
    <motion.div
      style={{
        width: '24px',
        height: '24px',
        border: '3px solid transparent',
        borderTop: '3px solid #0071bc',
        borderRadius: '50%',
        position:'relative',
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
      }}
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        duration: 1,
        ease: 'linear',
      }}
    />
  );
};

export default Spinner;
