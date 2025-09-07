
'use client';
import { usePathname } from 'next/navigation';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/common/Header';
import { Particles } from '@/components/common/Particles';
import { MusicPlayerProvider, useMusicPlayer } from '@/context/MusicPlayerContext';
import { GlobalPlayer } from '@/components/music/GlobalPlayer';
import { useEffect } from 'react';
import { Footer } from '@/components/common/Footer';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={inter.className}>
        <MusicPlayerProvider>
          <MainContent>{children}</MainContent>
        </MusicPlayerProvider>
      </body>
    </html>
  );
}

function MainContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, currentSong } = useMusicPlayer();

  useEffect(() => {
    const root = document.documentElement;
    if (theme.color) {
      root.style.setProperty('--dynamic-primary-h', theme.color.h.toString());
      root.style.setProperty('--dynamic-primary-s', `${theme.color.s}%`);
      root.style.setProperty('--dynamic-primary-l', `${theme.color.l}%`);
    } else {
      // Fallback to default primary color from globals.css
      root.style.setProperty('--dynamic-primary-h', '217.2');
      root.style.setProperty('--dynamic-primary-s', '91.2%');
      root.style.setProperty('--dynamic-primary-l', '59.8%');
    }
  }, [theme]);

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <Particles
        className="absolute inset-0 -z-10"
        quantity={100}
        ease={80}
        color="hsl(var(--dynamic-primary-h) var(--dynamic-primary-s) var(--dynamic-primary-l))"
        refresh
      />
      
      <Header />
      
      <main className={cn("relative z-10 flex-grow", { 'pb-16': currentSong })}>
        {children}
      </main>

      {!currentSong && <Footer />}
      <GlobalPlayer />
      <Toaster />
    </div>
  );
}
