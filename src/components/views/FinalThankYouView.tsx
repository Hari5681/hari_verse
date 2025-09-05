
'use client';

import { motion } from 'framer-motion';
import AnimatedText from '../common/AnimatedText';
import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';
import Confetti from '../common/Confetti';

const FinalThankYouView = () => {
    const [animationData, setAnimationData] = useState<any>(null);

    useEffect(() => {
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
            </motion.div>
        </div>
    );
};

export default FinalThankYouView;
