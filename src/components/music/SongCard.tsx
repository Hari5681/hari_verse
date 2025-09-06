import Image from 'next/image';
import { cn } from '@/lib/utils';

type SongCardProps = {
  imageUrl: string;
  title: string;
  description: string;
  className?: string;
  dataAiHint?: string;
};

export function SongCard({ imageUrl, title, description, className, dataAiHint }: SongCardProps) {
  return (
    <div className={cn('group cursor-pointer', className)}>
      <div className="relative mb-3 overflow-hidden rounded-lg">
        <Image
          src={imageUrl}
          alt={title}
          width={300}
          height={300}
          data-ai-hint={dataAiHint}
          className="w-full h-auto object-cover aspect-square transform transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
      </div>
      <h3 className="font-bold text-md truncate">{title}</h3>
      <p className="text-sm text-muted-foreground truncate">{description}</p>
    </div>
  );
}