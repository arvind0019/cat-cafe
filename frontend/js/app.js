const API = 'http://127.0.0.1:5000/api';
const page = document.body.dataset.page || 'home';
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loading');
  setTimeout(() => {
    $('.loader')?.classList.add('hidden');
    document.body.classList.remove('loading');
  }, 650);
  buildNav();
  buildFooter();
  wireTheme();
  wireCursor();
  wireReveal();
  routePage();
});

function buildNav() {
  const current = `${page}.html`.replace('home.html', 'index.html');
  const links = [
    ['Home', 'index.html'], ['About', 'about.html'], ['Cats', 'cats.html'], ['Menu', 'menu.html'], ['Gallery', 'gallery.html'],
    ['Events', 'events.html'], ['Reserve', 'reservation.html'], ['Shop', 'shop.html'], ['Blog', 'blog.html'], ['Contact', 'contact.html']
  ];
  $('#nav').innerHTML = `
    <a class="brand" href="index.html"><img src="assets/images/logo.svg" alt="Velvet Paw logo"><span>Velvet Paw Cafe</span></a>
    <button class="menu-toggle" title="Menu">☰</button>
    <div class="nav-links">${links.map(([label, href]) => `<a class="${href === current ? 'active' : ''}" href="${href}">${label}</a>`).join('')}</div>
    <div class="nav-actions"><a class="icon-btn" title="Login" href="login.html">♡</a><button class="icon-btn theme-toggle" title="Theme">◐</button></div>`;
  $('.menu-toggle').addEventListener('click', () => $('.nav-links').classList.toggle('open'));
}

function buildFooter() {
  $('#footer').innerHTML = `
    <div><div class="brand"><img src="assets/images/logo.svg" alt=""><span>Velvet Paw Cafe</span></div><p>A luxury local cat cafe for quiet coffee, beautiful rescue cats, curated events, and elegant little rituals.</p></div>
    <div><h3>Hours</h3><p>Mon-Fri 8:00-20:00<br>Sat-Sun 9:00-22:00</p></div>
    <div><h3>Contact</h3><p>hello@velvetpaw.local<br>+1 555 0187<br>12 Garden Lane</p></div>
    <div><h3>Newsletter</h3><form data-form="newsletter"><input name="email" type="email" placeholder="Email address" required><button class="btn" type="submit">Join</button><p class="notice"></p></form></div>
    <div class="map">Google Map Placeholder</div>`;
}

function wireTheme() {
  const saved = localStorage.getItem('theme') || 'light';
  document.documentElement.dataset.theme = saved;
  $('.theme-toggle')?.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('theme', next);
  });
}

function wireCursor() {
  const cursor = $('.cursor');
  if (!cursor || matchMedia('(pointer: coarse)').matches) return;
  document.addEventListener('mousemove', (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  });
  $$('a, button, input, textarea, select').forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('active'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
  });
}

function wireReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('visible'));
  }, { threshold: .12 });
  $$('.reveal').forEach((el) => observer.observe(el));
}

async function fetchOrFallback(endpoint, fallback) {
  try {
    const response = await fetch(`${API}/${endpoint}`);
    if (!response.ok) throw new Error('API unavailable');
    const data = await response.json();
    return data.length ? data : fallback;
  } catch {
    return fallback;
  }
}

function card(item, kind = 'default') {
  const img = item.image || item.photo || 'assets/images/interior.svg';
  const price = item.price !== undefined ? `<strong class="price">$${Number(item.price).toFixed(2)}</strong>` : '';
  return `<article class="card reveal"><img class="media" src="${img}" alt="${item.name || item.title}"><div class="card-body"><div class="meta"><span class="pill">${item.category || item.breed || 'Signature'}</span>${item.available === false ? '<span class="pill">Resting</span>' : ''}</div><h3>${item.name || item.title}</h3><p>${item.description || item.personality || item.excerpt || ''}</p>${price}${kind === 'cat' ? `<p>${item.age} years · ${item.gender}<br>${item.favoriteToy} · ${item.favoriteFood}<br>${item.healthStatus}</p>` : ''}</div></article>`;
}

function hero(title, text, eyebrow = 'Luxury Cat Cafe') {
  return `<section class="hero"><video class="hero-video" autoplay muted loop playsinline poster="assets/images/interior.svg"><source src="assets/videos/hero-cafe.mp4" type="video/mp4"></video><div class="hero-content"><span class="eyebrow">${eyebrow}</span><h1>${title}</h1><p class="lead">${text}</p><div class="actions"><a class="btn" href="reservation.html">Reserve a Table</a><a class="btn secondary" href="cats.html">Meet the Cats</a></div></div></section>`;
}

async function routePage() {
  if (page === 'home') return home();
  if (page === 'about') return simplePage('A quieter kind of luxury', 'Designed for slow coffee, soft light, and cats who set the pace.', aboutSections());
  if (page === 'cats') return listing('Meet Our Cats', 'Every resident has a story, a health record, and a favorite sunny corner.', 'cats', window.CAFE_DATA.cats, 'cat');
  if (page === 'menu') return listing('Cafe Menu', 'Coffee, tea, desserts, breakfast, lunch, and staff-served cat snacks.', 'menu', window.CAFE_DATA.menu);
  if (page === 'gallery') return gallery();
  if (page === 'events') return listing('Events', 'Wellness mornings, coffee salons, and local adoption socials.', 'events', window.CAFE_DATA.events);
  if (page === 'shop') return listing('Boutique Shop', 'Coffee beans, mugs, toys, shirts, cat food, and gift cards.', 'products', window.CAFE_DATA.products);
  if (page === 'blog') return blog();
  if (page === 'reservation') return reservation();
  if (page === 'contact') return contact();
  if (page === 'login' || page === 'register') return auth(page);
  if (page === 'dashboard') return dashboard(false);
  if (page === 'admin') return dashboard(true);
}

async function home() {
  const cats = await fetchOrFallback('cats', window.CAFE_DATA.cats);
  const menu = await fetchOrFallback('menu', window.CAFE_DATA.menu);
  $('#app').innerHTML = hero('Velvet Paw Cafe', 'A premium cat cafe where specialty coffee, rescue-cat comfort, and modern design meet.') +
    `<section class="section split reveal"><div><span class="eyebrow">Cafe Experience</span><h2>Soft rituals, beautifully hosted.</h2><p>Book a calm table, sip a signature latte, and spend time with cats in a lounge built around their comfort.</p></div><video class="card" autoplay muted loop playsinline poster="assets/images/coffee.svg"><source src="assets/videos/cafe-experience.mp4" type="video/mp4"></video></section>
    <section class="section"><div class="section-head"><div><span class="eyebrow">Featured Cats</span><h2>Resident stars</h2></div><a class="btn secondary" href="cats.html">View All</a></div><div class="grid grid-4">${cats.slice(0,4).map((x) => card(x, 'cat')).join('')}</div></section>
    <section class="section"><div class="section-head"><div><span class="eyebrow">Premium Coffee</span><h2>Menu highlights</h2></div></div><div class="grid grid-3">${menu.slice(0,3).map((x) => card(x)).join('')}</div></section>
    <section class="section glass reveal"><div class="stats"><div class="stat"><strong data-count="14">0</strong><p>Resident cats</p></div><div class="stat"><strong data-count="12000">0</strong><p>Happy guests</p></div><div class="stat"><strong data-count="38">0</strong><p>Adoptions helped</p></div><div class="stat"><strong data-count="7">0</strong><p>Signature drinks</p></div></div></section>
    <section class="section grid grid-3">${['The most serene cafe in the city.', 'Design-led, ethical, and deeply cozy.', 'The latte was flawless and Mochi sat beside me.'].map((q) => `<article class="card reveal"><div class="card-body"><h3>★★★★★</h3><p>${q}</p></div></article>`).join('')}</section>
    <section class="section"><div class="section-head"><div><span class="eyebrow">Instagram Feed</span><h2>Moments from the lounge</h2></div></div><div class="grid grid-4">${['cat-luna.svg','coffee.svg','interior.svg','dessert.svg'].map((img) => `<img class="card media reveal" src="assets/images/${img}" alt="Cafe moment">`).join('')}</div></section>`;
  counters();
  wireReveal();
}

function counters() {
  $$('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count);
    let current = 0;
    const step = Math.max(1, Math.floor(target / 80));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = current.toLocaleString();
    }, 18);
  });
}

async function listing(title, text, endpoint, fallback, kind) {
  const data = await fetchOrFallback(endpoint, fallback);
  const categories = [...new Set(data.map((x) => x.category || x.breed).filter(Boolean))];
  $('#app').innerHTML = `<section class="section"><div class="section-head"><div><span class="eyebrow">Explore</span><h2>${title}</h2><p>${text}</p></div></div><div class="filters"><input id="search" placeholder="Search"><select id="category"><option value="">All categories</option>${categories.map((c) => `<option>${c}</option>`).join('')}</select><input id="minPrice" type="number" placeholder="Min price"><input id="maxPrice" type="number" placeholder="Max price"></div><div id="cards" class="grid grid-3"></div></section>`;
  const render = () => {
    const search = $('#search').value.toLowerCase();
    const cat = $('#category').value;
    const min = Number($('#minPrice').value || 0);
    const max = Number($('#maxPrice').value || 99999);
    $('#cards').innerHTML = data.filter((x) => JSON.stringify(x).toLowerCase().includes(search) && (!cat || x.category === cat || x.breed === cat) && (x.price === undefined || (x.price >= min && x.price <= max))).map((x) => card(x, kind)).join('');
    wireReveal();
  };
  $$('.filters input, .filters select').forEach((el) => el.addEventListener('input', render));
  render();
}

function aboutSections() {
  return `<section class="section split"><img class="card media reveal" src="assets/images/interior.svg" alt="Cafe interior"><div class="glass reveal"><h2>Built around cat comfort.</h2><p>Our lounge uses vertical paths, quiet retreat rooms, controlled guest flow, and staff-led interactions so cats stay confident and guests feel welcome.</p></div></section>`;
}

function simplePage(title, text, extra = '') { $('#app').innerHTML = hero(title, text, 'Velvet Paw') + extra; }
function gallery() { return listing('Gallery', 'Cats, coffee, interiors, desserts, and happy customers.', 'gallery', [{ title:'Lounge Light', category:'Interior', image:'assets/images/interior.svg' }, { title:'Dessert Bar', category:'Desserts', image:'assets/images/dessert.svg' }, { title:'Happy Guest', category:'Customers', image:'assets/images/customer.svg' }]); }
function blog() { return listing('Journal', 'Stories, categories, comments, and search-ready cafe notes.', 'blog', window.CAFE_DATA.posts); }

function reservation() {
  $('#app').innerHTML = `<section class="section split"><div><span class="eyebrow">Reservation</span><h2>Book your lounge visit</h2><p>Your confirmation is saved to local MongoDB when the backend and MongoDB are running.</p></div><form class="glass" data-form="reservation"><div class="form-grid two"><input name="name" placeholder="Name" required><input name="phone" placeholder="Phone" required><input name="email" type="email" placeholder="Email" required><input name="guests" type="number" min="1" max="12" placeholder="Guests" required><input name="date" type="date" required><input name="time" type="time" required></div><textarea name="specialRequest" placeholder="Special request"></textarea><button class="btn" type="submit">Confirm Reservation</button><p class="notice"></p></form></section>`;
  wireForms();
}

function contact() {
  $('#app').innerHTML = `<section class="section split"><div><span class="eyebrow">Contact</span><h2>Plan a visit or private event.</h2><p>Use the form for local messages, partnerships, uploads, or admin requests.</p><div class="map">Google Map Placeholder</div></div><form class="glass" data-form="contact"><input name="name" placeholder="Name" required><input name="email" type="email" placeholder="Email" required><textarea name="message" placeholder="Message" required></textarea><button class="btn" type="submit">Send</button><p class="notice"></p></form></section>`;
  wireForms();
}

function auth(mode) {
  const isRegister = mode === 'register';
  $('#app').innerHTML = `<section class="section split"><div><span class="eyebrow">${isRegister ? 'Register' : 'Login'}</span><h2>${isRegister ? 'Create your cafe account.' : 'Welcome back.'}</h2><p>${isRegister ? 'The first registered local user becomes admin for setup.' : 'Access your reservations, wishlist, favorite cats, and dashboard.'}</p></div><form class="glass" data-form="${mode}">${isRegister ? '<input name="name" placeholder="Name" required>' : ''}<input name="email" type="email" placeholder="Email" required><input name="password" type="password" placeholder="Password" required><button class="btn" type="submit">${isRegister ? 'Create Account' : 'Login'}</button><a href="#" data-forgot>Forgot password?</a><p class="notice"></p></form></section>`;
  wireForms();
}

async function dashboard(admin) {
  const reservations = await fetchOrFallback('reservations', []);
  $('#app').innerHTML = `<section class="section dashboard"><aside class="glass side"><span class="eyebrow">${admin ? 'Admin' : 'User'}</span><h3>${admin ? 'Operations' : 'Dashboard'}</h3><p>${admin ? 'Manage cats, products, reservations, users, gallery, videos, blog, menu, uploads, and settings through the API.' : 'Profile, reservations, wishlist, and favorite cats.'}</p></aside><main class="glass"><h2>${admin ? 'Analytics' : 'Reservations'}</h2><div class="stats"><div class="stat"><strong>${reservations.length}</strong><p>Reservations</p></div><div class="stat"><strong>${window.CAFE_DATA.cats.length}</strong><p>Cats</p></div><div class="stat"><strong>${window.CAFE_DATA.products.length}</strong><p>Products</p></div><div class="stat"><strong>${window.CAFE_DATA.posts.length}</strong><p>Posts</p></div></div><table class="table"><thead><tr><th>Name</th><th>Date</th><th>Guests</th><th>Status</th></tr></thead><tbody>${reservations.map((r) => `<tr><td>${r.name}</td><td>${String(r.date).slice(0,10)}</td><td>${r.guests}</td><td>${r.status}</td></tr>`).join('') || '<tr><td colspan="4">No reservations yet.</td></tr>'}</tbody></table></main></section>`;
}

function wireForms() {
  $$('form').forEach((form) => form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const type = form.dataset.form;
    const body = Object.fromEntries(new FormData(form).entries());
    const notice = $('.notice', form);
      const endpoint = { reservation: 'reservations', login: 'auth/login', register: 'auth/register', contact: 'contact', newsletter: 'newsletter' }[type];
    try {
      if (!endpoint) throw new Error('Message saved locally in this browser.');
      const response = await fetch(`${API}/${endpoint}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Request failed');
      if (data.token) localStorage.setItem('token', data.token);
      notice.textContent = data.message || 'Done.';
      form.reset();
    } catch (error) {
      notice.textContent = error.message;
    }
  }));
}
