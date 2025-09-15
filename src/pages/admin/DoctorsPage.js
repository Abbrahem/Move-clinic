import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/shared/Sidebar';

const DoctorsPage = () => {
    const [doctors, setDoctors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Load doctors from localStorage
        const savedUsers = JSON.parse(localStorage.getItem('clinicUsers') || '[]');
        const doctorsList = savedUsers.filter(user => user.role === 'Doctor');
        setDoctors(doctorsList);
    }, []);

    const filteredDoctors = doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (active) => {
        return active ? '#28a745' : '#dc3545';
    };

    return (
        <div className="admin-page">
            <Sidebar />
            <div className="admin-content">
                <div className="page-header">
                    <h1>الأطباء</h1>
                    <p>عرض قائمة الأطباء المسجلين في النظام</p>
                </div>

                <div className="doctors-content">
                    <div className="section-header">
                        <div className="search-box">
                            <i className="fas fa-search"></i>
                            <input
                                type="text"
                                placeholder="البحث عن طبيب..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="doctors-grid">
                        {filteredDoctors.map(doctor => (
                            <div key={doctor.id} className="doctor-card">
                                <div className="doctor-header">
                                    <div className="doctor-avatar">
                                        <i className="fas fa-user-md"></i>
                                    </div>
                                    <div className="doctor-info">
                                        <h4>{doctor.name}</h4>
                                        <span className="doctor-title">طبيب علاج طبيعي</span>
                                    </div>
                                    <span 
                                        className="status-indicator"
                                        style={{ backgroundColor: getStatusColor(doctor.active) }}
                                        title={doctor.active ? 'نشط' : 'معطل'}
                                    ></span>
                                </div>
                                <div className="doctor-details">
                                    <div className="detail-row">
                                        <i className="fas fa-envelope"></i>
                                        <span>{doctor.email}</span>
                                    </div>
                                    <div className="detail-row">
                                        <i className="fas fa-birthday-cake"></i>
                                        <span>{doctor.age} سنة</span>
                                    </div>
                                    <div className="detail-row">
                                        <i className="fas fa-calendar-plus"></i>
                                        <span>انضم في: {doctor.createdAt}</span>
                                    </div>
                                    <div className="detail-row">
                                        <i className="fas fa-circle"></i>
                                        <span className={`status-text ${doctor.active ? 'active' : 'inactive'}`}>
                                            {doctor.active ? 'نشط' : 'معطل'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredDoctors.length === 0 && (
                        <div className="no-doctors">
                            <i className="fas fa-user-md"></i>
                            <p>
                                {searchTerm 
                                    ? `لا توجد نتائج للبحث "${searchTerm}"`
                                    : 'لا يوجد أطباء مسجلون في النظام'
                                }
                            </p>
                            {!searchTerm && (
                                <span>يمكن للمدير الرئيسي إضافة أطباء جدد من قسم "إدارة النظام"</span>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DoctorsPage;
