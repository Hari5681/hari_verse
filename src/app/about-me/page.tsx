
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
          <CardTitle className="text-3xl font-bold">Hari Krishna</CardTitle>
          <CardDescription className="text-md text-muted-foreground">
            App & Web Developer
          </CardDescription>
        </CardHeader>
        <CardContent className="text-left text-base text-foreground/80 space-y-4 px-8 pb-8">
          <p>
            Hi, I’m Hari Krishna, a 3rd-year ECE student at Chaitanya Engineering College, Kommadi. I’m an App & Web Developer who loves building creative digital experiences.
          </p>
          <p>
            I’ve been working on projects like HariVerse, where I combine Android app development, web design, animations, and AI tools to create something unique.
          </p>
          <div>
            <h4 className="font-semibold text-foreground mb-2">💡 My interests:</h4>
            <ul className="list-none space-y-2 text-foreground/80">
              <li>📱 App Development (Android Studio, Jetpack Compose, Kotlin)</li>
              <li>🌐 Web Development (creative portfolio sites, interactive designs)</li>
              <li>🤖 AI Tools & APIs</li>
              <li>🎶 Music-based apps & platforms</li>
            </ul>
          </div>
          <p>
            My goal is to keep learning, experimenting, and developing apps & websites that are not just functional but also fun to use.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center gap-4 border-t border-border/20 pt-6">
            <Link href="https://www.hariportfolio.xyz" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Portfolio</span>
              </Button>
            </Link>
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
