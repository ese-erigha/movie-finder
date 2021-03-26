import React, { ChangeEvent, useEffect, useCallback, useState } from 'react';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import { useHistory, useLocation } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { getPathsFromCurrentLocation } from 'helper';
import { SEARCH_PATH } from '../constants';

const Search = (): JSX.Element => {
  const [input, setInput] = useState<string>('');
  const { pathname } = useLocation();
  const { basePath, param } = getPathsFromCurrentLocation(pathname);
  const history = useHistory();

  const navToSearch = (query: string) => {
    let path = `/`;
    if (query.length >= 2) {
      path = `/${SEARCH_PATH}/${query}`;
    }
    history.push(path);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch = useCallback(
    debounce((query) => navToSearch(query), 300),
    [],
  );

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setInput(query);
    debounceSearch(query);
  };

  // Runs only once - when page loads
  useEffect(() => {
    const defaultValue = '';
    const inputValue = basePath === SEARCH_PATH ? param ?? defaultValue : defaultValue;
    setInput(inputValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
