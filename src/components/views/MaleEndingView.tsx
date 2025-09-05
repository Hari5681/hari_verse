
'use client';

import { motion } from 'framer-motion';
import AnimatedText from '../common/AnimatedText';
import Lottie, { type LottieComponentProps } from 'lottie-react';
import { useEffect, useState } from 'react';

interface MaleEndingViewProps {
  onContinue: () => void;
}

const MaleEndingView = ({ onContinue }: MaleEndingViewProps) => {
  const [animationData, setAnimationData] = useState<LottieComponentProps['animationData'] | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const loadAnimation = async () => {
      try {
        const anim = await import('@/../public/lottie/glowing-star.json');
        setAnimationData(anim.default);
      } catch (error) {
        console.error("Failed to load animation", error);
      }
    };
    loadAnimation();

    const timer = setTimeout(onContinue, 4000);
    return () => clearTimeout(timer);
  }, [onContinue]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.7, type: 'spring' }}
      className="flex flex-col items-center justify-center gap-6 text-center"
    >
      <div style={{ height: '200px', width: '200px' }}>
        {isClient && animationData && <Lottie animationData={animationData} loop={true} style={{ width: 200, height: 200 }} />}
      </div>
      <AnimatedText
        text="Stay strong, bro 👑."
        className="text-2xl sm:text-3xl font-headline text-primary-foreground"
      />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="text-lg font-headline text-muted-foreground max-w-sm"
      >
        You’re not alone. Your story will find its ending someday.
      </motion.p>
    </motion.div>
  );
};

export default MaleEndingView;
