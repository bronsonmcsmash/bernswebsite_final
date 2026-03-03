// Header scroll shadow
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
toggle.addEventListener('click', () => {
  const open = nav.style.display === 'flex';
  nav.style.display = open ? '' : 'flex';
  if (!open) {
    Object.assign(nav.style, {
      flexDirection: 'column',
      position: 'fixed',
      top: 'var(--header-h)',
      left: '0',
      right: '0',
      background: 'rgba(250,250,248,0.98)',
      padding: '1.5rem',
      borderBottom: '1px solid #e8e8e4',
      backdropFilter: 'blur(12px)',
      zIndex: '99',
      gap: '1.25rem',
    });
  }
});

// Close mobile nav on link click
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.style.display = '';
  });
});

// Contact form: simple submit feedback
const form = document.querySelector('.contact-form');
form.addEventListener('submit', e => {
  e.preventDefault();
  const btn = form.querySelector('button[type=submit]');
  btn.textContent = 'Message Sent!';
  btn.style.background = '#4a7c59';
  btn.style.borderColor = '#4a7c59';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.style.background = '';
    btn.style.borderColor = '';
    btn.disabled = false;
    form.reset();
  }, 3000);
});

// Subtle scroll-in animation for cards
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card, .post-card, .testimonial').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
  observer.observe(el);
});
