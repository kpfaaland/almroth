const fs = require('fs');
const path = require('path');

const imageDir    = path.join(__dirname, 'images');
const projectsFile = path.join(__dirname, 'projects.json');
const extensions  = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

// Les eksisterende projects.json
let existing = { projects: [] };
if (fs.existsSync(projectsFile)) {
  existing = JSON.parse(fs.readFileSync(projectsFile, 'utf8'));
}

// Bygg opp et kart id → prosjekt for å bevare metadata
const existingMap = {};
existing.projects.forEach(p => { existingMap[p.id] = p; });

// Finn alle undermapper i images/
const folders = fs.readdirSync(imageDir).filter(f => {
  const full = path.join(imageDir, f);
  return fs.statSync(full).isDirectory() && !f.startsWith('.');
});

// Bygg oppdatert prosjektliste
const updatedProjects = folders.map(folder => {
  const folderPath = path.join(imageDir, folder);
  const images = fs.readdirSync(folderPath)
    .filter(f => extensions.includes(path.extname(f).toLowerCase()))
    .sort();

  if (existingMap[folder]) {
    // Bevar eksisterende metadata, oppdater kun bildelisten
    return { ...existingMap[folder], images };
  } else {
    // Ny mappe — legg til med plassholder-metadata
    console.log(`  ⚠️  Ny mappe funnet: "${folder}" — husk å oppdatere navn/kategori i projects.json`);
    return {
      id: folder,
      name: folder,
      category: '',
      location: '',
      year: '',
      images
    };
  }
});

fs.writeFileSync(projectsFile, JSON.stringify({ projects: updatedProjects }, null, 2));

console.log(`\n✅ projects.json oppdatert med ${updatedProjects.length} prosjekter:`);
updatedProjects.forEach(p => console.log(`   ${p.id}: ${p.images.length} bilder`));