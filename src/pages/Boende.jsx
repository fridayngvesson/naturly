import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import CardOverview from "../components/CardOverview";

const Boende = () => {
  const [boenden, setBoenden] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const destinationFilter = searchParams.get("destination")?.trim() ?? "";

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

  const filteredBoenden = useMemo(() => {
    if (!destinationFilter) return boenden;
    const normalizedDestination = destinationFilter.toLowerCase();
    return boenden.filter((boende) =>
      boende.location?.toLowerCase().includes(normalizedDestination)
    );
  }, [boenden, destinationFilter]);

  const title = destinationFilter
    ? `Boenden i ${destinationFilter}`
    : "Alla boenden";

  if (loading) return <p>Laddar boenden...</p>;
  if (error) return <p>Fel vid hämtning: {error}</p>;
  if (!filteredBoenden.length) return <p>Inga boenden hittades i {destinationFilter}.</p>;

  return (
    <CardOverview
      title={title}
      data={filteredBoenden.map((b) => ({
        id: b._id,
        title: b.title,
        image: b.images?.[0],
        price: `${b.price} kr/per natt`,
        description: b.details,
        location: b.location,
        petFriendly: b.petFriendly ?? b.dogFriendly ?? false,
      }))}
    />
  );
};

export default Boende;
