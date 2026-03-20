/* ─────────────────────────────────────────────────────────────
   archive.js  —  infinite tiling grid + zoom/pan + custom cursor
   ───────────────────────────────────────────────────────────── */

// ── Data ──────────────────────────────────────────────────────────────────────
const WORKS = [
  {
    title:  "Spirit Collage",
    src:    "img/collage1.png",
    images: "img/collage1.png,img/collage2.png,img/collage3.png",
    desc:   "04 · 2025 <br> Digital and analog, variety of sizes, Adobe Photoshop <br><br> Spirit was inspired and made by exploring the institutionalisation of artworks from the Fluxus movement. I aimed to emulate the feeling and philosophy of the movmement through various collages, combining technology and humanity. The pieces are specifically inspired by Fluxus artist Nam June Paik. ",
    link:   ""
  },
  {
    title:  "Wire",
    src:    "img/wire/2.png",
    images: "img/wire/3.png,img/wire/1.jpeg,img/wire/2.png",
    desc:   "09 · 2024 <br> Wire <br><br> Manipulating wire, constructing a 2-dimensional object into something 3-dimensional, shows the unlimited abilities of materials. ",
    link:   ""
  },
  {
    title:  "The Death of a Corporate Man",
    src:    "img/fashion/studio2.jpg",
    images: "img/fashion/studio1.jpg,img/fashion/studio2.jpg,img/fashion/studio3.jpg,img/fashion/studiopdf.png",
    desc:   "10 · 2024 <br> Recycled ties, recycled shirt and denim skirt <br><br> The Death of a Corporate Man is a garment artwork that challenges traditional corporate masculinity and gender norms. Formal items such as neckties, a button down shirt, and denim are deconstructed and reconstructed into an altered blouse and a patchworked mini skirt. Made from thrifted materials with visible hand stitching, the piece focuses on sustainability, transformation, and personal identity while symbolizing the decline of rigid corporate dress codes.",
    link:   ""
  },
  {
    title:  "Rusted",
    src:    "img/cardboard/pig2.png",
    images: "img/cardboard/pig2.png,img/cardboard/pig1.png,img/cardboard/pig3.png,img/cardboard/bunny1.png,img/cardboard/bunny2.png,img/cardboard/bunny3.png,img/cardboard/bird1.png,img/cardboard/bird2.png,img/cardboard/bird3.png",
    desc:   [
      "Rusted; Pigs Eat All <br> 10 · 2023 <br> 37x39x31, Cardboard, oxidised rust base <br><br> Inspired by the book 'Animal Farm' by George Orwell, and the song 'Pigs, The Three Different Ones' by Pink Floyd. I wanted to reflect on the corrupt greed of power within our present society. The inhumane actions of greed reveal a lack of humanity and empathy when selfishness blinds one to their conscience. The constant craving for more power within hierarchies has caused society to suffer. Greed only increases, fueling the ego of one who desires more. A forever rusting pig symbolizes the infinite suffering of humanity.",
      "Rusted; Pigs Eat All <br> 10 · 2023 <br> 37x39x31, Cardboard, oxidised rust base <br><br> Inspired by the book 'Animal Farm' by George Orwell, and the song 'Pigs, The Three Different Ones' by Pink Floyd. I wanted to reflect on the corrupt greed of power within our present society. The inhumane actions of greed reveal a lack of humanity and empathy when selfishness blinds one to their conscience. The constant craving for more power within hierarchies has caused society to suffer. Greed only increases, fueling the ego of one who desires more. A forever rusting pig symbolizes the infinite suffering of humanity.",
      "Rusted; Pigs Eat All <br> 10 · 2023 <br> 37x39x31, Cardboard, oxidised rust base <br><br> Inspired by the book 'Animal Farm' by George Orwell, and the song 'Pigs, The Three Different Ones' by Pink Floyd. I wanted to reflect on the corrupt greed of power within our present society. The inhumane actions of greed reveal a lack of humanity and empathy when selfishness blinds one to their conscience. The constant craving for more power within hierarchies has caused society to suffer. Greed only increases, fueling the ego of one who desires more. A forever rusting pig symbolizes the infinite suffering of humanity.",
      "Rusted; PlayBoy <br> 02 · 2023 <br> 32x31x9, Cardboard, oxidised rust base <br><br> The 'Rusted' series reflects three types of greed in our nature. The 'Century Playboy' depicts a corrupt society due to greed for societal, physical, and emotional pleasure. The Playboy bunny is recognised as a symbol of sex and pleasure. However, the issue also lies with the mistreatment and portrayal of women within the porn industry, while their bodies are valued as meat. The rusted pieces of cardboard reflect the helpless, degraded humanity influenced by the old, dark, patriarchal society.",
      "Rusted; PlayBoy <br> 02 · 2023 <br> 32x31x9, Cardboard, oxidised rust base <br><br> The 'Rusted' series reflects three types of greed in our nature. The 'Century Playboy' depicts a corrupt society due to greed for societal, physical, and emotional pleasure. The Playboy bunny is recognised as a symbol of sex and pleasure. However, the issue also lies with the mistreatment and portrayal of women within the porn industry, while their bodies are valued as meat. The rusted pieces of cardboard reflect the helpless, degraded humanity influenced by the old, dark, patriarchal society.",
      "Rusted; PlayBoy <br> 02 · 2023 <br> 32x31x9, Cardboard, oxidised rust base <br><br> The 'Rusted' series reflects three types of greed in our nature. The 'Century Playboy' depicts a corrupt society due to greed for societal, physical, and emotional pleasure. The Playboy bunny is recognised as a symbol of sex and pleasure. However, the issue also lies with the mistreatment and portrayal of women within the porn industry, while their bodies are valued as meat. The rusted pieces of cardboard reflect the helpless, degraded humanity influenced by the old, dark, patriarchal society.",
      "Rusted; Bird <br> 02 · 2024 <br> 29x17x13, Cardboard, oxidised rust base <br><br> Inspired by the hazards of oil spills, reflecting the growing greed for money within society. The constant chase for gold supports the ruthless actions of humans, including the willingness to destroy lives and environments for their economic benefit. As society witnesses oil spilling out of the lungs of animals, they continue to neglect the chance of change. In the end, selfish acts of humanity and greed are reflected upon themselves, as the world loses its ecosystem",
      "Rusted; Bird <br> 02 · 2024 <br> 29x17x13, Cardboard, oxidised rust base <br><br> Inspired by the hazards of oil spills, reflecting the growing greed for money within society. The constant chase for gold supports the ruthless actions of humans, including the willingness to destroy lives and environments for their economic benefit. As society witnesses oil spilling out of the lungs of animals, they continue to neglect the chance of change. In the end, selfish acts of humanity and greed are reflected upon themselves, as the world loses its ecosystem",
      "Rusted; Bird <br> 02 · 2024 <br> 29x17x13, Cardboard, oxidised rust base <br><br> Inspired by the hazards of oil spills, reflecting the growing greed for money within society. The constant chase for gold supports the ruthless actions of humans, including the willingness to destroy lives and environments for their economic benefit. As society witnesses oil spilling out of the lungs of animals, they continue to neglect the chance of change. In the end, selfish acts of humanity and greed are reflected upon themselves, as the world loses its ecosystem",
    ],
    link:   ""
  },
  {
    title:  "Roots",
    src:    "img/nostalgia.png",
    images: "img/nostalgia.png, img/gonebywind.jpg",
    desc:   "10 · 2023 <br> 43x53, Fabric, pipe cleaners, wire, string, yarn, acrylic, thread, spray paint <br><br> As one matures, the memory becomes fragmented, losing purity, childhood, and carelessness. While time and memories are solely capable of departing, we greeted the return of memory through physical subjects. The manipulation of wires resulted in the map from my childhood home, with each piece of material extracted from my preadolescent wardrobe, creating a capsule of my childhood. 'Roots' reflect a personal desire to re-live memories, re-discover the locations, and re-gain the essence of childhood.",
    link:   ""
  },
  {
    title:  "Sketches",
    src:    "img/graphite/drawtea.jpeg",
    images: "img/graphite/drawtea.jpeg,img/graphite/drawbod.jpeg,img/graphite/drawbod2.jpeg,img/graphite/drawshoe.jpeg",
    desc:   "10 - 12 · 2024 <br> Graphite on paper<br><br>Skills demonstrated through obervational drawings, with and without shading. I mostly focused on the body and objects, personal to me. ",
    link:   ""
  },
  {
    title:  "Pissfudge",
    src:    "img/piss/1.png",
    images: "img/piss/1.png,img/piss/2.png,img/piss/3.png,img/piss/4.png,img/piss/5.png,img/piss/6.png,",
    desc:   "02 - 11 · 2023 <br> Adobe Illustrator, Photoshop <br><br> Inspired by NYC's unique blend of visual art and music, influenced by the historic Apollo Theatre and the spirit of the 1969 Stonewall Riot. The concept centers on the city's contrasts, its stark divides of wealth, vibrant colors, noise, and pop art alongside the often-overlooked integration of trash and graffiti that lends NYC its distinct, gritty charm. Full of Jazz, Punk and history.",
    link:   ""
  },
  {
    title:  "Digital Art",
    src:    "img/hawthorn.jpg",
    images: "img/hawthorn.jpg,img/perp.jpg,img/protection.jpg",
    desc:   [
      "HAWTHORN <br> 12 · 2023 <br> Adobe Illustrator, Procreate, 18x24 <br><br> 'Hawthorn' vivid recollections of my childhood in China. The burst of sweet and sour triggers a semi-collective sentiment between myself and peers. To foreigners, Hawthorn Flakes may be a mass-produced Asian snack. They represent a carefree lifestyle, one adults desire. Like memory, an object contains individualistic experiences and shared emotions. The distortions resemble an individual memory, existing in the same realm of society.",
      "Perpetuity <br> 09 · 2024 <br> Adobe Illustrator, Photoshop 18x24 <br><br> Each element in 'Perpetuity' was extracted from my observations in Union Square Park.  Inspired by the endless repetition of life, the piece portrays the inability to escape unfulfill-ment and greed. The depth and layers of our lives are depicted throughout, as we continue to look for a cheat code for life. Similar to the wheel of Samsara, a circle refrains makind to escape their own suffering.",
      "Protection <br> 11 · 2024 <br> Adobe Illustrator <br><br> The Nguzu Nguzu from the Solomon Islands was carved as a symbol of protection, bringing good fortune and safety to the canoe. The Solomon Islands Bird Bowl represented maturity. The Tiki is a symbol of Polynesian culture, signifying safeguarding and defense. Inspired by these qualities, I incorporated a Solomon Island tribal wall carving into the background to capture the graphic spirit of the artwork.",
    ],
    link:   ""
  },
  {
    title:  "Heritage",
    src:    "img/chopsticks.jpg",
    images: "img/chopsticks.jpg",
    desc:   "10 · 2024 <br> Wood, yarn <br><br> Chopsticks are considered the most important tool in an Asian household, yet I still use them 'wrong'. The slight shift of my index finger signals the locals of a foreigner. The sense of belonging is explored through the pair of wood-carved chopsticks. A perception of unity and connection, displayed through the red thread, reflects a connection between my Chinese heritage and international influence.",
    link:   ""
  },
  {
    title:  "Gone By the Wind",
    src:    "img/gonebywind.jpg",
    images: "img/gonebywind.jpg, img/nostalgia.png",
    desc:   "11 · 2023 <br> Acrylic and graffiti on cardboard <br><br> While memory becomes more fragmented, the childish emotions, excitement, and curiosity narrow. The need to let go of the past is held back by the greed for the memories, the golden childhood. As one matures, their childish features, clothes, scents, and mind slowly depart. The combination of the spray-painted structure of 'Roots' and the portait creates a strong connection to my personal experiences.",
    link:   ""
  },
  {
    title:  "Neglect",
    src:    "img/neglect/1.jpg",
    images: "img/neglect/1.jpg,img/neglect/2.jpg,img/neglect/3.jpg,img/neglect/4.jpg,img/neglect/5.jpg",
    desc:   "06 · 2023 <br> Digital Photography <br><br> Food is often seen as a source of comfort for most. However, the thin line between the harmful nature of food and the ability to destroy the self remains. 'Neglect' explores the constant battle within the cycle of harm and comfort. One single piece of gum is manipulated to emphasise the mental and physical struggle affected by the relationship between human and food.",
    link:   ""
  },
  {
    title:  "Paintings",
    src:    "img/paintings/2.jpeg",
    images: "img/paintings/1.jpeg,img/paintings/2.jpeg,img/paintings/3.jpeg",
    desc:   "2021 · 2022 <br> Acrylic on canvas <br><br> Paintings which were completed in '21,'22; reflecting the impact of COVID, expressing the loneliness of humanity and a constant worry and fear of the next day. ",
    link:   ""
  },

];

// ── Grid dimensions ───────────────────────────────────────────────────────────
const COUNT = WORKS.length;
const COLS  = 4; // change this number to however many columns you want
const ROWS  = Math.ceil(COUNT / COLS);
const CELL       = 200;
const GAP        = 80;
const TILE_W     = COLS * CELL + (COLS - 1) * GAP + GAP;
const TILE_H     = ROWS * CELL + (ROWS - 1) * GAP + GAP;

// ── DOM refs ──────────────────────────────────────────────────────────────────
const viewport   = document.getElementById('viewport');
const tooltip    = document.getElementById('cursor-tooltip');

document.addEventListener('mousemove', e => {
  tooltip.style.left = e.clientX + 'px';
  tooltip.style.top  = e.clientY + 'px';
});

const tileLayer  = document.createElement('div');
tileLayer.id     = 'tileLayer';
viewport.appendChild(tileLayer);

// ── Zoom / Pan state ──────────────────────────────────────────────────────────
let scale        = 0.85;
let tx           = 0;
let ty           = 0;

// ── Tile management ───────────────────────────────────────────────────────────
const tileMap = new Map();

function buildTile(tileCol, tileRow) {
  const tile = document.createElement('div');
  tile.className = 'tile';

  WORKS.forEach((work, i) => {
    const item = document.createElement('div');
    item.className = 'item';

    item.innerHTML = `
      <img src="${work.src}" alt="${work.title}" draggable="false" loading="lazy">
      <div class="item-title">${work.title}</div>
    `;

    item.addEventListener('mouseenter', () => {
      tileLayer.classList.add('has-hover');
      document.querySelectorAll(`.item[data-idx="${i}"]`).forEach(el => el.classList.add('hovered'));
      tooltip.textContent = work.title;
      tooltip.classList.add('visible');
    });

    item.addEventListener('mouseleave', () => {
      tileLayer.classList.remove('has-hover');
      document.querySelectorAll(`.item[data-idx="${i}"]`).forEach(el => el.classList.remove('hovered'));
      tooltip.classList.remove('visible');
    });

    item.addEventListener('click', () => {
      if (didDrag) return;
      const imageList = (work.images || work.src).split(',').filter(Boolean);
      openDetail(work.title, imageList, work.desc || '', work.link || '');
    });

    item.dataset.idx = i;
    tile.appendChild(item);
  });

  tile.style.gridTemplateColumns = `repeat(${COLS}, ${CELL}px)`;
  tile.style.gridTemplateRows    = `repeat(${ROWS}, ${CELL}px)`;
  tile.style.width  = TILE_W + 'px';
  tile.style.height = TILE_H + 'px';

  positionTile(tile, tileCol, tileRow);
  tileLayer.appendChild(tile);
  tileMap.set(`${tileCol},${tileRow}`, tile);
}

function positionTile(tile, tileCol, tileRow) {
  tile.style.left = tileCol * TILE_W + 'px';
  tile.style.top  = tileRow * TILE_H + 'px';
}

function updateTiles() {
  const vw = viewport.clientWidth;
  const vh = viewport.clientHeight;

  const left   = -tx / scale;
  const top    = -ty / scale;
  const right  = (vw - tx) / scale;
  const bottom = (vh - ty) / scale;

  const pad    = 1;
  const minCol = Math.floor(left  / TILE_W) - pad;
  const maxCol = Math.ceil (right / TILE_W) + pad;
  const minRow = Math.floor(top   / TILE_H) - pad;
  const maxRow = Math.ceil (bottom/ TILE_H) + pad;

  const needed = new Set();
  for (let c = minCol; c <= maxCol; c++) {
    for (let r = minRow; r <= maxRow; r++) {
      const key = `${c},${r}`;
      needed.add(key);
      if (!tileMap.has(key)) buildTile(c, r);
    }
  }

  for (const [key, tile] of tileMap) {
    if (!needed.has(key)) {
      tile.remove();
      tileMap.delete(key);
    }
  }
}

// ── Apply transform ───────────────────────────────────────────────────────────
function applyTransform() {
  tileLayer.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
  updateTiles();
}

// ── Zoom ──────────────────────────────────────────────────────────────────────
const MIN_SCALE  = 0.1;
const MAX_SCALE  = 10;
const ZOOM_SPEED = 0.0014;

viewport.addEventListener('wheel', e => {
  e.preventDefault();

  const rect     = viewport.getBoundingClientRect();
  const mx       = e.clientX - rect.left;
  const my       = e.clientY - rect.top;
  const delta    = -e.deltaY * ZOOM_SPEED;
  const newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale * (1 + delta)));
  const ratio    = newScale / scale;

  tx = mx - ratio * (mx - tx);
  ty = my - ratio * (my - ty);
  scale = newScale;

  applyTransform();
}, { passive: false });

// ── Pan ───────────────────────────────────────────────────────────────────────
let isDragging  = false;
let dragStartX  = 0;
let dragStartY  = 0;
let dragOriginX = 0;
let dragOriginY = 0;
let didDrag     = false;

viewport.addEventListener('mousedown', e => {
  if (e.button !== 0) return;
  isDragging  = true;
  didDrag     = false;
  dragStartX  = e.clientX;
  dragStartY  = e.clientY;
  dragOriginX = tx;
  dragOriginY = ty;
});

window.addEventListener('mousemove', e => {
  if (!isDragging) return;
  const dx = e.clientX - dragStartX;
  const dy = e.clientY - dragStartY;
  if (Math.abs(dx) > 2 || Math.abs(dy) > 2) didDrag = true;
  tx = dragOriginX + dx;
  ty = dragOriginY + dy;
  applyTransform();
});

window.addEventListener('mouseup', () => {
  isDragging = false;
});

// ── Touch ─────────────────────────────────────────────────────────────────────
let lastTouches = null;

viewport.addEventListener('touchstart', e => {
  lastTouches = e.touches;
}, { passive: true });

viewport.addEventListener('touchmove', e => {
  e.preventDefault();

  if (e.touches.length === 1 && lastTouches?.length === 1) {
    tx += e.touches[0].clientX - lastTouches[0].clientX;
    ty += e.touches[0].clientY - lastTouches[0].clientY;
    applyTransform();
  } else if (e.touches.length === 2 && lastTouches?.length >= 2) {
    const d0 = Math.hypot(
      lastTouches[0].clientX - lastTouches[1].clientX,
      lastTouches[0].clientY - lastTouches[1].clientY
    );
    const d1 = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY
    );
    const ratio    = d1 / d0;
    const cx       = (e.touches[0].clientX + e.touches[1].clientX) / 2;
    const cy       = (e.touches[0].clientY + e.touches[1].clientY) / 2;
    const newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale * ratio));
    const sr       = newScale / scale;
    tx    = cx - sr * (cx - tx);
    ty    = cy - sr * (cy - ty);
    scale = newScale;
    applyTransform();
  }

  lastTouches = e.touches;
}, { passive: false });

// ── Init ──────────────────────────────────────────────────────────────────────
window.addEventListener('load', () => {
  const vw = viewport.clientWidth;
  const vh = viewport.clientHeight;
  tx = (vw - TILE_W * scale) / 2;
  ty = (vh - TILE_H * scale) / 2;
  applyTransform();
});

// ── Title swap ────────────────────────────────────────────────────────────────
const siteTitle = document.getElementById('siteTitle');
siteTitle.addEventListener('mouseenter', () => { siteTitle.textContent = '·EMILY LIU·'; });
siteTitle.addEventListener('mouseleave', () => { siteTitle.textContent = '·ARCHIVE·'; });

// ── Detail Viewer ─────────────────────────────────────────────────────────────
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
let currentDesc  = '';
let currentLink  = '';

function getDescText(i) {
  if (Array.isArray(currentDesc)) {
    return currentDesc[i] || '';
  }
  return currentDesc || '';
}

function renderDetail(i) {
  detailIndex = i;

  content.innerHTML = `<img src="${detailImages[i]}">`;

  // if desc panel is open, update its text live as slides change
  if (desc.classList.contains('visible')) {
    desc.innerHTML = getDescText(i) +
      (currentLink ? `<br><br><a href="${currentLink}" target="_blank" style="color:#000; text-decoration:none; font-family:var(--font-display); font-weight:800; letter-spacing:.04em; text-transform:uppercase;">↗ LINK TO WEBSITE</a>` : '');
  }

  [...dotsWrap.children].forEach((d, x) => {
    d.classList.toggle('active', x === i);
  });

  if (i > 0) {
    prev.classList.remove('hidden');
    prevThumb.innerHTML = `<img src="${detailImages[i - 1]}">`;
  } else {
    prev.classList.add('hidden');
  }

  if (i < detailImages.length - 1) {
    next.classList.remove('hidden');
    nextThumb.innerHTML = `<img src="${detailImages[i + 1]}">`;
  } else {
    next.classList.add('hidden');
  }

  prevLabel.classList.toggle('hidden', i === 0);
  nextLabel.classList.toggle('hidden', i === detailImages.length - 1);
}

function openDetail(title, images, description, link) {
  detailImages = images;
  currentDesc  = description;
  currentLink  = link;

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
    desc.innerHTML = getDescText(detailIndex) +
      (currentLink ? `<br><br><a href="${currentLink}" target="_blank" style="color:#000; text-decoration:none; font-family:var(--font-display); font-weight:800; letter-spacing:.04em; text-transform:uppercase;">↗ LINK TO WEBSITE</a>` : '');
    desc.classList.toggle('visible');
  };

  page.classList.add('open');
  document.body.classList.add('detail-open');

  renderDetail(0);
}

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