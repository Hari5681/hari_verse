
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import animationData from '@/../public/lottie/question-mark.json';
import AnimatedText from '@/components/common/AnimatedText';


interface QuestionViewProps {
  question: string;
  onAnswer: (answer: boolean) => void;
}

const QuestionView = ({ question, onAnswer }: QuestionViewProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center gap-8"
    >
      <Lottie animationData={animationData} loop={true} style={{ width: 150, height: 150, position: 'absolute', top: -50, opacity: 0.7 }} />
      <AnimatedText text={question} className="text-3xl sm:text-4xl font-headline text-primary-foreground text-center" />
      <div className="flex gap-4 mt-4">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={() => onAnswer(true)} size="lg" className="font-headline">
            Yes
            </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={() => onAnswer(false)} size="lg" variant="secondary" className="font-headline">
            No
            </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default QuestionView;
