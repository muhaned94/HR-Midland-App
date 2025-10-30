// db.js - الاتصال الفعلي بقاعدة بيانات MySQL

const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

// إنشاء Pool (مجمع اتصال) باستخدام متغيرات البيئة
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

/**
 * دالة تنفيذ الاستعلامات
 * @param {string} text - عبارة SQL
 * @param {Array} params - المعاملات (مثل رقم الموظف)
 * @returns {Promise} - وعد بنتيجة الاستعلام بصيغة { rows }
 */
const query = async (text, params) => {
    try {
        console.log('QUERY:', text, params || '');
        const [rows] = await pool.execute(text, params);
        return { rows }; // إرجاع النتائج بصيغة متوافقة مع جميع ملفات Routes
    } catch (error) {
        console.error('MySQL Error:', error.message);
        throw error;
    }
};

module.exports = {
    query,
};