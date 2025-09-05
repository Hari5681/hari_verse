
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import AnimatedText from '@/components/common/AnimatedText';

interface QuestionViewProps {
  question: string;
  options: string[];
  onAnswer: (answer: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5,
    },
  },
  exit: { opacity: 0, x: 100, transition: { duration: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const QuestionView = ({ question, options, onAnswer }: QuestionViewProps) => {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      className="flex flex-col items-center justify-center gap-8"
    >
      <AnimatedText text={question} className="text-3xl sm:text-4xl font-headline text-primary-foreground text-center" />
      <motion.div 
        className="flex flex-col gap-4 mt-4 w-full items-center"
        variants={containerVariants}
      >
        {options.map((option, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full max-w-sm"
          >
            <Button onClick={() => onAnswer(option)} size="lg" variant="secondary" className="font-headline w-full h-auto py-3 whitespace-normal">
              {option}
            </Button>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default QuestionView;
