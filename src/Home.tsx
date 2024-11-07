import React from 'react'
import './App.css'
import Hero from './components/LandingPage/Hero'
import Carousel from './components/ui/Carousel/Carrousel';
import { MovieResponse, TVShowResponse } from './types/api';
import { getTrendingMovies, getTrendingTVSeries, getComedyMovies, getRomanticMovies } from './lib/utils';
import { useQuery } from '@tanstack/react-query';
import LoadingError from './components/LoadingErrorComponent';

function Home() {
  const {
    data: dataTrendingMovies,
    error: errorMovies,
    isLoading: isLoadingMovies,
  } = useQuery<MovieResponse>({
    queryKey: ["trendingMovies"],
    queryFn: getTrendingMovies,
  });

  const {
    data: dataTrendingSeries,
    error: errorSeries,
    isLoading: isLoadingSeries,
  } = useQuery<TVShowResponse>({
    queryKey: ["trendingSeries"],
    queryFn: getTrendingTVSeries,
  });

  const {
    data: dataRomanticMovies,
    error: errorRomanticMovies,
    isLoading: isLoadingRomanticMovies,
  } = useQuery<MovieResponse>({
    queryKey: ["romanticMovies"],
    queryFn: getRomanticMovies,
  });

  const {
    data: dataComedyMovies,
    error: errorComedyMovies,
    isLoading: isLoadingComedyMovies,
  } = useQuery<MovieResponse>({
    queryKey: ["comedyMovies"],
    queryFn: getComedyMovies,
  });

  return (
    <>
      <div className='flex w-screen h-[400px]'>
        <Hero />
      </div>
      <div className="flex w-screen bg-black pt-5">
        <div className='w-full h-full gap-y-5'>
          <div>
            <h2 className='text-2xl font-bold text-white py-5'>Movies</h2>
            {(isLoadingMovies || errorMovies) ? (
              <LoadingError isLoading={isLoadingMovies} error={!!errorMovies} />
            ) : (
              <Carousel elements={dataTrendingMovies?.results || []} type='movie' />
            )}
          </div>
          <div>
            <h2 className='text-2xl font-bold text-white py-5'>TV Shows</h2>
            {(isLoadingSeries || errorSeries) ? (
              <LoadingError isLoading={isLoadingSeries} error={!!errorSeries} />
            ) : (
              <Carousel elements={dataTrendingSeries?.results || []} type='tv' />
            )}
          </div>
          <div>
            <h2 className='text-2xl font-bold text-white py-5'>Romantic Movies</h2>
            {(isLoadingRomanticMovies || errorRomanticMovies) ? (
              <LoadingError isLoading={isLoadingRomanticMovies} error={!!errorRomanticMovies} />
            ) : (
              <Carousel elements={dataRomanticMovies?.results || []} type='movie' />
            )}
          </div>
          <div>
            <h2 className='text-2xl font-bold text-white py-5'>Comedy Movies</h2>
            {(isLoadingComedyMovies || errorComedyMovies) ? (
              <LoadingError isLoading={isLoadingComedyMovies} error={!!errorComedyMovies} />
            ) : (
              <Carousel elements={dataComedyMovies?.results || []} type='movie' />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;
