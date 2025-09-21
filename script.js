// script.js
document.addEventListener('DOMContentLoaded', () => {
  initYear();
  const menuData = getMenuData();
  renderMenu(menuData);

  setupForm();
  setupOrderNowBtn();
  setupMobileMenu();
  setupFeedbackForm();
  setupOrderSearch();

const orders = [
  { name: "Charles James T. Salac", details: "2 Brown Sugar Milk Tea (M), 1 Wintermelon (L), pickup at 3pm" },
  { name: "John Dave Castro", details: "1 Matcha Latte, 1 Mango Milk Tea, delivery to Cupang" },
  { name: "Ian Castro Sagloria", details: "1 Wintermelon (M), pickup at 6pm" },
  { name: "Mhilgen Nadal", details: "3 Chocolate Milk Tea, pickup at 5pm" }
  
];

function setupOrderSearch() {
  const searchInput = document.getElementById('searchCustomer');
  const orderList = document.getElementById('orderList');
  if (!searchInput || !orderList) return;

  function renderOrderList(filtered) {
    orderList.innerHTML = '';
    if (filtered.length === 0) {
      orderList.innerHTML = '<li>No orders found for this customer.</li>';
      return;
    }
    filtered.forEach(order => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${escapeHtml(order.name)}</strong>: <span>${escapeHtml(order.details)}</span>`;
      orderList.appendChild(li);
    });
  }

  searchInput.addEventListener('input', function() {
    const val = searchInput.value.trim().toLowerCase();
    if (!val) {
      orderList.innerHTML = '';
      return;
    }
    const filtered = orders.filter(order => order.name.toLowerCase().includes(val));
    renderOrderList(filtered);
  });
}
});

  function setupFeedbackForm() {
    const form = document.getElementById('feedbackForm');
    const status = document.getElementById('feedbackStatus');
    if (!form || !status) return;
    form.addEventListener('submit', function(ev) {
      ev.preventDefault();
      const name = form.feedbackName.value.trim();
      const message = form.feedbackMessage.value.trim();
      if (!name || !message) {
        status.textContent = 'Please enter your name and message.';
        return;
      }
      status.textContent = 'Thank you for your feedback, ' + name + '!';
      form.reset();
      setTimeout(() => {
        status.textContent = '';
      }, 4000);
    });
  }
function setupMobileMenu() {
  const nav = document.querySelector('.nav');
  const btn = document.querySelector('.mobile-menu-btn');
  if (!nav || !btn) return;
  function checkMobile() {
    if (window.innerWidth <= 880) {
      btn.style.display = 'block';
      nav.style.display = 'none';
    } else {
      btn.style.display = 'none';
      nav.style.display = 'flex';
    }
  }
  checkMobile();
  window.addEventListener('resize', checkMobile);
  btn.addEventListener('click', () => {
    if (nav.style.display === 'none') {
      nav.style.display = 'flex';
    } else {
      nav.style.display = 'none';
    }
  });

  nav.addEventListener('click', (e) => {
    if (window.innerWidth <= 880 && e.target.tagName === 'A') {
      nav.style.display = 'none';
    }
  });
}

function getMenuData() {
  return [
    {
      category: "Classic Milk Tea",
      items: [
        { id: "classic1", name: "Wintermelon Milk Tea", desc: "A local favorite with a smooth, caramel-like sweetness balanced by the creaminess of milk tea.", price: 120, img: "images/wintermelon-milk-tea_Brent-Hofacker_Shutterstock.jpg" },
        { id: "classic2", name: "Chocolate Milk Tea", desc: "A classic blend of creamy milk tea and rich chocolate, perfect for chocolate lovers.", price: 100, img: "images/chocolate-milk-tea-calories.jpg" },
        { id: "classic3", name: "Oreo Milk Tea", desc: "Chocolate milk tea topped or mixed with crushed Oreo cookies for a crunchy twist.", price: 110, img: "images/oreo-bubble-milk-tea.jpg" }
      ]
    },
    {
      category: "Fruit Teas",
      items: [
        { id: "fruit1", name: "Mango Milk Tea", desc: "Tropical and vibrant, combining ripe mango flavor with smooth milk tea for a fruity twist.", price: 95, img: "images/mango-bubble-tea-9.jpg" },
        { id: "fruit2", name: "Strawberry Milk Tea", desc: "A refreshing blend of sweet strawberries and creamy milk tea, often served with pearls or jelly.", price: 85, img: "images/pngtree-the-strawberry-bubble-tea-png-image_11661848.png" }
      ]
    },
    {
      category: "Specialty",
      items: [
        { id: "spec1", name: "Lychee Fruit Tea", desc: "Light and fragrant, made with green tea and lychee syrup, sometimes with popping boba for extra fun.", price: 140, img: "images/ly-1.png" },
        { id: "spec2", name: "Matcha Latte", desc: "Premium matcha blended with milk.", price: 150, img: "images/Iced-Matcha-Latte.jpg" }
      ]
    },
    {
      category: "Add-ons",
      items: [
        { id: "add1", name: "Extra Pearls", desc: "Chewy tapioca pearls (per serving).", price: 20, img: "images/1100-k.4.jpg" },
        { id: "add2", name: "Pudding", desc: "Silky egg pudding.", price: 25, img: "images/800x800.png" }
      ]
    }
  ];
}

function getPromos() {
  return [];
}

function renderMenu(data) {
  const container = document.getElementById('menu-container');
  container.innerHTML = '';

  data.forEach(category => {
    const card = document.createElement('div');
    card.className = 'category-card';
    const catTitle = document.createElement('h4');
    catTitle.textContent = category.category;
    card.appendChild(catTitle);

    category.items.forEach(item => {
      const it = document.createElement('div');
      it.className = 'item';
      it.innerHTML = `
        <div class="meta">
          <div>
            <div class="name">${escapeHtml(item.name)}</div>
            <div class="desc">${escapeHtml(item.desc)}</div>
          </div>
          <div style="text-align:right">
            <div class="price">₱ ${formatPrice(item.price)}</div>
            <button class="add-btn" data-id="${item.id}" data-name="${escapeHtml(item.name)}" data-price="${item.price}">Add</button>
            <div style="margin-top:6px">
              <label style="font-size:0.95em; color:#14532d;">Qty:
                <input type="number" min="1" value="1" class="qty-input" style="width:48px; margin-left:6px;" data-id="${item.id}" aria-label="Quantity for ${escapeHtml(item.name)}" />
              </label>
            </div>
          </div>
        </div>
      `;
      card.appendChild(it);
    });

    container.appendChild(card);
  });

  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.add-btn');
    if (!btn) return;
    const name = btn.dataset.name;
    const price = Number(btn.dataset.price);
    const itemId = btn.dataset.id;
    
    const qtyInput = btn.parentElement.querySelector('.qty-input[data-id="' + itemId + '"]');
    let qty = 1;
    if (qtyInput) {
      qty = Math.max(1, parseInt(qtyInput.value, 10) || 1);
    }
    addQuickOrder(`${name} x${qty} — ₱${formatPrice(price * qty)}`);
  });
}

function renderPromos(promos) {
}

function addQuickOrder(text) {
  const details = document.getElementById('orderDetails');
  if (!details) {
    alert('Order form not found.');
    return;
  }
  const current = details.value.trim();
  details.value = current ? current + '\n' + text : text;
  details.focus();
  showFormMessage('Added to order details (you can edit before submitting).', 3000);
}

function setupForm() {
  const form = document.getElementById('inquiryForm');
  const clearBtn = document.getElementById('clear-form');
  const message = document.getElementById('formMessage');

  clearBtn.addEventListener('click', () => form.reset());

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const data = new FormData(form);
    const payload = {
      name: data.get('name').trim(),
      email: data.get('email').trim(),
      phone: data.get('phone').trim(),
      address: data.get('address').trim(),
      orderDetails: data.get('orderDetails').trim(),
      type: data.get('type')
    };

    if (!payload.name || !payload.email || !payload.phone) {
      showFormMessage('Please fill in name, email, and phone.', 4000);
      return;
    }

    console.log('Order payload (simulate send):', payload);
    showFormMessage('Thanks! Your inquiry/order has been submitted. We will contact you shortly.', 6000);
    form.reset();
  });

  function showFormMessage(text, timeout = 4000) {
    message.textContent = text;
    setTimeout(() => {
      if (message.textContent === text) message.textContent = '';
    }, timeout);
  }

  window.showFormMessage = showFormMessage;
} 

function formatPrice(n) {
  return Number(n).toFixed(n % 1 ? 2 : 0);
}

function initYear() {
  document.getElementById('year').textContent = new Date().getFullYear();
}

function setupOrderNowBtn() {
  const btn = document.getElementById('order-now-btn');
  const formSection = document.getElementById('order-form');
  btn.addEventListener('click', () => {
    formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const nameInput = document.getElementById('name');
    if (nameInput) nameInput.focus();
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#039;');
}

function showFormMessage(msg, ms = 3000) {
  if (window.showFormMessage) return window.showFormMessage(msg, ms);
  const el = document.getElementById('formMessage');
  if (!el) return;
  el.textContent = msg;
  setTimeout(()=>{ if (el.textContent === msg) el.textContent = ''; }, ms);
}