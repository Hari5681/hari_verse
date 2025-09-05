
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import animationData from '@/../public/lottie/intro-hearts.json';
import AnimatedText from '@/components/common/AnimatedText';

interface IntroViewProps {
  name: string;
  onStart: () => void;
}

const IntroView = ({ name, onStart }: IntroViewProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center gap-6"
    >
      <Lottie animationData={animationData} loop={true} style={{ width: 200, height: 200, position: 'absolute', top: -80, opacity: 0.4 }} />
      <div className="flex flex-col items-center gap-2 z-10">
        <AnimatedText text={`Welcome ${name} 🌸`} className="text-4xl sm:text-5xl font-headline text-primary-foreground" />
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-lg font-headline text-muted-foreground mt-2"
        >
          This is a fun little quiz to know more about you 💕
        </motion.p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.0, duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button onClick={onStart} size="lg" className="font-headline mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
          Start Quiz
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default IntroView;
