
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { User, Github, Linkedin, Instagram, Mail, Globe } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AboutMePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 pt-20">
      <Card className="w-full max-w-2xl text-center animate-fade-in-up">
        <CardHeader>
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-4">
            <User className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold">Bothsa Hari Krishna</CardTitle>
          <CardDescription className="text-md text-muted-foreground">
            Tech Enthusiast & Creator
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center text-base text-foreground/80 space-y-4 px-8 pb-8">
            <p>
                I’m someone who loves bringing ideas to life — whether it’s an app, a website, or just a random concept that pops into my head at 2 AM. Some of them turn into full projects, others stay as fun experiments, but every single one teaches me something new.
            </p>
            <p>
                I built HariVerse, my own digital space where I blend tech, creativity, music, and AI into one world. It’s more than a project — it’s my little universe where imagination has no limits.
            </p>
            <p>
                I’m the kind of person who enjoys exploring new tools, breaking things just to fix them better, and adding a bit of design magic to everything I make. I believe that great things are built when curiosity meets passion.
            </p>
            <p>
                At the end of the day, I’m just here to keep learning, keep building, and create stuff that makes people smile or think “whoa, that’s cool.”
            </p>
             <p className="font-semibold">
                Check out my world 🌐 — <Link href={`/redirect?url=${encodeURIComponent("https://www.hariportfolio.xyz")}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">hariportfolio.xyz</Link>
            </p>
            <blockquote className="mt-6 border-l-2 border-primary pl-6 italic text-foreground/90">
                “It’s not about being perfect — it’s about being curious enough to keep creating.”
            </blockquote>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-4 border-t border-border/20 pt-6">
            <div className="flex justify-center gap-4">
                <Link href={`/redirect?url=${encodeURIComponent("https://github.com/Hari5681")}`} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon">
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                </Link>
                <Link href={`/redirect?url=${encodeURIComponent("https://www.linkedin.com/in/hari5681/")}`} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon">
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                </Link>
                <Link href={`/redirect?url=${encodeURIComponent("https://www.instagram.com/hari.krishna.00/")}`} target="_blank" rel="noopener noreferrer">
                   <Button variant="outline" size="icon">
                    <Instagram className="h-5 w-5" />
                     <span className="sr-only">Instagram</span>
                  </Button>
                </Link>
                <Link href="mailto:harikrishna5681@gmail.com">
                   <Button variant="outline" size="icon">
                    <Mail className="h-5 w-5" />
                    <span className="sr-only">Email</span>
                  </Button>
                </Link>
            </div>
        </CardFooter>
      </Card>
    </div>
  );
}
