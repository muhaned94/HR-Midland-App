// auth.middleware.js - وظيفة التحقق من الـ Token

const jwt = require('jsonwebtoken');

// يجب أن تكون القيمة JWT_SECRET هي نفس القيمة المستخدمة في auth.routes.js
const JWT_SECRET = 'YOUR_SUPER_SECURE_SECRET'; 

const protect = (req, res, next) => {
    let token;

    // 1. البحث عن الـ Token في رأس الطلب (Authorization Header)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // استخراج الـ Token من النص (الذي يكون على شكل "Bearer TOKEN_HERE")
            token = req.headers.authorization.split(' ')[1];

            // 2. التحقق من صحة الـ Token
            const decoded = jwt.verify(token, JWT_SECRET);

            // 3. تخزين معرّف الموظف (ID) في الطلب للاستخدام اللاحق
            req.employeeId = decoded.id; 
            
            next(); // الانتقال إلى دالة المسار (API) المطلوبة

        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: 'غير مصرح به، Token غير صالح.' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'غير مصرح به، لا يوجد Token.' });
    }
};

module.exports = protect;