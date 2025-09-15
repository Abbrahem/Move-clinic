import React, { useEffect, useState } from 'react';

const Testimonials = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const testimonials = [
        {
            text: "تجربة رائعة في عيادة Move. الدكتور محترف جداً والعلاج فعال. شفيت من آلام الظهر في وقت قصير.",
            author: "أحمد محمد",
            title: "مريض سابق"
        },
        {
            text: "أفضل عيادة علاج طبيعي في طنطا. الخدمة ممتازة والنتائج مذهلة. أنصح الجميع بزيارتها.",
            author: "فاطمة أحمد",
            title: "مريضة سابقة"
        },
        {
            text: "شكراً لفريق Move على الاهتمام والعناية الفائقة. تحسنت حالتي كثيراً بفضل العلاج المتخصص.",
            author: "محمد علي",
            title: "مريض سابق"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [testimonials.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <section id="testimonials" className="testimonials">
            <div className="container">
                <h2 className="section-title" data-aos="fade-up">آراء عملائنا</h2>
                <div className="testimonials-slider" id="testimonials-slider">
                    {testimonials.map((testimonial, index) => (
                        <div 
                            key={index}
                            className={`testimonial-card ${index === currentSlide ? 'active' : ''}`}
                        >
                            <div className="testimonial-content">
                                <p className="testimonial-text">"{testimonial.text}"</p>
                                <div className="testimonial-author">
                                    <div className="author-info">
                                        <h4 className="author-name">{testimonial.author}</h4>
                                        <span className="author-title">{testimonial.title}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="testimonials-nav">
                    {testimonials.map((_, index) => (
                        <button 
                            key={index}
                            className={`nav-dot ${index === currentSlide ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
