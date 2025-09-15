import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    const handleLogout = () => {
        localStorage.removeItem('isAdminLoggedIn');
        localStorage.removeItem('currentUser');
        navigate('/');
    };

    // Define menu items based on user role
    const getMenuItems = () => {
        const baseItems = [
            {
                path: '/admin/patients',
                icon: 'fas fa-user-injured',
                label: 'المرضى',
                active: location.pathname === '/admin/patients'
            },
            {
                path: '/admin/doctors',
                icon: 'fas fa-user-md',
                label: 'الأطباء',
                active: location.pathname === '/admin/doctors'
            },
            {
                path: '/admin/employees',
                icon: 'fas fa-users',
                label: 'الموظفون',
                active: location.pathname === '/admin/employees'
            },
            {
                path: '/admin/patient-history',
                icon: 'fas fa-history',
                label: 'تاريخ المرضى',
                active: location.pathname === '/admin/patient-history'
            }
        ];

        // Only Super Admin can see Manage tab
        if (currentUser.role === 'Super Admin') {
            return [
                {
                    path: '/admin/manage',
                    icon: 'fas fa-cog',
                    label: 'إدارة النظام',
                    active: location.pathname === '/admin/manage'
                },
                ...baseItems
            ];
        }

        return baseItems;
    };

    const menuItems = getMenuItems();

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <div className="clinic-logo">
                    <img src="/img/Movelogo.jpg" alt="Move Clinic" />
                    <h3>Move Clinic</h3>
                </div>
            </div>
            
            <nav className="sidebar-nav">
                <ul>
                    {menuItems.map((item, index) => (
                        <li key={index} className={item.active ? 'active' : ''}>
                            <Link to={item.path}>
                                <i className={item.icon}></i>
                                <span>{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="sidebar-footer">
                <div className="user-info">
                    <div className="user-avatar">
                        <i className="fas fa-user-circle"></i>
                    </div>
                    <div className="user-details">
                        <span className="user-name">{currentUser.name || 'مستخدم'}</span>
                        <span className="user-role">{currentUser.role || 'دور غير محدد'}</span>
                    </div>
                </div>
                <Link to="/" className="back-to-site">
                    <i className="fas fa-globe"></i>
                    <span>العودة للموقع</span>
                </Link>
                <button onClick={handleLogout} className="logout-btn">
                    <i className="fas fa-sign-out-alt"></i>
                    <span>تسجيل الخروج</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
