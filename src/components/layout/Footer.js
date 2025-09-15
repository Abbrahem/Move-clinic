import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-logo">
                        <img src="/img/Movelogo.jpg" alt="Move Clinic Logo" />
                        <span>Move Clinic</span>
                    </div>
                    <div className="footer-social">
                        <a href="https://wa.me/201065125514" className="social-link">
                            <i className="fab fa-whatsapp"></i>
                        </a>
                        <a href="#" className="social-link">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a href="#" className="social-link">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2025 Move Clinic. جميع الحقوق محفوظة.</p>
                    <a href="https://wa.me/201065125514" className="footer-cta">احجز الآن</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
