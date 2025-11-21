import React from "react"
import "./CardOverview.css"
import { Link } from "react-router-dom"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import FavoriteIcon from "@mui/icons-material/Favorite"
import PetsIcon from "@mui/icons-material/Pets"
import { useFavorites } from "../context/FavoritesContext"

const CardOverview = ({ data, title }) => {
  const { toggleFavorite, isFavorite } = useFavorites()

  if (!data || !Array.isArray(data) || data.length === 0) return null

  const handleFavoriteClick = (event, item) => {
    event.preventDefault()
    event.stopPropagation()
    toggleFavorite(item)
  }

  const renderPetIcon = (isPetFriendly) => {
    if (!isPetFriendly) return null
    return (
      <span className="pet-badge" aria-label="Husdjur välkomna">
        <PetsIcon fontSize="small" />
      </span>
    )
  }

  return (
    <div className="overview-wrapper">
      {title && <h2 className="overview-title">{title}</h2>}

      <div className="overview-grid">
        {data.map((item) => {
          const petFriendly = Boolean(item.petFriendly ?? item.dogFriendly)
          const favorite = isFavorite(item.id)

          return (
            <Link key={item.id} to={`/boende/${item.id}`} className="overview-card">
              <div className="overview-image-wrapper">
                <img src={item.image} alt={item.title} className="overview-image" />
                <button
                  type="button"
                  className={`overview-favorite-btn ${favorite ? "overview-favorite-btn--active" : ""}`}
                  aria-label={favorite ? "Ta bort från favoriter" : "Lägg till i favoriter"}
                  onClick={(event) => handleFavoriteClick(event, item)}
                >
                  {favorite ? <FavoriteIcon htmlColor="#ff385c" /> : <FavoriteBorderIcon htmlColor="#fff" />}
                </button>
              </div>

              <div className="overview-info">
                <div className="overview-title-row">
                  <h3>{item.title}</h3>
                  {renderPetIcon(petFriendly)}
                </div>
                {item.description && <p>{item.description}</p>}
                {item.price && <p className="overview-price">{item.price}</p>}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default CardOverview
