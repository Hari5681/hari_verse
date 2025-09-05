
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedText from '@/components/common/AnimatedText';
import { useEffect, useState } from 'react';

interface QuestionViewProps {
  question: string;
  options: string[];
  onAnswer: (answer: string) => void;
}

const questionVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const optionsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const optionItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const QuestionView = ({ question, options, onAnswer }: QuestionViewProps) => {
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    // Show options after the question has had a moment to animate in
    const timer = setTimeout(() => {
      setShowOptions(true);
    }, 800); // Adjust delay as needed

    return () => clearTimeout(timer);
  }, [question]);

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={questionVariants}
      className="flex flex-col items-center justify-center gap-8"
    >
      <AnimatedText text={question} className="text-3xl sm:text-4xl font-headline text-primary-foreground text-center" />
      
      <AnimatePresence>
        {showOptions && (
          <motion.div 
            className="flex flex-col gap-4 mt-4 w-full items-center"
            initial="hidden"
            animate="visible"
            variants={optionsContainerVariants}
          >
            {options.map((option, index) => (
              <motion.div
                key={index}
                variants={optionItemVariants}
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
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default QuestionView;
