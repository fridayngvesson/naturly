import React from "react";
import { useLocation } from "react-router-dom";
import "./BookingPage.css"


const BookingPage = () => {
  const { state } = useLocation();

  if (!state) return <p>Ingen bokningsdata...</p>;

  const { listing, price, incheckning, utcheckning, guests } = state;

  return (
    <div className="booking-page">
      <h1>Bekräfta din bokning</h1>

      <div className="booking-listing-info">
        <img src={listing.images[0]} alt={listing.title} />
        <div>
          <h2>{listing.title}</h2>
          <p>{listing.location}</p>
          <p><strong>Pris:</strong> {price} kr / natt</p>
        </div>
      </div>

      <div className="booking-details">
        <p>Incheckning: {incheckning}</p>
        <p>Utcheckning: {utcheckning}</p>
        <p>Gäster: {guests}</p>
      </div>

      <h3>Betalning</h3>
      <div className="payment-options">
        <label><input type="radio" name="payment" /> Kort</label>
        <label><input type="radio" name="payment" /> Swish</label>
        <label><input type="radio" name="payment" /> Faktura</label>
      </div>

      <h3>Dina uppgifter</h3>
      <form className="user-info-form">
        <input type="text" placeholder="Förnamn" required />
        <input type="text" placeholder="Efternamn" required />
        <input type="email" placeholder="E-post" required />
        <input type="text" placeholder="Telefonnummer" required />
      </form>

      <button className="confirm-btn">
        Bekräfta bokning
      </button>
    </div>
  );
};

export default BookingPage;
