
'use client';

import { HeroSection } from './HeroSection';
import { MusicShowcase } from './MusicShowcase';
import { MoviesShowcase } from './MoviesShowcase';
import { FeaturedAiTools } from './FeaturedAiTools';
import { User, Mail, Send } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { ScrollToTopButton } from '@/components/common/ScrollToTopButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

type HomeViewProps = {
  name: string;
};

const Section = ({ id, children, className }: { id: string, children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Set inView to true when intersecting, and false when not
        setInView(entry.isIntersecting);
      },
      {
        threshold: 0.2, // Trigger when 20% of the section is visible
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);
  
  return (
      <section
          ref={ref}
          id={id}
          className={cn(
              "w-full flex flex-col items-center justify-center p-4 h-screen snap-start transition-opacity duration-1000 ease-in-out py-16 md:py-4 relative overflow-hidden",
              inView ? "opacity-100" : "opacity-0",
              className
          )}
      >
          <div className={cn("transition-transform duration-1000 ease-out w-full z-10", inView ? "translate-y-0" : "translate-y-10")}>
             {children}
          </div>
      </section>
  )
};

const ContactMeSection = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Contact form submitted:', { name, email, message });
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast({
        title: "Message Sent!",
        description: "Thanks for your feedback. I'll get back to you soon.",
      });
      // Reset form
      setName('');
      setEmail('');
      setMessage('');
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: "Something went wrong.",
            description: "Could not send your message. Please try again.",
        });
        console.error("Error saving contact message:", error);
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto">
        <Card className="w-full max-w-lg mx-auto bg-card/50 backdrop-blur-sm border-border/30">
         <form onSubmit={handleSubmit}>
            <CardHeader className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Mail className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Contact Me</CardTitle>
                <CardDescription className="text-md text-muted-foreground pt-2">
                    Have a question or feedback? Drop me a message below.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="home-name">Name</Label>
                    <Input 
                        id="home-name" 
                        placeholder="Enter your name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="home-email">Email</Label>
                    <Input 
                        id="home-email" 
                        type="email" 
                        placeholder="Enter your email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="home-message">Message</Label>
                    <Textarea
                        id="home-message"
                        placeholder="Your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        className="min-h-[120px]"
                    />
                </div>
            </CardContent>
            <CardFooter>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
                </Button>
            </CardFooter>
         </form>
      </Card>
    </div>
  );
};


export function HomeView({ name }: HomeViewProps) {
  return (
    <div className="w-full h-screen snap-y snap-mandatory overflow-y-scroll overflow-x-hidden">
      <section id="home" className="h-screen w-full flex flex-col items-center justify-center snap-start relative">
        <div className="absolute inset-0 w-full h-full bg-black">
            <div className="absolute inset-0 bg-grid-pattern opacity-30 animate-grid-pan" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        <HeroSection name={name} />
      </section>
      
      <Section id="music" className="bg-gradient-radial from-primary/5 to-transparent">
        <MusicShowcase />
      </Section>
      
      <Section id="movies" className="bg-gradient-radial from-red-500/5 to-transparent">
         <MoviesShowcase />
      </Section>

       <Section id="ai-tools" className="bg-gradient-radial from-red-500/5 to-transparent">
         <FeaturedAiTools />
      </Section>
      
      <Section id="contact">
        <ContactMeSection />
      </Section>

      <ScrollToTopButton />
    </div>
  );
}
