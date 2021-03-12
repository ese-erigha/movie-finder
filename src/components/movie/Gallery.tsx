import React from 'react';
import ImageGallery from 'react-image-gallery';
import { MOVIE_DB_IMAGE_URL } from 'api/movieService';

import 'react-image-gallery/styles/scss/image-gallery.scss';

const Gallery = () => {
  console.log('Hello');
  const imagesForGallery = [1, 2, 3, 4, 5, 6, 7, 8].map((item) => ({
    original: `${MOVIE_DB_IMAGE_URL.original}/vTIs9gzRkiFbApaCC8JHjurgl4C.jpg`,
    thumbnail: `${MOVIE_DB_IMAGE_URL.small}/vTIs9gzRkiFbApaCC8JHjurgl4C.jpg`,
  }));
  return imagesForGallery.length ? (
    <div className="movie-gallery">
      <h3 className="list-title mb-4">Gallery</h3>
      <ImageGallery items={imagesForGallery} />
    </div>
  ) : (
    <></>
  );
};

export default Gallery;
