
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Mail, Send } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

export function CtaSection() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
          setIsSubmitting(false);
          toast({
            title: "Message Sent!",
            description: "Thanks for your feedback. I'll get back to you soon.",
          });
          // Reset form
          setName('');
          setEmail('');
          setMessage('');
        }, 1000);
    };

    return (
        <section className="w-full py-16 sm:py-24 animate-fade-in-up">
            <div className="container mx-auto max-w-2xl text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4 animate-pulse-glow">
                    <Mail className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    Get In Touch
                </h2>
                <p className="mt-3 text-lg text-muted-foreground">
                    Have questions or feedback? Drop me a line.
                </p>
                <form onSubmit={handleSubmit} className="mt-8 text-left space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                         <Input
                            type="text"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="bg-background/80"
                            aria-label="Your Name"
                        />
                        <Input
                            type="email"
                            placeholder="Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="bg-background/80"
                            aria-label="Email"
                        />
                    </div>
                    <Textarea
                        placeholder="Your Message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        className="bg-background/80 min-h-[120px]"
                        aria-label="Your Message"
                    />
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                        {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
                    </Button>
                </form>
            </div>
        </section>
    );
}
