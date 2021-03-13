import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { getMovies, getGenres } from 'api/movieService';
import MovieList from 'components/MovieList';
import { getPathsFromCurrentLocation, routeFilters } from 'helper';
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
    let movieGenres: Genres = {};
    if (!genres.length) {
      movieGenres = await getGenres();
    }
    const fetchedMovieResponse = await getMovies({
      category,
      page,
    });

    setGenres(movieGenres?.genres ?? genres);
    setMovieResponse(fetchedMovieResponse);
  }, [genres, category, page]);

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
        onPageChange={pageChangeHandler}
      />
    </>
  );
};
export default Home;
