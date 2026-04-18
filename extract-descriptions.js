const fs = require('fs');
const path = require('path');

const skillsDir = path.join(__dirname, '.trae', 'Skills');
const skillFolders = fs.readdirSync(skillsDir).filter(f => fs.statSync(path.join(skillsDir, f)).isDirectory());

const folderToIconName = {
  '00_Meta_Dispatcher': 'Meta Dispatcher',
  '00_Meta_UniversalDevTeam': 'Universal Dev Team',
  '01_Architect_TechStackSelector': 'Tech Stack Selector',
  '01_Discovery_GitHubSearch': 'GitHub Search',
  '01_ProductManager_Brainstorming': 'Brainstorming',
  '02_Architect_APIDesign': 'API Design',
  '02_Designer_FrontendImplementation': 'Frontend Impl',
  '02_Designer_UIUXIntelligence': 'UI/UX Intelligence',
  '02_Designer_WebGuidelines': 'Web Guidelines',
  '03_Developer_ArtifactsBuilder': 'Artifacts Builder',
  '03_Developer_ReactBestPractices': 'React Best Practices',
  '03_Mobile_Flutter': 'Flutter',
  '03_Mobile_FlutterChinaDeploy': 'Flutter China Deploy',
  '04_Tester_BrowserAutomation': 'Browser Automation',
  '04_Tester_WebAppTesting': 'Web App Testing',
  '05_Backend_Database': 'Backend Database',
  '05_Backend_MCPBuilder': 'MCP Builder',
  '05_Backend_Node': 'Backend Node',
  '05_Backend_Python': 'Backend Python',
  '05_DevOps_GitOps': 'GitOps',
  '05_DevOps_GitWorkflow': 'Git Workflow',
  '05_DevOps_GiteeWorkflow': 'Gitee Workflow',
  '06_Office_Docx': 'Office Docx',
  '06_Office_Excel': 'Office Excel',
  '06_Office_Pdf': 'Office Pdf',
  '06_SEO_Analytics': 'SEO Analytics',
  '06_SEO_ContentStrategy': 'SEO Content',
  '06_SEO_LinkBuilding': 'SEO Link Building',
  '06_SEO_Technical': 'SEO Technical',
  '07_Security_Specialist': 'Security Specialist',
  '08_AI_Engineer': 'AI Engineer',
  '09_Operations_Growth': 'Operations Growth',
  '99_Meta_Customization': 'Meta Customization',
  '99_Meta_SkillCreator': 'Skill Creator',
  '99_Meta_TraeProjectSetup': 'Project Setup'
};

const descriptions = {};

for (const folder of skillFolders) {
  const skillMdPath = path.join(skillsDir, folder, 'SKILL.md');
  if (fs.existsSync(skillMdPath)) {
    const content = fs.readFileSync(skillMdPath, 'utf8');
    const descMatch = content.match(/description:\s*([^\n]+)/);
    
    if (descMatch && folderToIconName[folder]) {
      descriptions[folderToIconName[folder]] = descMatch[1].trim();
    }
  }
}

const componentPath = path.join(__dirname, 'src/components/icon-ring.tsx');
let componentContent = fs.readFileSync(componentPath, 'utf8');

const iconListRegex = /const ICON_LIST = \[([\s\S]*?)\];/;
const iconListMatch = componentContent.match(iconListRegex);

if (iconListMatch) {
  let listContent = iconListMatch[1];
  
  const lines = listContent.split('\n');
  const newLines = lines.map(line => {
    // strip old description if exists
    let cleanedLine = line.replace(/,\s*description:\s*"[^"]*"/, '');
    const match = cleanedLine.match(/name:\s*"([^"]+)"/);
    if (match) {
      const name = match[1];
      const desc = descriptions[name] || '';
      if (desc) {
        // Escape quotes
        const safeDesc = desc.replace(/"/g, '\\"');
        return cleanedLine.replace(' },', `, description: "${safeDesc}" },`);
      }
    }
    return cleanedLine;
  });
  
  const newComponentContent = componentContent.replace(iconListRegex, `const ICON_LIST = [\n${newLines.join('\n')}\n];`);
  fs.writeFileSync(componentPath, newComponentContent, 'utf8');
  console.log('Successfully updated descriptions.');
} else {
  console.log('Could not find ICON_LIST.');
}
