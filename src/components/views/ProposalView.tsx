
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import animationData from '@/../public/lottie/glowing-ring.json';
import AnimatedText from '@/components/common/AnimatedText';

interface ProposalViewProps {
  proposalText: string;
  onResponse: (response: boolean) => void;
}

const ProposalView = ({ proposalText, onResponse }: ProposalViewProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: 'spring' }}
      className="flex flex-col items-center justify-center gap-8"
    >
      <Lottie animationData={animationData} loop={true} style={{ width: 250, height: 250 }} />
      <AnimatedText text={proposalText} className="text-2xl sm:text-3xl font-headline text-primary-foreground leading-relaxed text-center" />
      <div className="flex gap-4 mt-4">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button onClick={() => onResponse(true)} size="lg" className="font-headline bg-accent text-accent-foreground hover:bg-accent/90">
            Yes 💕
            </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button onClick={() => onResponse(false)} size="lg" variant="outline" className="font-headline">
            It’s okay 🌸
            </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProposalView;
