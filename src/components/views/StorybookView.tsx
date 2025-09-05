
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
    "Once upon a time, someone felt something special… 💫",
    "For 2 years, the feeling grew silently 💕",
    "Every eye contact became a conversation 🌙",
    "And now… it’s time to ask.",
  ];
  
  interface StorybookViewProps {
      onContinue: () => void;
  }
  
  const StorybookView = ({ onContinue }: StorybookViewProps) => {

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
        <Carousel 
            className="w-full"
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
                    <Card className="bg-primary/20 border-primary/50">
                    <CardContent className="font-body flex aspect-square items-center justify-center p-6 text-center text-lg sm:text-xl text-primary-foreground">
                        <span>{story}</span>
                    </CardContent>
                    </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-primary-foreground -left-4" />
          <CarouselNext className="text-primary-foreground -right-4" />
        </Carousel>
      </motion.div>
    );
  };
  
  export default StorybookView;
  
