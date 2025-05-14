import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const ParallaxContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: white; /* Setează fundalul alb */
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${(props) => props.height}vh;
  background: url("/grecia/santorini2.jpg") no-repeat center center;
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

function ParallaxEffect() {
  const [imageHeight, setImageHeight] = useState(100);
  const [titleTop, setTitleTop] = useState(50);
  const [titleOpacity, setTitleOpacity] = useState(1);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      let scrollY = window.scrollY;
      let maxScroll = containerRef.current.clientHeight; // Obține înălțimea efectivă a containerului

      let newHeight = Math.max(5, 100 - (scrollY / maxScroll) * 95);
      let newTop = Math.max(10, 50 - (scrollY / maxScroll) * 40);
      let newOpacity = Math.max(0, 1 - scrollY / maxScroll);

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
      <Title top={titleTop} opacity={titleOpacity}>Grecia</Title>
    </ParallaxContainer>
  );
}

export default ParallaxEffect;
