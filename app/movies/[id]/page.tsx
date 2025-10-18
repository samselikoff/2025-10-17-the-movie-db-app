import { tmdb } from '@/lib/tmdb';
import Image from 'next/image';
import { Suspense } from 'react';

export default async function Page({ params }: PageProps<'/movies/[id]'>) {
  return (
    <Suspense
      fallback={
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-200 w-full rounded-lg animate-pulse h-auto aspect-[2/3]" />
        </div>
      }
    >
      <Content params={params} />
    </Suspense>
  );
}

async function Content({
  params,
}: Omit<PageProps<'/movies/[id]'>, 'searchParams'>) {
  const { id } = await params;
  const movie = await tmdb.movies.details(+id);
  const date = new Date(movie.release_date);

  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="grid grid-cols-3 gap-4">
      <Image
        width={250}
        height={375}
        className="rounded-lg"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <div className="col-span-2">
        <h1 className="font-semibold text-xl text-gray-700">{movie.title}</h1>
        <p className="font-bold text-sm text-gray-500">{formattedDate}</p>

        <p>{movie.adult}</p>
      </div>
    </div>
  );
}
