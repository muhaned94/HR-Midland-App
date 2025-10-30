-- 1. جدول الموظفين (employees)
CREATE TABLE employees (
    id VARCHAR(10) PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    job_title VARCHAR(100),
    location VARCHAR(100),
    joining_date DATE NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);

-- 2. جدول الإجازات (leave_balances)
CREATE TABLE leave_balances (
    employee_id VARCHAR(10) PRIMARY KEY REFERENCES employees(id),
    accrued_leave INT DEFAULT 0, -- 190 يوم
    sick_leave INT DEFAULT 0     -- 100 يوم
);

-- 3. جدول الرواتب (salaries)
CREATE TABLE salaries (
    salary_id SERIAL PRIMARY KEY,
    employee_id VARCHAR(10) REFERENCES employees(id),
    net_salary NUMERIC(10, 2), -- 1200000.00
    month_year DATE NOT NULL,
    allowances JSONB
);

-- 4. جدول الدورات (courses)
CREATE TABLE courses (
    course_id SERIAL PRIMARY KEY,
    employee_id VARCHAR(10) REFERENCES employees(id),
    course_name VARCHAR(255) NOT NULL,
    completion_date DATE
);