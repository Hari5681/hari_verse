
import { Button } from '@/components/ui/button';

interface QuestionViewProps {
  question: string;
  onAnswer: (answer: boolean) => void;
}

const QuestionView = ({ question, onAnswer }: QuestionViewProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 animate-fade-in">
      <h2 className="text-3xl sm:text-4xl font-headline text-primary-foreground">
        {question}
      </h2>
      <div className="flex gap-4 mt-4">
        <Button onClick={() => onAnswer(true)} size="lg" className="font-headline">
          Yes
        </Button>
        <Button onClick={() => onAnswer(false)} size="lg" variant="secondary" className="font-headline">
          No
        </Button>
      </div>
    </div>
  );
};

export default QuestionView;
