import React from 'react';
import { roundVoteAverage } from '../../utils/roundVoteAverage';
import PlayButton from '../WatchTrailer/watchTrailer';
import '../Dashboard/dashboard.css';

const MovieCard = ({ movie, onTrailerClick }) => {
  const {
    title,
    name,
    poster_path,
    overview,
    id,
    vote_average,
    media_type
  } = movie;

  const movieTitle = title || name;
  const roundedVoteAverage = roundVoteAverage(vote_average);

  if (media_type === 'person' || !poster_path || !overview) return null;

  return (
    <div className="movieDiv">
      <img
        src={poster_path 
          ? `https://image.tmdb.org/t/p/w500/${poster_path}`
          : "http://via.placeholder.com/1080x1580"}
        alt={movieTitle}
      />

      <div className="movie-info">
        <h3>{movieTitle}</h3>
        <span className="color">{roundedVoteAverage}</span>
      </div>

      <div className="overview">
        <p className={media_type === 'tv' ? 'tv-show' : 'movie'}>
          {media_type === 'tv' ? 'TV Show' : 'Movie'}
        </p>
        <h3>Plot</h3>
        {overview}
        <br />
        <PlayButton
          onClick={() => onTrailerClick(id, media_type, movieTitle)}
          media_type={media_type}
        />
      </div>
    </div>
  );
};

export default MovieCard;