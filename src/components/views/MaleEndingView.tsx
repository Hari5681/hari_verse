
'use client';

import { motion } from 'framer-motion';
import AnimatedText from '../common/AnimatedText';
import Lottie from 'lottie-react';
import animationData from '@/../public/lottie/glowing-star.json';

const MaleEndingView = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, type: 'spring' }}
      className="flex flex-col items-center justify-center gap-6 text-center"
    >
      <Lottie animationData={animationData} loop={true} style={{ width: 200, height: 200 }} />
      <AnimatedText
        text="Stay strong, bro 👑."
        className="text-2xl sm:text-3xl font-headline text-primary-foreground"
      />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-lg font-headline text-muted-foreground max-w-sm"
      >
        You’re not alone. Your story will find its ending someday.
      </motion.p>
    </motion.div>
  );
};

export default MaleEndingView;

    
