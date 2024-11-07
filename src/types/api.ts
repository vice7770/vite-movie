interface MovieResponse {
  page: number;
  results: TrendingMovie[];
  total_pages: number;
  total_results: number;
}

interface TVShowResponse {
  page: number;
  results: TVShow[];
  total_pages: number;
  total_results: number;
}
  
interface Movie {
  adult: boolean;
  backdrop_path: string;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
}

interface TrendingMovie extends Movie {
  genre_ids?: number[];
  release_date?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}

interface DetailsMovieResponse extends Movie {
  belongs_to_collection?: null | Collection; // Adjust the type if you have more information about the collection
  budget?: number;
  genres?: Genre[];
  homepage?: string;
  imdb_id?: string;
  origin_country?: string[];
  production_companies?: ProductionCompany[];
}

interface TVShow {
  adult: boolean;
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

interface Genre {
  id: number;
  name: string;
}

interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface Collection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}


export type { MovieResponse, Movie, TVShowResponse, TVShow, DetailsMovieResponse };