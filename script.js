// Utility: qs
const $ = (s, c=document) => c.querySelector(s);
const $$ = (s, c=document) => Array.from(c.querySelectorAll(s));

// Year
$('#year').textContent = new Date().getFullYear();

// Mobile nav
const toggle = $('.nav__toggle');
const menu = $('#navMenu');
if (toggle) {
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('show');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

// Fake "Live now" detection (replace later with real API/poll)
const liveBadge = $('#liveBadge');
const livePreview = $('#livePreview');
// Simulate: live on Fridays between 21:00-23:00 CST
(function simulateLiveWindow(){
  const now = new Date();
  const isFriday = now.getDay() === 5; // 5=Fri
  const hour = now.getHours();
  const live = isFriday && hour >= 21 && hour <= 23;
  if (live) {
    if (liveBadge) liveBadge.hidden = false;
    livePreview?.classList.add('is-live');
  }
})();

// Gallery (placeholder images with local fallback so grid always populates)
const gallery = $('#galleryGrid');
if (gallery) {
  const fallbackImage = 'assets/hero.jpg';
  const galleryImages = Array.from(
    { length: 12 },
    (_, i) => `https://images.unsplash.com/photo-1521334726092-b509a19597d2?auto=format&fit=crop&w=800&q=60&sig=${i}`
  );
  galleryImages.forEach(src => {
    const fig = document.createElement('figure');
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Crowd & DJ booth photo';
    img.loading = 'lazy';
    img.decoding = 'async';
    img.addEventListener('error', () => {
      img.src = fallbackImage;
    }, { once: true });
    fig.appendChild(img);
    gallery.appendChild(fig);
  });
} else {
  console.warn('#galleryGrid not found in DOM.');
}

// Shows data (edit here)
const shows = [
  { date: '2025-12-05', city: 'Dallas, TX', venue: 'Deep Ellum Hall', link: '#'},
  { date: '2025-12-12', city: 'Austin, TX', venue: 'The Neon Room', link: '#'},
  { date: '2026-01-10', city: 'Houston, TX', venue: 'Club Vibe', link: '#'},
];
const showsList = $('#showsList');
const df = new Intl.DateTimeFormat('en-US', {weekday:'short', month:'short', day:'numeric', year:'numeric'});
shows.forEach(s => {
  const li = document.createElement('li');
  const left = document.createElement('div'); left.className = 'meta';
  left.innerHTML = `<strong>${df.format(new Date(s.date))}</strong> · ${s.city} · ${s.venue}`;
  const right = document.createElement('div');
  // const a = document.createElement('a'); a.href = s.link; a.className = 'btn btn--ghost'; a.textContent = 'Tickets';
  // right.appendChild(a);
  li.append(left, right);
  showsList.appendChild(li);
});

// Blog placeholder
const blogGrid = $('#blogGrid');
const posts = [
  { title: '5 Transitions that Always Hit', date: '2025-10-02', excerpt: 'From throwback flips to drill tempo shifts, here’s what works on any floor.' },
  { title: 'TikTok Live Rig: My Setup', date: '2025-09-14', excerpt: 'Signal flow, lighting, and latency tweaks for clean streams.' },
  { title: 'Crate Building 101', date: '2025-08-30', excerpt: 'Organizing crates for open-format nights vs. hip-hop purist sets.' }
];
if (blogGrid) {
  posts.forEach(p => {
    const card = document.createElement('article');
    card.className = 'post';
    card.innerHTML = `<h3>${p.title}</h3><p class=\"muted\">${new Date(p.date).toLocaleDateString()}</p><p>${p.excerpt}</p>`;
    blogGrid.appendChild(card);
  });
}

// Booking form validation + submission (email link fallback)
const bookingForm = $('#bookingForm');
const formStatus = $('#formStatus');

function validate(form){
  let ok = true;
  $$('input[required], select[required]', form).forEach(el => {
    const errorEl = document.querySelector(`.error[data-for="${el.id}"]`);
    if (!el.value) { ok = false; errorEl.textContent = 'Required'; }
    else if (el.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value)) { ok=false; errorEl.textContent = 'Enter a valid email'; }
    else { errorEl.textContent = ''; }
  });
  return ok;
}

bookingForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!validate(bookingForm)) { formStatus.textContent = 'Please fix the errors above.'; return; }
  const data = Object.fromEntries(new FormData(bookingForm).entries());
  // Fallback: mailto (replace with backend/Formspark/Jotform/NetlifyForms later)
  const subject = encodeURIComponent('Booking Request — DJ Shutitdown');
  const body = encodeURIComponent(
    `Name: ${data.name}\nEmail: ${data.email}\nDate: ${data.date}\nType: ${data.type}\nVenue: ${data.venue||''}\nBudget: ${data.budget||''}\nNotes: ${data.notes||''}`
  );
  window.location.href = `mailto:bookings@djshutitdown.com?subject=${subject}&body=${body}`;
  formStatus.textContent = 'Opening your email client…';
});

// Instagram embed refresh on load
window.addEventListener('load', () => {
  if (window.instgrm && window.instgrm.Embeds) window.instgrm.Embeds.process();
});
