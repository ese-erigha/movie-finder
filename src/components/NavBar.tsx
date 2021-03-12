import React from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Search from 'components/Search';

const filters = [
  { key: 'popular', value: 'Popular' },
  { key: 'now_playing', value: 'Now playing' },
  { key: 'top_rated', value: 'Top rated' },
  { key: 'upcoming', value: 'Upcoming' },
];

const getFilterKey = (pathname: string) => {
  const routeSplit = pathname.split('/');
  const basePath = routeSplit[1].toLowerCase();
  const param = routeSplit[2] ?? null;
  if (basePath === 'movies') return param || filters[0].key;

  return null;
};

const NavBar = () => {
  const { pathname } = useLocation();
  const routeFilterKey = getFilterKey(pathname);
  const navItems = filters.map((item) => {
    const navItemClass = classNames({
      filter: true,
      active: item.key === routeFilterKey,
    });

    return (
      <Nav.Item key={item.value}>
        <Nav.Link href={`/movies/${item.key}`} className={navItemClass}>
          {item.value}
        </Nav.Link>
      </Nav.Item>
    );
  });

  return (
    <Navbar fixed="top" bg="dark" variant="dark" expand="md" className="nav-menu bg-black">
      <Container>
        <Navbar.Brand href="/">MovieFlix</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">{navItems}</Nav>
          <Nav>
            <Nav.Item>
              <Nav.Link eventKey={2}>
                <Search />
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavBar;
