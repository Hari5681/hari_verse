
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { Album, Playlist, Song } from '@/lib/jiosaavn';
import PlayIcon from '@/components/icons/PlayIcon';

type SongCardProps = {
  item: Album | Playlist | Song;
  onPlay: (item: Album | Playlist | Song) => void;
  className?: string;
};

export function SongCard({ item, onPlay, className }: SongCardProps) {
  const imageUrl = item.image.find(q => q.quality === '150x150')?.link || item.image.find(q => q.quality === '500x500')?.link || item.image[0].link;
  const title = item.name || item.title;
  const description = item.type === 'song' ? item.primaryArtists : (item.subtitle || item.description || '');

  return (
    <div 
        className={cn('group cursor-pointer', className)}
        onClick={() => onPlay(item)}
    >
      <div className="relative mb-3 overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105">
        <Image
          src={imageUrl}
          alt={title}
          width={150}
          height={150}
          className="w-full h-auto object-cover aspect-square"
          data-ai-hint="song album cover"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
            <div className="w-12 h-12 bg-primary/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                <PlayIcon className="w-6 h-6 text-primary-foreground" />
            </div>
        </div>
      </div>
      <h3 className="font-bold text-md truncate">{title}</h3>
      {description && <p className="text-sm text-muted-foreground truncate" dangerouslySetInnerHTML={{ __html: description }}></p>}
    </div>
  );
}
