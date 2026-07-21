const toggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('site-navigation') || document.querySelector('.site-nav');
const year = document.getElementById('year');

if (toggle && nav) {
  toggle.setAttribute('aria-expanded', 'false');
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) {
      // focus first link for accessibility
      const firstLink = nav.querySelector('a');
      if (firstLink) firstLink.focus();
    }
  });

  // Close mobile menu when a navigation link is clicked
  nav.addEventListener('click', (e) => {
    const target = e.target;
    if (target && target.tagName === 'A' && nav.classList.contains('open')) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!nav.classList.contains('open')) return;
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });
}

const contactForm = document.getElementById('contactForm');
const whatsappNumber = '2349127643783';

if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get('name')?.toString().trim() || 'No name';
    const email = formData.get('email')?.toString().trim() || 'No email';
    const interest = formData.get('interest')?.toString().trim() || 'General inquiry';
    const message = formData.get('message')?.toString().trim() || 'No message provided';

    const whatsappMessage = `Hello OffShield Security,\n\nName: ${name}\nEmail: ${email}\nInterest: ${interest}\nMessage: ${message}`;
    const encoded = encodeURIComponent(whatsappMessage);
    const url = `https://wa.me/${whatsappNumber}?text=${encoded}`;

    window.open(url, '_blank');
  });
}

if (year) {
  year.textContent = new Date().getFullYear();
}
