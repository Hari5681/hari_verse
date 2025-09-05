
'use client';

import Confetti from '@/components/common/Confetti';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';
import AnimatedText from '@/components/common/AnimatedText';

interface ResponseViewProps {
  isYes: boolean;
  affirmativeText: string;
  negativeText: string;
  onContinue: () => void;
}

const ResponseView = ({ isYes, affirmativeText, negativeText, onContinue }: ResponseViewProps) => {
  const [animationData, setAnimationData] = useState<unknown | null>(null);

  useEffect(() => {
    const loadAnimation = async () => {
      let anim;
      if (isYes) {
        anim = await import('@/../public/lottie/celebration.json');
      } else {
        anim = await import('@/../public/lottie/sad-flower.json');
      }
      setAnimationData(anim.default);
    };
    loadAnimation();
    
    const timer = setTimeout(onContinue, 4000);
    return () => clearTimeout(timer);

  }, [isYes, onContinue]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01]
      }}
      className="relative flex flex-col items-center justify-center gap-8"
    >
      {isYes && <Confetti />}
      {animationData && <Lottie animationData={animationData} loop={isYes} style={{ width: 200, height: 200 }} />}
      <AnimatedText text={isYes ? affirmativeText : negativeText} className="text-2xl sm:text-3xl font-headline text-primary-foreground leading-relaxed text-center" />
    </motion.div>
  );
};

export default ResponseView;
