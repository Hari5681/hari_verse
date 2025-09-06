
'use client';

import { motion } from 'framer-motion';
import AnimatedText from '../common/AnimatedText';
import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Award, Instagram, Linkedin, Link as LinkIcon, MessageSquareHeart, RotateCw } from 'lucide-react';

interface ResultsViewProps {
  score: number;
  total: number;
  onRestart: () => void;
  onConnect: () => void;
}

const ResultsView = ({ score, total, onRestart, onConnect }: ResultsViewProps) => {
    const [animationData, setAnimationData] = useState<any>(null);

    useEffect(() => {
        import('@/../public/lottie/celebration.json').then(module => {
            setAnimationData(JSON.parse(JSON.stringify(module.default)));
        });
    }, []);

    const percentage = Math.round((score / total) * 100);
    let message = "Good try!";
    if (percentage > 80) {
        message = "Excellent work!";
    } else if (percentage > 50) {
        message = "Great job!";
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, type: 'spring' }}
            className="flex flex-col items-center justify-center gap-6 text-center"
        >
            {animationData && <Lottie animationData={animationData} loop={true} style={{ width: 200, height: 200, marginTop: -40 }} />}
            
            <AnimatedText
                text="Quiz Complete!"
                className="text-3xl sm:text-4xl font-headline text-primary-foreground -mt-8"
            />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex flex-col items-center gap-4 p-6 rounded-lg bg-card-foreground/5 w-full"
            >
                <p className="text-xl font-headline text-muted-foreground">You scored</p>
                <div className="flex items-end gap-2">
                    <p className="text-6xl font-bold font-headline text-primary">{score}</p>
                    <p className="text-3xl font-headline text-muted-foreground">/ {total}</p>
                </div>
                 <p className="text-2xl font-headline text-accent-foreground flex items-center gap-2 mt-2">
                    <Award className="w-6 h-6"/> {message}
                </p>
            </motion.div>
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="flex items-center gap-4"
            >
                <Button onClick={onConnect} size="lg" variant="default">
                    <MessageSquareHeart className="mr-2" /> Connect with me
                </Button>
                <Button onClick={onRestart} size="lg" variant="outline">
                    <RotateCw className="mr-2" /> Play Again
                </Button>
            </motion.div>
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="flex items-center gap-2 mt-4"
            >
                <a href="https://www.hariportfolio.xyz" target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon" aria-label="Portfolio">
                        <LinkIcon className="w-5 h-5 text-muted-foreground" />
                    </Button>
                </a>
                <a href="https://www.linkedin.com/in/hari5681" target="_blank" rel="noopener noreferrer">
                     <Button variant="ghost" size="icon" aria-label="LinkedIn">
                        <Linkedin className="w-5 h-5 text-muted-foreground" />
                    </Button>
                </a>
                <a href="https://www.instagram.com/hari.krishna.00" target="_blank" rel="noopener noreferrer">
                     <Button variant="ghost" size="icon" aria-label="Instagram">
                        <Instagram className="w-5 h-5 text-muted-foreground" />
                    </Button>
                </a>
            </motion.div>
        </motion.div>
    );
};

export default ResultsView;
