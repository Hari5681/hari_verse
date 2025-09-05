
import { Button } from '@/components/ui/button';
import Confetti from '@/components/common/Confetti';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import yesAnimation from '@/../public/lottie/celebration.json';
import noAnimation from '@/../public/lottie/sad-flower.json';
import AnimatedText from '@/components/common/AnimatedText';

interface ResponseViewProps {
  isYes: boolean;
  affirmativeText: string;
  negativeText: string;
  onContinue: () => void;
}

const ResponseView = ({ isYes, affirmativeText, negativeText, onContinue }: ResponseViewProps) => {
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
      <Lottie animationData={isYes ? yesAnimation : noAnimation} loop={isYes} style={{ width: 200, height: 200 }} />
      <AnimatedText text={isYes ? affirmativeText : negativeText} className="text-2xl sm:text-3xl font-headline text-primary-foreground leading-relaxed text-center" />
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button onClick={onContinue} size="lg" className="font-headline mt-4">
          Continue
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default ResponseView;
