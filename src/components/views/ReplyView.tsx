
'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import AnimatedText from '@/components/common/AnimatedText';

interface ReplyViewProps {
  reply: string;
  onContinue: () => void;
}

const ReplyView = ({ reply, onContinue }: ReplyViewProps) => {
  // Don't render anything if the reply is just "..." (for the silent smile moment)
  if (reply === "...") {
     // Immediately continue after a short delay to simulate a pause/smile
     setTimeout(onContinue, 1200); 
     return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center h-48"
        >
             <AnimatedText text="😊" className="text-4xl" />
        </motion.div>
     );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center gap-6 text-center"
    >
      <p className="text-xl font-headline text-muted-foreground italic">
        {reply}
      </p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button onClick={onContinue} size="lg" variant="ghost" className="mt-4 text-primary-foreground/70">
          <ArrowRight />
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default ReplyView;
