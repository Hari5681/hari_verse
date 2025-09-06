
'use client';

import { motion } from 'framer-motion';
import AnimatedText from '../common/AnimatedText';
import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';
import Confetti from '../common/Confetti';
import { Instagram, Linkedin, Link as LinkIcon, RotateCw } from 'lucide-react';
import { Button } from '../ui/button';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 1.5,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

interface FinalThankYouViewProps {
    onRestart: () => void;
}


const FinalThankYouView = ({ onRestart }: FinalThankYouViewProps) => {
    const [animationData, setAnimationData] = useState<any>(null);

    useEffect(() => {
        // Using a deep copy to prevent the "object is not extensible" error with Lottie
        import('@/../public/lottie/celebration.json').then(module => {
            setAnimationData(JSON.parse(JSON.stringify(module.default)));
        });
    }, []);

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center">
            <Confetti />
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, type: 'spring' }}
                className="flex flex-col items-center justify-center gap-6 text-center"
            >
                {animationData && <Lottie animationData={animationData} loop={true} style={{ width: 250, height: 250 }} />}
                <AnimatedText
                    text="Thank you for visiting! 💖"
                    className="text-3xl sm:text-4xl font-headline text-primary-foreground"
                />
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="text-lg font-headline text-muted-foreground max-w-sm"
                >
                    You’ll always be special to me.
                </motion.p>
                 <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex items-center gap-4 mt-4"
                >
                    <motion.a variants={itemVariants} href="https://www.hariportfolio.xyz" target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="icon" aria-label="Portfolio">
                            <LinkIcon className="w-5 h-5 text-muted-foreground" />
                        </Button>
                    </motion.a>
                    <motion.a variants={itemVariants} href="https://www.linkedin.com/in/hari5681" target="_blank" rel="noopener noreferrer">
                         <Button variant="ghost" size="icon" aria-label="LinkedIn">
                            <Linkedin className="w-5 h-5 text-muted-foreground" />
                        </Button>
                    </motion.a>
                    <motion.a variants={itemVariants} href="https://www.instagram.com/hari.krishna.00" target="_blank" rel="noopener noreferrer">
                         <Button variant="ghost" size="icon" aria-label="Instagram">
                            <Instagram className="w-5 h:5 text-muted-foreground" />
                        </Button>
                    </motion.a>
                </motion.div>
                 <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 0.5 }}
                    className="mt-4"
                >
                    <Button onClick={onRestart} variant="outline" size="lg">
                        <RotateCw className="mr-2" /> Go Home
                    </Button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default FinalThankYouView;
