
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
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface Song {
  key: string;
  title: string;
  url: string;
  artist: string;
}

type PlayerProps = {
  song: Song;
  audioRef: React.RefObject<HTMLAudioElement>;
  onNext: () => void;
  onPrev: () => void;
};

const formatDuration = (secs: number) => {
  if (isNaN(secs)) return '0:00';
  const minutes = Math.floor(secs / 60);
  const seconds = Math.floor(secs % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export function Player({ song, audioRef, onNext, onPrev }: PlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  useEffect(() => {
    if (audioRef.current && song.url) {
      audioRef.current.src = song.url;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.error('Audio play failed:', e));
    }
  }, [song, audioRef]);
  
  const handleEnded = () => {
    if (isRepeat) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
      onNext();
    }
  };


  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => setProgress(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioRef, onNext, isRepeat]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setProgress(value[0]);
    }
  };
  
  const handleShuffle = () => {
    setIsShuffle(!isShuffle);
    if (!isShuffle && isRepeat) setIsRepeat(false);
  };
  
  const handleRepeat = () => {
      setIsRepeat(!isRepeat);
      if (!isRepeat && isShuffle) setIsShuffle(false);
  };

  const imageUrl = `https://picsum.photos/seed/${song.key}/500/500`;
  const songTitle = song.title.replace(`${song.artist} - `, '');

  const isTitleLong = songTitle.length > 25;
  const isMiniTitleLong = songTitle.length > 20;


  return (
    <Dialog>
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <DialogTrigger asChild>
          <div className="h-16 cursor-pointer border-t border-border/50 bg-background/80 px-4 backdrop-blur-lg md:h-20">
            <div className="container mx-auto flex h-full items-center justify-between gap-4">
              <div className="flex items-center gap-3 overflow-hidden md:w-1/4">
                <Image
                  src={imageUrl}
                  alt={song.title}
                  width={48}
                  height={48}
                  className="rounded-md flex-shrink-0 md:w-12 md:h-12"
                  data-ai-hint="song album cover"
                />
                <div className="overflow-hidden whitespace-nowrap">
                  <p className={cn("font-bold text-sm", isMiniTitleLong ? "animate-marquee-delayed" : "truncate")}>{songTitle}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {song.artist}
                  </p>
                </div>
              </div>

              <div className="hidden md:flex flex-1 items-center justify-center gap-4">
                 <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPrev();
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
                      onNext();
                    }}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <SkipForward size={24} />
                  </button>
              </div>

              <div className="flex items-center justify-end md:w-1/4">
                <div className="flex items-center gap-2 sm:gap-4 md:hidden">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPrev();
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
                      onNext();
                    }}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <SkipForward size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </DialogTrigger>
      </div>

      <DialogContent className="h-full max-h-full w-full max-w-full !rounded-none !border-none bg-gradient-to-b from-primary/30 to-background p-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-bottom-full data-[state=open]:slide-in-from-bottom-full">
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
                alt={song.title}
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
                  <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
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
                  onClick={handleShuffle}
                  className={cn("text-muted-foreground transition-colors hover:text-foreground", {"text-primary": isShuffle})}
                >
                  <Shuffle className="h-5 w-5" />
                </button>
                <button
                  onClick={onPrev}
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
                  onClick={onNext}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <SkipForward size={32} />
                </button>
                <button 
                  onClick={handleRepeat}
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
