const fs = require('fs');
const path = require('path');

const screens = [
  { name: 'BuildYourProfile.html', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2E0MWFhYjFhMmNmMDQxYmU4ZGFlOTY4YjJkNGIyZTNkEgsSBxDBzJLpsgMYAZIBIwoKcHJvamVjdF9pZBIVQhMyMjM3NDI4ODQ2Mjk3OTMzMDIw&filename=&opi=89354086' },
  { name: 'MyMatches.html', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzg4NDlkMDJjODNlOTQwYTRiZDMwMzcyMmY0N2ZjZjFmEgsSBxDBzJLpsgMYAZIBIwoKcHJvamVjdF9pZBIVQhMyMjM3NDI4ODQ2Mjk3OTMzMDIw&filename=&opi=89354086' },
  { name: 'DiscoverPeers.html', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2I5YTA2NjkyMmRjNTQ4NGE4Mjk3NGNjMmU1OTk1MWQ1EgsSBxDBzJLpsgMYAZIBIwoKcHJvamVjdF9pZBIVQhMyMjM3NDI4ODQ2Mjk3OTMzMDIw&filename=&opi=89354086' },
  { name: 'ChatCollaboration.html', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzI5NDdlNjJmNmVmNzQ0MGFiZjBkZDliNWNhMzQ0MmZiEgsSBxDBzJLpsgMYAZIBIwoKcHJvamVjdF9pZBIVQhMyMjM3NDI4ODQ2Mjk3OTMzMDIw&filename=&opi=89354086' },
  { name: 'InteractiveWhiteboard.html', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzdmOTkzZjAxODVkOTQyYWY4NzIxMDQyM2I5N2MxNmRhEgsSBxDBzJLpsgMYAZIBIwoKcHJvamVjdF9pZBIVQhMyMjM3NDI4ODQ2Mjk3OTMzMDIw&filename=&opi=89354086' },
  { name: 'Login.html', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzY0MDk3ZTk0MTdiZDQzMzlhYWE5ZTM2OGJmYzM2MzI5EgsSBxDBzJLpsgMYAZIBIwoKcHJvamVjdF9pZBIVQhMyMjM3NDI4ODQ2Mjk3OTMzMDIw&filename=&opi=89354086' }
];

async function downloadScreens() {
  for (const screen of screens) {
    try {
      const response = await fetch(screen.url);
      const html = await response.text();
      fs.writeFileSync(path.join(__dirname, 'stitch_screens', screen.name), html);
      console.log(`Downloaded ${screen.name}`);
    } catch (err) {
      console.error(`Error downloading ${screen.name}:`, err);
    }
  }
}

downloadScreens();
