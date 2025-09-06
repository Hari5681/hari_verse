import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Music } from 'lucide-react';

export default function MusicPage() {
  // Direct link to an audio stream
  const streamUrl = "http://radio.garden/api/ara/content/listen/jNDe_a-s/channel.mp3";

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Music className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="mt-4 text-2xl font-bold">Live Stream</CardTitle>
          <p className="text-muted-foreground">Playing a direct audio stream</p>
        </CardHeader>
        <CardContent>
          <audio controls autoPlay className="w-full" src={streamUrl}>
            Your browser does not support the audio element.
          </audio>
        </CardContent>
      </Card>
    </div>
  );
}
