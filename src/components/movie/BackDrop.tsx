import React from 'react';
import { MOVIE_IMAGE_URL } from 'api/movieService';

const BackDrop = () => {
  console.log('Hello');
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const backdrop_path = '/fRrpOILyXuWaWLmqF7kXeMVwITQ.jpg';
  return (
    <div
      className="movie-backdrop w-100 h-100 position-fixed fixed-top"
      style={{
        backgroundSize: 'cover',
        backgroundImage: `linear-gradient(rgba(0,0,0,.5), rgba(0,0,0, .5)), url("${
          MOVIE_IMAGE_URL.large + backdrop_path
        }")`,
      }}
    />
  );
};
export default BackDrop;
