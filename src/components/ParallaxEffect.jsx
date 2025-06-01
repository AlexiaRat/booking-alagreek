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
  transition: height 0.2s ease-out;
`;

const Title = styled.h1`
  position: absolute;
  top: ${(props) => props.top}px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 4rem;
  color: rgba(255, 255, 255, ${(props) => props.opacity});
  text-shadow: 2px 2px 10px black;
  transition: top 0.2s ease-out, opacity 0.2s ease-out;
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
  const containerRef = useRef(null);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = containerRef.current.clientHeight;
      const newHeight = Math.max(5, 100 - (scrollY / maxScroll) * 95);
      const newTop = Math.max(10, 50 - (scrollY / maxScroll) * 40);
      const newOpacity = Math.max(0, 1 - scrollY / maxScroll);
      setImageHeight(newHeight);
      setTitleTop(newTop);
      setTitleOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ParallaxContainer ref={containerRef}>
      <BackgroundImage height={imageHeight} />
      <Title top={titleTop} opacity={titleOpacity}>
        {titles[language]}
      </Title>
    </ParallaxContainer>
  );
}

export default ParallaxEffect;
