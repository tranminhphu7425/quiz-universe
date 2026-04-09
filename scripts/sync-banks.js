import fs from 'fs';
import path from 'path';

const API_BASE = 'http://localhost:8080/api/questions/question-bank';
const DATA_DIR = './public/data';

async function syncQuestionBanks() {
  try {
    // Check if data directory exists
    if (!fs.existsSync(DATA_DIR)) {
      console.error(`Directory not found: ${DATA_DIR}`);
      return;
    }

    const files = fs.readdirSync(DATA_DIR);
    // Filter files that follow the pattern questionBank{id}.json
    const bankFiles = files.filter(f => {
      return f.startsWith('questionBank') && 
             f.endsWith('.json') && 
             f !== 'questionBanks.json' &&
             /\d+/.test(f);
    });

    if (bankFiles.length === 0) {
      console.log('No matching question bank files found in ' + DATA_DIR);
      return;
    }

    console.log(`🚀 Found ${bankFiles.length} question bank files to sync...`);

    for (const file of bankFiles) {
      const match = file.match(/(\d+)/);
      if (!match) continue;
      
      const bankId = match[0];
      const url = `${API_BASE}/${bankId}`;
      const filePath = path.join(DATA_DIR, file);

      console.log(`⏳ Fetching Bank ID ${bankId} -> ${file}...`);

      try {
        const response = await fetch(url);
        
        if (!response.ok) {
          console.error(`❌ Failed to fetch Bank ID ${bankId}: ${response.status} ${response.statusText}`);
          continue;
        }

        const data = await response.json();
        
        // Write the data to the file with 2-space indentation
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        console.log(`✅ Updated ${file} successfully.`);
      } catch (err) {
        console.error(`❌ Error updating ${file}:`, err.message);
      }
    }
    
    console.log('\n✨ All banks synced successfully!');
  } catch (err) {
    console.error('💥 Critical error:', err.message);
  }
}

// Execute the sync
syncQuestionBanks();
