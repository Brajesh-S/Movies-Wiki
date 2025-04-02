
import { useState} from 'react';
import { useAuth } from '../../context/authContext';
import axios from 'axios';
import MovieGrid from './MovieGrid';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import useMovies from './useMovies';
import OverlayMenu from '../Overlay/OverlayMenu';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import AccountMenu from '../Profile/profile';
import './dashboard.css';

const Dashboard = () => {
  const { authData } = useAuth();
  const {
    movies,
    searchTerm,
    currentPage,
    totalPages,
    loading,
    error,
    handleSearch,
    handlePageChange
  } = useMovies(authData.token);

  const [isOverlayOpen, setOverlayOpen] = useState(false);
  const [overlayContent, setOverlayContent] = useState(null);

  const handleTrailerClick = async (id, media_type, movieTitle) => {
    try {
      const response = await axios.get(
        `https://movies-wiki.onrender.comapi/trailers/${media_type}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${authData.token}`,
          },
        }
      );

      const trailers = response.data;

      if (trailers.results?.length > 0) {
        setOverlayContent(
          <VideoPlayer trailers={trailers} movieName={movieTitle} />
        );
        setOverlayOpen(true);
      } else {
        setOverlayContent(<h1 className="no-results">No Results Found</h1>);
        setOverlayOpen(true);
      }
    } catch (error) {
      console.error("Error fetching trailers:", error);
    }
  };

  const handleCloseOverlay = () => {
    setOverlayOpen(false);
  };

  return (
    <div className="dashboard-container">
    <header>
      <div className="logo-container">
        <div className="logo"></div>
      </div>
      
      <div className="search-container">
        <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
      </div>
      
      <div className="account-menu-container">
        <AccountMenu />
      </div>
    </header>
      
      
      {error && <div className="error-banner">{error}</div>}
      
      <MovieGrid 
        movies={movies} 
        loading={loading} 
        onTrailerClick={handleTrailerClick}
      />
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {isOverlayOpen && (
        <OverlayMenu
          isOpen={isOverlayOpen}
          handleClose={handleCloseOverlay}
          content={overlayContent}
        />
      )}
    </div>
  );
};

export default Dashboard;