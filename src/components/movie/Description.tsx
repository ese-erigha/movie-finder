import React from 'react';
import { MOVIE_IMAGE_URL } from 'api/movieService';
import Image from 'react-bootstrap/Image';

const Description = () => {
  console.log('Hello');
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const poster_path = '/95S6PinQIvVe4uJAd82a2iGZ0rA.jpg';
  return (
    <div className="movie">
      <Image src={`${MOVIE_IMAGE_URL.medium}${poster_path}`} className="movie__img" />
      <div className="movie__info d-flex flex-column justify-content-between p-3 align-items-start">
        <h2>Black Water: Abyss</h2>
        <h6 className="movie__tagline">Descend into fear</h6>
        <div className="movie__control">
          <div title="Rating" className="movie__rating">
            5.1
          </div>
        </div>
        <p className="movie__overview">
          An adventure-loving couple convince their friends to explore a remote, uncharted cave
          system in the forests of Northern Australia. With a tropical storm approaching, they
          abseil into the mouth of the cave, but when the caves start to flood, tensions rise as
          oxygen levels fall and the friends find themselves trapped. Unknown to them, the storm has
          also brought in a pack of dangerous and hungry crocodiles.
        </p>
        <div>
          <span className="mr-2">Genres:</span>
          <span className="mb-1 badge badge-warning">Horror</span>
          <span className="mb-1 badge badge-warning">Thriller</span>
          <span className="mb-1 badge badge-warning">Adventure</span>
          <span className="mb-1 badge badge-warning">Mystery</span>
        </div>
        <div>
          <span className="mr-2">Director:</span>
          <span className="mb-1">Andrew Traucki</span>
        </div>
      </div>
      <div className="movie__stat d-flex justify-content-between align-items-center">
        <div>
          <i className="fa fa-clock-o movie__icon" aria-hidden="true" />
          Release date: 9.7.2020
        </div>
        <div>
          <i className="fas fa-history movie__icon" aria-hidden="true" />
          Duration: 1h 38m
        </div>
        <div>
          <i className="fa fa-money movie__icon" aria-hidden="true" />
          Budget: $0
        </div>
      </div>
    </div>
  );
};
export default Description;
