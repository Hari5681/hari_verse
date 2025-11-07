
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { User, Github, Linkedin, Instagram, Mail, Globe, Rocket } from 'lucide-react';
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
                Hey! I’m Bothsa Hari Krishna, a tech enthusiast who loves creating, designing, and experimenting with new ideas. I enjoy building Android apps, exploring AI and IoT, and bringing creative thoughts to life through code.
            </p>
            <p>
                I’m always curious, always learning, and constantly working on cool projects like HariVerse — my personal creative space.
            </p>
             <p className="font-semibold">
                Check out my portfolio 👉 <Link href={`/redirect?url=${encodeURIComponent("https://www.hariportfolio.xyz")}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">hariportfolio.xyz</Link>
            </p>
            <blockquote className="mt-6 border-l-2 border-primary pl-6 italic text-foreground/90">
                “Dream. Build. Evolve.” <Rocket className="inline-block h-5 w-5 ml-1" />
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
