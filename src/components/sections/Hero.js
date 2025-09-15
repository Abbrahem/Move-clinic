import React from 'react';

const Hero = () => {
    return (
        <section id="home" className="hero">
            <div className="hero-container">
                <div className="hero-content" data-aos="fade-right" data-aos-duration="1000">
                    <h1 className="hero-title">The End of the Road of Pain</h1>
                    <p className="hero-subtitle">نهاية رحلة الألم تبدأ من هنا - علاج طبيعي متخصص في طنطا</p>
                    <a href="https://wa.me/201065125514" className="cta-btn hero-cta">Book Your Session</a>
                </div>
                <div className="hero-image" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">
                    <img src="/img/Movejpg.jpg" alt="Move Clinic Physical Therapy" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
