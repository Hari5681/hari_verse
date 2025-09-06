
'use client';

import { motion } from 'framer-motion';
import { Clapperboard, Music, Puzzle, Sparkles } from 'lucide-react';
import AnimatedText from '../common/AnimatedText';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

type AdventureType = 'quiz' | 'music' | 'movies' | 'ai-tools';

interface AdventureViewProps {
  onSelect: (adventureType: AdventureType) => void;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
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

const adventures = [
    { type: 'quiz' as AdventureType, title: 'Quizzes', icon: Puzzle, description: 'Test your knowledge & have fun.' },
    { type: 'music' as AdventureType, title: 'Music', icon: Music, description: 'Listen to my favorite playlists.' },
    { type: 'movies' as AdventureType, title: 'Movies', icon: Clapperboard, description: 'Explore my top film picks.' },
    { type: 'ai-tools' as AdventureType, title: 'AI Tools', icon: Sparkles, description: 'Play with creative AI tools.' },
]

const AdventureView = ({ onSelect }: AdventureViewProps) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col items-center justify-center gap-8 text-center"
    >
      <AnimatedText text="Choose your adventure ✨" className="text-4xl sm:text-5xl font-headline text-primary-foreground" />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mt-4">
        {adventures.map((adventure) => (
             <motion.div
                key={adventure.type}
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelect(adventure.type)}
                className="cursor-pointer"
             >
                <Card className="h-full bg-card/70 backdrop-blur-sm hover:bg-card/90 transition-colors duration-300 border-border/50 hover:border-accent">
                    <CardHeader className="flex-row items-center gap-4">
                        <adventure.icon className="w-8 h-8 text-accent"/>
                        <CardTitle className="font-headline text-2xl text-accent-foreground">{adventure.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground font-body">{adventure.description}</p>
                    </CardContent>
                </Card>
             </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AdventureView;
