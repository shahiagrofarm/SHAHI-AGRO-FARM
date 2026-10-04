
const nav = document.querySelector('.navlinks');
const menu = document.querySelector('.menu');
if (menu) menu.addEventListener('click', () => nav.classList.toggle('open'));

const page = document.body.dataset.page;
document.querySelectorAll('.navlinks a').forEach(a => {
  if (a.dataset.page === page) a.classList.add('active');
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('[data-order]').forEach(btn => {
  btn.addEventListener('click', () => window.location.href = 'order.html');
});

/* Settings */
const settingsBtn = document.getElementById('settingsBtn');
const settingsPanel = document.getElementById('settingsPanel');
const closeSettings = document.getElementById('closeSettings');
const settingsBackdrop = document.getElementById('settingsBackdrop');

function setSettings(open) {
  if (!settingsPanel) return;
  settingsPanel.classList.toggle('open', open);
  settingsBackdrop?.classList.toggle('open', open);
  settingsPanel.setAttribute('aria-hidden', String(!open));
}
settingsBtn?.addEventListener('click', () => setSettings(!settingsPanel.classList.contains('open')));
closeSettings?.addEventListener('click', () => setSettings(false));
settingsBackdrop?.addEventListener('click', () => setSettings(false));

const translations = {
  en: {
    brand:'SHAHI AGRO FARM', home:'Home', about:'About', benefits:'Benefits', order:'Order', contact:'Contact',
    orderNow:'ORDER NOW', settings:'Settings', language:'Language', theme:'Theme', bright:'Bright', dark:'Dark',
    orderKicker:'Order', orderTitle:'SHAHI GRASS SILAGE.', availableNow:'Available now', perPacket:'/ packet',
    '50kgPacket':'50 KG per packet',
    minMax:'Minimum order: 20 packets • Maximum order: 400 packets',
    totalWeightLabel:'Total Weight', totalPriceLabel:'Total Price',
    paymentRequired:'Payment required to confirm your order', cod:'Cash on Delivery', receiptTitle:'Order Receipt / Confirmation', receiptText:'After your order is confirmed, the receipt/confirmation will be sent to SHAHI AGRO FARM WhatsApp: 01814026318.'
  },
  bn: {
    brand:'শাহী এগ্রো ফার্ম', home:'হোম', about:'আমাদের সম্পর্কে', benefits:'উপকারিতা', order:'অর্ডার', contact:'যোগাযোগ',
    orderNow:'অর্ডার করুন', settings:'সেটিংস', language:'ভাষা', theme:'থিম', bright:'উজ্জ্বল', dark:'ডার্ক',
    orderKicker:'অর্ডার', orderTitle:'শাহী গ্রাস সাইলেজ', availableNow:'বর্তমানে উপলব্ধ', perPacket:'/ প্যাকেট',
    '50kgPacket':'প্রতি প্যাকেট ৫০ কেজি',
    minMax:'সর্বনিম্ন ২০ প্যাকেট • সর্বোচ্চ ৪০০ প্যাকেট',
    totalWeightLabel:'মোট ওজন', totalPriceLabel:'মোট মূল্য',
    paymentRequired:'অর্ডার নিশ্চিত করতে পেমেন্ট প্রয়োজন', cod:'ক্যাশ অন ডেলিভারি', receiptTitle:'অর্ডার রসিদ / নিশ্চিতকরণ', receiptText:'আপনার অর্ডার নিশ্চিত হওয়ার পর রসিদ/নিশ্চিতকরণ SHAHI AGRO FARM-এর WhatsApp নম্বর 01814026318-এ পাঠানো হবে।'
  }
};

function applyLanguage(lang) {
  const dict = translations[lang] || translations.en;
  document.documentElement.lang = lang === 'bn' ? 'bn' : 'en';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (dict[key] !== undefined) {
      // Preserve simple HTML used in the min/max line.
      if (key === 'minMax' && lang === 'en') {
        el.innerHTML = 'Minimum order: <strong>20 packets</strong> &nbsp; • &nbsp; Maximum order: <strong>400 packets</strong>';
      } else if (key === 'minMax' && lang === 'bn') {
        el.innerHTML = 'সর্বনিম্ন অর্ডার: <strong>২০ প্যাকেট</strong> &nbsp; • &nbsp; সর্বোচ্চ অর্ডার: <strong>৪০০ প্যাকেট</strong>';
      } else {
        el.textContent = dict[key];
      }
    }
  });
  document.querySelectorAll('[data-language]').forEach(b => b.classList.toggle('selected', b.dataset.language === lang));
  localStorage.setItem('shahiLanguage', lang);
}

function applyTheme(theme) {
  const chosen = theme === 'dark' ? 'dark' : 'light';
  document.body.dataset.theme = chosen;
  document.querySelectorAll('[data-theme-choice]').forEach(b => b.classList.toggle('selected', b.dataset.themeChoice === chosen));
  localStorage.setItem('shahiTheme', chosen);
}

document.querySelectorAll('[data-language]').forEach(btn => {
  btn.addEventListener('click', () => applyLanguage(btn.dataset.language));
});
document.querySelectorAll('[data-theme-choice]').forEach(btn => {
  btn.addEventListener('click', () => applyTheme(btn.dataset.themeChoice));
});

applyLanguage(localStorage.getItem('shahiLanguage') || 'en');
applyTheme(localStorage.getItem('shahiTheme') || 'light');

/* Order calculator */
const qtyInput = document.getElementById('qty');
const minus = document.getElementById('minus');
const plus = document.getElementById('plus');
const weightEl = document.getElementById('totalWeight');
const priceEl = document.getElementById('totalPrice');
const orderForm = document.getElementById('orderForm');
const orderSummary = document.getElementById('orderSummary');
const paymentMethodEl = document.getElementById('paymentMethod');
const customerPaymentNumberEl = document.getElementById('customerPaymentNumber');
const transactionIdEl = document.getElementById('transactionId');

function clampQty(v) {
  v = Math.round(Number(v) || 20);
  return Math.min(400, Math.max(20, v));
}
function updateOrder() {
  if (!qtyInput) return;
  const q = clampQty(qtyInput.value);
  qtyInput.value = q;
  weightEl.textContent = (q * 50).toLocaleString('en-US') + ' KG';
  priceEl.textContent = '৳' + (q * 350).toLocaleString('en-US');
}
if (qtyInput) {
  qtyInput.addEventListener('input', updateOrder);
  qtyInput.addEventListener('change', updateOrder);
  minus?.addEventListener('click', () => { qtyInput.value = clampQty(Number(qtyInput.value) - 1); updateOrder(); });
  plus?.addEventListener('click', () => { qtyInput.value = clampQty(Number(qtyInput.value) + 1); updateOrder(); });
  updateOrder();
}

function updatePaymentFields() {
  if (!paymentMethodEl) return;
  const cod = paymentMethodEl.value === 'COD';
  if (customerPaymentNumberEl) {
    customerPaymentNumberEl.required = !cod;
    customerPaymentNumberEl.disabled = cod;
    customerPaymentNumberEl.placeholder = cod ? 'Not required for Cash on Delivery' : 'Number used to make payment';
  }
  if (transactionIdEl) {
    transactionIdEl.required = !cod;
    transactionIdEl.disabled = cod;
    transactionIdEl.placeholder = cod ? 'Not required for Cash on Delivery' : 'Enter your payment transaction ID';
  }
}
paymentMethodEl?.addEventListener('change', updatePaymentFields);
updatePaymentFields();

if (orderForm) {
  orderForm.addEventListener('submit', e => {
    e.preventDefault();
    const q = clampQty(qtyInput.value);
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const paymentMethod = paymentMethodEl.value;
    const customerPaymentNumber = customerPaymentNumberEl.value.trim();
    const transactionId = transactionIdEl.value.trim();

    if (!name || !phone || !address || !paymentMethod ||
        (paymentMethod !== 'COD' && (!customerPaymentNumber || !transactionId))) {
      orderSummary.textContent = paymentMethod === 'COD'
        ? 'Please complete your name, phone number, address and payment method.'
        : 'Please complete the customer details, payment method, payment number and transaction ID.';
      orderSummary.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    if (paymentMethod === 'COD') {
      orderSummary.innerHTML = `<strong>Order submitted — Cash on Delivery selected.</strong><br>${q} packets • ${(q*50).toLocaleString()} KG • ৳${(q*350).toLocaleString()}<br>Payment will be collected on delivery.`;
    } else {
      orderSummary.innerHTML = `<strong>Order submitted for payment verification.</strong><br>${q} packets • ${(q*50).toLocaleString()} KG • ৳${(q*350).toLocaleString()}<br>Method: ${paymentMethod} • Payment number: ${customerPaymentNumber}<br>Transaction ID: ${transactionId}<br><br><strong>Payment is not automatically verified by this website.</strong> The transaction ID must be checked before confirmation.`;
    }
    orderSummary.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}
