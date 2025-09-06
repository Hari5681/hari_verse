
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Slider } from '@/components/ui/slider';
import PlayIcon from '@/components/icons/PlayIcon';
import PauseIcon from '@/components/icons/PauseIcon';
import { SkipBack, SkipForward } from 'lucide-react';

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

  useEffect(() => {
    if (audioRef.current && song.url) {
      audioRef.current.src = song.url;
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.error("Audio play failed:", e));
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

  return (
    <div className="fixed bottom-0 left-0 right-0 h-24 bg-background/80 backdrop-blur-lg border-t border-border/50 z-50 animate-fade-in-up">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        <div className="flex items-center gap-4 w-1/4">
          <Image src={imageUrl} alt={song.title} width={64} height={64} className="rounded-md" data-ai-hint="song album cover" />
          <div>
            <p className="font-bold truncate">{song.title.replace(`${song.artist} - `, '')}</p>
            <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 w-1/2 max-w-2xl">
          <div className="flex items-center gap-4">
            <button onClick={onPrev} className="text-muted-foreground hover:text-foreground transition-colors"><SkipBack /></button>
            <button onClick={togglePlay} className="bg-primary text-primary-foreground rounded-full p-3 hover:bg-primary/90 transition-colors">
              {isPlaying ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6" />}
            </button>
            <button onClick={onNext} className="text-muted-foreground hover:text-foreground transition-colors"><SkipForward /></button>
          </div>
          <div className="w-full flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{formatDuration(progress)}</span>
            <Slider
                value={[progress]}
                max={duration || 1}
                step={1}
                onValueChange={handleSeek}
                className="w-full"
            />
            <span className="text-xs text-muted-foreground">{formatDuration(duration)}</span>
          </div>
        </div>

        <div className="w-1/4">
          {/* Volume controls can go here */}
        </div>
      </div>
    </div>
  );
}
