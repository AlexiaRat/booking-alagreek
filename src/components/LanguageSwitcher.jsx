import React, { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

export default function LanguageSwitcher() {
  const { language, showDropdown, setShowDropdown, selectLanguage } =
    useContext(LanguageContext);

  return (
    <div style={{ position: "fixed", bottom: 80, right: 20, zIndex: 1000 }}>
      <button
        onClick={() => setShowDropdown((v) => !v)}
        style={{
          background: "#56f0b2",
          color: "#fff",
          border: "none",
          padding: "10px 15px",
          borderRadius: "5px",
          cursor: "pointer",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        🌍 {language.toUpperCase()} ▲
      </button>
      {showDropdown && (
        <div
          style={{
            position: "absolute",
            bottom: "50px",
            right: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <button onClick={() => selectLanguage("ro")} style={languageBtn}>
            🇷🇴 Română
          </button>
          <button onClick={() => selectLanguage("en")} style={languageBtn}>
            🇬🇧 English
          </button>
          <button onClick={() => selectLanguage("gr")} style={languageBtn}>
            🇬🇷 Ελληνικά
          </button>
        </div>
      )}
    </div>
  );
}

const languageBtn = {
  background: "#56f0b2",
  color: "#fff",
  border: "none",
  padding: "10px 15px",
  borderRadius: "5px",
  cursor: "pointer",
  margin: "5px 0",
  width: "100px",
};
