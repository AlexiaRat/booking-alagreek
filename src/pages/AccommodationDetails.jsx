import { useParams } from "react-router-dom";

function AccommodationDetails() {
  const { id } = useParams();

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Detalii pentru cazarea {id}</h1>
      <p>Aici va fi un carusel de imagini, un buton de redare audio și un video.</p>
    </div>
  );
}

export default AccommodationDetails;
