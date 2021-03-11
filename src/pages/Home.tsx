import React from 'react';
import MovieList from 'components/MovieList';
import { Helmet } from 'react-helmet';

const Home = () => {
  console.log('Hello');

  return (
    <>
      <Helmet>
        <title>MovieX</title>
      </Helmet>
      <MovieList />
    </>
  );
};
export default Home;
