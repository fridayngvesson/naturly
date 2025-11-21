import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./BookingPage.css";

const BookingPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <p>Ingen bokningsdata...</p>;

  const { listing, checkIn, checkOut, guests, guestDetails } = state;
  const dogGuests = guestDetails?.dogs ?? 0;
  const guestSummary =
    dogGuests > 0
      ? `${guests} gäster · ${dogGuests} hund${dogGuests > 1 ? "ar" : ""}`
      : `${guests} gäster`;

  const nights =
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
    (1000 * 60 * 60 * 24);

  const pricePerNight = listing.price;
  const totalPrice = nights * pricePerNight;

  const [paymentMethod, setPaymentMethod] = useState("");

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!paymentMethod) {
      alert("Välj en betalningsmetod");
      return;
    }
    // Skickar vidare till bekräftelsesida
    navigate("/confirmation", {
      state: { listing, checkIn, checkOut, guests, totalPrice, paymentMethod },
    });
  };

  return (
    <div className="booking-page">
      <h1 className="rubrik">Betalningsöversikt</h1>
      <div className="booking-container">

        {/* LEFT COLUMN */}
        <div className="left-column">
          <div className="listing-info">
            <img src={listing.images[0]} alt={listing.title} className="listing-img" />
            <div className="listing-text">
              <h2>{listing.title}</h2>
              <p>{listing.rating} ⭐</p>
              <div className="date-row">
                <p>{checkIn} — {checkOut}</p>
                <button className="edit-btn" onClick={() => navigate(-1)}>Ändra</button>
              </div>
              <p>{guestSummary}</p>
            </div>
          </div>

          <div className="price-info">
            <p>{nights} nätter</p>
            <p>{pricePerNight} kr / natt</p>
            <hr />
            <div className="total-row">
              <p>Totalt att betala</p>
              <h3>{totalPrice} kr</h3>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="right-column">
          <h3>Betalningsalternativ</h3>
          <div className="payment-options">
            <label>
              <input
                type="radio"
                name="payment"
                value="Kort"
                checked={paymentMethod === "Kort"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              /> Kortbetalning
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="Swish"
                checked={paymentMethod === "Swish"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              /> Swish
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="Faktura"
                checked={paymentMethod === "Faktura"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              /> Faktura
            </label>
          </div>

          {paymentMethod === "Kort" && (
            <div className="card-info">
              <input type="text" placeholder="Kortnummer" />
              <input type="text" placeholder="MM/ÅÅ" />
              <input type="text" placeholder="CVC" />
            </div>
          )}

          {paymentMethod === "Swish" && (
            <div className="swish-info">
              <p>Öppna Swish på din telefon och scanna QR-koden (simulerad)</p>
            </div>
          )}

          {paymentMethod === "Faktura" && (
            <div className="invoice-info">
              <p>Faktura skickas till din e-post efter bokning</p>
            </div>
          )}

          <h3>Dina uppgifter</h3>
          <form className="user-info-form" onSubmit={handleConfirm}>
            <input type="email" placeholder="E-post" required />
            <input type="text" placeholder="Adress" required />
            <input type="text" placeholder="Telefonnummer" required />
            <button className="confirm-btn" type="submit">
              Boka och betala
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
