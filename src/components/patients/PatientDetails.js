import React, { useState } from 'react';

const PatientDetails = () => {
    const [selectedPatient, setSelectedPatient] = useState({
        id: 1,
        name: 'أحمد محمد علي',
        phone: '01012345678',
        email: 'ahmed.mohamed@email.com',
        age: 35,
        gender: 'ذكر',
        address: 'طنطا، الغربية',
        condition: 'آلام الظهر',
        medicalHistory: 'لا يوجد تاريخ مرضي سابق',
        currentTreatment: 'جلسات علاج طبيعي',
        nextAppointment: '2025-01-20',
        status: 'نشط'
    });

    const [treatmentHistory] = useState([
        {
            date: '2025-01-10',
            treatment: 'جلسة علاج طبيعي',
            therapist: 'د. فاطمة أحمد',
            notes: 'تحسن ملحوظ في الحركة',
            nextSession: '2025-01-15'
        },
        {
            date: '2025-01-05',
            treatment: 'تقييم أولي',
            therapist: 'د. أحمد محمد',
            notes: 'آلام في أسفل الظهر، يحتاج لبرنامج علاج طبيعي',
            nextSession: '2025-01-10'
        }
    ]);

    if (!selectedPatient) {
        return (
            <div className="patient-details-empty">
                <i className="fas fa-user-plus"></i>
                <h3>اختر مريضاً لعرض التفاصيل</h3>
                <p>قم بالنقر على أحد المرضى من القائمة لعرض تفاصيله الكاملة</p>
            </div>
        );
    }

    return (
        <div className="patient-details">
            <div className="patient-header">
                <div className="patient-avatar">
                    <i className="fas fa-user"></i>
                </div>
                <div className="patient-basic-info">
                    <h2>{selectedPatient.name}</h2>
                    <p>{selectedPatient.age} سنة • {selectedPatient.gender}</p>
                    <span className="status-badge active">{selectedPatient.status}</span>
                </div>
                <div className="patient-actions">
                    <button className="edit-patient-btn">
                        <i className="fas fa-edit"></i>
                        تعديل البيانات
                    </button>
                </div>
            </div>

            <div className="patient-info-sections">
                <div className="info-section">
                    <h3><i className="fas fa-info-circle"></i> المعلومات الشخصية</h3>
                    <div className="info-grid">
                        <div className="info-item">
                            <label>رقم الهاتف:</label>
                            <span>{selectedPatient.phone}</span>
                        </div>
                        <div className="info-item">
                            <label>البريد الإلكتروني:</label>
                            <span>{selectedPatient.email}</span>
                        </div>
                        <div className="info-item">
                            <label>العنوان:</label>
                            <span>{selectedPatient.address}</span>
                        </div>
                        <div className="info-item">
                            <label>الحالة الطبية:</label>
                            <span>{selectedPatient.condition}</span>
                        </div>
                    </div>
                </div>

                <div className="info-section">
                    <h3><i className="fas fa-stethoscope"></i> العلاج الحالي</h3>
                    <div className="current-treatment">
                        <p><strong>نوع العلاج:</strong> {selectedPatient.currentTreatment}</p>
                        <p><strong>الموعد القادم:</strong> {selectedPatient.nextAppointment}</p>
                        <p><strong>التاريخ المرضي:</strong> {selectedPatient.medicalHistory}</p>
                    </div>
                </div>

                <div className="info-section">
                    <h3><i className="fas fa-history"></i> تاريخ العلاج</h3>
                    <div className="treatment-history">
                        {treatmentHistory.map((session, index) => (
                            <div key={index} className="treatment-session">
                                <div className="session-date">
                                    <i className="fas fa-calendar"></i>
                                    {session.date}
                                </div>
                                <div className="session-details">
                                    <h4>{session.treatment}</h4>
                                    <p><strong>المعالج:</strong> {session.therapist}</p>
                                    <p><strong>الملاحظات:</strong> {session.notes}</p>
                                    {session.nextSession && (
                                        <p><strong>الجلسة القادمة:</strong> {session.nextSession}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="patient-actions-footer">
                <button className="schedule-btn">
                    <i className="fas fa-calendar-plus"></i>
                    حجز موعد جديد
                </button>
                <button className="add-note-btn">
                    <i className="fas fa-sticky-note"></i>
                    إضافة ملاحظة
                </button>
                <button className="print-btn">
                    <i className="fas fa-print"></i>
                    طباعة التقرير
                </button>
            </div>
        </div>
    );
};

export default PatientDetails;
