import { tmdb } from '@/lib/tmdb';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <Suspense
      fallback={
        <div className="grid grid-cols-3 gap-4">
          <div className="w-[250px] bg-gray-300 rounded-lg animate-pulse h-[375px]" />
          <div className="w-[250px] bg-gray-300 rounded-lg animate-pulse h-[375px]" />
          <div className="w-[250px] bg-gray-300 rounded-lg animate-pulse h-[375px]" />
        </div>
      }
    >
      <Content />
    </Suspense>
  );
}

async function Content() {
  const { results } = await tmdb.movies.topRated({ language: 'en-US' });

  return (
    <div className="grid grid-cols-3 gap-4">
      {results.map((movie) => (
        <Link href={`/movies/${movie.id}`} key={movie.id}>
          <Image
            width={500}
            height={750}
            className="rounded-lg"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </Link>
      ))}
      <p>hi</p>
    </div>
  );
}
