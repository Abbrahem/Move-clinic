// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '#ffffff';
        navbar.style.backdropFilter = 'none';
    }
});

// Testimonials Slider
class TestimonialsSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.testimonial-card');
        this.dots = document.querySelectorAll('.nav-dot');
        this.autoSlideInterval = null;
        
        this.init();
    }
    
    init() {
        // Add click events to dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });
        
        // Start auto-slide
        this.startAutoSlide();
        
        // Pause on hover
        const slider = document.querySelector('.testimonials-slider');
        slider.addEventListener('mouseenter', () => this.stopAutoSlide());
        slider.addEventListener('mouseleave', () => this.startAutoSlide());
    }
    
    goToSlide(slideIndex) {
        // Hide current slide
        this.slides[this.currentSlide].classList.remove('active');
        this.dots[this.currentSlide].classList.remove('active');
        
        // Show new slide
        this.currentSlide = slideIndex;
        this.slides[this.currentSlide].classList.add('active');
        this.dots[this.currentSlide].classList.add('active');
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }
    
    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
    
    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }
}

// Initialize testimonials slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TestimonialsSlider();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Handler with WhatsApp Integration
const bookingForm = document.getElementById('booking-form');
bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    
    // Validate form
    if (!name || !phone) {
        alert('يرجى ملء جميع الحقول المطلوبة');
        return;
    }
    
    // Create WhatsApp message
    const whatsappMessage = `
مرحباً، أريد حجز جلسة في عيادة Move:

الاسم: ${name}
رقم الموبايل: ${phone}
${message ? `الرسالة: ${message}` : ''}

شكراً لكم.
    `.trim();
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Open WhatsApp
    const whatsappURL = `https://wa.me/201065125514?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
    
    // Reset form
    bookingForm.reset();
    
    // Show success message
    showNotification('تم إرسال طلب الحجز بنجاح! سيتم التواصل معك قريباً.');
});

// Notification system
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        font-weight: 500;
        max-width: 300px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Scroll to top button
function createScrollToTopButton() {
    const scrollTopBtn = document.createElement('a');
    scrollTopBtn.href = '#home';
    scrollTopBtn.className = 'scroll-top';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
});

// Service cards hover effect enhancement
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Video functionality
document.addEventListener('DOMContentLoaded', () => {
    const videoCards = document.querySelectorAll('.video-card');
    const videos = document.querySelectorAll('video');
    const playButtons = document.querySelectorAll('.play-button');
    
    // Video hover effects
    videoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        });
    });
    
    // Play button functionality
    playButtons.forEach((playButton, index) => {
        playButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const video = videos[index];
            const wrapper = this.parentElement;
            
            // Pause all other videos
            videos.forEach((otherVideo, otherIndex) => {
                if (otherIndex !== index && !otherVideo.paused) {
                    otherVideo.pause();
                    otherVideo.currentTime = 0;
                    playButtons[otherIndex].parentElement.classList.remove('playing');
                }
            });
            
            // Play current video
            if (video.paused) {
                video.play();
                wrapper.classList.add('playing');
            }
        });
    });
    
    // Video event listeners
    videos.forEach((video, index) => {
        const wrapper = video.parentElement;
        const playButton = playButtons[index];
        
        video.addEventListener('play', function() {
            wrapper.classList.add('playing');
        });
        
        video.addEventListener('pause', function() {
            wrapper.classList.remove('playing');
        });
        
        video.addEventListener('ended', function() {
            wrapper.classList.remove('playing');
            this.currentTime = 0;
        });
        
        // Click on video to play/pause
        video.addEventListener('click', function() {
            if (this.paused) {
                // Pause all other videos first
                videos.forEach((otherVideo, otherIndex) => {
                    if (otherIndex !== index && !otherVideo.paused) {
                        otherVideo.pause();
                        otherVideo.currentTime = 0;
                        playButtons[otherIndex].parentElement.classList.remove('playing');
                    }
                });
                this.play();
            } else {
                this.pause();
            }
        });
    });
});

// Loading animation for the page
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Preloader removed as requested

// Form validation enhancement
function enhanceFormValidation() {
    const inputs = document.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        // Add real-time validation
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            // Remove error styling when user starts typing
            this.style.borderColor = '#e9ecef';
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        isValid = false;
    }
    
    // Validate phone number
    if (field.type === 'tel' && value) {
        const phoneRegex = /^01[0-9]{9}$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
        }
    }
    
    // Apply styling based on validation
    if (!isValid) {
        field.style.borderColor = '#dc3545';
    } else {
        field.style.borderColor = '#28a745';
    }
    
    return isValid;
}

// Initialize form validation
document.addEventListener('DOMContentLoaded', enhanceFormValidation);
