
const body   = document.getElementById('page-body');
const toggle = document.getElementById('colorToggle');

function switchColor() {
  body.classList.toggle('colored');
}

function pulseLogo() {
  const title = document.querySelector('.site-title');
  if (!title) return;

  title.classList.remove('logo-pulse');

  void title.offsetWidth;

  title.classList.add('logo-pulse');

  title.addEventListener('animationend', () => {
    title.classList.remove('logo-pulse');
  }, { once: true });
}

document.querySelectorAll('.nav-link').forEach(link => {
  if (link.textContent.includes('INFO')) {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      switchColor();
      pulseLogo();
    });
  }
});

toggle.addEventListener('click', () => {
  switchColor();
  pulseLogo();
});

body.classList.add('colored');