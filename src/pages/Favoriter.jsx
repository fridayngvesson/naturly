import React from "react"
import CardOverview from "../components/CardOverview"
import { useFavorites } from "../context/FavoritesContext"

const Favoriter = () => {
  const { favorites } = useFavorites()

  return (
    <div className="favorites-page">
      <h1>Favoriter</h1>
      {favorites.length === 0 ? (
        <p>Du har inga favoriter ännu. Hitta ett boende och klicka på hjärtat!</p>
      ) : (
        <CardOverview data={favorites} />
      )}
    </div>
  )
}

export default Favoriter