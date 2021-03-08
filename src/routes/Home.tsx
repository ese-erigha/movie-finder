import React from 'react';
import { Helmet } from 'react-helmet';
import MovieCard from 'components/MovieCard';

const Home = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  return (
    <>
      <Helmet>
        <title>MovieX</title>
      </Helmet>
      <div className="d-flex flex-wrap justify-content-md-between justify-content-center">
        {arr.map((item) => (
          <MovieCard key={item} />
        ))}
      </div>
    </>
  );
};
export default Home;
