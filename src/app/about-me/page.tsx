
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { User, Github, Linkedin, Instagram, Mail } from 'lucide-react';
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
          <CardTitle className="text-3xl font-bold">Hari Krishna</CardTitle>
          <CardDescription className="text-md text-muted-foreground">
            3rd-year B.Tech Student | Aspiring Developer
          </CardDescription>
        </CardHeader>
        <CardContent className="text-left text-base text-foreground/80 space-y-4 px-8 pb-8">
          <p>
            Hi, I’m Hari Krishna, a 3rd-year B.Tech student in Electronics and Communication Engineering at Chaitanya Engineering College, Kommadi. I’m passionate about technology, coding, animations, and app development.
          </p>
          <p>
            Currently, I’m building projects like HariVerse, a creative portfolio app that blends design, music, and interactive features. I love experimenting with Android Studio, Jetpack Compose, and modern UI/UX designs.
          </p>
          <p>
            Beyond coding, I’m curious about AI tools, music apps, and 3D animation websites. My goal is to become a skilled developer and create apps that are both useful and fun for people.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center gap-4 border-t border-border/20 pt-6">
            <Link href="https://github.com/Hari5681" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <Link href="#" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </Link>
            <Link href="https://www.instagram.com/hari_5681/" target="_blank" rel="noopener noreferrer">
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
        </CardFooter>
      </Card>
    </div>
  );
}
