import React, { useState } from 'react';

const PatientList = () => {
    const [patients, setPatients] = useState([
        {
            id: 1,
            name: 'أحمد محمد علي',
            phone: '01012345678',
            age: 35,
            condition: 'آلام الظهر',
            lastVisit: '2025-01-10',
            status: 'نشط'
        },
        {
            id: 2,
            name: 'فاطمة أحمد',
            phone: '01098765432',
            age: 28,
            condition: 'إصابة رياضية',
            lastVisit: '2025-01-08',
            status: 'متابعة'
        },
        {
            id: 3,
            name: 'محمد حسن',
            phone: '01055555555',
            age: 45,
            condition: 'مشاكل العمود الفقري',
            lastVisit: '2025-01-05',
            status: 'مكتمل'
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPatient, setSelectedPatient] = useState(null);

    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.phone.includes(searchTerm) ||
        patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status) => {
        switch (status) {
            case 'نشط': return '#28a745';
            case 'متابعة': return '#ffc107';
            case 'مكتمل': return '#6c757d';
            default: return '#007bff';
        }
    };

    return (
        <div className="patient-list">
            <div className="section-header">
                <h3>قائمة المرضى</h3>
                <div className="search-box">
                    <i className="fas fa-search"></i>
                    <input
                        type="text"
                        placeholder="البحث عن مريض..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="patients-grid">
                {filteredPatients.map(patient => (
                    <div 
                        key={patient.id} 
                        className={`patient-card ${selectedPatient?.id === patient.id ? 'selected' : ''}`}
                        onClick={() => setSelectedPatient(patient)}
                    >
                        <div className="patient-header">
                            <h4>{patient.name}</h4>
                            <span 
                                className="status-badge"
                                style={{ backgroundColor: getStatusColor(patient.status) }}
                            >
                                {patient.status}
                            </span>
                        </div>
                        <div className="patient-info">
                            <p><i className="fas fa-phone"></i> {patient.phone}</p>
                            <p><i className="fas fa-user"></i> {patient.age} سنة</p>
                            <p><i className="fas fa-stethoscope"></i> {patient.condition}</p>
                            <p><i className="fas fa-calendar"></i> آخر زيارة: {patient.lastVisit}</p>
                        </div>
                        <div className="patient-actions">
                            <button className="view-btn">
                                <i className="fas fa-eye"></i>
                                عرض التفاصيل
                            </button>
                            <button className="edit-btn">
                                <i className="fas fa-edit"></i>
                                تعديل
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredPatients.length === 0 && (
                <div className="no-results">
                    <i className="fas fa-search"></i>
                    <p>لا توجد نتائج للبحث "{searchTerm}"</p>
                </div>
            )}
        </div>
    );
};

export default PatientList;
