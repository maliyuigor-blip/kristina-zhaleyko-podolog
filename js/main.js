/**
 * PODO.MEDIC & ACADEMY - KRISTINA ZHALEYKO
 * Master JavaScript Controller for Multi-Page Portal
 * (index.html & courses.html)
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileDrawer();
  initHeaderScroll();
  initCaseFilters();
  initAccordions();
  initSmoothScroll();
});

/**
 * 1. Mobile Drawer Navigation & Scroll Lock
 */
function initMobileDrawer() {
  const navToggle = document.getElementById('navToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  
  if (!navToggle || !mobileDrawer) return;

  function toggleDrawer(open) {
    const isOpen = typeof open === 'boolean' ? open : !mobileDrawer.classList.contains('is-open');
    mobileDrawer.classList.toggle('is-open', isOpen);
    navToggle.classList.toggle('is-open', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    mobileDrawer.setAttribute('aria-hidden', String(!isOpen));
  }

  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDrawer();
  });

  // Close when clicking any menu link inside drawer
  mobileDrawer.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      toggleDrawer(false);
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer.classList.contains('is-open')) {
      toggleDrawer(false);
      navToggle.focus();
    }
  });

  // Close when clicking outside drawer content if applicable
  mobileDrawer.addEventListener('click', (e) => {
    if (e.target === mobileDrawer) {
      toggleDrawer(false);
    }
  });
}

/**
 * 2. Sticky Header Elevation on Scroll
 */
function initHeaderScroll() {
  const header = document.querySelector('.site-nav');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * 3. Case Studies Filter Tabs (Clinic Page)
 */
function initCaseFilters() {
  const tabButtons = document.querySelectorAll('.case-tab-btn');
  const caseCards = document.querySelectorAll('.case-card');

  if (!tabButtons.length || !caseCards.length) return;

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter') || 'all';

      caseCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * 4. Expandable Accordions (Courses Curriculum & FAQ)
 */
function initAccordions() {
  const items = document.querySelectorAll('.curriculum-item');
  if (!items.length) return;

  items.forEach((item) => {
    const header = item.querySelector('.curriculum-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('is-active');
      item.classList.toggle('is-active', !isActive);
    });
  });
}

/**
 * 5. Smooth Scroll with Fixed Header Offset
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (!href || href === '#' || href === '#top') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Update URL hash without jump
        if (history.pushState) {
          history.pushState(null, null, href);
        }
      }
    });
  });
}

/**
 * 6. Global Diagnostic Form Handler
 */
window.handleFormSubmit = function(e) {
  e.preventDefault();
  const form = e.target;
  const successBox = document.getElementById('formSuccess');
  
  if (successBox) {
    successBox.style.display = 'block';
  }

  const submitBtn = form.querySelector('button[type="submit"]');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Відправляємо заявку...';
  }

  // Redirect to direct Telegram message after feedback
  setTimeout(() => {
    window.location.href = 'https://t.me/kristina_zhaleyko';
  }, 1600);
};
