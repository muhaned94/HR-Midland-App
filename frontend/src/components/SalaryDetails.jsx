// SalaryDetails.jsx - الكود الكامل مع تنسيق الأرقام العربية

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// دالة تنسيق الأرقام باللغة العربية العراقية
const formatNumberArabic = (number) => {
    // التأكد من أن القيمة رقمية قبل التنسيق
    if (typeof number === 'string') {
        number = parseFloat(number.replace(/,/g, ''));
    }
    return number.toLocaleString('ar-IQ'); // 'ar-IQ' يضمن التنسيق العراقي والأرقام العربية
};

const SalaryDetails = ({ employeeId }) => {
    const [salaryData, setSalaryData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSalary = async () => {
            const token = localStorage.getItem('authToken');
            if (!token) return;

            try {
                const response = await axios.get('/api/salary/latest', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setSalaryData(response.data);
                setLoading(false);
            } catch (err) {
                setError('فشل في تحميل تفاصيل الراتب.');
                setLoading(false);
            }
        };

        fetchSalary();
    }, [employeeId]);

    if (loading) { return <p className="loading-message">...جاري تحميل تفاصيل الراتب</p>; }
    if (error) { return <p className="error-message">{error}</p>; }
    if (!salaryData) { return <p>لا تتوفر بيانات للراتب حالياً.</p>; }

    // استخدام الدالة لتنسيق الراتب والمخصصات
    const netSalaryFormatted = formatNumberArabic(salaryData.netSalary.replace(' IQD', ''));
    const allowances = salaryData.allowances;

    return (
        <div className="salary-details" style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <h2 style={{ borderBottom: '2px solid #004d80', paddingBottom: '10px', marginBottom: '20px', color: '#004d80' }}>تفاصيل الراتب</h2>
            
            <div className="salary-info-card" style={{ backgroundColor: '#e9ecef', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                <p style={{ margin: '0 0 10px 0' }}><strong>الشهر والسنة:</strong> {salaryData.monthYear}</p>
                <h3 style={{ margin: 0, color: '#007bff' }}>صافي الراتب: <span className="net-salary-amount">{netSalaryFormatted} IQD</span></h3>
            </div>

            <div className="allowances-section">
                <h4>تفاصيل المخصصات</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {Object.keys(allowances).map((key) => (
                        <li key={key} style={{ padding: '8px 0', borderBottom: '1px dotted #ccc', display: 'flex', justifyContent: 'space-between' }}>
                            <span>{key}:</span>
                            <span style={{ fontWeight: 'bold' }}>{formatNumberArabic(allowances[key])} IQD</span>
                        </li>
                    ))}
                    {Object.keys(allowances).length === 0 && <li>لا توجد مخصصات مفصلة.</li>}
                </ul>
            </div>
        </div>
    );
};

export default SalaryDetails;