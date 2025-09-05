
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

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
  return (
    <motion.div 
        className="w-full max-w-xs sm:max-w-sm flex flex-col items-center gap-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
    >
      <Carousel className="w-full">
        <CarouselContent>
          {stories.map((story, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="bg-secondary/50 border-secondary/80">
                  <CardContent className="font-body flex aspect-square items-center justify-center p-6 text-center text-lg sm:text-xl text-secondary-foreground">
                    <span>{story}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="text-secondary-foreground -left-4" />
        <CarouselNext className="text-secondary-foreground -right-4" />
      </Carousel>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button onClick={onContinue} size="lg" className="font-headline mt-2" variant="secondary">
          Continue
          <ArrowRight className="ml-2"/>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default BrokenStoryView;
