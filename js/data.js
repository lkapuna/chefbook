// data.js — Recipe data store for Chef Book
// Edit this file to add/update recipes, or use the Admin panel

const CATEGORIES = {
  kinuchim:  { label: 'קינוחים',  emoji: '🍰', parent: 'recipes' },
  maafim:    { label: 'מאפים',   emoji: '🥐', parent: 'recipes' },
  basari:    { label: 'בשרי',    emoji: '🥩', parent: 'recipes' },
  dagim:     { label: 'דגים',    emoji: '🐟', parent: 'recipes' },
  pastot:    { label: 'פסטות',   emoji: '🍝', parent: 'recipes' },
  tzimchoni: { label: 'צמחוני',  emoji: '🥗', parent: 'recipes' },
  chalavi:   { label: 'חלבי',    emoji: '🧀', parent: 'recipes' },
  tosafot:   { label: 'תוספות',  emoji: '🥔', parent: 'recipes' },
  misadot:   { label: 'מסעדות',  emoji: '🍽️', parent: 'hamlaztot' },
  tipim:     { label: 'טיפים',   emoji: '💡', parent: 'hamlaztot' },
  mutzarim:  { label: 'מוצרים',  emoji: '🛒', parent: 'hamlaztot' },
};

let RECIPES = [
  {
    id: 'r001',
    slug: 'kapkeiks-shokolad',
    title: 'קאפקייקס שוקולד רכים במיוחד – מתכון קל ומהיר',
    excerpt: 'מתכון לקאפקייקס שוקולד לחים במיוחד, מוכנים ב-15 דקות אפייה בלבד. תערובת פשוטה, טעם עמוק ותוצאה מנצחת.',
    category: 'kinuchim',
    image: 'https://www.chefbook.co.il/wp-content/uploads/2026/03/%D7%9E%D7%90%D7%A4%D7%99%D7%A0%D7%A1-%D7%A9%D7%95%D7%A7%D7%95%D7%9C%D7%93-800x600.png',
    prepTime: '15 דקות',
    cookTime: '15 דקות',
    servings: '12 יחידות',
    difficulty: 'קל',
    date: '2026-03-10',
    tags: ['שוקולד', 'קינוח', 'אפייה', 'מהיר'],
    ingredients: [
      '2 ביצים',
      '1 כוס סוכר',
      '½ כוס שמן',
      '1 כוס קמח',
      '½ כוס קקאו',
      '1 כפית אבקת אפייה',
      '½ כפית סודה לשתייה',
      '½ כוס חלב',
      'קורט מלח',
    ],
    steps: [
      'מחממים תנור ל-180 מעלות ומכינים תבנית מאפינס עם כוסיות.',
      'מקציפים ביצים עם סוכר עד לתערובת בהירה.',
      'מוסיפים שמן וחלב ומערבבים.',
      'מנפים יחד קמח, קקאו, אבקת אפייה, סודה ומלח.',
      'משלבים את החומרים היבשים עם הרטובים ומערבבים עד לתערובת חלקה.',
      'יוצקים לכוסיות עד ¾ גובה.',
      'אופים 15-18 דקות עד שקיסם יוצא נקי.',
    ],
  },
  {
    id: 'r002',
    slug: 'ozne-haman',
    title: 'אוזני המן פריכות בטירוף – מתכון קל הכנה',
    excerpt: 'אוזני המן פריכות ומפורכות עם מילויים שווים. המסורת הכי טעימה לפורים.',
    category: 'maafim',
    image: 'https://www.chefbook.co.il/wp-content/uploads/2026/02/img_9887_optimized-800x600.jpg',
    prepTime: '30 דקות',
    cookTime: '20 דקות',
    servings: '24 יחידות',
    difficulty: 'בינוני',
    date: '2026-02-28',
    tags: ['פורים', 'אפייה', 'עוגיות'],
    ingredients: [
      '3 כוסות קמח',
      '½ כוס סוכר',
      '1 ביצה',
      '½ כוס חמאה רכה',
      '2 כפות מים',
      '1 כפית וניל',
      'ריבת שזיפים / שוקולד למילוי',
    ],
    steps: [
      'מערבבים את כל חומרי הבצק למסה אחידה.',
      'עוטפים בניילון ומקררים 30 דקות.',
      'מרדדים את הבצק לעובי 3 מ"מ וחותכים עיגולים.',
      'מניחים כפית מילוי במרכז כל עיגול.',
      'מקפלים לצורת משולש ומהדקים את הקצוות.',
      'אופים ב-180 מעלות כ-18-20 דקות עד הזהבה.',
    ],
  },
  {
    id: 'r003',
    slug: 'ugat-shokolad-yom-huledet',
    title: 'עוגת יום הולדת – עוגת שוקולד רכה ועסיסית',
    excerpt: 'עוגת שוקולד רכה, עסיסית ומנצחת של השף לירוי, עם ציפוי שוקולד עשיר.',
    category: 'kinuchim',
    image: 'https://www.chefbook.co.il/wp-content/uploads/2026/02/%D7%A2%D7%99%D7%A6%D7%95%D7%91-%D7%9C%D7%9C%D7%90-%D7%A9%D7%9D-31_optimized-800x600.png',
    prepTime: '20 דקות',
    cookTime: '40 דקות',
    servings: '12 מנות',
    difficulty: 'קל',
    date: '2026-02-14',
    tags: ['שוקולד', 'עוגה', 'יום הולדת', 'קינוח'],
    ingredients: [
      '3 ביצים',
      '1.5 כוסות סוכר',
      '1 כוס שמן',
      '2 כוסות קמח',
      '¾ כוס קקאו',
      '1 כפית אבקת אפייה',
      '1 כוס מים רותחים',
      '200 גרם שוקולד מריר לציפוי',
      '½ כוס שמנת מתוקה',
    ],
    steps: [
      'מחממים תנור ל-175 מעלות.',
      'מקציפים ביצים עם סוכר עד לתפיחה.',
      'מוסיפים שמן ומקציפים עוד דקה.',
      'מנפים קמח, קקאו ואבקת אפייה ומוסיפים בהדרגה.',
      'מוסיפים מים רותחים ומערבבים.',
      'אופים 35-40 דקות.',
      'מכינים גנאש: מחממים שמנת, יוצקים על שוקולד ומערבבים.',
      'מציפים את העוגה הקרה.',
    ],
  },
  {
    id: 'r004',
    slug: 'maafe-ontribb',
    title: 'מאפה אונטריב בבישול ארוך בבצק פריך',
    excerpt: 'מאפה בשר אונטריב בבצק פריך, עם ירקות, תיבול עשיר. מושלם לאירוח.',
    category: 'basari',
    image: 'https://www.chefbook.co.il/wp-content/uploads/2026/01/img_8751_optimized-800x600.jpg',
    prepTime: '45 דקות',
    cookTime: '3 שעות',
    servings: '6 מנות',
    difficulty: 'מתקדם',
    date: '2026-01-20',
    tags: ['בשרי', 'אירוח', 'בישול ארוך'],
    ingredients: [
      '1 ק"ג אונטריב',
      '2 בצלים',
      '3 שיני שום',
      '2 גזרים',
      '1 כוס יין אדום',
      '2 כוסות מרק בשר',
      'תבלינים: פפריקה, כמון, שחור',
      'בצק פריך (350 גרם קמח + 200 גרם חמאה + ביצה)',
    ],
    steps: [
      'מכינים בצק פריך, עוטפים ומקררים שעה.',
      'צולים האונטריב עם שמן עד הזהבה מכל הצדדים.',
      'מוציאים, מטגנים בצל, שום וגזר.',
      'מחזירים הבשר, מוסיפים יין ומרק.',
      'מבשלים 2.5 שעות על אש נמוכה.',
      'מרדדים בצק, מכסים תבנית, יוצקים תכולה.',
      'מכסים בבצק נוסף ואופים 35 דקות ב-185 מעלות.',
    ],
  },
  {
    id: 'r005',
    slug: 'sufganiyot',
    title: 'סופגניות אווריריות וקלאסיות – מתכון קל הכנה',
    excerpt: 'סופגניות רכות, אווריריות וקלאסיות שיוצאות מושלם בטיגון וגם באפייה.',
    category: 'maafim',
    image: 'https://www.chefbook.co.il/wp-content/uploads/2025/12/489026138_2185463781896923_5413114382963933910_n-800x600.jpg',
    prepTime: '20 דקות',
    cookTime: '25 דקות',
    servings: '20 יחידות',
    difficulty: 'בינוני',
    date: '2025-12-25',
    tags: ['חנוכה', 'מטוגן', 'קינוח', 'אפוי'],
    ingredients: [
      '500 גרם קמח',
      '7 גרם שמרים יבשים',
      '50 גרם סוכר',
      '1 ביצה + חלמון',
      '250 מ"ל חלב פושר',
      '60 גרם חמאה',
      'קורט מלח',
      'ריבה / שוקולד למילוי',
    ],
    steps: [
      'מחממים חלב, מוסיפים שמרים וסוכר, ממתינים 5 דקות.',
      'מוסיפים ביצה, קמח ומלח, לשים 8 דקות.',
      'מוסיפים חמאה, ממשיכים ללוש 5 דקות.',
      'מניחים לתפיחה שעה.',
      'מעצבים כדורים, ממתינים 30 דקות נוספות.',
      'מטגנים בשמן עמוק 2-3 דקות כל צד.',
      'ממלאים בריבה ומפדרים אבקת סוכר.',
    ],
  },
  {
    id: 'r006',
    slug: 'file-amnon-teriyaki',
    title: 'פילה אמנון עם ירקות צבעוניים ורוטב טריאקי עדין',
    excerpt: 'מתכון קל ובריא לפילה אמנון עם ירקות צבעוניים ורוטב טריאקי עדין. דג בשרני, עסיסי ומלא טעם.',
    category: 'dagim',
    image: '',
    prepTime: '10 דקות',
    cookTime: '20 דקות',
    servings: '4 מנות',
    difficulty: 'קל',
    date: '2026-03-12',
    tags: ['דגים', 'בריא', 'מהיר', 'אסייתי'],
    ingredients: [
      '4 פילה אמנון',
      '1 פלפל אדום',
      '1 פלפל צהוב',
      '2 קישואים',
      '1 בצל סגול',
      '3 כפות רוטב טריאקי',
      '2 כפות שמן שומשום',
      '1 כף ג\'ינג\'ר מגורר',
      'שומשום לפיזור',
    ],
    steps: [
      'חותכים ירקות לרצועות.',
      'מערבבים טריאקי עם שמן שומשום וג\'ינג\'ר.',
      'מטגנים ירקות 5 דקות על אש גבוהה.',
      'מוסיפים הדג לתבנית עם מחצית הרוטב.',
      'אופים ב-190 מעלות 15-18 דקות.',
      'יוצקים שאר הרוטב ומפזרים שומשום.',
    ],
  },
];

// ---- localStorage integration for Admin-added recipes ----
function loadRecipes() {
  try {
    const saved = localStorage.getItem('chefbook_recipes');
    if (saved) {
      const extra = JSON.parse(saved);
      // Merge: saved overrides built-in by id
      const ids = new Set(extra.map(r => r.id));
      const base = RECIPES.filter(r => !ids.has(r.id));
      return [...extra, ...base].sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  } catch(e) {}
  return [...RECIPES].sort((a, b) => new Date(b.date) - new Date(a.date));
}

function saveRecipes(list) {
  try {
    localStorage.setItem('chefbook_recipes', JSON.stringify(list));
  } catch(e) {}
}

function getRecipeBySlug(slug) {
  return loadRecipes().find(r => r.slug === slug);
}

function getRecipesByCategory(cat) {
  return loadRecipes().filter(r => r.category === cat);
}

function searchRecipes(q) {
  const lower = q.toLowerCase();
  return loadRecipes().filter(r =>
    r.title.includes(q) ||
    r.excerpt.includes(q) ||
    (r.tags || []).some(t => t.includes(q)) ||
    (r.ingredients || []).some(i => i.includes(q))
  );
}

// Newsletter subscribers (localStorage for demo — use a backend in production)
function subscribeEmail(email, name) {
  const subs = JSON.parse(localStorage.getItem('chefbook_subs') || '[]');
  if (!subs.find(s => s.email === email)) {
    subs.push({ email, name, date: new Date().toISOString() });
    localStorage.setItem('chefbook_subs', JSON.stringify(subs));
    return true;
  }
  return false;
}

function getSubscribers() {
  return JSON.parse(localStorage.getItem('chefbook_subs') || '[]');
}
