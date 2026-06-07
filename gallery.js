// ─── LIGHTBOX (used on index.html for project thumbnail previews) ─────────────

const lightbox   = document.getElementById('lightbox');
const lbImg      = document.getElementById('lb-img');
const lbCounter  = document.getElementById('lb-counter');

let lbImages  = [];   // all image paths for the active project
let lbIndex   = 0;    // currently shown image

function openLightbox(images, startIndex) {
  lbImages = images;
  lbIndex  = startIndex;
  showLbImage();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function showLbImage() {
  lbImg.src = lbImages[lbIndex];
  lbImg.alt = `Bilde ${lbIndex + 1} av ${lbImages.length}`;
  if (lbCounter) lbCounter.textContent = `${lbIndex + 1} / ${lbImages.length}`;
}

function lbPrev() {
  lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length;
  showLbImage();
}

function lbNext() {
  lbIndex = (lbIndex + 1) % lbImages.length;
  showLbImage();
}

if (lightbox) {
  document.getElementById('lb-close').addEventListener('click', closeLightbox);
  document.getElementById('lb-prev').addEventListener('click', lbPrev);
  document.getElementById('lb-next').addEventListener('click', lbNext);

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  lbPrev();
    if (e.key === 'ArrowRight') lbNext();
  });
}


// ─── PROJECT GALLERY BUILDER ──────────────────────────────────────────────────

async function buildProjectGallery() {
  const gallery = document.getElementById('gallery');
  if (!gallery) return;

  let data;
  try {
    const res = await fetch('projects.json');
    data = await res.json();
  } catch (e) {
    gallery.innerHTML = '<p style="color:var(--color-text-secondary)">Kunne ikke laste prosjekter.</p>';
    return;
  }

  const allProjects = data.projects.filter(p => p.images && p.images.length > 0);
  const limit       = parseInt(gallery.dataset.limit) || allProjects.length;
  const projects    = allProjects.slice(0, limit);

  projects.forEach(project => {
    const preview   = project.images.slice(0, 4);
    const allPaths  = project.images.map(img => `images/${project.id}/${img}`);
    const meta      = [project.category, project.location, project.year].filter(Boolean).join(' · ');

    const card = document.createElement('a');
    card.className = 'project-card';
    card.href = `prosjekt.html?id=${project.id}`;

    // Thumbnails — clicking opens lightbox instead of navigating
    const thumbsHtml = preview.map((img, i) => `
      <div class="project-thumb" data-index="${i}">
        <img src="images/${project.id}/${img}" alt="${project.name}" loading="lazy" />
      </div>
    `).join('');

    // Fill up to 4 empty slots if fewer images
    const empties = Array(Math.max(0, 4 - preview.length))
      .fill('<div class="project-thumb project-thumb-empty"></div>')
      .join('');

    card.innerHTML = `
      <div class="project-card-header">
        <span class="project-card-name">${project.name}</span>
        <span class="project-card-meta">${meta}</span>
      </div>
      <div class="project-thumbs">${thumbsHtml}${empties}</div>
      <div class="project-card-footer">
        <span class="project-img-count">${project.images.length} bilder</span>
        <a href="prosjekt.html?id=${project.id}" class="project-see-all">
          Se alle bilder →
        </a>
      </div>
    `;

    // Wire up thumbnail clicks to open lightbox
    card.querySelectorAll('.project-thumb[data-index]').forEach(thumb => {
      thumb.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        openLightbox(allPaths, parseInt(thumb.dataset.index));
      });
    });

    gallery.appendChild(card);
  });

  // "Show all projects" button — only if more projects than the limit
  if (allProjects.length > limit) {
    const allWrap = document.createElement('div');
    allWrap.className = 'gallery-all-wrap';
    allWrap.innerHTML = `<a href="alle-prosjekter.html" class="btn btn-ghost">Vis alle prosjekter</a>`;
    gallery.appendChild(allWrap);
  }
}

buildProjectGallery();
