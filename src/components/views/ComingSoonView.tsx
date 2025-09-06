
'use client';

import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { ArrowLeft, Wrench } from 'lucide-react';
import AnimatedText from '../common/AnimatedText';

interface ComingSoonViewProps {
  onBack: () => void;
}

const ComingSoonView = ({ onBack }: ComingSoonViewProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, type: 'spring' }}
      className="flex flex-col items-center justify-center gap-8 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: [0, 20, -10, 0] }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
      >
        <Wrench className="w-20 h-20 text-primary" />
      </motion.div>
      <AnimatedText
        text="Coming Soon!"
        className="text-4xl sm:text-5xl font-headline text-primary-foreground"
      />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-lg text-muted-foreground font-body max-w-md"
      >
        This part of the universe is still under construction. Check back later!
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button onClick={onBack} size="lg" variant="outline">
          <ArrowLeft className="mr-2" />
          Go Back
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default ComingSoonView;
