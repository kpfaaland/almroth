const fs = require('fs');
const path = require('path');

const imageDir = path.join(__dirname, 'images');
const outputFile = path.join(__dirname, 'gallery.js');

const extensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

const images = fs.readdirSync(imageDir)
  .filter(f => extensions.includes(path.extname(f).toLowerCase()))
  .filter(f => f !== 'hero.jpg' && f !== 'logo.png')
  .sort();

const content = `// AUTO-GENERATED — run: node generate-image-list.js
const GALLERY_IMAGES = ${JSON.stringify(images, null, 2)};

${fs.readFileSync(outputFile, 'utf8').replace(/\/\/ AUTO-GENERATED.*?(?=\/\/ ─)/s, '')}
`;

// Only rewrite the GALLERY_IMAGES array, keep the rest of gallery.js intact
const existing = fs.readFileSync(outputFile, 'utf8');
const updated = existing.replace(
  /const GALLERY_IMAGES = \[[\s\S]*?\];/,
  `const GALLERY_IMAGES = ${JSON.stringify(images, null, 2)};`
);

fs.writeFileSync(outputFile, updated);
console.log(`✅ Found ${images.length} images:`);
images.forEach(f => console.log('  ' + f));