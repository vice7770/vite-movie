import { MovieResponse, TVShowResponse, DetailsMovieResponse } from "@/types/api";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getImageURL(name: string) {
  return `https://image.tmdb.org/t/p/original${name}`
}

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + import.meta.env.VITE_API_TOKEN
  }
};

export const getMovies = async (): Promise<MovieResponse> => {
  const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const getTVSeries = async (): Promise<TVShowResponse> => {
  const url = 'https://api.themoviedb.org/3/trending/tv/day?language=en-US';
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const getMovieDetails = async (id: string): Promise<DetailsMovieResponse> => {
  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}