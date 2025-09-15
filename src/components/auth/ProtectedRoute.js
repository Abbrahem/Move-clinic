import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole = null }) => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    if (!isLoggedIn) {
        return <Navigate to="/admin/login" replace />;
    }
    
    // Check role-based access
    if (requiredRole && currentUser.role !== requiredRole) {
        return <Navigate to="/admin/dashboard" replace />;
    }
    
    return children;
};

export default ProtectedRoute;
