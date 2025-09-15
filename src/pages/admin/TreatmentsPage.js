import React from 'react';
import Sidebar from '../../components/shared/Sidebar';
import TreatmentList from '../../components/treatments/TreatmentList';
import TreatmentForm from '../../components/treatments/TreatmentForm';

const TreatmentsPage = () => {
    return (
        <div className="admin-page">
            <Sidebar />
            <div className="admin-content">
                <div className="admin-header">
                    <h1>إدارة العلاجات</h1>
                    <p>إنشاء وإدارة خطط العلاج للمرضى</p>
                </div>
                <div className="treatments-content">
                    <div className="treatment-form-section">
                        <TreatmentForm />
                    </div>
                    <div className="treatments-list-section">
                        <TreatmentList />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TreatmentsPage;
