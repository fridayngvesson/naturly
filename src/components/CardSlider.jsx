import React from "react"
import "./CardSlider.css"

const CardSlider = ({
  data,
  title,
  showPrice = true,
  showDescription = false,
}) => {
  // Förhindra att en tom sektion renderas
  if (!data || !Array.isArray(data) || data.length === 0) return null;

  return (
    <div className="slider-wrapper">
      {title && <h2 className="slider-title">{title}</h2>}

      <div className="slider-container">
        {data.map((item) => (
          <div key={item.id} className="card">
            <div className="image-wrapper">
              <img src={item.image} alt={item.title || ""} className="card-image" />
            </div>

            <div className="card-info">
              <h3 className="card-title">{item.title}</h3>
              {showDescription && item.description && (
                <p className="card-description">{item.description}</p>
              )}
      
              {showPrice && item.price && <p className="price">{item.price}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSlider;




