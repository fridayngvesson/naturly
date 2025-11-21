import React, { createContext, useContext, useEffect, useMemo, useState } from "react"

const FavoritesContext = createContext(undefined)
const STORAGE_KEY = "naturly:favorites"

const safeParse = (value) => {
    try {
        const parsed = JSON.parse(value)
        return Array.isArray(parsed) ? parsed : []
    } catch {
        return []
    }
}

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        if (typeof window === "undefined") return []
        const stored = window.localStorage.getItem(STORAGE_KEY)
        return stored ? safeParse(stored) : []
    })

    useEffect(() => {
        if (typeof window === "undefined") return
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    }, [favorites])

    const toggleFavorite = (item) => {
        if (!item?.id) return
        setFavorites((prev) => {
            const exists = prev.some((fav) => fav.id === item.id)
            if (exists) {
                return prev.filter((fav) => fav.id !== item.id)
            }
            const normalizedItem = {
                id: item.id,
                title: item.title,
                image: item.image ?? item.images?.[0] ?? "",
                price: item.price,
                description: item.description,
                location: item.location,
                petFriendly: Boolean(item.petFriendly ?? item.dogFriendly),
            }
            return [...prev, normalizedItem]
        })
    }

    const isFavorite = (id) => favorites.some((fav) => fav.id === id)

    const value = useMemo(() => ({
        favorites,
        toggleFavorite,
        isFavorite,
    }), [favorites])

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    )
}

export const useFavorites = () => {
    const context = useContext(FavoritesContext)
    if (context === undefined) {
        throw new Error("useFavorites måste användas inom en FavoritesProvider")
    }
    return context
}

