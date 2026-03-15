// main.js — Chef Book frontend logic

// ---- MOBILE NAV ----
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen);
  });
}

// ---- SEARCH ----
function doSearch() {
  const q = document.getElementById('siteSearch')?.value?.trim();
  if (q) window.location.href = `search.html?q=${encodeURIComponent(q)}`;
}

document.getElementById('siteSearch')?.addEventListener('keydown', e => {
  if (e.key === 'Enter') doSearch();
});

// ---- RECIPE CARD TEMPLATE ----
function recipeCardHTML(recipe) {
  const cat = CATEGORIES[recipe.category];
  const catLabel = cat ? cat.label : recipe.category;
  const imgTag = recipe.image
    ? `<img src="${recipe.image}" alt="${recipe.title}" loading="lazy">`
    : `<div style="background:var(--gray-200);width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:3rem">${cat?.emoji || '🍽️'}</div>`;

  return `
<article class="recipe-card" itemscope itemtype="https://schema.org/Recipe">
  <a href="recipe.html?slug=${recipe.slug}" class="card-link" itemprop="url">
    <div class="recipe-card__img">
      ${imgTag}
      <span class="recipe-card__cat">${catLabel}</span>
    </div>
    <div class="recipe-card__body">
      <h3 itemprop="name">${recipe.title}</h3>
      <p itemprop="description">${recipe.excerpt}</p>
      <div class="recipe-card__meta">
        ${recipe.prepTime ? `<span>⏱ ${recipe.prepTime}</span>` : ''}
        ${recipe.difficulty ? `<span>📊 ${recipe.difficulty}</span>` : ''}
        ${recipe.servings ? `<span>👤 ${recipe.servings}</span>` : ''}
      </div>
    </div>
  </a>
</article>`;
}

// ---- HOMEPAGE: RECIPE GRID ----
const recipesGrid = document.getElementById('recipesGrid');
let currentPage = 0;
const PER_PAGE = 8;

function renderRecipes(start = 0, append = false) {
  const all = loadRecipes();
  const slice = all.slice(start, start + PER_PAGE);
  if (!recipesGrid) return;

  if (!append) recipesGrid.innerHTML = '';
  recipesGrid.insertAdjacentHTML('beforeend', slice.map(recipeCardHTML).join(''));

  const loadMoreBtn = document.getElementById('loadMoreBtn');
  if (loadMoreBtn) {
    loadMoreBtn.style.display = (start + PER_PAGE >= all.length) ? 'none' : 'inline-block';
  }
}

function loadMore() {
  currentPage++;
  renderRecipes(currentPage * PER_PAGE, true);
}

if (recipesGrid) renderRecipes(0);

// ---- NEWSLETTER ----
function subscribeNewsletter(e) {
  e.preventDefault();
  const form = e.target;
  const email = form.email.value.trim();
  const name = form.name?.value?.trim() || '';

  if (!email) return;

  const ok = subscribeEmail(email, name);
  showToast(ok ? `✅ נרשמת בהצלחה! תקבל/י מתכונים טריים לתיבה.` : `📧 כתובת זו כבר רשומה.`);
  if (ok) form.reset();
}

// ---- TOAST ----
function showToast(msg, duration = 3500) {
  let t = document.querySelector('.toast');
  if (!t) {
    t = document.createElement('div');
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), duration);
}

// ---- RECIPE PAGE ----
function renderRecipePage() {
  const slug = new URLSearchParams(location.search).get('slug');
  if (!slug) return;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) {
    document.title = 'מתכון לא נמצא – שף בוק';
    return;
  }

  document.title = `${recipe.title} – שף בוק`;
  document.querySelector('meta[name="description"]')?.setAttribute('content', recipe.excerpt);

  const cat = CATEGORIES[recipe.category];

  // Hero
  const heroEl = document.getElementById('recipeHero');
  if (heroEl) {
    heroEl.innerHTML = `
    <div class="recipe-hero">
      <div class="container">
        <div class="recipe-hero-inner">
          <div class="recipe-hero__img">
            ${recipe.image
              ? `<img src="${recipe.image}" alt="${recipe.title}">`
              : `<div style="background:var(--gray-800);width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:5rem">${cat?.emoji || '🍽️'}</div>`}
          </div>
          <div class="recipe-hero__info">
            <span class="recipe-hero__cat">${cat?.label || recipe.category}</span>
            <h1 class="recipe-hero__title" itemprop="name">${recipe.title}</h1>
            <p class="recipe-hero__excerpt">${recipe.excerpt}</p>
            <div class="recipe-meta-badges">
              ${recipe.prepTime ? `<div class="recipe-badge">⏱ הכנה: ${recipe.prepTime}</div>` : ''}
              ${recipe.cookTime ? `<div class="recipe-badge">🔥 בישול: ${recipe.cookTime}</div>` : ''}
              ${recipe.servings ? `<div class="recipe-badge">👤 מנות: ${recipe.servings}</div>` : ''}
              ${recipe.difficulty ? `<div class="recipe-badge">📊 רמה: ${recipe.difficulty}</div>` : ''}
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }

  // Content
  const contentEl = document.getElementById('recipeContent');
  if (contentEl && recipe.ingredients && recipe.steps) {
    contentEl.innerHTML = `
    <div class="recipe-content" itemprop="recipeInstructions">
      <div class="recipe-ingredients">
        <h2>🧂 מצרכים</h2>
        <ul>${recipe.ingredients.map(i => `<li itemprop="recipeIngredient">${i}</li>`).join('')}</ul>
      </div>
      <div class="recipe-steps">
        <h2>👨‍🍳 אופן ההכנה</h2>
        <ol>${recipe.steps.map(s => `<li>${s}</li>`).join('')}</ol>
      </div>
      ${recipe.tags?.length ? `<div style="margin-top:1.5rem">${recipe.tags.map(t => `<span class="tag-pill active">${t}</span>`).join('')}</div>` : ''}
    </div>`;
  }
}

// ---- CATEGORY PAGE ----
function renderCategoryPage() {
  const cat = new URLSearchParams(location.search).get('cat');
  if (!cat) return;

  const catInfo = CATEGORIES[cat];
  const catLabel = catInfo ? catInfo.label : cat;

  document.title = `${catLabel} – שף בוק`;

  const headerEl = document.getElementById('categoryHeader');
  if (headerEl) {
    headerEl.innerHTML = `
    <div class="category-header">
      <div class="container">
        <h1>${catInfo?.emoji || ''} ${catLabel}</h1>
        <p>כל מתכוני ${catLabel} של שף בוק</p>
      </div>
    </div>`;
  }

  const gridEl = document.getElementById('categoryGrid');
  if (gridEl) {
    const recipes = cat === 'recipes'
      ? loadRecipes()
      : getRecipesByCategory(cat);

    if (recipes.length) {
      gridEl.innerHTML = recipes.map(recipeCardHTML).join('');
    } else {
      gridEl.innerHTML = `<p style="text-align:center;color:var(--gray-400);padding:3rem">אין מתכונים בקטגוריה זו עדיין.</p>`;
    }
  }
}

// ---- SEARCH PAGE ----
function renderSearchPage() {
  const q = new URLSearchParams(location.search).get('q') || '';
  document.title = `חיפוש: ${q} – שף בוק`;

  const inputEl = document.getElementById('searchInput');
  if (inputEl) inputEl.value = q;

  const gridEl = document.getElementById('searchGrid');
  const titleEl = document.getElementById('searchTitle');

  if (q && gridEl) {
    const results = searchRecipes(q);
    if (titleEl) titleEl.textContent = `נמצאו ${results.length} תוצאות עבור "${q}"`;
    gridEl.innerHTML = results.length
      ? results.map(recipeCardHTML).join('')
      : `<p style="text-align:center;color:var(--gray-400);padding:3rem">לא נמצאו תוצאות. נסה מילה אחרת.</p>`;
  }
}

// ---- AUTO-INIT based on page ----
const page = location.pathname.split('/').pop();
if (page === 'recipe.html') renderRecipePage();
if (page === 'category.html') renderCategoryPage();
if (page === 'search.html') renderSearchPage();
