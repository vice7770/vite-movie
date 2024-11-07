import React from 'react'
import './App.css'
import Hero from './components/LandingPage/Hero'
import Carousel from './components/ui/Carousel/Carrousel';
import { MovieResponse, TVShowResponse } from './types/api';
import { getMovies, getTVSeries } from './lib/utils';
import { useQuery } from '@tanstack/react-query';
import LoadingError from './components/ui/LoadingErrorComponent';

function Home() {
  const {
    data: dataTrendingMovies,
    error: errorMovies,
    isLoading: isLoadingMovies,
  } = useQuery<MovieResponse>({
    queryKey: ["trendingMovies"],
    queryFn: getMovies,
  });

  const {
    data: dataTrendingSeries,
    error: errorSeries,
    isLoading: isLoadingSeries,
  } = useQuery<TVShowResponse>({
    queryKey: ["trendingSeries"],
    queryFn: getTVSeries,
  });

  return (
    <>
      <div className='flex w-screen h-[400px]'>
        <Hero />
      </div>
      <div className="flex w-screen bg-black pt-5">
        <div className='w-full h-[1200px] gap-y-5'>
          <div>
            <h2 className='text-2xl font-bold text-white'>Movies</h2>
            {(isLoadingMovies || errorMovies) ? (
              <LoadingError isLoading={isLoadingMovies} error={!!errorMovies} />
            ) : (
              <Carousel elements={dataTrendingMovies?.results || []} type='movie' />
            )}
          </div>
          <div>
            <h2 className='text-2xl font-bold text-white'>TV Shows</h2>
            {(isLoadingSeries || errorSeries) ? (
              <LoadingError isLoading={isLoadingSeries} error={!!errorSeries} />
            ) : (
              <Carousel elements={dataTrendingSeries?.results || []} type='tv' />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;
