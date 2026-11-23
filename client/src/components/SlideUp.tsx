import { motion } from 'framer-motion';
import {type ReactNode } from 'react';


interface SlideUpProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  id?: string; 
}


export default function SlideUp({ children, delay = 0, className = "", id }: SlideUpProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }} // Triggers when 15% of the element is visible
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}