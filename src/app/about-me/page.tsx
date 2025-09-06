
'use client';

import AnimatedText from '@/components/common/AnimatedText';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Download, Github, Linkedin, Mail } from 'lucide-react';

const AboutMePage = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-12 pb-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatedText
          text="About Me"
          className="text-5xl sm:text-6xl font-headline text-primary-foreground"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="max-w-2xl"
      >
        <Card className="bg-card/70 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="font-headline text-3xl text-accent-foreground">
              Hari Krishna
            </CardTitle>
          </CardHeader>
          <CardContent className="text-lg text-muted-foreground font-body space-y-4">
            <p>
              I&apos;m a passionate developer and creative thinker with a love for building beautiful and functional web experiences. This little universe is a playground for my ideas.
            </p>
            <p>
              When I&apos;m not coding, you can find me exploring new technologies, listening to music, or getting lost in a good movie.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        <Button asChild>
          <a href="https://www.linkedin.com/in/hari5681" target="_blank" rel="noopener noreferrer">
            <Linkedin className="mr-2" /> LinkedIn
          </a>
        </Button>
        <Button asChild variant="secondary">
           <a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer">
            <Github className="mr-2" /> GitHub
          </a>
        </Button>
        <Button asChild variant="outline">
          <a href="mailto:your-email@example.com">
            <Mail className="mr-2" /> Email Me
          </a>
        </Button>
         <Button asChild variant="outline">
          <a href="/path-to-your-cv.pdf" download>
            <Download className="mr-2" /> Download CV
          </a>
        </Button>
      </motion.div>
    </div>
  );
};

export default AboutMePage;
