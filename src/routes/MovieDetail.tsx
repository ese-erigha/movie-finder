import React from 'react';
import MovieBackDrop from 'components/MovieBackDrop';
import MovieDescription from 'components/MovieDescription';

const MovieDetail = () => {
  console.log('Hello');
  return (
    <>
      <MovieBackDrop />
      <div className="d-flex flex-coulmn container">
        <MovieDescription />
      </div>
    </>
  );
};
export default MovieDetail;
