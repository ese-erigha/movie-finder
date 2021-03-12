import React from 'react';
import { useParams } from 'react-router-dom';
import MovieList from 'components/MovieList';
import { Helmet } from 'react-helmet';

type RouteParams = {
  category?: string;
  page?: string;
};

const Home = () => {
  console.log();
  const res = useParams<RouteParams>();
  console.log(res);
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
