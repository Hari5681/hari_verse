import Image from 'next/image';
import { Play } from 'lucide-react';
import type { Song } from '@/lib/jiosaavn';
import { cn } from '@/lib/utils';

type SongListItemProps = {
  song: Song;
  onPlay: (song: Song) => void;
  trackNumber?: number;
};

const formatDuration = (s: string) => {
    const seconds = parseInt(s, 10);
    if (isNaN(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

export function SongListItem({ song, onPlay, trackNumber }: SongListItemProps) {
  const imageUrl = song.image.find(q => q.quality === '50x50')?.link || song.image[0].link;
  
  return (
    <div
      className="group flex items-center p-3 hover:bg-primary/10 transition-colors duration-200 rounded-md cursor-pointer"
      onClick={() => onPlay(song)}
    >
      <div className="w-12 text-center text-muted-foreground mr-4 relative">
        {imageUrl ? (
             <Image src={imageUrl} alt={song.name} width={48} height={48} className="rounded-md" />
        ) : (
            <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
                {trackNumber || <Play className="w-5 h-5" />}
            </div>
        )}
        <div className="absolute inset-0 bg-black/50 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Play className="w-6 h-6 fill-current text-white" />
        </div>
      </div>
      <div className="flex-grow">
        <p className="font-semibold truncate" dangerouslySetInnerHTML={{ __html: song.name }}></p>
        <p className="text-sm text-muted-foreground truncate" dangerouslySetInnerHTML={{ __html: song.primaryArtists }}></p>
      </div>
      <div className="text-sm text-muted-foreground">
        {formatDuration(song.duration)}
      </div>
    </div>
  );
}
