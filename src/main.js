// Serene Velora - Shared JS

// Navbar scroll effect
(function () {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
      navbar.classList.remove('transparent');
    } else {
      if (navbar.dataset.transparent === 'true') {
        navbar.classList.add('transparent');
        navbar.classList.remove('scrolled');
      }
    }
  };

  if (navbar.dataset.transparent === 'true') {
    navbar.classList.add('transparent');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// Mobile nav
(function () {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const overlay = document.getElementById('nav-overlay');
  const close = document.getElementById('mobile-nav-close');

  const open = () => {
    mobileNav?.classList.add('open');
    overlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const closeFn = () => {
    mobileNav?.classList.remove('open');
    overlay?.classList.remove('open');
    document.body.style.overflow = '';
  };

  hamburger?.addEventListener('click', open);
  close?.addEventListener('click', closeFn);
  overlay?.addEventListener('click', closeFn);
})();

// Scroll reveal
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => observer.observe(el));
})();

// FAQ accordion
(function () {
  const faqs = document.querySelectorAll('.faq-item');
  faqs.forEach(faq => {
    faq.addEventListener('click', () => {
      const isOpen = faq.classList.contains('open');
      faqs.forEach(f => f.classList.remove('open'));
      if (!isOpen) faq.classList.add('open');
    });
  });
})();

// Active nav link
(function () {
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

// Filter tabs
(function () {
  document.querySelectorAll('.filter-tabs').forEach(tabs => {
    tabs.querySelectorAll('.filter-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      });
    });
  });
})();

// Testimonial slider dots
(function () {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      dots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
    });
  });
})();

// ===== SCROLL TO TOP ARROW BUTTON =====
(function () {
  function initScrollToTop() {
    let scrollBtn = document.getElementById('scroll-top-btn');
    if (!scrollBtn) {
      scrollBtn = document.createElement('button');
      scrollBtn.id = 'scroll-top-btn';
      scrollBtn.className = 'scroll-top-btn';
      scrollBtn.setAttribute('aria-label', 'Scroll to top');
      scrollBtn.setAttribute('title', 'Scroll to top');
      scrollBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="19" x2="12" y2="5"></line>
          <polyline points="5 12 12 5 19 12"></polyline>
        </svg>
      `;
      document.body.appendChild(scrollBtn);
    }

    const onScroll = () => {
      if (window.scrollY > 300) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    scrollBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollToTop);
  } else {
    initScrollToTop();
  }
})();

// ===== PLAN MY HOLIDAY - INTERACTIVE MODAL & FORM NAVIGATION =====
(function () {
  const isContactPage = window.location.pathname.endsWith('contact.html') || window.location.pathname.endsWith('contact');

  // Inject Plan My Holiday Modal into DOM if not present
  function injectModal() {
    if (document.getElementById('plan-modal')) return;

    const modalHTML = `
    <div class="plan-modal-backdrop" id="plan-modal" aria-hidden="true" role="dialog" aria-modal="true">
      <div class="plan-modal-dialog" onclick="event.stopPropagation()">
        <div class="plan-modal-header">
          <button type="button" class="plan-modal-close" id="plan-modal-close" aria-label="Close modal">&times;</button>
          <div class="plan-modal-tag">Plan Your Journey</div>
          <h3 class="plan-modal-title">Tell us about <em>your holiday.</em></h3>
          <p class="plan-modal-subtitle">Share a few details and our Coimbatore travel specialists will craft a personalised itinerary curated just for you.</p>
        </div>
        <div class="plan-modal-body">
          <form id="modal-enquiry-form" class="modal-form">
            <div class="modal-form-row">
              <div class="form-group">
                <label for="modal-full-name">Full Name *</label>
                <input type="text" id="modal-full-name" name="full_name" placeholder="Your full name" required />
              </div>
              <div class="form-group">
                <label for="modal-phone">Phone Number *</label>
                <input type="tel" id="modal-phone" name="phone" placeholder="Your phone number" required />
              </div>
            </div>
            <div class="modal-form-row">
              <div class="form-group">
                <label for="modal-email">Email Address *</label>
                <input type="email" id="modal-email" name="email" placeholder="your.name@example.com" required />
              </div>
              <div class="form-group">
                <label for="modal-destination">Preferred Destination</label>
                <select id="modal-destination" name="destination">
                  <option value="">Select a destination</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Bali">Bali</option>
                  <option value="Maldives">Maldives</option>
                  <option value="Vietnam">Vietnam</option>
                  <option value="Switzerland">Switzerland</option>
                  <option value="Dubai">Dubai</option>
                  <option value="Other">Other / Custom</option>
                </select>
              </div>
            </div>
            <div class="modal-form-row">
              <div class="form-group">
                <label for="modal-travel-month">Travel Month</label>
                <select id="modal-travel-month" name="travel_month">
                  <option value="Upcoming 30-60 Days">Upcoming 30–60 Days</option>
                  <option value="Next 3-6 Months">Next 3–6 Months</option>
                  <option value="Festive Season / Holidays">Festive Season / Holidays</option>
                  <option value="Flexible Dates">Flexible Dates</option>
                </select>
              </div>
              <div class="form-group">
                <label for="modal-travellers">Number of Travellers</label>
                <select id="modal-travellers" name="travellers">
                  <option value="Couple (2 Travellers)">Couple (2)</option>
                  <option value="Solo (1 Traveller)">Solo (1)</option>
                  <option value="Family (3-4 Travellers)">Family (3–4)</option>
                  <option value="Group (5+ Travellers)">Group (5+)</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label for="modal-holiday-style">Holiday Style</label>
              <select id="modal-holiday-style" name="holiday_style">
                <option value="Leisure & Relaxation">Leisure & Relaxation</option>
                <option value="Honeymoon & Romantic">Honeymoon & Romantic</option>
                <option value="Family Holiday">Family Holiday</option>
                <option value="Adventure & Culture">Adventure & Culture</option>
              </select>
            </div>
            <div class="form-group">
              <label for="modal-notes">Special Requests or Ideas (Optional)</label>
              <textarea id="modal-notes" name="notes" rows="3" placeholder="Tell us about special occasions, preferred hotels, or activities you'd love..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center;padding:15px;font-size:0.95rem">
              Get Personalised Holiday Plan &rarr;
            </button>
            <div class="form-note" style="justify-content:center;margin-top:14px">
              <span>&#128274;</span><span>Your details are safe with us. We craft plans with zero obligation.</span>
            </div>
          </form>
          <div id="modal-form-success" class="plan-modal-success" style="display:none">
            <div class="plan-modal-success-icon">&#10003;</div>
            <h3 style="font-family:'Cormorant Garamond',serif;font-size:1.8rem;color:var(--dark);margin-bottom:8px">Enquiry Received!</h3>
            <p style="color:var(--text);font-size:0.92rem;line-height:1.6;margin-bottom:20px" id="modal-success-msg">
              Thank you! Our Coimbatore travel team is preparing your custom holiday plan and will be in touch within 24 hours.
            </p>
            <div style="display:flex;flex-direction:column;gap:10px;align-items:center">
              <a href="https://wa.me/000" id="modal-wa-link" target="_blank" class="btn btn-primary" style="background:#25D366;border-color:#25D366;color:#fff;width:100%;justify-content:center">
                Chat Instantly on WhatsApp &rarr;
              </a>
              <button type="button" class="btn btn-outline" id="modal-success-close" style="width:100%;justify-content:center">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>`;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('plan-modal');
    const closeBtn = document.getElementById('plan-modal-close');
    const successCloseBtn = document.getElementById('modal-success-close');
    const form = document.getElementById('modal-enquiry-form');

    const closeModal = () => {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    closeBtn?.addEventListener('click', closeModal);
    successCloseBtn?.addEventListener('click', closeModal);
    modal?.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeModal();
      }
    });

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('modal-full-name')?.value || 'Traveller';
      const dest = document.getElementById('modal-destination')?.value || 'your dream destination';
      const successMsg = document.getElementById('modal-success-msg');
      if (successMsg) {
        successMsg.textContent = `Thank you, ${name}! Your holiday enquiry for ${dest} has been received. Our Coimbatore travel team will be in touch within 24 hours.`;
      }
      const waLink = document.getElementById('modal-wa-link');
      if (waLink) {
        waLink.href = `https://wa.me/000?text=${encodeURIComponent(`Hi Serene Velora Holidays! I'm ${name} and I would like to plan a holiday to ${dest}.`)}`;
      }
      form.style.display = 'none';
      const successBox = document.getElementById('modal-form-success');
      if (successBox) successBox.style.display = 'block';
    });
  }

  // Open modal function
  window.openPlanModal = function (destination) {
    injectModal();
    const modal = document.getElementById('plan-modal');
    const form = document.getElementById('modal-enquiry-form');
    const successBox = document.getElementById('modal-form-success');

    if (form && successBox) {
      form.style.display = 'block';
      successBox.style.display = 'none';
    }

    if (destination) {
      const destSelect = document.getElementById('modal-destination');
      if (destSelect) {
        const optionExists = Array.from(destSelect.options).some(o => o.value.toLowerCase() === destination.toLowerCase());
        if (optionExists) {
          destSelect.value = destination;
        } else {
          destSelect.value = 'Other';
        }
      }
    }

    // Close mobile nav if open
    document.getElementById('mobile-nav')?.classList.remove('open');
    document.getElementById('nav-overlay')?.classList.remove('open');

    modal?.classList.add('open');
    modal?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      document.getElementById('modal-full-name')?.focus();
    }, 150);
  };

  // Scroll smoothly to enquiry form on contact page
  function scrollToContactForm() {
    const formEl = document.getElementById('enquiry-form');
    if (formEl) {
      // Close mobile menu if open
      document.getElementById('mobile-nav')?.classList.remove('open');
      document.getElementById('nav-overlay')?.classList.remove('open');
      document.body.style.overflow = '';

      formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      formEl.classList.add('form-highlight');
      setTimeout(() => formEl.classList.remove('form-highlight'), 1800);
      const firstInput = formEl.querySelector('input');
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 500);
      }
    }
  }

  // Handle hash on initial load
  if (isContactPage && (window.location.hash === '#enquiry-form' || window.location.hash === '#contact-form')) {
    setTimeout(scrollToContactForm, 300);
  }

  // Global delegation for Plan My Holiday and destination explore links
  document.addEventListener('click', (e) => {
    const target = e.target.closest('a, button');
    if (!target) return;

    const text = (target.textContent || '').trim().toLowerCase();
    const href = target.getAttribute('href') || '';
    const hasModalAttr = target.hasAttribute('data-plan-modal');
    const isPlanButton = text.includes('plan my holiday') || hasModalAttr || target.classList.contains('nav-cta');
    const isScrollToFormLink = href === '#enquiry-form' || href.endsWith('contact.html#enquiry-form');

    if (isPlanButton || isScrollToFormLink) {
      if (isContactPage) {
        // If on contact page, smoothly scroll right down to the form!
        e.preventDefault();
        scrollToContactForm();
      } else {
        // If on other pages, open the interactive holiday planner modal!
        e.preventDefault();
        const dest = target.getAttribute('data-destination') || '';
        window.openPlanModal(dest);
      }
    }
  });

  // Inject modal structure on page load
  if (!isContactPage) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', injectModal);
    } else {
      injectModal();
    }
  }
})();

