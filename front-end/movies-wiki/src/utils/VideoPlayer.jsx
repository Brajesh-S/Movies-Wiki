import React, { useState } from 'react';

import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

const VideoPlayer = ({ trailers, movieName }) => {
  const [activeSlide, setActiveSlide] = useState(0);
    console.log(movieName,"in videoplayer.jsx")
  const showVideos = () => {
    return trailers.results.map((video, idx) => (
      <iframe
        key={idx}
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${video.key}`}
        title={video.name}
        className={`embed ${activeSlide === idx ? 'show' : 'hide'}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    ));
  };

  const handleDotClick = (idx) => {
    setActiveSlide(idx);
  };
  const handleArrowClick = (direction) => {
    if (direction === 'prev' && activeSlide > 0) {
      setActiveSlide(activeSlide - 1);
    } else if (direction === 'next' && activeSlide < trailers.results.length - 1) {
      setActiveSlide(activeSlide + 1);
    }
  };

  return (
    <>
     <h1 className="movie-name">{movieName}</h1>
     <br />
    
    <div className="video-container">
      {showVideos()}
      <div className="dots">
        {trailers.results.map((_, idx) => (
          <span key={idx} className={`dot ${activeSlide === idx ? 'active' : ''}`} onClick={() => handleDotClick(idx)}> {idx + 1}</span>
        ))}
      </div>
      
      <div className="arrows">
        <span className="arrow-left" onClick={() => handleArrowClick('prev')}><ArrowCircleLeftOutlinedIcon 
        sx={{ 
           
            fontSize: 70,   
         }}
            
/></    span>
        <span className="arrow-right" onClick={() => handleArrowClick('next')}><ArrowCircleRightOutlinedIcon 
        sx={{  
            fontSize: 70, 
         }}/></span>
      </div>
      </div>
    </>
  );
};

export default VideoPlayer;
