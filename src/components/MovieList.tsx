import React from 'react';
import ReactPaginate from 'react-paginate';
import MovieCard from 'components/MovieCard';

const MovieList = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  const props = {
    pageCount: 200,
    initialPage: 12,
  };

  const handlePageClick = (data: { selected: number }) => {
    console.log(data);
  };
  return (
    <>
      <div className="d-flex flex-wrap justify-content-md-between justify-content-center">
        {arr.map((item) => (
          <MovieCard key={item} />
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
