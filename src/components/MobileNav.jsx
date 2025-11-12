import React, { useState } from "react"
import { Link } from "react-router-dom"
import './MobileNav.css'

// Importerar MUI ikoner för meny, sök, konto och favoriter
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';


// Huvudkomponenten för mobil navigationsmeny
const MobileNav = ({ showSearch }) => {
    // State som håller koll på om menyn är öppen eller stängd
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <nav className="navbar">
            {/* Wrapper som innehåller logotyp, länkar och menyknapp */}
            <div className="nav-content-wrapper">

                {/* Logotyp som länkar till startsidan */}
                <Link to="/">
                    <img className="logotype" src="/assets/Naturly-vit.svg" alt="Naturly logotype" />
                </Link>

                {/* Två navigationslänkar synliga direkt i navbaren */}
                <Link to="/boende" className="nav-link">
                    Boenden
                </Link>

                <Link to="/upplevelser" className="nav-link">
                    Upplevelser
                </Link>

                {/* Hamburgermenyn — byter ikon beroende på om menyn är öppen */}
                <button
                    className="menu-btn"
                    onClick={() => setMenuOpen(!menuOpen)} // Växlar mellan true/false
                    aria-label="Toggle menu"
                >
                    {menuOpen ? (
                        // När menyn är öppen visas ett "stäng" (X)-ikon
                        <CloseIcon sx={{ fontSize: 30, color: "white" }} />
                    ) : (
                        // När menyn är stängd visas hamburgarikonen
                        <MenuIcon sx={{ fontSize: 30, color: "white" }} />
                    )}
                </button>

                {/* Menyn visas endast när menuOpen är true */}
                {menuOpen && (
                    <ul className="nav-links">
                        {/* Inloggningslänk med ikon */}
                        <li>
                            <AccountCircleOutlinedIcon sx={{ color: "white" }} />
                            <Link to="/login" onClick={() => setMenuOpen(false)}>Logga in</Link>
                        </li>

                        {/* Favoritlänk med ikon */}
                        <li>
                            <FavoriteBorderOutlinedIcon sx={{ color: "white" }} />
                            <Link to="/favoriter" onClick={() => setMenuOpen(false)}>Favoriter</Link>
                        </li>
                    </ul>
                )}
            </div>

            {/* Sökfält under navigationsdelen */}
            {showSearch && (
                <div className="search-bar-wrapper">
                    <div className="search-bar-container">

                        {/* Rund cirkel med sökikon */}
                        <div className="search-icon-wrapper">
                            <SearchIcon sx={{ fontSize: "1rem" }} className="search-icon" />
                        </div>

                        {/* Själva inputfältet för sökning */}
                        <input
                            type="search"
                            placeholder="Påbörja din sökning"
                            className="search-input"
                        />
                    </div>
                </div>
            )}
        </nav>
    )
}

export default MobileNav
