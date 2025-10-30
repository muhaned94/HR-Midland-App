// server.js - ملف الخادم الرئيسي

const express = require('express');
const cors = require('cors'); // للتعامل مع الاتصال بين الـ Frontend والـ Backend
const dotenv = require('dotenv'); // لإدارة متغيرات البيئة (مثل المنفذ)

// استيراد ملفات المسارات التي برمجناها
const authRoutes = require('./routes/auth.routes');
const hrRoutes = require('./routes/hr.routes');

// تهيئة متغيرات البيئة
dotenv.config();

const app = express();

// استخدام Middleware
// للسماح للواجهة الأمامية بالاتصال (ضروري في بيئة التطوير)
app.use(cors()); 

// لتحليل بيانات JSON المرسلة في الطلبات (مثل ID و Password)
app.use(express.json()); 

// ==========================================================
// ربط المسارات (Routes)
// ==========================================================

// مسارات المصادقة (تسجيل الدخول)
app.use('/api/auth', authRoutes);

// مسارات الموارد البشرية (الراتب، الإجازات، الدورات)
app.use('/api', hrRoutes);


// ==========================================================
// تشغيل الخادم
// ==========================================================

// تحديد المنفذ (عادة 5000 للـ Backend، و 3000 للـ Frontend)
const PORT = process.env.PORT || 5000; 

app.listen(PORT, () => {
    console.log(`✅ الخادم يعمل على المنفذ: http://localhost:${PORT}`);
    console.log(`Backend Ready for Midland oil company HR App`);
});