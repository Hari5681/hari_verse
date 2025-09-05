
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquareHeart } from 'lucide-react';
import AnimatedText from '../common/AnimatedText';

interface CommentPromptViewProps {
  onSubmit: (comment: string) => void;
}

const CommentPromptView = ({ onSubmit }: CommentPromptViewProps) => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(comment.trim());
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.7, type: 'spring' }}
      className="flex flex-col items-center justify-center gap-6 text-center"
    >
      <MessageSquareHeart className="w-16 h-16 text-primary" />
      <AnimatedText text="Anything you want to say to me?" className="text-3xl sm:text-4xl font-headline text-primary-foreground" />
      <p className="text-lg font-headline text-muted-foreground -mt-4">
        (Your response will be sent to my mail)
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full max-w-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
          className="w-full"
        >
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Say something..."
            className="text-base min-h-[100px]"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button type="submit" size="lg" disabled={!comment.trim()}>
            Send <ArrowRight className="ml-2" />
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default CommentPromptView;
