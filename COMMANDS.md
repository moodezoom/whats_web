# ⚡ أوامر سريعة للاستخدام اليومي

## 🚀 تشغيل البوت

```powershell
# الانتقال لمجلد المشروع
cd whatsjob-bot

# تشغيل البوت في وضع التطوير (مع إعادة التشغيل التلقائي)
npm run dev

# تشغيل البوت في وضع الإنتاج
npm start
```

## 🛑 إيقاف البوت

```powershell
# إيقاف جميع عمليات Node.js
taskkill /IM node.exe /F

# إيقاف عمليات nodemon فقط
taskkill /IM nodemon.exe /F

# إيقاف عملية محددة حسب PID
taskkill /PID [رقم_العملية] /F
```

## 🔄 إعادة تشغيل البوت

```powershell
# إيقاف ثم تشغيل
taskkill /IM node.exe /F
npm run dev
```

## 🗑️ حذف الجلسات والبيانات

```powershell
# حذف بيانات جلسات WhatsApp
Remove-Item -Recurse -Force .wwebjs_auth

# حذف ملف QR Code القديم
Remove-Item -Force db/last-qr.txt

# حذف جميع ملفات الجلسات
Remove-Item -Recurse -Force .wwebjs_auth, db/last-qr.txt
```

## 🗄️ إدارة قاعدة البيانات

```powershell
# إنشاء قاعدة البيانات من جديد
npm run init-db

# حذف قاعدة البيانات القديمة
Remove-Item -Force db/jobs.db

# إعادة إنشاء قاعدة البيانات
npm run init-db
```

## 📦 إدارة الحزم

```powershell
# تثبيت الحزم
npm install

# إعادة تثبيت الحزم (حل مشاكل التثبيت)
Remove-Item -Recurse -Force node_modules
npm install

# تحديث الحزم
npm update

# تثبيت حزمة جديدة
npm install [اسم_الحزمة]
```

## 🔍 فحص المشاكل

```powershell
# فحص عمليات Node.js النشطة
Get-Process node

# فحص عمليات nodemon النشطة
Get-Process nodemon

# فحص المنافذ المستخدمة
netstat -ano | findstr :3000

# فحص حجم مجلد node_modules
Get-ChildItem node_modules -Recurse | Measure-Object -Property Length -Sum
```

## 🌐 الوصول للخدمات

```powershell
# فتح لوحة التحكم في المتصفح
Start-Process "http://localhost:3000/dashboard"

# فتح API في المتصفح
Start-Process "http://localhost:3000/api"

# فتح الصفحة الرئيسية
Start-Process "http://localhost:3000"
```

## 📊 مراقبة الأداء

```powershell
# مراقبة استخدام الذاكرة
Get-Process node | Select-Object ProcessName, WorkingSet, CPU

# مراقبة استخدام CPU
Get-Process node | Select-Object ProcessName, CPU

# مراقبة الملفات المفتوحة
Get-Process node | Select-Object ProcessName, Id
```

## 🔧 أوامر مفيدة إضافية

```powershell
# فحص إصدار Node.js
node --version

# فحص إصدار npm
npm --version

# فحص الحزم المثبتة
npm list

# فحص الحزم المثبتة عالمياً
npm list -g

# تنظيف ذاكرة التخزين المؤقت
npm cache clean --force

# فحص أخطاء الحزم
npm audit

# إصلاح أخطاء الحزم
npm audit fix
```

## 🚨 أوامر الطوارئ

```powershell
# إيقاف جميع العمليات وإعادة التشغيل
taskkill /IM node.exe /F
taskkill /IM nodemon.exe /F
Remove-Item -Recurse -Force .wwebjs_auth
npm run dev

# إعادة تعيين كاملة للمشروع
Remove-Item -Recurse -Force node_modules
Remove-Item -Force db/jobs.db
Remove-Item -Recurse -Force .wwebjs_auth
npm install
npm run init-db
npm run dev
```

## 📝 ملاحظات مهمة

1. **تأكد من وجودك في المجلد الصحيح** قبل تنفيذ الأوامر
2. **احتفظ بنسخة احتياطية** من قاعدة البيانات قبل حذفها
3. **تحقق من اتصال الإنترنت** قبل تشغيل البوت
4. **راقب سجلات الأخطاء** في وحدة التحكم
5. **احتفظ بهذا الملف** للرجوع إليه عند الحاجة

## 🎯 نصائح سريعة

- استخدم `Ctrl + C` لإيقاف البوت في وحدة التحكم
- استخدم `npm run dev` للتطوير (إعادة تشغيل تلقائي)
- استخدم `npm start` للإنتاج (بدون إعادة تشغيل)
- احتفظ بنسخة من ملف `activ.text` للأوامر المهمة
