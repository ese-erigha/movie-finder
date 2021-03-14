import React from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Search from 'components/SearchForm';
import { getPathsFromCurrentLocation, routeFilters } from 'helper';

const HOME_PATH = 'movies';

const getRouteFilterKey = (pathname: string) => {
  const { basePath, param } = getPathsFromCurrentLocation(pathname);
  if (basePath === HOME_PATH) return param || routeFilters[0].key;
  return null;
};

const NavBar = () => {
  const { pathname } = useLocation();
  const routeFilterKey = getRouteFilterKey(pathname);
  const navItems = routeFilters.map((item) => {
    const navItemClass = classNames({
      filter: true,
      active: item.key === routeFilterKey,
    });

    return (
      <Nav.Item key={item.value}>
        <Nav.Link href={`/${HOME_PATH}/${item.key}`} className={navItemClass}>
          {item.value}
        </Nav.Link>
      </Nav.Item>
    );
  });

  return (
    <Navbar fixed="top" bg="dark" variant="dark" expand="md" className="nav-menu bg-black">
      <Container>
        <Navbar.Brand href="/">MFlix</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">{navItems}</Nav>
          <Nav>
            <Nav.Item>
              {/* Fixed issue with spacebar text in search via https://github.com/react-bootstrap/react-bootstrap/issues/2934   */}
              <div className="nav-link">
                <Search />
              </div>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavBar;
