import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { getMovies, getGenres } from 'api/movieService';
import MovieList from 'components/MovieList';
import { routeFilters } from 'helper';
import { Genre, Genres, MovieResponse } from 'types';
import LoadingSpinner from 'components/LoadingSpinner';
import { AppContext } from 'context/AppContext';

type RouteParams = {
  category?: string;
  page?: string;
};

const Home = () => {
  const { page } = useContext(AppContext);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [movieResponse, setMovieResponse] = useState<MovieResponse>();
  const routeParams = useParams<RouteParams>();
  const pageParam = page ?? (routeParams.page ? parseInt(routeParams.page, 10) : 1);

  const fetchData = useCallback(async () => {
    let movieGenres: Genres = {};
    if (!genres.length) {
      movieGenres = await getGenres();
    }
    const fetchedMovieResponse = await getMovies({
      category: routeParams.category ?? routeFilters[0].key,
      page: pageParam,
    });

    setGenres(movieGenres?.genres ?? genres);
    setMovieResponse(fetchedMovieResponse);
  }, [genres, routeParams.category, pageParam]);

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
