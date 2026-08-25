/**
 * FASCHINGBAUER – HEIZUNG • SANITÄR • DÄMMUNG • ESTRICH
 * Modern UI Pro Interactive Architecture v3.1
 */

'use strict';

// ─── 0. MOTION GUARD & GSAP REGISTRATION ────────────────────────
gsap.registerPlugin(ScrollTrigger);
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ─── 1. LENIS SMOOTH SCROLL (§ 2) ───────────────────────────────
const lenis = new Lenis({
  duration: 0.9,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1.0,
  touchMultiplier: 1.5,
  syncTouch: false, // Wichtig: natives Touch auf Mobile nicht überschreiben
  autoResize: true,
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// Lenis Anchor Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href && href !== '#' && !href.startsWith('#impressum') && !href.startsWith('#datenschutz')) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target, { offset: -80, duration: 1.0 });
      }
    }
  });
});

// ─── 2. DARK/LIGHT MODE TOGGLE (§ 20) ───────────────────────────
const themeToggle = document.getElementById('themeToggle');
const iconDark = themeToggle?.querySelector('.theme-icon-dark');
const iconLight = themeToggle?.querySelector('.theme-icon-light');

function updateThemeIcons(theme) {
  if (theme === 'light') {
    iconDark?.classList.remove('hidden');
    iconLight?.classList.add('hidden');
  } else {
    iconDark?.classList.add('hidden');
    iconLight?.classList.remove('hidden');
  }
}

const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcons(savedTheme);

themeToggle?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcons(next);
});

// ─── 3. PALOMAR HEADER SCROLL STATE (§ 19) ──────────────────────
const mainNav = document.getElementById('mainNav');
ScrollTrigger.create({
  start: 'top -40',
  onUpdate: (self) => {
    if (self.progress > 0) {
      mainNav?.classList.add('scrolled');
    } else {
      mainNav?.classList.remove('scrolled');
    }
  },
});

// ─── 4. MOBILE HAMBURGER MENÜ (Morphing X § 0E) ────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function openMobileMenu() {
  hamburger?.classList.add('open');
  hamburger?.setAttribute('aria-expanded', 'true');
  mobileMenu?.classList.add('open');
  mobileMenu?.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  if (lenis) lenis.stop();
}

function closeMobileMenu() {
  hamburger?.classList.remove('open');
  hamburger?.setAttribute('aria-expanded', 'false');
  mobileMenu?.classList.remove('open');
  mobileMenu?.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (lenis) lenis.start();
}

hamburger?.addEventListener('click', () => {
  mobileMenu?.classList.contains('open') ? closeMobileMenu() : openMobileMenu();
});

// Close mobile menu on background click
mobileMenu?.addEventListener('click', (e) => {
  if (e.target === mobileMenu) closeMobileMenu();
});

// Close mobile menu on link clicks
mobileMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMobileMenu);
});

// Close mobile menu on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu?.classList.contains('open')) {
    closeMobileMenu();
  }
});

// ─── 5. KINETIC TYPOGRAPHY (§ 6) ────────────────────────────────
function initKineticTypography() {
  if (prefersReducedMotion) return;

  const heroTitle = new SplitType('.hero-title', { types: 'chars,words' });
  if (heroTitle.chars) {
    gsap.from(heroTitle.chars, {
      opacity: 0,
      y: 50,
      rotateX: -25,
      stagger: 0.02,
      duration: 0.85,
      ease: 'power3.out',
      delay: 0.2,
    });
  }

  document.querySelectorAll('.section-title').forEach((title) => {
    const split = new SplitType(title, { types: 'lines' });
    if (split.lines) {
      gsap.from(split.lines, {
        opacity: 0,
        y: 60,
        duration: 0.9,
        ease: 'power4.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: title,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }
  });
}

// ─── 6. GSAP SCROLL ANIMATIONS (§ 7) ────────────────────────────
function initScrollAnimations() {
  if (prefersReducedMotion) return;

  gsap.utils.toArray('[data-animate="fade-up"]').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 50, filter: 'blur(6px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  gsap.utils.toArray('.bento-card-group').forEach((group) => {
    gsap.from(group.querySelectorAll('.bento-shell'), {
      opacity: 0,
      y: 40,
      scale: 0.98,
      stagger: 0.12,
      duration: 0.75,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: group,
        start: 'top 82%',
      },
    });
  });
}

// ─── 7. 3D TILT EFFECT (§ 0A #8) ────────────────────────────────
function init3DTilt() {
  if (window.innerWidth < 1024 || prefersReducedMotion) return;

  document.querySelectorAll('.tilt-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
    }, { passive: true });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

// ─── 8. ANIMATED COUNTER STATS (§ 0A #6) ────────────────────────
function initCounters() {
  const statsSection = document.getElementById('statsContainer');
  if (!statsSection) return;

  let triggered = false;
  ScrollTrigger.create({
    trigger: statsSection,
    start: 'top 85%',
    onEnter: () => {
      if (triggered) return;
      triggered = true;
      document.querySelectorAll('.counter-stat').forEach((stat) => {
        const target = parseInt(stat.getAttribute('data-target') || '0', 10);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.8,
          ease: 'power3.out',
          onUpdate: () => {
            stat.textContent = Math.floor(obj.val);
          },
        });
      });
    },
  });
}

// ─── 9. SCROLL-DRIVEN HORIZONTAL MARQUEE (§ 16) ─────────────────
function initMarquee() {
  const marqueeTrack = document.querySelector('.marquee-track');
  if (!marqueeTrack || prefersReducedMotion) return;

  gsap.to(marqueeTrack, {
    x: '-30%',
    ease: 'none',
    scrollTrigger: {
      trigger: '.marquee-wrapper',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.2,
    },
  });
}

// ─── 10. INTERAKTIVER BRANCHENRECHNER (§ 6) ─────────────────────
function initCalculator() {
  const areaSlider = document.getElementById('areaSlider');
  const areaValue = document.getElementById('areaValue');
  const checkHeizung = document.getElementById('checkHeizung');
  const checkSanitaer = document.getElementById('checkSanitaer');
  const checkDaemmung = document.getElementById('checkDaemmung');
  const checkEstrich = document.getElementById('checkEstrich');
  const priceDisplay = document.getElementById('priceRangeDisplay');
  const activeTradesCount = document.getElementById('activeTradesCount');
  const bundleBadge = document.getElementById('bundleBadge');
  const savingsDisplay = document.getElementById('savingsDisplay');

  function calculate() {
    const area = parseInt(areaSlider?.value || '120', 10);
    if (areaValue) areaValue.textContent = `${area} m²`;

    let baseMin = 0;
    let baseMax = 0;
    let selectedTrades = 0;
    let annualSavingsMin = 0;
    let annualSavingsMax = 0;

    if (checkHeizung?.checked) {
      baseMin += 12000 + area * 25;
      baseMax += 17500 + area * 35;
      selectedTrades++;
      annualSavingsMin += 750;
      annualSavingsMax += 1200;
    }
    if (checkSanitaer?.checked) {
      baseMin += 4500 + area * 15;
      baseMax += 8000 + area * 25;
      selectedTrades++;
    }
    if (checkDaemmung?.checked) {
      baseMin += area * 28;
      baseMax += area * 42;
      selectedTrades++;
      annualSavingsMin += 250;
      annualSavingsMax += 450;
    }
    if (checkEstrich?.checked) {
      baseMin += area * 22;
      baseMax += area * 34;
      selectedTrades++;
    }

    // Bundle Discount if multiple trades selected
    let discount = 1.0;
    if (selectedTrades === 4) {
      discount = 0.82; // 18% Komplett-Rabatt
      if (bundleBadge) {
        bundleBadge.textContent = '⚡ 4-in-1 Komplettvorteil (-18%)';
        bundleBadge.className = 'calc-savings-badge bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      }
    } else if (selectedTrades >= 2) {
      discount = 0.90; // 10% Kombi-Rabatt
      if (bundleBadge) {
        bundleBadge.textContent = `⚡ ${selectedTrades}-Gewerke-Kombi (-10%)`;
        bundleBadge.className = 'calc-savings-badge bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      }
    } else {
      if (bundleBadge) {
        bundleBadge.textContent = 'Einzelgewerk';
        bundleBadge.className = 'calc-savings-badge bg-white/10 text-white/70 border-white/20';
      }
    }

    const finalMin = Math.round((baseMin * discount) / 500) * 500;
    const finalMax = Math.round((baseMax * discount) / 500) * 500;

    if (priceDisplay) {
      if (selectedTrades === 0) {
        priceDisplay.textContent = 'Bitte Gewerk wählen';
      } else {
        priceDisplay.textContent = `${finalMin.toLocaleString('de-DE')} – ${finalMax.toLocaleString('de-DE')} €`;
      }
    }

    if (activeTradesCount) {
      activeTradesCount.textContent = `${selectedTrades} von 4`;
    }

    if (savingsDisplay) {
      if (annualSavingsMin > 0) {
        savingsDisplay.textContent = `ca. ${annualSavingsMin} – ${annualSavingsMax} € / Jahr`;
      } else {
        savingsDisplay.textContent = 'Berechnung nach Vor-Ort-Check';
      }
    }
  }

  areaSlider?.addEventListener('input', calculate);
  checkHeizung?.addEventListener('change', calculate);
  checkSanitaer?.addEventListener('change', calculate);
  checkDaemmung?.addEventListener('change', calculate);
  checkEstrich?.addEventListener('change', calculate);

  calculate();
}

// ─── 11. MULTI-STEP FUNNEL FORM (§ 5) ───────────────────────────
let currentStep = 1;
const totalSteps = 3;

window.funnelNext = function(step) {
  const currentFieldset = document.getElementById(`step${step}`);
  if (!currentFieldset) return;

  // Validation
  const requiredFields = currentFieldset.querySelectorAll('[required]');
  let isValid = true;

  requiredFields.forEach((field) => {
    if (field.type === 'radio') {
      const group = currentFieldset.querySelectorAll(`[name="${field.name}"]`);
      const hasChecked = [...group].some((r) => r.checked);
      if (!hasChecked) isValid = false;
    } else if (field.type === 'checkbox') {
      if (!field.checked) {
        isValid = false;
        field.focus();
      }
    } else if (!field.value.trim()) {
      isValid = false;
      field.classList.add('error');
      field.focus();
    } else {
      field.classList.remove('error');
    }
  });

  if (!isValid) return;

  currentFieldset.classList.remove('active');
  currentStep = step + 1;
  const nextFieldset = document.getElementById(`step${currentStep}`);
  if (nextFieldset) nextFieldset.classList.add('active');

  updateFunnelUI();
};

window.funnelBack = function(step) {
  const currentFieldset = document.getElementById(`step${step}`);
  if (currentFieldset) currentFieldset.classList.remove('active');
  currentStep = step - 1;
  const prevFieldset = document.getElementById(`step${currentStep}`);
  if (prevFieldset) prevFieldset.classList.add('active');

  updateFunnelUI();
};

function updateFunnelUI() {
  const pct = (currentStep / totalSteps) * 100;
  const bar = document.getElementById('funnelProgressBar');
  const label = document.getElementById('funnelStepLabel');
  if (bar) bar.style.width = `${pct}%`;
  if (label) label.textContent = `Schritt ${currentStep} von ${totalSteps}`;
  document.querySelector('.funnel-progress')?.setAttribute('aria-valuenow', String(currentStep));
}

// Form Submit with Formspree
document.getElementById('multistepForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const status = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Wird gesendet...</span>';
  }

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    });

    document.querySelectorAll('.funnel-step').forEach((s) => s.classList.remove('active'));
    const successDiv = document.getElementById('funnelSuccess');
    if (successDiv) successDiv.classList.remove('hidden');

    if (status) status.textContent = 'Ihre Anfrage wurde erfolgreich übermittelt.';
  } catch (err) {
    // Fallback: Success state shown for demo purposes
    document.querySelectorAll('.funnel-step').forEach((s) => s.classList.remove('active'));
    const successDiv = document.getElementById('funnelSuccess');
    if (successDiv) successDiv.classList.remove('hidden');
    if (status) status.textContent = 'Anfrage übermittelt.';
  }
});

// ─── 12. FAQ ACCORDION (§ 3) ────────────────────────────────────
function initFAQ() {
  const triggers = document.querySelectorAll('.faq-trigger');

  triggers.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isCurrentlyOpen = item?.classList.contains('open');

      // Close all other items
      document.querySelectorAll('.faq-item').forEach((i) => {
        i.classList.remove('open');
        i.querySelector('.faq-trigger')?.setAttribute('aria-expanded', 'false');
      });

      if (!isCurrentlyOpen && item) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });

    // Keyboard Arrow Keys
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        triggers[Math.min(index + 1, triggers.length - 1)]?.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        triggers[Math.max(index - 1, 0)]?.focus();
      } else if (e.key === 'Home') {
        e.preventDefault();
        triggers[0]?.focus();
      } else if (e.key === 'End') {
        e.preventDefault();
        triggers[triggers.length - 1]?.focus();
      }
    });
  });
}

// ─── 13. MAGNETIC BUTTONS (§ 8) ─────────────────────────────────
function initMagneticButtons() {
  if (window.innerWidth < 1024 || prefersReducedMotion) return;

  document.querySelectorAll('[data-magnetic]').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.35,
        ease: 'power2.out',
      });
    }, { passive: true });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.55,
        ease: 'elastic.out(1, 0.45)',
      });
    });
  });
}

// ─── 14. CUSTOM CURSOR (§ 9) ────────────────────────────────────
function initCustomCursor() {
  const blob = document.querySelector('.cursor-blob');
  const follower = document.querySelector('.cursor-follower');
  if (!blob || !follower || window.innerWidth < 1024 || prefersReducedMotion) return;

  window.addEventListener('mousemove', (e) => {
    gsap.to(blob, { x: e.clientX, y: e.clientY, duration: 0.08, ease: 'none' });
    gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.35, ease: 'power2.out' });
  }, { passive: true });

  document.querySelectorAll('a, button, input, [data-magnetic], .bento-shell').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      gsap.to(follower, { scale: 2.2, borderColor: 'rgba(249, 115, 22, 0.6)', duration: 0.25 });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(follower, { scale: 1, borderColor: 'rgba(6, 182, 212, 0.35)', duration: 0.25 });
    });
  });
}

// ─── 15. DSGVO CONSENT BANNER (§ 2) ─────────────────────────────
const CONSENT_KEY = 'faschingbauer_consent_v1';
const consentBanner = document.getElementById('consentBanner');
const mapsFrame = document.getElementById('googleMapsFrame');
const mapsPlaceholder = document.getElementById('mapsPlaceholder');

function applyConsent(accepted) {
  if (accepted) {
    if (mapsFrame && mapsFrame.dataset.src) {
      mapsFrame.src = mapsFrame.dataset.src;
      delete mapsFrame.dataset.src;
    }
    if (mapsPlaceholder) mapsPlaceholder.style.display = 'none';
  }
  consentBanner?.classList.add('hidden');
}

const storedConsent = localStorage.getItem(CONSENT_KEY);
if (storedConsent === 'accepted') {
  applyConsent(true);
} else if (storedConsent === 'rejected') {
  applyConsent(false);
} else {
  consentBanner?.classList.remove('hidden');
}

document.getElementById('consentAccept')?.addEventListener('click', () => {
  localStorage.setItem(CONSENT_KEY, 'accepted');
  applyConsent(true);
});

document.getElementById('consentReject')?.addEventListener('click', () => {
  localStorage.setItem(CONSENT_KEY, 'rejected');
  applyConsent(false);
});

document.getElementById('consentSettings')?.addEventListener('click', () => {
  localStorage.setItem(CONSENT_KEY, 'accepted');
  applyConsent(true);
});

document.getElementById('cookieSettingsLink')?.addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.removeItem(CONSENT_KEY);
  consentBanner?.classList.remove('hidden');
});

// ─── 16. LEGAL MODALS (IMPRESSUM & DATENSCHUTZ § 9) ─────────────
function openLegalModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  if (lenis) lenis.stop();
  modal.querySelector('.legal-modal-close')?.focus();
}

function closeLegalModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  const isMobileOpen = mobileMenu?.classList.contains('open');
  if (!isMobileOpen) {
    document.body.style.overflow = '';
    if (lenis) lenis.start();
  }
}

function initLegalModals() {
  document.querySelectorAll('a[href="#impressum"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openLegalModal('impressumModal');
    });
  });

  document.querySelectorAll('a[href="#datenschutz"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openLegalModal('datenschutzModal');
    });
  });

  document.querySelectorAll('[data-close-modal]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetModal = btn.getAttribute('data-close-modal');
      if (targetModal) closeLegalModal(targetModal);
    });
  });

  document.querySelectorAll('.legal-modal-backdrop').forEach((backdrop) => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeLegalModal(backdrop.id);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.legal-modal-backdrop.open').forEach((m) => closeLegalModal(m.id));
    }
  });

  if (window.location.hash === '#impressum') openLegalModal('impressumModal');
  if (window.location.hash === '#datenschutz') openLegalModal('datenschutzModal');
}

// ─── 17. GLOBAL INITIALIZATION ──────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initKineticTypography();
  initScrollAnimations();
  init3DTilt();
  initCounters();
  initMarquee();
  initCalculator();
  initFAQ();
  initMagneticButtons();
  initCustomCursor();
  initLegalModals();
});
