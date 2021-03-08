import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Search from 'components/Search';
import tmdbLogo from 'assets/img/tmdb_logo.png';

const NavBar = () => (
  <Navbar fixed="top" bg="dark" variant="dark" expand="md" className="bg-black">
    <Container>
      <Navbar.Brand href="/">MovieFlix</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Item>
            <Nav.Link href="#features">Popular</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#pricing">Now playing</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#pricing">Top rated</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#pricing">Upcoming</Nav.Link>
          </Nav.Item>
        </Nav>
        <Nav>
          <Nav.Item>
            <Nav.Link eventKey={2}>
              <Search />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={1} href="https://github.com/eseerigha/movie-finder">
              <i className="fab fa-github fa-2x white mt-6" aria-hidden="true" />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey={1}
              href="https://developers.themoviedb.org/3/getting-started/introduction"
            >
              <Image src={tmdbLogo} />
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default NavBar;
