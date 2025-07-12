// ============================================
// إنشاء قاعدة البيانات وجداولها
// ============================================
// هذا الملف يقوم بإنشاء قاعدة البيانات SQLite
// وإنشاء جميع الجداول المطلوبة مع البيانات الأولية
// ============================================

const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// مسار قاعدة البيانات
const dbPath = path.join(__dirname, 'jobs.db');

// دالة إنشاء قاعدة البيانات
function initializeDatabase() {
    console.log('🚀 بدء إنشاء قاعدة البيانات...');

    // حذف قاعدة البيانات القديمة إذا كانت موجودة
    if (fs.existsSync(dbPath)) {
        fs.unlinkSync(dbPath);
        console.log('🗑️ تم حذف قاعدة البيانات القديمة');
    }

    // إنشاء قاعدة البيانات الجديدة
    const db = new sqlite3.Database(dbPath);

    // تفعيل foreign keys
    db.run('PRAGMA foreign_keys = ON');

    // إنشاء الجداول
    createTables(db);
}

// دالة إنشاء الجداول
function createTables(db) {
    console.log('📋 إنشاء الجداول...');

    // جدول الإعدادات
    db.run(`
        CREATE TABLE settings (
            key TEXT PRIMARY KEY,
            value TEXT NOT NULL
        )
    `, (err) => {
        if (err) {
            console.error('❌ خطأ في إنشاء جدول settings:', err);
        } else {
            console.log('✅ تم إنشاء جدول settings');
        }
    });

    // جدول الفئات
    db.run(`
        CREATE TABLE categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            ordering INTEGER NOT NULL
        )
    `, (err) => {
        if (err) {
            console.error('❌ خطأ في إنشاء جدول categories:', err);
        } else {
            console.log('✅ تم إنشاء جدول categories');
        }
    });

    // جدول الوظائف
    db.run(`
        CREATE TABLE jobs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            url TEXT NOT NULL,
            category_id INTEGER NOT NULL,
            FOREIGN KEY (category_id) REFERENCES categories(id)
        )
    `, (err) => {
        if (err) {
            console.error('❌ خطأ في إنشاء جدول jobs:', err);
        } else {
            console.log('✅ تم إنشاء جدول jobs');
            // إدخال البيانات الأولية بعد إنشاء جميع الجداول
            insertInitialData(db);
        }
    });
}

// دالة إدخال البيانات الأولية
function insertInitialData(db) {
    console.log('📝 بدء إدخال البيانات الأولية...');

    // إدخال الإعدادات أولاً
    insertSettings(db, () => {
        // إدخال الفئات ثانياً
        insertCategories(db, () => {
            // إدخال الوظائف أخيراً
            insertJobs(db, () => {
                // إغلاق قاعدة البيانات
                db.close((err) => {
                    if (err) {
                        console.error('❌ خطأ في إغلاق قاعدة البيانات:', err);
                    } else {
                        console.log('============================================');
                        console.log('🎉 تم إنشاء قاعدة البيانات بنجاح!');
                        console.log(`📁 الموقع: ${dbPath}`);
                        console.log('📊 الجداول المنشأة:');
                        console.log('   - settings (الإعدادات)');
                        console.log('   - categories (الفئات)');
                        console.log('   - jobs (الوظائف)');
                        console.log('============================================');
                    }
                });
            });
        });
    });
}

// دالة إدخال الإعدادات
function insertSettings(db, callback) {
    console.log('📝 إدخال الإعدادات...');

    const settings = [
        ['welcome_message', 'مرحباً! اكتب \'وظائف\' للحصول على قائمة الوظائف المتاحة.'],
        ['invalid_keyword_message', 'الرجاء كتابة كلمة "وظائف" بالشكل الصحيح.'],
        ['menu_header', '📋 قائمة الوظائف المتاحة\nاختر نوع الوظائف:'],
        ['menu_footer', 'ادخل رقم الفئة'],
        ['invalid_selection_message', 'الرجاء إدخال اختيار صحيح.']
    ];

    let completed = 0;
    settings.forEach(([key, value], index) => {
        db.run('INSERT INTO settings (key, value) VALUES (?, ?)', [key, value], (err) => {
            if (err) {
                console.error(`❌ خطأ في إدخال الإعداد ${key}:`, err);
            } else {
                console.log(`✅ تم إدخال الإعداد: ${key}`);
            }
            completed++;
            if (completed === settings.length) {
                console.log('✅ تم إدخال جميع الإعدادات');
                callback();
            }
        });
    });
}

// دالة إدخال الفئات
function insertCategories(db, callback) {
    console.log('📝 إدخال الفئات...');

    const categories = [
        [1, 'وظائف عسكرية', 1],
        [2, 'وظائف مدنية', 2],
        [3, 'وظائف طبية', 3],
        [4, 'وظائف شركات', 4],
        [5, 'وظائف للمقيمين', 5],
        [6, 'وظائف حسب المدينة', 6]
    ];

    let completed = 0;
    categories.forEach(([id, name, ordering], index) => {
        db.run('INSERT INTO categories (id, name, ordering) VALUES (?, ?, ?)', [id, name, ordering], (err) => {
            if (err) {
                console.error(`❌ خطأ في إدخال الفئة ${name}:`, err);
            } else {
                console.log(`✅ تم إدخال الفئة: ${name} (ID: ${id})`);
            }
            completed++;
            if (completed === categories.length) {
                console.log('✅ تم إدخال جميع الفئات');
                callback();
            }
        });
    });
}

// دالة إدخال الوظائف
function insertJobs(db, callback) {
    console.log('📝 إدخال الوظائف التجريبية...');

    const jobs = [
        // وظائف عسكرية (category_id = 1)
        ['ضابط في الجيش السعودي', 'https://example.com/military1', 1],
        ['جندي في الحرس الوطني', 'https://example.com/military2', 1],

        // وظائف مدنية (category_id = 2)
        ['موظف حكومي في وزارة التعليم', 'https://example.com/civil1', 2],
        ['محقق في وزارة الداخلية', 'https://example.com/civil2', 2],

        // وظائف طبية (category_id = 3)
        ['طبيب في مستشفى حكومي', 'https://example.com/medical1', 3],
        ['ممرض في مركز صحي', 'https://example.com/medical2', 3],

        // وظائف شركات (category_id = 4)
        ['مهندس برمجيات في أرامكو', 'https://example.com/company1', 4],
        ['محلل مالي في سابك', 'https://example.com/company2', 4],

        // وظائف للمقيمين (category_id = 5)
        ['سائق في شركة نقل', 'https://example.com/resident1', 5],
        ['عامل في مصنع', 'https://example.com/resident2', 5],

        // وظائف حسب المدينة (category_id = 6)
        ['وظائف في الرياض', 'https://example.com/city1', 6],
        ['وظائف في جدة', 'https://example.com/city2', 6]
    ];

    let completed = 0;
    jobs.forEach(([title, url, category_id], index) => {
        db.run('INSERT INTO jobs (title, url, category_id) VALUES (?, ?, ?)', [title, url, category_id], (err) => {
            if (err) {
                console.error(`❌ خطأ في إدخال الوظيفة ${title}:`, err);
            } else {
                console.log(`✅ تم إدخال الوظيفة: ${title} (الفئة: ${category_id})`);
            }
            completed++;
            if (completed === jobs.length) {
                console.log('✅ تم إدخال جميع الوظائف التجريبية');
                callback();
            }
        });
    });
}

// تشغيل إنشاء قاعدة البيانات إذا تم تشغيل الملف مباشرة
if (require.main === module) {
    initializeDatabase();
}

// تصدير الدوال للاستخدام في ملفات أخرى
module.exports = {
    initializeDatabase,
    dbPath
};
