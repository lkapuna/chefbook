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
            <div class="recipe-share-bar">
              <span class="share-label">שתפו:</span>
              <button class="share-btn share-wa"  onclick="shareRecipe('whatsapp')" title="שתף בוואטסאפ">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                וואטסאפ
              </button>
              <button class="share-btn share-fb"   onclick="shareRecipe('facebook')" title="שתף בפייסבוק">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                פייסבוק
              </button>
              <button class="share-btn share-copy" onclick="shareRecipe('copy')" title="העתק קישור" id="copyShareBtn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                העתק קישור
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }

  // Content
  const contentEl = document.getElementById('recipeContent');
  if (contentEl) {
    let contentHTML = '';

    // If we have structured ingredients/steps, show them nicely
    const hasStructured = recipe.ingredients && recipe.ingredients.length > 0 && recipe.steps && recipe.steps.length > 0;

    if (hasStructured) {
      const ingHTML = recipe.ingredients.map(i => {
        if (i.startsWith('---') && i.endsWith('---')) {
          return `<li class="ing-section">${i.replace(/---/g,'').trim()}</li>`;
        }
        return `<li itemprop="recipeIngredient">${i}</li>`;
      }).join('');

      const stepsHTML = recipe.steps.map(s => `<li>${s}</li>`).join('');

      contentHTML = `
        <div class="recipe-ingredients">
          <h2>🧂 מצרכים</h2>
          <ul>${ingHTML}</ul>
        </div>
        <div class="recipe-steps">
          <h2>👨‍🍳 אופן ההכנה</h2>
          <ol>${stepsHTML}</ol>
        </div>`;

    } else if (recipe.body_html) {
      // Strip duplicate intro: remove opening h2 (title) and first 1-3 paragraphs
      let cleanBody = recipe.body_html;
      // Remove ALL leading h2 tags (title repeats)
      cleanBody = cleanBody.replace(/^(\s*<h2[^>]*>[\s\S]*?<\/h2>\s*)+/i, '');
      // Remove first 1-3 <p> blocks (they repeat excerpt/intro already shown in hero)
      cleanBody = cleanBody.replace(/^(\s*<p[^>]*>[\s\S]*?<\/p>\s*){1,3}/, '');
      cleanBody = cleanBody.trim();
      if (cleanBody) {
        contentHTML = `<div class="recipe-body-full" itemprop="recipeInstructions">${cleanBody}</div>`;
      }

    } else if (recipe.ingredients && recipe.ingredients.length > 0) {
      // Only ingredients, no steps
      const ingHTML = recipe.ingredients.map(i => {
        if (i.startsWith('---') && i.endsWith('---')) {
          return `<li class="ing-section">${i.replace(/---/g,'').trim()}</li>`;
        }
        return `<li itemprop="recipeIngredient">${i}</li>`;
      }).join('');
      contentHTML = `<div class="recipe-ingredients"><h2>🧂 מצרכים</h2><ul>${ingHTML}</ul></div>`;
    }

    const tagsHTML = recipe.tags?.length
      ? `<div class="recipe-tags">${recipe.tags.map(t => `<span class="tag-pill">${t}</span>`).join('')}</div>`
      : '';

    const videoHTML = buildVideoEmbed(recipe);

    contentEl.innerHTML = `<div class="recipe-content" itemscope itemtype="https://schema.org/Recipe">${contentHTML}${videoHTML}${tagsHTML}</div>`;

    // Load embed scripts after DOM is ready
    if (recipe.videoUrl) {
      setTimeout(() => loadVideoScripts(recipe), 100);
    }
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

// ---- VIDEO EMBED ----
function buildVideoEmbed(recipe) {
  if (!recipe.videoUrl) return '';

  if (recipe.videoType === 'instagram') {
    // Extract shortcode from URL
    const match = recipe.videoUrl.match(/\/reel\/([A-Za-z0-9_-]+)/);
    if (!match) return '';
    const shortcode = match[1];
    return `
      <div class="recipe-video-wrap">
        <h2 class="recipe-video-title">🎬 סרטון הכנה</h2>
        <div class="ig-embed-container">
          <blockquote
            class="instagram-media"
            data-instgrm-captioned
            data-instgrm-permalink="https://www.instagram.com/reel/${shortcode}/?utm_source=ig_embed"
            data-instgrm-version="14"
            style="max-width:540px;width:100%;margin:0 auto;">
          </blockquote>
        </div>
        <a class="video-fallback-link" href="${recipe.videoUrl}" target="_blank" rel="noopener">
          📱 צפה ב-Reel באינסטגרם ←
        </a>
      </div>`;
  }

  if (recipe.videoType === 'tiktok') {
    const vidMatch = recipe.videoUrl.match(/video\/(\d+)/);
    if (!vidMatch) return '';
    const vidId = vidMatch[1];
    return `
      <div class="recipe-video-wrap">
        <h2 class="recipe-video-title">🎬 סרטון הכנה</h2>
        <div class="tiktok-embed-container">
          <blockquote
            class="tiktok-embed"
            cite="${recipe.videoUrl}"
            data-video-id="${vidId}"
            style="max-width:605px;min-width:325px;margin:0 auto;">
            <section></section>
          </blockquote>
        </div>
        <a class="video-fallback-link" href="${recipe.videoUrl}" target="_blank" rel="noopener">
          🎵 צפה ב-TikTok ←
        </a>
      </div>`;
  }
  return '';
}

function loadVideoScripts(recipe) {
  if (!recipe.videoUrl) return;

  if (recipe.videoType === 'instagram') {
    // Load IG embed script if not already loaded
    if (!document.querySelector('script[src*="instagram.com/embed"]')) {
      const s = document.createElement('script');
      s.src = 'https://www.instagram.com/embed.js';
      s.async = true;
      document.body.appendChild(s);
    } else if (window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }

  if (recipe.videoType === 'tiktok') {
    if (!document.querySelector('script[src*="tiktok.com/embed"]')) {
      const s = document.createElement('script');
      s.src = 'https://www.tiktok.com/embed.js';
      s.async = true;
      document.body.appendChild(s);
    }
  }
}

// ---- SHARE RECIPE ----
function shareRecipe(platform) {
  // Build clean URL: base + slug only (no Hebrew encoding)
  const slug = new URLSearchParams(location.search).get('slug') || '';
  const base = location.origin + location.pathname.replace(/[^/]*$/, '');
  const cleanUrl = base + 'recipe.html?slug=' + slug;
  const title = document.title.replace(' – שף בוק', '').trim();

  if (platform === 'whatsapp') {
    const text = title + '\n' + cleanUrl;
    window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank');
  } else if (platform === 'facebook') {
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(cleanUrl), '_blank', 'width=600,height=400');
  } else if (platform === 'copy') {
    navigator.clipboard.writeText(cleanUrl).then(() => {
      const btn = document.getElementById('copyShareBtn');
      const orig = btn.innerHTML;
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> הועתק!';
      btn.style.background = '#2ed573';
      btn.style.color = 'white';
      setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; btn.style.color = ''; }, 2500);
    }).catch(() => {
      // Fallback for browsers without clipboard API
      prompt('קישור לשיתוף:', cleanUrl);
    });
  }
}
