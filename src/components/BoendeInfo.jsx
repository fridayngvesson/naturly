import React from "react"
import StarIcon from "@mui/icons-material/Star"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import FavoriteIcon from "@mui/icons-material/Favorite"
import PetsIcon from "@mui/icons-material/Pets"
import "./BoendeInfo.css"
import { useFavorites } from "../context/FavoritesContext"

const BoendeInfo = ({
  id,
  title,
  location,
  rooms,
  guests,
  rating,
  rules,
  price,
  image,
  petFriendly,
}) => {
  const { toggleFavorite, isFavorite } = useFavorites()
  const priceLabel = typeof price === "number" ? `${price} kr/per natt` : price
  const favorite = isFavorite(id)

  const handleFavoriteClick = () => {
    toggleFavorite({
      id,
      title,
      location,
      price: priceLabel,
      image,
      petFriendly,
    })
  }

  return (
    <div className="boende-info">
      {/* Titel + favorit */}
      <div className="boende-header">
        <div>
          <h2 className="boende-title">{title}</h2>
          <p className="boende-location">
            {location}
            {petFriendly && (
              <span className="pet-inline-badge" aria-label="Husdjur välkomna">
                <PetsIcon fontSize="small" />
                Husdjur välkomna
              </span>
            )}
          </p>
        </div>
        <button
          type="button"
          className={`boende-favorite-btn ${favorite ? "boende-favorite-btn--active" : ""}`}
          aria-label={favorite ? "Ta bort från favoriter" : "Lägg till i favoriter"}
          onClick={handleFavoriteClick}
        >
          {favorite ? <FavoriteIcon htmlColor="#ff385c" /> : <FavoriteBorderIcon />}
        </button>
      </div>

      {/* Boende detaljer */}
      <div className="boende-details">
        <p className="boende-meta">{rooms} sovrum • {guests} gäster</p>
        <div className="rating">
          <span className="rating-number">{rating}</span>
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              fontSize="small"
              className={`star-icon ${i < Math.floor(rating) ? "filled" : ""}`}
            />
          ))}
        </div>
      </div>

      {/* Regler */}
      <div className="rules">
        <h3>Regler</h3>
        <ul>
          {rules.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default BoendeInfo
