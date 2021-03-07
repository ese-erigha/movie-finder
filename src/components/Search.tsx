import React from 'react';
import Form from 'react-bootstrap/Form';

const Search = (): JSX.Element => {
  console.log('Hello');
  return (
    <div className="searchbar d-flex justify-content-center align-items-center">
      <i className="fa fa-search white" aria-hidden="true" />
      <Form.Control
        type="search"
        placeholder="Search..."
        className="searchbar-input no-border-radius bg-black"
      />
    </div>
  );
};

export default Search;
