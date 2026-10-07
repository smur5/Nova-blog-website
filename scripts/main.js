/**
 * Project Nova — Main Application Controller
 * Handles article rendering, reader modal, bookmarks, search/filters, contact & toasts
 */

class NovaAppController {
  constructor() {
    this.bookmarks = JSON.parse(localStorage.getItem('nova_bookmarks') || '[]');
    this.likes = JSON.parse(localStorage.getItem('nova_likes') || '{}');
    this.currentCategory = 'all';
    this.searchQuery = '';
    this.currentViewMode = 'grid'; // 'grid' | 'list'
    this.currentReadingArticle = null;
    this.readerFontSize = 1.125; // rem

    this.init();
  }

  init() {
    this.bindGlobalEvents();
    this.renderHome();
    this.renderBlogs();
    this.renderAbout();
    this.renderFaq();
    this.updateBookmarkBadge();
  }

  bindGlobalEvents() {
    // Reading Progress Listener
    window.addEventListener('scroll', () => this.handleScrollProgress());

    // Search Input in Blogs View
    const searchInput = document.getElementById('blogs-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase();
        this.renderBlogs();
      });
    }

    // View Mode Toggle (Grid vs List)
    const viewGridBtn = document.getElementById('view-grid-btn');
    const viewListBtn = document.getElementById('view-list-btn');
    if (viewGridBtn && viewListBtn) {
      viewGridBtn.addEventListener('click', () => {
        this.currentViewMode = 'grid';
        viewGridBtn.classList.add('active');
        viewListBtn.classList.remove('active');
        this.renderBlogs();
      });
      viewListBtn.addEventListener('click', () => {
        this.currentViewMode = 'list';
        viewListBtn.classList.add('active');
        viewGridBtn.classList.remove('active');
        this.renderBlogs();
      });
    }

    // Bookmark Drawer Toggle
    const bookmarkTrigger = document.getElementById('bookmark-drawer-trigger');
    const bookmarkClose = document.getElementById('bookmark-drawer-close');
    const bookmarkOverlay = document.getElementById('drawer-overlay');

    if (bookmarkTrigger) {
      bookmarkTrigger.addEventListener('click', () => this.openBookmarkDrawer());
    }
    if (bookmarkClose) {
      bookmarkClose.addEventListener('click', () => this.closeBookmarkDrawer());
    }
    if (bookmarkOverlay) {
      bookmarkOverlay.addEventListener('click', () => {
        this.closeBookmarkDrawer();
        this.closeMobileDrawer();
      });
    }

    // Mobile Hamburger Nav
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mobileClose = document.getElementById('mobile-drawer-close');
    if (mobileToggle) {
      mobileToggle.addEventListener('click', () => this.openMobileDrawer());
    }
    if (mobileClose) {
      mobileClose.addEventListener('click', () => this.closeMobileDrawer());
    }

    // Reader Modal Close
    const readerClose = document.getElementById('reader-modal-close');
    const readerOverlay = document.getElementById('reader-modal-overlay');
    if (readerClose) {
      readerClose.addEventListener('click', () => this.closeReaderModal());
    }
    if (readerOverlay) {
      readerOverlay.addEventListener('click', (e) => {
        if (e.target === readerOverlay) this.closeReaderModal();
      });
    }

    // Reader Font Size Buttons
    const fontDecBtn = document.getElementById('font-decrease-btn');
    const fontIncBtn = document.getElementById('font-increase-btn');
    if (fontDecBtn && fontIncBtn) {
      fontDecBtn.addEventListener('click', () => {
        if (this.readerFontSize > 0.9) {
          this.readerFontSize -= 0.125;
          const body = document.getElementById('reader-modal-body');
          if (body) body.style.fontSize = `${this.readerFontSize}rem`;
        }
      });
      fontIncBtn.addEventListener('click', () => {
        if (this.readerFontSize < 1.6) {
          this.readerFontSize += 0.125;
          const body = document.getElementById('reader-modal-body');
          if (body) body.style.fontSize = `${this.readerFontSize}rem`;
        }
      });
    }

    // Reader Like Button
    const readerLikeBtn = document.getElementById('reader-like-btn');
    if (readerLikeBtn) {
      readerLikeBtn.addEventListener('click', () => {
        if (!this.currentReadingArticle) return;
        const id = this.currentReadingArticle.id;
        const countSpan = document.getElementById('reader-like-count');

        if (this.likes[id]) {
          delete this.likes[id];
          readerLikeBtn.classList.remove('active');
          if (countSpan) countSpan.textContent = this.currentReadingArticle.likes;
        } else {
          this.likes[id] = true;
          readerLikeBtn.classList.add('active');
          if (countSpan) countSpan.textContent = this.currentReadingArticle.likes + 1;
          this.showToast('Article liked!', 'success');
        }
        localStorage.setItem('nova_likes', JSON.stringify(this.likes));
      });
    }

    // Reader Share Button
    const readerShareBtn = document.getElementById('reader-share-btn');
    if (readerShareBtn) {
      readerShareBtn.addEventListener('click', () => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(window.location.href);
          this.showToast('Story link copied to clipboard!', 'info');
        } else {
          this.showToast('Sharing link: ' + window.location.href, 'info');
        }
      });
    }

    // Reader Bookmark Button
    const readerBookmarkBtn = document.getElementById('reader-bookmark-btn');
    if (readerBookmarkBtn) {
      readerBookmarkBtn.addEventListener('click', () => {
        if (!this.currentReadingArticle) return;
        this.toggleBookmark(this.currentReadingArticle.id);
        const isSaved = this.bookmarks.includes(this.currentReadingArticle.id);
        readerBookmarkBtn.classList.toggle('active', isSaved);
      });
    }

    // Newsletter Submission Handlers
    document.querySelectorAll('.newsletter-form').forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        if (input && input.value) {
          this.showToast(`Subscribed! Weekly dispatch will be sent to ${input.value}`, 'success');
          input.value = '';
        }
      });
    });

    // Contact Form Handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        this.showToast(`Thank you, ${name}! Your inquiry has been routed to our editors.`, 'success');
        contactForm.reset();
      });
    }
  }

  handleScrollProgress() {
    const docElem = document.documentElement;
    const docBody = document.body;
    const scrollTop = docElem.scrollTop || docBody.scrollTop;
    const scrollHeight = (docElem.scrollHeight || docBody.scrollHeight) - docElem.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    
    const progressBar = document.getElementById('reading-progress');
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }
  }

  /* --------------------------------------------------------------------------
     HOME PAGE RENDERING
     -------------------------------------------------------------------------- */
  renderHome() {
    if (!window.NOVA_DATA) return;
    const articles = window.NOVA_DATA.articles;

    // Featured Spotlight
    const spotlight = articles.find(a => a.featured) || articles[0];
    const spotlightContainer = document.getElementById('home-spotlight-container');
    if (spotlightContainer && spotlight) {
      spotlightContainer.innerHTML = `
        <div class="spotlight-card" onclick="window.NovaApp.openArticle('${spotlight.id}')">
          <div class="spotlight-image-wrap">
            <span class="spotlight-badge badge-category">Lead Spotlight</span>
            <img src="${spotlight.image}" alt="${spotlight.title}" loading="lazy" />
          </div>
          <div class="spotlight-body">
            <div class="article-card-meta">
              <span class="badge-category">${spotlight.categoryName}</span>
              <span>•</span>
              <span>${spotlight.date}</span>
              <span>•</span>
              <span class="read-time">${spotlight.readTime}</span>
            </div>
            <h2 class="spotlight-title">${spotlight.title}</h2>
            <p class="spotlight-excerpt">${spotlight.excerpt}</p>
            <div class="article-card-footer">
              <div class="author-chip">
                <img class="author-avatar" src="${spotlight.author.avatar}" alt="${spotlight.author.name}" />
                <span class="author-name">${spotlight.author.name}</span>
              </div>
              <span class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.85rem;">
                Read Story →
              </span>
            </div>
          </div>
        </div>
      `;
    }

    // Side Stack (Trending Items)
    const sideStackContainer = document.getElementById('home-side-stack-container');
    if (sideStackContainer) {
      const sideArticles = articles.filter(a => a.id !== spotlight.id).slice(0, 3);
      sideStackContainer.innerHTML = sideArticles.map(art => `
        <div class="side-card" onclick="window.NovaApp.openArticle('${art.id}')">
          <div class="side-card-num">${art.trendingRank}</div>
          <div class="side-card-info">
            <div style="font-size: 0.75rem; color: var(--accent-primary); margin-bottom: 2px; font-family: var(--font-mono); text-transform: uppercase;">
              ${art.categoryName}
            </div>
            <h4 class="side-card-title">${art.title}</h4>
            <div style="font-size: 0.8rem; color: var(--text-muted);">${art.readTime} • ${art.author.name}</div>
          </div>
        </div>
      `).join('');
    }

    // Ticker Marquee Items
    const tickerTrack = document.getElementById('ticker-track-container');
    if (tickerTrack) {
      const tickerContent = articles.map(art => `
        <div class="ticker-item" onclick="window.NovaApp.openArticle('${art.id}')">
          <strong>#${art.trendingRank}</strong>
          <span>${art.title}</span>
          <span style="color: var(--accent-primary); font-size: 0.8rem;">[${art.views} reads]</span>
        </div>
      `).join('');
      // Duplicate for infinite seamless scroll
      tickerTrack.innerHTML = tickerContent + tickerContent;
    }

    // Editors' Choice Grid (3 items)
    const editorsGrid = document.getElementById('home-editors-grid');
    if (editorsGrid) {
      const gridItems = articles.slice(1, 4);
      editorsGrid.innerHTML = gridItems.map(art => this.generateCardHtml(art)).join('');
    }
  }

  /* --------------------------------------------------------------------------
     BLOGS CATALOG RENDERING
     -------------------------------------------------------------------------- */
  renderBlogs() {
    if (!window.NOVA_DATA) return;
    const container = document.getElementById('blogs-catalog-container');
    const chipsContainer = document.getElementById('category-chips-container');
    if (!container) return;

    // Render Category Chips once
    if (chipsContainer && chipsContainer.children.length === 0) {
      chipsContainer.innerHTML = window.NOVA_DATA.categories.map(cat => `
        <button class="chip-btn ${this.currentCategory === cat.id ? 'active' : ''}" 
                onclick="window.NovaApp.setCategory('${cat.id}')">
          ${cat.name}
        </button>
      `).join('');
    }

    // Filter articles
    let filtered = window.NOVA_DATA.articles.filter(a => {
      const matchesCategory = this.currentCategory === 'all' || a.category === this.currentCategory;
      const matchesSearch = !this.searchQuery || 
        a.title.toLowerCase().includes(this.searchQuery) ||
        a.excerpt.toLowerCase().includes(this.searchQuery) ||
        a.author.name.toLowerCase().includes(this.searchQuery);
      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      container.className = 'container';
      container.innerHTML = `
        <div style="text-align: center; padding: 60px 0; color: var(--text-muted);">
          <svg style="margin: 0 auto 16px; opacity: 0.4;" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <h3>No essays found matching "${this.searchQuery}"</h3>
          <p style="margin-top: 8px;">Try refining your query or resetting category filters.</p>
          <button class="btn btn-secondary" onclick="window.NovaApp.resetFilters()" style="margin-top: 16px;">
            Reset Filters
          </button>
        </div>
      `;
      return;
    }

    if (this.currentViewMode === 'grid') {
      container.className = 'articles-grid';
      container.innerHTML = filtered.map(art => this.generateCardHtml(art)).join('');
    } else {
      container.className = 'blogs-list-container';
      container.innerHTML = filtered.map(art => this.generateListCardHtml(art)).join('');
    }
  }

  setCategory(catId) {
    this.currentCategory = catId;
    document.querySelectorAll('.chip-btn').forEach(btn => {
      if (btn.textContent.trim().toLowerCase().includes(catId) || (catId === 'all' && btn.textContent.includes('All'))) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    this.renderBlogs();
  }

  resetFilters() {
    this.currentCategory = 'all';
    this.searchQuery = '';
    const searchInput = document.getElementById('blogs-search-input');
    if (searchInput) searchInput.value = '';
    this.setCategory('all');
  }

  /* --------------------------------------------------------------------------
     ABOUT PAGE RENDERING
     -------------------------------------------------------------------------- */
  renderAbout() {
    if (!window.NOVA_DATA) return;

    // Team Grid
    const teamGrid = document.getElementById('about-team-grid');
    if (teamGrid) {
      teamGrid.innerHTML = window.NOVA_DATA.authors.map(author => `
        <div class="team-card">
          <img class="team-avatar" src="${author.avatar}" alt="${author.name}" />
          <h3>${author.name}</h3>
          <div class="team-role">${author.role}</div>
          <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6;">${author.bio}</p>
        </div>
      `).join('');
    }

    // Stats Grid
    const statsContainer = document.getElementById('about-stats-container');
    if (statsContainer) {
      statsContainer.innerHTML = window.NOVA_DATA.stats.map(s => `
        <div class="stat-card">
          <div class="stat-number">${s.target.toLocaleString()}${s.suffix}</div>
          <div class="stat-label">${s.label}</div>
        </div>
      `).join('');
    }
  }

  /* --------------------------------------------------------------------------
     FAQ RENDERING
     -------------------------------------------------------------------------- */
  renderFaq() {
    if (!window.NOVA_DATA) return;
    const container = document.getElementById('contact-faq-container');
    if (!container) return;

    container.innerHTML = window.NOVA_DATA.faqs.map((faq, idx) => `
      <div class="accordion-item ${idx === 0 ? 'active' : ''}">
        <button class="accordion-trigger" onclick="window.NovaApp.toggleFaq(this)">
          <span>${faq.q}</span>
          <svg class="accordion-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        <div class="accordion-body">
          <p>${faq.a}</p>
        </div>
      </div>
    `).join('');
  }

  toggleFaq(btn) {
    const item = btn.closest('.accordion-item');
    if (item) {
      item.classList.toggle('active');
    }
  }

  /* --------------------------------------------------------------------------
     HTML CARD GENERATORS
     -------------------------------------------------------------------------- */
  generateCardHtml(art) {
    const isBookmarked = this.bookmarks.includes(art.id);
    return `
      <div class="article-card" onclick="window.NovaApp.openArticle('${art.id}')">
        <div class="article-card-thumb">
          <img src="${art.image}" alt="${art.title}" loading="lazy" />
          <button class="bookmark-btn ${isBookmarked ? 'active' : ''}" 
                  title="${isBookmarked ? 'Remove Bookmark' : 'Bookmark Article'}"
                  onclick="event.stopPropagation(); window.NovaApp.toggleBookmark('${art.id}')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="${isBookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
        </div>
        <div class="article-card-body">
          <div class="article-card-meta">
            <span class="badge-category ${art.badgeClass}">${art.categoryName}</span>
            <span>${art.date}</span>
          </div>
          <h3 class="article-card-title">${art.title}</h3>
          <p class="article-card-excerpt">${art.excerpt}</p>
          <div class="article-card-footer">
            <div class="author-chip">
              <img class="author-avatar" src="${art.author.avatar}" alt="${art.author.name}" />
              <span class="author-name">${art.author.name}</span>
            </div>
            <span class="read-time">${art.readTime}</span>
          </div>
        </div>
      </div>
    `;
  }

  generateListCardHtml(art) {
    const isBookmarked = this.bookmarks.includes(art.id);
    return `
      <div class="article-card-list" onclick="window.NovaApp.openArticle('${art.id}')">
        <div class="article-card-thumb">
          <img src="${art.image}" alt="${art.title}" loading="lazy" />
          <button class="bookmark-btn ${isBookmarked ? 'active' : ''}" 
                  onclick="event.stopPropagation(); window.NovaApp.toggleBookmark('${art.id}')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="${isBookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
        </div>
        <div class="article-card-body">
          <div class="article-card-meta">
            <span class="badge-category ${art.badgeClass}">${art.categoryName}</span>
            <span>${art.date}</span>
            <span>•</span>
            <span class="read-time">${art.readTime}</span>
          </div>
          <h3 class="article-card-title">${art.title}</h3>
          <p class="article-card-excerpt">${art.excerpt}</p>
          <div class="article-card-footer">
            <div class="author-chip">
              <img class="author-avatar" src="${art.author.avatar}" alt="${art.author.name}" />
              <span class="author-name">${art.author.name}</span>
            </div>
            <span class="btn btn-outline" style="padding: 0.35rem 0.85rem; font-size: 0.8rem;">
              Read Deep-Dive →
            </span>
          </div>
        </div>
      </div>
    `;
  }

  /* --------------------------------------------------------------------------
     ARTICLE READER MODAL
     -------------------------------------------------------------------------- */
  openArticle(articleId) {
    const art = window.NOVA_DATA.articles.find(a => a.id === articleId);
    if (!art) return;

    this.currentReadingArticle = art;

    const overlay = document.getElementById('reader-modal-overlay');
    const heroImg = document.getElementById('reader-hero-img');
    const categoryBadge = document.getElementById('reader-category-badge');
    const title = document.getElementById('reader-modal-title');
    const meta = document.getElementById('reader-modal-meta');
    const authorAvatar = document.getElementById('reader-author-avatar');
    const authorName = document.getElementById('reader-author-name');
    const body = document.getElementById('reader-modal-body');
    const likeBtn = document.getElementById('reader-like-btn');
    const likeCount = document.getElementById('reader-like-count');
    const bookmarkBtn = document.getElementById('reader-bookmark-btn');

    if (heroImg) heroImg.src = art.image;
    if (categoryBadge) {
      categoryBadge.textContent = art.categoryName;
      categoryBadge.className = `badge-category ${art.badgeClass}`;
    }
    if (title) title.textContent = art.title;
    if (meta) meta.textContent = `${art.date} • ${art.readTime} • ${art.views} reads`;
    if (authorAvatar) authorAvatar.src = art.author.avatar;
    if (authorName) authorName.textContent = art.author.name;
    if (body) body.innerHTML = art.contentHtml;

    // Check Likes state
    const isLiked = !!this.likes[art.id];
    if (likeBtn) likeBtn.classList.toggle('active', isLiked);
    if (likeCount) likeCount.textContent = isLiked ? art.likes + 1 : art.likes;

    // Check Bookmark state
    const isBookmarked = this.bookmarks.includes(art.id);
    if (bookmarkBtn) bookmarkBtn.classList.toggle('active', isBookmarked);

    if (overlay) {
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  closeReaderModal() {
    const overlay = document.getElementById('reader-modal-overlay');
    if (overlay) {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
    this.currentReadingArticle = null;
  }

  /* --------------------------------------------------------------------------
     BOOKMARKS & DRAWER
     -------------------------------------------------------------------------- */
  toggleBookmark(articleId) {
    const idx = this.bookmarks.indexOf(articleId);
    if (idx > -1) {
      this.bookmarks.splice(idx, 1);
      this.showToast('Article removed from saved library.', 'info');
    } else {
      this.bookmarks.push(articleId);
      this.showToast('Article saved to your library!', 'success');
    }

    localStorage.setItem('nova_bookmarks', JSON.stringify(this.bookmarks));
    this.updateBookmarkBadge();
    this.renderHome();
    this.renderBlogs();
    this.renderBookmarkDrawer();
  }

  updateBookmarkBadge() {
    const badge = document.getElementById('bookmark-badge-count');
    if (badge) {
      badge.textContent = this.bookmarks.length;
      badge.style.display = this.bookmarks.length > 0 ? 'flex' : 'none';
    }
  }

  openBookmarkDrawer() {
    this.renderBookmarkDrawer();
    const drawer = document.getElementById('bookmark-drawer');
    const overlay = document.getElementById('drawer-overlay');
    if (drawer) drawer.classList.add('open');
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  closeBookmarkDrawer() {
    const drawer = document.getElementById('bookmark-drawer');
    const overlay = document.getElementById('drawer-overlay');
    if (drawer) drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  renderBookmarkDrawer() {
    const container = document.getElementById('bookmark-drawer-list');
    if (!container || !window.NOVA_DATA) return;

    if (this.bookmarks.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 40px 0; color: var(--text-muted);">
          <svg style="margin: 0 auto 12px; opacity: 0.3;" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
          <p>No saved essays yet.</p>
          <p style="font-size: 0.8rem; margin-top: 4px;">Click the bookmark icon on any story to save it for later.</p>
        </div>
      `;
      return;
    }

    const savedArticles = window.NOVA_DATA.articles.filter(a => this.bookmarks.includes(a.id));
    container.innerHTML = savedArticles.map(art => `
      <div class="bookmark-item">
        <img src="${art.image}" alt="${art.title}" />
        <div style="flex-grow: 1; min-width: 0;">
          <h4 style="font-size: 0.9rem; line-height: 1.3; margin-bottom: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
            ${art.title}
          </h4>
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 8px;">
            ${art.author.name} • ${art.readTime}
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-outline" style="padding: 2px 8px; font-size: 0.75rem;" 
                    onclick="window.NovaApp.closeBookmarkDrawer(); window.NovaApp.openArticle('${art.id}')">
              Read
            </button>
            <button class="btn btn-outline" style="padding: 2px 8px; font-size: 0.75rem; color: var(--accent-rose);" 
                    onclick="window.NovaApp.toggleBookmark('${art.id}')">
              Remove
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  /* --------------------------------------------------------------------------
     MOBILE NAVIGATION DRAWER
     -------------------------------------------------------------------------- */
  openMobileDrawer() {
    const drawer = document.getElementById('mobile-drawer');
    const overlay = document.getElementById('drawer-overlay');
    if (drawer) drawer.classList.add('open');
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  closeMobileDrawer() {
    const drawer = document.getElementById('mobile-drawer');
    const overlay = document.getElementById('drawer-overlay');
    if (drawer) drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* --------------------------------------------------------------------------
     TOAST NOTIFICATION ENGINE
     -------------------------------------------------------------------------- */
  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        ${type === 'success' 
          ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>'
          : '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>'
        }
      </svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 250);
    }, 3500);
  }
}

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
  window.NovaApp = new NovaAppController();
  window.NovaPaymentInstance = new NovaPayment();

  // Setup SPA Router
  window.NovaRouterInstance = new NovaRouter({
    home: () => {},
    blogs: () => window.NovaApp.renderBlogs(),
    about: () => window.NovaApp.renderAbout(),
    contact: () => window.NovaApp.renderFaq(),
    payment: () => window.NovaPaymentInstance.renderPricingCards()
  });
});
