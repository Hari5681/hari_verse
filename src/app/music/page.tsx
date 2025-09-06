import { SongCard } from '@/components/music/SongCard';
import { SongList } from '@/components/music/SongList';
import { Music } from 'lucide-react';

const topCharts = [
  {
    title: 'Top 50 - Global',
    description: 'Your daily update of the most played tracks right now.',
    imageUrl: 'https://picsum.photos/seed/1/300/300',
    dataAiHint: 'music playlist'
  },
  {
    title: 'Top 50 - USA',
    description: 'The biggest hits in the United States.',
    imageUrl: 'https://picsum.photos/seed/2/300/300',
    dataAiHint: 'american music'
  },
  {
    title: 'Viral 50 - Global',
    description: 'The most viral tracks right now.',
    imageUrl: 'https://picsum.photos/seed/3/300/300',
    dataAiHint: 'viral music'
  },
    {
    title: 'Today\'s Top Hits',
    description: 'The hottest tracks in the world.',
    imageUrl: 'https://picsum.photos/seed/4/300/300',
    dataAiHint: 'top hits'
  },
];

const newReleases = [
    {
    title: 'Future Funk',
    description: 'Synth-heavy grooves.',
    imageUrl: 'https://picsum.photos/seed/5/300/300',
    dataAiHint: 'funk music'
  },
  {
    title: 'Lo-Fi Beats',
    description: 'Chill beats to relax/study to.',
    imageUrl: 'https://picsum.photos/seed/6/300/300',
    dataAiHint: 'lofi beats'
  },
  {
    title: 'Indie Rock',
    description: 'The best of modern indie rock.',
    imageUrl: 'https://picsum.photos/seed/7/300/300',
    dataAiHint: 'indie rock'
  },
    {
    title: '80s Rewind',
    description: 'The biggest hits of the 1980s.',
    imageUrl: 'https://picsum.photos/seed/8/300/300',
    dataAiHint: '80s music'
  },
];

const songs = [
  { number: 1, title: 'Midnight City', artist: 'M83', duration: '4:04' },
  { number: 2, title: 'Blinding Lights', artist: 'The Weeknd', duration: '3:20' },
  { number: 3, title: 'As It Was', artist: 'Harry Styles', duration: '2:47' },
  { number: 4, title: 'Levitating', artist: 'Dua Lipa', duration: '3:23' },
  { number: 5, title: 'Good 4 U', artist: 'Olivia Rodrigo', duration: '2:58' },
];

export default function MusicPage() {
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
          <h2 className="text-2xl font-bold mb-6">Top Charts</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {topCharts.map((chart) => (
              <SongCard key={chart.title} {...chart} />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">New Releases</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {newReleases.map((release) => (
              <SongCard key={release.title} {...release} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Featured Playlist</h2>
          <SongList songs={songs} />
        </section>
      </div>
    </div>
  );
}