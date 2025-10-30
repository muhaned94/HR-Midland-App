// LoginComponent.jsx - مكون تسجيل الدخول

import React, { useState } from 'react';
import axios from 'axios'; // مكتبة لسهولة إرسال طلبات الـ API

const LoginComponent = ({ onLoginSuccess }) => {
    // حالة لتخزين المُعرف وكلمة المرور
    const [employeeId, setEmployeeId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault(); 
        
        // ✅ استخدام الرابط الحي الكامل (الذي تم تعريفه في vite.config.js)
        const API_BASE_URL = process.env.VITE_API_URL || ''; 
        
        try {
            const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { // <--- التعديل هنا
                employeeId,
                password,
            });

            // إذا نجحت عملية الدخول
            const token = response.data.token;
            // تخزين الـ Token (مثلاً في الذاكرة المحلية)
            localStorage.setItem('authToken', token);
            
            // استدعاء دالة النجاح للانتقال إلى لوحة التحكم
            onLoginSuccess(); 

        } catch (err) {
            // التعامل مع الأخطاء (مثل خطأ في رقم الموظف أو كلمة المرور)
            setError('فشل في تسجيل الدخول. تحقق من بياناتك.');
            console.error(err);
        }
    };

    return (
        <div className="login-container">
            <h1 className="company-name">Midland oil company</h1>
            <h2 className="app-title">Human Resource APP</h2>
            
            <form onSubmit={handleLogin} className="login-form">
                
                {/* حقل رقم الموظف (ID: 112300) */}
                <input
                    type="text"
                    placeholder="رقم الموظف (ID)"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                />

                {/* حقل كلمة المرور */}
                <input
                    type="password"
                    placeholder="كلمة المرور (Password)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {/* عرض رسالة الخطأ */}
                {error && <p className="error-message">{error}</p>}
                
                {/* زر الدخول (Log In) */}
                <button type="submit" className="login-button">
                    Log In
                </button>
            </form>
        </div>
    );
};

export default LoginComponent;