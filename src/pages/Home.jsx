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

      {/* Secțiune principală */}
      <div
        style={{
          
          maxWidth: "1800px",
          height: "20vh",
          background: "#fff",
          color: "#000",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "40px 40px 60px 40px",
        }}
      >
        <h2>{texts[language].title}</h2>
        <p>{texts[language].description}</p>
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
          <p>Descoperă cele mai frumoase locuri din Grecia!</p>
          <p>Derulează în jos pentru mai multe informații...</p>
        </Content>
      </div>
    </div>
  );
}

/* STILURI */
const slotsContainerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "20px",
  padding: "20px",
};

const slotStyle = {
  display: "flex",
  flexDirection: "column",
  background: "#fff",
  borderRadius: "10px",
  overflow: "hidden",
  height: "400px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  transition: "box-shadow 0.3s",
};

const imageContainerStyle = {
  flex: 2,
  position: "relative",
  overflow: "hidden",
};

const textContainerStyle = {
  flex: 1,
  padding: "10px",
  textAlign: "center",
  overflow: "hidden",
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
  //position: "relative",
  background: "transparent",
  //backgroundColor: "rgba(0, 0, 0, 0.4)",
  color: "#000",
  border: "none",
  outline: "none",
  cursor: "pointer",
  borderRadius: "50%",
  width: "60px",
  height: "0px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 3,
};

const slotTitleStyle = {
  margin: "5px 0",
  fontSize: "1.2rem",
  color: "#000",
};

const slotDescStyle = {
  margin: 0,
  fontSize: "0.9rem",
  color: "#000",
};

const languageButtonStyle = {
  background: "#56f0b2",
  color: "white",
  border: "none",
  padding: "10px 15px",
  borderRadius: "5px",
  cursor: "pointer",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  fontSize: "16px",
  display: "block",
  width: "100px",
  margin: "5px auto",
};

const dropdownContainerStyle = {
  position: "absolute",
  bottom: "50px",
  right: "0",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export default Home;
