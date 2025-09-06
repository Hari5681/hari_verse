import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';

export default function AboutMePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <User className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="mt-4 text-2xl font-bold">About Me</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This page is coming soon. Stay tuned!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
