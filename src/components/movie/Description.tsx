import React from 'react';
import { MOVIE_DB_IMAGE_URL } from 'api/movieService';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import { Movie } from 'types';
import { formatVote } from 'helper';

const Description = (movie: Movie) => {
  const getDurationStr = (mins: number) => {
    const hr = Math.floor(mins / 60);
    const m = mins % 60;
    const min = m < 10 ? `0${m}` : m;
    return `${hr}h ${min}m`;
  };

  const getReleaseDateStr = (str: string) => {
    const date = new Date(str);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  };

  const releaseDate = getReleaseDateStr(movie.release_date);
  const duration = getDurationStr(movie.runtime);
  const budget = movie.budget.toLocaleString();
  return (
    <div className="movie">
      <Image
        alt={`${movie.title}`}
        src={`${MOVIE_DB_IMAGE_URL.medium}${movie.poster_path}`}
        className="movie__img"
      />
      <div className="movie__info d-flex flex-column justify-content-between p-3 align-items-start">
        <h2>{movie.title}</h2>
        {movie.tagline && <h6 className="movie__tagline">{movie.tagline}</h6>}
        <div className="movie__control">
          <div title="Rating" className="movie__rating">
            {formatVote(movie.vote_average)}
          </div>
        </div>
        <p className="movie__overview">{movie.overview}</p>
        {movie.genres.length > 0 && (
          <div data-testid="genre-list">
            <span className="mr-2">Genres:</span>{' '}
            {movie.genres.map((genre) => (
              <Badge variant="warning" className="mb-1" key={`${genre.name}`}>
                {genre.name}
              </Badge>
            ))}
          </div>
        )}
      </div>
      <div className="movie__stat d-flex justify-content-between align-items-center">
        <div>
          <i className="fa fa-clock-o movie__icon" />
          Release date: {releaseDate}
        </div>
        <div>
          <i className="fas fa-history movie__icon" aria-hidden="true" />
          Duration: {duration}
        </div>
        <div>
          <i className="fa fa-money movie__icon" aria-hidden="true" />
          Budget: ${budget}
        </div>
      </div>
    </div>
  );
};
export default Description;
