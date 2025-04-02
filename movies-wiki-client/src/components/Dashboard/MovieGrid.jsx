import React from 'react';
import MovieCard from './MovieCard';
import Lottie from 'lottie-react';
import n1 from '../../assets/n1.json';
import '../Dashboard/dashboard.css';

const MovieGrid = ({ movies, loading, onTrailerClick   }) => {
  if (loading) return <div className="loading-spinner">Loading...</div>;
  
  return (
    <div className="movie-container">
      {movies.length === 0 ? (
        <div className="no-results">
          <Lottie animationData={n1} style={{ height: 300 }} />
        </div>
      ) : (
        movies.map(movie => (
          <MovieCard key={movie.id} movie={movie}  onTrailerClick={onTrailerClick} />
        ))
      )}
    </div>
  );
};

export default MovieGrid;