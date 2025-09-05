'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { saveResponse } from './actions';
import { LoaderCircle, PartyPopper } from 'lucide-react';

export default function FirestoreTestPage() {
  const [name, setName] = useState('');
  const [answer, setAnswer] = useState<'Yes' | 'No' | ''>('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !answer) {
      setError('Please fill out all fields.');
      return;
    }
    setError('');
    setConfirmationMessage('');

    startTransition(async () => {
      const result = await saveResponse({ name, answer: answer as 'Yes' | 'No' });
      if (result.success) {
        setConfirmationMessage(result.message!);
        setName('');
        setAnswer('');
      } else {
        setError(result.error!);
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Save to Firestore</CardTitle>
          <CardDescription>Enter your name and an answer to save it to the database.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isPending}
              />
            </div>
            <div className="space-y-2">
              <Label>Will you be my special one?</Label>
              <RadioGroup
                value={answer}
                onValueChange={(value: 'Yes' | 'No') => setAnswer(value)}
                className="flex gap-4"
                disabled={isPending}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes" id="r1" />
                  <Label htmlFor="r1">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No" id="r2" />
                  <Label htmlFor="r2">No</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start">
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Response'
              )}
            </Button>
            {error && <p className="text-destructive text-sm mt-2">{error}</p>}
            {confirmationMessage && (
              <div className="mt-4 p-3 rounded-md bg-accent/20 text-accent-foreground flex items-center gap-2 text-sm">
                <PartyPopper className="h-4 w-4" />
                <span>{confirmationMessage}</span>
              </div>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
