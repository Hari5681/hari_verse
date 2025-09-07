
'use client';
import { usePathname } from 'next/navigation';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/common/Header';
import { Particles } from '@/components/common/Particles';
import { MusicPlayerProvider } from '@/context/MusicPlayerContext';
import { GlobalPlayer } from '@/components/music/GlobalPlayer';

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
  const isMusicPage = pathname.startsWith('/music');

  return (
    <div className="relative min-h-screen">
      <Particles
        className="absolute inset-0 -z-10"
        quantity={100}
        ease={80}
        color="hsl(217.2 91.2% 59.8%)"
        refresh
      />
      <Header />
      <main className="relative z-10">{children}</main>
      <GlobalPlayer forceShow={isMusicPage} />
      <Toaster />
    </div>
  );
}
