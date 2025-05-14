// src/Slot.js
import React, { useState } from 'react';

function Slot({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Handle left and right arrow click
  const handleLeftArrowClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleRightArrowClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div style={slotStyle}>
      <button onClick={handleLeftArrowClick} style={arrowStyle}>←</button>
      <img
        src={images[currentImageIndex]}
        alt={`Slot ${currentImageIndex}`}
        style={imageStyle}
      />
      <button onClick={handleRightArrowClick} style={arrowStyle}>→</button>
    </div>
  );
}

// Styles for the Slot component
const slotStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  maxWidth: "500px",
  height: "400px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  background: "#fff",
  borderRadius: "8px",
  position: "relative",
};

const imageStyle = {
  width: "100%",
  height: "auto",
  objectFit: "cover",
  borderRadius: "8px",
};

const arrowStyle = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  color: "white",
  border: "none",
  padding: "10px",
  cursor: "pointer",
};

export default Slot;
