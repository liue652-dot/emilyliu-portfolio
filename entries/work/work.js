(function () {

const items = [...document.querySelectorAll('.item')];

/* ───────────────── FILTERS ───────────────── */

const filterBtns = document.querySelectorAll('.filter-btn[data-filter]');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    items.forEach(item => {
      const tags = item.getAttribute('data-tags') || '';
      if (filter === 'all' || tags.includes(filter)) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
});


/* ───────── DETAIL VIEWER (ARCHIVE PORT + VIDEO SUPPORT) ───────── */

const page      = document.getElementById('detailPage');
const content   = document.getElementById('detailContent');
const desc      = document.getElementById('detailDesc');
const barTitle  = document.getElementById('detailBarTitle');
const prev      = document.getElementById('detailPrev');
const next      = document.getElementById('detailNext');
const prevThumb = document.getElementById('prevThumb');
const nextThumb = document.getElementById('nextThumb');
const prevLabel = document.getElementById('detailPrevLabel');
const nextLabel = document.getElementById('detailNextLabel');
const dotsWrap  = document.getElementById('detailDots');
const descBtn   = document.getElementById('detailDescBtn');

let detailImages = [];
let detailIndex  = 0;


/* ───────── HELPERS ───────── */

function getThumb(src){
  const ext = src.split('.').pop().toLowerCase();

  if (ext === 'mp4' || ext === 'mov' || ext === 'webm') {
    return `<video src="${src}" muted autoplay loop playsinline></video>`;
  }

  // PDF — show a label instead of a broken image
  if (ext === 'pdf') {
    return `<div style="width:80px;height:80px;background:#222;display:flex;align-items:center;justify-content:center;color:#fff;font-family:var(--font-display);font-size:11px;font-weight:800;letter-spacing:.05em;">PDF</div>`;
  }

  return `<img src="${src}">`;
}


/* ───────── RENDER SLIDE ───────── */

function renderDetail(i) {
  detailIndex = i;

  const src = detailImages[i];
  const ext = src.split('.').pop().toLowerCase();

  if (ext === 'mp4' || ext === 'mov' || ext === 'webm') {
    content.innerHTML = `
      <video src="${src}"
             autoplay
             loop
             muted
             playsinline
             controls
             style="max-width:100%; max-height:100%; object-fit:contain;">
      </video>`;

  // PDF — render as iframe filling the full stage
  } else if (ext === 'pdf') {
    content.innerHTML = `
      <iframe src="${src}"
              style="width:100%;height:100%;border:none;display:block;">
      </iframe>`;

  } else {
    content.innerHTML = `<img src="${src}">`;
  }

  [...dotsWrap.children].forEach((d, x) => {
    d.classList.toggle('active', x === i);
  });

  if (i > 0) {
    prev.classList.remove('hidden');
    prevThumb.innerHTML = getThumb(detailImages[i - 1]);
  } else {
    prev.classList.add('hidden');
  }

  if (i < detailImages.length - 1) {
    next.classList.remove('hidden');
    nextThumb.innerHTML = getThumb(detailImages[i + 1]);
  } else {
    next.classList.add('hidden');
  }

  prevLabel.classList.toggle('hidden', i === 0);
  nextLabel.classList.toggle('hidden', i === detailImages.length - 1);
}


/* ───────── OPEN DETAIL ───────── */

function openDetail(title, images, description) {

  detailImages = images;

  dotsWrap.innerHTML = '';
  images.forEach((_, x) => {
    const d = document.createElement('button');
    d.className = 'detail-dot';
    d.onclick   = () => renderDetail(x);
    dotsWrap.appendChild(d);
  });

  barTitle.textContent = title || '';
  desc.classList.remove('visible');

  descBtn.onclick = () => {
    desc.innerHTML = description || 'No description.';
    desc.classList.toggle('visible');
  };

  page.classList.add('open');
  document.body.classList.add('detail-open');

  renderDetail(0);
}


/* ───────── ITEM CLICK ───────── */

items.forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();

    const imageList = (item.dataset.images || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    // PDF appended as last slide — only inside the viewer, not the grid
    const pdf = item.dataset.pdf;
    if (pdf) imageList.push(pdf);

    const title       = item.dataset.title || '';
    const description = item.dataset.desc  || '';

    openDetail(
      title,
      imageList.length
        ? imageList
        : [item.querySelector('img,video').src],
      description
    );
  });
});


/* ───────── CLOSE / NAV ───────── */

document.getElementById('detailCloseBtn').onclick = () => {
  page.classList.remove('open');
  document.body.classList.remove('detail-open');
  desc.classList.remove('visible');
};

prev.onclick = () => detailIndex > 0 && renderDetail(detailIndex - 1);
next.onclick = () => detailIndex < detailImages.length - 1 && renderDetail(detailIndex + 1);

prevLabel.onclick = prev.onclick;
nextLabel.onclick = next.onclick;

document.addEventListener('keydown', e => {
  if (!page.classList.contains('open')) return;

  if (e.key === 'Escape') {
    page.classList.remove('open');
    document.body.classList.remove('detail-open');
  }

  if (e.key === 'ArrowLeft')  prev.onclick();
  if (e.key === 'ArrowRight') next.onclick();
});

})();