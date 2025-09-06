'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

type NamePromptViewProps = {
  onSubmit: (name: string) => void;
};

export function NamePromptView({ onSubmit }: NamePromptViewProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-transparent px-4">
      <Card className="w-full max-w-sm bg-background/50 backdrop-blur-sm">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-2xl">Welcome to HariVerse!</CardTitle>
            <CardDescription>
              What should I call you?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              aria-label="Your Name"
              className="bg-background/80"
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Continue
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
