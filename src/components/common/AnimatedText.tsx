
'use client';

import { motion, AnimationProps } from 'framer-motion';
import { useEffect, useState } from 'react';

const sentenceVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.2,
      staggerChildren: 0.08,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100,
    },
  },
};

interface AnimatedTextProps {
  text: string;
  className?: string;
  onAnimationComplete?: () => void;
}

const AnimatedText = ({ text, className, onAnimationComplete }: AnimatedTextProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Render a static version on the server
    return <h1 className={className}>{text}</h1>;
  }

  return (
    <motion.h1
      className={className}
      variants={sentenceVariants}
      initial="hidden"
      animate="visible"
      onAnimationComplete={onAnimationComplete}
      aria-label={text}
    >
      {text.split('').map((char, index) => (
        <motion.span key={`${char}-${index}`} variants={letterVariants}>
          {char}
        </motion.span>
      ))}
    </motion.h1>
  );
};

export default AnimatedText;
