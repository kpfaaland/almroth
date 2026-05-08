// ─── GALLERY IMAGE LIST ───────────────────────────────────────────────────────
// Add every filename from your images/ folder to this array.
// The hero image (hero.jpg) is used as the page background — don't add it here.
const GALLERY_IMAGES = [
  "prosjekter/15102091_10153897220681105_1352579012_o.png",
  "prosjekter/20676793_10154648688936105_1755059835_o.jpg",
  "prosjekter/20707011_10154648688961105_1601536653_o.jpg",
  "prosjekter/22532146_10159627050565624_1074425531_o2.jpg",
  "prosjekter/22908277_10154849587176105_1753946680_o.jpg",
  "prosjekter/23770309_10154906218046105_421426659_o.jpg",
  "prosjekter/26513194_10155007682691105_535917694_o.jpg",
  "prosjekter/27144729_10160063802220624_1321904997_o.jpg",
  "prosjekter/28217377_10155125271091105_287568676_o.jpg",
  "prosjekter/28471208_10155163412671105_4857580472445698048_o.jpg",
  "prosjekter/28471480_10155163414896105_9009827156250853376_o.jpg",
  "prosjekter/28471786_10155163412566105_7735167883130437632_o.jpg",
  "prosjekter/IMG_20170713_190212~2.jpg",
  "prosjekter/IMG_20180206_211119~2.jpg",
  "prosjekter/MVIMG_20180304_124933~2.jpg",
  "prosjekter/Oppussing.jpg"
];

// ─── BUILD GALLERY ────────────────────────────────────────────────────────────
const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lbImg    = document.getElementById('lb-img');
const lbCounter = document.getElementById('lb-counter');
let currentIndex = 0;

GALLERY_IMAGES.forEach((filename, i) => {
  const item = document.createElement('div');
  item.className = 'gallery-item';
  const img = document.createElement('img');
  img.src = 'images/' + filename;
  img.alt = 'Prosjektbilde ' + (i + 1);
  img.loading = 'lazy';
  item.appendChild(img);
  item.addEventListener('click', () => openLightbox(i));
  gallery.appendChild(item);
});

// ─── LIGHTBOX ─────────────────────────────────────────────────────────────────
function openLightbox(index) {
  currentIndex = index;
  showImage(currentIndex);
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function showImage(index) {
  lbImg.src = 'images/' + GALLERY_IMAGES[index];
  lbImg.alt = 'Prosjektbilde ' + (index + 1);
  lbCounter.textContent = (index + 1) + ' / ' + GALLERY_IMAGES.length;
}

function prevImage() {
  currentIndex = (currentIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
  showImage(currentIndex);
}

function nextImage() {
  currentIndex = (currentIndex + 1) % GALLERY_IMAGES.length;
  showImage(currentIndex);
}

document.getElementById('lb-close').addEventListener('click', closeLightbox);
document.getElementById('lb-prev').addEventListener('click', prevImage);
document.getElementById('lb-next').addEventListener('click', nextImage);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') prevImage();
  if (e.key === 'ArrowRight') nextImage();
});