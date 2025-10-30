// db.js - الاتصال الفعلي بقاعدة بيانات PostgreSQL (إضافة إعدادات SSL للإنتاج)

const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// تحديد إعدادات SSL
// نستخدم SSL إذا كنا في بيئة إنتاج (Railway/Render)
const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // الرابط الذي يوفره Railway
    ssl: isProduction ? {
        // ✅ هذا يحل مشكلة الـ SSL الشائعة في بيئات الإنتاج السحابية
        rejectUnauthorized: false
    } : false, // لا تستخدم SSL في البيئة المحلية
});

/**
 * دالة تنفيذ الاستعلامات
 */
const query = async (text, params) => {
    try {
        console.log('QUERY:', text, params || '');
        const result = await pool.query(text, params);
        return result; 
    } catch (error) {
        console.error('PostgreSQL Error:', error.message);
        throw error;
    }
};

module.exports = {
    query,
};