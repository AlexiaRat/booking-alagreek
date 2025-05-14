import React, { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

export default function Contact() {
  const { language } = useContext(LanguageContext);
  const texts = {
    ro: { title: "Contact", description: "Ne poți scrie la adresa contact@exemplu.com" },
    en: { title: "Contact", description: "You can reach us at contact@example.com" },
    gr: { title: "Επικοινωνία", description: "Μπορείτε να μας γράψετε στο contact@example.com" },
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>{texts[language].title}</h1>
      <p>{texts[language].description}</p>
    </div>
  );
}