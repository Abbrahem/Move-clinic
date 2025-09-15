import React from 'react';

const About = () => {
    return (
        <section id="about" className="about">
            <div className="container">
                <div className="about-content">
                    <div className="about-text" data-aos="fade-right" data-aos-duration="800">
                        <h2 className="section-title">من نحن</h2>
                        <h3 className="about-subtitle">Move Clinic – Natural Physical Therapy in Tanta</h3>
                        <p className="about-description">
                            في عيادة Move، نؤمن بأن الشفاء الطبيعي هو الطريق الأمثل للتعافي. نقدم خدمات العلاج الطبيعي المتخصصة باستخدام أحدث التقنيات والطرق الطبيعية لضمان حصولك على أفضل النتائج.
                        </p>
                        <p className="about-description">
                            فريقنا من المتخصصين المؤهلين يعمل على تقديم خطط علاجية مخصصة لكل حالة، مع التركيز على الشفاء الطبيعي والآمن.
                        </p>
                    </div>
                    <div className="about-image" data-aos="fade-left" data-aos-duration="800" data-aos-delay="200">
                        <img src="/img/Movelogo.jpg" alt="Move Clinic Interior" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
