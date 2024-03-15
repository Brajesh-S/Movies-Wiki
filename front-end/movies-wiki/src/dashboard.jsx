import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './dashboard.css';
import { roundVoteAverage } from './utils/roundVoteAverage';
import PlayButton from './utils/playButton';
import OverlayMenu from './utils/OverlayMenu';
import VideoPlayer from  './utils/VideoPlayer';
import AccountMenu from './profile';
import Lottie from "lottie-react"
import n1 from "./n1.json"




const Movie = ({ title, name, poster_path, overview, id, vote_average, media_type, openOverlay, handleWatchTrailerClick }) => {
  const movieTitle = title || name;
  if (media_type === 'person') { 
    return null;
  }
  const roundedVoteAverage = roundVoteAverage(vote_average);
  if (!poster_path || !overview) {
    return null;
  }
  return (
    <div className="movieDiv">
      <img
        src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : 'http://via.placeholder.com/1080x1580'}
        alt={movieTitle}
      />

      <div className="movie-info">
        <h3>{movieTitle}</h3>
        <span className="color">{roundedVoteAverage}</span>
      </div>

      <div className="overview">
        <p className={media_type === 'tv' ? 'tv-show' : 'movie'}>{media_type === 'tv' ? 'TV Show' : 'Movie'}</p>
        <h3>Plot</h3>
        {overview}
        <br />
        <PlayButton onClick={() => handleWatchTrailerClick(id, media_type,movieTitle)} openOverlay={openOverlay} media_type={media_type} />
      </div>
    </div>

    
  );
};

const Dashboard = () => {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOverlayOpen, setOverlayOpen] = useState(false);
  const [overlayContent, setOverlayContent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchMovies();
  }, [currentPage, searchTerm]);
    
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/movies/popular?page=${currentPage}`, {
          timeout: 1000 
        });   

          setMovies(response.data); // Setting movies state here
          
          setTotalPages(response.data.page);
         
          
     
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };


  useEffect(() => {
    handleSearch();
  }, [searchTerm]);


 
  const handleSearch = (e) => {
    if (e) {
      e.preventDefault();
    }

    if (!searchTerm.trim()) {
      fetchMovies();
      return;
    }
  

    axios
      .get('http://localhost:3000/api/search', {
        params: {
          query: searchTerm,
        },
        timeout: 1000 
      })
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const openOverlay = () => {
    setOverlayOpen(true);
  };

  const handleClose = () => {
    setOverlayOpen(false);
  };

  const handleWatchTrailerClick = async (id, media_type, movieTitle) => {
    
    console.log(movieTitle,"in handlewatchtrailerclick function")

    try {
      const response = await axios.get(`http://localhost:3001/api/trailers/${media_type}/${id}`);
  
      const trailers = response.data;
      console.log('Trailers:', trailers);
      
      

      if (trailers.results && trailers.results.length > 0) {
       
        const embed = trailers.results
        .filter((video) => video.site === 'YouTube')
        .map((video, idx) => (
          <iframe
            key={idx}
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${video.key}`}
            title={video.name}
            className="embed hide"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ));
        const dots = trailers.results
        .filter((video) => video.site === 'YouTube')
        .map((_, idx) => <span key={idx} className="dot">{idx + 1}</span>);
    
        const content = (
          <VideoPlayer trailers={trailers}  movieName={movieTitle} />
        );
        
        setOverlayContent(content);
        openOverlay(); 
     } else{
      alert('No Trailer Found!'); 
      const noResultsContent = <h1 className="no-results">No Results Found</h1>;
      setOverlayContent(noResultsContent);
     }
     

    } catch (error) {
      console.error('Error fetching trailers:', error);
    }
  };
  const handlePageChange = (page) => {
    if (page >= 1) {
      setCurrentPage(page);
    };

    window.scrollTo({
      top: 0,
      behavior:"smooth" 
  });
  }
  return (
    
    <div>
         <div className="logo-container">
              <div className="logo"></div>
      </div>
      <header> 
        
      <div className="account-menu-container">
              <AccountMenu position="left" />
        </div>
        
        <form id="form">
     <div className="search-container">
          <input
            type="text"
            className="search"
            placeholder="Search for movies . . ."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
           </div>
        </form>
     
      </header>
      

      <main id="main">
        {movies && movies.length > 0 ? (
          <>
          <div className="movie-container">
            {movies.map((movie) => (
              <Movie key={movie.id} {...movie} handleWatchTrailerClick={() => handleWatchTrailerClick(movie.id, movie.media_type, movie.title || movie.name)} openOverlay={openOverlay}  />
            ))}
          </div>
          
          <div className="pagination-centered">
          <div className="pagination">
              <div className={`page ${currentPage <= 1 ? 'disabled' : ''}`} onClick={() => handlePageChange(currentPage - 1)}>
                Previous Page
              </div>
              <div className="current" id="current">
                {currentPage}
                
              </div>
              <div className={`page ${currentPage >= totalPages ? 'disabled' : ''}`} onClick={() => handlePageChange(currentPage + 1)}>
                Next Page
                
              </div>
              
            </div>    
            </div>
            
         
          </>

        ) : (
          // <h1 className="no-results">No Results Found</h1>
          <div className="n">
         <h1 className="no-results"><Lottie animationData={n1}  /> </h1>
         
         </div>
        )}
      </main>

      

      {isOverlayOpen && <OverlayMenu isOpen={isOverlayOpen} handleClose={handleClose} content={overlayContent} />}
    </div>
  );
};

export default Dashboard;
