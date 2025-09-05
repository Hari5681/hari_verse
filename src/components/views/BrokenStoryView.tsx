
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Card, CardContent } from "../ui/card";

const stories = [
    "Once, a boy loved silently, hiding his feelings 💔.",
    "He dreamed, he smiled, but he never said the words 🌙.",
    "The girl walked away… and the boy kept the story inside 💭.",
    "Sometimes, broken hearts shine the brightest 🌌.",
];

interface BrokenStoryViewProps {
    onContinue: () => void;
}

const BrokenStoryView = ({ onContinue }: BrokenStoryViewProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
          onContinue();
        }, (stories.length + 1) * 2000); // Wait for all stories to show
        return () => clearTimeout(timer);
      }, [onContinue]);

  return (
    <motion.div 
        className="w-full max-w-xs sm:max-w-sm flex flex-col items-center gap-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
    >
      <Carousel className="w-full"
        opts={{
            loop: false,
        }}
      >
        <CarouselContent>
          {stories.map((story, index) => (
            <CarouselItem key={index}>
                <motion.div
                    className="p-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 2, duration: 1.5 }}
                >
                    <Card className="bg-secondary/50 border-secondary/80">
                    <CardContent className="font-body flex aspect-square items-center justify-center p-6 text-center text-lg sm:text-xl text-secondary-foreground">
                        <span>{story}</span>
                    </CardContent>
                    </Card>
                </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="text-secondary-foreground -left-4" />
        <CarouselNext className="text-secondary-foreground -right-4" />
      </Carousel>
    </motion.div>
  );
};

export default BrokenStoryView;
