import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/shared/Sidebar';

const EmployeesPage = () => {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('الكل');

    useEffect(() => {
        // Load employees from localStorage
        const savedUsers = JSON.parse(localStorage.getItem('clinicUsers') || '[]');
        const employeesList = savedUsers.filter(user => user.role === 'Employee');
        
        // Add categories to existing employees if not present
        const employeesWithCategories = employeesList.map(emp => ({
            ...emp,
            category: emp.category || 'موظف عام'
        }));
        
        setEmployees(employeesWithCategories);
    }, []);

    const categories = ['الكل', 'سكرتير', 'مساعد إداري', 'موظف استقبال', 'موظف عام', 'فني'];

    const filteredEmployees = employees.filter(employee => {
        const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (employee.category && employee.category.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesCategory = filterCategory === 'الكل' || employee.category === filterCategory;
        
        return matchesSearch && matchesCategory;
    });

    const getStatusColor = (active) => {
        return active ? '#28a745' : '#dc3545';
    };

    const getCategoryColor = (category) => {
        const colors = {
            'سكرتير': '#007bff',
            'مساعد إداري': '#28a745',
            'موظف استقبال': '#ffc107',
            'موظف عام': '#6c757d',
            'فني': '#17a2b8'
        };
        return colors[category] || '#6c757d';
    };

    return (
        <div className="admin-page">
            <Sidebar />
            <div className="admin-content">
                <div className="page-header">
                    <h1>الموظفون</h1>
                    <p>عرض وإدارة الموظفين حسب التصنيفات المختلفة</p>
                </div>

                <div className="employees-content">
                    <div className="section-header">
                        <div className="search-filter-container">
                            <div className="search-box">
                                <i className="fas fa-search"></i>
                                <input
                                    type="text"
                                    placeholder="البحث عن موظف..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="filter-box">
                                <label>تصنيف الموظف:</label>
                                <select
                                    value={filterCategory}
                                    onChange={(e) => setFilterCategory(e.target.value)}
                                >
                                    {categories.map(category => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="employees-stats">
                        <div className="stat-card">
                            <i className="fas fa-users"></i>
                            <div className="stat-info">
                                <span className="stat-number">{employees.length}</span>
                                <span className="stat-label">إجمالي الموظفين</span>
                            </div>
                        </div>
                        <div className="stat-card">
                            <i className="fas fa-user-check"></i>
                            <div className="stat-info">
                                <span className="stat-number">{employees.filter(emp => emp.active).length}</span>
                                <span className="stat-label">موظف نشط</span>
                            </div>
                        </div>
                        <div className="stat-card">
                            <i className="fas fa-tags"></i>
                            <div className="stat-info">
                                <span className="stat-number">{categories.length - 1}</span>
                                <span className="stat-label">تصنيف</span>
                            </div>
                        </div>
                    </div>

                    <div className="employees-grid">
                        {filteredEmployees.map(employee => (
                            <div key={employee.id} className="employee-card">
                                <div className="employee-header">
                                    <div className="employee-avatar">
                                        <i className="fas fa-user-tie"></i>
                                    </div>
                                    <div className="employee-info">
                                        <h4>{employee.name}</h4>
                                        <span 
                                            className="employee-category"
                                            style={{ backgroundColor: getCategoryColor(employee.category) }}
                                        >
                                            {employee.category}
                                        </span>
                                    </div>
                                    <span 
                                        className="status-indicator"
                                        style={{ backgroundColor: getStatusColor(employee.active) }}
                                        title={employee.active ? 'نشط' : 'معطل'}
                                    ></span>
                                </div>
                                <div className="employee-details">
                                    <div className="detail-row">
                                        <i className="fas fa-envelope"></i>
                                        <span>{employee.email}</span>
                                    </div>
                                    <div className="detail-row">
                                        <i className="fas fa-birthday-cake"></i>
                                        <span>{employee.age} سنة</span>
                                    </div>
                                    <div className="detail-row">
                                        <i className="fas fa-calendar-plus"></i>
                                        <span>انضم في: {employee.createdAt}</span>
                                    </div>
                                    <div className="detail-row">
                                        <i className="fas fa-circle"></i>
                                        <span className={`status-text ${employee.active ? 'active' : 'inactive'}`}>
                                            {employee.active ? 'نشط' : 'معطل'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredEmployees.length === 0 && (
                        <div className="no-employees">
                            <i className="fas fa-user-tie"></i>
                            <p>
                                {searchTerm || filterCategory !== 'الكل'
                                    ? 'لا توجد نتائج للبحث أو الفلتر المحدد'
                                    : 'لا يوجد موظفون مسجلون في النظام'
                                }
                            </p>
                            {!searchTerm && filterCategory === 'الكل' && (
                                <span>يمكن للمدير الرئيسي إضافة موظفين جدد من قسم "إدارة النظام"</span>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmployeesPage;
