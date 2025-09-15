import React, { useState } from 'react';

const AdminList = () => {
    const [admins, setAdmins] = useState([
        {
            id: 1,
            name: 'د. أحمد محمد',
            email: 'admin@moveclinic.com',
            role: 'مدير العيادة',
            lastLogin: '2025-01-15'
        },
        {
            id: 2,
            name: 'د. فاطمة أحمد',
            email: 'fatma@moveclinic.com',
            role: 'أخصائي علاج طبيعي',
            lastLogin: '2025-01-14'
        }
    ]);

    const [showForm, setShowForm] = useState(false);
    const [newAdmin, setNewAdmin] = useState({
        name: '',
        email: '',
        role: '',
        password: ''
    });

    const handleAddAdmin = (e) => {
        e.preventDefault();
        const admin = {
            id: admins.length + 1,
            ...newAdmin,
            lastLogin: 'لم يسجل دخول بعد'
        };
        setAdmins([...admins, admin]);
        setNewAdmin({ name: '', email: '', role: '', password: '' });
        setShowForm(false);
    };

    const handleDeleteAdmin = (id) => {
        if (window.confirm('هل أنت متأكد من حذف هذا المشرف؟')) {
            setAdmins(admins.filter(admin => admin.id !== id));
        }
    };

    return (
        <div className="admin-list">
            <div className="section-header">
                <h3>قائمة المشرفين</h3>
                <button 
                    className="add-btn"
                    onClick={() => setShowForm(!showForm)}
                >
                    <i className="fas fa-plus"></i>
                    إضافة مشرف جديد
                </button>
            </div>

            {showForm && (
                <div className="admin-form">
                    <h4>إضافة مشرف جديد</h4>
                    <form onSubmit={handleAddAdmin}>
                        <div className="form-row">
                            <input
                                type="text"
                                placeholder="الاسم الكامل"
                                value={newAdmin.name}
                                onChange={(e) => setNewAdmin({...newAdmin, name: e.target.value})}
                                required
                            />
                            <input
                                type="email"
                                placeholder="البريد الإلكتروني"
                                value={newAdmin.email}
                                onChange={(e) => setNewAdmin({...newAdmin, email: e.target.value})}
                                required
                            />
                        </div>
                        <div className="form-row">
                            <select
                                value={newAdmin.role}
                                onChange={(e) => setNewAdmin({...newAdmin, role: e.target.value})}
                                required
                            >
                                <option value="">اختر الدور</option>
                                <option value="مدير العيادة">مدير العيادة</option>
                                <option value="أخصائي علاج طبيعي">أخصائي علاج طبيعي</option>
                                <option value="مساعد إداري">مساعد إداري</option>
                            </select>
                            <input
                                type="password"
                                placeholder="كلمة المرور"
                                value={newAdmin.password}
                                onChange={(e) => setNewAdmin({...newAdmin, password: e.target.value})}
                                required
                            />
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="save-btn">حفظ</button>
                            <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>
                                إلغاء
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="admins-table">
                <table>
                    <thead>
                        <tr>
                            <th>الاسم</th>
                            <th>البريد الإلكتروني</th>
                            <th>الدور</th>
                            <th>آخر تسجيل دخول</th>
                            <th>الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins.map(admin => (
                            <tr key={admin.id}>
                                <td>{admin.name}</td>
                                <td>{admin.email}</td>
                                <td>{admin.role}</td>
                                <td>{admin.lastLogin}</td>
                                <td>
                                    <button className="edit-btn">
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button 
                                        className="delete-btn"
                                        onClick={() => handleDeleteAdmin(admin.id)}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminList;
