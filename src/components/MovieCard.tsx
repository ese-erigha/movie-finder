import React from 'react';
import Card from 'react-bootstrap/Card';

const MovieCard = () => {
  console.log();
  // /95S6PinQIvVe4uJAd82a2iGZ0rA.jpg
  // /6KErczPBROQty7QoIsaa6wJYXZi.jpg
  return (
    <Card className="movie-card">
      <a href="https://api-cinema-10d15.firebaseapp.com/movie/587807">
        <Card.Img
          className="fadeIn animated"
          variant="top"
          src="https://image.tmdb.org/t/p/w300/6KErczPBROQty7QoIsaa6wJYXZi.jpg"
        />
        <Card.Body>
          <span className="card-rating text-center">7.4</span>
          <Card.Title className="mr-4">Tom and Jerry</Card.Title>
          <p className="small mb-0">Drama, Fiction, Science Fiction</p>
        </Card.Body>
      </a>
    </Card>
  );
};
export default MovieCard;
