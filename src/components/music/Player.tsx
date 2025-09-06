
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Slider } from '@/components/ui/slider';
import PlayIcon from '@/components/icons/PlayIcon';
import PauseIcon from '@/components/icons/PauseIcon';
import { SkipBack, SkipForward, Repeat, Shuffle, Heart, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';

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

  return (
    <Dialog>
      <div className="fixed bottom-0 left-0 right-0 z-50 animate-fade-in-up">
        <DialogTrigger asChild>
          <div className="h-24 cursor-pointer border-t border-border/50 bg-background/80 px-4 backdrop-blur-lg">
            <div className="container mx-auto flex h-full items-center justify-between">
              <div className="flex w-1/4 items-center gap-4 overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={song.title}
                  width={64}
                  height={64}
                  className="rounded-md flex-shrink-0"
                  data-ai-hint="song album cover"
                />
                <div className="overflow-hidden">
                  <p className="truncate font-bold">{songTitle}</p>
                  <p className="truncate text-sm text-muted-foreground">
                    {song.artist}
                  </p>
                </div>
              </div>

              <div className="flex w-1/2 max-w-2xl flex-col items-center gap-2">
                <div className="flex items-center gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPrev();
                    }}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <SkipBack />
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
                    <SkipForward />
                  </button>
                </div>
              </div>

              <div className="w-1/4">
                {/* Volume controls can go here */}
              </div>
            </div>
          </div>
        </DialogTrigger>
      </div>

      <DialogContent className="h-full max-h-full w-full max-w-full !rounded-none !border-none bg-gradient-to-b from-primary/30 to-background p-0">
        <div className="flex h-full flex-col p-4 sm:p-6 sm:pt-12">
          <header className="flex items-center justify-between">
            <DialogClose>
              <X className="h-6 w-6 opacity-70" />
            </DialogClose>
            <p className="font-semibold truncate px-4">{songTitle}</p>
            <div className="w-6" /> {/* Placeholder for spacing */}
          </header>

          <main className="flex flex-1 flex-col items-center justify-center gap-4 sm:gap-8 text-center px-4">
            <Image
              src={imageUrl}
              alt={song.title}
              width={500}
              height={500}
              className="aspect-square w-full max-w-xs sm:max-w-md rounded-lg shadow-2xl mt-4 sm:mt-0"
              data-ai-hint="song album cover"
            />
            <div className="w-full max-w-xs sm:max-w-md">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <h2 className="text-xl sm:text-2xl font-bold truncate">{songTitle}</h2>
                  <p className="text-muted-foreground truncate">{song.artist}</p>
                </div>
                <button onClick={() => setIsLiked(!isLiked)}>
                  <Heart
                    className={`h-6 w-6 transition-all ${
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

              <div className="mt-4 flex items-center justify-around sm:justify-between">
                <button className="text-muted-foreground transition-colors hover:text-foreground">
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
                  className="rounded-full bg-white p-3 sm:p-4 text-background"
                >
                  {isPlaying ? (
                    <PauseIcon className="h-7 w-7 sm:h-8 sm:w-8" />
                  ) : (
                    <PlayIcon className="h-7 w-7 sm:h-8 sm:w-8" />
                  )}
                </button>
                <button
                  onClick={onNext}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <SkipForward size={32} />
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
