import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="navbar" id="navbar">
            <div className="nav-container">
                <div className="nav-logo">
                    <img src="/img/Movelogo.jpg" alt="Move Clinic Logo" className="logo-img" />
                    <span className="logo-text">Move</span>
                </div>
                <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`} id="nav-menu">
                    <li className="nav-item">
                        <a href="#home" className="nav-link" onClick={closeMenu}>Home</a>
                    </li>
                    <li className="nav-item">
                        <a href="#about" className="nav-link" onClick={closeMenu}>About</a>
                    </li>
                    <li className="nav-item">
                        <a href="#services" className="nav-link" onClick={closeMenu}>Services</a>
                    </li>
                    <li className="nav-item">
                        <a href="#videos" className="nav-link" onClick={closeMenu}>Videos</a>
                    </li>
                    <li className="nav-item">
                        <a href="#testimonials" className="nav-link" onClick={closeMenu}>Testimonials</a>
                    </li>
                    <li className="nav-item">
                        <a href="#contact" className="nav-link" onClick={closeMenu}>Contact</a>
                    </li>
                    <li className="nav-item">
                        <Link to="/admin/login" className="nav-link admin-link" onClick={closeMenu}>
                            <i className="fas fa-user-shield"></i> Admin
                        </Link>
                    </li>
                </ul>
                <a href="https://wa.me/201065125514" className="cta-btn nav-cta">احجز جلستك</a>
                <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} id="hamburger" onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
