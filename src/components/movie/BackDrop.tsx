import React from 'react';
import { MOVIE_DB_IMAGE_URL } from 'api/movieService';
import { Movie } from 'types';

const BackDrop = ({ backdrop_path }: Movie) => (
  <div
    data-testid="backdrop"
    className="movie-backdrop w-100 h-100 position-fixed fixed-top"
    style={{
      backgroundSize: 'cover',
      backgroundImage: `linear-gradient(rgba(0,0,0,.5), rgba(0,0,0, .5)), url("${
        MOVIE_DB_IMAGE_URL.large + backdrop_path
      }")`,
    }}
  />
);
export default BackDrop;
