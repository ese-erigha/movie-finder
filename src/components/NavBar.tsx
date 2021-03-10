import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Search from 'components/Search';

const NavBar = () => (
  <Navbar fixed="top" bg="dark" variant="dark" expand="md" className="nav-menu bg-black">
    <Container>
      <Navbar.Brand href="/">MovieFlix</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Item>
            <Nav.Link href="#features" className="filter">
              Popular
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#pricing" className="filter">
              Now playing
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#pricing" className="filter">
              Top rated
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#pricing" className="filter">
              Upcoming
            </Nav.Link>
          </Nav.Item>
        </Nav>
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

export default NavBar;
