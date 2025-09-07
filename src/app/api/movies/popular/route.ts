
import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'TMDB API key is not configured.' },
      { status: 500 }
    );
  }

  const fetchPage = async (page: number) => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`;
    const response = await fetch(url, {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    if (!response.ok) {
      // Don't throw for single page errors, just log and return empty
      console.error(`Failed to fetch page ${page} of popular movies from TMDB.`);
      return [];
    }
    const data = await response.json();
    return data.results.map((movie: any) => ({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
    }));
  };

  try {
    const pagePromises = [];
    // Fetch up to 50 pages to get 1000 movies (20 movies per page)
    for (let i = 1; i <= 50; i++) {
        pagePromises.push(fetchPage(i));
    }
    const pages = await Promise.all(pagePromises);
    const movies = pages.flat();

    return NextResponse.json({ movies });
  } catch (error: any) {
    console.error('TMDB API Error:', error);
    return NextResponse.json(
      { error: error.message || 'An internal server error occurred.' },
      { status: 500 }
    );
  }
}
