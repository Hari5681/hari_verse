
'use client';

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
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, type: 'spring' } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const optionsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.5,
    },
  },
};

const optionItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};

const QuestionView = ({ question, options, onAnswer }: QuestionViewProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    // Show options after the question has had a moment to animate in
    const timer = setTimeout(() => {
      setShowOptions(true);
    }, 1200); // Increased delay for a more natural pause

    return () => clearTimeout(timer);
  }, [question]);

  const handleSelectAnswer = (answer: string) => {
    setIsAnswered(true);
    // Add a short delay to allow click animation to play
    setTimeout(() => onAnswer(answer), 300);
  }

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
        {showOptions && !isAnswered && (
          <motion.div 
            className="flex flex-col gap-4 mt-4 w-full items-center"
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 10 }}
            variants={optionsContainerVariants}
          >
            {options.map((option, index) => (
              <motion.div
                key={index}
                variants={optionItemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
                className="w-full max-w-sm relative"
              >
                <Button 
                  onClick={() => handleSelectAnswer(option)} 
                  size="lg" 
                  variant="secondary" 
                  className="font-headline w-full h-auto py-3 whitespace-normal overflow-hidden"
                >
                   {option}
                   <motion.span
                        className="absolute inset-0 z-0"
                        initial={{ scale: 0, opacity: 0 }}
                        whileTap={{ scale: 2.5, opacity: [0.5, 0] }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        style={{
                            borderRadius: '50%',
                            backgroundColor: 'hsl(var(--primary))'
                        }}
                    />
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
