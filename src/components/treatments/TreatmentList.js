import React, { useState } from 'react';

const TreatmentList = () => {
    const [treatments, setTreatments] = useState([
        {
            id: 1,
            patientName: 'أحمد محمد علي',
            treatmentType: 'علاج طبيعي للظهر',
            startDate: '2025-01-05',
            endDate: '2025-02-05',
            sessionsTotal: 12,
            sessionsCompleted: 5,
            therapist: 'د. فاطمة أحمد',
            status: 'جاري',
            nextSession: '2025-01-20'
        },
        {
            id: 2,
            patientName: 'فاطمة أحمد',
            treatmentType: 'إعادة تأهيل رياضي',
            startDate: '2025-01-08',
            endDate: '2025-02-15',
            sessionsTotal: 15,
            sessionsCompleted: 3,
            therapist: 'د. أحمد محمد',
            status: 'جاري',
            nextSession: '2025-01-22'
        },
        {
            id: 3,
            patientName: 'محمد حسن',
            treatmentType: 'علاج العمود الفقري',
            startDate: '2024-12-15',
            endDate: '2025-01-15',
            sessionsTotal: 10,
            sessionsCompleted: 10,
            therapist: 'د. فاطمة أحمد',
            status: 'مكتمل',
            nextSession: null
        }
    ]);

    const [filterStatus, setFilterStatus] = useState('الكل');

    const filteredTreatments = treatments.filter(treatment => {
        if (filterStatus === 'الكل') return true;
        return treatment.status === filterStatus;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'جاري': return '#28a745';
            case 'مكتمل': return '#6c757d';
            case 'متوقف': return '#dc3545';
            default: return '#007bff';
        }
    };

    const getProgressPercentage = (completed, total) => {
        return Math.round((completed / total) * 100);
    };

    return (
        <div className="treatment-list">
            <div className="section-header">
                <h3>خطط العلاج</h3>
                <div className="filter-controls">
                    <select 
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="status-filter"
                    >
                        <option value="الكل">جميع الحالات</option>
                        <option value="جاري">جاري</option>
                        <option value="مكتمل">مكتمل</option>
                        <option value="متوقف">متوقف</option>
                    </select>
                </div>
            </div>

            <div className="treatments-grid">
                {filteredTreatments.map(treatment => (
                    <div key={treatment.id} className="treatment-card">
                        <div className="treatment-header">
                            <h4>{treatment.treatmentType}</h4>
                            <span 
                                className="status-badge"
                                style={{ backgroundColor: getStatusColor(treatment.status) }}
                            >
                                {treatment.status}
                            </span>
                        </div>

                        <div className="treatment-patient">
                            <i className="fas fa-user"></i>
                            <span>{treatment.patientName}</span>
                        </div>

                        <div className="treatment-therapist">
                            <i className="fas fa-user-md"></i>
                            <span>{treatment.therapist}</span>
                        </div>

                        <div className="treatment-progress">
                            <div className="progress-info">
                                <span>التقدم: {treatment.sessionsCompleted}/{treatment.sessionsTotal} جلسة</span>
                                <span>{getProgressPercentage(treatment.sessionsCompleted, treatment.sessionsTotal)}%</span>
                            </div>
                            <div className="progress-bar">
                                <div 
                                    className="progress-fill"
                                    style={{ 
                                        width: `${getProgressPercentage(treatment.sessionsCompleted, treatment.sessionsTotal)}%`,
                                        backgroundColor: getStatusColor(treatment.status)
                                    }}
                                ></div>
                            </div>
                        </div>

                        <div className="treatment-dates">
                            <div className="date-item">
                                <i className="fas fa-calendar-alt"></i>
                                <span>بداية: {treatment.startDate}</span>
                            </div>
                            <div className="date-item">
                                <i className="fas fa-calendar-check"></i>
                                <span>نهاية: {treatment.endDate}</span>
                            </div>
                            {treatment.nextSession && (
                                <div className="date-item next-session">
                                    <i className="fas fa-clock"></i>
                                    <span>الجلسة القادمة: {treatment.nextSession}</span>
                                </div>
                            )}
                        </div>

                        <div className="treatment-actions">
                            <button className="view-btn">
                                <i className="fas fa-eye"></i>
                                عرض التفاصيل
                            </button>
                            <button className="edit-btn">
                                <i className="fas fa-edit"></i>
                                تعديل
                            </button>
                            {treatment.status === 'جاري' && (
                                <button className="session-btn">
                                    <i className="fas fa-plus"></i>
                                    جلسة جديدة
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {filteredTreatments.length === 0 && (
                <div className="no-results">
                    <i className="fas fa-stethoscope"></i>
                    <p>لا توجد خطط علاج بحالة "{filterStatus}"</p>
                </div>
            )}
        </div>
    );
};

export default TreatmentList;
