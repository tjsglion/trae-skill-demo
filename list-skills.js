const fs = require('fs');
const path = require('path');

const skillsDir = path.join(__dirname, '.trae', 'Skills');
const skillFolders = fs.readdirSync(skillsDir).filter(f => fs.statSync(path.join(skillsDir, f)).isDirectory());

for (const folder of skillFolders) {
  const skillMdPath = path.join(skillsDir, folder, 'SKILL.md');
  if (fs.existsSync(skillMdPath)) {
    const content = fs.readFileSync(skillMdPath, 'utf8');
    const nameMatch = content.match(/name:\s*(.+)/);
    const descMatch = content.match(/description:\s*(.+)/);
    if (nameMatch) {
      console.log(folder, "->", nameMatch[1].trim());
    }
  }
}
