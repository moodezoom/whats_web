# ⚡ أوامر سريعة لرفع المشروع على GitHub

## 🚀 رفع المشروع لأول مرة

### 1️⃣ إعداد Git
```powershell
# تهيئة Git
git init

# إضافة جميع الملفات
git add .

# عمل أول commit
git commit -m "Initial commit: WhatsApp Jobs Bot - بوت WhatsApp لإدارة الوظائف"

# إضافة المستودع البعيد (استبدل YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/whatsjob-bot.git

# رفع الكود
git branch -M main
git push -u origin main
```

## 🔄 أوامر التحديث اليومية

### رفع التحديثات
```powershell
# إضافة التغييرات
git add .

# عمل commit
git commit -m "Update: وصف التحديث"

# رفع التحديثات
git push
```

### جلب التحديثات
```powershell
# جلب التحديثات من GitHub
git pull

# أو جلب التحديثات مع إعادة تعيين
git pull --rebase
```

## 📊 أوامر مراقبة الحالة

### عرض الحالة
```powershell
# عرض حالة الملفات
git status

# عرض التغييرات
git diff

# عرض تاريخ التحديثات
git log --oneline
```

### عرض المعلومات
```powershell
# عرض المستودعات البعيدة
git remote -v

# عرض الفروع
git branch -a

# عرض آخر commit
git log -1
```

## 🔧 أوامر مفيدة

### إنشاء فرع جديد
```powershell
# إنشاء فرع جديد
git checkout -b feature/new-feature

# الانتقال بين الفروع
git checkout main

# حذف فرع
git branch -d feature/old-feature
```

### إعادة تعيين التغييرات
```powershell
# إلغاء التغييرات في ملف معين
git checkout -- filename

# إلغاء جميع التغييرات
git reset --hard HEAD

# إلغاء آخر commit
git reset --soft HEAD~1
```

## 🚨 أوامر الطوارئ

### إعادة تعيين كاملة
```powershell
# إعادة تعيين إلى آخر commit
git reset --hard HEAD

# حذف جميع التغييرات غير المحفوظة
git clean -fd
```

### إصلاح مشاكل الرفع
```powershell
# إجبار الرفع (استخدم بحذر)
git push --force

# إعادة تعيين الفرع البعيد
git push --force-with-lease
```

## 📝 أوامر سريعة مخصصة

### دالة رفع سريع
```powershell
# إضافة هذه الدالة إلى ملف PowerShell profile
function git-push {
    param([string]$message)
    git add .
    git commit -m "Update: $message"
    git push
}

# الاستخدام
git-push "إضافة ميزة جديدة"
```

### دالة تحديث سريع
```powershell
function git-update {
    git pull
    git status
}

# الاستخدام
git-update
```

## 🎯 أوامر للعمل الجماعي

### العمل مع الفروع
```powershell
# إنشاء فرع من آخر تحديث
git checkout -b feature/your-feature main

# دمج الفرع مع الرئيسي
git checkout main
git merge feature/your-feature

# حذف الفرع بعد الدمج
git branch -d feature/your-feature
```

### حل تضارب الدمج
```powershell
# عرض الملفات المتضاربة
git status

# حل التضارب يدوياً ثم
git add .
git commit -m "Resolve merge conflicts"
```

## 📋 قائمة فحص قبل الرفع

### ✅ تأكد من:
- [ ] عمل الكود محلياً
- [ ] عدم وجود أخطاء في وحدة التحكم
- [ ] تحديث ملف README إذا لزم الأمر
- [ ] عدم وجود معلومات حساسة
- [ ] وجود ملف .gitignore

### ✅ أوامر الفحص
```powershell
# فحص حالة Git
git status

# فحص التغييرات
git diff --cached

# فحص الملفات المضافة
git ls-files
```

## 🌐 روابط مهمة

بعد الرفع، ستكون لديك هذه الروابط:

- **المستودع:** `https://github.com/YOUR_USERNAME/whatsjob-bot`
- **Issues:** `https://github.com/YOUR_USERNAME/whatsjob-bot/issues`
- **Pull Requests:** `https://github.com/YOUR_USERNAME/whatsjob-bot/pulls`
- **Actions:** `https://github.com/YOUR_USERNAME/whatsjob-bot/actions`

## 📞 نصائح مهمة

### قبل الرفع
1. تأكد من عمل المشروع محلياً
2. اختبر جميع الميزات
3. تأكد من عدم وجود أخطاء

### بعد الرفع
1. تحقق من GitHub Actions
2. اختبر المشروع من GitHub
3. أضف وصف مفصل للمشروع

### الأمان
- لا ترفع ملفات حساسة
- استخدم .gitignore
- تحقق من التغييرات قبل الرفع

---

**ملاحظة:** استبدل `YOUR_USERNAME` باسم المستخدم الخاص بك على GitHub
