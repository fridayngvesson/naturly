import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import './DesktopNav.css'
import SearchIcon from '@mui/icons-material/Search'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import NavModal from "./NavModal"

const DesktopNav = () => {
    const navigate = useNavigate()
    const [activeModal, setActiveModal] = useState(null)
    const [destination, setDestination] = useState("")
    const [dates, setDates] = useState({ checkIn: "", checkOut: "" })
    const [guests, setGuests] = useState({ adults: 2, children: 0, dogs: 0 })

    const openModal = (type) => {
        setActiveModal(type)
    }

    const closeModal = () => {
        setActiveModal(null)
    }

    const formatDate = (value) => {
        if (!value) return "Lägg till datum"
        const date = new Date(value)
        if (Number.isNaN(date.getTime())) return "Lägg till datum"
        return date.toLocaleDateString("sv-SE", {
            day: "numeric",
            month: "short"
        })
    }

    const updateGuestCount = (field, delta, min = 0) => {
        setGuests((prevGuests) => {
            const currentValue = prevGuests[field] ?? min
            return {
                ...prevGuests,
                [field]: Math.max(min, currentValue + delta)
            }
        })
    }

    const renderGuestRow = (label, description, field, min) => (
        <div className="guest-row" key={field}>
            <div>
                <p className="guest-row-title">{label}</p>
                <span className="guest-row-description">{description}</span>
            </div>
            <div className="guest-row-controls">
                <button
                    type="button"
                    className="guest-counter-button"
                    onClick={() => updateGuestCount(field, -1, min)}
                    disabled={(guests[field] ?? min) === min}
                >
                    -
                </button>
                <span className="guest-counter-value">{guests[field] ?? min}</span>
                <button
                    type="button"
                    className="guest-counter-button"
                    onClick={() => updateGuestCount(field, 1, min)}
                >
                    +
                </button>
            </div>
        </div>
    )

    const renderActiveModal = () => {
        if (!activeModal) return null

        const sharedProps = {
            isOpen: Boolean(activeModal),
            onClose: closeModal
        }

        switch (activeModal) {
            case "destination":
                return (
                    <NavModal title="Välj destination" {...sharedProps}>
                        <label className="nav-modal-label" htmlFor="destination-input">Vart vill du åka?</label>
                        <input
                            id="destination-input"
                            className="nav-modal-input"
                            type="text"
                            placeholder="Sök efter destination"
                            value={destination}
                            onChange={(event) => setDestination(event.target.value)}
                        />
                    </NavModal>
                )
            case "checkIn":
                return (
                    <NavModal title="Välj incheckning" {...sharedProps}>
                        <p className="nav-modal-description">Välj datum för incheckning.</p>
                        <input
                            className="nav-modal-input"
                            type="date"
                            value={dates.checkIn}
                            onChange={(event) => setDates((prevDates) => ({ ...prevDates, checkIn: event.target.value }))}
                        />
                    </NavModal>
                )
            case "checkOut":
                return (
                    <NavModal title="Välj utcheckning" {...sharedProps}>
                        <p className="nav-modal-description">Välj datum för utcheckning.</p>
                        <input
                            className="nav-modal-input"
                            type="date"
                            value={dates.checkOut}
                            onChange={(event) => setDates((prevDates) => ({ ...prevDates, checkOut: event.target.value }))}
                        />
                    </NavModal>
                )
            case "guests":
                return (
                    <NavModal title="Hur många gäster?" {...sharedProps}>
                        {renderGuestRow("Vuxna", "Från 13 år", "adults", 2)}
                        {renderGuestRow("Barn", "2–12 år", "children", 0)}
                        {renderGuestRow("Hundar", "Sällskapsdjur", "dogs", 0)}
                    </NavModal>
                )
            default:
                return null
        }
    }

    const humanGuests = guests.adults + guests.children
    const dogSummary = guests.dogs > 0 ? ` · ${guests.dogs} hund${guests.dogs > 1 ? "ar" : ""}` : ""

    const handleSearch = () => {
        const trimmedDestination = destination.trim()
        if (!trimmedDestination) {
            openModal("destination")
            return
        }

        const params = new URLSearchParams()
        params.set("destination", trimmedDestination)
        if (guests.dogs > 0) {
            params.set("dogs", String(guests.dogs))
        }

        navigate(`/boende?${params.toString()}`)
        closeModal()
    }

    return (
        <>
            <nav className="navbar-desktop">
                {/* Wrapper som innehåller logotyp, länkar */}
                <div className="nav-link-wrapper-desktop">
                    {/* Två navigationslänkar synliga direkt i navbaren */}
                    <Link to="/boende" className="nav-link-desktop">
                        Boenden
                    </Link>

                    <Link to="/upplevelser" className="nav-link-desktop">
                        Upplevelser
                    </Link>
                </div>

                <div className="nav-content-wrapper">
                    {/* Logotyp som länkar till startsidan */}
                    <Link to="/">
                        <img className="logotype-desktop" src="/assets/Naturly-vit.svg" alt="Naturly logotype" />
                    </Link>
                    <div className="search-bar-container-desktop">
                      

                        {/* VAR */}
                        <div className="search-item" onClick={() => openModal("destination")}>
                            <span className="search-label">Var</span>
                            <span className="search-value">{destination || "Lägg till plats"}</span>
                        </div>

                        {/* CHECK IN */}
                        <div className="search-item" onClick={() => openModal("checkIn")}>
                            <span className="search-label">Checka in</span>
                            <span className="search-value">{formatDate(dates.checkIn)}</span>
                        </div>

                        {/* CHECK OUT */}
                        <div className="search-item" onClick={() => openModal("checkOut")}>
                            <span className="search-label">Checka ut</span>
                            <span className="search-value">{formatDate(dates.checkOut)}</span>
                        </div>

                        {/* VEM */}
                        <div className="search-item" onClick={() => openModal("guests")}>
                            <span className="search-label">Vem</span>
                            <span className="search-value">
                                {humanGuests > 0
                                    ? `${humanGuests} gäster${dogSummary}`
                                    : guests.dogs > 0
                                        ? `${guests.dogs} hund${guests.dogs > 1 ? "ar" : ""}`
                                        : "Lägg till gäster"}
                            </span>
                        </div>

                        <button type="button" className="search-submit-button" onClick={handleSearch}>
                            <SearchIcon sx={{ fontSize: "1rem" }} />
                        </button>
                    </div>

                    {/* Favoritlänk med ikon */}
                    <div className="favorite-link">
                        <FavoriteBorderOutlinedIcon sx={{ fontSize: 30, color: "white" }} />
                        <Link to="/favoriter">Favoriter</Link>
                    </div>

                    {/* LogIn */}
                    <div>
                        <Link to="/login"><AccountCircleOutlinedIcon sx={{ fontSize: 50, color: "white" }} /></Link>
                    </div>
                </div>
            </nav>
            {renderActiveModal()}
        </>
    )
}

export default DesktopNav
