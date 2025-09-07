
'use client';

import React, { createContext, useContext, useRef, useState, useEffect, useCallback } from 'react';

interface Song {
  key: string;
  title: string;
  url: string;
  artist: string;
}

interface MusicPlayerContextType {
  currentSong: Song | null;
  playlist: Song[];
  isPlaying: boolean;
  audioRef: React.RefObject<HTMLAudioElement>;
  playSong: (song: Song, playlist?: Song[]) => void;
  pauseSong: () => void;
  playNext: () => void;
  playPrev: () => void;
  togglePlay: () => void;
  stopPlayer: () => void;
  progress: number;
  duration: number;
  handleSeek: (value: number[]) => void;
  isShuffle: boolean;
  toggleShuffle: () => void;
  isRepeat: boolean;
  toggleRepeat: () => void;
}

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(undefined);

export const MusicPlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  const playSong = useCallback((song: Song, newPlaylist: Song[] = []) => {
    setCurrentSong(song);
    if (newPlaylist.length > 0) {
      setPlaylist(newPlaylist);
    } else if(playlist.length === 0){
        setPlaylist([song]);
    }
  }, [playlist]);
  
  useEffect(() => {
    if (audioRef.current && currentSong?.key) {
        const streamUrl = `/api/music/stream?key=${encodeURIComponent(currentSong.key)}`;
        if (audioRef.current.src !== streamUrl) {
          audioRef.current.src = streamUrl;
          audioRef.current.load(); 
        }
        audioRef.current.play().then(() => {
            setIsPlaying(true);
        }).catch(e => {
            console.error("Audio play failed on song change", e);
            setIsPlaying(false);
        });
    } else if (audioRef.current && !currentSong) {
        audioRef.current.pause();
        audioRef.current.src = '';
    }
  }, [currentSong]);


  const pauseSong = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const togglePlay = () => {
    if (audioRef.current && currentSong) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Audio play failed on toggle", e));
      }
    }
  };

  const stopPlayer = () => {
    if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
    }
    setCurrentSong(null);
    setIsPlaying(false);
    setProgress(0);
    setDuration(0);
  }

  const playNext = useCallback(() => {
    if (playlist.length === 0) return;

    if (isShuffle) {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * playlist.length);
        } while (playlist.length > 1 && playlist[randomIndex].key === currentSong?.key);
        setCurrentSong(playlist[randomIndex]);
        return;
    }

    const currentIndex = playlist.findIndex(s => s.key === currentSong?.key);
    const nextIndex = (currentIndex + 1) % playlist.length;
    setCurrentSong(playlist[nextIndex]);
  }, [playlist, currentSong, isShuffle]);

  const playPrev = () => {
    if (playlist.length === 0) return;
    const currentIndex = playlist.findIndex(s => s.key === currentSong?.key);
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    setCurrentSong(playlist[prevIndex]);
  };
  
  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setProgress(value[0]);
    }
  };

  const toggleShuffle = () => {
      setIsShuffle(prev => {
          if (!prev && isRepeat) setIsRepeat(false);
          return !prev;
      });
  };

  const toggleRepeat = () => {
      setIsRepeat(prev => {
          if (!prev && isShuffle) setIsShuffle(false);
          return !prev;
      });
  };

  const handleEnded = useCallback(() => {
    if (isRepeat && audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
    } else {
        playNext();
    }
  }, [isRepeat, playNext]);
  
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => setProgress(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleError = (e: Event) => {
        const mediaError = (e.target as HTMLAudioElement).error;
        console.error("Audio Element Error:", mediaError);
        setIsPlaying(false); 
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [handleEnded]);


  return (
    <MusicPlayerContext.Provider
      value={{
        currentSong,
        playlist,
        isPlaying,
        audioRef,
        playSong,
        pauseSong,
        playNext,
        playPrev,
        togglePlay,
        stopPlayer,
        progress,
        duration,
        handleSeek,
        isShuffle,
        toggleShuffle,
        isRepeat,
        toggleRepeat,
      }}
    >
      {children}
      <audio ref={audioRef} crossOrigin="anonymous" />
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext);
  if (context === undefined) {
    throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
  }
  return context;
};
