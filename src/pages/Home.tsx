import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieList from 'components/MovieList';
import { Helmet } from 'react-helmet';
import { getMovies, getGenres } from 'api/movieService';
import { routeFilters } from 'helper';
import { Genre, Genres, MovieResponse } from 'types';
import LoadingSpinner from 'components/LoadingSpinner';

type RouteParams = {
  category?: string;
  page?: string;
};

const Home = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [movieResponse, setMovieResponse] = useState<MovieResponse>();
  const routeParams = useParams<RouteParams>();

  const fetchData = useCallback(async () => {
    let movieGenres: Genres = {};
    if (!genres.length) {
      movieGenres = await getGenres();
    }
    const fetchedMovieResponse = await getMovies({
      category: routeParams.category ?? routeFilters[0].key,
      page: routeParams.page ? parseInt(routeParams.page, 10) : 1,
    });

    setGenres(movieGenres?.genres ?? genres);
    setMovieResponse(fetchedMovieResponse);
    console.log(movieGenres);
    console.log(fetchedMovieResponse);
  }, [genres, routeParams.category, routeParams.page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!genres || !movieResponse) return <LoadingSpinner />;
  const initialPage = routeParams.page ? parseInt(routeParams.page, 10) - 1 : 0;

  return (
    <>
      <Helmet>
        <title>MovieX</title>
      </Helmet>
      <MovieList
        movies={movieResponse.results}
        genres={genres}
        pageCount={movieResponse.total_pages}
        initialPage={initialPage}
      />
    </>
  );
};
export default Home;
