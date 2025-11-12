import React from "react";
import StarIcon from "@mui/icons-material/Star";
import "./BoendeInfo.css";

const BoendeInfo = ({ title, location, rooms, guests, rating, rules }) => {
  return (
    <div className="boende-info">
      {/* Titel + favorit */}
      <div className="boende-header">
        <div>
          <h2 className="boende-title">{title}</h2>
          <p className="boende-location">{location}</p>
        </div>
      </div>

      {/* Boende detaljer */}
      <div className="boende-details">
        <p className="boende-meta">{rooms} sovrum • {guests} gäster</p>
        <div className="rating">
          <span className="rating-number">{rating}</span>
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              fontSize="small"
              className={`star-icon ${i < Math.floor(rating) ? "filled" : ""}`}
            />
          ))}
        </div>
      </div>

      {/* Regler */}
      <div className="rules">
        <h3>Regler</h3>
        <ul>
          {rules.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BoendeInfo;
