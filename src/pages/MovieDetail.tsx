import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { getActors, getMovie, getMovieImages, getRecommendations } from 'api/movieService';
import { fetchGenres } from 'api/genreService';
import BackDrop from 'components/movie/BackDrop';
import Description from 'components/movie/Description';
import Cast from 'components/movie/Cast';
import Gallery from 'components/movie/Gallery';
import RecommendationList from 'components/movie/RecommendationList';
import { ImageResponse, Movie, MoviesResponse, PersonnelResponse } from 'types';
import LoadingSpinner from 'components/LoadingSpinner';
import { useAppContext } from 'context/AppContextManager';
import { WEBSITE_NAME } from '../constants';

type RouteParams = {
  id: string;
};

const MovieDetail = () => {
  const { genres, setGenres } = useAppContext();
  const { id } = useParams<RouteParams>();
  const [movie, setMovie] = useState<Movie>();
  const [personnelResponse, setPersonnnelResponse] = useState<PersonnelResponse>();
  const [imageResponse, setImageResponse] = useState<ImageResponse>();
  const [moviesResponse, setMoviesResponse] = useState<MoviesResponse>();

  const fetchData = useCallback(async () => {
    const [
      fetchedMovie,
      fetchedActors,
      fetchedImages,
      fetchedRecommendations,
      fetchedGenres,
    ] = await Promise.all([
      getMovie(id),
      getActors(id),
      getMovieImages(id),
      getRecommendations(id),
      fetchGenres(genres),
    ]);
    setMovie(fetchedMovie);
    setPersonnnelResponse(fetchedActors);
    setImageResponse(fetchedImages);
    setMoviesResponse(fetchedRecommendations);
    setGenres(fetchedGenres);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!movie || !personnelResponse || !imageResponse || !moviesResponse || !genres)
    return <LoadingSpinner />;

  return (
    <>
      <Helmet>
        <title>{`${movie.title} / ${WEBSITE_NAME}`}</title>
      </Helmet>
      <BackDrop {...movie} />
      <div className="d-flex flex-column">
        <Description {...movie} />
        <Gallery images={imageResponse.backdrops} />
        <Cast actors={personnelResponse.cast} />
        <RecommendationList genres={genres} movies={moviesResponse.results} />
      </div>
    </>
  );
};
export default MovieDetail;
