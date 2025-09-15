import React from 'react';

const Location = () => {
    return (
        <section id="location" className="location">
            <div className="container">
                <h2 className="section-title" data-aos="fade-up">زورونا في طنطا</h2>
                <div className="location-content">
                    <div className="location-info" data-aos="fade-right">
                        <h3>عنوان العيادة</h3>
                        <p><i className="fas fa-map-marker-alt"></i>El Helw, Tanta, Egypt</p>
                        <p><i className="fas fa-phone"></i> 01065125514</p>
                        <p><i className="fas fa-clock"></i> السبت - الخميس: 9:00 ص - 9:00 م</p>
                    </div>
                    <div className="location-map" data-aos="fade-left">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m21!1m12!1m3!1d1661.5457844127488!2d31.005483497540396!3d30.801037526918446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m6!3e6!4m0!4m3!3m2!1d30.800459999999998!2d31.003729999999997!5e0!3m2!1sar!2seg!4v1757505848883!5m2!1sar!2seg"
                            width="100%" 
                            height="300" 
                            style={{border: 0}} 
                            allowFullScreen="" 
                            loading="lazy"
                            title="Move Clinic Location">
                        </iframe>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Location;
