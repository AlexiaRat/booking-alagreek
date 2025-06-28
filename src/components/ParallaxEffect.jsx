import React, { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import { LanguageContext } from "../context/LanguageContext";

const ParallaxContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: white;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${(props) => props.height}vh;
  background: url("/MissMary/wh2.jpeg") no-repeat center center;
  background-size: cover;
  
  /* Optimizări pentru mobile */
  @media (max-width: 768px) {
    /* Pe mobile, păstrăm înălțimea fixă pentru performanță */
    height: ${(props) => props.isMobile ? '100vh' : props.height + 'vh'};
    /* Dezactivăm tranzițiile pe mobile */
    transition: ${(props) => props.isMobile ? 'none' : 'height 0.2s ease-out'};
    /* Optimizări GPU pentru mobile */
    transform: ${(props) => props.isMobile ? 'translateZ(0)' : 'none'};
    backface-visibility: hidden;
    will-change: ${(props) => props.isMobile ? 'auto' : 'height'};
  }
  
  @media (min-width: 769px) {
    transition: height 0.2s ease-out;
  }
`;

const Title = styled.h1`
  position: absolute;
  top: ${(props) => props.top}px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, ${(props) => props.opacity});
  text-shadow: 2px 2px 10px black;
  font-weight: bold;
  text-align: center;
  padding: 0 20px;
  user-select: none;
  
  /* Font size responsive */
  font-size: clamp(2.5rem, 8vw, 4rem);
  
  @media (max-width: 768px) {
    /* Pe mobile, poziție fixă pentru fluiditate */
    top: ${(props) => props.isMobile ? '50%' : props.top + 'px'};
    transform: ${(props) => props.isMobile ? 'translate(-50%, -50%)' : 'translateX(-50%)'};
    opacity: ${(props) => props.isMobile ? '1' : props.opacity};
    /* Dezactivăm tranzițiile pe mobile */
    transition: ${(props) => props.isMobile ? 'none' : 'top 0.2s ease-out, opacity 0.2s ease-out'};
    font-size: 2.5rem;
  }
  
  @media (min-width: 769px) {
    transition: top 0.2s ease-out, opacity 0.2s ease-out;
    font-size: 4rem;
  }
`;

const titles = {
  ro: "Grecia",
  en: "Greece",
  gr: "Ελλάδα",
};

function ParallaxEffect() {
  const [imageHeight, setImageHeight] = useState(100);
  const [titleTop, setTitleTop] = useState(150);
  const [titleOpacity, setTitleOpacity] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const { language } = useContext(LanguageContext);
  
  useEffect(() => {
    // Detectează device-ul mobile
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768 || 
                    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const handleScroll = () => {
      // Pe mobile, dezactivăm complet parallax-ul
      if (isMobile) return;
      
      const scrollY = window.scrollY;
      const maxScroll = containerRef.current?.clientHeight || 1;
      const scrollRatio = scrollY / maxScroll;
      
      // Calculele pentru parallax doar pe desktop
      const newHeight = Math.max(5, 100 - scrollRatio * 95);
      const newTop = Math.max(10, 150 - scrollRatio * 140);
      const newOpacity = Math.max(0, 1 - scrollRatio * 1.5);
      
      setImageHeight(newHeight);
      setTitleTop(newTop);
      setTitleOpacity(newOpacity);
    };

    // Adăugăm event listener doar dacă nu e mobile
    if (!isMobile) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    } else {
      // Pe mobile, resetăm valorile la default
      setImageHeight(100);
      setTitleTop(150);
      setTitleOpacity(1);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  return (
    <ParallaxContainer ref={containerRef}>
      <BackgroundImage 
        height={imageHeight} 
        isMobile={isMobile}
      />
      <Title 
        top={titleTop} 
        opacity={titleOpacity}
        isMobile={isMobile}
      >
        {titles[language]}
      </Title>
    </ParallaxContainer>
  );
}

export default ParallaxEffect;