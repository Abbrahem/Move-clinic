import React, { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import Videos from '../components/sections/Videos';
import Testimonials from '../components/sections/Testimonials';
import Location from '../components/sections/Location';
import Contact from '../components/sections/Contact';
import Footer from '../components/layout/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';

const HomePage = () => {
    useEffect(() => {
        // Initialize AOS
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });

        // Navbar scroll effect
        const handleScroll = () => {
            const navbar = document.getElementById('navbar');
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                    navbar.style.backdropFilter = 'blur(10px)';
                } else {
                    navbar.style.background = '#ffffff';
                    navbar.style.backdropFilter = 'none';
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Smooth scrolling for navigation links
        const handleSmoothScroll = (e) => {
            if (e.target.getAttribute('href')?.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(e.target.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        };

        document.addEventListener('click', handleSmoothScroll);

        // Scroll to top button
        const createScrollToTopButton = () => {
            const scrollTopBtn = document.createElement('a');
            scrollTopBtn.href = '#home';
            scrollTopBtn.className = 'scroll-top';
            scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
            document.body.appendChild(scrollTopBtn);
            
            const handleScrollTop = () => {
                if (window.pageYOffset > 300) {
                    scrollTopBtn.classList.add('visible');
                } else {
                    scrollTopBtn.classList.remove('visible');
                }
            };

            window.addEventListener('scroll', handleScrollTop);
        };

        createScrollToTopButton();

        // Cleanup
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('click', handleSmoothScroll);
        };
    }, []);

    return (
        <div className="homepage">
            <Navbar />
            <Hero />
            <About />
            <Services />
            <Videos />
            <Testimonials />
            <Location />
            <Contact />
            <Footer />
        </div>
    );
};

export default HomePage;
