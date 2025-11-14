import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BoendeInfo from "../components/BoendeInfo";
import BokningsRuta from "../components/BokningsRuta";
import BoendeDetaljer from "../components/BoendeDetaljer";
import BoendeKarta from "../components/BoendeKarta";
import "./BoendeDetailPage.css";

const BoendeDetailPage = () => {
  const { id, ...rest } = useParams(); // hämtar boendets id från URL
  console.log( id, rest)
  const [boende, setBoende] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBoende = async () => {
      try {
        const response = await fetch(`http://localhost:5050/api/boenden/${id}`);
        if (!response.ok) throw new Error("Kunde inte hämta boendet");
        const data = await response.json();
        setBoende(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBoende();
  }, [id]);

  if (loading) return <p>Laddar boende...</p>;
  if (error) return <p>Fel vid hämtning: {error}</p>;
  if (!boende) return <p>Boende hittades inte.</p>;

  return (
    <>
      <div className="boende-detalj-img">
        <img
          src={boende.images?.[0]}
          alt={boende.title}
          className="boende-detail-image"
        />
      </div>

      <div className="boende-detalj">
        <BoendeInfo
          title={boende.title}
          location={boende.location}
          rooms={boende.bedrooms}
          guests={boende.guests}
          rating={boende.rating}
          rules={boende.rules || []}
        />
        <BokningsRuta 
        price={boende.price}
        listing={boende}
        />
      </div>

      <BoendeDetaljer details={boende.details} />
      <BoendeKarta map={boende.map} />
    </>
  );
};

export default BoendeDetailPage;
