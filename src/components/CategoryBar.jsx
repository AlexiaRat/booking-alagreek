// src/components/CategoryBar.jsx
import { useState } from "react";

function CategoryBar({ language, texts, onCategoryChange }) {
  const [activeCategory, setActiveCategory] = useState("cazare");

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (onCategoryChange) {
      onCategoryChange(category);
    }
  };

  return (
    <div style={barContainerStyle}>
      <div
        style={{
          ...segmentStyle,
          backgroundColor: activeCategory === "cazare" ? "#56f0b2" : "#ffffff",
          color: activeCategory === "cazare" ? "#ffffff" : "#000000",
        }}
        onClick={() => handleCategoryClick("cazare")}
      >
        {texts[language].categoryLabels.cazare}
      </div>
      <div
        style={{
          ...segmentStyle,
          backgroundColor: activeCategory === "barci" ? "#56f0b2" : "#ffffff",
          color: activeCategory === "barci" ? "#ffffff" : "#000000",
        }}
        onClick={() => handleCategoryClick("barci")}
      >
        {texts[language].categoryLabels.barci}
      </div>
      <div
        style={{
          ...segmentStyle,
          backgroundColor: activeCategory === "excursii" ? "#56f0b2" : "#ffffff",
          color: activeCategory === "excursii" ? "#ffffff" : "#000000",
        }}
        onClick={() => handleCategoryClick("excursii")}
      >
        {texts[language].categoryLabels.excursii}
      </div>
    </div>
  );
}

const barContainerStyle = {
  display: "flex",
  width: "100%",
  height: "60px",
  backgroundColor: "#ffffff",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
};

const segmentStyle = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "16px",
  transition: "background-color 0.3s",
};

export default CategoryBar;
