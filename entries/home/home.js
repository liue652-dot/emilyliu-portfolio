(function () {
  'use strict';

  const track     = document.getElementById('track');
  const outer     = document.getElementById('scrollOuter');
  const siteTitle = document.querySelector('.site-title');
  const siteSub   = document.querySelector('.site-sub');
  const cards     = Array.from(track ? track.querySelectorAll('.card') : []);

  const isMobile = () => window.innerWidth <= 600;

  /* ─────────────────────────────────
     PAGE TRANSITION OVERLAY
  ───────────────────────────────── */

  function createOverlay() {
    const el = document.createElement('div');
    el.style.cssText = `
      position: fixed;
      inset: 0;
      background: #fff;
      z-index: 9999;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    `;
    document.body.appendChild(el);
    return el;
  }

  function fadeOut(dest) {
    const overlay = createOverlay();
    overlay.getBoundingClientRect();
    overlay.style.pointerEvents = 'all';
    overlay.style.opacity = '1';
    setTimeout(() => { window.location.href = dest; }, 370);
  }

  function fadeIn() {
    const overlay = createOverlay();
    overlay.style.opacity = '1';
    overlay.style.transition = 'none';
    overlay.getBoundingClientRect();
    overlay.style.transition = 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    overlay.style.opacity = '0';
    overlay.addEventListener('transitionend', () => overlay.remove(), { once: true });
  }

  fadeIn();

  /* ─────────────────────────────────
     STICKY CARD TITLES
  ───────────────────────────────── */

  function initStickyTitles() {
    if (!cards.length || !outer) return;
    if (isMobile()) return; // titles are visible via CSS on mobile

    if (siteTitle) {
      siteTitle.addEventListener('mouseenter', () => {
        siteTitle.style.transition = 'color 0.2s ease, filter 0.2s ease';
        siteTitle.style.color      = '#cc0000';
        siteTitle.style.filter     = 'blur(2px)';
      });

      siteTitle.addEventListener('mouseleave', () => {
        siteTitle.style.color  = '';
        siteTitle.style.filter = '';
      });
    }

    const floaters = cards.map(card => {
      const original = card.querySelector('.card__title');
      if (!original) return null;

      const floater = document.createElement('div');
      floater.innerHTML = original.innerHTML;
      floater.style.cssText = `
        position: fixed;
        pointer-events: none;
        z-index: 500;
        font-family: 'Barlow Condensed', 'Arial Narrow', Arial, sans-serif;
        font-weight: 800;
        font-size: clamp(12px, 1.05vw, 16px);
        letter-spacing: 0.01em;
        line-height: 1.25;
        color: #000;
        opacity: 0;
        transition: opacity 0.2s ease, color 0.2s ease, filter 0.2s ease;
        white-space: nowrap;
      `;
      document.body.appendChild(floater);
      return { floater, card };
    }).filter(Boolean);

    floaters.forEach(({ floater, card }) => {
      card.addEventListener('mouseenter', () => {
        floaters.forEach(f => {
          if (f && f.card !== card) {
            f.floater.style.opacity = '0.2';
            f.floater.style.color   = '#cc0000';
            f.floater.style.filter  = 'blur(2px)';
          }
        });
      });

      card.addEventListener('mouseleave', () => {
        floaters.forEach(f => {
          if (f) {
            f.floater.style.opacity = '';
            f.floater.style.color   = '';
            f.floater.style.filter  = '';
          }
        });
      });
    });

    let lastScrollLeft = outer.scrollLeft;

    function update() {
      const outerRect     = outer.getBoundingClientRect();
      const currentScroll = outer.scrollLeft;
      const scrollingLeft = currentScroll < lastScrollLeft;
      lastScrollLeft      = currentScroll;

      floaters.forEach(({ floater, card }) => {
        const imgWrap = card.querySelector('.card__img-wrap');
        if (!imgWrap) return;

        const imgRect  = imgWrap.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();

        const titleH = floater.offsetHeight;
        const titleY = imgRect.top - titleH - 10;

        let titleX;
        if (scrollingLeft) {
          titleX = cardRect.left;
        } else {
          titleX = Math.max(outerRect.left, cardRect.left);
        }

        const fullyGoneLeft  = imgRect.right < outerRect.left;
        const fullyGoneRight = imgRect.left > outerRect.right;
        const isVisible = !fullyGoneLeft && !fullyGoneRight;

        floater.style.left    = titleX + 'px';
        floater.style.top     = titleY + 'px';
        floater.style.opacity = isVisible ? '1' : '0';
      });
    }

    outer.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    window._updateStickyTitles = update;
  }

  initStickyTitles();

  /* ─────────────────────────────────
     INCOMING TITLE TRANSITION
  ───────────────────────────────── */
  (function () {
    const raw = sessionStorage.getItem('titleFromSmallRect');
    if (!raw) return;
    sessionStorage.removeItem('titleFromSmallRect');
    window._comingFromWork = true;

    const from = JSON.parse(raw);
    if (!siteTitle) return;

    requestAnimationFrame(() => {
      const to         = siteTitle.getBoundingClientRect();
      const toFontSize = parseFloat(getComputedStyle(siteTitle).fontSize);

      const scale = from.fontSize / toFontSize;
      const dx    = (from.left + from.width  / 2) - (to.left + to.width  / 2);
      const dy    = (from.top  + from.height / 2) - (to.top  + to.height / 2);

      siteTitle.style.transition      = 'none';
      siteTitle.style.transformOrigin = 'center center';
      siteTitle.style.transform       = `translate(${dx}px, ${dy}px) scale(${scale})`;
      siteTitle.style.opacity         = '1';

      if (siteSub) {
        siteSub.style.opacity    = '0';
        siteSub.style.transition = 'none';
      }

      siteTitle.getBoundingClientRect();

      siteTitle.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      siteTitle.style.transform  = 'translate(0, 0) scale(1)';

      setTimeout(() => {
        if (siteSub) {
          siteSub.style.transition = 'opacity 0.4s ease';
          siteSub.style.opacity    = '1';
        }
      }, 450);

      siteTitle.addEventListener('transitionend', () => {
        siteTitle.style.transition      = '';
        siteTitle.style.transform       = '';
        siteTitle.style.transformOrigin = '';
      }, { once: true });
    });
  })();

  /* ─────────────────────────────────
     INTRO ANIMATION
  ───────────────────────────────── */

  function runIntro() {
    if (window._comingFromWork) return;
    if (!track || !siteTitle || cards.length === 0) return;
    if (isMobile()) return; // skip complex intro on mobile

    siteSub.style.opacity      = '0';
    siteSub.style.transition   = 'none';
    siteTitle.style.transition = 'none';
    siteTitle.style.opacity    = '0';

    siteTitle.style.fontSize = 'clamp(64px, 10vw, 130px)';
    document.body.getBoundingClientRect();

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const finalRects = cards.map(card => {
      const r = card.getBoundingClientRect();
      return { x: r.left, y: r.top, w: r.width, h: r.height };
    });

    outer.style.overflow = 'hidden';

    cards.forEach((card, i) => {
      const fr = finalRects[i];
      card.style.position        = 'fixed';
      card.style.left            = fr.x + 'px';
      card.style.top             = fr.y + 'px';
      card.style.width           = fr.w + 'px';
      card.style.margin          = '0';
      card.style.zIndex          = String(100 + i);
      card.style.transition      = 'none';
      card.style.transformOrigin = 'center center';
    });

    siteTitle.style.fontSize = '18px';
    document.body.getBoundingClientRect();

    const cx = vw / 2;
    const cy = vh / 2;

    requestAnimationFrame(() => requestAnimationFrame(() => {

      cards.forEach((card, i) => {
        const fr    = finalRects[i];
        const angle = (Math.random() - 0.5) * 28;
        const ox    = (Math.random() - 0.5) * 50;
        const oy    = (Math.random() - 0.5) * 36;
        card.style.transition = `left 0.6s cubic-bezier(0.4,0,0.2,1),
                                  top  0.6s cubic-bezier(0.4,0,0.2,1),
                                  transform 0.6s cubic-bezier(0.4,0,0.2,1)`;
        card.style.left      = (cx - fr.w / 2 + ox) + 'px';
        card.style.top       = (cy - fr.h / 2 + oy) + 'px';
        card.style.transform = `rotate(${angle}deg) scale(0.78)`;
        card.style.zIndex    = String(100 + Math.floor(Math.random() * cards.length));
      });

      setTimeout(() => {
        siteTitle.style.transition = 'opacity 0.5s ease';
        siteTitle.style.opacity    = '1';
      }, 300);

      setTimeout(() => {

        siteTitle.style.transition = 'font-size 0.8s cubic-bezier(0.4,0,0.2,1)';
        siteTitle.style.fontSize   = 'clamp(64px, 10vw, 130px)';

        setTimeout(() => {
          siteSub.style.transition = 'opacity 0.5s ease';
          siteSub.style.opacity    = '1';
        }, 300);

        outer.style.overflow = '';

        cards.forEach((card, i) => {
          const fr = finalRects[i];
          setTimeout(() => {
            card.style.transition = `left 0.65s cubic-bezier(0.4,0,0.2,1),
                                      top  0.65s cubic-bezier(0.4,0,0.2,1),
                                      transform 0.65s cubic-bezier(0.4,0,0.2,1)`;
            card.style.left      = fr.x + 'px';
            card.style.top       = fr.y + 'px';
            card.style.transform = 'rotate(0deg) scale(1)';
          }, i * 55);
        });

        const lastDone = cards.length * 55 + 700;
        setTimeout(() => {
          cards.forEach(card => { card.style.visibility = 'hidden'; });

          requestAnimationFrame(() => {
            cards.forEach(card => {
              card.style.position   = '';
              card.style.left       = '';
              card.style.top        = '';
              card.style.width      = '';
              card.style.margin     = '';
              card.style.transform  = '';
              card.style.transition = 'none';
              card.style.zIndex     = '';
              card.style.visibility = '';
            });

            siteTitle.style.transition = '';
            siteTitle.style.fontSize   = '';

            if (window._updateStickyTitles) window._updateStickyTitles();
          });
        }, lastDone);

      }, 480);

    }));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runIntro);
  } else {
    setTimeout(runIntro, 50);
  }

  /* ─────────────────────────────────
     DETAIL PAGE
  ───────────────────────────────── */
  function initDetailPage() {
    const detailPage    = document.getElementById('detailPage');
    const detailTitle   = document.getElementById('detailBarTitle');
    const detailContent = document.getElementById('detailContent');
    const detailDesc    = document.getElementById('detailDesc');
    const closeBtn      = document.getElementById('detailCloseBtn');
    const descBtn       = document.getElementById('detailDescBtn');
    const prevBtn       = document.getElementById('detailPrev');
    const nextBtn       = document.getElementById('detailNext');
    const prevThumb     = document.getElementById('prevThumb');
    const nextThumb     = document.getElementById('nextThumb');
    const prevLabel     = document.getElementById('detailPrevLabel');
    const nextLabel     = document.getElementById('detailNextLabel');
    const dotsContainer = document.getElementById('detailDots');

    if (!detailPage) return;

    let currentCardIndex  = 0;
    let currentImageIndex = 0;
    let currentImages     = [];

    function isVideo(src) {
      return /\.(mp4|webm|ogg|mov)$/i.test(src);
    }

    function makeMedia(src, opts = {}) {
      if (isVideo(src)) {
        const v = document.createElement('video');
        v.src         = src;
        v.muted       = true;
        v.playsInline = true;
        v.preload     = opts.thumb ? 'metadata' : 'auto';
        if (!opts.thumb) {
          v.autoplay = true;
          v.loop     = true;
        }
        return v;
      } else {
        const img = document.createElement('img');
        img.src = src;
        img.alt = '';
        return img;
      }
    }

    function buildDots(count) {
      dotsContainer.innerHTML = '';
      return Array.from({ length: count }, (_, i) => {
        const dot = document.createElement('button');
        dot.className = 'detail-dot';
        dot.addEventListener('click', () => showImage(i));
        dotsContainer.appendChild(dot);
        return dot;
      });
    }

    let dots = [];

    function getCardImages(card) {
      const raw = card.getAttribute('data-images');
      if (raw) return raw.split(',').map(s => s.trim()).filter(Boolean);
      const img = card.querySelector('img');
      return img ? [img.src] : [];
    }

    function getCardTitle(index) {
      const card = cards[index];
      if (!card) return '';
      const t = card.querySelector('.card__title');
      return t ? t.innerText.replace('\n', ' ') : '';
    }

    function showImage(imgIndex) {
      currentImageIndex = imgIndex;
      const src = currentImages[imgIndex];

      // Main content
      detailContent.innerHTML = '';
      detailContent.appendChild(makeMedia(src));

      // Dots
      dots.forEach((d, i) => d.classList.toggle('active', i === imgIndex));

      // Prev thumb
      if (imgIndex > 0) {
        prevBtn.classList.remove('hidden');
        prevThumb.innerHTML = '';
        prevThumb.appendChild(makeMedia(currentImages[imgIndex - 1], { thumb: true }));
      } else {
        prevBtn.classList.add('hidden');
      }

      // Next thumb
      if (imgIndex < currentImages.length - 1) {
        nextBtn.classList.remove('hidden');
        nextThumb.innerHTML = '';
        nextThumb.appendChild(makeMedia(currentImages[imgIndex + 1], { thumb: true }));
      } else {
        nextBtn.classList.add('hidden');
      }

      prevLabel.classList.toggle('hidden', imgIndex === 0);
      nextLabel.classList.toggle('hidden', imgIndex === currentImages.length - 1);
    }

    function openDetail(cardIndex) {
      currentCardIndex  = cardIndex;
      currentImageIndex = 0;
      const card        = cards[cardIndex];
      if (!card) return;

      currentImages = getCardImages(card);
      dots          = buildDots(currentImages.length);

      detailTitle.textContent = getCardTitle(cardIndex);
      detailDesc.classList.remove('visible');

      showImage(0);

      if (!detailPage.classList.contains('open')) {
        detailPage.classList.add('open');
        document.body.classList.add('detail-open');
      }
    }

    function closeDetail() {
      detailPage.classList.remove('open');
      document.body.classList.remove('detail-open');
      detailDesc.classList.remove('visible');
      // Stop any playing videos
      detailContent.querySelectorAll('video').forEach(v => v.pause());
    }

    cards.forEach((card, i) => {
      card.addEventListener('click', e => {
        e.preventDefault();
        openDetail(i);
      });
    });

    closeBtn.addEventListener('click', closeDetail);

    prevBtn.addEventListener('click', () => {
      if (currentImageIndex > 0) showImage(currentImageIndex - 1);
    });

    nextBtn.addEventListener('click', () => {
      if (currentImageIndex < currentImages.length - 1) showImage(currentImageIndex + 1);
    });

    prevLabel.addEventListener('click', () => {
      if (currentImageIndex > 0) showImage(currentImageIndex - 1);
    });

    nextLabel.addEventListener('click', () => {
      if (currentImageIndex < currentImages.length - 1) showImage(currentImageIndex + 1);
    });

    descBtn.addEventListener('click', () => {
      const card = cards[currentCardIndex];
      const desc = card ? card.getAttribute('data-desc') : '';
      detailDesc.innerHTML = desc || 'No description available.';
      detailDesc.classList.toggle('visible');
    });

    document.addEventListener('keydown', e => {
      if (!detailPage.classList.contains('open')) return;
      if (e.key === 'Escape')     closeDetail();
      if (e.key === 'ArrowLeft')  { if (currentImageIndex > 0) showImage(currentImageIndex - 1); }
      if (e.key === 'ArrowRight') { if (currentImageIndex < currentImages.length - 1) showImage(currentImageIndex + 1); }
    });

    /* ── SWIPE SUPPORT FOR DETAIL (mobile) ── */
    let touchStartX = 0;
    let touchStartY = 0;

    detailPage.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    detailPage.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      // Only handle horizontal swipes (more horizontal than vertical)
      if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
      if (dx < 0 && currentImageIndex < currentImages.length - 1) {
        showImage(currentImageIndex + 1);
      } else if (dx > 0 && currentImageIndex > 0) {
        showImage(currentImageIndex - 1);
      }
    }, { passive: true });
  }

  initDetailPage();

  /* ─────────────────────────────────
     HORIZONTAL SCROLL (desktop only)
  ───────────────────────────────── */

  if (outer && !isMobile()) {
    let isDown = false;
    let startX, scrollLeft;

    outer.addEventListener('mousedown', e => {
      isDown     = true;
      startX     = e.pageX - outer.offsetLeft;
      scrollLeft = outer.scrollLeft;
      outer.classList.add('grabbing');
    });

    document.addEventListener('mouseup', () => {
      isDown = false;
      outer.classList.remove('grabbing');
    });

    outer.addEventListener('mouseleave', () => {
      isDown = false;
      outer.classList.remove('grabbing');
    });

    outer.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const x    = e.pageX - outer.offsetLeft;
      const walk = (x - startX) * 1.4;
      outer.scrollLeft = scrollLeft - walk;
      if (window._updateStickyTitles) window._updateStickyTitles();
    });

    outer.addEventListener('wheel', e => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        outer.scrollLeft += e.deltaY * 1.2;
      }
    }, { passive: false });
  }

  /* ─────────────────────────────────
     NAV ACTIVE STATE
  ───────────────────────────────── */

  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    if (link.href === window.location.href) {
      link.setAttribute('data-active', '');
    }
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.removeAttribute('data-active'));
      link.setAttribute('data-active', '');
    });
  });

  /* ─────────────────────────────────
     TITLE → WORK PAGE TRANSITION
  ───────────────────────────────── */
  const workLink = document.querySelector('a.nav-link[href*="work"]');
  if (workLink && siteTitle) {
    workLink.addEventListener('click', function (e) {
      e.preventDefault();
      const dest = this.href;

      const r = siteTitle.getBoundingClientRect();
      sessionStorage.setItem('titleFromRect', JSON.stringify({
        top:      r.top,
        left:     r.left,
        width:    r.width,
        height:   r.height,
        fontSize: parseFloat(getComputedStyle(siteTitle).fontSize)
      }));

      fadeOut(dest);
    });
  }

})();