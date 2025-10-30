// auth.routes.js - الكود المُعدَّل لإلغاء الحماية والتشفير (لغرض الاختبار)

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../db'); 
const dotenv = require('dotenv');

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'YOUR_SUPER_SECURE_SECRET';

router.post('/login', async (req, res) => {
    const { employeeId, password } = req.body;

    try {
        // 1. استعلام حقيقي من جدول employees
        const result = await db.query('SELECT id, password_hash, job_title FROM employees WHERE id = $1', [employeeId]);
        const employee = result.rows;

        if (employee.length === 0) {
            // فشل: إذا لم يتم العثور على الموظف
            return res.status(401).json({ message: 'الموظف غير موجود.' });
        }
        
        const user = employee[0];
        
        // *******************************************************
        // ********* إلغاء حماية كلمة المرور هنا ***********
        // ********* (لغرض اختبار الموقع الحي فقط) *********
        // *******************************************************
        
        // ✅ القبول إذا كانت كلمة المرور هي 'testpassword' بغض النظر عن الهاش
        const isMatch = (password === 'testpassword'); 
        
        // *******************************************************
        
        if (!isMatch) {
            return res.status(401).json({ message: 'كلمة المرور غير صحيحة.' });
        }

        // 3. إنشاء الـ Token (في حال نجاح الدخول)
        const token = jwt.sign(
            { id: user.id, jobTitle: user.job_title },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({ message: 'تم تسجيل الدخول بنجاح', token });

    } catch (error) {
        console.error('خطأ في عملية تسجيل الدخول:', error);
        res.status(500).json({ message: 'حدث خطأ داخلي في الخادم.' });
    }
});

module.exports = router;