import React from 'react';

const Actor = () => {
  console.log('Hello');
  return (
    <div className="movie-cast__item">
      <img
        className="movie-cast__img"
        alt="Jessica McNamee"
        title="Jessica McNamee"
        src="https://image.tmdb.org/t/p/w185/2PaT9ykqw2FIujI8vwlAcMbuv14.jpg"
      />
      <div className="movie-cast__info">
        Jessica McNamee
        <br />
        <span className="small">Jennifer</span>
      </div>
    </div>
  );
};
export default Actor;
