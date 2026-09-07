import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export function useScrollReveal(direction = 'up', once = true) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-80px' });

  const variants = {
    hidden: {
      opacity: 0,
      x: direction === 'left' ? -60 : direction === 'right' ? 60 : 0,
      y: direction === 'up' ? 40 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return { ref, isInView, variants };
}
