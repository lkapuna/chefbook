# Chef Book – שף בוק 🍳

אתר מתכונים מלא, סטטי, RTL, mobile-first עם Admin panel.

## מבנה הפרויקט

```
chefbook/
├── index.html          # דף בית
├── recipe.html         # עמוד מתכון בודד
├── category.html       # עמוד קטגוריה
├── search.html         # תוצאות חיפוש
├── about.html          # אודות
├── contact.html        # יצירת קשר
├── privacy.html        # מדיניות פרטיות
├── sitemap.xml         # לSEO
├── robots.txt          # לSEO
├── css/
│   └── style.css       # כל העיצוב
├── js/
│   ├── data.js         # מאגר מתכונים + localStorage
│   └── main.js         # לוגיקה ורינדור
└── admin/
    └── index.html      # פאנל ניהול
```

## העלאה ל-GitHub Pages (חינמי)

### שלב 1 – צור חשבון GitHub
https://github.com/signup

### שלב 2 – צור Repository חדש
1. לחץ New repository
2. שם: `chefbook` (או כל שם)
3. Public ✓
4. Create repository

### שלב 3 – העלה קבצים
**אופציה א – דרך אתר GitHub:**
1. לחץ "uploading an existing file"
2. גרור את כל תיקיית chefbook
3. Commit changes

**אופציה ב – Git CLI:**
```bash
cd chefbook
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/chefbook.git
git push -u origin main
```

### שלב 4 – הפעל GitHub Pages
1. Settings → Pages
2. Source: Deploy from a branch
3. Branch: main / root
4. Save

**האתר יהיה זמין ב:**
`https://USERNAME.github.io/chefbook/`

### שלב 5 – חיבור דומיין מותאם (chefbook.co.il)
1. Settings → Pages → Custom domain
2. הכנס: `chefbook.co.il`
3. אצל ספק הדומיין (למשל חברת הדואר/GoDaddy):
   - הוסף רשומת CNAME: `www` → `USERNAME.github.io`
   - או רשומות A לכתובות GitHub:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```

## סיסמת Admin

ברירת מחדל: `chefbook2025`

**לשינוי הסיסמה:**
פתח את `admin/index.html` ושנה את השורה:
```javascript
const ADMIN_PASS = localStorage.getItem('cb_admin_pass') || 'chefbook2025';
```

## ניוזלטר – Brevo (מומלץ, חינמי)

1. הרשם ב-https://brevo.com
2. חינמי עד 300 מיילים ביום
3. ייצא CSV מהAdmin → העלה ל-Brevo
4. שלח קמפיינים מהממשק שלהם

## פרסומות – Google AdSense

1. הגש בקשה ב-https://adsense.google.com
2. לאחר אישור, החלף את הפלייסהולדרים בקוד האמיתי:
   ```html
   <!-- בindex.html החלף את: -->
   <!-- Google AdSense placeholder -->
   <!-- ב: -->
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXX"></script>
   ```

## הוספת מתכון חדש

**דרך Admin Panel:**
- כנס ל-`/admin/`
- לחץ "הוסף מתכון"
- מלא את הטופס ושמור

**ידנית בקוד:**
פתח `js/data.js` והוסף אובייקט מתכון חדש למערך `RECIPES`.

## SEO

- Schema.org markup מובנה בכל עמוד מתכון
- sitemap.xml מוכן – הגש ל-Google Search Console
- meta tags מלאים בכל עמוד
- robots.txt מוגדר
