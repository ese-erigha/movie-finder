import { MOVIE_DB_IMAGE_URL } from 'api/movieService';
import React from 'react';
import { Personnel } from 'types';

const Actor = (actor: Personnel) => (
  <div className="movie-cast__item">
    {actor.profile_path ? (
      <img
        className="movie-cast__img"
        alt={actor.name}
        title={actor.name}
        src={`${MOVIE_DB_IMAGE_URL.small + actor.profile_path}`}
      />
    ) : (
      <div className="movie-cast__nophoto">NO PHOTO</div>
    )}
    <div className="movie-cast__info">
      <span>{actor.name}</span>
      <br />
      <span className="small">{actor.character}</span>
    </div>
  </div>
);
export default Actor;
