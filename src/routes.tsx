import React, { lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

const Home = lazy(() => import('pages/Home'));
const MovieDetail = lazy(() => import('pages/MovieDetail'));
const Search = lazy(() => import('pages/Search'));

export const route = {
  home: '/movies/:category(popular|top_rated|upcoming|now_playing)?/:page(\\d+)?',
  search: '/search/:query/:page(\\d+)?',
  movie: '/movie/:id(\\d+)',
};

const Routes = () => (
  <Switch>
    <Route path={route.home} exact component={Home} />
    <Route path={route.search} exact component={Search} />
    <Route path={route.movie} exact component={MovieDetail} />
    <Redirect to="/movies" />
  </Switch>
);

export default Routes;
