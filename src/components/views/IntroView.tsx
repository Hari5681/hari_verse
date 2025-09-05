
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import animationData from '@/../public/lottie/intro-hearts.json';
import AnimatedText from '@/components/common/AnimatedText';

interface IntroViewProps {
  onStart: () => void;
}

const IntroView = ({ onStart }: IntroViewProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center gap-6"
    >
      <div className="flex items-center gap-2">
        <AnimatedText text="Welcome to HariVerse" className="text-4xl sm:text-5xl font-headline text-primary-foreground" />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 1.5,
          }}
        >
          <Sparkles className="w-8 h-8 text-accent" />
        </motion.div>
      </div>
      <p className="text-lg font-headline text-muted-foreground">
        A space made with love and creativity.
      </p>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button onClick={onStart} size="lg" className="font-headline mt-4">
          Start
        </Button>
      </motion.div>
      <Lottie animationData={animationData} loop={true} style={{ width: 200, height: 200, position: 'absolute', bottom: 20, right: 20, opacity: 0.5 }} />
    </motion.div>
  );
};

export default IntroView;
