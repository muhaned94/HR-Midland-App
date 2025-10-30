// CoursesDetails.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CoursesDetails = ({ employeeId }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            const token = localStorage.getItem('authToken');
            if (!token) return;

            try {
                // الطلب إلى واجهة الـ API لجلب قائمة الدورات
                // نستخدم واجهة /api/courses/list التي صممناها سابقاً
                const response = await axios.get('/api/courses/list', {
                    headers: {
                        Authorization: `Bearer ${token}` // إرسال الـ Token للتفويض
                    }
                });

                // نفترض أن البيانات ترجع كمصفوفة من الكائنات
                setCourses(response.data); 
                setLoading(false);
            } catch (err) {
                setError('فشل في تحميل سجل الدورات التدريبية.');
                setLoading(false);
            }
        };

        fetchCourses();
    }, [employeeId]);

    if (loading) {
        return <p className="loading-message">...جاري تحميل الدورات</p>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <div className="courses-details">
            <h2>سجل الدورات التدريبية</h2>
            
            {courses.length > 0 ? (
                <ul className="courses-list">
                    {courses.map((course, index) => (
                        <li key={index} className="course-item">
                            <span className="course-name">
                                {course.name || 'اسم الدورة غير متوفر'} 
                            </span>
                            <span className="course-date">
                                - {course.completionDate || '2024/2/5'}
                            </span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>لا توجد دورات مسجلة لهذا الموظف حالياً.</p>
            )}

            {/* عرض أمثلة من المخطط في حال عدم وجود بيانات حقيقية */}
            {courses.length === 0 && (
                <div className="mock-courses">
                    <h4>أمثلة من المخطط:</h4>
                    <p>دورة مايكروسوفت القبل - 2024/2/5</p>
                    <p>دورة اللغة الإنكليزية - 2024/2/5</p>
                </div>
            )}
        </div>
    );
};

export default CoursesDetails;