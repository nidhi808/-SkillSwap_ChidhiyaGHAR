const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src');

const replacements = {
  'max-w-container-max': 'max-w-[1280px]',
  'px-margin-desktop': 'px-[64px]',
  'px-margin-mobile': 'px-[16px]',
  'gap-gutter': 'gap-[24px]',
  'py-section-gap': 'py-[120px]'
};

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      for (const [key, value] of Object.entries(replacements)) {
        if (content.includes(key)) {
          content = content.split(key).join(value);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory(dir);
console.log('Done replacing classes');
