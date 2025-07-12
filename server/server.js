// ============================================
// سيرفر Express الرئيسي - بوت WhatsApp للوظائف
// ============================================
// هذا الملف يحتوي على إعدادات السيرفر الرئيسي
// ويقوم بتشغيل بوت WhatsApp مع لوحة التحكم الإدارية
// ============================================

// استيراد الحزم الأساسية
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

// إنشاء تطبيق Express
const app = express();

// تفعيل CORS لقبول الطلبات من أي مكان
app.use(cors());

// إعداد middleware لتفكيك الطلبات
app.use(express.json()); // للطلبات JSON
app.use(express.urlencoded({ extended: true })); // للطلبات من النماذج
app.use(bodyParser.urlencoded({ extended: true })); // للطلبات من النماذج

// إعداد EJS كـ view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../dashboard/views'));

// ربط ملف routes.js على المسار /api
const routes = require('./routes');
app.use('/api', routes);

// ربط لوحة التحكم
const dashboardRoutes = require('../dashboard/routes');
app.use('/dashboard', dashboardRoutes);

// إعداد مجلد dashboard ليكون static frontend (للملفات القديمة)
app.use(express.static(path.join(__dirname, '../dashboard')));

// إعداد المسار الافتراضي للواجهة
app.get('/', (req, res) => {
    res.redirect('/dashboard');
});

// تعريف المنفذ
const PORT = process.env.PORT || 3000;

// تشغيل السيرفر
app.listen(PORT, () => {
    console.log('============================================');
    console.log(`🚀 السيرفر يعمل على المنفذ ${PORT}`);
    console.log(`📱 البوت جاهز للاستخدام`);
    console.log(`🌐 لوحة الإدارة: http://localhost:${PORT}/dashboard`);
    console.log(`🔧 API: http://localhost:${PORT}/api`);
    console.log('============================================');
});

// تشغيل بوت WhatsApp
require('./whatsappBot');
