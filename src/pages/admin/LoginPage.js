import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a1a 0%, #333 100%);
  padding: 2rem;
`;

const LoginCard = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  width: 100%;
  max-width: 400px;
`;

const BackButton = styled(Link)`
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  padding: 10px 15px;
  border-radius: 25px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background: #0056b3;
  }
`;

const ErrorText = styled.p`
  color: #dc3545;
  margin-bottom: 1rem;
  text-align: center;
`;

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        
        // Predefined Super Admin account
        const SUPER_ADMIN = {
            email: 'superadmin@moveclinic.com',
            password: 'SuperAdmin123!',
            role: 'Super Admin',
            name: 'مدير النظام الرئيسي'
        };
        
        // Get users added by Super Admin from localStorage
        const addedUsers = JSON.parse(localStorage.getItem('clinicUsers') || '[]');
        
        // Check if it's the Super Admin
        if (email === SUPER_ADMIN.email && password === SUPER_ADMIN.password) {
            localStorage.setItem('isAdminLoggedIn', 'true');
            localStorage.setItem('currentUser', JSON.stringify(SUPER_ADMIN));
            navigate('/admin/dashboard');
        }
        // Check if it's a user added by Super Admin
        else {
            const user = addedUsers.find(u => u.email === email && u.password === password && u.active);
            if (user) {
                localStorage.setItem('isAdminLoggedIn', 'true');
                localStorage.setItem('currentUser', JSON.stringify(user));
                navigate('/admin/dashboard');
            } else {
                setError('بيانات تسجيل الدخول غير صحيحة أو الحساب غير مفعل');
            }
        }
    };

    return (
        <LoginContainer>
            <BackButton to="/">
                <i className="fas fa-arrow-right"></i>
                العودة للموقع الرئيسي
            </BackButton>
            <LoginCard>
                <h2 style={{textAlign: 'center', marginBottom: '1rem', color: '#333'}}>
                    تسجيل دخول الإدارة
                </h2>
                <div style={{textAlign: 'center', marginBottom: '2rem', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '5px', fontSize: '14px', color: '#666'}}>
                    <strong>Super Admin:</strong> superadmin@moveclinic.com / SuperAdmin123!
                </div>
                {error && <ErrorText>{error}</ErrorText>}
                <form onSubmit={handleLogin}>
                    <FormGroup>
                        <label htmlFor="email" style={{display: 'block', marginBottom: '0.5rem', fontWeight: '500'}}>
                            البريد الإلكتروني:
                        </label>
                        <Input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@moveclinic.com"
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="password" style={{display: 'block', marginBottom: '0.5rem', fontWeight: '500'}}>
                            كلمة المرور:
                        </label>
                        <Input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </FormGroup>
                    <Button type="submit">دخول</Button>
                </form>
            </LoginCard>
        </LoginContainer>
    );
};

export default LoginPage;
