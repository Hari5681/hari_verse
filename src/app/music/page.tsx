'use client';

import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { SongCard } from '@/components/music/SongCard';
import { MusicPlayer } from '@/components/music/MusicPlayer';
import { SongListItem } from '@/components/music/SongListItem';
import { getModules, searchSongs } from '@/lib/jiosaavn';
import type { Song, Album, Playlist } from '@/lib/jiosaavn';
import { Search, Music } from 'lucide-react';

export default function MusicPage() {
  const [modules, setModules] = useState<any>(null);
  const [trending, setTrending] = useState<(Song | Album)[]>([]);
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const data = await getModules();
        setModules(data);
        if (data.trending && data.trending.albums) {
            setTrending(data.trending.albums);
        }
      } catch (error) {
        console.error('Failed to fetch modules:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }
    try {
      setIsSearching(true);
      const results = await searchSongs(searchQuery);
      setSearchResults(results.results);
    } catch (error) {
      console.error('Failed to search songs:', error);
    } finally {
      setIsSearching(false);
    }
  };
  
  const playSong = (song: Song, context: (Song | Album | Playlist)[] = []) => {
    const quality = song.downloadUrl.find(q => q.quality === '320kbps') || song.downloadUrl.find(q => q.quality === '160kbps') || song.downloadUr[0];
    if (quality) {
        const playableSong = { ...song, media_url: quality.link };
        setCurrentSong(playableSong);

        if (Array.isArray(context) && context.length > 0) {
            // @ts-ignore
            const songs = context.filter(item => item.type === 'song').map(s => {
                const songQuality = s.downloadUrl.find(q => q.quality === '320kbps') || s.downloadUrl.find(q => q.quality === '160kbps') || s.downloadUrl[0];
                return { ...s, media_url: songQuality.link };
            });
            setPlaylist(songs);
        } else {
            setPlaylist([playableSong]);
        }
    }
  };


  const handlePlayNext = () => {
    if (!currentSong || playlist.length === 0) return;
    const currentIndex = playlist.findIndex(s => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % playlist.length;
    playSong(playlist[nextIndex], playlist);
  };

  const handlePlayPrev = () => {
    if (!currentSong || playlist.length === 0) return;
    const currentIndex = playlist.findIndex(s => s.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    playSong(playlist[prevIndex], playlist);
  };

  const renderSection = (title: string, items: (Album | Playlist)[]) => {
    if (!items || items.length === 0) return null;
    return (
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {items.map(item => (
            <SongCard key={item.id} item={item} onPlay={() => {
                // Future: implement playing whole album/playlist
            }} />
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/60 text-foreground pb-32">
        <audio ref={audioRef} onEnded={handlePlayNext} />
        <div className="container mx-auto px-4 py-8 pt-24">
            <div className="flex items-center justify-between mb-12">
                <div className="flex items-center space-x-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                        <Music className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight">Music</h1>
                </div>
                <form onSubmit={handleSearch} className="w-full max-w-sm">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input 
                            placeholder="Search for songs..."
                            className="pl-10 w-full bg-background/50"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </form>
            </div>
            
            {isLoading || isSearching ? (
                <div className="text-center py-20">
                    <p>Loading...</p>
                </div>
            ) : searchResults.length > 0 ? (
                <section>
                    <h2 className="text-2xl font-bold mb-6">Search Results</h2>
                    <div className="flex flex-col gap-2">
                        {searchResults.map((song) => (
                           <SongListItem key={song.id} song={song} onPlay={() => playSong(song, searchResults)} />
                        ))}
                    </div>
                </section>
            ) : (
                <>
                    {renderSection('Trending Now', trending)}
                    {renderSection('Top Playlists', modules?.playlists)}
                    {renderSection('Top Albums', modules?.albums)}
                </>
            )}

        </div>
        
        {currentSong && (
            <MusicPlayer 
                song={currentSong} 
                audioRef={audioRef}
                onNext={handlePlayNext}
                onPrev={handlePlayPrev}
            />
        )}
    </div>
  );
}
