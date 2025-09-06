
'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { User, UserRound } from 'lucide-react';
import AnimatedText from '../common/AnimatedText';

interface GenderPromptViewProps {
  onSelect: (gender: 'male' | 'female') => void;
}

const GenderPromptView = ({ onSelect }: GenderPromptViewProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, type: 'spring' }}
      className="flex flex-col items-center justify-center gap-8 text-center"
    >
      <AnimatedText text="Welcome to HariVerse" className="text-4xl sm:text-5xl font-headline text-primary-foreground" />
      <div className="flex flex-col items-center gap-2 -mt-4">
        <h2 className="text-2xl sm:text-3xl font-headline text-primary-foreground/80">Please select your gender</h2>
        <p className="text-lg font-headline text-muted-foreground">
            This helps tailor the story for you.
        </p>
      </div>
      <div className="flex gap-4 mt-4">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button onClick={() => onSelect('male')} size="lg" className="font-headline">
            <User className="mr-2" /> Male
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button onClick={() => onSelect('female')} size="lg" className="font-headline" variant="secondary">
             <UserRound className="mr-2" /> Female
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GenderPromptView;
