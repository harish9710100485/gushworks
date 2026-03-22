/**
 * script.js — Mangalam HDPE Pipes | Gushwork Assignment (Final)
 *
 * Images: Replace each 'img1.jpeg' below with your actual image filename.
 */

'use strict';

/* ── Carousel slides — replace each src with the actual image ── */
const SLIDES = [
  { src: 'images/image1.jpg', alt: 'Workers installing HDPE pipes on site'      },
  { src: 'images/image2.jpg', alt: 'HDPE pipe laying in trench'                  },
  { src: 'images/image3.jpg', alt: 'HDPE pipe manufacturing facility'            },
  { src: 'images/image4.jpg', alt: 'HDPE fittings and accessories'               },
  { src: 'images/image1.jpg', alt: 'Quality control inspection of HDPE pipes'    },
];

/* ── Apply images to all background-image sections ── */
(function applyImages() {

  /* App carousel — 5 cards */
  const appImgs = document.querySelectorAll('.app-slide-img');
  const appSrcs = [
    'images/image1.jpg',
    'images/image2.jpg',
    'images/image3.jpg',
    'images/image4.jpg',
    'images/image1.jpg',
  ];
  appImgs.forEach((el, i) => {
    el.style.backgroundImage    = `url("${appSrcs[i]}")`;
    el.style.backgroundSize     = 'cover';
    el.style.backgroundPosition = 'center';
  });

  /* Process panel images — 8 panels */
  const ppImgs = document.querySelectorAll('.pp-img');
  const ppSrcs = [
    'images/image1.jpg', /* Raw Material  */
    'images/image2.jpg', /* Extrusion     */
    'images/image3.jpg', /* Cooling       */
    'images/image4.jpg', /* Sizing        */
    'images/image1.jpg', /* Quality Ctrl  */
    'images/image2.jpg', /* Marking       */
    'images/image3.jpg', /* Cutting       */
    'images/image4.jpg', /* Packaging     */
  ];
  ppImgs.forEach((el, i) => {
    el.style.backgroundImage    = `url("${ppSrcs[i]}")`;
    el.style.backgroundSize     = 'cover';
    el.style.backgroundPosition = 'center';
  });

  /* Portfolio card images — 3 cards */
  const portImgs = document.querySelectorAll('.port-card-img');
  const portSrcs = [
    'images/image1.jpg', /* HDPE Fittings & Accessories    */
    'images/image2.jpg', /* Professional Installation Svcs */
    'images/image3.jpg', /* PE-RT Heating Pipes            */
  ];
  portImgs.forEach((el, i) => {
    el.style.backgroundImage    = `url("${portSrcs[i]}")`;
    el.style.backgroundSize     = 'cover';
    el.style.backgroundPosition = 'center';
  });

})();


(function initStickyHeader() {
  const bar = document.getElementById('stickyBar');
  if (!bar) return;

  let prevY = window.scrollY;
  // Threshold = height of the primary nav + some buffer
  const mainNav = document.querySelector('.main-header');

  function handleScroll() {
    const y = window.scrollY;
    const navH = mainNav ? mainNav.offsetHeight : 64;
    // Only show sticky after scrolling past the primary nav
    if (y > navH + 40) {
      if (y > prevY) {
        // Scrolling DOWN — show sticky
        bar.classList.add('show');
        bar.removeAttribute('aria-hidden');
      } else {
        // Scrolling UP — hide sticky
        bar.classList.remove('show');
        bar.setAttribute('aria-hidden', 'true');
      }
    } else {
      // Near top — always hide
      bar.classList.remove('show');
      bar.setAttribute('aria-hidden', 'true');
    }
    prevY = y;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  bar.setAttribute('aria-hidden', 'true');
})();

/* ═══════════════════════════════════════════════════════════════
   2. HAMBURGER
═══════════════════════════════════════════════════════════════ */
(function initHamburger() {
  const btn = document.getElementById('hamburger');
  const nav = document.getElementById('mobileNav');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
})();

/*HERO CAROUSEL + ZOOM */
(function initCarousel() {
  const stage    = document.getElementById('carouselStage');
  const mainImg  = document.getElementById('mainImg');
  const strip    = document.getElementById('thumbStrip');
  const btnPrev  = document.getElementById('carrPrev');
  const btnNext  = document.getElementById('carrNext');
  const lens     = document.getElementById('zoomLens');
  const panel    = document.getElementById('zoomPanel');
  const canvas   = document.getElementById('zoomCanvas');
  if (!stage || !mainImg) return;

  let current = 0;
  let autoTimer = null;
  let offImg = new Image();

  /* Build thumbnails */
  SLIDES.forEach((slide, i) => {
    const wrap = document.createElement('div');
    wrap.className = 'thumb-item' + (i === 0 ? ' active' : '');
    wrap.setAttribute('role', 'listitem');
    wrap.setAttribute('tabindex', '0');
    wrap.setAttribute('aria-label', slide.alt);
    const img = document.createElement('img');
    img.src = slide.src;
    img.alt = slide.alt;
    wrap.appendChild(img);
    wrap.addEventListener('click', () => goTo(i));
    wrap.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goTo(i); } });
    strip.appendChild(wrap);
  });

  function loadSlide(n) {
    mainImg.src = SLIDES[n].src;
    mainImg.alt = SLIDES[n].alt;
    offImg = new Image();
    offImg.src = SLIDES[n].src;
  }

  function goTo(idx) {
    const n = ((idx % SLIDES.length) + SLIDES.length) % SLIDES.length;
    const thumbs = strip.querySelectorAll('.thumb-item');
    thumbs[current].classList.remove('active');
    thumbs[n].classList.add('active');

    /* Scroll thumbnail strip horizontally (no page scroll) */
    const th = thumbs[n];
    strip.scrollTo({ left: th.offsetLeft - strip.offsetWidth / 2 + th.offsetWidth / 2, behavior: 'smooth' });

    mainImg.style.opacity = '0';
    setTimeout(() => { loadSlide(n); mainImg.style.opacity = '1'; }, 160);
    current = n;
  }

  loadSlide(0);

  btnPrev && btnPrev.addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });
  btnNext && btnNext.addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });

  /* Keyboard */
  stage.setAttribute('tabindex', '0');
  stage.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  { stopAuto(); goTo(current - 1); startAuto(); }
    if (e.key === 'ArrowRight') { stopAuto(); goTo(current + 1); startAuto(); }
  });

  /* Touch swipe */
  let txStart = 0;
  stage.addEventListener('touchstart', e => { txStart = e.changedTouches[0].clientX; }, { passive: true });
  stage.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - txStart;
    if (Math.abs(dx) > 40) { stopAuto(); goTo(current + (dx < 0 ? 1 : -1)); startAuto(); }
  }, { passive: true });

  /* Auto-play */
  function startAuto() { stopAuto(); autoTimer = setInterval(() => goTo(current + 1), 4500); }
  function stopAuto()  { clearInterval(autoTimer); autoTimer = null; }
  startAuto();
  stage.addEventListener('mouseenter', stopAuto);
  stage.addEventListener('mouseleave', startAuto);

  /* ── ZOOM ── */
  if (!canvas || !panel) return;
  const ctx = canvas.getContext('2d');
  const ZOOM = 2.5, LENS_R = 50;

  function sizeCanvas() {
    canvas.width  = panel.offsetWidth  || 260;
    canvas.height = panel.offsetHeight || 260;
  }
  sizeCanvas();
  window.addEventListener('resize', sizeCanvas, { passive: true });

  stage.addEventListener('mousemove', onMove);
  stage.addEventListener('mouseleave', onLeave);

  function onMove(e) {
    const r  = stage.getBoundingClientRect();
    const mx = e.clientX - r.left;
    const my = e.clientY - r.top;
    const cx = Math.max(LENS_R, Math.min(r.width  - LENS_R, mx));
    const cy = Math.max(LENS_R, Math.min(r.height - LENS_R, my));

    lens.style.left = cx + 'px';
    lens.style.top  = cy + 'px';
    panel.classList.add('show');

    if (!offImg.complete || !offImg.naturalWidth) return;
    const nw = offImg.naturalWidth, nh = offImg.naturalHeight;
    const cw = canvas.width, ch = canvas.height;
    const srcW = (LENS_R * 2) / ZOOM * (nw / r.width);
    const srcH = (LENS_R * 2) / ZOOM * (nh / r.height);
    const srcX = (cx / r.width)  * nw - srcW / 2;
    const srcY = (cy / r.height) * nh - srcH / 2;
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(offImg, srcX, srcY, srcW, srcH, 0, 0, cw, ch);
  }

  function onLeave() { panel.classList.remove('show'); }
})();

/* APPLICATIONS CAROUSEL*/
(function initAppsCarousel() {
  const track = document.getElementById('appsTrack');
  const prev  = document.getElementById('appsPrev');
  const next  = document.getElementById('appsNext');
  if (!track || !prev || !next) return;

  let offset = 0;

  function cardW() {
    const c = track.querySelector('.app-slide-card');
    return c ? c.offsetWidth + 16 : 280;
  }
  function maxOff() {
    return Math.max(0, track.scrollWidth - (track.parentElement.offsetWidth || window.innerWidth));
  }

  next.addEventListener('click', () => {
    offset = Math.min(offset + cardW(), maxOff());
    track.style.transform = `translateX(-${offset}px)`;
  });
  prev.addEventListener('click', () => {
    offset = Math.max(0, offset - cardW());
    track.style.transform = `translateX(-${offset}px)`;
  });

  window.addEventListener('resize', () => { offset = 0; track.style.transform = 'none'; }, { passive: true });

  /* Touch */
  let tx = 0;
  track.parentElement.addEventListener('touchstart', e => { tx = e.changedTouches[0].clientX; }, { passive: true });
  track.parentElement.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 40) {
      offset = dx < 0 ? Math.min(offset + cardW(), maxOff()) : Math.max(0, offset - cardW());
      track.style.transform = `translateX(-${offset}px)`;
    }
  }, { passive: true });
})();

/* PROCESS TABS*/
(function initTabs() {
  const tabsEl = document.getElementById('processTabs');
  if (!tabsEl) return;

  const tabs   = tabsEl.querySelectorAll('.ptab');
  const panels = document.querySelectorAll('.process-panel-box .process-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected','false'); });
      panels.forEach(p => { p.hidden = true; });

      tab.classList.add('active');
      tab.setAttribute('aria-selected','true');

      const target = document.getElementById(tab.dataset.panel);
      if (target) target.hidden = false;

      /* Horizontal scroll pill into view (no page scroll) */
      const scrollLeft = tab.offsetLeft - tabsEl.offsetWidth / 2 + tab.offsetWidth / 2;
      tabsEl.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    });
  });
})();

/* FAQ ACCORDION*/
(function initAccordion() {
  const acc = document.getElementById('accordion');
  if (!acc) return;

  const items = acc.querySelectorAll('.acc-item');

  items.forEach(item => {
    const trigger = item.querySelector('.acc-trigger');
    const body    = item.querySelector('.acc-body');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');

      /* Close all */
      items.forEach(i => {
        i.classList.remove('open');
        const b = i.querySelector('.acc-body');
        const t = i.querySelector('.acc-trigger');
        const ic = i.querySelector('.acc-icon');
        if (b)  b.hidden = true;
        if (t)  t.setAttribute('aria-expanded','false');
        /* Reset chevron to down */
        if (ic) { ic.innerHTML = '<path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>'; ic.classList.add('down'); }
      });

      if (!wasOpen) {
        item.classList.add('open');
        if (body) body.hidden = false;
        trigger.setAttribute('aria-expanded','true');
        const ic = trigger.querySelector('.acc-icon');
        if (ic) { ic.innerHTML = '<path d="M4 10l4-4 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>'; ic.classList.remove('down'); }
      }
    });
  });
})();

/* SCROLL REVEAL*/
(function initReveal() {
  if (!window.IntersectionObserver) return;
  const els = document.querySelectorAll('.reveal');
  els.forEach((el, i) => { el.style.transitionDelay = `${(i % 4) * 80}ms`; });
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  els.forEach(el => obs.observe(el));
})();

/* CATALOGUE FORM*/
(function initCatalogueForm() {
  const inp = document.getElementById('catEmailInput');
  const btn = document.getElementById('catSubmitBtn');
  if (!inp || !btn) return;

  const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  btn.addEventListener('click', () => {
    inp.classList.remove('err');
    if (!isEmail(inp.value)) {
      inp.classList.add('err');
      inp.focus();
      setTimeout(() => inp.classList.remove('err'), 2500);
      return;
    }
    const orig = btn.textContent;
    btn.textContent = '✓ Sent!';
    btn.style.background = '#059669';
    btn.disabled = true;
    inp.value = '';
    setTimeout(() => { btn.textContent = orig; btn.style.background = ''; btn.disabled = false; }, 3000);
  });
})();

/* CONTACT FORM*/
(function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll('[required]').forEach(f => {
      f.classList.remove('err');
      if (!f.value.trim()) { f.classList.add('err'); valid = false; }
    });
    if (!valid) return;

    const btn = form.querySelector('.btn-submit');
    const orig = btn.textContent;
    btn.textContent = '✓ Quote Requested!';
    btn.style.background = '#059669';
    btn.disabled = true;
    form.reset();
    setTimeout(() => { btn.textContent = orig; btn.style.background = ''; btn.disabled = false; }, 3500);
  });

  form.querySelectorAll('.form-inp').forEach(f => f.addEventListener('input', () => f.classList.remove('err')));
})();

/* DATASHEET BUTTON FEEDBACK*/
(function initDatasheet() {
  const btn = document.getElementById('dlDatasheet');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const orig = btn.innerHTML;
    btn.textContent = '✓ Preparing download…';
    btn.style.borderColor = 'rgba(255,255,255,.8)';
    setTimeout(() => { btn.innerHTML = orig; btn.style.borderColor = ''; }, 2500);
  });
})();