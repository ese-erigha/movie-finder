import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getMovies } from 'api/movieService';
import MovieList from 'components/MovieList';
import { fetchGenres, getInitialPage, getPathsFromCurrentLocation, routeFilters } from 'helper';
import { FetchParams, MoviesResponse } from 'types';
import LoadingSpinner from 'components/LoadingSpinner';
import { useAppContext } from 'context/AppContextManager';
import { WEBSITE_NAME } from '../constants';

const Home = () => {
  const { genres, setGenres } = useAppContext();
  const [movieResponse, setMovieResponse] = useState<MoviesResponse>();
  const routeParams = useParams<Partial<FetchParams>>();
  const history = useHistory();
  const { pathname } = useLocation();
  const page = routeParams.page ? parseInt(routeParams.page, 10) : 1;
  const category = routeParams.category ?? routeFilters[0].key;

  const pageChangeHandler = (data: { selected: number }) => {
    const { basePath, param } = getPathsFromCurrentLocation(pathname);
    history.push(`/${basePath}/${param ?? routeFilters[0].key}/${data.selected + 1}`);
    window.scrollTo(0, 0);
  };

  const fetchData = useCallback(async () => {
    const [fetchedGenres, fetchedMovieResponse] = await Promise.all([
      fetchGenres(genres),
      getMovies({
        category,
        page,
      }),
    ]);
    setGenres(fetchedGenres);
    setMovieResponse(fetchedMovieResponse);
  }, [genres, category, page, setGenres]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!genres.length || !movieResponse) return <LoadingSpinner />;
  const initialPage = getInitialPage(routeParams.page);
  const route = routeFilters.find((item) => item.key === category);

  return (
    <>
      <Helmet>
        <title>{`${route!.value} / ${WEBSITE_NAME}`}</title>
      </Helmet>
      <MovieList
        movies={movieResponse.results}
        genres={genres}
        pageCount={movieResponse.total_pages}
        initialPage={initialPage}
        onPageChange={pageChangeHandler}
      />
    </>
  );
};
export default Home;
