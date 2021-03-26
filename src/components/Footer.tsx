import React from 'react';
import Image from 'react-bootstrap/Image';
import tmdbLogo from 'assets/img/tmdb_logo.png';

const Footer = () => (
  <footer className="footer text-center mt-4 mb-4 white">
    <span>&#169; 2021 made with</span>
    <i className="fa fa-heart heart space-left-7" aria-hidden="true" />
    <span className="space-left-7">by</span>
    <a href="https://github.com/eseerigha/movie-finder" className="space-left-7">
      eseerigha
    </a>
    <a
      data-testid="tmdb-link"
      href="https://developers.themoviedb.org/3/getting-started/introduction"
      rel="noopener noreferrer"
      target="_blank"
      className="space-left-15"
    >
      <Image data-testid="tmdb-logo" src={tmdbLogo} />
    </a>
  </footer>
);
export default Footer;
