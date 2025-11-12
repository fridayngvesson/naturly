// Footer.jsx
import React from "react"
import { Link } from "react-router-dom"
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Kolumn 1 */}
        <div className="footer-column">
          <h3>Om oss</h3>
          <Link to="/om-oss">Om oss</Link>
        </div>

        {/* Kolumn 2 */}
        <div className="footer-column">
          <h3>Hjälp</h3>
          <ul>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/kontakta-oss">Kontakta oss</Link></li>
            <li><Link to="/villkor">Villkor & Integritet</Link></li>
          </ul>
        </div>

        {/* Kolumn 3 */}
        <div className="footer-column">
          <h3>Håll kontakten</h3>
          <div className="newsletter">
            <input type="email" placeholder="Din e-post" />
            <button>Prenumerera</button>
          </div>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FacebookIcon /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><InstagramIcon /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><TwitterIcon /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><LinkedInIcon /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
