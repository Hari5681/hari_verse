'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Gift, X } from 'lucide-react';
import AnimatedText from '../common/AnimatedText';

interface PreStorybookViewProps {
  onContinue: (response: boolean) => void;
}

const PreStorybookView = ({ onContinue }: PreStorybookViewProps) => {
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
        animate={{ scale: 1, rotate: [-10, 10, -5, 5, 0] }}
        transition={{ delay: 0.3, duration: 0.5, type: 'spring', stiffness: 150 }}
      >
        <Gift className="w-16 h-16 text-primary" />
      </motion.div>
      <AnimatedText text="Would you like to know my story?" className="text-3xl sm:text-4xl font-headline text-primary-foreground" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="flex items-center gap-4 mt-4"
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={() => onContinue(true)} size="lg" className="font-headline">
                Yes, show me
                <ArrowRight className="ml-2" />
            </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={() => onContinue(false)} size="lg" variant="outline" className="font-headline">
                No, it's okay
                <X className="ml-2" />
            </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default PreStorybookView;
