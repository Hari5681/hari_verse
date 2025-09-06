import { Play } from 'lucide-react';
import type { SpotifyTrack } from '@/lib/spotify';

type SongListProps = {
  songs: SpotifyTrack[];
};

const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${(parseInt(seconds) < 10 ? '0' : '')}${seconds}`;
};


export function SongList({ songs }: SongListProps) {
  return (
    <div className="rounded-lg bg-background/50 backdrop-blur-sm overflow-hidden">
      {songs.map(({track}, index) => track && (
        <div
          key={track.id || index}
          className="group flex items-center p-3 hover:bg-primary/10 transition-colors duration-200"
        >
          <div className="w-8 text-center text-muted-foreground mr-4">
            <span className="group-hover:hidden">{index + 1}</span>
            <Play className="w-5 h-5 hidden group-hover:inline-block fill-current" />
          </div>
          <div className="flex-grow">
            <p className="font-semibold">{track.name}</p>
            <p className="text-sm text-muted-foreground">
                {track.artists.map(artist => artist.name).join(', ')}
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            {formatDuration(track.duration_ms)}
          </div>
        </div>
      ))}
    </div>
  );
}
