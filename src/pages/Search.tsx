import React from 'react';
import MovieList from 'components/MovieList';

const Search = () => {
  console.log('Hello');
  return (
    <>
      <h1 className="list-title mb-5">Search results for "Red Sparrow"</h1>
      <MovieList />
    </>
  );
};
export default Search;
