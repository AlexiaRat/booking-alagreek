// src/pages/Home.jsx
import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Content } from "../styles";
import ParallaxEffect from "../components/ParallaxEffect";
import accommodations from "../data/accommodations.json";
import boats from "../data/boats.json";
import excursions from "../data/excursions.json";
import CategoryBar from "../components/CategoryBar";
import { ArrowLeft, ArrowRight } from "../components/Arrows";
import { LanguageContext } from "../context/LanguageContext";

function Home() {
  const { lang } = useParams();
  const { language, selectLanguage } = useContext(LanguageContext);

  const [activeCategory, setActiveCategory] = useState("cazare");
  const [imageIndexes, setImageIndexes] = useState(Array(8).fill(0));

  useEffect(() => {
    selectLanguage(lang);
  }, [lang]);

  // Obiectul de texte pentru diferite limbi
  const texts = {
    ro: {
      title: "Descoperă Grecia",
      description:
        "De ce ai accesat acest site? Vrei în Grecia… vrei Vacanța ALaGreek și speri să găsești calea cea mai simplă spre soarele Eladei? Personalizez vacanța ta în funcție de ceea ce îți dorești și vacanța ta grecească va deveni una dintre cele mai frumoase amintiri!!! Pentru că vreau să îți ofer ceea ce și mie mi-ar plăcea să găsesc în vacanță, discut parte în parte cu fiecare dintre voi până la momentul în care vei spune: asta e!!",
      categoryLabels: {
        cazare: "Cazare",
        barci: "Barci",
        excursii: "Excursii",
      },
      slotDescriptions: {
        cazare:
          "Explorează locurile de cazare din Grecia! Descoperă vile luxoase și hoteluri cu servicii complete.",
        barci:
          "Descoperă plimbările cu barca pe apele cristaline ale Greciei, cu itinerarii spectaculoase.",
        excursii:
          "Află mai multe despre excursiile organizate în cele mai pitorești locuri din Grecia.",
      },
    },
    en: {
      title: "Discover Greece",
      description:
        "Why do you visit this site? Do you want a holiday to Greece… do you want a vacation ALaGreek style and hope to find a way to the sun of Elada? I personalize your vacation according to what you desire, and your Greek holiday will become one of your most beautiful memories!!! Because I want to offer you what I would like to find myself on vacation, I discuss with each of you until the moment you say: this is it!!",
      categoryLabels: {
        cazare: "Accommodation",
        barci: "Boats",
        excursii: "Excursions",
      },
      slotDescriptions: {
        cazare:
          "Explore the accommodation options in Greece! Discover luxurious villas and hotels with full services.",
        barci:
          "Discover boat trips on Greece's crystal-clear waters with breathtaking itineraries.",
        excursii:
          "Learn more about excursions to Greece's most picturesque locations.",
      },
    },
    gr: {
      title: "Ανακαλύψτε την Ελλάδα",
      description:
        "Γιατί επισκεφθήκατε αυτή την ιστοσελίδα; Θέλετε να πάτε στην Ελλάδα… θέλετε διακοπές με την ALaGreek και ελπίζετε να βρείτε τον πιο εύκολο δρόμο προς τον ήλιο της Ελάδας; Προσαρμόζω τις διακοπές σας ανάλογα με αυτά που επιθυμείτε και οι ελληνικές σας διακοπές θα γίνουν μια από τις πιο όμορφες αναμνήσεις!!! Γιατί θέλω να σας προσφέρω ό,τι θα ήθελα κι εγώ να βρω στις διακοπές μου, συζητώ μέρος-μέρος με τον καθένα από εσάς μέχρι τη στιγμή που θα πείτε: αυτό είναι!!",
      categoryLabels: {
        cazare: "Καταλύματα",
        barci: "Βάρκες",
        excursii: "Εκδρομές",
      },
      slotDescriptions: {
        cazare:
          "Εξερευνήστε τα καταλύματα στην Ελλάδα! Ανακαλύψτε πολυτελείς βίλες και ξενοδοχεία με πλήρεις υπηρεσίες.",
        barci:
          "Ανακαλύψτε τις βόλτες με βάρκα στα κρυστάλλινα νερά της Ελλάδας με εκπληκτικά δρομολόγια.",
        excursii:
          "Μάθετε περισσότερα για τις εκδρομές στα πιο γραφικά μέρη της Ελλάδας.",
      },
    },
  };
  
  // Funcția de shuffle pentru imagine
  const shuffleImage = (direction, slotIndex, items) => {
    setImageIndexes((prevIndexes) => {
      const newIndexes = [...prevIndexes];
      const currentItem = items[slotIndex];
      if (!currentItem) return newIndexes;
      if (direction === "left") {
        newIndexes[slotIndex] =
          newIndexes[slotIndex] === 0
            ? currentItem.images.length - 1
            : newIndexes[slotIndex] - 1;
      } else if (direction === "right") {
        newIndexes[slotIndex] =
          newIndexes[slotIndex] === currentItem.images.length - 1
            ? 0
            : newIndexes[slotIndex] + 1;
      }
      return newIndexes;
    });
  };

  // Alegem datele în funcție de categorie
  const getItemsByCategory = () => {
    if (activeCategory === "cazare") return accommodations;
    if (activeCategory === "barci") return boats;
    if (activeCategory === "excursii") return excursions;
    return [];
  };

  const activeItems = getItemsByCategory();

  return (
    <div style={{ position: "relative", minHeight: "200vh" }}>
      {/* Parallax Effect */}
      <div style={{ width: "100%", height: "80vh", overflow: "hidden" }}>
        <ParallaxEffect />
      </div>

      {/* Secțiune principală - RESPONSIVE */}
      <div style={mainSectionStyle}>
        <h2 style={titleStyle}>{texts[language].title}</h2>
        <p style={descriptionStyle}>{texts[language].description}</p>
      </div>

      {/* Bara de navigație pentru categorii */}
      <CategoryBar
        language={language}
        texts={texts}
        onCategoryChange={(category) => setActiveCategory(category)}
      />

      {/* Grid cu sloturi */}
      <div style={slotsContainerStyle}>
        {activeItems.map((item, index) => (
          <Link
            key={item.id}
            to={`/${language}/${activeCategory}/${item.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div style={slotStyle}>
              {/* Container imagine */}
              <div style={imageContainerStyle}>
                <img
                  src={item.images[imageIndexes[index] || 0]}
                  alt={item.name}
                  style={imageStyle}
                />
                {/* Săgeți stânga/dreapta */}
                <div style={arrowContainerStyle}>
                  <button
                    onClick={(e) => { e.preventDefault(); shuffleImage("left", index, activeItems); }}
                    style={arrowButtonStyle}
                  >
                    <ArrowLeft color="#fff" size={24} />
                  </button>
                  <button
                    onClick={(e) => { e.preventDefault(); shuffleImage("right", index, activeItems); }}
                    style={arrowButtonStyle}
                  >
                    <ArrowRight color="#fff" size={24} />
                  </button>
                </div>
              </div>

              {/* Container text */}
              <div style={textContainerStyle}>
                <h3 style={slotTitleStyle}>{item.name}</h3>
                {/* Afișăm textul localizat, în funcție de categorie și limbă */}
                <p style={slotDescStyle}>
                  {texts[language].slotDescriptions[activeCategory]}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div style={{ padding: "20px" }}>
        <Content>
         
        </Content>
      </div>
    </div>
  );
}

/* STILURI RESPONSIVE */

// Secțiunea principală - responsive
const mainSectionStyle = {
  maxWidth: "1800px",
  margin: "0 auto",
  background: "#fff",
  color: "#000",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: "40px 20px 60px 20px",
  minHeight: "auto", // Nu mai forțăm înălțimea
  
  // Media query pentru mobile în CSS-in-JS nu merge, 
  // dar putem folosi window.innerWidth sau CSS separat
};

const titleStyle = {
  fontSize: "clamp(1.5rem, 4vw, 2.5rem)", // Responsive font size
  marginBottom: "20px",
  lineHeight: "1.2",
};

const descriptionStyle = {
  fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)", // Responsive font size  
  lineHeight: "1.6",
  maxWidth: "800px",
  margin: "0 auto",
};

const slotsContainerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", // Redus min-width pentru mobile
  gap: "20px",
  padding: "20px",
};

const slotStyle = {
  display: "flex",
  flexDirection: "column",
  background: "#fff",
  borderRadius: "10px",
  overflow: "hidden",
  minHeight: "400px", // Schimbat în minHeight pentru flexibilitate
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  transition: "box-shadow 0.3s",
};

const imageContainerStyle = {
  position: "relative",
  overflow: "hidden",
  minHeight: "250px", // Înălțime minimă pentru imagine
  maxHeight: "300px", // Înălțime maximă
};

const textContainerStyle = {
  padding: "15px", // Mărit padding-ul
  textAlign: "center",
  minHeight: "120px", // Înălțime minimă pentru text
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const imageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const arrowContainerStyle = {
  position: "absolute",
  top: "50%",
  left: -10,
  right: -10,
  display: "flex",
  justifyContent: "space-between",
  transform: "translateY(-50%)",
  pointerEvents: "none",
  zIndex: 2,
  padding: "0 10px"
};

const arrowButtonStyle = {
  pointerEvents: "auto",
  background: "transparent",
  color: "#000",
  border: "none",
  outline: "none",
  cursor: "pointer",
  borderRadius: "50%",
  width: "60px",
  height: "40px", // Dăm înălțime pentru a fi clicabile
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 3,
};

const slotTitleStyle = {
  margin: "0 0 10px 0",
  fontSize: "clamp(1rem, 3vw, 1.2rem)", // Responsive
  color: "#000",
  fontWeight: "bold",
};

const slotDescStyle = {
  margin: 0,
  fontSize: "clamp(0.8rem, 2vw, 0.9rem)", // Responsive
  color: "#666",
  lineHeight: "1.4",
};

export default Home;