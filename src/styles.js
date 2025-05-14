import styled from "styled-components";

export const Container = styled.div`
  text-align: center;
  width: 100%;
`;

export const ImageOverlay = styled.div`
  background: url("/images/greece.jpg") no-repeat center center/cover;
  height: 30vh; /* Ajustabil pe înălțimea ecranului */
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
`;

export const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 4rem); /* Se ajustează automat */
  color: white;
  text-shadow: 2px 2px 10px black;
`;

export const Description = styled.p`
  margin: 20px;
  font-size: clamp(1rem, 2vw, 1.5rem); /* Se ajustează automat */
`;

export const ParallaxContainer = styled.div`
  height: 100vh;
  background: url("/grecia/download(1).jfif") no-repeat center center/cover;
  background-attachment: scroll; /* Facem ca imaginea să se miște odată cu scroll-ul */
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-shadow: 2px 2px 10px black;
  width: 100%;
  position: relative;
`;


export const Content = styled.div`
  padding: 5vw; /* Înlocuiește padding-ul fix */
  text-align: center;
  font-size: 1.5rem;
  background: white;
  max-width: 1200px;
  margin: auto;
`;

/* MEDIA QUERIES PENTRU MOBILE */
export const ResponsiveContainer = styled.div`
  @media (max-width: 768px) {
    padding: 10px;
    font-size: 1rem;
  }
`;
