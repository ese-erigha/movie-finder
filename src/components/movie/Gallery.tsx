import React from 'react';
import ImageGallery from 'react-image-gallery';
import { MOVIE_DB_IMAGE_URL } from 'api/movieService';
import { Image } from 'types';

import 'react-image-gallery/styles/scss/image-gallery.scss';

type Props = {
  images: Image[];
};

const Gallery = (props: Props) => {
  const { images } = props;
  const imagesForGallery = images.map((image) => ({
    original: `${MOVIE_DB_IMAGE_URL.original}${image.file_path}`,
    thumbnail: `${MOVIE_DB_IMAGE_URL.small}${image.file_path}`,
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
