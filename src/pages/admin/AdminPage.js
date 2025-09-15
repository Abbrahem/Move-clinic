import React from 'react';
import Sidebar from '../../components/shared/Sidebar';
import AdminList from '../../components/admin/AdminList';
import PatientList from '../../components/patients/PatientList';
import TreatmentList from '../../components/treatments/TreatmentList';

const AdminPage = () => {
    return (
        <div className="admin-page">
            <Sidebar />
            <div className="admin-content">
                <div className="admin-header">
                    <h1>لوحة إدارة عيادة Move</h1>
                    <p>مرحباً بك في نظام إدارة العيادة</p>
                </div>
                <div className="admin-sections">
                    <section className="admin-section">
                        <h2>إدارة المشرفين</h2>
                        <AdminList />
                    </section>
                    <section className="admin-section">
                        <h2>إدارة المرضى</h2>
                        <PatientList />
                    </section>
                    <section className="admin-section">
                        <h2>إدارة العلاجات</h2>
                        <TreatmentList />
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
