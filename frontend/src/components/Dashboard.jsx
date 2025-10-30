// Dashboard.jsx - الكود الكامل للتصميم المتطور والمتجاوب

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SalaryDetails from './SalaryDetails'; 
import LeaveDetails from './LeaveDetails';
import CoursesDetails from './CoursesDetails';
import { FaSignOutAlt, FaMoneyBillWave, FaCalendarAlt, FaGraduationCap, FaUserCircle } from 'react-icons/fa'; // افتراض استخدام مكتبة أيقونات (يجب تثبيتها: npm install react-icons)

// دالة وهمية لربط الموظف بصورة (للتطبيق حاليًا)
const getProfileImage = (id) => {
    // يمكن استبدال هذا برابط API لجلب الصورة الحقيقية
    switch(id) {
        case '112300': return 'https://i.ibb.co/X8gP7kS/male-engineer.jpg'; // مثال لمهندس
        case '112301': return 'https://i.ibb.co/VMy45tV/safety-officer.jpg'; // مثال
        case '112302': return 'https://i.ibb.co/N1kM7H2/hr-specialist.jpg'; // مثال
        default: return 'https://i.ibb.co/K5m5R9L/default-profile.jpg';
    }
}

const Dashboard = ({ onLogout }) => {
    const [profile, setProfile] = useState(null); 
    const [leaveBalance, setLeaveBalance] = useState(null); 
    const [serviceInfo, setServiceInfo] = useState(null);   
    const [currentView, setCurrentView] = useState('main'); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ... (منطق جلب البيانات في useEffect يبقى كما هو) ...
    useEffect(() => {
        const fetchAllData = async () => {
            const token = localStorage.getItem('authToken');
            if (!token) { onLogout(); return; }

            const config = { headers: { Authorization: `Bearer ${token}` } };
            
            try {
                // تنفيذ 3 طلبات API متزامنة
                const [profileRes, balanceRes, serviceRes] = await Promise.all([
                    axios.get('/api/employee/profile', config),
                    axios.get('/api/leaves/balance', config),
                    axios.get('/api/leaves/service-info', config)
                ]);

                setProfile(profileRes.data);
                setLeaveBalance(balanceRes.data);
                setServiceInfo(serviceRes.data);
                
                setLoading(false);

            } catch (err) {
                setError('فشل في تحميل البيانات الأساسية. (تحقق من سيرفر الـ Backend)');
                if (err.response && err.response.status === 401) { onLogout(); }
                setLoading(false);
            }
        };
        fetchAllData();
    }, [onLogout]);

    if (loading) {
        return <div className="loading-message">...جاري التحميل</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    // ----------------------------------------------------------------
    // دالة عرض الواجهة الرئيسية
    // ----------------------------------------------------------------
    const renderMainDashboard = () => (
        <div className="dashboard-content" style={{ 
            padding: '20px', 
            maxWidth: '1200px', 
            margin: '0 auto', 
            fontFamily: 'Tajawal, Arial, sans-serif', // استخدام خط ثقافي
            minHeight: '100vh', 
            backgroundColor: '#f8f9fa' // خلفية فاتحة
        }}>
            
            {/* الشريط العلوي مع زر تسجيل الخروج (الأعلى جداً) */}
            <header style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '10px 0', 
                borderBottom: '4px solid #004d80', // لون زيتي (نفطي) عميق
                marginBottom: '30px' 
            }}>
                <h1 className="company-header" style={{ color: '#004d80', fontSize: '1.8rem' }}>Midland oil company</h1>
                <button 
                    onClick={onLogout} 
                    style={{ 
                        background: 'transparent', 
                        color: '#dc3545', 
                        border: '1px solid #dc3545', 
                        padding: '8px 15px', 
                        borderRadius: '5px', 
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <FaSignOutAlt style={{ marginLeft: '5px' }} /> تسجيل الخروج 
                </button> 
            </header>
            
            {/* بطاقة معلومات الموظف (تطور وثقافة) */}
            <div className="profile-card" style={{ 
                background: 'linear-gradient(135deg, #004d80 0%, #0066a1 100%)', // تدرج لوني زيتي
                color: 'white',
                padding: '30px', 
                borderRadius: '12px', 
                boxShadow: '0 8px 16px rgba(0, 77, 128, 0.4)', 
                marginBottom: '30px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px'
            }}>
                {/* الصورة الشخصية */}
                <img 
                    src={getProfileImage(profile.id)} 
                    alt="صورة الموظف" 
                    style={{ 
                        width: '90px', 
                        height: '90px', 
                        borderRadius: '50%', 
                        border: '4px solid #ffc107', // إطار ذهبي (ثقافي)
                        objectFit: 'cover'
                    }} 
                />
                
                <div style={{ flexGrow: 1 }}>
                    <h2 style={{ margin: 0 }}>مرحباً بك، {profile.fullName}</h2>
                    <p style={{ margin: '5px 0 0', opacity: 0.9 }}>{profile.jobTitle} - ID: {profile.id}</p>
                    <p style={{ margin: '5px 0 0', opacity: 0.7 }}>الموقع: {profile.location}</p>
                </div>
            </div>

            {/* بطاقات البيانات الإحصائية */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                
                {/* بطاقة سنوات الخدمة */}
                <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderLeft: '5px solid #007bff' }}>
                    <p style={{ color: '#007bff', margin: 0, fontWeight: 'bold' }}>إجمالي سنوات الخدمة</p>
                    <h3 style={{ margin: '10px 0 0' }}>{serviceInfo?.yearsOfService || 'غير متوفر'}</h3>
                </div>

                {/* بطاقة رصيد الإجازات */}
                <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderLeft: '5px solid #28a745' }}>
                    <p style={{ color: '#28a745', margin: 0, fontWeight: 'bold' }}>رصيد الإجازات الاعتيادية</p>
                    <h3 style={{ margin: '10px 0 0' }}>{leaveBalance?.accruedLeave || 'غير متوفر'}</h3>
                </div>

                 {/* بطاقة الراتب الأخير (مؤقت) */}
                <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderLeft: '5px solid #ffc107' }}>
                    <p style={{ color: '#ffc107', margin: 0, fontWeight: 'bold' }}>صافي الراتب الأخير</p>
                    <h3 style={{ margin: '10px 0 0' }}>{/* يجب جلب هذه القيمة من API الراتب */} 1,200,000 IQD</h3>
                </div>
            </div>


            {/* أزرار الخدمات الرئيسية */}
            <h2 style={{ color: '#333', borderBottom: '2px solid #ccc', paddingBottom: '10px', marginBottom: '20px' }}>الخدمات المتاحة</h2>
            <div className="service-buttons" style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '20px' 
            }}>
                
                <button onClick={() => setCurrentView('leave')} style={serviceButtonStyle('#007bff', FaCalendarAlt)}>
                    <FaCalendarAlt size={24} style={{ marginBottom: '8px' }}/> الخدمة والإجازات
                </button>
                
                <button onClick={() => setCurrentView('courses')} style={serviceButtonStyle('#28a745', FaGraduationCap)}>
                    <FaGraduationCap size={24} style={{ marginBottom: '8px' }}/> الدورات التدريبية
                </button>
                
                <button onClick={() => setCurrentView('salary')} style={serviceButtonStyle('#ffc107', FaMoneyBillWave)}>
                    <FaMoneyBillWave size={24} style={{ marginBottom: '8px' }}/> تفاصيل الراتب
                </button>
            </div>
        </div>
    );
    
    // دالة لتنسيق أزرار الخدمات
    const serviceButtonStyle = (color, Icon) => ({
        padding: '20px', 
        backgroundColor: 'white', 
        color: color, 
        border: `2px solid ${color}`, 
        borderRadius: '8px', 
        cursor: 'pointer', 
        fontSize: '16px',
        fontWeight: 'bold',
        transition: 'all 0.3s',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    });

    // دالة لتغليف عرض المكونات الفرعية
    const renderSubView = (Component) => (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
            <button onClick={() => setCurrentView('main')} style={{ marginBottom: '20px', padding: '10px 15px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                العودة إلى لوحة التحكم
            </button>
            <Component employeeId={profile.id} />
        </div>
    );

    switch (currentView) {
        case 'main': return renderMainDashboard();
        case 'salary': return renderSubView(SalaryDetails);
        case 'leave': return renderSubView(LeaveDetails);
        case 'courses': return renderSubView(CoursesDetails);
        default: return renderMainDashboard();
    }
};

export default Dashboard;