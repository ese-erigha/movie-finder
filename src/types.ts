export type Genre = {
  id: number;
  name: string;
};
export type Genres = {
  genres?: Genre[];
};

export type Movie = {
  id: number;
  title: string;
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
};

export type MovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};
