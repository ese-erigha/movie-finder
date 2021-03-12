import React from 'react';
import ReactPaginate from 'react-paginate';
import { useHistory, useLocation } from 'react-router-dom';
import MovieCard from 'components/MovieCard';
import { Genre, Movie } from 'types';
import { getPathsFromCurrentLocation, routeFilters } from 'helper';

type Props = {
  movies: Movie[];
  genres: Genre[];
  pageCount: number;
  initialPage: number;
};

const MovieList = (props: Props) => {
  const history = useHistory();
  const { pathname } = useLocation();

  const handlePageClick = (data: { selected: number }) => {
    const { basePath, param } = getPathsFromCurrentLocation(pathname);
    history.push(`/${basePath}/${param ?? routeFilters[0].key}/${data.selected + 1}`);
    window.scrollTo(0, 0);
  };
  return (
    <>
      <div className="d-flex flex-wrap justify-content-md-between justify-content-center">
        {props.movies.map((movie) => (
          <MovieCard key={movie.title} movie={movie} genres={props.genres} />
        ))}
      </div>
      <ReactPaginate
        previousLabel="&larr;"
        nextLabel="&rarr;"
        breakLabel="..."
        breakClassName="break-me"
        pageCount={props.pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        disableInitialCallback={true}
        initialPage={props.initialPage}
        forcePage={props.initialPage}
        containerClassName="pagination"
        activeClassName="active"
      />
    </>
  );
};

export default MovieList;
