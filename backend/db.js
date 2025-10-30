// db.js - الاتصال الفعلي بقاعدة بيانات PostgreSQL (مُعدَّل لـ Railway)

const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// استخدام رابط الاتصال الكامل الذي توفره Railway/Render
// هذا هو أفضل طريقة لضمان التوصيل في بيئات الاستضافة
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString: connectionString,
    // إعداد SSL مطلوب لبيئات الاستضافة السحابية
    ssl: {
        rejectUnauthorized: false
    }
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