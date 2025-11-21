import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BokningsRuta.css";

const BokningsRuta = ({ listing }) => {
  const navigate = useNavigate();

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guestCounts, setGuestCounts] = useState({
    adults: 2,
    children: 0,
    dogs: 0
  });
  const [isGuestPickerOpen, setGuestPickerOpen] = useState(false);
  const guestPickerRef = useRef(null);

  useEffect(() => {
    if (!isGuestPickerOpen) return undefined;

    const handleClickOutside = (event) => {
      if (guestPickerRef.current && !guestPickerRef.current.contains(event.target)) {
        setGuestPickerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isGuestPickerOpen]);

  const adjustGuests = (field, delta, min) => {
    setGuestCounts((prev) => {
      const nextValue = Math.max(min, prev[field] + delta);
      return {
        ...prev,
        [field]: nextValue
      };
    });
  };

  const humanGuests = guestCounts.adults + guestCounts.children;
  const dogCount = guestCounts.dogs;
  const dogSuffix = dogCount > 0 ? ` · ${dogCount} hund${dogCount > 1 ? "ar" : ""}` : "";
  const guestLabel =
    humanGuests === 0
      ? "Lägg till gäster"
      : `${humanGuests} gäst${humanGuests > 1 ? "er" : ""}${dogSuffix}`;

  const guestConfig = [
    { field: "adults", label: "Vuxna", description: "Från 13 år", min: 1 },
    { field: "children", label: "Barn", description: "Ålder 2–12", min: 0 },
    { field: "dogs", label: "Hundar", description: "Sällskapsdjur", min: 0 }
  ];

  const handleReserve = () => {
    const totalGuests = humanGuests || 1;
    navigate("/booking", {
      state: {
        listing,
        checkIn,
        checkOut,
        guests: totalGuests,
        guestDetails: guestCounts
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

      <div className="guests" ref={guestPickerRef}>
        <label>
          Gäster
          <button
            type="button"
            className={`guest-input-display ${isGuestPickerOpen ? "open" : ""}`}
            onClick={() => setGuestPickerOpen((prev) => !prev)}
          >
            {guestLabel}
            <span className="guest-input-caret">⌄</span>
          </button>
        </label>

        {isGuestPickerOpen && (
          <div className="guest-dropdown">
            {guestConfig.map(({ field, label, description, min }) => (
              <div className="guest-row" key={field}>
                <div className="guest-row-info">
                  <p className="guest-row-label">{label}</p>
                  <span className="guest-row-description">{description}</span>
                </div>
                <div className="guest-counter">
                  <button
                    type="button"
                    onClick={() => adjustGuests(field, -1, min)}
                    disabled={guestCounts[field] === min}
                    aria-label={`Minska ${label.toLowerCase()}`}
                  >
                    -
                  </button>
                  <span>{guestCounts[field]}</span>
                  <button
                    type="button"
                    onClick={() => adjustGuests(field, 1, min)}
                    aria-label={`Öka ${label.toLowerCase()}`}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="guest-dropdown-confirm"
              onClick={() => setGuestPickerOpen(false)}
            >
              Klar
            </button>
          </div>
        )}
      </div>

      <button className="reserve-btn" onClick={handleReserve}>
        Reservera
      </button>
    </div>
  );
};

export default BokningsRuta;
