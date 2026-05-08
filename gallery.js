// ─── GALLERY IMAGE LIST ───────────────────────────────────────────────────────
// Add every filename from your images/ folder to this array.
// The hero image (hero.jpg) is used as the page background — don't add it here.
const GALLERY_IMAGES = [
  "01_czechhouses.jpg",
  "14800131_10157734256560624_1687001181_o.jpg",
  "15102091_10153897220681105_1352579012_o.png",
  "20180203_-_Logo_og_tekst_mørk_bakgrunn_(med_plantegning_i_bakgrunn).png",
  "20180314 - Logo med transparent bakgrunn til webside.png",
  "20676793_10154648688936105_1755059835_o.jpg",
  "20707011_10154648688961105_1601536653_o.jpg",
  "21103949_10154692833456105_680260997_o.jpg",
  "21103949_10154692833456105_680260997_o2 (1).jpg",
  "21103949_10154692833456105_680260997_o2 - Copy.jpg",
  "22532146_10159627050565624_1074425531_o2.jpg",
  "22908277_10154849587176105_1753946680_o.jpg",
  "23770309_10154906218046105_421426659_o.jpg",
  "26513194_10155007682691105_535917694_o.jpg",
  "27017081_10160049650500624_1082085788_o.png",
  "27017081_10160049650500624_1082085788_o_edited.png",
  "27017081_10160049650500624_1082085788_o_edited_edited.png",
  "27144729_10160063802220624_1321904997_o.jpg",
  "28217377_10155125271091105_287568676_o.jpg",
  "28471208_10155163412671105_4857580472445698048_o.jpg",
  "28471480_10155163414896105_9009827156250853376_o.jpg",
  "28471786_10155163412566105_7735167883130437632_o.jpg",
  "Backgrounds-Construction-HD.jpg",
  "IMG_20170713_190212~2 (1).jpg",
  "IMG_20170713_190212~2.jpg",
  "IMG_20180206_211119~2 (1).jpg",
  "IMG_20180206_211119~2.jpg",
  "Interior-decoration-hd-free-images.jpg",
  "MVIMG_20180304_124933~2 (1).jpg",
  "MVIMG_20180304_124933~2.jpg",
  "Oppussing (1).jpg",
  "Oppussing.jpg",
  "best-elegant-traditional-mediterranean-home-design-exterior-ideas-three-story-cube-house-with-glass-wall-of-wooden-modern_chimney-designs-exterior-images-modern-house_exterior_exterior-window-trim-des.jpg",
  "logo-bvn.png",
  "modern-house-wallpaper-19.jpg",
  "test.png",
  "wallup-23825.jpg"
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