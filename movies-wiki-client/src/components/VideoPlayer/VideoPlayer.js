import React, { useState, useEffect } from "react";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";

const VideoPlayer = ({ trailers, movieName }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [videoDetails, setVideoDetails] = useState(null);

  useEffect(() => {
    if (trailers.results && trailers.results.length > 0) {
      setVideoDetails(trailers.results[activeSlide]);
    }
  }, [activeSlide, trailers]);

  const showVideos = () => {
    return trailers.results.map((video, idx) => (
      <div 
        key={idx} 
        className={`embed ${activeSlide === idx ? "show" : "hide"}`}
      >
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${video.key}?autoplay=${activeSlide === idx ? 1 : 0}&rel=0`}
          title={video.name}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    ));
  };

  const handleDotClick = (idx) => {
    setActiveSlide(idx);
  };

  const handleArrowClick = (direction) => {
    if (direction === "prev" && activeSlide > 0) {
      setActiveSlide(activeSlide - 1);
    } else if (
      direction === "next" &&
      activeSlide < trailers.results.length - 1
    ) {
      setActiveSlide(activeSlide + 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        handleArrowClick("prev");
      } else if (e.key === "ArrowRight") {
        handleArrowClick("next");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeSlide]);

  if (!trailers.results || trailers.results.length === 0) {
    return <h1 className="no-results">No Trailers Available</h1>;
  }

  return (
    <>
      <h1 className="movie-name">{movieName}</h1>
      
      <div className="video-container">
        {showVideos()}
        
        <div className="arrows">
          <span 
            className="arrow-left" 
            onClick={() => handleArrowClick("prev")}
            style={{ visibility: activeSlide === 0 ? 'hidden' : 'visible' }}
          >
            <ArrowCircleLeftOutlinedIcon
              sx={{
                fontSize: 60,
              }}
            />
          </span>
          <span
            className="arrow-right"
            onClick={() => handleArrowClick("next")}
            style={{ visibility: activeSlide === trailers.results.length - 1 ? 'hidden' : 'visible' }}
          >
            <ArrowCircleRightOutlinedIcon
              sx={{
                fontSize: 60,
              }}
            />
          </span>
        </div>
      </div>
      
      {videoDetails && (
        <div className="video-info">
          <h3>{videoDetails.name || "Trailer"}</h3>
          {videoDetails.type && (
            <span className="video-type">{videoDetails.type}</span>
          )}
        </div>
      )}
      
      <div className="dots">
        {trailers.results.map((_, idx) => (
          <span
            key={idx}
            className={`dot ${activeSlide === idx ? "active" : ""}`}
            onClick={() => handleDotClick(idx)}
            aria-label={`Trailer ${idx + 1}`}
          ></span>
        ))}
      </div>
    </>
  );
};

export default VideoPlayer;