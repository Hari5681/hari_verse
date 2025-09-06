import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Music } from 'lucide-react';

export default function MusicPage() {
  const streamUrl = 'https://76c93ac1f8a63d255364ea7029e75232.r2.cloudflarestorage.com/hariverse-music/Hukum.mp3';

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 pt-20">
      <Card className="w-full max-w-md text-center bg-background/50 backdrop-blur-sm">
        <CardHeader>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Music className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="mt-4 text-3xl font-bold">HariVerse Music</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Now playing from Cloudflare.
          </p>
          <audio controls autoPlay className="w-full" src={streamUrl}>
            Your browser does not support the audio element.
          </audio>
        </CardContent>
      </Card>
    </div>
  );
}
