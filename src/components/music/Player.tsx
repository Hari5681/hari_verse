
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Slider } from '@/components/ui/slider';
import PlayIcon from '@/components/icons/PlayIcon';
import PauseIcon from '@/components/icons/PauseIcon';
import {
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Heart,
  ChevronDown,
  X,
  Volume2,
  MoreHorizontal,
  ArrowLeft,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { cleanSongTitle, getSongImageUrl } from '@/lib/musicUtils';
import { useMusicPlayer } from '@/context/MusicPlayerContext';


export function Player() {
  const { 
    currentSong, 
    audioRef, 
    playNext, 
    playPrev, 
    isPlaying, 
    togglePlay, 
    progress, 
    duration,
    handleSeek,
    isShuffle,
    toggleShuffle,
    isRepeat,
    toggleRepeat,
    stopPlayer,
  } = useMusicPlayer();
  const [isLiked, setIsLiked] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (!currentSong) {
    return null;
  }
  
  const handleShuffleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleShuffle();
  };
  
  const handleRepeatClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleRepeat();
  };

  const imageUrl = getSongImageUrl(currentSong.artist, currentSong.key, 500);
  const songTitle = cleanSongTitle(currentSong.title, currentSong.artist);

  const formatDuration = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <DialogTrigger asChild>
          <div className="h-16 cursor-pointer border-t border-border/50 bg-background/80 px-2 sm:px-4 backdrop-blur-lg">
            <div className="container mx-auto flex h-full items-center justify-between gap-4">
              <div className="flex items-center gap-3 overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={currentSong.title}
                  width={40}
                  height={40}
                  className="rounded-md flex-shrink-0 object-cover aspect-square"
                  data-ai-hint="song album cover"
                />
                <div className="overflow-hidden whitespace-nowrap min-w-0">
                  <p className="font-bold text-sm truncate">{songTitle}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {currentSong.artist}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay();
                    }}
                    className="text-foreground"
                  >
                    {isPlaying ? (
                      <PauseIcon className="h-6 w-6" />
                    ) : (
                      <PlayIcon className="h-6 w-6" />
                    )}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playNext();
                    }}
                    className="text-muted-foreground transition-colors hover:text-foreground hidden sm:block"
                  >
                    <SkipForward size={22} />
                  </button>
                   <button
                      onClick={(e) => {
                        e.stopPropagation();
                        stopPlayer();
                      }}
                      className="text-muted-foreground transition-colors hover:text-foreground ml-2"
                    >
                      <X size={20} />
                    </button>
                </div>
            </div>
          </div>
        </DialogTrigger>
      </div>

      <DialogContent className="h-[90vh] max-h-[90vh] w-[95vw] max-w-md !rounded-3xl !border-none p-0 flex flex-col bg-card shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-bottom-full data-[state=open]:slide-in-from-bottom-full">
        
        <div className="p-6 pb-2">
            <header className="flex items-center justify-between text-foreground">
                <button onClick={() => setIsDialogOpen(false)} className='flex items-center gap-2'>
                    <ArrowLeft className="h-5 w-5" />
                    <span className="font-semibold text-sm">Library</span>
                </button>
                <button>
                    <MoreHorizontal className="h-5 w-5" />
                </button>
            </header>
        </div>
        
        <main className="flex-1 flex flex-col items-center justify-start py-4 px-6 overflow-hidden">
            <div className="w-full aspect-square relative">
                <Image
                    src={imageUrl}
                    alt={currentSong.title}
                    fill
                    className="rounded-2xl shadow-lg object-cover"
                    data-ai-hint="song album cover"
                />
                <div className='absolute bottom-4 right-4'>
                    <button className='w-10 h-10 bg-background/50 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground'>
                        <Volume2 size={20}/>
                    </button>
                </div>
            </div>
        </main>
        
        <footer className="px-6 pb-8 pt-4">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold truncate text-foreground">
                    {currentSong.artist}
                </h2>
                <p className="text-sm text-muted-foreground uppercase tracking-widest truncate">{songTitle}</p>
            </div>

            <div className="space-y-2">
              <Slider
                value={[progress]}
                max={duration || 1}
                step={1}
                onValueChange={handleSeek}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatDuration(progress)}</span>
                <span>{formatDuration(duration)}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-around text-foreground">
              <button onClick={() => setIsLiked(!isLiked)} className="ml-4 flex-shrink-0">
                  <Heart
                      className={`h-6 w-6 transition-all ${
                      isLiked
                          ? 'fill-primary text-primary'
                          : 'text-muted-foreground'
                      }`}
                  />
              </button>
              <button
                onClick={playPrev}
                className="text-foreground transition-colors hover:text-primary"
              >
                <SkipBack size={28} fill='currentColor' />
              </button>
              <button
                onClick={togglePlay}
                className="rounded-full bg-foreground h-16 w-16 flex items-center justify-center text-background"
              >
                {isPlaying ? (
                  <PauseIcon className="h-8 w-8" />
                ) : (
                  <PlayIcon className="h-8 w-8" />
                )}
              </button>
              <button
                onClick={playNext}
                className="text-foreground transition-colors hover:text-primary"
              >
                <SkipForward size={28} fill='currentColor' />
              </button>
              <button 
                onClick={handleShuffleClick}
                className={cn("text-muted-foreground transition-colors hover:text-primary", {"text-primary": isShuffle})}
              >
                <Shuffle className="h-6 w-6" />
              </button>
            </div>
        </footer>

      </DialogContent>
    </Dialog>
  );
}
