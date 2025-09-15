import React from 'react';

const Services = () => {
    const services = [
        {
            icon: "fas fa-hand-holding-heart",
            title: "العلاج الطبيعي",
            description: "برامج علاج طبيعي شاملة لتحسين الحركة وتقليل الألم"
        },
        {
            icon: "fas fa-running",
            title: "إصابات رياضية",
            description: "علاج متخصص للإصابات الرياضية وإعادة التأهيل"
        },
        {
            icon: "fas fa-hands",
            title: "العلاج اليدوي",
            description: "جلسات علاج يدوي متخصصة لتحسين وظائف المفاصل"
        },
        {
            icon: "fas fa-spine",
            title: "علاج العمود الفقري",
            description: "برامج متخصصة لعلاج مشاكل العمود الفقري والرقبة"
        },
        {
            icon: "fas fa-dumbbell",
            title: "العلاج الطبيعي لكبار السن",
            description: "لتحسين الحركة، التوازن، ومنع السقوط."
        },
        {
            icon: "fas fa-heartbeat",
            title: "علاج الألم المزمن",
            description: "تقنيات متقدمة لعلاج الألم المزمن وتحسين جودة الحياة"
        }
    ];

    return (
        <section id="services" className="services">
            <div className="container">
                <h2 className="section-title" data-aos="fade-up">خدماتنا</h2>
                <div className="services-grid">
                    {services.map((service, index) => (
                        <div 
                            key={index}
                            className="service-card" 
                            data-aos="fade-up" 
                            data-aos-delay={`${(index + 1) * 100}`}
                        >
                            <div className="service-icon">
                                <i className={service.icon}></i>
                            </div>
                            <h3 className="service-title">{service.title}</h3>
                            <p className="service-description">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
