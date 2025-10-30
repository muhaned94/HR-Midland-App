// hr.routes.js - الكود الكامل لربط PostgreSQL (جلب البيانات)

const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth.middleware');
const db = require('../db'); 

// واجهة جلب ملف الموظف الشخصي
router.get('/employee/profile', protect, async (req, res) => {
    try {
        // استخدام $1 في الاستعلام
        const result = await db.query('SELECT id, full_name, job_title, location FROM employees WHERE id = $1', [req.employeeId]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'بيانات الموظف غير موجودة.' });
        }
        
        const profile = {
            id: result.rows[0].id,
            fullName: result.rows[0].full_name,
            jobTitle: result.rows[0].job_title,
            location: result.rows[0].location,
        };
        
        res.json(profile); 
    } catch (error) {
        console.error('خطأ في جلب الملف الشخصي:', error);
        res.status(500).json({ message: 'خطأ في جلب بيانات الملف الشخصي.' });
    }
});


// واجهة جلب آخر كشف راتب
router.get('/salary/latest', protect, async (req, res) => {
    try {
        // استخدام $1 في الاستعلام
        const result = await db.query(
            'SELECT month_year, net_salary, allowances FROM salaries WHERE employee_id = $1 ORDER BY month_year DESC LIMIT 1', 
            [req.employeeId]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'لا تتوفر بيانات للراتب.' });
        }
        
        const salary = result.rows[0];
        
        const formattedSalary = {
            monthYear: salary.month_year.toISOString().substring(0, 7), 
            netSalary: `${salary.net_salary.toLocaleString()} IQD`, 
            allowances: salary.allowances // PostgreSQL يتعامل مع JSONB بشكل أفضل
        };
        
        res.json(formattedSalary);
        
    } catch (error) {
        console.error('خطأ في جلب بيانات الراتب:', error);
        res.status(500).json({ message: 'خطأ في جلب بيانات الراتب.' });
    }
});


// ... (كرر التعديل لـ leaves/balance, leaves/service-info, courses/list) ...

module.exports = router;