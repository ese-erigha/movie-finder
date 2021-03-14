import React from 'react';
import ReactPaginate from 'react-paginate';
import MovieCard from 'components/MovieCard';
import { Genre, Movie } from 'types';

type Props = {
  movies: Movie[];
  genres: Genre[];
  pageCount: number;
  initialPage: number;
  onPageChange: (data: { selected: number }) => void;
};

const MovieList = (props: Props) => {
  if (props.movies?.length <= 0) return <></>;

  return (
    <>
      <div className="d-flex flex-wrap justify-content-md-between justify-content-center">
        {props.movies.map((movie) => (
          <MovieCard key={`${movie.id}${movie.title}`} movie={movie} genres={props.genres} />
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
        onPageChange={props.onPageChange}
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
