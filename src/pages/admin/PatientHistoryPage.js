import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/shared/Sidebar';

const PatientHistoryPage = () => {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [patientHistory, setPatientHistory] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [showAddSession, setShowAddSession] = useState(false);
    const [newSession, setNewSession] = useState({
        date: '',
        timeFrom: '',
        timeTo: '',
        doctorId: '',
        exercises: '',
        notes: '',
        diagnosis: ''
    });

    useEffect(() => {
        // Load data from localStorage
        const savedPatients = JSON.parse(localStorage.getItem('clinicPatients') || '[]');
        const savedUsers = JSON.parse(localStorage.getItem('clinicUsers') || '[]');
        const doctorsList = savedUsers.filter(user => user.role === 'Doctor' && user.active);
        
        setPatients(savedPatients);
        setDoctors(doctorsList);
    }, []);

    useEffect(() => {
        if (selectedPatient) {
            // Load patient history from localStorage
            const savedHistory = JSON.parse(localStorage.getItem(`patientHistory_${selectedPatient.id}`) || '[]');
            setPatientHistory(savedHistory);
        }
    }, [selectedPatient]);

    const savePatientHistory = (history) => {
        if (selectedPatient) {
            localStorage.setItem(`patientHistory_${selectedPatient.id}`, JSON.stringify(history));
            setPatientHistory(history);
        }
    };

    const handleAddSession = (e) => {
        e.preventDefault();
        const session = {
            id: Date.now(),
            ...newSession,
            patientId: selectedPatient.id,
            createdAt: new Date().toISOString()
        };
        
        const updatedHistory = [...patientHistory, session];
        savePatientHistory(updatedHistory);
        
        setNewSession({
            date: '', timeFrom: '', timeTo: '', doctorId: '',
            exercises: '', notes: '', diagnosis: ''
        });
        setShowAddSession(false);
    };

    const handleDeleteSession = (sessionId) => {
        if (window.confirm('هل أنت متأكد من حذف هذه الجلسة؟')) {
            const updatedHistory = patientHistory.filter(session => session.id !== sessionId);
            savePatientHistory(updatedHistory);
        }
    };

    const getDoctorName = (doctorId) => {
        const doctor = doctors.find(d => d.id.toString() === doctorId);
        return doctor ? doctor.name : 'غير محدد';
    };

    const cancelAddSession = () => {
        setShowAddSession(false);
        setNewSession({
            date: '', timeFrom: '', timeTo: '', doctorId: '',
            exercises: '', notes: '', diagnosis: ''
        });
    };

    return (
        <div className="admin-page">
            <Sidebar />
            <div className="admin-content">
                <div className="page-header">
                    <h1>تاريخ المرضى</h1>
                    <p>عرض التشخيص وجلسات العلاج لكل مريض</p>
                </div>

                <div className="patient-history-content">
                    <div className="patient-selector">
                        <h3>اختر مريض:</h3>
                        <div className="patients-dropdown">
                            <select
                                value={selectedPatient?.id || ''}
                                onChange={(e) => {
                                    const patient = patients.find(p => p.id.toString() === e.target.value);
                                    setSelectedPatient(patient || null);
                                }}
                            >
                                <option value="">-- اختر مريض --</option>
                                {patients.map(patient => (
                                    <option key={patient.id} value={patient.id}>
                                        {patient.name} - {patient.condition}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {selectedPatient && (
                        <div className="patient-info-section">
                            <div className="patient-summary">
                                <h3>معلومات المريض</h3>
                                <div className="patient-details-grid">
                                    <div className="detail-item">
                                        <label>الاسم:</label>
                                        <span>{selectedPatient.name}</span>
                                    </div>
                                    <div className="detail-item">
                                        <label>العمر:</label>
                                        <span>{selectedPatient.age} سنة</span>
                                    </div>
                                    <div className="detail-item">
                                        <label>الهاتف:</label>
                                        <span>{selectedPatient.phone}</span>
                                    </div>
                                    <div className="detail-item">
                                        <label>الحالة:</label>
                                        <span>{selectedPatient.condition}</span>
                                    </div>
                                    <div className="detail-item">
                                        <label>تاريخ التسجيل:</label>
                                        <span>{selectedPatient.registrationDate}</span>
                                    </div>
                                    <div className="detail-item">
                                        <label>آخر زيارة:</label>
                                        <span>{selectedPatient.lastVisit}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="sessions-section">
                                <div className="section-header">
                                    <h3>جلسات العلاج ({patientHistory.length})</h3>
                                    <button 
                                        className="add-btn"
                                        onClick={() => setShowAddSession(true)}
                                    >
                                        <i className="fas fa-plus"></i>
                                        إضافة جلسة جديدة
                                    </button>
                                </div>

                                {showAddSession && (
                                    <div className="session-form-container">
                                        <div className="session-form">
                                            <h4>إضافة جلسة علاج جديدة</h4>
                                            <form onSubmit={handleAddSession}>
                                                <div className="form-row">
                                                    <div className="form-group">
                                                        <label>التاريخ *</label>
                                                        <input
                                                            type="date"
                                                            value={newSession.date}
                                                            onChange={(e) => setNewSession({...newSession, date: e.target.value})}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>من الساعة *</label>
                                                        <input
                                                            type="time"
                                                            value={newSession.timeFrom}
                                                            onChange={(e) => setNewSession({...newSession, timeFrom: e.target.value})}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>إلى الساعة *</label>
                                                        <input
                                                            type="time"
                                                            value={newSession.timeTo}
                                                            onChange={(e) => setNewSession({...newSession, timeTo: e.target.value})}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group">
                                                        <label>الطبيب المعالج *</label>
                                                        <select
                                                            value={newSession.doctorId}
                                                            onChange={(e) => setNewSession({...newSession, doctorId: e.target.value})}
                                                            required
                                                        >
                                                            <option value="">اختر طبيب</option>
                                                            {doctors.map(doctor => (
                                                                <option key={doctor.id} value={doctor.id}>
                                                                    {doctor.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="form-group">
                                                        <label>التشخيص</label>
                                                        <input
                                                            type="text"
                                                            value={newSession.diagnosis}
                                                            onChange={(e) => setNewSession({...newSession, diagnosis: e.target.value})}
                                                            placeholder="التشخيص الطبي"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group full-width">
                                                        <label>التمارين والعلاج *</label>
                                                        <textarea
                                                            value={newSession.exercises}
                                                            onChange={(e) => setNewSession({...newSession, exercises: e.target.value})}
                                                            rows="3"
                                                            placeholder="وصف التمارين والعلاج المطبق"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group full-width">
                                                        <label>ملاحظات</label>
                                                        <textarea
                                                            value={newSession.notes}
                                                            onChange={(e) => setNewSession({...newSession, notes: e.target.value})}
                                                            rows="2"
                                                            placeholder="ملاحظات إضافية"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-actions">
                                                    <button type="submit" className="save-btn">
                                                        حفظ الجلسة
                                                    </button>
                                                    <button type="button" className="cancel-btn" onClick={cancelAddSession}>
                                                        إلغاء
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                )}

                                <div className="sessions-timeline">
                                    {patientHistory.length > 0 ? (
                                        patientHistory
                                            .sort((a, b) => new Date(b.date) - new Date(a.date))
                                            .map(session => (
                                                <div key={session.id} className="session-card">
                                                    <div className="session-header">
                                                        <div className="session-date">
                                                            <i className="fas fa-calendar"></i>
                                                            <span>{session.date}</span>
                                                        </div>
                                                        <div className="session-time">
                                                            <i className="fas fa-clock"></i>
                                                            <span>{session.timeFrom} - {session.timeTo}</span>
                                                        </div>
                                                        <div className="session-doctor">
                                                            <i className="fas fa-user-md"></i>
                                                            <span>{getDoctorName(session.doctorId)}</span>
                                                        </div>
                                                        <button 
                                                            className="delete-session-btn"
                                                            onClick={() => handleDeleteSession(session.id)}
                                                            title="حذف الجلسة"
                                                        >
                                                            <i className="fas fa-trash"></i>
                                                        </button>
                                                    </div>
                                                    {session.diagnosis && (
                                                        <div className="session-diagnosis">
                                                            <h5><i className="fas fa-stethoscope"></i> التشخيص:</h5>
                                                            <p>{session.diagnosis}</p>
                                                        </div>
                                                    )}
                                                    <div className="session-exercises">
                                                        <h5><i className="fas fa-dumbbell"></i> التمارين والعلاج:</h5>
                                                        <p>{session.exercises}</p>
                                                    </div>
                                                    {session.notes && (
                                                        <div className="session-notes">
                                                            <h5><i className="fas fa-sticky-note"></i> ملاحظات:</h5>
                                                            <p>{session.notes}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            ))
                                    ) : (
                                        <div className="no-sessions">
                                            <i className="fas fa-calendar-times"></i>
                                            <p>لا توجد جلسات علاج مسجلة لهذا المريض</p>
                                            <span>قم بإضافة جلسة جديدة من الزر أعلاه</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {!selectedPatient && (
                        <div className="no-patient-selected">
                            <i className="fas fa-user-injured"></i>
                            <p>يرجى اختيار مريض لعرض تاريخه الطبي</p>
                            <span>اختر مريض من القائمة أعلاه لعرض جلسات العلاج والتشخيص</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PatientHistoryPage;
