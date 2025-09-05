
import { Button } from '@/components/ui/button';

interface ProposalViewProps {
  proposalText: string;
  onResponse: (response: boolean) => void;
}

const ProposalView = ({ proposalText, onResponse }: ProposalViewProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 animate-fade-in">
      <p className="text-2xl sm:text-3xl font-headline text-primary-foreground leading-relaxed">
        {proposalText}
      </p>
      <div className="flex gap-4 mt-4">
        <Button onClick={() => onResponse(true)} size="lg" className="font-headline bg-accent hover:bg-accent/90 text-accent-foreground">
          Yes 💕
        </Button>
        <Button onClick={() => onResponse(false)} size="lg" variant="outline" className="font-headline">
          It’s okay 🌸
        </Button>
      </div>
    </div>
  );
};

export default ProposalView;
