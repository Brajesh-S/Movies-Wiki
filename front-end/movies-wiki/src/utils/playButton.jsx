import React from 'react';
import { MdSmartDisplay } from 'react-icons/md';


function PlayButton({ onClick, id, openOverlay, media_type }) {
 
  
  const handleButtonClick = () => {
    console.log('handleButtonClick triggered');
    if (openOverlay) {
      
      openOverlay(id, media_type);
    }
    // Your existing click handling logic
    if (onClick && id && media_type) {
      onClick(id, media_type);
    }
  }
  return (
    
      <button className="my-button" onClick={onClick}>
        <span className="icon-container">
          <MdSmartDisplay />
        </span>
        <span className="text-container">
          Watch Trailer
        </span>
      </button>
    
  );
    }
  export default PlayButton;