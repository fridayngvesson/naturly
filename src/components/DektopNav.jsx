import React, { useState } from "react"
import { Link } from "react-router-dom"
import './DesktopNav.css'
import SearchIcon from '@mui/icons-material/Search'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'


// Huvudkomponenten för mobil navigationsmeny
const DesktopNav = () => {
    
    return (
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

                        {/* Rund cirkel med sökikon */}
                        <div className="search-icon-wrapper-desktop">
                            <SearchIcon sx={{ fontSize: "1rem" }} className="search-icon" />
                        </div>

                        {/* Själva inputfältet för sökning */}
                        <input
                            type="search"
                            placeholder="Påbörja din sökning"
                            className="search-input"
                        />
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
    )
}

export default DesktopNav
