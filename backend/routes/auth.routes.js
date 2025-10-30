// auth.routes.js - الكود الكامل لربط PostgreSQL (استخدام bcrypt)

// ... (بداية الملف)

router.post('/login', async (req, res) => {
    const { employeeId, password } = req.body;

    try {
        // 1. استعلام حقيقي من جدول employees
        const result = await db.query('SELECT id, password_hash, job_title FROM employees WHERE id = $1', [employeeId]);
        const employee = result.rows;

        if (employee.length === 0) {
            return res.status(401).json({ message: 'الموظف غير موجود.' });
        }
        
        const user = employee[0];
        
        // 2. التحقق من كلمة المرور المشفرة (تفعيل الأمان الحقيقي)
        // هذا السطر يجب أن يعمل بما أن الهاش صحيح في قاعدة بيانات Railway
        const isMatch = await bcrypt.compare(password, user.password_hash); 

        if (!isMatch) {
            return res.status(401).json({ message: 'كلمة المرور غير صحيحة.' });
        }

        // 3. إنشاء الـ Token
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