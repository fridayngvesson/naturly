import React from "react"
import "./CardSlider.css"

const ExperienceSlider = ({ data, showDescription = true }) => {
  // Simplified validation
  if (!data?.length) {
    return <div>Ingen data hittades</div>;
  }

  return (
    <div className="slider-wrapper">
      <div className="slider-container">
        {data.map((item) => (
          <div key={item.id} className="card">
            <div className="image-wrapper">
              <img src={item.image} alt={item.title} className="card-image" />
            </div>

            <div className="card-info">
              <h3 className="card-title">{item.title}</h3>
              {showDescription && <p className="card-description">{item.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceSlider;