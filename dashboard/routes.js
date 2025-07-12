// ============================================
// مسارات لوحة التحكم الإدارية
// ============================================
// هذا الملف يحتوي على جميع مسارات لوحة التحكم
// ويوفر واجهة إدارية لإدارة الإعدادات والفئات والوظائف
// ============================================

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const router = express.Router();
const fs = require('fs');

// مسار قاعدة البيانات
const dbPath = path.join(__dirname, '../db/jobs.db');

// الصفحة الرئيسية للوحة التحكم
router.get('/', (req, res) => {
    res.render('dashboard/index');
});

// ============================================
// إدارة الإعدادات
// ============================================

// عرض صفحة الإعدادات
router.get('/settings', (req, res) => {
    const db = new sqlite3.Database(dbPath);
    db.all('SELECT * FROM settings ORDER BY key', (err, settings) => {
        db.close();
        if (err) {
            console.error('❌ خطأ في جلب الإعدادات:', err);
            res.status(500).send('خطأ في جلب الإعدادات');
        } else {
            res.render('dashboard/settings', { settings });
        }
    });
});

// تحديث الإعدادات
router.post('/settings/update', (req, res) => {
    const { key, value } = req.body;

    if (!key || !value) {
        return res.status(400).send('البيانات غير مكتملة');
    }

    const db = new sqlite3.Database(dbPath);
    db.run('UPDATE settings SET value = ? WHERE key = ?', [value, key], function (err) {
        db.close();
        if (err) {
            console.error('❌ خطأ في تحديث الإعداد:', err);
            res.status(500).send('خطأ في تحديث الإعداد');
        } else {
            res.redirect('/dashboard/settings');
        }
    });
});

// ============================================
// إدارة الفئات
// ============================================

// عرض صفحة الفئات
router.get('/categories', (req, res) => {
    const db = new sqlite3.Database(dbPath);
    db.all('SELECT * FROM categories ORDER BY ordering', (err, categories) => {
        db.close();
        if (err) {
            console.error('❌ خطأ في جلب الفئات:', err);
            res.status(500).send('خطأ في جلب الفئات');
        } else {
            res.render('dashboard/categories', { categories });
        }
    });
});

// إضافة فئة جديدة
router.post('/categories/add', (req, res) => {
    const { name, ordering } = req.body;

    if (!name || !ordering) {
        return res.status(400).send('البيانات غير مكتملة');
    }

    const db = new sqlite3.Database(dbPath);
    db.run('INSERT INTO categories (name, ordering) VALUES (?, ?)', [name, ordering], function (err) {
        db.close();
        if (err) {
            console.error('❌ خطأ في إضافة الفئة:', err);
            res.status(500).send('خطأ في إضافة الفئة');
        } else {
            res.redirect('/dashboard/categories');
        }
    });
});

// تحديث فئة
router.post('/categories/update', (req, res) => {
    const { id, name, ordering } = req.body;

    if (!id || !name || !ordering) {
        return res.status(400).send('البيانات غير مكتملة');
    }

    const db = new sqlite3.Database(dbPath);
    db.run('UPDATE categories SET name = ?, ordering = ? WHERE id = ?', [name, ordering, id], function (err) {
        db.close();
        if (err) {
            console.error('❌ خطأ في تحديث الفئة:', err);
            res.status(500).send('خطأ في تحديث الفئة');
        } else {
            res.redirect('/dashboard/categories');
        }
    });
});

// حذف فئة
router.post('/categories/delete', (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).send('معرف الفئة مطلوب');
    }

    const db = new sqlite3.Database(dbPath);
    db.run('DELETE FROM categories WHERE id = ?', [id], function (err) {
        db.close();
        if (err) {
            console.error('❌ خطأ في حذف الفئة:', err);
            res.status(500).send('خطأ في حذف الفئة');
        } else {
            res.redirect('/dashboard/categories');
        }
    });
});

// ============================================
// إدارة الوظائف
// ============================================

// عرض صفحة الوظائف لفئة معينة
router.get('/jobs/:categoryId', (req, res) => {
    const categoryId = req.params.categoryId;

    const db = new sqlite3.Database(dbPath);

    // جلب معلومات الفئة
    db.get('SELECT * FROM categories WHERE id = ?', [categoryId], (err, category) => {
        if (err) {
            db.close();
            console.error('❌ خطأ في جلب الفئة:', err);
            return res.status(500).send('خطأ في جلب الفئة');
        }

        if (!category) {
            db.close();
            return res.status(404).send('الفئة غير موجودة');
        }

        // جلب الوظائف التابعة للفئة
        db.all('SELECT * FROM jobs WHERE category_id = ? ORDER BY id', [categoryId], (err, jobs) => {
            db.close();
            if (err) {
                console.error('❌ خطأ في جلب الوظائف:', err);
                res.status(500).send('خطأ في جلب الوظائف');
            } else {
                res.render('dashboard/jobs', { category, jobs });
            }
        });
    });
});

// إضافة وظيفة جديدة
router.post('/jobs/add', (req, res) => {
    const { category_id, title, url } = req.body;

    if (!category_id || !title || !url) {
        return res.status(400).send('البيانات غير مكتملة');
    }

    const db = new sqlite3.Database(dbPath);
    db.run('INSERT INTO jobs (category_id, title, url) VALUES (?, ?, ?)', [category_id, title, url], function (err) {
        db.close();
        if (err) {
            console.error('❌ خطأ في إضافة الوظيفة:', err);
            res.status(500).send('خطأ في إضافة الوظيفة');
        } else {
            res.redirect(`/dashboard/jobs/${category_id}`);
        }
    });
});

// حذف وظيفة
router.post('/jobs/delete', (req, res) => {
    const { id, category_id } = req.body;

    if (!id || !category_id) {
        return res.status(400).send('معرف الوظيفة والفئة مطلوبان');
    }

    const db = new sqlite3.Database(dbPath);
    db.run('DELETE FROM jobs WHERE id = ?', [id], function (err) {
        db.close();
        if (err) {
            console.error('❌ خطأ في حذف الوظيفة:', err);
            res.status(500).send('خطأ في حذف الوظيفة');
        } else {
            res.redirect(`/dashboard/jobs/${category_id}`);
        }
    });
});

// Endpoint لجلب آخر QR code
router.get('/qr', (req, res) => {
    const qrPath = path.join(__dirname, '../db/last-qr.txt');
    if (fs.existsSync(qrPath)) {
        const qr = fs.readFileSync(qrPath, 'utf8');
        res.json({ qr });
    } else {
        res.json({ qr: null });
    }
});

module.exports = router;
