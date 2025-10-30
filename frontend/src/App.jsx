// App.jsx

import React, { useState, useEffect } from 'react';
import LoginComponent from './components/LoginComponent'; // استيراد مكون الدخول
import Dashboard from './components/Dashboard'; // سنقوم بإنشاء هذا المكون لاحقًا
import './App.css'; // لملف تنسيق بسيط

function App() {
    // حالة لتتبع ما إذا كان الموظف مسجلاً دخوله
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // التحقق عند تحميل التطبيق: هل يوجد Token مخزن؟
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            // يمكن هنا إضافة خطوة للتحقق من صلاحية الـ Token في الـ Backend
            setIsLoggedIn(true);
        }
    }, []);

    // دالة يتم استدعاؤها عند نجاح تسجيل الدخول من LoginComponent
    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    // دالة لتسجيل الخروج
    const handleLogout = () => {
        localStorage.removeItem('authToken'); // حذف الـ Token
        setIsLoggedIn(false);
    };

    // منطق عرض الواجهة:
    return (
        <div className="app-container">
            {isLoggedIn ? (
                // إذا كان مسجلاً دخوله، اعرض لوحة التحكم
                <Dashboard onLogout={handleLogout} />
            ) : (
                // إذا لم يكن مسجلاً دخوله، اعرض شاشة الدخول
                <LoginComponent onLoginSuccess={handleLoginSuccess} />
            )}
        </div>
    );
}

export default App;