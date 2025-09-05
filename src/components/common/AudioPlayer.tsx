
'use client';

import { useEffect, useRef } from 'react';

interface AudioPlayerProps {
  src: string;
  play: boolean;
}

const AudioPlayer = ({ src, play }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    if (play) {
      audioElement.play().catch(error => {
        // Autoplay was prevented. This is common in browsers.
        // User interaction is required to start audio.
        console.warn("Audio playback failed to start:", error);
      });
    } else {
      audioElement.pause();
    }
  }, [play]);

  return (
    <audio ref={audioRef} src={src} loop preload="auto" />
  );
};

export default AudioPlayer;
