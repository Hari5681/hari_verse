
'use client';

import { motion } from 'framer-motion';
import AnimatedText from '../common/AnimatedText';
import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';
import Confetti from '../common/Confetti';
import { Instagram, Linkedin, Link as LinkIcon } from 'lucide-react';
import { Button } from '../ui/button';

const FinalThankYouView = () => {
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
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                    className="flex items-center gap-4 mt-4"
                >
                    <a href="https://www.hariportfolio.com" target="_blank" rel="noopener noreferrer">
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
        </div>
    );
};

export default FinalThankYouView;
