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

// Handle all Formspree forms
document.querySelectorAll('form[action*="formspree.io"]').forEach(form => {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const statusEl = form.querySelector('.form-status');
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    if (statusEl) {
      statusEl.style.display = 'none';
      statusEl.style.color = '';
    }

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        form.reset();
        if (statusEl) {
          statusEl.textContent = '✓ Message sent successfully! We will get back to you soon.';
          statusEl.style.color = '#0a7c2e';
          statusEl.style.display = 'block';
        } else {
          alert('Message sent successfully! We will get back to you soon.');
        }
      } else {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      if (statusEl) {
        statusEl.textContent = '✗ Failed to send. Please try again or contact us on WhatsApp.';
        statusEl.style.color = '#c0392b';
        statusEl.style.display = 'block';
      } else {
        alert('Failed to send. Please try again or message us on WhatsApp.');
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
  });
});
