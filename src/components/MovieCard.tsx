import React from 'react';
import Card from 'react-bootstrap/Card';
import { Genre, Movie } from 'types';
import noImage from 'assets/img/noimage.png';
import { MOVIE_DB_IMAGE_URL } from 'api/movieService';
import { buildGenreText } from 'helper';

type Props = {
  movie: Movie;
  genres: Genre[];
};

const MovieCard = (props: Props) => {
  const { movie, genres } = props;
  const genreText = buildGenreText(genres, movie?.genre_ids);

  return (
    <Card className="movie-card">
      <a data-testid="link" href={`/movie/${movie.id}`}>
        <Card.Img
          id="image"
          alt={movie.title}
          className="fadeIn animated"
          variant="top"
          src={movie.poster_path ? `${MOVIE_DB_IMAGE_URL.medium}${movie.poster_path}` : noImage}
        />
        <Card.Body>
          {movie.vote_average > 0 && (
            <span className="card-rating text-center">{movie.vote_average}</span>
          )}
          <Card.Title className="mr-4">{movie.title}</Card.Title>
          {genreText && (
            <p data-testid="genre" className="small mb-0">
              {genreText}
            </p>
          )}
        </Card.Body>
      </a>
    </Card>
  );
};
export default MovieCard;
