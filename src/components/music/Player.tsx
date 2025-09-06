
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

  useEffect(() => {
    if (audioRef.current && song.url) {
      audioRef.current.src = song.url;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.error('Audio play failed:', e));
    }
  }, [song, audioRef]);

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

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [audioRef]);

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

  const imageUrl = `https://picsum.photos/seed/${song.key}/500/500`;
  const songTitle = song.title.replace(`${song.artist} - `, '');

  // A simple check to see if the text is long. In a real app, you might measure it.
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
                  <p className={cn("font-bold text-sm", isMiniTitleLong ? "animate-marquee" : "truncate")}>{songTitle}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {song.artist}
                  </p>
                </div>
              </div>

              <div className="hidden md:flex flex-1 flex-col items-center gap-2">
                 {/* Desktop player controls can go here if needed in future */}
              </div>

              <div className="flex items-center justify-end md:w-1/4">
                <div className="flex items-center gap-2 sm:gap-4">
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
        <div className="flex h-full flex-col p-4 pt-8 sm:p-6 sm:pt-12">
          <header className="flex items-center justify-between">
            <DialogClose>
              <ChevronDown className="h-6 w-6 opacity-70" />
            </DialogClose>
            <div className="relative w-full max-w-xs overflow-hidden">
              <p className={`px-4 font-semibold text-center whitespace-nowrap ${isTitleLong ? 'animate-marquee' : 'truncate'}`}>
                {songTitle}
              </p>
            </div>
            <div className="w-6" /> {/* Placeholder for spacing */}
          </header>

          <main className="flex flex-1 flex-col items-center justify-start gap-4 text-center sm:gap-8 px-4 pt-8 sm:pt-12 animate-fade-in-up">
            <div className="w-full max-w-xs sm:max-w-md">
              <Image
                src={imageUrl}
                alt={song.title}
                width={500}
                height={500}
                className="aspect-square w-full max-w-[65vw] sm:max-w-md mx-auto rounded-lg shadow-2xl transition-transform duration-500 group-data-[state=open]:scale-100"
                data-ai-hint="song album cover"
              />
              <div className="flex items-center justify-between mt-6 sm:mt-8">
                <div className="text-left flex-1 overflow-hidden">
                  <h2 className="text-lg font-bold sm:text-2xl truncate">
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

              <div className="mt-4">
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

              <div className="mt-4 flex items-center justify-between">
                <button className="text-muted-foreground transition-colors hover:text-foreground">
                  <Shuffle className="h-5 w-5" />
                </button>
                <button
                  onClick={onPrev}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <SkipBack size={28} />
                </button>
                <button
                  onClick={togglePlay}
                  className="rounded-full bg-white p-3 text-background sm:p-4"
                >
                  {isPlaying ? (
                    <PauseIcon className="h-6 w-6 sm:h-8 sm:w-8" />
                  ) : (
                    <PlayIcon className="h-6 w-6 sm:h-8 sm:w-8" />
                  )}
                </button>
                <button
                  onClick={onNext}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <SkipForward size={28} />
                </button>
                <button className="text-muted-foreground transition-colors hover:text-foreground">
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
