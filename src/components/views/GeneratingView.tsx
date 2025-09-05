
import { LoaderCircle } from 'lucide-react';

const GeneratingView = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 animate-fade-in">
      <LoaderCircle className="w-12 h-12 text-primary animate-spin" />
      <h2 className="text-2xl font-headline text-primary-foreground">
        Crafting something special for you...
      </h2>
    </div>
  );
};

export default GeneratingView;
