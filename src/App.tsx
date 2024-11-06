import { useEffect, useState } from 'react'
import './App.css'
import Hero from './components/LandingPage/Hero'
import Carousel from './components/ui/Carousel/Carrousel';
import { MovieResponse, TVShowResponse } from './types/api';

function App() {
  const [dataTrendingMovies, setDataTrendingMovies] = useState<MovieResponse | null>(null);
  const [dataTrendingSeries, setDataTrendingSeries] = useState<TVShowResponse | null>(null);
  const [dataRomantic, setDataRomantic] = useState([]);
  const [dataComedy, setDataComedy] = useState([]);

  useEffect(() => {
    const fetchData = async (url: string, setData:React.Dispatch<React.SetStateAction<never[]>>) => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + import.meta.env.VITE_API_TOKEN
        }
      };
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const fetchDataTrendingMovies = () => {
      const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
      fetchData(url, setDataTrendingMovies);
    };

    const fetchDataTrendingSeries = () => {
      const url = 'https://api.themoviedb.org/3/trending/tv/day?language=en-US';
      fetchData(url, setDataTrendingSeries);
    };

    const fetchDataRomantic = () => {
      const url = 'https://api.themoviedb.org/3/search/movie?query=romantic&include_adult=false&language=en-US&page=1';
      fetchData(url, setDataRomantic);
    };

    const fetchingDataComedy = () => {
      const url = 'https://api.themoviedb.org/3/search/movie?query=comedy&include_adult=false&language=en-US&page=1';
      fetchData(url, setDataComedy);
    };

    fetchDataTrendingMovies();
    fetchDataTrendingSeries();
    // fetchDataRomantic();
    // fetchingDataComedy();

  }, [])
  return (
    <>
      <div className='flex w-screen h-[400px]'>
        <Hero />
      </div>
      <div className="flex w-screen bg-black pt-5">
        <div className='w-full h-[1200px] gap-y-5'>
          <div>
            <h2 className='text-2xl font-bold text-white'>Movies</h2>
            <Carousel elements={dataTrendingMovies?.results ?? []} />
          </div>
          <div>
            <h2 className='text-2xl font-bold text-white'>TV Shows</h2>
            <Carousel elements={dataTrendingSeries?.results ?? []} />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
