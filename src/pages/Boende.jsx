import React, { useEffect, useState } from "react";
import CardOverview from "../components/CardOverview";

const Boende = () => {
  const [boenden, setBoenden] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBoenden = async () => {
      try {
        const response = await fetch("http://localhost:5050/api/boenden");
        if (!response.ok) throw new Error("Fel vid hämtning av boenden");
        const data = await response.json();
        setBoenden(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBoenden();
  }, []);

  if (loading) return <p>Laddar boenden...</p>;
  if (error) return <p>Fel vid hämtning: {error}</p>;

  return <CardOverview
    title="Alla boenden"
    data={boenden.map((b) => ({
      id: b._id,
      title: b.title,
      image: b.images[0], 
      price: `${b.price} kr/per natt`,
      description: b.details,
    }))}
  />;
};

export default Boende;
