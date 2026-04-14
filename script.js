/* ═══════════════════════════════════════════════════════════
   NOVADROBE — script.js
   Main application logic: navigation, products, UI
═══════════════════════════════════════════════════════════ */

'use strict';

/* ── STATE ── */
let products        = [];
let currentPage     = 'home';
let currentFilter   = 'All';
let currentProduct  = null;

/* ── SVG ICONS (inline) ── */
const ICONS = {
  bag: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
  bagSm: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
  wa: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  arrow: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`,
  check: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  insta: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
  fb: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`,
};

const WA_NUMBER = '919876543210';
const WA_BASE   = `https://wa.me/${WA_NUMBER}`;

/* ═══════════════════════════════════════════
   INIT
═══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
  initNav();
  initHeroParallax();
  initFAQ();
});

/* ── LOAD PRODUCTS ── */
async function loadProducts() {
  try {
    const res = await fetch('products.json');
    products = await res.json();
  } catch (e) {
    // Fallback inline data if fetch fails (e.g., file:// protocol)
    products = FALLBACK_PRODUCTS;
  }
  renderFeaturedGrid();
  renderShopGrid('All');
}

/* ═══════════════════════════════════════════
   NAVIGATION
═══════════════════════════════════════════ */
function initNav() {
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('mainNav');
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });
}

function showPage(page, productId) {
  // Hide all
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(`page-${page}`).classList.add('active');
  currentPage = page;

  // Update nav active state
  document.querySelectorAll('#navLinks a').forEach(a => a.classList.remove('active'));
  const activeLink = page === 'product' ? 'shop' : page;
  const el = document.getElementById(`nav-${activeLink}`);
  if (el) el.classList.add('active');

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Page-specific actions
  if (page === 'shop')    renderShopGrid(currentFilter);
  if (page === 'product') renderProductDetail(productId);
  if (page === 'home')    initHeroParallax();

  // Close mobile menu
  closeMobileMenu();
}

function toggleMobileMenu() {
  const menu    = document.getElementById('mobileMenu');
  const burger  = document.getElementById('hamburger');
  const isOpen  = menu.classList.toggle('open');
  burger.classList.toggle('open', isOpen);
}

function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}

/* ── HERO PARALLAX ── */
function initHeroParallax() {
  const img = document.getElementById('heroImg');
  if (!img) return;
  const handler = () => {
    if (currentPage !== 'home') return;
    img.style.transform = `translateY(${window.scrollY * 0.38}px)`;
  };
  window.removeEventListener('scroll', window._parallaxHandler);
  window._parallaxHandler = handler;
  window.addEventListener('scroll', handler, { passive: true });
}

/* ═══════════════════════════════════════════
   PRODUCT HELPERS
═══════════════════════════════════════════ */
function formatPrice(n) {
  return '₹' + Number(n).toLocaleString('en-IN');
}

function discount(p) {
  if (!p.originalPrice) return null;
  return Math.round((1 - p.price / p.originalPrice) * 100);
}

function waLink(p) {
  const msg = encodeURIComponent(
    `Hi! I'm interested in the *${p.name}* (${formatPrice(p.price)}). Could you please share more details?`
  );
  return `${WA_BASE}?text=${msg}`;
}

/* ═══════════════════════════════════════════
   PRODUCT CARD HTML
═══════════════════════════════════════════ */
function buildProductCard(p) {
  const disc    = discount(p);
  const tagHTML = p.tag
    ? `<div class="product-tag">${p.tag}</div>`
    : '';
  const outHTML = !p.inStock
    ? `<div class="product-out-badge">Out of Stock</div>`
    : '';
  const origHTML = p.originalPrice
    ? `<span class="product-original">${formatPrice(p.originalPrice)}</span>`
    : '';
  const discHTML = disc
    ? `<span class="product-discount">-${disc}%</span>`
    : '';
  const btnHTML = p.inStock
    ? `<a href="${waLink(p)}" target="_blank" rel="noopener" class="product-wa-btn" onclick="event.stopPropagation()">
        ${ICONS.wa} Order on WhatsApp
       </a>`
    : `<button class="product-wa-btn" disabled>Out of Stock</button>`;

  return `
    <div class="product-card ${!p.inStock ? 'out-of-stock' : ''}" onclick="openProduct(${p.id})">
      <div class="product-card-img">
        <img src="${p.image}" alt="${p.name}" loading="lazy" />
        <div class="product-card-overlay"></div>
        ${tagHTML}
        ${outHTML}
      </div>
      <div class="product-card-info">
        <div class="product-category">${p.category}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-pricing">
          <span class="product-price">${formatPrice(p.price)}</span>
          ${origHTML}
          ${discHTML}
        </div>
        ${btnHTML}
      </div>
    </div>`;
}

/* ═══════════════════════════════════════════
   HOME — FEATURED GRID
═══════════════════════════════════════════ */
function renderFeaturedGrid() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;
  const featured = products.filter(p => p.tag && p.inStock).slice(0, 4);
  grid.innerHTML = (featured.length ? featured : products.slice(0, 4))
    .map(buildProductCard).join('');
}

/* ═══════════════════════════════════════════
   SHOP — GRID + FILTERS
═══════════════════════════════════════════ */
function renderShopGrid(filter) {
  currentFilter = filter;
  const grid = document.getElementById('shopGrid');
  if (!grid) return;

  const filtered = filter === 'All'
    ? products
    : products.filter(p => p.category === filter);

  if (!filtered.length) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--white60);">No products found.</div>`;
    return;
  }
  grid.innerHTML = filtered.map(buildProductCard).join('');
}

function filterProducts(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderShopGrid(cat);
}

/* ═══════════════════════════════════════════
   PRODUCT DETAIL
═══════════════════════════════════════════ */
function openProduct(id) {
  currentProduct = id;
  showPage('product', id);
}

function renderProductDetail(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;

  currentProduct = p;
  const disc = discount(p);
  const savingsHTML = disc
    ? `<span class="product-detail-original">${formatPrice(p.originalPrice)}</span>
       <span class="product-detail-savings">You save ${formatPrice(p.originalPrice - p.price)} (${disc}% off)</span>`
    : '';

  const colorsHTML = p.colors && p.colors.length
    ? `<div class="colors-section">
        <div class="colors-heading">Available Colors</div>
        <div class="color-chips">
          ${p.colors.map((c, i) =>
            `<div class="color-chip ${i === 0 ? 'selected' : ''}" onclick="selectColor(this)">${c}</div>`
          ).join('')}
        </div>
       </div>`
    : '';

  const ctaHTML = p.inStock
    ? `<a href="${waLink(p)}" target="_blank" rel="noopener" class="btn btn-gold btn-full product-cta">
        ${ICONS.wa} Order on WhatsApp
       </a>`
    : `<button class="btn btn-dark btn-full product-cta" disabled>Currently Out of Stock</button>`;

  document.getElementById('productDetailContent').innerHTML = `
    <div class="product-detail-img">
      <img src="${p.image}" alt="${p.name}" />
    </div>
    <div class="product-detail-info">
      <div class="product-detail-cat">${p.category}</div>
      <h1 class="product-detail-name">${p.name}</h1>
      <div class="product-detail-pricing">
        <span class="product-detail-price">${formatPrice(p.price)}</span>
        ${savingsHTML}
      </div>
      <p class="product-detail-desc">${p.description}</p>
      <div class="features-heading">Key Features</div>
      <ul class="features-list">
        ${p.features.map(f => `<li>${ICONS.check} <span>${f}</span></li>`).join('')}
      </ul>
      ${colorsHTML}
      ${ctaHTML}
      <p class="product-shipping-note">🚚 Free shipping on orders above ₹2,000 &nbsp;|&nbsp; 📦 2–5 business days</p>
      <div class="product-meta-table">
        <div class="meta-row"><span class="meta-label">Material</span><span class="meta-value">Premium Genuine Leather</span></div>
        <div class="meta-row"><span class="meta-label">Dimensions</span><span class="meta-value">As per product specs</span></div>
        <div class="meta-row"><span class="meta-label">Shipping</span><span class="meta-value">2–5 Business Days</span></div>
        <div class="meta-row"><span class="meta-label">Returns</span><span class="meta-value">7 Days Easy Return</span></div>
        <div class="meta-row"><span class="meta-label">Payment</span><span class="meta-value">WhatsApp / UPI / COD</span></div>
        <div class="meta-row"><span class="meta-label">Warranty</span><span class="meta-value">6 Months on Hardware</span></div>
      </div>
    </div>`;

  // Related products
  const related = products.filter(x => x.id !== id && x.category === p.category).slice(0, 4);
  const relatedEl = document.getElementById('relatedSection');
  if (related.length) {
    relatedEl.innerHTML = `
      <h2>You May Also Like</h2>
      <div class="related-grid">
        ${related.map(r => `
          <div class="related-card" onclick="openProduct(${r.id})">
            <div class="related-img"><img src="${r.image}" alt="${r.name}" loading="lazy"/></div>
            <div class="related-name">${r.name}</div>
            <div class="related-price">${formatPrice(r.price)}</div>
          </div>`).join('')}
      </div>`;
  } else {
    relatedEl.innerHTML = '';
  }
}

function selectColor(el) {
  document.querySelectorAll('.color-chip').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
}

/* ═══════════════════════════════════════════
   FAQ ACCORDION
═══════════════════════════════════════════ */
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

/* ═══════════════════════════════════════════
   TOAST
═══════════════════════════════════════════ */
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span class="toast-icon">✦</span> ${msg}`;
  toast.classList.add('show');
  clearTimeout(window._toastTimeout);
  window._toastTimeout = setTimeout(() => toast.classList.remove('show'), 3200);
}

/* ═══════════════════════════════════════════
   FALLBACK PRODUCT DATA
   (used when products.json can't be fetched)
═══════════════════════════════════════════ */
const FALLBACK_PRODUCTS = [
  {
    id: 1, name: "Midnight Noir Tote", price: 2499, originalPrice: 2999, category: "Tote Bags",
    tag: "Bestseller", inStock: true,
    image: "https://images.unsplash.com/photo-1740018182436-a48ed4fcd6e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    description: "Elegant black tote bag crafted from premium leather. Perfect for daily essentials and work.",
    features: ["Premium genuine leather","Spacious main compartment","Inner pockets for organization","Comfortable shoulder straps","Gold-tone hardware accents"],
    colors: ["Black","Tan"]
  },
  {
    id: 2, name: "Golden Hour Sling", price: 1899, originalPrice: 2199, category: "Sling Bags",
    tag: "New Arrival", inStock: true,
    image: "https://images.unsplash.com/photo-1765114459508-2666016760af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    description: "Compact sling bag with sleek design. Ideal for evenings out and casual occasions.",
    features: ["Adjustable chain strap","Compact yet spacious","Magnetic closure","Lightweight design","Perfect for essentials"],
    colors: ["Gold","Black"]
  },
  {
    id: 3, name: "Urban Chic Shoulder", price: 2199, originalPrice: 2599, category: "Shoulder Bags",
    tag: "Trending", inStock: true,
    image: "https://images.unsplash.com/photo-1713425887354-274bc15dfc77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    description: "Versatile shoulder bag that transitions seamlessly from day to night.",
    features: ["Structured silhouette","Multiple compartments","Premium leather finish","Adjustable shoulder strap","Secure zipper closure"],
    colors: ["Brown","Black","Nude"]
  },
  {
    id: 4, name: "Luxe Caramel Tote", price: 2799, originalPrice: 3299, category: "Tote Bags",
    tag: "Premium", inStock: true,
    image: "https://images.unsplash.com/photo-1723779206750-b5cf68244813?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    description: "Sophisticated tote in rich caramel tone. A timeless piece for the modern woman.",
    features: ["Rich caramel leather","Roomy interior","Interior zip pocket","Dual carrying handles","Minimalist design"],
    colors: ["Caramel","Tan"]
  },
  {
    id: 5, name: "Moonlight Crossbody", price: 1799, originalPrice: 2099, category: "Sling Bags",
    tag: "Popular", inStock: true,
    image: "https://images.unsplash.com/photo-1774259479601-69a44c70bed1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    description: "Elegant crossbody bag with premium finish. Perfect for hands-free convenience.",
    features: ["Crossbody strap design","Compact size","Premium clasp closure","Soft leather texture","Versatile styling"],
    colors: ["Black","White"]
  },
  {
    id: 6, name: "Slate Grey Shoulder", price: 2299, originalPrice: 2699, category: "Shoulder Bags",
    tag: "", inStock: true,
    image: "https://images.unsplash.com/photo-1621985191560-99df9ed0564a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    description: "Contemporary shoulder bag in sophisticated grey. Modern elegance meets functionality.",
    features: ["Contemporary design","Premium grey leather","Multiple pockets","Comfortable strap","Everyday versatility"],
    colors: ["Grey","Black"]
  },
  {
    id: 7, name: "Noir Elegance Sling", price: 2099, originalPrice: 2399, category: "Sling Bags",
    tag: "New Arrival", inStock: true,
    image: "https://images.unsplash.com/photo-1775654225406-942719a69f53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    description: "Sleek black sling bag that adds sophistication to any outfit.",
    features: ["Sleek black finish","Gold hardware details","Chain strap","Compact design","Perfect for occasions"],
    colors: ["Black"]
  },
  {
    id: 8, name: "Crimson Statement Shoulder", price: 2599, originalPrice: 3099, category: "Shoulder Bags",
    tag: "Limited", inStock: false,
    image: "https://images.unsplash.com/photo-1713425886673-fb8b7abb36a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    description: "Bold shoulder bag that makes a statement. For the confident, fashion-forward woman.",
    features: ["Bold design","Premium craftsmanship","Spacious interior","Adjustable strap","Statement piece"],
    colors: ["Red","Black"]
  }
];
