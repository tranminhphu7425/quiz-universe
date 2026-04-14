import fs from 'fs';
import path from 'path';

const API_URL = 'http://localhost:8080/api/question-banks';
const DATA_DIR = './public/data';
const FILE_NAME = 'questionBanks.json';

async function syncQuestionBanksList() {
  try {
    // Check if data directory exists
    if (!fs.existsSync(DATA_DIR)) {
      console.error(`Directory not found: ${DATA_DIR}`);
      return;
    }

    const filePath = path.join(DATA_DIR, FILE_NAME);

    console.log(`⏳ Fetching all question banks -> ${FILE_NAME}...`);

    const response = await fetch(API_URL);
    
    if (!response.ok) {
      console.error(`❌ Failed to fetch question banks: ${response.status} ${response.statusText}`);
      return;
    }

    const data = await response.json();
    
    // Write the data to the file with 2-space indentation
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    
    const count = Array.isArray(data) ? data.length : (data.content?.length || 'multiple');
    console.log(`✅ Updated ${FILE_NAME} successfully. Synced ${count} items.`);
    console.log('\n✨ Sync completed!');
  } catch (err) {
    console.error('💥 Critical error:', err.message);
  }
}

// Execute the sync
syncQuestionBanksList();
