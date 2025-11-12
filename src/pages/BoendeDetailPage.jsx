import React from "react";
import BoendeInfo from "../components/BoendeInfo";
import BokningsRuta from "../components/BokningsRuta";
import "./BoendeDetailPage.css";
import { useParams } from "react-router-dom";
import { boenden } from "../data/boenden";
import BoendeDetaljer from "../components/BoendeDetaljer";
import BoendeKarta from "../components/BoendeKarta";

const BoendeDetailPage = () => {
  const { id } = useParams(); // hämtar t.ex. "2" från /boende/2
  const boende = boenden.find((b) => b.id === Number(id));

  if (!boende) return <p>Boende hittades inte.</p>;

  return (
    <>
    <div className="boende-detalj-img">

    <img src={boende.image} alt={boende.title} className="boende-detail-image" />

    </div>
    <div className="boende-detalj">

      <BoendeInfo
        title={boende.title}
        location={boende.location}
        rooms={3}
        guests={6}
        rating={4.5}
        rules={[
          "Incheckning efter 15:00",
          "Utcheckning före 11:00",
          "Inga husdjur tillåtna",
          "Rökfritt",
          "Ingen fest",
          "Tyst efter 22:00",
        ]}
      />

      <BokningsRuta />
      
    </div>
    <BoendeDetaljer />
    <BoendeKarta  />
    </>
  );
};

export default BoendeDetailPage;
