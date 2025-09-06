
'use client';

import { motion } from 'framer-motion';
import { Clapperboard, Music, Puzzle, Sparkles, LogOut } from 'lucide-react';
import AnimatedText from '../common/AnimatedText';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

type AdventureType = 'quiz' | 'music' | 'movies' | 'ai-tools';

interface HomeViewProps {
  name: string;
  onReset: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
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
  { href: '/quiz', title: 'Quizzes', icon: Puzzle, description: 'Test your knowledge & have fun.' },
  { href: '/music', title: 'Music', icon: Music, description: 'Listen to my favorite playlists.' },
  { href: '/movies', title: 'Movies', icon: Clapperboard, description: 'Explore my top film picks.' },
  { href: '/ai-tools', title: 'AI Tools', icon: Sparkles, description: 'Play with creative AI tools.' },
];

const HomeView = ({ name, onReset }: HomeViewProps) => {
  const router = useRouter();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col items-center justify-center gap-8 text-center"
    >
      <AnimatedText text={`Welcome, ${name}!`} className="text-4xl sm:text-5xl font-headline text-primary-foreground" />
      
      <p className="text-lg text-muted-foreground font-body -mt-4">Choose your adventure ✨</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl mt-4">
        {adventures.map((adventure) => (
          <motion.div
            key={adventure.href}
            variants={itemVariants}
            whileHover={{ scale: 1.03, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push(adventure.href)}
            className="cursor-pointer"
          >
            <Card className="h-full bg-card/70 backdrop-blur-sm hover:bg-card/90 transition-colors duration-300 border-border/50 hover:border-accent">
              <CardHeader className="flex-row items-center gap-4">
                <adventure.icon className="w-8 h-8 text-accent" />
                <CardTitle className="font-headline text-2xl text-accent-foreground">{adventure.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-body">{adventure.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
       <motion.div variants={itemVariants}>
         <Button variant="ghost" onClick={onReset} className="text-muted-foreground mt-4">
            <LogOut className="mr-2 h-4 w-4" /> Not {name}?
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default HomeView;
