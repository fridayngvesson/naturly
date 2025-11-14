import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BokningsRuta.css";

const BokningsRuta = ({ listing }) => {
  const navigate = useNavigate();

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const handleReserve = () => {
    navigate("/booking", {
      state: {
        checkIn,
        checkOut,
        guests,
        listing, // skicka med boendet
      },
    });
  };

  return (
    <div className="bokningsruta">
      <h3>Bokning</h3>

      <div className="dates">
        <label>
          Incheckning
          <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
        </label>

        <label>
          Utcheckning
          <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
        </label>
      </div>

      <div className="guests">
        <label>
          Gäster
          <select value={guests} onChange={(e) => setGuests(e.target.value)}>
            <option value="1">1 gäst</option>
            <option value="2">2 gäster</option>
            <option value="3">3 gäster</option>
            <option value="4">4 gäster</option>
            <option value="5">5 gäster</option>
          </select>
        </label>
      </div>

      <button className="reserve-btn" onClick={handleReserve}>
        Reservera
      </button>
    </div>
  );
};

export default BokningsRuta;
