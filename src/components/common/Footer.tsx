import Link from 'next/link';
import { Github, Instagram, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative z-10 w-full border-t border-border/20">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 text-center md:px-6">
        <p className="text-sm text-muted-foreground">
          © 2025 HariVerse. All rights reserved.
        </p>
        <div className="flex items-center space-x-4">
          <Link href="https://www.instagram.com/hari.krishna.00/#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-primary">
            <Instagram className="h-5 w-5" />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link href="https://www.linkedin.com/in/hari5681/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-primary">
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link href="https://github.com/Hari5681" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-primary">
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link href="mailto:hari7569871463@gmail.com" className="text-muted-foreground transition-colors hover:text-primary">
            <Mail className="h-5 w-5" />
            <span className="sr-only">Mail</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
