import React, { useCallback, useEffect, useState } from 'react';
import BackDrop from 'components/movie/BackDrop';
import Description from 'components/movie/Description';
import Cast from 'components/movie/Cast';
import Gallery from 'components/movie/Gallery';
import RecommendationList from 'components/movie/RecommendationList';
import { useParams } from 'react-router-dom';
import { Genre, ImageResponse, Movie, MoviesResponse, PersonnelResponse } from 'types';
import {
  getActors,
  getGenres,
  getMovie,
  getMovieImages,
  getRecommendations,
} from 'api/movieService';
import LoadingSpinner from 'components/LoadingSpinner';

type RouteParams = {
  id: string;
};

const MovieDetail = () => {
  const { id } = useParams<RouteParams>();

  const [movie, setMovie] = useState<Movie>();
  const [genres, setGenres] = useState<Genre[]>();
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
      getGenres(),
    ]);
    console.log(fetchedActors);
    setMovie(fetchedMovie);
    setPersonnnelResponse(fetchedActors);
    setImageResponse(fetchedImages);
    setMoviesResponse(fetchedRecommendations);
    setGenres(fetchedGenres!.genres);
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!movie || !personnelResponse || !imageResponse || !moviesResponse || !genres)
    return <LoadingSpinner />;

  return (
    <>
      <BackDrop {...movie} />
      <div className="d-flex flex-column">
        <Description {...movie} />
        <Cast actors={personnelResponse!.cast} />
        <Gallery images={imageResponse!.backdrops} />
        <RecommendationList genres={genres!} movies={moviesResponse!.results} />
      </div>
    </>
  );
};
export default MovieDetail;
