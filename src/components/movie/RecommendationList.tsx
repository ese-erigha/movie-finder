import React from 'react';
import { Genre, Movie } from 'types';
import MovieCard from 'components/MovieCard';

type Props = {
  movies: Movie[];
  genres: Genre[];
};
const RecommendationList = (props: Props) => {
  const { movies, genres } = props;

  return (
    <div className="movie-recommendations">
      <h3 className="list-title list-title-dark mb-4">Recommendations</h3>
      <div className="d-flex flex-wrap">
        {movies.map((movie) => (
          <MovieCard genres={genres} movie={movie} key={`m${movie.id}`} />
        ))}
      </div>
    </div>
  );
};

export default RecommendationList;
