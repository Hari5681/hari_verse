import { SongCard } from '@/components/music/SongCard';
import { SongList } from '@/components/music/SongList';
import { getFeaturedPlaylists, getPlaylist } from '@/lib/spotify';
import { Music } from 'lucide-react';

export default async function MusicPage() {
  const featuredPlaylists = await getFeaturedPlaylists();
  const topHitsPlaylist = await getPlaylist('37i9dQZF1DXcBWIGoYBM5M'); // "Today's Top Hits" playlist ID

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/60 text-foreground">
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="flex items-center space-x-4 mb-12">
          <div className="p-3 bg-primary/10 rounded-full">
            <Music className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">Music</h1>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Playlists</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {featuredPlaylists.map(playlist => (
              <SongCard
                key={playlist.id}
                title={playlist.name}
                description={playlist.description}
                imageUrl={playlist.images[0]?.url}
                dataAiHint="music playlist"
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">{topHitsPlaylist.name}</h2>
          <SongList songs={topHitsPlaylist.tracks.items} />
        </section>
      </div>
    </div>
  );
}
