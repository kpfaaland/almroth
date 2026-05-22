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
    const limit = parseInt(gallery.dataset.limit) || allProjects.length;
    const projects = allProjects.slice(0, limit);

  projects.forEach(project => {
    const preview = project.images.slice(0, 4);
    const meta = [project.category, project.location, project.year].filter(Boolean).join(' · ');

    const card = document.createElement('div');
    card.className = 'project-card';

    const thumbsHtml = preview.map(img => `
      <a href="prosjekt.html?id=${project.id}" class="project-thumb">
        <img src="images/${project.id}/${img}" alt="${project.name}" loading="lazy" />
      </a>
    `).join('');

    // Fyll opp til 4 tomme hvis færre bilder
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

    gallery.appendChild(card);
  });

  // Knapp nederst — vises kun hvis det er flere prosjekter enn vi viser
  if (allProjects.length > limit) {
    const allWrap = document.createElement('div');
    allWrap.className = 'gallery-all-wrap';
    allWrap.innerHTML = `<a href="alle-prosjekter.html" class="btn btn-ghost">Vis alle prosjekter</a>`;
    gallery.appendChild(allWrap);
  }
}

buildProjectGallery();