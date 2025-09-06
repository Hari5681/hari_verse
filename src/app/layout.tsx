import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/common/Header';

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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
