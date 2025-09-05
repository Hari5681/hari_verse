
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
  "Once upon a time, someone felt something special… 💫",
  "For 2 years, the feeling grew silently 💕",
  "Every eye contact became a conversation 🌙",
  "And now… it’s time to ask.",
];

interface StorybookViewProps {
    onContinue: () => void;
}

const StorybookView = ({ onContinue }: StorybookViewProps) => {
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
                <Card className="bg-primary/20 border-primary/50">
                  <CardContent className="font-body flex aspect-square items-center justify-center p-6 text-center text-lg sm:text-xl text-primary-foreground">
                    <span>{story}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="text-primary-foreground -left-4" />
        <CarouselNext className="text-primary-foreground -right-4" />
      </Carousel>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button onClick={onContinue} size="lg" className="font-headline mt-2">
          What is it?
          <ArrowRight className="ml-2"/>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default StorybookView;
