
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
                Hey, I’m Hari Krishna
            </p>
            <p>
                I’m the kind of guy who loves turning random ideas into apps and websites — sometimes they’re useful, sometimes they’re just fun experiments, but they always teach me something new. My digital playground is HariVerse, where I mix music, movies, and AI tools into one creative hub.
            </p>
            <p>
                I enjoy exploring new tech, adding a pinch of design magic, and seeing how far I can push an idea before it turns into something cool. Half the time I’m coding, the other half I’m just saying “wait… what if I tried this?”
            </p>
            <p>
                At the end of the day, I’m here to keep learning, keep creating, and hopefully make things that surprise people — in a good way.
            </p>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-6 border-t border-border/20 pt-6">
            <Link href={`/redirect?url=${encodeURIComponent("https://www.hariportfolio.xyz")}`} target="_blank" rel="noopener noreferrer">
              <Button className="shadow-[0_0_20px_hsl(var(--primary)/0.4)] transition-shadow hover:shadow-[0_0_30px_hsl(var(--primary)/0.6)]">
                <Globe className="h-5 w-5 mr-2" />
                View My Portfolio
              </Button>
            </Link>
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
