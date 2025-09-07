
'use client';

import { useState, useEffect } from 'react';
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
  X
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { cleanSongTitle } from '@/lib/musicUtils';
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
    stopPlayer
  } = useMusicPlayer();
  const [isLiked, setIsLiked] = useState(false);

  // If there's no song, render a placeholder bar on music pages
  if (!currentSong) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 h-16 border-t border-border/50 bg-background/80 backdrop-blur-lg" />
    );
  }

  const handleShuffleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleShuffle();
  };
  
  const handleRepeatClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleRepeat();
  };

  const imageUrl = `https://picsum.photos/seed/${currentSong.key}/500/500`;
  const songTitle = cleanSongTitle(currentSong.title, currentSong.artist);

  const isTitleLong = songTitle.length > 25;
  const isMiniTitleLong = songTitle.length > 20;

  const formatDuration = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <Dialog>
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
                  className="rounded-md flex-shrink-0"
                  data-ai-hint="song album cover"
                />
                <div className="overflow-hidden whitespace-nowrap min-w-0">
                  <p className={cn("font-bold text-sm", isMiniTitleLong && "md:animate-marquee-delayed", "truncate")}>{songTitle}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {currentSong.artist}
                  </p>
                </div>
              </div>

              <div className="hidden md:flex flex-1 items-center justify-center gap-4">
                 <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playPrev();
                    }}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <SkipBack size={24} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay();
                    }}
                    className="rounded-full bg-primary p-3 text-primary-foreground transition-colors hover:bg-primary/90"
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
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <SkipForward size={24} />
                  </button>
              </div>

              <div className="flex items-center justify-end md:hidden">
                <div className="flex items-center gap-2 sm:gap-4">
                  <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playPrev();
                      }}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <SkipBack size={20} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay();
                    }}
                    className="rounded-full bg-primary p-2 text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    {isPlaying ? (
                      <PauseIcon className="h-5 w-5" />
                    ) : (
                      <PlayIcon className="h-5 w-5" />
                    )}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playNext();
                    }}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <SkipForward size={20} />
                  </button>
                  {!isPlaying && (
                    <button
                        onClick={(e) => {
                          e.stopPropagation();
                          stopPlayer();
                        }}
                        className="text-muted-foreground transition-colors hover:text-foreground ml-2"
                      >
                        <X size={20} />
                      </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </DialogTrigger>
      </div>

      <DialogContent className="h-full max-h-full w-full max-w-full !rounded-none !border-none bg-gradient-to-b from-primary/30 to-background p-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-bottom-full data-[state=open]:slide-in-from-bottom-full">
        <DialogTitle className="sr-only">Now Playing: {songTitle}</DialogTitle>
        <div className="flex h-full flex-col p-4 pt-8 sm:p-6">
          <header className="flex items-center justify-between flex-shrink-0">
            <DialogClose>
              <ChevronDown className="h-6 w-6 opacity-70" />
            </DialogClose>
            <div className="relative w-full max-w-xs overflow-hidden">
              <p className={`px-4 font-semibold text-center whitespace-nowrap ${isTitleLong ? 'animate-marquee-delayed' : 'truncate'}`}>
                {songTitle}
              </p>
            </div>
            <div className="w-6" /> 
          </header>

          <main className="flex flex-1 flex-col items-center justify-center gap-4 text-center px-4 animate-fade-in-up">
            <div className="w-full max-w-xs sm:max-w-md">
              <Image
                src={imageUrl}
                alt={currentSong.title}
                width={500}
                height={500}
                className="aspect-square w-full max-w-[70vw] sm:max-w-md mx-auto rounded-lg shadow-2xl transition-transform duration-500 group-data-[state=open]:scale-100 animate-fade-in-up"
                data-ai-hint="song album cover"
                style={{ animationDelay: '200ms' }}
              />
              <div className="flex items-center justify-between mt-6 sm:mt-8 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                <div className="text-left flex-1 overflow-hidden">
                  <h2 className="text-xl font-bold sm:text-2xl truncate">
                    {songTitle}
                  </h2>
                  <p className="text-sm text-muted-foreground truncate">{currentSong.artist}</p>
                </div>
                <button onClick={() => setIsLiked(!isLiked)} className="ml-4 flex-shrink-0">
                  <Heart
                    className={`h-5 w-5 sm:h-6 sm:w-6 transition-all ${
                      isLiked
                        ? 'fill-green-500 text-green-500'
                        : 'text-muted-foreground'
                    }`}
                  />
                </button>
              </div>

              <div className="mt-4 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                <Slider
                  value={[progress]}
                  max={duration || 1}
                  step={1}
                  onValueChange={handleSeek}
                  className="w-full"
                />
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>{formatDuration(progress)}</span>
                  <span>{formatDuration(duration)}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-around animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                <button 
                  onClick={handleShuffleClick}
                  className={cn("text-muted-foreground transition-colors hover:text-foreground", {"text-primary": isShuffle})}
                >
                  <Shuffle className="h-5 w-5" />
                </button>
                <button
                  onClick={playPrev}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <SkipBack size={32} />
                </button>
                <button
                  onClick={togglePlay}
                  className="rounded-full bg-white p-4 text-background"
                >
                  {isPlaying ? (
                    <PauseIcon className="h-8 w-8" />
                  ) : (
                    <PlayIcon className="h-8 w-8" />
                  )}
                </button>
                <button
                  onClick={playNext}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <SkipForward size={32} />
                </button>
                <button 
                  onClick={handleRepeatClick}
                  className={cn("text-muted-foreground transition-colors hover:text-foreground", {"text-primary": isRepeat})}
                >
                  <Repeat className="h-5 w-5" />
                </button>
              </div>
            </div>
          </main>
        </div>
      </DialogContent>
    </Dialog>
  );
}
