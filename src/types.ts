import { ReactNode } from 'react';

export type Genre = {
  id: number;
  name: string;
};
export type GenreResponse = {
  genres?: Genre[];
};

export type Movie = {
  id: number;
  title: string;
  genres: Genre[];
  genre_ids?: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  adult: boolean;
  backdrop_path: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  tagline?: string;
  runtime: number;
  budget: number;
};

export type MoviesResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type State = {
  page?: string;
};

export type PageProps = {
  children: ReactNode;
};

export type Personnel = {
  id: string;
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path?: string;
};

export type PersonnelResponse = {
  id: string;
  cast: Personnel[];
  crew: Personnel[];
};

export type Image = {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: string | null;
  vote_average: number;
  vote_count: number;
  width: number;
};

export type ImageResponse = {
  id: string;
  backdrops: Image[];
  posters: Image[];
};

export interface FetchParams {
  category: string;
  page: string;
}
