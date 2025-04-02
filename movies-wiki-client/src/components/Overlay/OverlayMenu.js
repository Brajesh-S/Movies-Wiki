import React, { useEffect, useRef } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import "./OverlayMenu.css";

const OverlayMenu = ({ isOpen, handleClose, content }) => {
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (overlayRef.current && 
          !overlayRef.current.querySelector('.overlay-content').contains(event.target) &&
          !event.target.closest('.arrows') && 
          !event.target.closest('.dots') &&
          !event.target.closest('.closebtn')) {
        handleClose();
      }
    };

    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, handleClose]);

  return (
    <div 
      ref={overlayRef}
      className={`overlay ${isOpen ? "open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="trailer-modal-title"
    >
      <div className="overlay-content" id="overlay-content">
        {content}
      </div>
      <button 
        onClick={handleClose} 
        className="closebtn"
        aria-label="Close trailer"
      >
        <CloseOutlinedIcon />
      </button>
    </div>
  );
};

export default OverlayMenu;