import React, { useState } from 'react';

const TreatmentForm = () => {
    const [formData, setFormData] = useState({
        patientName: '',
        treatmentType: '',
        startDate: '',
        endDate: '',
        sessionsTotal: '',
        therapist: '',
        notes: '',
        frequency: 'مرتين في الأسبوع'
    });

    const [patients] = useState([
        'أحمد محمد علي',
        'فاطمة أحمد',
        'محمد حسن',
        'سارة محمود',
        'علي أحمد'
    ]);

    const [therapists] = useState([
        'د. أحمد محمد',
        'د. فاطمة أحمد',
        'د. محمد علي',
        'د. نورا حسن'
    ]);

    const treatmentTypes = [
        'علاج طبيعي للظهر',
        'إعادة تأهيل رياضي',
        'علاج العمود الفقري',
        'علاج المفاصل',
        'علاج الألم المزمن',
        'علاج طبيعي لكبار السن'
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // هنا يمكن إضافة منطق حفظ البيانات
        console.log('خطة العلاج الجديدة:', formData);
        
        // إعادة تعيين النموذج
        setFormData({
            patientName: '',
            treatmentType: '',
            startDate: '',
            endDate: '',
            sessionsTotal: '',
            therapist: '',
            notes: '',
            frequency: 'مرتين في الأسبوع'
        });

        alert('تم إنشاء خطة العلاج بنجاح!');
    };

    return (
        <div className="treatment-form">
            <div className="form-header">
                <h3><i className="fas fa-plus-circle"></i> إنشاء خطة علاج جديدة</h3>
            </div>

            <form onSubmit={handleSubmit} className="treatment-form-content">
                <div className="form-row">
                    <div className="form-group">
                        <label>اسم المريض *</label>
                        <select
                            name="patientName"
                            value={formData.patientName}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">اختر المريض</option>
                            {patients.map((patient, index) => (
                                <option key={index} value={patient}>{patient}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>نوع العلاج *</label>
                        <select
                            name="treatmentType"
                            value={formData.treatmentType}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">اختر نوع العلاج</option>
                            {treatmentTypes.map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>تاريخ البداية *</label>
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>تاريخ النهاية المتوقع *</label>
                        <input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>عدد الجلسات الإجمالي *</label>
                        <input
                            type="number"
                            name="sessionsTotal"
                            value={formData.sessionsTotal}
                            onChange={handleInputChange}
                            min="1"
                            max="50"
                            placeholder="مثال: 12"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>تكرار الجلسات</label>
                        <select
                            name="frequency"
                            value={formData.frequency}
                            onChange={handleInputChange}
                        >
                            <option value="يومياً">يومياً</option>
                            <option value="مرة في الأسبوع">مرة في الأسبوع</option>
                            <option value="مرتين في الأسبوع">مرتين في الأسبوع</option>
                            <option value="ثلاث مرات في الأسبوع">ثلاث مرات في الأسبوع</option>
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group full-width">
                        <label>المعالج المسؤول *</label>
                        <select
                            name="therapist"
                            value={formData.therapist}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">اختر المعالج</option>
                            {therapists.map((therapist, index) => (
                                <option key={index} value={therapist}>{therapist}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group full-width">
                        <label>ملاحظات إضافية</label>
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleInputChange}
                            rows="4"
                            placeholder="أي ملاحظات أو تعليمات خاصة للعلاج..."
                        ></textarea>
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="save-btn">
                        <i className="fas fa-save"></i>
                        حفظ خطة العلاج
                    </button>
                    <button type="button" className="reset-btn" onClick={() => setFormData({
                        patientName: '',
                        treatmentType: '',
                        startDate: '',
                        endDate: '',
                        sessionsTotal: '',
                        therapist: '',
                        notes: '',
                        frequency: 'مرتين في الأسبوع'
                    })}>
                        <i className="fas fa-undo"></i>
                        إعادة تعيين
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TreatmentForm;
