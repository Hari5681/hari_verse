
'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { BrainCircuit, Heart, Smile } from 'lucide-react';
import AnimatedText from '../common/AnimatedText';

type QuizType = 'survey' | 'funny' | 'gk';

interface QuizSelectionViewProps {
  onSelect: (quizType: QuizType) => void;
}

const QuizSelectionView = ({ onSelect }: QuizSelectionViewProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, type: 'spring' }}
      className="flex flex-col items-center justify-center gap-8 text-center"
    >
      <AnimatedText text="Welcome to HariVerse ✨" className="text-4xl sm:text-5xl font-headline text-primary-foreground" />
       <p className="text-lg font-headline text-muted-foreground mt-2">
          Choose your adventure!
        </p>
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button onClick={() => onSelect('funny')} size="lg" className="font-headline w-full sm:w-auto">
            <Smile className="mr-2" /> Funny Quiz
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button onClick={() => onSelect('gk')} size="lg" className="font-headline w-full sm:w-auto" variant="secondary">
             <BrainCircuit className="mr-2" /> G.K. Quiz
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button onClick={() => onSelect('survey')} size="lg" className="font-headline w-full sm:w-auto" variant="outline">
             <Heart className="mr-2" /> Romantic Survey
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default QuizSelectionView;
