import React from "react";
import "./BokningsRuta.css";

const BokningsRuta = () => {
  return (
    <div className="bokningsruta">
      <h3>Bokning</h3>

      <div className="dates">
        <label>
          Incheckning
          <input type="date" />
        </label>
        <label>
          Utcheckning
          <input type="date" />
        </label>
      </div>

      <div className="guests">
        <label>
          Gäster
          <select>
            <option>1 gäst</option>
            <option>2 gäster</option>
            <option>3 gäster</option>
            <option>4 gäster</option>
            <option>5 gäster</option>
          </select>
        </label>
      </div>

      <div className="price-details">
        <p><strong>Pris per natt:</strong> 1 550 kr</p>
        <p>Vuxna: 2</p>
        <p>Barn: 1</p>
        <p>Hund: 0</p>
      </div>

      <button className="reserve-btn">Reservera</button>
    </div>
  );
};

export default BokningsRuta;
