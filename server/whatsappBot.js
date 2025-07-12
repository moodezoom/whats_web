// ============================================
// بوت WhatsApp Web
// ============================================

// استيراد المكتبات المطلوبة
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const qrPath = require('path').join(__dirname, '../db/last-qr.txt');

// استيراد معالج الرسائل الذكي
const { handleMessage } = require('../bot/messageHandler');

// تهيئة عميل WhatsApp جديد
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// عند بدء التشغيل - طباعة رمز QR
client.on('qr', (qr) => {
    console.log('============================================');
    console.log('📱 رمز QR للاتصال بـ WhatsApp Web:');
    console.log('============================================');
    qrcode.generate(qr, { small: true });
    console.log('============================================');
    console.log('🔍 امسح الرمز باستخدام تطبيق WhatsApp');
    console.log('============================================');
    // حفظ رمز QR في ملف نصي
    try {
        fs.writeFileSync(qrPath, qr, 'utf8');
    } catch (e) {
        console.error('❌ خطأ في حفظ رمز QR:', e);
    }
});

// عند الاتصال بنجاح
client.on('ready', () => {
    console.log('============================================');
    console.log('✅ تم الاتصال بنجاح!');
    console.log('🤖 البوت جاهز لاستقبال الرسائل');
    console.log('📋 يمكن للمستخدمين كتابة "وظائف" للحصول على المساعدة');
    console.log('============================================');
    // حذف رمز QR من الملف عند الاتصال
    try {
        if (fs.existsSync(qrPath)) fs.unlinkSync(qrPath);
    } catch (e) {
        console.error('❌ خطأ في حذف رمز QR:', e);
    }
});

// عند استقبال رسالة جديدة
client.on('message', (message) => {
    // طباعة معلومات الرسالة في الطرفية
    console.log('============================================');
    console.log('📨 رسالة جديدة:');
    console.log(`👤 المرسل: ${message.from}`);
    console.log(`📝 النص: ${message.body}`);
    console.log(`⏰ الوقت: ${message.timestamp}`);
    console.log('============================================');

    // استخدام معالج الرسائل الذكي
    handleMessage(client, message);
});

// عند حدوث خطأ
client.on('auth_failure', (msg) => {
    console.log('❌ فشل في المصادقة:', msg);
});

client.on('disconnected', (reason) => {
    console.log('❌ تم قطع الاتصال:', reason);
});

// بدء تشغيل البوت
console.log('🚀 بدء تشغيل بوت WhatsApp...');
client.initialize();

// تصدير العميل للاستخدام في ملفات أخرى
module.exports = client;
