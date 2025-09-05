
'use client';

import { Button } from '@/components/ui/button';
import Confetti from '@/components/common/Confetti';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';
import AnimatedText from '@/components/common/AnimatedText';
import { ArrowRight } from 'lucide-react';

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
  }, [isYes]);

  // We don't show a "Continue" button anymore in this version.
  // The journey ends here with the sweet message.

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
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
