/* ============================================================
   Silverstone Smart Parking — Main JavaScript (main.js)
   Author: Titus Kimeli Bowen | Student ID: u3038831
   Includes: Navigation, FAQ accordion, Form validation,
             Tab switching, Live availability counter,
             Contact form, Login form
   ============================================================ */

/* ---------- Mobile Navigation Toggle ---------- */
(function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', function () {
    navLinks.classList.toggle('open');
    /* Animate hamburger to X */
    const spans = toggle.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });

  /* Close nav when a link is clicked on mobile */
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
    });
  });
})();


/* ---------- FAQ Accordion ---------- */
(function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(function (question) {
    question.addEventListener('click', function () {
      const item = this.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      /* Close all */
      document.querySelectorAll('.faq-item').forEach(function (i) {
        i.classList.remove('open');
      });
      /* Open clicked (unless it was already open) */
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
})();


/* ---------- Tab Switcher (Login page) ---------- */
(function initTabs() {
  document.querySelectorAll('.tabs').forEach(function (tabContainer) {
    const tabs    = tabContainer.querySelectorAll('.tab');
    const targets = tabContainer.dataset.targets
      ? tabContainer.dataset.targets.split(',')
      : [];

    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        if (targets[i]) {
          document.querySelectorAll('.tab-panel').forEach(function (p) {
            p.style.display = 'none';
          });
          const panel = document.getElementById(targets[i]);
          if (panel) panel.style.display = 'block';
        }
      });
    });
  });
})();


/* ---------- Contact Form Validation & Submission ---------- */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    /* Clear previous errors */
    form.querySelectorAll('.field-error').forEach(function (el) {
      el.remove();
    });
    form.querySelectorAll('.form-input, .form-textarea, .form-select').forEach(function (el) {
      el.style.borderColor = '';
    });

    /* Validate each required field */
    form.querySelectorAll('[required]').forEach(function (field) {
      if (!field.value.trim()) {
        showError(field, 'This field is required.');
        valid = false;
      }
    });

    /* Email format check */
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
      showError(emailField, 'Please enter a valid email address.');
      valid = false;
    }

    /* Consent checkbox */
    const consent = form.querySelector('#consentCheck');
    if (consent && !consent.checked) {
      showError(consent.closest('.form-check'), 'You must consent before submitting.');
      valid = false;
    }

    if (valid) {
      showSuccess(form);
    }
  });

  function showError(el, msg) {
    el.style.borderColor = '#ef4444';
    const err = document.createElement('p');
    err.className = 'field-error';
    err.style.cssText = 'color:#f87171;font-size:0.75rem;margin-top:0.3rem;';
    err.textContent = msg;
    el.parentNode.insertBefore(err, el.nextSibling);
  }

  function showSuccess(form) {
    form.innerHTML =
      '<div style="text-align:center;padding:3rem 2rem;">' +
        '<div style="font-size:3rem;margin-bottom:1rem;">✅</div>' +
        '<h3 style="font-family:DM Serif Display,serif;font-size:1.6rem;margin-bottom:0.8rem;">Message Sent!</h3>' +
        '<p style="color:rgba(255,255,255,0.5);font-size:0.9rem;">We\'ll respond within one working day.</p>' +
      '</div>';
  }
})();


/* ---------- Login Form ---------- */
(function initLoginForm() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const email    = form.querySelector('#loginEmail').value.trim();
    const password = form.querySelector('#loginPassword').value;
    const errorDiv = document.getElementById('loginError');

    /* Clear errors */
    if (errorDiv) errorDiv.style.display = 'none';
    form.querySelectorAll('.field-error').forEach(function (el) { el.remove(); });

    if (!email || !password) {
      if (errorDiv) {
        errorDiv.textContent = 'Please enter your email and password.';
        errorDiv.style.display = 'block';
      }
      return;
    }
    /* Simulate login feedback */
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Signing in…';
    btn.disabled = true;
    setTimeout(function () {
      if (errorDiv) {
        errorDiv.style.background = 'rgba(11,110,79,0.2)';
        errorDiv.style.borderColor = 'rgba(74,222,128,0.3)';
        errorDiv.style.color = '#4ade80';
        errorDiv.textContent = '✓ Welcome back! Redirecting…';
        errorDiv.style.display = 'block';
      }
      btn.textContent = 'Sign In →';
      btn.disabled = false;
    }, 1500);
  });
})();


/* ---------- Register Form ---------- */
(function initRegisterForm() {
  const form = document.getElementById('registerForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const pass1 = document.getElementById('regPassword');
    const pass2 = document.getElementById('regPassword2');
    const errorDiv = document.getElementById('registerError');
    form.querySelectorAll('.field-error').forEach(function (el) { el.remove(); });

    if (pass1 && pass2 && pass1.value !== pass2.value) {
      if (errorDiv) {
        errorDiv.textContent = 'Passwords do not match.';
        errorDiv.style.display = 'block';
      }
      return;
    }
    if (errorDiv) {
      errorDiv.style.background = 'rgba(11,110,79,0.2)';
      errorDiv.style.borderColor = 'rgba(74,222,128,0.3)';
      errorDiv.style.color = '#4ade80';
      errorDiv.textContent = '✓ Account created! Please check your email.';
      errorDiv.style.display = 'block';
    }
  });
})();


/* ---------- Live Availability Counter ---------- */
(function initAvailability() {
  const counters = document.querySelectorAll('[data-live-count]');
  if (!counters.length) return;

  /* Simulate minor fluctuations in availability */
  setInterval(function () {
    counters.forEach(function (el) {
      const base  = parseInt(el.dataset.liveCount, 10);
      const range = parseInt(el.dataset.range || '5', 10);
      const val   = base + Math.floor((Math.random() - 0.5) * range * 2);
      el.textContent = Math.max(0, val);
    });
  }, 8000);
})();


/* ---------- Smooth Scroll for anchor links ---------- */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/* ---------- Active nav link highlighting ---------- */
(function highlightNav() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href && href.split('/').pop() === current) {
      link.classList.add('active');
    }
  });
})();


/* ---------- Alert Signup Form (Home page) ---------- */
(function initAlertSignup() {
  const form = document.getElementById('alertSignupForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name    = document.getElementById('alertName').value.trim();
    const email   = document.getElementById('alertEmail').value.trim();
    const consent = document.getElementById('alertConsent');
    const success = document.getElementById('alertSuccess');

    /* Clear previous errors */
    form.querySelectorAll('.field-error').forEach(function (el) { el.remove(); });

    let valid = true;
    if (!name)  { showAlertError(document.getElementById('alertName'),  'Please enter your name.'); valid = false; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showAlertError(document.getElementById('alertEmail'), 'Please enter a valid email address.'); valid = false;
    }
    if (consent && !consent.checked) {
      showAlertError(consent.closest('.form-check'), 'You must consent to receive alerts.'); valid = false;
    }

    if (valid && success) {
      success.style.display = 'block';
      form.querySelector('button[type="submit"]').textContent = '✓ Subscribed';
      form.querySelector('button[type="submit"]').disabled = true;
    }
  });

  function showAlertError(el, msg) {
    el.style.borderColor = '#ef4444';
    const err = document.createElement('p');
    err.className = 'field-error';
    err.style.cssText = 'color:#f87171;font-size:0.75rem;margin-top:0.3rem;';
    err.textContent = msg;
    el.parentNode.insertBefore(err, el.nextSibling);
  }
})();
