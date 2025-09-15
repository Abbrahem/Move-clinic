import React, { useState, useEffect } from 'react';

const ManagePage = () => {
    const [users, setUsers] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [newUser, setNewUser] = useState({
        name: '',
        age: '',
        email: '',
        password: '',
        role: 'Doctor'
    });

    useEffect(() => {
        // Load users from localStorage
        const savedUsers = JSON.parse(localStorage.getItem('clinicUsers') || '[]');
        setUsers(savedUsers);
    }, []);

    const saveUsers = (updatedUsers) => {
        localStorage.setItem('clinicUsers', JSON.stringify(updatedUsers));
        setUsers(updatedUsers);
    };

    const handleAddUser = (e) => {
        e.preventDefault();
        const user = {
            id: Date.now(),
            ...newUser,
            age: parseInt(newUser.age),
            active: true,
            createdAt: new Date().toISOString().split('T')[0]
        };
        
        const updatedUsers = [...users, user];
        saveUsers(updatedUsers);
        setNewUser({ name: '', age: '', email: '', password: '', role: 'Doctor' });
        setShowAddForm(false);
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        setNewUser({
            name: user.name,
            age: user.age.toString(),
            email: user.email,
            password: user.password,
            role: user.role
        });
        setShowAddForm(true);
    };

    const handleUpdateUser = (e) => {
        e.preventDefault();
        const updatedUsers = users.map(user => 
            user.id === editingUser.id 
                ? { ...user, ...newUser, age: parseInt(newUser.age) }
                : user
        );
        saveUsers(updatedUsers);
        setEditingUser(null);
        setNewUser({ name: '', age: '', email: '', password: '', role: 'Doctor' });
        setShowAddForm(false);
    };

    const handleDeleteUser = (userId) => {
        if (window.confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
            const updatedUsers = users.filter(user => user.id !== userId);
            saveUsers(updatedUsers);
        }
    };

    const handleToggleActive = (userId) => {
        const updatedUsers = users.map(user => 
            user.id === userId ? { ...user, active: !user.active } : user
        );
        saveUsers(updatedUsers);
    };

    const cancelForm = () => {
        setShowAddForm(false);
        setEditingUser(null);
        setNewUser({ name: '', age: '', email: '', password: '', role: 'Doctor' });
    };

    return (
        <div className="manage-page">
            <div className="page-header">
                <h1>إدارة النظام</h1>
                <p>إدارة المستخدمين والصلاحيات - متاح للمدير الرئيسي فقط</p>
            </div>

            <div className="manage-content">
                <div className="section-header">
                    <h2>قائمة المستخدمين</h2>
                    <button 
                        className="add-btn"
                        onClick={() => setShowAddForm(true)}
                    >
                        <i className="fas fa-plus"></i>
                        إضافة مستخدم جديد
                    </button>
                </div>

                {showAddForm && (
                    <div className="user-form-container">
                        <div className="user-form">
                            <h3>{editingUser ? 'تعديل المستخدم' : 'إضافة مستخدم جديد'}</h3>
                            <form onSubmit={editingUser ? handleUpdateUser : handleAddUser}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>الاسم الكامل</label>
                                        <input
                                            type="text"
                                            value={newUser.name}
                                            onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>العمر</label>
                                        <input
                                            type="number"
                                            value={newUser.age}
                                            onChange={(e) => setNewUser({...newUser, age: e.target.value})}
                                            required
                                            min="18"
                                            max="70"
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>البريد الإلكتروني</label>
                                        <input
                                            type="email"
                                            value={newUser.email}
                                            onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>كلمة المرور</label>
                                        <input
                                            type="password"
                                            value={newUser.password}
                                            onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                                            required
                                            minLength="6"
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>الدور الوظيفي</label>
                                        <select
                                            value={newUser.role}
                                            onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                                            required
                                        >
                                            <option value="Doctor">طبيب</option>
                                            <option value="Nurse">ممرض/ممرضة</option>
                                            <option value="Employee">موظف</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-actions">
                                    <button type="submit" className="save-btn">
                                        {editingUser ? 'تحديث' : 'إضافة'}
                                    </button>
                                    <button type="button" className="cancel-btn" onClick={cancelForm}>
                                        إلغاء
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <div className="users-table-container">
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>الاسم</th>
                                <th>العمر</th>
                                <th>البريد الإلكتروني</th>
                                <th>كلمة المرور</th>
                                <th>الدور</th>
                                <th>الحالة</th>
                                <th>تاريخ الإضافة</th>
                                <th>الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id} className={!user.active ? 'inactive-user' : ''}>
                                    <td>{user.name}</td>
                                    <td>{user.age}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <span className="password-field">
                                            {'•'.repeat(user.password.length)}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`role-badge role-${user.role.toLowerCase()}`}>
                                            {user.role === 'Doctor' ? 'طبيب' : 
                                             user.role === 'Nurse' ? 'ممرض/ممرضة' : 'موظف'}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${user.active ? 'active' : 'inactive'}`}>
                                            {user.active ? 'نشط' : 'معطل'}
                                        </span>
                                    </td>
                                    <td>{user.createdAt}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button 
                                                className="edit-btn"
                                                onClick={() => handleEditUser(user)}
                                                title="تعديل"
                                            >
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button 
                                                className={`toggle-btn ${user.active ? 'deactivate' : 'activate'}`}
                                                onClick={() => handleToggleActive(user.id)}
                                                title={user.active ? 'تعطيل' : 'تفعيل'}
                                            >
                                                <i className={`fas ${user.active ? 'fa-ban' : 'fa-check'}`}></i>
                                            </button>
                                            <button 
                                                className="delete-btn"
                                                onClick={() => handleDeleteUser(user.id)}
                                                title="حذف"
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {users.length === 0 && (
                        <div className="no-users">
                            <i className="fas fa-users"></i>
                            <p>لا يوجد مستخدمون مضافون بعد</p>
                            <span>قم بإضافة المستخدمين الجدد من الزر أعلاه</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManagePage;
