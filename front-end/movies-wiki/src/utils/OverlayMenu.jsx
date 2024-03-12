import React from 'react';
import './OverlayMenu.css';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const OverlayMenu = ({ isOpen, handleClose, content }) => {
  console.log('OverlayMenu isOpen:', isOpen);


    return (
        <div className={`overlay ${isOpen ? 'open' : ''}`}>
          <div className="overlay-content" id="overlay-content">
          {content}
          </div>
          <button onClick={handleClose} className="closebtn">
          <CloseOutlinedIcon   sx={{  
            fontSize: 40, 
         }} />
          </button>
        </div>
      );
    };

export default OverlayMenu;
