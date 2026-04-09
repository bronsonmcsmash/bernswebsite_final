// Header scroll shadow
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
toggle.addEventListener('click', () => {
  nav.classList.toggle('open');
});

// Close mobile nav on link click
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
  });
});

// Contact form: submit to Formspree via fetch
const form = document.querySelector('.contact-form');
form.addEventListener('submit', e => {
  e.preventDefault();
  const btn = form.querySelector('button[type=submit]');
  btn.textContent = 'Sending\u2026';
  btn.disabled = true;
  fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
  }).then(res => {
    if (res.ok) {
      btn.textContent = 'Message Sent!';
      btn.style.background = '#4a7c59';
      btn.style.borderColor = '#4a7c59';
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.disabled = false;
        form.reset();
      }, 3000);
    } else {
      btn.textContent = 'Error \u2014 please try again';
      btn.disabled = false;
    }
  }).catch(() => {
    btn.textContent = 'Error \u2014 please try again';
    btn.disabled = false;
  });
});

// Deobfuscate email links (keeps addresses out of raw HTML for spam bots)
document.querySelectorAll('.email-link').forEach(link => {
  const user = link.dataset.user;
  const domain = link.dataset.domain;
  const email = user + '@' + domain;
  link.href = 'mailto:' + email;
  link.textContent = link.dataset.label || email;
});

// Staggered scroll-reveal animations
const reveal = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      reveal.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.thumb-item, .skill-tag, .about-layout, .contact-form, .showreel-thumb').forEach((el, i) => {
  el.classList.add('reveal-on-scroll');
  el.style.animationDelay = `${(i % 10) * 0.06}s`;
  reveal.observe(el);
});
