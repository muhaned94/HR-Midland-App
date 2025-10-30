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
        // ... (جلب بيانات الموظف) ...
        const user = employee[0];
        
        // ✅ إعادة تفعيل المقارنة الأمنية الحقيقية
        const isMatch = await bcrypt.compare(password, user.password_hash); 

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