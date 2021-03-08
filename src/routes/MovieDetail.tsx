import React from 'react';
import BackDrop from 'components/movie/BackDrop';
import Description from 'components/movie/Description';
import Cast from 'components/movie/Cast';
import Gallery from 'components/movie/Gallery';
import RecommendationList from 'components/movie/RecommendationList';

const MovieDetail = () => {
  console.log('Hello');
  return (
    <>
      <BackDrop />
      <div className="d-flex flex-column">
        <Description />
        <Cast />
        <Gallery />
        <RecommendationList />
      </div>
    </>
  );
};
export default MovieDetail;
