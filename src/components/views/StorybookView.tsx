
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const stories = [
  "Once upon a time, in a universe of pixels and dreams...",
  "...two souls found each other across the digital sea.",
  "They built worlds with laughter and painted skies with shared moments.",
  "Every day felt like a new, beautiful story unfolding.",
  "And this, right here, is just the beginning of their forever. ❤️"
];

const StorybookView = () => {
  return (
    <div className="w-full max-w-xs sm:max-w-sm animate-fade-in">
      <Carousel>
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
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default StorybookView;
