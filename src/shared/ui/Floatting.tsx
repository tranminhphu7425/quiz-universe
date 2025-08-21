import React from 'react';
import { motion } from 'framer-motion';

function Floating({ children, delay = 0, duration = 6, distance = 14, className }: { children: React.ReactNode; delay?: number; duration?: number; distance?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ y: distance * 0.6, opacity: 0 }}
      animate={{ y: [distance, -distance, distance], opacity: 1 }}
      transition={{ duration, delay, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}


export default Floating;