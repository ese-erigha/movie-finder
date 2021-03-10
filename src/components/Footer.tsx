import React from 'react';
import Image from 'react-bootstrap/Image';
import tmdbLogo from 'assets/img/tmdb_logo.png';

const Footer = () => (
  <footer className="footer text-center mt-4 mb-4 white">
    &#169; 2021 made with
    <i className="fa fa-heart heart space-left-5" aria-hidden="true" />
    <span className="space-left-5">by</span>
    <a href="https://github.com/eseerigha/movie-finder" className="space-left-5">
      eseerigha
    </a>
    <a
      href="https://developers.themoviedb.org/3/getting-started/introduction"
      rel="noopener noreferrer"
      target="_blank"
      className="space-left-5"
    >
      <Image src={tmdbLogo} />
    </a>
  </footer>
);
export default Footer;
