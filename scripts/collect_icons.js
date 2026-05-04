import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, '../src');

const uniqueIcons = new Set();
let fileCount = 0;

function scanDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            scanDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            // Regex to find import { ... } from "lucide-react" or 'lucide-react'
            const importRegex = /import\s+{([^}]+)}\s+from\s+['"]lucide-react['"]/g;
            let match;
            let foundInFile = false;
            while ((match = importRegex.exec(content)) !== null) {
                foundInFile = true;
                const icons = match[1].split(',').map(s => s.trim()).filter(s => s);
                for (let icon of icons) {
                    // if it's "Icon as Alias", we just want the Icon part
                    if (icon.includes(' as ')) {
                        icon = icon.split(' as ')[0].trim();
                    }
                    uniqueIcons.add(icon);
                }
            }
            if (foundInFile) fileCount++;
        }
    }
}

scanDir(srcDir);

console.log(`Found ${uniqueIcons.size} unique icons across ${fileCount} files.`);
console.log(Array.from(uniqueIcons).sort().join('\n'));
