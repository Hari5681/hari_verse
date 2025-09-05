
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Lottie from 'lottie-react';
import animationData from '@/../public/lottie/glowing-ring.json';

interface NamePromptViewProps {
  onSubmit: (name: string) => void;
}

const NamePromptView = ({ onSubmit }: NamePromptViewProps) => {
  const [name, setName] = useState('');
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    } else {
      setShowError(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.7, type: 'spring' }}
      className="flex flex-col items-center justify-center gap-6 text-center"
    >
        <Lottie animationData={animationData} loop={true} style={{ width: 250, height: 250, position: 'absolute', top: -120, opacity: 0.6 }} />
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-3xl sm:text-4xl font-headline text-primary-foreground z-10"
      >
        Before we begin, what should I call you?
      </motion.h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full max-w-sm z-10">
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="w-full"
        >
            <Input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (showError) setShowError(false);
              }}
              placeholder="Your name..."
              className="text-center text-lg h-12"
            />
        </motion.div>
        {showError && <p className="text-destructive text-sm">Please enter your name to continue!</p>}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button type="submit" size="lg">
            Continue <ArrowRight className="ml-2" />
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default NamePromptView;
