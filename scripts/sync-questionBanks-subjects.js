import fs from 'fs';
import path from 'path';

const API_QUESTIONBANKS_URL = 'http://localhost:8080/api/question-banks';
const API_SUBJECTS_URL = 'http://localhost:8080/api/subjects/all';
const DATA_DIR = './public/data';
const FILE_NAME_QUESTIONBANKS = 'questionBanks.json';
const FILE_NAME_SUBJECTS = 'subjects.json';


async function syncQuestionBanksList() {
  try {
    // Check if data directory exists
    if (!fs.existsSync(DATA_DIR)) {
      console.error(`Directory not found: ${DATA_DIR}`);
      return;
    }

    const filePath = path.join(DATA_DIR, FILE_NAME_QUESTIONBANKS);

    console.log(`⏳ Fetching all question banks -> ${FILE_NAME_QUESTIONBANKS}...`);

    const response = await fetch(API_QUESTIONBANKS_URL);
    
    if (!response.ok) {
      console.error(`❌ Failed to fetch question banks: ${response.status} ${response.statusText}`);
      return;
    }

    const data = await response.json();
    
    // Write the data to the file with 2-space indentation
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    
    const count = Array.isArray(data) ? data.length : (data.content?.length || 'multiple');
    console.log(`✅ Updated ${FILE_NAME_QUESTIONBANKS} successfully. Synced ${count} items.`);
    console.log('\n✨ Sync completed!');
  } catch (err) {
    console.error('💥 Critical error:', err.message);
  }
}

// Execute the sync
syncQuestionBanksList();

async function syncSubjectsList() {
  try {
    // Check if data directory exists
    if (!fs.existsSync(DATA_DIR)) {
      console.error(`Directory not found: ${DATA_DIR}`);
      return;
    }

    const filePath = path.join(DATA_DIR, FILE_NAME_SUBJECTS);

    console.log(`⏳ Fetching all subjects -> ${FILE_NAME_SUBJECTS}...`);

    const response = await fetch(API_SUBJECTS_URL);
    
    if (!response.ok) {
      console.error(`❌ Failed to fetch subjects: ${response.status} ${response.statusText}`);
      return;
    }

    const data = await response.json();
    
    // Write the data to the file with 2-space indentation
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    
    const count = Array.isArray(data) ? data.length : (data.content?.length || 'multiple');
    console.log(`✅ Updated ${FILE_NAME_SUBJECTS} successfully. Synced ${count} items.`);
    console.log('\n✨ Sync completed!');
  } catch (err) {
    console.error('💥 Critical error:', err.message);
  }
}

// Execute the sync
syncSubjectsList();
