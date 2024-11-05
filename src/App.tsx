import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [dataTrendingMovies, setDataTrendingMovies] = useState([]);
  const [dataTrendingSeries, setDataTrendingSeries] = useState([]);
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
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
