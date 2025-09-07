
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import './redirect.css';

function RedirectContent() {
  const searchParams = useSearchParams();
  const [destinationUrl, setDestinationUrl] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const url = searchParams.get('url');
    if (url) {
      try {
        const decodedUrl = decodeURIComponent(url);
        new URL(decodedUrl); // Validate URL
        setDestinationUrl(decodedUrl);
      } catch (error) {
        console.error("Invalid URL:", url);
        setDestinationUrl('/'); // Redirect home on error
      }
    } else {
        setDestinationUrl('/'); // Redirect home if no url
    }
  }, [searchParams]);

  useEffect(() => {
    if (destinationUrl) {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        window.location.href = destinationUrl;
      }
    }
  }, [destinationUrl, countdown]);

  const displayUrl = destinationUrl ? (destinationUrl.length > 50 ? `${destinationUrl.slice(0, 50)}...` : destinationUrl) : '';

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <div className="portal-container">
        <div className="portal"></div>
      </div>
      <div className="relative z-10 mt-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            Preparing for Launch
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
            Redirecting you in {countdown}...
        </p>
        <div className="mt-6 flex items-center justify-center gap-2 rounded-lg bg-secondary/50 p-3 text-sm text-primary">
            <ArrowUpRight className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{displayUrl}</span>
        </div>
      </div>
    </div>
  );
}

export default function RedirectPage() {
    return (
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-background">Loading...</div>}>
            <RedirectContent />
        </Suspense>
    )
}

    