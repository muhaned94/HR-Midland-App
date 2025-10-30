// LeaveDetails.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LeaveDetails = ({ employeeId }) => {
    const [leaveData, setLeaveData] = useState(null);
    const [serviceInfo, setServiceInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeaveData = async () => {
            const token = localStorage.getItem('authToken');
            if (!token) return;

            // إعداد رؤوس الطلب (Headers) لإرسال الـ Token
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            try {
                // 1. جلب رصيد الإجازات
                const leaveResponse = await axios.get('/api/leaves/balance', config);
                setLeaveData(leaveResponse.data);

                // 2. جلب معلومات الخدمة
                const serviceResponse = await axios.get('/api/leaves/service-info', config);
                setServiceInfo(serviceResponse.data);

                setLoading(false);
            } catch (err) {
                setError('فشل في تحميل تفاصيل الإجازات والخدمة.');
                setLoading(false);
            }
        };

        fetchLeaveData();
    }, [employeeId]);

    if (loading) {
        return <p className="loading-message">...جاري تحميل بيانات الخدمة والإجازات</p>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    // عرض الواجهة بناءً على البيانات المستلمة
    return (
        <div className="leave-details">
            <h2>الخدمة والإجازات</h2>
            
            {/* عرض سنوات الخدمة (بناءً على المخطط) */}
            <div className="service-info-card">
                <h4>سنوات الخدمة</h4>
                <p className="service-years">
                    {serviceInfo?.yearsOfService || '5 سنوات وشهر و 3 يوم'} 
                </p>
            </div>

            {/* عرض أرصدة الإجازات (بناءً على المخطط) */}
            <div className="leave-balance-section">
                <h4>رصيد الإجازات المتبقي</h4>
                
                {/* رصيد الإجازات الاعتيادية */}
                <div className="balance-item">
                    <span>رصيد الأجازات الاعتيادية:</span>
                    <span className="balance-count">
                        {leaveData?.accruedLeave || '190 يوم'}
                    </span>
                </div>

                {/* رصيد الإجازات المرضية */}
                <div className="balance-item">
                    <span>رصيد الإجازات المرضية:</span>
                    <span className="balance-count">
                        {leaveData?.sickLeave || '100 يوم'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default LeaveDetails;