// ============================================
// معالج الرسائل الذكي مع قاعدة البيانات
// ============================================
// هذا الملف يحتوي على المنطق الرئيسي لمعالجة رسائل WhatsApp
// ويتعامل مع قاعدة البيانات لجلب المعلومات الديناميكية
// يدعم الأرقام العربية والإنجليزية
// ============================================

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// كائن لتخزين جلسات المستخدمين في الذاكرة
const inMemorySessions = {};

// مسار قاعدة البيانات
const dbPath = path.join(__dirname, '../db/jobs.db');

// دالة لإنشاء جلسة جديدة
function createSession(senderId) {
    inMemorySessions[senderId] = {
        phase: 'INIT',
        createdAt: new Date()
    };
    return inMemorySessions[senderId];
}

// دالة للحصول على جلسة المستخدم
function getSession(senderId) {
    return inMemorySessions[senderId];
}

// دالة لحذف جلسة المستخدم
function deleteSession(senderId) {
    delete inMemorySessions[senderId];
}

// دالة للحصول على رسالة من جدول الإعدادات
function getSetting(key, callback) {
    const db = new sqlite3.Database(dbPath);
    db.get('SELECT value FROM settings WHERE key = ?', [key], (err, row) => {
        db.close();
        if (err) {
            console.error(`❌ خطأ في جلب الإعداد ${key}:`, err);
            callback(null);
        } else if (row) {
            callback(row.value);
        } else {
            console.error(`❌ لم يتم العثور على الإعداد: ${key}`);
            callback(null);
        }
    });
}

// دالة للحصول على قائمة الفئات
function getCategories(callback) {
    const db = new sqlite3.Database(dbPath);
    db.all('SELECT id, name FROM categories ORDER BY ordering', (err, rows) => {
        db.close();
        if (err) {
            console.error('❌ خطأ في جلب الفئات:', err);
            callback(null);
        } else {
            callback(rows);
        }
    });
}

// دالة للحصول على الوظائف حسب الفئة
function getJobsByCategory(categoryId, callback) {
    const db = new sqlite3.Database(dbPath);
    db.all('SELECT title, url FROM jobs WHERE category_id = ?', [categoryId], (err, rows) => {
        db.close();
        if (err) {
            console.error(`❌ خطأ في جلب الوظائف للفئة ${categoryId}:`, err);
            callback(null);
        } else {
            callback(rows);
        }
    });
}

// دالة للحصول على اسم الفئة
function getCategoryName(categoryId, callback) {
    const db = new sqlite3.Database(dbPath);
    db.get('SELECT name FROM categories WHERE id = ?', [categoryId], (err, row) => {
        db.close();
        if (err) {
            console.error(`❌ خطأ في جلب اسم الفئة ${categoryId}:`, err);
            callback(null);
        } else if (row) {
            callback(row.name);
        } else {
            callback(null);
        }
    });
}

// دالة لمعالجة الرسائل الواردة
function handleMessage(client, message) {
    const senderId = message.from;
    const msgBody = message.body.trim();

    console.log(`📨 رسالة من ${senderId}: ${msgBody}`);

    // الحصول على جلسة المستخدم أو إنشاء جلسة جديدة
    let session = getSession(senderId);
    if (!session) {
        session = createSession(senderId);
        session.phase = 'AWAIT_KEYWORD';

        // إرسال رسالة الترحيب من قاعدة البيانات
        getSetting('welcome_message', (welcomeMessage) => {
            if (welcomeMessage) {
                client.sendMessage(senderId, welcomeMessage);
            } else {
                client.sendMessage(senderId, 'مرحباً! اكتب "وظائف" للحصول على قائمة الوظائف المتاحة.');
            }
        });
        return;
    }

    // معالجة الرسالة حسب مرحلة الجلسة
    switch (session.phase) {
        case 'AWAIT_KEYWORD':
            handleAwaitKeyword(client, message, session);
            break;

        case 'AWAIT_SECTION':
            handleAwaitSection(client, message, session);
            break;

        default:
            // إعادة تعيين الجلسة إذا كانت في حالة غير معروفة
            session.phase = 'AWAIT_KEYWORD';
            getSetting('welcome_message', (welcomeMessage) => {
                if (welcomeMessage) {
                    client.sendMessage(senderId, welcomeMessage);
                } else {
                    client.sendMessage(senderId, 'الرجاء كتابة كلمة "وظائف" للحصول على قائمة الوظائف المتاحة.');
                }
            });
            break;
    }
}

// دالة معالجة مرحلة انتظار الكلمة المفتاحية
function handleAwaitKeyword(client, message, session) {
    const senderId = message.from;
    const msgBody = message.body.trim().toLowerCase();

    if (msgBody === 'وظائف') {
        // تغيير المرحلة إلى انتظار اختيار القسم
        session.phase = 'AWAIT_SECTION';

        // جلب قائمة الفئات وبناء القائمة
        getCategories((categories) => {
            if (categories && categories.length > 0) {
                // بناء قائمة الفئات المرقمة
                let categoriesList = '';
                categories.forEach((category, index) => {
                    categoriesList += `${index + 1}) ${category.name}\n`;
                });

                // جلب رسالة القائمة من الإعدادات
                getSetting('menu_message', (menuMessage) => {
                    if (menuMessage) {
                        // استبدال النص الثابت بقائمة الفئات الديناميكية
                        const dynamicMenu = menuMessage.replace(
                            /اختر نوع الوظائف:\n.*ادخل رقم فقط من 1 إلى 6/s,
                            `اختر نوع الوظائف:\n${categoriesList}ادخل رقم فقط من 1 إلى ${categories.length}`
                        );
                        client.sendMessage(senderId, dynamicMenu);
                    } else {
                        // رسالة احتياطية
                        const fallbackMenu = `📋 قائمة الوظائف المتاحة\nاختر نوع الوظائف:\n${categoriesList}ادخل رقم فقط من 1 إلى ${categories.length}`;
                        client.sendMessage(senderId, fallbackMenu);
                    }
                });
            } else {
                client.sendMessage(senderId, 'عذراً، لا توجد فئات متاحة حالياً.');
            }
        });
    } else {
        // إرسال رسالة تذكير من الإعدادات
        getSetting('invalid_keyword_message', (invalidMessage) => {
            if (invalidMessage) {
                client.sendMessage(senderId, invalidMessage);
            } else {
                client.sendMessage(senderId, 'الرجاء كتابة كلمة "وظائف" بالشكل الصحيح.');
            }
        });
    }
}

// دالة معالجة مرحلة انتظار اختيار القسم
function handleAwaitSection(client, message, session) {
    const senderId = message.from;
    let msgBody = message.body.trim();

    // تحويل الأرقام العربية إلى إنجليزية
    msgBody = msgBody.replace(/[\u0660-\u0669]/g, d => String.fromCharCode(d.charCodeAt(0) - 0x0660 + 48));

    // محاولة تحويل الرسالة إلى رقم
    const choice = parseInt(msgBody);

    // جلب عدد الفئات ديناميكياً
    getCategories((categories) => {
        if (!categories || categories.length === 0) {
            client.sendMessage(senderId, 'عذراً، لا توجد فئات متاحة حالياً.');
            deleteSession(senderId);
            return;
        }
        if (choice >= 1 && choice <= categories.length) {
            // جلب الوظائف للفئة المختارة
            getJobsByCategory(choice, (jobs) => {
                if (jobs && jobs.length > 0) {
                    // جلب اسم الفئة
                    getCategoryName(choice, (categoryName) => {
                        let responseMessage = `✅ تم اختيار: ${categoryName || `الفئة رقم ${choice}`}` + "\n\n";
                        responseMessage += `📋 الوظائف المتاحة:\n\n`;

                        jobs.forEach((job, index) => {
                            responseMessage += `${index + 1}) ${job.title}\n`;
                            responseMessage += `🔗 ${job.url}\n\n`;
                        });

                        responseMessage += `شكراً لك! يمكنك كتابة \"وظائف\" مرة أخرى للحصول على قائمة جديدة.`;

                        client.sendMessage(senderId, responseMessage);

                        // حذف الجلسة بعد الانتهاء
                        deleteSession(senderId);
                    });
                } else {
                    client.sendMessage(senderId, `عذراً، لا توجد وظائف متاحة في هذه الفئة حالياً.`);
                    deleteSession(senderId);
                }
            });
        } else {
            // إرسال رسالة خطأ من الإعدادات
            getSetting('invalid_selection_message', (invalidMessage) => {
                if (invalidMessage) {
                    client.sendMessage(senderId, invalidMessage);
                } else {
                    client.sendMessage(senderId, `الرجاء إدخال اختيار صحيح (1–${categories.length}).`);
                }
            });
        }
    });
}

// تصدير الدوال للاستخدام في الملفات الأخرى
module.exports = {
    handleMessage,
    createSession,
    getSession,
    deleteSession,
    inMemorySessions,
    getSetting,
    getCategories,
    getJobsByCategory,
    getCategoryName
};
