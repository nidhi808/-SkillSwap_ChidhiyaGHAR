const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src');

const replacements = {
  'max-w-[1280px]': 'max-w-7xl',
  'px-[64px]': 'px-16',
  'px-[16px]': 'px-4',
  'gap-[24px]': 'gap-6',
  'py-[120px]': 'py-32'
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
console.log('Done replacing classes with standard tailwind tokens');
