// ─── GALLERY IMAGE LIST ───────────────────────────────────────────────────────
// Add every filename from your images/ folder to this array.
// The hero image (hero.jpg) is used as the page background — don't add it here.
const GALLERY_IMAGES = [
  'bilde1.jpg',
  'bilde2.jpg',
  'bilde3.jpg',
  // ... add more here
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