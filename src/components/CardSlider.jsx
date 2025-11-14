import React from "react";
import { Link } from "react-router-dom";
import "./CardSlider.css";

const CardSlider = ({
  data,
  title,
  showPrice = true,
  showDescription = false,
}) => {
  if (!data || !Array.isArray(data) || data.length === 0) return null;
  console.log(data)
  return (
    <div className="slider-wrapper">
      {title && <h2 className="slider-title">{title}</h2>}

      <div className="slider-container">
        {data.map((item) => (
          <Link 
            key={item.id} 
            to={`/boende/${item.id}`} 
            className="card"
          >
            <div className="image-wrapper">
              <img 
                src={item.image} 
                alt={item.title || ""} 
                className="card-image" 
              />
            </div>

            <div className="card-info">
              <h3 className="card-title">{item.title}</h3>
              
              {showDescription && item.description && (
                <p className="card-description">{item.description}</p>
              )}
      
              {showPrice && item.price && (
                <p className="price">{item.price} kr / natt</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CardSlider;



