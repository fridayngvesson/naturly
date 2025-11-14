import React from "react"
import "./CardOverview.css"
import { Link } from "react-router-dom";


const CardOverview = ({ data, title }) => {
  if (!data || !Array.isArray(data) || data.length === 0) return null;
  console.log(data)
  return (
    <div className="overview-wrapper">
      {title && <h2 className="overview-title">{title}</h2>}

      <div className="overview-grid">
        {data.map((item) => (
         <Link key={item.id} to={`/boende/${item.id}`} className="overview-card">
         <img src={item.image} alt={item.title} className="overview-image" />
         <div className="overview-info">
           <h3>{item.title}</h3>
           {item.description && <p>{item.description}</p>}
           {item.price && <p className="overview-price">{item.price}</p>}
         </div>
       </Link>
        ))}
      </div>
    </div>
  );
};

export default CardOverview;
