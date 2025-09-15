import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/shared/Sidebar';

const PatientsPage = () => {
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingPatient, setEditingPatient] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [newPatient, setNewPatient] = useState({
        name: '',
        age: '',
        phone: '',
        email: '',
        address: '',
        condition: '',
        assignedDoctor: '',
        emergencyContact: '',
        notes: ''
    });

    useEffect(() => {
        // Load patients and doctors from localStorage
        const savedPatients = JSON.parse(localStorage.getItem('clinicPatients') || '[]');
        const savedUsers = JSON.parse(localStorage.getItem('clinicUsers') || '[]');
        const doctorsList = savedUsers.filter(user => user.role === 'Doctor' && user.active);
        
        setPatients(savedPatients);
        setDoctors(doctorsList);
    }, []);

    const savePatients = (updatedPatients) => {
        localStorage.setItem('clinicPatients', JSON.stringify(updatedPatients));
        setPatients(updatedPatients);
    };

    const handleAddPatient = (e) => {
        e.preventDefault();
        const patient = {
            id: Date.now(),
            ...newPatient,
            age: parseInt(newPatient.age),
            status: 'نشط',
            registrationDate: new Date().toISOString().split('T')[0],
            lastVisit: new Date().toISOString().split('T')[0]
        };
        
        const updatedPatients = [...patients, patient];
        savePatients(updatedPatients);
        setNewPatient({
            name: '', age: '', phone: '', email: '', address: '',
            condition: '', assignedDoctor: '', emergencyContact: '', notes: ''
        });
        setShowAddForm(false);
    };

    const handleEditPatient = (patient) => {
        setEditingPatient(patient);
        setNewPatient({
            name: patient.name,
            age: patient.age.toString(),
            phone: patient.phone,
            email: patient.email || '',
            address: patient.address || '',
            condition: patient.condition,
            assignedDoctor: patient.assignedDoctor || '',
            emergencyContact: patient.emergencyContact || '',
            notes: patient.notes || ''
        });
        setShowAddForm(true);
    };

    const handleUpdatePatient = (e) => {
        e.preventDefault();
        const updatedPatients = patients.map(patient => 
            patient.id === editingPatient.id 
                ? { ...patient, ...newPatient, age: parseInt(newPatient.age) }
                : patient
        );
        savePatients(updatedPatients);
        setEditingPatient(null);
        setNewPatient({
            name: '', age: '', phone: '', email: '', address: '',
            condition: '', assignedDoctor: '', emergencyContact: '', notes: ''
        });
        setShowAddForm(false);
    };

    const handleDeletePatient = (patientId) => {
        if (window.confirm('هل أنت متأكد من حذف هذا المريض؟')) {
            const updatedPatients = patients.filter(patient => patient.id !== patientId);
            savePatients(updatedPatients);
        }
    };

    const cancelForm = () => {
        setShowAddForm(false);
        setEditingPatient(null);
        setNewPatient({
            name: '', age: '', phone: '', email: '', address: '',
            condition: '', assignedDoctor: '', emergencyContact: '', notes: ''
        });
    };

    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.phone.includes(searchTerm) ||
        patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getDoctorName = (doctorId) => {
        const doctor = doctors.find(d => d.id.toString() === doctorId);
        return doctor ? doctor.name : 'غير محدد';
    };

    return (
        <div className="admin-page">
            <Sidebar />
            <div className="admin-content">
                <div className="page-header">
                    <h1>إدارة المرضى</h1>
                    <p>عرض وإدارة بيانات المرضى وتخصيص الأطباء</p>
                </div>

                <div className="patients-content">
                    <div className="section-header">
                        <div className="search-add-container">
                            <div className="search-box">
                                <i className="fas fa-search"></i>
                                <input
                                    type="text"
                                    placeholder="البحث عن مريض..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <button 
                                className="add-btn"
                                onClick={() => setShowAddForm(true)}
                            >
                                <i className="fas fa-plus"></i>
                                إضافة مريض جديد
                            </button>
                        </div>
                    </div>

                    {showAddForm && (
                        <div className="patient-form-container">
                            <div className="patient-form">
                                <h3>{editingPatient ? 'تعديل بيانات المريض' : 'إضافة مريض جديد'}</h3>
                                <form onSubmit={editingPatient ? handleUpdatePatient : handleAddPatient}>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>الاسم الكامل *</label>
                                            <input
                                                type="text"
                                                value={newPatient.name}
                                                onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>العمر *</label>
                                            <input
                                                type="number"
                                                value={newPatient.age}
                                                onChange={(e) => setNewPatient({...newPatient, age: e.target.value})}
                                                required
                                                min="1"
                                                max="120"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>رقم الهاتف *</label>
                                            <input
                                                type="tel"
                                                value={newPatient.phone}
                                                onChange={(e) => setNewPatient({...newPatient, phone: e.target.value})}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>البريد الإلكتروني</label>
                                            <input
                                                type="email"
                                                value={newPatient.email}
                                                onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>العنوان</label>
                                            <input
                                                type="text"
                                                value={newPatient.address}
                                                onChange={(e) => setNewPatient({...newPatient, address: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>الحالة المرضية *</label>
                                            <input
                                                type="text"
                                                value={newPatient.condition}
                                                onChange={(e) => setNewPatient({...newPatient, condition: e.target.value})}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>الطبيب المختص</label>
                                            <select
                                                value={newPatient.assignedDoctor}
                                                onChange={(e) => setNewPatient({...newPatient, assignedDoctor: e.target.value})}
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
                                            <label>جهة الاتصال الطارئ</label>
                                            <input
                                                type="tel"
                                                value={newPatient.emergencyContact}
                                                onChange={(e) => setNewPatient({...newPatient, emergencyContact: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group full-width">
                                            <label>ملاحظات</label>
                                            <textarea
                                                value={newPatient.notes}
                                                onChange={(e) => setNewPatient({...newPatient, notes: e.target.value})}
                                                rows="3"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-actions">
                                        <button type="submit" className="save-btn">
                                            {editingPatient ? 'تحديث' : 'إضافة'}
                                        </button>
                                        <button type="button" className="cancel-btn" onClick={cancelForm}>
                                            إلغاء
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    <div className="patients-grid">
                        {filteredPatients.map(patient => (
                            <div key={patient.id} className="patient-card">
                                <div className="patient-header">
                                    <h4>{patient.name}</h4>
                                    <span className="patient-id">#{patient.id}</span>
                                </div>
                                <div className="patient-info">
                                    <div className="info-row">
                                        <i className="fas fa-user"></i>
                                        <span>{patient.age} سنة</span>
                                    </div>
                                    <div className="info-row">
                                        <i className="fas fa-phone"></i>
                                        <span>{patient.phone}</span>
                                    </div>
                                    <div className="info-row">
                                        <i className="fas fa-stethoscope"></i>
                                        <span>{patient.condition}</span>
                                    </div>
                                    <div className="info-row">
                                        <i className="fas fa-user-md"></i>
                                        <span>{getDoctorName(patient.assignedDoctor)}</span>
                                    </div>
                                    <div className="info-row">
                                        <i className="fas fa-calendar"></i>
                                        <span>آخر زيارة: {patient.lastVisit}</span>
                                    </div>
                                </div>
                                <div className="patient-actions">
                                    <button 
                                        className="edit-btn"
                                        onClick={() => handleEditPatient(patient)}
                                        title="تعديل"
                                    >
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button 
                                        className="delete-btn"
                                        onClick={() => handleDeletePatient(patient.id)}
                                        title="حذف"
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredPatients.length === 0 && (
                        <div className="no-patients">
                            <i className="fas fa-user-injured"></i>
                            <p>
                                {searchTerm 
                                    ? `لا توجد نتائج للبحث "${searchTerm}"`
                                    : 'لا يوجد مرضى مسجلون بعد'
                                }
                            </p>
                            {!searchTerm && (
                                <span>قم بإضافة المرضى الجدد من الزر أعلاه</span>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PatientsPage;
