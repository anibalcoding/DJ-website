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

const menuItems = $$('.menu_items');
menuItems.forEach(item => {
  item.addEventListener('click',() => {
    if (menu && menu.classList.contains('show')) {  
      menu.classList.remove('show');
      toggle?.setAttribute('aria-expanded', 'false');
    }
  });
})


$$('[data-scroll-top]').forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (menu && menu.classList.contains('show')) {
      menu.classList.remove('show');
      toggle?.setAttribute('aria-expanded', 'false');
    }
  });
});

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


// Booking form validation + server submission
const bookingForm = $('#bookingForm');
const formStatus = $('#formStatus');
const bookingStatus = new URLSearchParams(window.location.search).get('booking');

if (bookingStatus === 'sent' && formStatus) {
  formStatus.textContent = 'Booking request sent. We will follow up soon.';
}

function validate(form){
  let ok = true;
  $$('input[required], select[required], textarea[required]', form).forEach(el => {
    const errorEl = document.querySelector(`.error[data-for="${el.id}"]`);
    if (!el.value) {
      ok = false;
      if (errorEl) errorEl.textContent = 'Required';
    } else if (el.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value)) {
      ok = false;
      if (errorEl) errorEl.textContent = 'Enter a valid email';
    } else if (errorEl) {
      errorEl.textContent = '';
    }
  });
  return ok;
}

bookingForm?.addEventListener('submit', (e) => {
  if (!validate(bookingForm)) {
    e.preventDefault();
    formStatus.textContent = 'Please fix the errors above.';
    return;
  }
  formStatus.textContent = 'Sending...';
});

// Instagram embed refresh on load
window.addEventListener('load', () => {
  if (window.instgrm && window.instgrm.Embeds) window.instgrm.Embeds.process();
});
