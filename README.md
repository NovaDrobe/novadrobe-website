# NovaDrobe — Premium Women's Handbag Store
NovaDrobe – Everything You Need, One Place. A growing platform for shopping and selling products online.
A fully static, zero-dependency e-commerce website for NovaDrobe, a premium women's handbag brand targeting young women aged 18–30 in India.
---
## 📁 File Structure
```
novadrobe/
├── index.html        → Main HTML file (all 4 pages)
├── style.css         → All styles (theme, components, responsive)
├── script.js         → App logic (navigation, product rendering, filters)
├── chatbot.js        → AI-style chatbot widget ("Nova")
├── products.json     → Product data (8 bags with full details)
└── README.md         → This file
```

---

## 🚀 How to Run

### Option 1 — Open Directly (simplest)
Just double-click `index.html` to open in any browser.

> ⚠️ **Note:** `products.json` is loaded via `fetch()`, which is blocked on `file://` protocol in some browsers (Chrome). If products don't appear, use Option 2.

### Option 2 — Local Server (recommended)
Using Python (built into macOS/Linux):
```bash
cd novadrobe
python3 -m http.server 5500
# Open http://localhost:5500
```

Using Node.js:
```bash
npx serve novadrobe
```

Using VS Code:
- Install the **Live Server** extension → Right-click `index.html` → "Open with Live Server"

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Primary Gold | `#d4af37` |
| Background | `#000000` |
| Card Surface | `#1a1a1a` |
| Font | Montserrat (Google Fonts) |
| Border radius | 0 (sharp, minimal style) |

---

## 📦 Pages & Features

### 🏠 Home
- Parallax hero banner with tagline *"Upgrade Your Style with NovaDrobe"*
- Category quick-links strip (Tote / Sling / Shoulder / Premium)
- Featured products grid (auto-picks tagged/bestseller items)
- Customer reviews section (3 testimonials)
- Instagram-style photo gallery (6 images)
- USP strip (Free Shipping / Returns / Quality / WhatsApp Support)

### 🛍️ Shop
- Full product grid with all 8 bags
- Category filter buttons (All / Tote Bags / Sling Bags / Shoulder Bags)
- Product cards with: image, tag badge, category, name, price, discount %, WhatsApp order button
- Out-of-stock state handled (greyed button)

### 👜 Product Detail
- Large product image with hover zoom
- Price, original price, discount savings badge
- Full description + feature checklist
- Color selector chips
- "Order on WhatsApp" CTA (pre-filled message with product name + price)
- Product meta (material, shipping, returns, payment, warranty)
- Related products grid

### 📞 Contact
- Phone, email, location info cards
- WhatsApp quick-order panel with feature list
- Social media links (Instagram, Facebook, WhatsApp)
- FAQ accordion (5 questions)

---

## 💬 Chatbot — "Nova"

An AI-style style assistant built in `chatbot.js`:

- Auto-opens after **3 seconds** on first visit (sessionStorage flag)
- Handles typed messages with **keyword detection**:
  - Bag type queries → relevant product info
  - Price, delivery, returns, payment, color questions → contextual answers
  - Greetings, thank-yous → friendly responses
- **Option buttons** for guided flows (Browse → Category → Order)
- **Direct WhatsApp handoff** for ordering or human support
- Typing indicator animation
- Persists chat history within session

### Supported Keywords
`tote`, `sling`, `shoulder`, `crossbody`, `price`, `cost`, `deliver`, `ship`, `return`, `exchange`, `track`, `order`, `payment`, `upi`, `cod`, `color`, `available`, `hi`, `hello`, `thanks`

---

## 📱 WhatsApp Integration

All "Order on WhatsApp" buttons use this format:
```
https://wa.me/919876543210?text=Hi!%20I%27m%20interested%20in%20[Product Name]%20(₹[Price]).%20...
```

**To update your WhatsApp number:**
1. Search for `919876543210` in all files
2. Replace with your number in international format (no `+`, no spaces)
   - e.g., for `+91 99999 88888` → use `919999988888`

---

## 🛠️ Customisation Guide

### Add a New Product
Edit `products.json` and add a new object:
```json
{
  "id": 9,
  "name": "Your Bag Name",
  "price": 1999,
  "originalPrice": 2499,
  "category": "Tote Bags",
  "tag": "New Arrival",
  "image": "https://your-image-url.jpg",
  "description": "Your description here.",
  "features": ["Feature 1", "Feature 2", "Feature 3"],
  "colors": ["Black", "Tan"],
  "inStock": true
}
```

### Change Brand Color
In `style.css`, find `:root` and update:
```css
--gold: #d4af37;       /* Main gold color */
--gold-dark: #b8941f;  /* Hover gold */
```

### Change WhatsApp Number
Replace all instances of `919876543210` with your number.

### Change Brand Name / Tagline
Search for `NOVADROBE` and `NovaDrobe` in `index.html` and update as needed.

---

## 🌐 Deployment

Since this is a pure static website, you can deploy it for free on:

| Platform | Steps |
|----------|-------|
| **Netlify** | Drag & drop the `novadrobe/` folder at netlify.com/drop |
| **GitHub Pages** | Push to GitHub → Settings → Pages → Deploy from branch |
| **Vercel** | `npx vercel` in the folder |
| **Tiiny Host** | Zip the folder → upload at tiiny.host |

---

## 📋 Browser Support

| Browser | Status |
|---------|--------|
| Chrome 90+ | ✅ Full support |
| Firefox 88+ | ✅ Full support |
| Safari 14+ | ✅ Full support |
| Edge 90+ | ✅ Full support |
| Mobile Chrome | ✅ Optimised |
| Mobile Safari | ✅ Optimised |

---

## 📄 License

This project is created for **NovaDrobe** personal/commercial use.

---

*Built with ❤️ for fashion lovers across India — 2026*
