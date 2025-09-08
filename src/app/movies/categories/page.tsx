
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { genres } from '@/lib/genres';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AllCategoriesPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background p-4 pt-20">
      <div className="container mx-auto">
        <header className="mb-8 flex items-center gap-4 animate-fade-in-down">
           <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              All Movie Genres
            </h1>
            <p className="mt-1 text-lg text-muted-foreground">
              Pick a genre to start exploring.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {genres.map((genre, index) => (
            <Link 
              key={genre.id} 
              href={`/movies/category/${genre.name.toLowerCase()}`} 
              passHref
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
            >
              <Card className="group flex flex-col justify-between h-40 overflow-hidden rounded-lg bg-card text-card-foreground shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-primary/20 hover:border-primary/50">
                <CardHeader>
                  <CardTitle className="text-xl font-bold flex items-center justify-between">
                    <span>{genre.name}</span>
                    <ArrowRight className="h-5 w-5 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
