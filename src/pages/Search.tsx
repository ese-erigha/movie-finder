import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MovieList from 'components/MovieList';
import { useAppContext } from 'context/AppContextManager';
import { usePrevious } from 'hooks/usePrevious';
import { searchMovies } from 'api/movieService';
import { MoviesResponse } from 'types';
import LoadingSpinner from 'components/LoadingSpinner';
import { SEARCH_PATH } from '../constants';

type RouteParams = {
  query: string;
  page?: string;
};

const Search = () => {
  const [movieResponse, setMovieResponse] = useState<MoviesResponse>();
  const { genres } = useAppContext();
  const history = useHistory();
  const { query, page } = useParams<RouteParams>();
  const prevQuery = usePrevious(query);
  const prevPage = usePrevious(page);

  const pageChangeHandler = (data: { selected: number }) => {
    history.push(`/${SEARCH_PATH}/${query}/${data.selected + 1}`);
  };

  const fetchData = useCallback(async () => {
    if (prevQuery !== query || prevPage !== page) {
      const pageNumber = page ? parseInt(page, 10) : 1;
      const fetchedMoviesResponse = await searchMovies({
        query,
        page: pageNumber,
      });
      setMovieResponse(fetchedMoviesResponse);
    }
  }, [page, prevPage, prevQuery, query]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!genres || !movieResponse) return <LoadingSpinner />;
  const initialPage = page ? parseInt(page, 10) - 1 : 0;
  const titlePrefix = movieResponse.results?.length ? 'Search ' : 'No search ';

  return (
    <>
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
