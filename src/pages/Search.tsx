import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import MovieList from 'components/MovieList';
import { useAppContext } from 'context/AppContextManager';
import { usePrevious } from 'hooks/usePrevious';
import { searchMovies } from 'api/movieService';
import { MoviesResponse } from 'types';
import LoadingSpinner from 'components/LoadingSpinner';
import { fetchGenres, getInitialPage } from 'helper';
import { SEARCH_PATH, WEBSITE_NAME } from '../constants';

type RouteParams = {
  query: string;
  page?: string;
};

const Search = () => {
  const [movieResponse, setMovieResponse] = useState<MoviesResponse>();
  const { genres, setGenres } = useAppContext();
  const history = useHistory();
  const { query, page } = useParams<RouteParams>();
  const prevQuery = usePrevious(query);
  const prevPage = usePrevious(page);

  const pageChangeHandler = (data: { selected: number }) => {
    history.push(`/${SEARCH_PATH}/${query}/${data.selected + 1}`);
    window.scrollTo(0, 0);
  };

  const fetchData = useCallback(async () => {
    if (prevQuery !== query || prevPage !== page) {
      const pageNumber = page ? parseInt(page, 10) : 1;
      const [fetchedGenres, fetchedMoviesResponse] = await Promise.all([
        fetchGenres(genres),
        searchMovies({
          query,
          page: pageNumber,
        }),
      ]);
      setGenres(fetchedGenres);
      setMovieResponse(fetchedMoviesResponse);
    }
  }, [genres, page, prevPage, prevQuery, query, setGenres]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!genres || !movieResponse) return <LoadingSpinner />;
  const initialPage = getInitialPage(page);
  const titlePrefix = movieResponse.results?.length ? 'Search ' : 'No search ';

  return (
    <>
      <Helmet>
        <title>{`${query} / ${WEBSITE_NAME}`}</title>
      </Helmet>
      <h1 className="list-title mb-5">
        {titlePrefix} results for "{query}"
      </h1>
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
export default Search;
