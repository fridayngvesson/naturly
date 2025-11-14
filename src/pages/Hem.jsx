import React, { useEffect, useState } from "react";
import CardSlider from "../components/CardSlider";
import CardArticles from "../components/CardArticles";
import ExperienceSlider from "../components/ExperienceSlider";
// import { boenden } from "../data/boenden";  <- tar bort statisk import
import { upplevelser } from "../data/upplevelser";
import "./Hem.css";

const Hem = () => {
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

  const hundvanliga = boenden.filter((b) => b.petFriendly); // ändra till petFriendly om det är samma fält som backend

  if (loading) return <p>Laddar boenden...</p>;
  if (error) return <p>Fel vid hämtning: {error}</p>;

  return (
    <div className="home-container">
      <section className="slider-section">
        <h2 className="section-title">Upptäck våra boenden</h2>
        <CardSlider
          data={boenden.map((b) => ({
            id: b._id,
            title: b.title,
            image: b.images[0],
            price: `${b.price} kr/per natt`,
            description: b.details,
          }))}
        />
      </section>

      <section className="slider-section">
        <h2 className="section-title">Hundvänliga boenden</h2>
        <CardSlider
          data={hundvanliga.map((b) => ({
            id: b._id,
            title: b.title,
            image: b.images[0],
            price: `${b.price} kr/per natt`,
            description: b.details,
          }))}
        />
      </section>

      <section className="slider-section">
        <h2 className="section-title">Upptäck våra upplevelser</h2>
        <ExperienceSlider data={upplevelser} showDescription={true} />
      </section>

      <section>
        <h2 className="section-title">Artiklar</h2>
        <CardArticles />
      </section>
    </div>
  );
};

export default Hem;

