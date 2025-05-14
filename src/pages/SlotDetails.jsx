// src/pages/SlotDetails.jsx
import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";
import accommodations from "../data/accommodations.json";
import boats from "../data/boats.json";
import excursions from "../data/excursions.json";
import { ArrowLeft, ArrowRight } from "../components/Arrows";

function SlotDetails() {
  const { category, id } = useParams();
  const { language } = useContext(LanguageContext);

  // Select data by category
  let data = [];
  switch (category) {
    case "cazare":
      data = accommodations;
      break;
    case "barci":
      data = boats;
      break;
    case "excursii":
      data = excursions;
      break;
    default:
      data = [];
  }

  const item = data.find((d) => d.id === parseInt(id, 10));
  if (!item) {
    return (
      <div style={containerStyle}>
        <h1 style={titleStyle}>Item not found</h1>
        <p style={descriptionStyle}>No details available for this slot.</p>
      </div>
    );
  }

  // Localized name & description
  const localizedName =
    typeof item.name === 'object' ? item.name[language] || item.name['ro'] : item.name;
  const localizedDescription =
    typeof item.description === 'object'
      ? item.description[language] || item.description['ro']
      : item.description;

  // Banner carousel
  const [imageIndex, setImageIndex] = useState(0);
  const shuffleBanner = (dir) => {
    const last = item.images.length - 1;
    setImageIndex((prev) => (dir === 'left' ? (prev === 0 ? last : prev - 1) : (prev === last ? 0 : prev + 1)));
  };

  // Gallery modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const openModal = (i) => { setModalIndex(i); setModalOpen(true); };
  const closeModal = () => setModalOpen(false);
  const shuffleModal = (dir) => {
    const last = item.images.length - 1;
    setModalIndex((prev) => (dir === 'left' ? (prev === 0 ? last : prev - 1) : (prev === last ? 0 : prev + 1)));
  };

  const thumbs = item.images.slice(0, 3);
  const hasMore = item.images.length > 3;

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>{localizedName}</h1>

      {/* Banner with arrows */}
      <div style={bannerWrapperStyle}>
        <img src={item.images[imageIndex]} alt={localizedName} style={bannerImageStyle} />
        <div style={arrowContainerStyle}>
          <button onClick={() => shuffleBanner('left')} style={arrowButtonStyle}>
            <ArrowLeft size={24} color="#fff" />
          </button>
          <button onClick={() => shuffleBanner('right')} style={arrowButtonStyle}>
            <ArrowRight size={24} color="#fff" />
          </button>
        </div>
      </div>

      {/* Thumbnails */}
      <h2 style={subtitleStyle}>{textsByLang[language].galleryTitle}</h2>
      <div style={galleryContainerStyle}>
        {thumbs.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`${localizedName} ${idx+1}`}
            style={galleryImageStyle}
            onClick={() => openModal(idx)}
          />
        ))}
        {hasMore && <div style={plusStyle} onClick={() => openModal(3)}>+{item.images.length - 3}</div>}
      </div>

      {/* Description */}
      <div style={descriptionContainerStyle}>
        <h2 style={subtitleStyle}>{textsByLang[language].descriptionTitle}</h2>
        <p style={descriptionStyle}>{localizedDescription}</p>
      </div>

      {/* Modal */}
      {modalOpen && (
  <div style={modalOverlayStyle} onClick={closeModal}>
    {/* X-ul */}
    <button style={modalCloseButtonStyle} onClick={closeModal}>X</button>

    {/* imagine + săgeți container */}
    <div
      style={{
        ...bannerWrapperStyle,
        maxWidth: '80%',
        maxHeight: '80vh',    // nu lăsa imaginea să depășească 80% din înălțimea viewport-ului
        margin: '0 auto',
        overflow: 'hidden',   // ascunde orice depășire
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onClick={(e) => e.stopPropagation()}
    >
      
      <img
        src={item.images[modalIndex]}
        alt="modal"
        style={modalImageStyle}
      />
      <div style={arrowContainerStyle}>
        <button onClick={() => shuffleModal('left')} style={arrowButtonStyle}>
          <ArrowLeft size={24} color="#fff" />
        </button>
        <button onClick={() => shuffleModal('right')} style={arrowButtonStyle}>
          <ArrowRight size={24} color="#fff" />
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

// Multilingual labels
const textsByLang = {
  ro: { galleryTitle: 'Galerie', descriptionTitle: 'Descriere' },
  en: { galleryTitle: 'Gallery', descriptionTitle: 'Description' },
  gr: { galleryTitle: 'Γκαλερί', descriptionTitle: 'Περιγραφή' }
};

// Styles
const containerStyle = { maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' };
const titleStyle = { fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '30px', color: '#000' };
const bannerWrapperStyle = {
  position: 'relative',
  width: '100%',
  maxWidth: '800px',
  margin: '0 auto 30px',
};
const bannerImageStyle = { width: '100%', maxWidth: '800px', borderRadius: '10px' };
const arrowContainerStyle = { position: 'absolute', top: '50%', left: 0, right: 0, display: 'flex', justifyContent: 'space-between', transform: 'translateY(-50%)', padding: '0 10px', pointerEvents: 'none' };
const arrowButtonStyle = { pointerEvents: 'auto', background: 'transparent', border: 'none', cursor: 'pointer', padding: '0 8px' };
const subtitleStyle = { fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', margin: '20px 0', color: '#000' };
const galleryContainerStyle = { display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '30px' };
const galleryImageStyle = { width: '150px', height: '100px', objectFit: 'cover', borderRadius: '5px', cursor: 'pointer' };
const plusStyle = { width: '150px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', color: '#fff', fontSize: '1.2rem', borderRadius: '5px', cursor: 'pointer' };
const descriptionContainerStyle = { background: '#f5f5f5', padding: '20px', borderRadius: '10px', marginBottom: '30px' };
const descriptionStyle = { fontSize: '1rem', lineHeight: 1.6, color: '#000' };
const modalOverlayStyle = { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 };
const modalContentStyle = { position: 'relative', display: 'flex', alignItems: 'center', gap: '20px' };
const modalImageStyle = { maxWidth: '80%', maxHeight: '80%', borderRadius: '10px' };
const modalCloseButtonStyle = { position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' };

export default SlotDetails;
