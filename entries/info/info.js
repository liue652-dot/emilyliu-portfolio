/* =============================================
   EMILY LIU — info.js
   ============================================= */

const body   = document.getElementById('page-body');
const toggle = document.getElementById('colorToggle');

// Toggle wine-red / beige color scheme
function switchColor() {
  body.classList.toggle('colored');
}

// Shrink -> grow animation on the site title
function pulseLogo() {
  const title = document.querySelector('.site-title');
  if (!title) return;

  // Remove any in-progress animation
  title.classList.remove('logo-pulse');

  // Force reflow so re-adding the class restarts the animation
  void title.offsetWidth;

  title.classList.add('logo-pulse');

  title.addEventListener('animationend', () => {
    title.classList.remove('logo-pulse');
  }, { once: true });
}

// Toggle when clicking INFO nav link (current page)
document.querySelectorAll('.nav-link').forEach(link => {
  if (link.textContent.includes('INFO')) {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      switchColor();
      pulseLogo();
    });
  }
});

// Toggle via bottom-left hint
toggle.addEventListener('click', () => {
  switchColor();
  pulseLogo();
});

// Auto-activate colored theme — this IS the info page
body.classList.add('colored');