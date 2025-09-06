import { Play } from 'lucide-react';

type Song = {
  number: number;
  title: string;
  artist: string;
  duration: string;
};

type SongListProps = {
  songs: Song[];
};

export function SongList({ songs }: SongListProps) {
  return (
    <div className="rounded-lg bg-background/50 backdrop-blur-sm overflow-hidden">
      {songs.map((song, index) => (
        <div
          key={song.number}
          className="group flex items-center p-3 hover:bg-primary/10 transition-colors duration-200"
        >
          <div className="w-8 text-center text-muted-foreground mr-4">
            <span className="group-hover:hidden">{song.number}</span>
            <Play className="w-5 h-5 hidden group-hover:inline-block fill-current" />
          </div>
          <div className="flex-grow">
            <p className="font-semibold">{song.title}</p>
            <p className="text-sm text-muted-foreground">{song.artist}</p>
          </div>
          <div className="text-sm text-muted-foreground">
            {song.duration}
          </div>
        </div>
      ))}
    </div>
  );
}