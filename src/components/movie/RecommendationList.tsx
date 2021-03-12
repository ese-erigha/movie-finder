import React from 'react';
// import MovieCard from 'components/MovieCard';

const RecommendationList = () => {
  console.log('Hello');
  // const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <div className="movie-recommendations">
      <h3 className="list-title list-title-dark mb-4">Recommendations</h3>
      <div className="d-flex flex-wrap justify-content-center">
        {/* {arr.map((item) => (
          <MovieCard key={item} />
        ))} */}
      </div>
    </div>
  );
};

export default RecommendationList;
