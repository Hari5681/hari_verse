
import { Button } from '@/components/ui/button';
import Confetti from '@/components/common/Confetti';

interface ResponseViewProps {
  isYes: boolean;
  affirmativeText: string;
  negativeText: string;
  onContinue: () => void;
}

const ResponseView = ({ isYes, affirmativeText, negativeText, onContinue }: ResponseViewProps) => {
  return (
    <div className="relative flex flex-col items-center justify-center gap-8 animate-fade-in">
      {isYes && <Confetti />}
      <p className="text-2xl sm:text-3xl font-headline text-primary-foreground leading-relaxed">
        {isYes ? affirmativeText : negativeText}
      </p>
      <Button onClick={onContinue} size="lg" className="font-headline mt-4">
        Continue
      </Button>
    </div>
  );
};

export default ResponseView;
