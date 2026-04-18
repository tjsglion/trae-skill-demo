import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');

  if (!name) {
    return NextResponse.json({ error: 'Skill name is required' }, { status: 400 });
  }

  try {
    const skillsDir = path.join(process.cwd(), '.trae', 'skills');
    
    // Fallback if directory doesn't exist
    if (!fs.existsSync(skillsDir)) {
      return NextResponse.json({ 
        logs: [
          `[SYSTEM] Initializing ${name} workspace...`,
          `[ERROR] Could not find .trae/skills directory.`,
          `[INFO] Falling back to generic mock logic.`,
          `> Executing task...`,
          `[OUTPUT] Task completed with fallback data.`
        ] 
      });
    }

    const dirs = fs.readdirSync(skillsDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    // Normalize query
    const normalizedQuery = name.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Find matching directory
    let matchedDir = dirs.find(dir => {
      const normalizedDir = dir.toLowerCase().replace(/[^a-z0-9]/g, '');
      // Remove leading numbers for better matching, e.g., 00metadispatcher -> metadispatcher
      const cleanDir = normalizedDir.replace(/^[0-9]+/, '');
      return cleanDir.includes(normalizedQuery) || normalizedQuery.includes(cleanDir);
    });

    if (matchedDir) {
      const skillPath = path.join(skillsDir, matchedDir, 'SKILL.md');
      if (fs.existsSync(skillPath)) {
        const content = fs.readFileSync(skillPath, 'utf8');
        
        // Parse markdown content into execution logs
        const lines = content.split('\n')
          .map(line => line.trim())
          .filter(line => line.length > 0 && !line.startsWith('---')); // Remove frontmatter and empty lines
          
        const logs = [
          `[SYSTEM] Initializing ${name} workspace...`,
          `[INFO] Loading context from .trae/skills/${matchedDir}/SKILL.md...`,
          `[SUCCESS] Context loaded. Starting execution.`,
          `---`,
        ];

        // Add up to 20 lines from the actual file to simulate processing
        let processCount = 0;
        for (const line of lines) {
          if (processCount > 20) break;
          
          if (line.startsWith('#')) {
            logs.push(`[INFO] Analyzing section: ${line.replace(/^#+\s*/, '')}`);
          } else if (line.startsWith('-') || line.startsWith('*') || /^\d+\./.test(line)) {
            logs.push(`> Processing item: ${line.replace(/^[-*\d.]+\s*/, '').substring(0, 60)}...`);
          } else if (line.startsWith('>')) {
            logs.push(`> ${line.replace(/^>\s*/, '').substring(0, 60)}...`);
          } else if (line.length > 20) {
            logs.push(`> Synthesizing: ${line.substring(0, 60)}...`);
          }
          processCount++;
        }

        logs.push(`---`);
        logs.push(`[OUTPUT] Execution completed successfully.`);
        
        return NextResponse.json({ logs });
      }
    }
    
    // If no match or file found
    return NextResponse.json({ 
      logs: [
        `[SYSTEM] Initializing ${name} workspace...`,
        `[INFO] Searching for skill definition in .trae/skills...`,
        `[WARNING] No specific SKILL.md found for ${name}.`,
        `> Proceeding with default heuristic processing...`,
        `[OUTPUT] Task completed based on general instructions.`
      ] 
    });

  } catch (error) {
    console.error("Error reading skill:", error);
    return NextResponse.json({ error: 'Failed to read skill file' }, { status: 500 });
  }
}