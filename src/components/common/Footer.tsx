import Link from 'next/link';
import { Github, Instagram, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative z-10 w-full border-t border-border/20">
      <div className="container mx-auto flex h-16 items-center justify-center px-4 md:px-6">
        <p className="text-sm text-muted-foreground">
          © 2025 HariVerse. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
