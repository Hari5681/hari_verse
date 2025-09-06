
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
      <AnimatedText text="Please select your gender" className="text-3xl sm:text-4xl font-headline text-primary-foreground" />
       <p className="text-lg font-headline text-muted-foreground -mt-4">
          This helps tailor the story for you.
        </p>
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
