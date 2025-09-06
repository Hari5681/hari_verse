import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/common/Header';
import { Particles } from '@/components/common/Particles';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'HariVerse - A Modern Multi-Feature Website',
  description: 'Welcome to a modern, multi-feature website built with Next.js and Firebase.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={inter.className}>
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
        </div>
        <Toaster />
      </body>
    </html>
  );
}
