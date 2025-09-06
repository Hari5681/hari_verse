import { SongListItem } from './SongListItem';
import type { Song } from '@/lib/jiosaavn';

type SongListProps = {
  songs: Song[];
  onPlay: (song: Song, context: Song[]) => void;
};

export function SongList({ songs, onPlay }: SongListProps) {
  return (
    <div className="rounded-lg bg-background/50 backdrop-blur-sm overflow-hidden">
      <div className="flex flex-col">
        {songs.map((song, index) => (
          <SongListItem 
            key={song.id || index} 
            song={song} 
            onPlay={() => onPlay(song, songs)} 
            trackNumber={index + 1}
          />
        ))}
      </div>
    </div>
  );
}
