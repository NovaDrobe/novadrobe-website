/* ═══════════════════════════════════════════════════════════
   NOVADROBE — chatbot.js
   AI-style chatbot widget for customer support & ordering
═══════════════════════════════════════════════════════════ */

'use strict';

const WA_NUMBER_BOT = '919876543210';

/* ── CHATBOT STATE ── */
const chatState = {
  isOpen:       false,
  step:         'welcome',
  userName:     '',
  selectedBag:  null,
  typingTimer:  null,
};

/* ── RESPONSE FLOWS ── */
const BOT_FLOWS = {
  welcome: {
    msg: `Hi there! 👋 I'm *Nova*, your NovaDrobe style assistant.\n\nHow can I help you today?`,
    options: ['Browse Bags', 'Track My Order', 'Return / Exchange', 'Talk to a Human']
  },
  browseBags: {
    msg: `Love your choice! 💛 We have three gorgeous categories:\n\n✦ **Tote Bags** (from ₹2,499)\n✦ **Sling Bags** (from ₹1,799)\n✦ **Shoulder Bags** (from ₹2,199)\n\nWhich style interests you?`,
    options: ['Tote Bags', 'Sling Bags', 'Shoulder Bags', 'Show All']
  },
  toteBags: {
    msg: `Our tote bags are spacious, elegant, and perfect for work or college! 🛍\n\nTop picks:\n• Midnight Noir Tote — ₹2,499\n• Luxe Caramel Tote — ₹2,799\n\nWant to order or know more?`,
    options: ['Order on WhatsApp', 'See All Products', 'Ask Something Else']
  },
  slingBags: {
    msg: `Sling bags = effortless style! ✨\n\nOur bestsellers:\n• Golden Hour Sling — ₹1,899\n• Moonlight Crossbody — ₹1,799\n• Noir Elegance Sling — ₹2,099\n\nPerfect for evenings out. Want to order?`,
    options: ['Order on WhatsApp', 'See All Products', 'Ask Something Else']
  },
  shoulderBags: {
    msg: `Our shoulder bags are structured, versatile, and oh-so-chic! 💼\n\nFeatured:\n• Urban Chic Shoulder — ₹2,199\n• Slate Grey Shoulder — ₹2,299\n• Crimson Statement — ₹2,599\n\nReady to elevate your look?`,
    options: ['Order on WhatsApp', 'See All Products', 'Ask Something Else']
  },
  showAll: {
    msg: `We have 8 stunning bags across 3 categories. Tap "See All Products" to browse the full collection on our website! 🛍`,
    options: ['See All Products', 'Order on WhatsApp', 'Go Back']
  },
  trackOrder: {
    msg: `📦 To track your order:\n\n1. Open WhatsApp and message us at +91 98765 43210\n2. Share your order ID\n3. We'll send live tracking details!\n\nWant to chat with us on WhatsApp now?`,
    options: ['Open WhatsApp', 'Ask Something Else']
  },
  returnExchange: {
    msg: `We offer a **7-day hassle-free return** policy! 🔄\n\nConditions:\n• Item should be unused\n• Original packaging required\n• Initiate via WhatsApp\n\nShall I connect you to our team?`,
    options: ['Open WhatsApp', 'Ask Something Else']
  },
  humanAgent: {
    msg: `Sure! Connecting you to our team on WhatsApp. Our support hours are **10 AM – 7 PM**, Monday to Saturday. 💬\n\nClick below to start a chat!`,
    options: ['Open WhatsApp', 'Maybe Later']
  },
  orderWhatsApp: {
    msg: `Great choice! 🎉 Click below to order directly on WhatsApp. Our team will guide you through colors, sizes, and payment. Fast & easy!`,
    options: ['Open WhatsApp', 'Continue Browsing']
  },
  fallback: {
    msg: `Hmm, I didn't quite catch that. Let me get you back on track! 😊`,
    options: ['Browse Bags', 'Order on WhatsApp', 'Talk to a Human']
  }
};

/* ── OPTION → FLOW MAPPING ── */
const OPTION_MAP = {
  'browse bags':        'browseBags',
  'track my order':     'trackOrder',
  'return / exchange':  'returnExchange',
  'talk to a human':    'humanAgent',
  'tote bags':          'toteBags',
  'sling bags':         'slingBags',
  'shoulder bags':      'shoulderBags',
  'show all':           'showAll',
  'order on whatsapp':  'orderWhatsApp',
  'open whatsapp':      '__openWA',
  'see all products':   '__shopPage',
  'ask something else': 'welcome',
  'go back':            'browseBags',
  'continue browsing':  '__shopPage',
  'maybe later':        'welcome',
};

/* ═══════════════════════════════════════════
   CHATBOT INIT
═══════════════════════════════════════════ */
function initChatbot() {
  const toggle = document.getElementById('chatbotToggle');
  const window_ = document.getElementById('chatbotWindow');
  const closeBtn = document.getElementById('chatClose');
  const sendBtn  = document.getElementById('chatSend');
  const input    = document.getElementById('chatInput');

  if (!toggle) return;

  toggle.addEventListener('click', toggleChatbot);
  closeBtn.addEventListener('click', () => closeChatbot());
  sendBtn.addEventListener('click', handleUserInput);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') handleUserInput(); });

  // Auto-open greeting after 3 seconds on first visit
  if (!sessionStorage.getItem('nd_chat_seen')) {
    setTimeout(() => {
      sessionStorage.setItem('nd_chat_seen', '1');
      openChatbot();
    }, 3000);
  }
}

function openChatbot() {
  chatState.isOpen = true;
  document.getElementById('chatbotWindow').classList.add('open');
  document.getElementById('chatBadge').style.display = 'none';
  const msgs = document.getElementById('chatMessages');
  if (!msgs.children.length) {
    sendBotMessage(BOT_FLOWS.welcome.msg, BOT_FLOWS.welcome.options);
  }
}

function closeChatbot() {
  chatState.isOpen = false;
  document.getElementById('chatbotWindow').classList.remove('open');
}

function toggleChatbot() {
  chatState.isOpen ? closeChatbot() : openChatbot();
}

/* ═══════════════════════════════════════════
   MESSAGING
═══════════════════════════════════════════ */
function sendBotMessage(text, options = []) {
  const messages = document.getElementById('chatMessages');

  // Typing indicator
  const typing = document.createElement('div');
  typing.className = 'chat-bubble bot';
  typing.innerHTML = '<em style="opacity:0.5;">Nova is typing…</em>';
  messages.appendChild(typing);
  scrollChat();

  const delay = 600 + Math.min(text.length * 8, 1200);

  chatState.typingTimer = setTimeout(() => {
    typing.remove();
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble bot';
    bubble.innerHTML = formatBotText(text);

    if (options.length) {
      const optsDiv = document.createElement('div');
      optsDiv.className = 'chat-options';
      options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'chat-opt-btn';
        btn.textContent = opt;
        btn.addEventListener('click', () => handleOptionClick(opt));
        optsDiv.appendChild(btn);
      });
      bubble.appendChild(optsDiv);
    }

    messages.appendChild(bubble);
    scrollChat();
  }, delay);
}

function sendUserMessage(text) {
  const messages = document.getElementById('chatMessages');
  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble user';
  bubble.textContent = text;
  messages.appendChild(bubble);
  scrollChat();
}

function scrollChat() {
  const msgs = document.getElementById('chatMessages');
  if (msgs) msgs.scrollTop = msgs.scrollHeight;
}

/* ── Format bot text: **bold**, newlines ── */
function formatBotText(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>');
}

/* ═══════════════════════════════════════════
   USER INPUT HANDLING
═══════════════════════════════════════════ */
function handleUserInput() {
  const input = document.getElementById('chatInput');
  const text  = (input.value || '').trim();
  if (!text) return;
  input.value = '';
  sendUserMessage(text);
  processUserText(text);
}

function handleOptionClick(option) {
  sendUserMessage(option);
  const key = option.toLowerCase();
  const flow = OPTION_MAP[key];

  if (flow === '__openWA') {
    const msg = encodeURIComponent("Hi! I'm interested in NovaDrobe handbags. Can you help me?");
    window.open(`https://wa.me/${WA_NUMBER_BOT}?text=${msg}`, '_blank');
    setTimeout(() => sendBotMessage("Opening WhatsApp for you! 💬 Our team will reply shortly.", ['Browse Bags', 'Maybe Later']), 400);
    return;
  }

  if (flow === '__shopPage') {
    closeChatbot();
    if (typeof showPage === 'function') showPage('shop');
    return;
  }

  const target = BOT_FLOWS[flow] || BOT_FLOWS.fallback;
  sendBotMessage(target.msg, target.options);
}

function processUserText(text) {
  const lower = text.toLowerCase();

  // Keyword matching
  if (/\b(tote|large|big|work|office)\b/.test(lower)) {
    return sendBotMessage(BOT_FLOWS.toteBags.msg, BOT_FLOWS.toteBags.options);
  }
  if (/\b(sling|cross|compact|small|evening|chain)\b/.test(lower)) {
    return sendBotMessage(BOT_FLOWS.slingBags.msg, BOT_FLOWS.slingBags.options);
  }
  if (/\b(shoulder|casual|versatile|everyday)\b/.test(lower)) {
    return sendBotMessage(BOT_FLOWS.shoulderBags.msg, BOT_FLOWS.shoulderBags.options);
  }
  if (/\b(price|cost|how much|₹|rupee|rate)\b/.test(lower)) {
    return sendBotMessage(
      `Our bags are priced from ₹1,799 to ₹2,799 — great value for premium leather! 💛\n\nWant to see a specific category?`,
      ['Tote Bags', 'Sling Bags', 'Shoulder Bags']
    );
  }
  if (/\b(deliver|ship|how long|days)\b/.test(lower)) {
    return sendBotMessage(
      `📦 We deliver across India in **2–5 business days**.\n\nFree shipping on orders above ₹2,000! 🚚`,
      ['Order on WhatsApp', 'Ask Something Else']
    );
  }
  if (/\b(return|exchange|refund|policy)\b/.test(lower)) {
    return sendBotMessage(BOT_FLOWS.returnExchange.msg, BOT_FLOWS.returnExchange.options);
  }
  if (/\b(track|where|status|order)\b/.test(lower)) {
    return sendBotMessage(BOT_FLOWS.trackOrder.msg, BOT_FLOWS.trackOrder.options);
  }
  if (/\b(payment|upi|cod|pay|cash)\b/.test(lower)) {
    return sendBotMessage(
      `💳 We accept multiple payment modes:\n\n• **WhatsApp Pay / UPI**\n• **Cash on Delivery (COD)**\n• **Bank Transfer**\n\nOrder via WhatsApp for the easiest experience!`,
      ['Order on WhatsApp', 'Ask Something Else']
    );
  }
  if (/\b(color|colour|available|option)\b/.test(lower)) {
    return sendBotMessage(
      `🎨 Our bags come in multiple colors including Black, Caramel, Grey, Nude, and more!\n\nAvailability depends on the style. Chat with us to confirm.`,
      ['Order on WhatsApp', 'Browse Bags']
    );
  }
  if (/\b(hi|hello|hey|namaste|hola)\b/.test(lower)) {
    return sendBotMessage(BOT_FLOWS.welcome.msg, BOT_FLOWS.welcome.options);
  }
  if (/\b(thank|thanks|thx|ty)\b/.test(lower)) {
    return sendBotMessage(`You're welcome! 💛 Happy shopping with NovaDrobe! ✨`, ['Browse Bags', 'Order on WhatsApp']);
  }

  // Default fallback
  sendBotMessage(BOT_FLOWS.fallback.msg, BOT_FLOWS.fallback.options);
}

/* ── Init on DOM ready ── */
document.addEventListener('DOMContentLoaded', initChatbot);
