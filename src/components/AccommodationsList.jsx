// src/pages/AccommodationsList.jsx
import { Link } from "react-router-dom";
import accommodations from "../data/accommodations.json";

function AccommodationsList() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
        padding: "20px",
      }}
    >
      {accommodations.map((place) => (
        <Link key={place.id} to={`/accommodation/${place.id}`}>
          {/* Afișăm prima imagine din array-ul images */}
          <img
            src={place.images[0]}
            alt={place.name}
            style={{ width: "100%", height: "200px", objectFit: "cover" }}
          />
          <h3>{place.name}</h3>
        </Link>
      ))}
    </div>
  );
}

export default AccommodationsList;
