import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Actor from 'components/movie/Actor';
import { Personnel } from 'types';

type Props = {
  actors: Personnel[];
};

const Cast = ({ actors }: Props) => {
  const [showAll, setShowAll] = useState(false);
  const actorsToShow = showAll ? actors : actors.slice(0, 6);
  const showAllHandler = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="movie-cast">
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="list-title list-title-dark mb-4">Actors</h3>
        <div className="custom-control custom-switch pr-5 info">
          <Form>
            <Form.Group>
              <input
                onChange={showAllHandler}
                checked={showAll}
                type="checkbox"
                className="custom-control-input info"
                id="show-all"
              />
              <Form.Label htmlFor="show-all" className="custom-control-label">
                Show all
              </Form.Label>
            </Form.Group>
          </Form>
        </div>
      </div>
      <div
        data-testid="actor-list"
        className="movie-cast__list d-flex flex-wrap justify-content-md-center justify-content-lg-start justify-content-center align-items-stretch"
      >
        {actorsToShow.map((actor) => (
          <Actor key={`${actor.id}${actor.character}`} {...actor} />
        ))}
      </div>
    </div>
  );
};
export default Cast;
