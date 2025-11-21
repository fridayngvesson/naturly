import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ConfirmationPage.css";

const ConfirmationPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <p>Ingen bokningsdata...</p>;

  const { listing, checkIn, checkOut, guests, totalPrice, paymentMethod } = state;

  return (
    <div className="confirmation-page">
      <h1>Bokning bekräftad!</h1>
      <p>Tack för din bokning.</p>

      <div className="confirmation-info">
        <img src={listing.images[0]} alt={listing.title} />
        <div>
          <h2>{listing.title}</h2>
          <p>{guests} gäster</p>
          <p>{checkIn} — {checkOut}</p>
          <p>Betalningsmetod: {paymentMethod}</p>
          <h3>Total: {totalPrice} kr</h3>
        </div>
      </div>

      <button className="nav-back-btn" onClick={() => navigate("/")}>Tillbaka till startsidan</button>
    </div>
  );
};

export default ConfirmationPage;
