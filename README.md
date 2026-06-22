<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>NOVADROBE — Heritage Theme Complete Setup</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap');

  :root {
    --black: #0A0A0A;
    --white: #F5F3EE;
    --gold: #C9A84C;
    --gold-light: #E8D08A;
    --gold-dim: #7A6330;
    --grey: #1A1A1A;
    --mid: #2A2A2A;
    --border: rgba(201,168,76,0.2);
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: #0D0D0D;
    color: #E8E6E0;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    line-height: 1.7;
  }

  /* ─── LAYOUT ─── */
  .container { max-width: 960px; margin: 0 auto; padding: 0 32px; }

  /* ─── HEADER ─── */
  .doc-header {
    border-bottom: 1px solid var(--border);
    padding: 48px 0 32px;
    text-align: center;
    background: linear-gradient(180deg, rgba(201,168,76,0.05) 0%, transparent 100%);
  }

  .brand-badge {
    display: inline-block;
    font-family: 'Inter', sans-serif;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.3em;
    color: var(--gold);
    border: 1px solid var(--border);
    padding: 4px 16px;
    margin-bottom: 20px;
    text-transform: uppercase;
  }

  .doc-header h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(36px, 5vw, 56px);
    font-weight: 300;
    color: var(--white);
    letter-spacing: 0.04em;
    line-height: 1.1;
  }

  .doc-header h1 em { color: var(--gold); font-style: italic; }

  .doc-header p {
    margin-top: 12px;
    font-size: 13px;
    color: #888;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  /* ─── NAV ─── */
  .toc {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 24px 0;
    border-bottom: 1px solid var(--border);
    justify-content: center;
  }

  .toc a {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #888;
    text-decoration: none;
    padding: 6px 14px;
    border: 1px solid #2A2A2A;
    transition: all 0.2s;
  }

  .toc a:hover { color: var(--gold); border-color: var(--border); }

  /* ─── SECTIONS ─── */
  .section {
    padding: 60px 0;
    border-bottom: 1px solid #1C1C1C;
  }

  .section-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 8px;
  }

  .section h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 32px;
    font-weight: 300;
    color: var(--white);
    margin-bottom: 16px;
    letter-spacing: 0.02em;
  }

  .section > p {
    color: #999;
    max-width: 640px;
    margin-bottom: 32px;
    font-size: 14px;
  }

  /* ─── CODE BLOCKS ─── */
  .code-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.2em;
    color: var(--gold);
    text-transform: uppercase;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .code-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  pre {
    background: #111;
    border: 1px solid #222;
    border-left: 2px solid var(--gold-dim);
    padding: 20px 24px;
    overflow-x: auto;
    font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
    font-size: 12px;
    line-height: 1.8;
    color: #C8C5BB;
    margin-bottom: 24px;
    white-space: pre;
  }

  code { color: var(--gold-light); }

  .copy-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: transparent;
    border: 1px solid #333;
    color: #888;
    font-size: 11px;
    font-family: 'Inter', sans-serif;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 6px 16px;
    cursor: pointer;
    transition: all 0.2s;
    margin-bottom: 32px;
  }

  .copy-btn:hover { color: var(--gold); border-color: var(--border); }

  /* ─── STEPS ─── */
  .step-list { list-style: none; counter-reset: step; }

  .step-list li {
    counter-increment: step;
    display: flex;
    gap: 20px;
    padding: 20px 0;
    border-bottom: 1px solid #1A1A1A;
  }

  .step-list li:last-child { border-bottom: none; }

  .step-num {
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Cormorant Garamond', serif;
    font-size: 14px;
    color: var(--gold);
    margin-top: 2px;
  }

  .step-content h4 {
    font-size: 13px;
    font-weight: 600;
    color: var(--white);
    margin-bottom: 4px;
    letter-spacing: 0.05em;
  }

  .step-content p { color: #888; font-size: 13px; }

  .step-content .path {
    display: inline-block;
    background: #161616;
    border: 1px solid #2A2A2A;
    padding: 2px 8px;
    font-family: monospace;
    font-size: 11px;
    color: var(--gold-light);
    margin-top: 6px;
  }

  /* ─── INFO CARDS ─── */
  .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-top: 24px; }

  .card {
    background: #111;
    border: 1px solid #222;
    padding: 24px;
  }

  .card .card-icon {
    font-size: 20px;
    margin-bottom: 12px;
  }

  .card h4 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 18px;
    font-weight: 400;
    color: var(--white);
    margin-bottom: 6px;
  }

  .card p { font-size: 12px; color: #777; }

  /* ─── ALERT ─── */
  .alert {
    background: rgba(201,168,76,0.05);
    border: 1px solid rgba(201,168,76,0.2);
    border-left: 3px solid var(--gold);
    padding: 16px 20px;
    margin: 24px 0;
    font-size: 13px;
    color: #AAA;
  }

  .alert strong { color: var(--gold); }

  /* ─── FOOTER ─── */
  .doc-footer {
    text-align: center;
    padding: 48px 0;
    color: #444;
    font-size: 12px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }

  @media (max-width: 600px) {
    .container { padding: 0 20px; }
    pre { font-size: 11px; padding: 16px; }
  }
</style>
</head>
<body>

<div class="doc-header">
  <div class="container">
    <div class="brand-badge">Novadrobe × Heritage Theme</div>
    <h1>Complete Store Setup<br><em>Go Live Guide</em></h1>
    <p>Heritage 4.1 · Shopify · Monaco Luxury Direction · June 2026</p>
  </div>
</div>

<div class="container">

  <!-- TOC -->
  <nav class="toc">
    <a href="#css">Main CSS</a>
    <a href="#header">Header</a>
    <a href="#hero">Hero</a>
    <a href="#collections">Collections</a>
    <a href="#product">Product Page</a>
    <a href="#login">Customer Login</a>
    <a href="#footer">Footer</a>
    <a href="#checklist">Go-Live Checklist</a>
  </nav>


  <!-- ═══════════════════════════════════════ -->
  <!-- 1. MAIN CSS -->
  <!-- ═══════════════════════════════════════ -->
  <section class="section" id="css">
    <div class="section-label">Step 01</div>
    <h2>Main Theme CSS</h2>
    <p>Paste this in Shopify → Online Store → Themes → ⋯ → Edit Code → <code>assets/base.css</code> at the very bottom. This overrides Heritage defaults with NOVADROBE's Monaco dark luxury palette.</p>

    <div class="code-label">assets/base.css — paste at bottom</div>
    <pre>/* ═══════════════════════════════════════════
   NOVADROBE — Monaco Luxury Override
   Heritage 4.1 · novadrobe.store
   ═══════════════════════════════════════════ */

/* ── FONTS ── */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Inter:wght@300;400;500&display=swap');

/* ── TOKENS ── */
:root {
  --nv-black:      #0A0A0A;
  --nv-white:      #F5F3EE;
  --nv-gold:       #C9A84C;
  --nv-gold-light: #E8D08A;
  --nv-gold-dim:   rgba(201,168,76,0.18);
  --nv-grey1:      #111111;
  --nv-grey2:      #1A1A1A;
  --nv-grey3:      #2A2A2A;
  --nv-text:       #E0DDD7;
  --nv-muted:      #888888;
  --nv-radius:     0px;
  --nv-font-head:  'Cormorant Garamond', Georgia, serif;
  --nv-font-body:  'Inter', system-ui, sans-serif;
}

/* ── GLOBAL RESET ── */
*, *::before, *::after { border-radius: var(--nv-radius) !important; }

body, html {
  background-color: var(--nv-black) !important;
  color: var(--nv-text) !important;
  font-family: var(--nv-font-body) !important;
  -webkit-font-smoothing: antialiased;
}

/* ── TYPOGRAPHY ── */
h1, h2, h3, h4, h5 {
  font-family: var(--nv-font-head) !important;
  font-weight: 300 !important;
  letter-spacing: 0.03em !important;
  color: var(--nv-white) !important;
}

.heading, .h1, .h2 { font-family: var(--nv-font-head) !important; }

p, li, span, label, input, textarea, select {
  font-family: var(--nv-font-body) !important;
  color: var(--nv-text) !important;
}

a { color: var(--nv-text) !important; text-decoration: none !important; }
a:hover { color: var(--nv-gold) !important; }

/* ── HEADER ── */
.header, header, .site-header {
  background-color: var(--nv-black) !important;
  border-bottom: 1px solid var(--nv-gold-dim) !important;
  padding: 0 !important;
}

.header__heading-link, .header__heading {
  font-family: var(--nv-font-head) !important;
  font-size: 22px !important;
  font-weight: 300 !important;
  letter-spacing: 0.3em !important;
  text-transform: uppercase !important;
  color: var(--nv-white) !important;
}

.header__menu-item,
.header__menu-item a,
nav a {
  font-family: var(--nv-font-body) !important;
  font-size: 11px !important;
  font-weight: 400 !important;
  letter-spacing: 0.2em !important;
  text-transform: uppercase !important;
  color: var(--nv-muted) !important;
  transition: color 0.2s !important;
}

.header__menu-item:hover a,
nav a:hover {
  color: var(--nv-gold) !important;
}

.header__icon svg, .header__icon path {
  stroke: var(--nv-text) !important;
}

/* ── ANNOUNCEMENT BAR ── */
.announcement-bar {
  background-color: var(--nv-grey2) !important;
  border-bottom: 1px solid var(--nv-gold-dim) !important;
  font-size: 10px !important;
  letter-spacing: 0.25em !important;
  text-transform: uppercase !important;
  color: var(--nv-gold) !important;
  padding: 8px 0 !important;
}

/* ── HERO / SLIDESHOW ── */
.hero, .banner, .slideshow {
  background-color: var(--nv-grey1) !important;
  border-bottom: 1px solid var(--nv-gold-dim) !important;
}

.banner__heading, .hero__title, .slideshow__title {
  font-family: var(--nv-font-head) !important;
  font-size: clamp(48px, 6vw, 88px) !important;
  font-weight: 300 !important;
  letter-spacing: 0.04em !important;
  color: var(--nv-white) !important;
  line-height: 1.05 !important;
}

.banner__content { background: transparent !important; }

/* ── HERO BUTTONS ── */
.button, .btn, [type="submit"],
.banner__buttons .button,
.button--primary {
  background-color: transparent !important;
  border: 1px solid var(--nv-gold) !important;
  color: var(--nv-gold) !important;
  font-family: var(--nv-font-body) !important;
  font-size: 10px !important;
  font-weight: 500 !important;
  letter-spacing: 0.25em !important;
  text-transform: uppercase !important;
  padding: 14px 32px !important;
  transition: all 0.25s !important;
}

.button:hover, .btn:hover, .button--primary:hover {
  background-color: var(--nv-gold) !important;
  color: var(--nv-black) !important;
}

.button--secondary {
  border-color: var(--nv-gold-dim) !important;
  color: var(--nv-muted) !important;
}

/* ── PRODUCT CARDS ── */
.card, .product-card, .card-wrapper {
  background-color: var(--nv-grey1) !important;
  border: 1px solid #1E1E1E !important;
  transition: border-color 0.2s !important;
}

.card:hover, .card-wrapper:hover {
  border-color: var(--nv-gold-dim) !important;
}

.card__heading, .product-card__title {
  font-family: var(--nv-font-head) !important;
  font-size: 18px !important;
  font-weight: 300 !important;
  letter-spacing: 0.05em !important;
  color: var(--nv-white) !important;
}

.price, .price__regular, .price__sale {
  font-family: var(--nv-font-body) !important;
  font-size: 12px !important;
  font-weight: 400 !important;
  letter-spacing: 0.12em !important;
  color: var(--nv-gold) !important;
}

.badge, .product-badge {
  background-color: var(--nv-gold) !important;
  color: var(--nv-black) !important;
  font-size: 9px !important;
  font-weight: 600 !important;
  letter-spacing: 0.2em !important;
  text-transform: uppercase !important;
  padding: 3px 8px !important;
}

/* ── COLLECTION / SECTION HEADINGS ── */
.collection-list-with-view, .featured-collection,
.collection-hero {
  background: var(--nv-black) !important;
}

.section-heading,
.title--primary {
  font-family: var(--nv-font-head) !important;
  font-size: clamp(28px, 3.5vw, 48px) !important;
  font-weight: 300 !important;
  color: var(--nv-white) !important;
  letter-spacing: 0.04em !important;
}

/* ── DIVIDERS ── */
.section-with-padding::before {
  content: '';
  display: block;
  width: 40px;
  height: 1px;
  background: var(--nv-gold-dim);
  margin: 0 auto 48px;
}

hr { border-color: var(--nv-gold-dim) !important; }

/* ── PRODUCT PAGE ── */
.product__title {
  font-family: var(--nv-font-head) !important;
  font-size: clamp(28px, 3vw, 44px) !important;
  font-weight: 300 !important;
  letter-spacing: 0.04em !important;
}

.product__price { color: var(--nv-gold) !important; font-size: 14px !important; letter-spacing: 0.15em !important; }

.product__description, .product-description p {
  font-size: 13px !important;
  color: var(--nv-muted) !important;
  line-height: 1.9 !important;
}

/* Variant swatches */
.swatch, .color-swatch {
  border: 1px solid #333 !important;
  transition: border-color 0.2s !important;
}
.swatch--active, .swatch:hover {
  border-color: var(--nv-gold) !important;
  box-shadow: 0 0 0 1px var(--nv-gold) !important;
}

/* Size buttons */
.variant-input-wrapper .button,
.swatch__input + label {
  border: 1px solid #333 !important;
  background: transparent !important;
  color: var(--nv-muted) !important;
  font-size: 11px !important;
  font-weight: 400 !important;
  letter-spacing: 0.1em !important;
}

.swatch__input:checked + label,
.variant-input-wrapper .button--selected {
  border-color: var(--nv-gold) !important;
  color: var(--nv-gold) !important;
}

/* Add to cart */
.product-form__submit,
.shopify-payment-button__button {
  background-color: transparent !important;
  border: 1px solid var(--nv-gold) !important;
  color: var(--nv-gold) !important;
  font-size: 10px !important;
  font-weight: 500 !important;
  letter-spacing: 0.25em !important;
  text-transform: uppercase !important;
  padding: 16px 32px !important;
  width: 100% !important;
  transition: all 0.25s !important;
}

.product-form__submit:hover {
  background-color: var(--nv-gold) !important;
  color: var(--nv-black) !important;
}

/* Dynamic checkout (Buy Now) */
.shopify-payment-button__button--unbranded {
  background: var(--nv-grey2) !important;
  color: var(--nv-text) !important;
  border: 1px solid #333 !important;
}

/* ── CART ── */
.cart-drawer, .cart {
  background: var(--nv-grey1) !important;
  border-left: 1px solid var(--nv-gold-dim) !important;
}

.cart-drawer__header {
  border-bottom: 1px solid var(--nv-gold-dim) !important;
  background: var(--nv-black) !important;
}

.cart-item {
  border-bottom: 1px solid #1E1E1E !important;
}

.cart-item__name {
  font-family: var(--nv-font-head) !important;
  font-weight: 300 !important;
}

/* ── FORMS / INPUTS ── */
input[type="text"],
input[type="email"],
input[type="password"],
input[type="tel"],
input[type="number"],
input[type="search"],
textarea, select {
  background-color: var(--nv-grey1) !important;
  border: 1px solid #2A2A2A !important;
  border-bottom: 1px solid #3A3A3A !important;
  color: var(--nv-text) !important;
  font-family: var(--nv-font-body) !important;
  font-size: 13px !important;
  padding: 12px 16px !important;
  outline: none !important;
  transition: border-color 0.2s !important;
}

input:focus, textarea:focus, select:focus {
  border-color: var(--nv-gold) !important;
  box-shadow: none !important;
}

input::placeholder, textarea::placeholder {
  color: #555 !important;
  letter-spacing: 0.1em !important;
  font-size: 11px !important;
  text-transform: uppercase !important;
}

label {
  font-size: 10px !important;
  letter-spacing: 0.2em !important;
  text-transform: uppercase !important;
  color: var(--nv-muted) !important;
  font-weight: 500 !important;
  margin-bottom: 6px !important;
  display: block !important;
}

/* ── CUSTOMER LOGIN / ACCOUNT ── */
.customer, .template-customers-login,
.template-customers-register,
.template-customers-account {
  background: var(--nv-black) !important;
  min-height: 80vh;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.customer .title,
.customer h1,
.customer h2 {
  font-family: var(--nv-font-head) !important;
  font-size: 36px !important;
  font-weight: 300 !important;
  letter-spacing: 0.06em !important;
  color: var(--nv-white) !important;
  margin-bottom: 8px !important;
}

.login-page__form-header,
.account-page__title {
  text-align: center !important;
  margin-bottom: 32px !important;
}

.login-page__form-subheader {
  font-size: 11px !important;
  letter-spacing: 0.2em !important;
  color: var(--nv-muted) !important;
  text-transform: uppercase !important;
  text-align: center !important;
  margin-bottom: 32px !important;
}

/* Login card container */
.customer .field, .customer form, .customer-login-form {
  background: var(--nv-grey1) !important;
  border: 1px solid #222 !important;
  padding: 40px !important;
  max-width: 420px !important;
  width: 100% !important;
  margin: 0 auto !important;
}

/* Links on login/register page */
.customer a:not(.button) {
  color: var(--nv-gold) !important;
  font-size: 11px !important;
  letter-spacing: 0.1em !important;
  text-transform: uppercase !important;
  text-decoration: none !important;
}

.customer a:hover { opacity: 0.7 !important; }

/* Account dashboard */
.account-details, .order-list {
  background: var(--nv-grey1) !important;
  border: 1px solid #222 !important;
}

/* ── COLLECTION PAGE ── */
.collection-filters, .facets {
  background: var(--nv-grey1) !important;
  border-right: 1px solid #1E1E1E !important;
}

.facets__summary, .filter-label {
  font-size: 10px !important;
  letter-spacing: 0.2em !important;
  text-transform: uppercase !important;
  color: var(--nv-muted) !important;
}

/* ── FOOTER ── */
footer, .footer {
  background-color: var(--nv-grey1) !important;
  border-top: 1px solid var(--nv-gold-dim) !important;
  color: var(--nv-muted) !important;
}

.footer__heading {
  font-family: var(--nv-font-body) !important;
  font-size: 9px !important;
  font-weight: 600 !important;
  letter-spacing: 0.3em !important;
  text-transform: uppercase !important;
  color: var(--nv-white) !important;
  margin-bottom: 16px !important;
}

.footer__list a, .footer a {
  font-size: 12px !important;
  color: var(--nv-muted) !important;
  letter-spacing: 0.05em !important;
  transition: color 0.2s !important;
}

.footer__list a:hover, .footer a:hover {
  color: var(--nv-gold) !important;
}

.footer__copyright,
.copyright {
  font-size: 10px !important;
  letter-spacing: 0.2em !important;
  color: #444 !important;
  border-top: 1px solid #1A1A1A !important;
  padding-top: 24px !important;
  text-transform: uppercase !important;
}

/* ── NEWSLETTER ── */
.newsletter__form { border: 1px solid #222 !important; }

.newsletter__heading {
  font-family: var(--nv-font-head) !important;
  font-weight: 300 !important;
  color: var(--nv-white) !important;
}

/* ── MEDIA QUERIES ── */
@media (max-width: 749px) {
  .banner__heading, .hero__title {
    font-size: 42px !important;
  }

  .product__title {
    font-size: 28px !important;
  }

  .customer form {
    padding: 24px !important;
  }
}
</pre>

    <button class="copy-btn" onclick="copyCode('css-block')">⬡ Copy CSS</button>

    <div class="alert">
      <strong>Where to paste:</strong> Shopify Admin → Online Store → Themes → HERITAGE ⋯ → Edit Code → <code>assets/base.css</code> → scroll to very bottom → paste → Save
    </div>
  </section>


  <!-- ═══════════════════════════════════════ -->
  <!-- 2. HEADER SETUP -->
  <!-- ═══════════════════════════════════════ -->
  <section class="section" id="header">
    <div class="section-label">Step 02</div>
    <h2>Header Configuration</h2>
    <p>In the Theme Editor (Customize), configure the Header section exactly as below.</p>

    <ol class="step-list">
      <li>
        <div class="step-num">1</div>
        <div class="step-content">
          <h4>Logo / Brand Name</h4>
          <p>If using text logo: set store name to <code>NOVADROBE</code> in all caps. If uploading logo image, use a white PNG on transparent background. Logo width: <strong>140px</strong>.</p>
        </div>
      </li>
      <li>
        <div class="step-num">2</div>
        <div class="step-content">
          <h4>Navigation Menu</h4>
          <p>Create menu: <code>Home · Shop · Collections · About · Contact</code>. Keep it minimal — Monaco luxury brands don't overload the nav.</p>
        </div>
      </li>
      <li>
        <div class="step-num">3</div>
        <div class="step-content">
          <h4>Announcement Bar</h4>
          <p>Enable. Text: <code>COMPLIMENTARY SHIPPING ON ORDERS ABOVE ₹1,499 · NOVADROBE.STORE</code></p>
        </div>
      </li>
      <li>
        <div class="step-num">4</div>
        <div class="step-content">
          <h4>Sticky Header</h4>
          <p>Enable sticky header. This keeps navigation visible while scrolling — essential for a luxury experience.</p>
        </div>
      </li>
    </ol>
  </section>


  <!-- ═══════════════════════════════════════ -->
  <!-- 3. HERO SECTION -->
  <!-- ═══════════════════════════════════════ -->
  <section class="section" id="hero">
    <div class="section-label">Step 03</div>
    <h2>Homepage Hero</h2>
    <p>Heritage's "Heading" section becomes your NOVADROBE opening statement. Configure in Customize → Template → Heading.</p>

    <div class="code-label">Hero Text Content</div>
    <pre>HEADING (large):
Born in Monaco.
Worn in India.

SUBHEADING:
Luxury streetwear for the generation
that refuses to settle.

BUTTON 1 TEXT: Shop the Collection
BUTTON 1 LINK: /collections/all

BUTTON 2 TEXT: Our Story
BUTTON 2 LINK: /pages/about</pre>

    <div class="alert">
      <strong>Hero Image:</strong> Use a dark, cinematic photo — overcast sky, yacht dock, dark tarmac, city at night. Ratio: 16:9 desktop, 4:5 mobile. Add a dark overlay (60% black) in Canva before uploading so text stays readable. Or use solid dark background with no image for the clean minimal Monaco look.
    </div>

    <div class="code-label">Optional: Custom Hero Liquid Override</div>
    <p style="color:#888; margin-bottom:12px; font-size:13px;">If you want a full-width centered hero with the Monaco gold line accent, paste this into <code>sections/main-banner.liquid</code> just after the opening div:</p>
    <pre>&lt;!-- NOVADROBE Monaco Hero Accent --&gt;
&lt;style&gt;
  .banner__content-container::before {
    content: '';
    display: block;
    width: 40px;
    height: 1px;
    background: #C9A84C;
    margin: 0 auto 32px;
    opacity: 0.6;
  }
  .banner__heading::first-line {
    font-style: italic;
  }
&lt;/style&gt;</pre>
  </section>


  <!-- ═══════════════════════════════════════ -->
  <!-- 4. COLLECTIONS -->
  <!-- ═══════════════════════════════════════ -->
  <section class="section" id="collections">
    <div class="section-label">Step 04</div>
    <h2>Collections &amp; Product Grid</h2>
    <p>Heritage's "Collection list: Editorial" section is your visual showcase. Set these up in the Theme Editor.</p>

    <ol class="step-list">
      <li>
        <div class="step-num">1</div>
        <div class="step-content">
          <h4>Collection Names (create in Shopify Admin → Products → Collections)</h4>
          <p>Suggested: <code>Oversized Tees</code> · <code>Cargo Cuts</code> · <code>Hoodies &amp; Fleece</code> · <code>FAITH Drop</code></p>
        </div>
      </li>
      <li>
        <div class="step-num">2</div>
        <div class="step-content">
          <h4>Product Images</h4>
          <p>Square 1:1 ratio. Dark/neutral background. Consistent lighting. Flat-lay or model on dark surfaces. JPG under 500KB each. Use Qikink mockup generator for initial images.</p>
        </div>
      </li>
      <li>
        <div class="step-num">3</div>
        <div class="step-content">
          <h4>Product Pricing Format</h4>
          <p>Show price as: <code>₹ 899.00</code> — the INR symbol is already configured in Cashfree. Set "compare at price" for items you want to show a discount.</p>
        </div>
      </li>
      <li>
        <div class="step-num">4</div>
        <div class="step-content">
          <h4>Cards per row</h4>
          <p>Set to 3 on desktop, 2 on mobile. Heritage default works fine here — the CSS above handles the dark styling.</p>
        </div>
      </li>
    </ol>
  </section>


  <!-- ═══════════════════════════════════════ -->
  <!-- 5. PRODUCT PAGE -->
  <!-- ═══════════════════════════════════════ -->
  <section class="section" id="product">
    <div class="section-label">Step 05</div>
    <h2>Product Page</h2>
    <p>The product description is your silent salesperson. Template below — copy-edit for each item.</p>

    <div class="code-label">Product Description Template (Rich Text)</div>
    <pre>THE PIECE

[Product name] — built for those who understand that
quality is a statement, not a price tag.

THE DETAILS

• Fabric: [e.g., 240gsm 100% combed cotton]
• Fit: Oversized / Regular / Relaxed
• Sizes available: S / M / L / XL / XXL
• Care: Cold wash, hang dry
• Ships via: [Qikink / Delhivery] within 5–7 days

THE NOVADROBE STANDARD

Every NOVADROBE piece is made to order.
No dead stock. No excess. Just precision.

SIZE GUIDE

Measure chest width and refer to the chart.
When in doubt, size up — the oversized fit
is the intended silhouette.</pre>

    <div class="code-label">Size Metafield (optional, shows as table)</div>
    <pre>S  →  Chest: 38–40"  Length: 27"
M  →  Chest: 40–42"  Length: 28"
L  →  Chest: 42–44"  Length: 29"
XL →  Chest: 44–46"  Length: 30"</pre>

    <div class="alert">
      <strong>COD Trust Signal:</strong> Add a "Media with text" block under the product grid with text: <code>✦ Cash on Delivery available · Free returns within 7 days · Ships across India</code>
    </div>
  </section>


  <!-- ═══════════════════════════════════════ -->
  <!-- 6. CUSTOMER LOGIN -->
  <!-- ═══════════════════════════════════════ -->
  <section class="section" id="login">
    <div class="section-label">Step 06</div>
    <h2>Customer Login &amp; Account Pages</h2>
    <p>The CSS above already styles <code>/account/login</code>, <code>/account/register</code>, and <code>/account</code> dashboard. Below is the Liquid code to further customise the login page header.</p>

    <div class="code-label">templates/customers/login.liquid — replace header text</div>
    <pre>&lt;!-- Find this section in your login.liquid file and update the heading --&gt;

&lt;div class="customer login"&gt;
  &lt;div class="login-page__form-header"&gt;

    &lt;!-- Add this above the existing h1 --&gt;
    &lt;p style="
      font-family: 'Inter', sans-serif;
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 0.35em;
      text-transform: uppercase;
      color: #C9A84C;
      margin-bottom: 12px;
    "&gt;Member Access&lt;/p&gt;

    &lt;h1 class="title"&gt;Welcome Back&lt;/h1&gt;

    &lt;p class="login-page__form-subheader" style="
      font-size: 11px;
      color: #888;
      letter-spacing: 0.1em;
      margin-top: 8px;
    "&gt;Sign in to track your orders and manage your account&lt;/p&gt;

  &lt;/div&gt;

  &lt;!-- Existing login form continues below... --&gt;
&lt;/div&gt;</pre>

    <div class="code-label">templates/customers/register.liquid — header text</div>
    <pre>&lt;!-- Same pattern — update heading area --&gt;

&lt;p style="font-family:'Inter';font-size:10px;font-weight:500;
   letter-spacing:0.35em;text-transform:uppercase;color:#C9A84C;
   margin-bottom:12px"&gt;Join NOVADROBE&lt;/p&gt;

&lt;h1 class="title"&gt;Create Account&lt;/h1&gt;

&lt;p style="font-size:11px;color:#888;letter-spacing:0.1em;margin-top:8px"&gt;
  Exclusive access, early drops, order tracking
&lt;/p&gt;</pre>

    <div class="alert">
      <strong>Enable Customer Accounts:</strong> Shopify Admin → Settings → Customer accounts → Select "Classic customer accounts" → Save. Then test login at <code>novadrobe.store/account/login</code>
    </div>

    <div class="code-label">Account Dashboard Heading Override</div>
    <pre>&lt;!-- In templates/customers/account.liquid, find the welcome heading --&gt;

&lt;h1 style="
  font-family: 'Cormorant Garamond', serif;
  font-size: 36px;
  font-weight: 300;
  letter-spacing: 0.06em;
  color: #F5F3EE;
"&gt;Welcome, {{ customer.first_name }}&lt;/h1&gt;

&lt;p style="
  font-size: 10px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #888;
  margin-top: 6px;
"&gt;NOVADROBE Member&lt;/p&gt;</pre>
  </section>


  <!-- ═══════════════════════════════════════ -->
  <!-- 7. FOOTER -->
  <!-- ═══════════════════════════════════════ -->
  <section class="section" id="footer">
    <div class="section-label">Step 07</div>
    <h2>Footer Setup</h2>
    <p>Configure in Customize → Footer. Use 3–4 columns.</p>

    <div class="code-label">Footer Column Structure</div>
    <pre>COLUMN 1: Brand
──────────────
NOVADROBE
(tagline) Monaco-inspired. India-made.
(short para) Built for those who move
between cultures and care about both.

COLUMN 2: Shop
──────────────
All Products
New Arrivals
Collections
FAITH Drop

COLUMN 3: Support
──────────────────
Track My Order
Shipping &amp; Returns
FAQs
Size Guide
Contact Us

COLUMN 4: Legal
───────────────
Privacy Policy
Refund Policy
Terms of Service
Shipping Policy

BOTTOM BAR:
© 2026 NOVADROBE. All rights reserved.
[Payment icons: UPI · Visa · Mastercard · COD]</pre>

    <div class="code-label">Custom Footer Snippet (paste in footer.liquid)</div>
    <pre>&lt;!-- NOVADROBE Monaco Footer Line --&gt;
&lt;style&gt;
  .footer__content::before {
    content: 'N · O · V · A · D · R · O · B · E';
    display: block;
    text-align: center;
    font-family: 'Inter', sans-serif;
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 0.5em;
    color: rgba(201,168,76,0.25);
    padding: 32px 0 0;
    border-top: 1px solid rgba(201,168,76,0.1);
    margin-bottom: 40px;
  }
&lt;/style&gt;</pre>
  </section>


  <!-- ═══════════════════════════════════════ -->
  <!-- 8. GO LIVE CHECKLIST -->
  <!-- ═══════════════════════════════════════ -->
  <section class="section" id="checklist">
    <div class="section-label">Final Step</div>
    <h2>Go-Live Checklist</h2>
    <p>Run through this before you hit publish. Everything checked = you're live, boss.</p>

    <div class="cards">
      <div class="card">
        <div class="card-icon">◈</div>
        <h4>Store Basics</h4>
        <p>Domain connected · SSL active · Store name set · Currency INR · Timezone IST</p>
      </div>
      <div class="card">
        <div class="card-icon">◈</div>
        <h4>Payments</h4>
        <p>Cashfree live credentials · COD enabled · UPI activated · Test order placed</p>
      </div>
      <div class="card">
        <div class="card-icon">◈</div>
        <h4>Products</h4>
        <p>At least 4 products live · Images uploaded · Prices in INR · Variants set · Inventory tracked</p>
      </div>
      <div class="card">
        <div class="card-icon">◈</div>
        <h4>Shipping</h4>
        <p>Zones: India (all states) · Rates configured · Qikink/Printrove integration tested · COD zones set</p>
      </div>
      <div class="card">
        <div class="card-icon">◈</div>
        <h4>Pages Live</h4>
        <p>About · Contact · FAQ · Shipping Policy · Refund Policy · Privacy Policy · Terms</p>
      </div>
      <div class="card">
        <div class="card-icon">◈</div>
        <h4>CSS Applied</h4>
        <p>Dark theme rendering correctly · Gold accents visible · Fonts loading (Cormorant + Inter) · Mobile responsive</p>
      </div>
      <div class="card">
        <div class="card-icon">◈</div>
        <h4>Customer Account</h4>
        <p>Login page styled · Register working · Account dashboard accessible · Password reset tested</p>
      </div>
      <div class="card">
        <div class="card-icon">◈</div>
        <h4>Final Check</h4>
        <p>Test order end-to-end · WhatsApp notification fires · Email confirmation sends · Remove password protection</p>
      </div>
    </div>

    <div class="alert" style="margin-top: 32px;">
      <strong>Remove password:</strong> Online Store → Preferences → Password protection → uncheck "Restrict access" → Save. You're live.
    </div>
  </section>

</div>

<div class="doc-footer">
  <div class="container">
    NOVADROBE · novadrobe.store · Monaco Luxury Streetwear · India
  </div>
</div>

<script>
function copyCode(id) {
  const pres = document.querySelectorAll('pre');
  // Simple: copy closest pre text on button click
  const btn = event.currentTarget;
  const pre = btn.previousElementSibling;
  if (pre && pre.tagName === 'PRE') {
    navigator.clipboard.writeText(pre.textContent).then(() => {
      const orig = btn.textContent;
      btn.textContent = '✓ Copied';
      setTimeout(() => btn.textContent = orig, 2000);
    });
  }
}

// Make all copy buttons work
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.onclick = function() {
    const pre = this.previousElementSibling;
    if (pre && pre.tagName === 'PRE') {
      navigator.clipboard.writeText(pre.textContent).then(() => {
        const orig = this.textContent;
        this.textContent = '✓ Copied';
        setTimeout(() => this.textContent = orig, 2000);
      });
    }
  };
});
</script>

</body>
</html>
