import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/admin/LoginPage';
import ManagePage from './pages/admin/ManagePage';
import PatientsPage from './pages/admin/PatientsPage';
import DoctorsPage from './pages/admin/DoctorsPage';
import EmployeesPage from './pages/admin/EmployeesPage';
import PatientHistoryPage from './pages/admin/PatientHistoryPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import './assets/styles/main.css';
import './assets/styles/admin.css';
import './assets/styles/login.css';
import './assets/styles/sidebar.css';
import './assets/styles/manage.css';

const App = () => {
    return (
        <Router>
            <Routes>
                {/* الموقع الرئيسي */}
                <Route path="/" element={<HomePage />} />
                
                {/* نظام الإدارة */}
                <Route path="/admin/login" element={<LoginPage />} />
                
                {/* صفحة إدارة النظام - للمدير الرئيسي فقط */}
                <Route path="/admin/manage" element={
                    <ProtectedRoute requiredRole="Super Admin">
                        <ManagePage />
                    </ProtectedRoute>
                } />
                
                {/* الصفحات العامة - لجميع المستخدمين */}
                <Route path="/admin/dashboard" element={
                    <ProtectedRoute>
                        <PatientsPage />
                    </ProtectedRoute>
                } />
                <Route path="/admin/patients" element={
                    <ProtectedRoute>
                        <PatientsPage />
                    </ProtectedRoute>
                } />
                <Route path="/admin/doctors" element={
                    <ProtectedRoute>
                        <DoctorsPage />
                    </ProtectedRoute>
                } />
                <Route path="/admin/employees" element={
                    <ProtectedRoute>
                        <EmployeesPage />
                    </ProtectedRoute>
                } />
                <Route path="/admin/patient-history" element={
                    <ProtectedRoute>
                        <PatientHistoryPage />
                    </ProtectedRoute>
                } />
            </Routes>
        </Router>
    );
};

export default App;
