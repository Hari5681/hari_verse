
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface IntroViewProps {
  onStart: () => void;
}

const IntroView = ({ onStart }: IntroViewProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 animate-fade-in">
      <div className="flex items-center gap-2">
        <h1 className="text-4xl sm:text-5xl font-headline text-primary-foreground">
          Welcome to HariVerse
        </h1>
        <Sparkles className="w-8 h-8 text-accent" />
      </div>
      <p className="text-lg font-headline text-muted-foreground">
        A space made with love and creativity.
      </p>
      <Button onClick={onStart} size="lg" className="font-headline mt-4">
        Start
      </Button>
    </div>
  );
};

export default IntroView;
