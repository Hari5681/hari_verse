
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Mail } from 'lucide-react';

export function CtaSection() {
    const [email, setEmail] = useState('');
    const { toast } = useToast();

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        // Basic email validation
        if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
             toast({
                title: "Subscribed!",
                description: "You're now on the list for weekly recommendations.",
            });
            setEmail('');
        } else {
            toast({
                variant: 'destructive',
                title: "Invalid Email",
                description: "Please enter a valid email address.",
            });
        }
    };

    return (
        <section className="w-full py-12 sm:py-16 animate-fade-in-up">
            <div className="mx-auto max-w-2xl text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4 animate-pulse-glow">
                    <Mail className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Stay in the Loop
                </h2>
                <p className="mt-3 text-lg text-muted-foreground">
                    Get weekly recommendations and exclusive content delivered straight to your inbox.
                </p>
                <form onSubmit={handleSubscribe} className="mt-8 flex w-full max-w-md mx-auto items-center space-x-2">
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="flex-1 bg-background/80"
                        aria-label="Email for newsletter"
                    />
                    <Button type="submit">Subscribe</Button>
                </form>
            </div>
        </section>
    );
}
