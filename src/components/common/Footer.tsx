
import { Sparkles } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full text-center p-4 absolute bottom-0">
      <p className="text-sm text-muted-foreground font-headline flex items-center justify-center gap-2">
        Made with <Sparkles className="w-4 h-4 text-accent" /> by Hari (@hari.krishna.00)
      </p>
    </footer>
  );
};

export default Footer;
