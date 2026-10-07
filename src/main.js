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
