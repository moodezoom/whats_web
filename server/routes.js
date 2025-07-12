// ============================================
// تعريف مسارات API
// ============================================

// استيراد express وإنشاء router
const express = require('express');
const router = express.Router();

// مسار اختباري للتأكد من عمل السيرفر
router.get('/ping', (req, res) => {
    res.json({
        message: 'pong',
        timestamp: new Date().toISOString(),
        status: 'success'
    });
});

// تصدير router للاستخدام في server.js
module.exports = router;
