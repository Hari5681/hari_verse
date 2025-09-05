
import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
import AnimatedBackground from '@/components/common/AnimatedBackground';

export const metadata: Metadata = {
  title: 'HariVerse Proposal',
  description: 'A space made with love and creativity.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..900;1,400..900&family=Belleza&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body bg-background text-foreground antialiased">
        <AnimatedBackground />
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-4">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
