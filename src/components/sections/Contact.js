import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        message: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate form
        if (!formData.name || !formData.phone) {
            showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
            return;
        }

        // Validate phone number
        const phoneRegex = /^01[0-9]{9}$/;
        if (!phoneRegex.test(formData.phone)) {
            showNotification('يرجى إدخال رقم موبايل صحيح', 'error');
            return;
        }
        
        // Create WhatsApp message
        const whatsappMessage = `
مرحباً، أريد حجز جلسة في عيادة Move:

الاسم: ${formData.name}
رقم الموبايل: ${formData.phone}
${formData.message ? `الرسالة: ${formData.message}` : ''}

شكراً لكم.
        `.trim();
        
        // Encode message for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // Open WhatsApp
        const whatsappURL = `https://wa.me/201065125514?text=${encodedMessage}`;
        window.open(whatsappURL, '_blank');
        
        // Reset form
        setFormData({
            name: '',
            phone: '',
            message: ''
        });
        
        // Show success message
        showNotification('تم إرسال طلب الحجز بنجاح! سيتم التواصل معك قريباً.');
    };

    const showNotification = (message, type = 'success') => {
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
    };

    return (
        <section id="contact" className="contact">
            <div className="container">
                <h2 className="section-title" data-aos="fade-up">احجز جلستك الآن</h2>
                <div className="contact-content">
                    <div className="contact-form" data-aos="fade-right">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="الاسم الكامل" 
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                    type="tel" 
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="رقم الموبايل" 
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <textarea 
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="وصف الحالة أو الرسالة" 
                                    rows="4"
                                ></textarea>
                            </div>
                            <button type="submit" className="cta-btn">احجز دلوقتي</button>
                        </form>
                    </div>
                    <div className="contact-info" data-aos="fade-left">
                        <h3>تواصل معنا</h3>
                        <div className="contact-item">
                            <i className="fab fa-whatsapp"></i>
                            <a href="https://wa.me/201065125514">01065125514</a>
                        </div>
                        <div className="contact-item">
                            <i className="fab fa-facebook"></i>
                            <a href="#" target="_blank" rel="noopener noreferrer">Move Clinic</a>
                        </div>
                        <div className="contact-item">
                            <i className="fab fa-instagram"></i>
                            <a href="#" target="_blank" rel="noopener noreferrer">@move_clinic</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
