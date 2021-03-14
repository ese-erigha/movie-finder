import { getPathsFromCurrentLocation } from 'helper';
import React, { ChangeEvent, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import { useHistory, useLocation } from 'react-router-dom';
import { SEARCH_PATH } from '../constants';

const Search = (): JSX.Element => {
  const [input, setInput] = useState<string>('');
  const { pathname } = useLocation();
  const { basePath, param } = getPathsFromCurrentLocation(pathname);
  const history = useHistory();

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setInput(query);
    let path = `/`;
    if (query.length >= 2) {
      path = `/${SEARCH_PATH}/${query}`;
    }
    history.push(path);
  };

  useEffect(() => {
    const inputValue = basePath === SEARCH_PATH ? param ?? '' : input;
    setInput(inputValue);
  }, [basePath, input, param]);

  return (
    <div className="searchbar d-flex justify-content-start align-items-center">
      <i className="fa fa-search white" aria-hidden="true" />
      <Form>
        <FormGroup>
          <Form.Control
            type="text"
            placeholder="Search by movie title"
            value={input}
            onChange={onChangeHandler}
            className="searchbar-input no-border-radius bg-black"
          />
        </FormGroup>
      </Form>
    </div>
  );
};

export default Search;
