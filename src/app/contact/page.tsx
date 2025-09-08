
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contect_me')
        .insert({ name, email, message });

      if (error) throw error;
      
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
    <div className="flex min-h-screen items-center justify-center bg-background p-4 pt-20">
      <Card className="w-full max-w-lg">
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
                    <Label htmlFor="name">Name</Label>
                    <Input 
                        id="name" 
                        placeholder="Enter your name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                        id="email" 
                        type="email" 
                        placeholder="Enter your email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                        id="message"
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
}
