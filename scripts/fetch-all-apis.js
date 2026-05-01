import fs from 'fs';
import path from 'path';

const API_BASE = 'http://localhost:8080/api';
const OUTPUT_DIR = './public/api';

/**
 * Helper to ensure a directory exists for a given file path
 */
function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

/**
 * Helper to fetch a URL and save it to the mirrored path
 */
async function fetchAndSave(endpoint) {
  const url = `${API_BASE}${endpoint}`;
  const filePath = path.join(OUTPUT_DIR, `${endpoint}.json`);

  console.log(`⏳ Fetching: ${url}`);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`❌ Failed to fetch ${url}: ${response.status} ${response.statusText}`);
      return null;
    }
    const data = await response.json();
    
    ensureDirectoryExistence(filePath);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`✅ Saved to: ${filePath}`);
    return data;
  } catch (err) {
    console.error(`❌ Error fetching ${url}:`, err.message);
    return null;
  }
}

async function runSync() {
  console.log('🚀 Starting API Sync to Static JSON...');

  // 1. Fetch general lists
  await fetchAndSave('/subjects/all');
  await fetchAndSave('/majors/all');
  await fetchAndSave('/universities/all');
  
  // Fetch paginated versions if they are used by the app without /all (optional, but good to have)
  // Usually, frontend might request /question-banks?page=0&size=10, but static JSON doesn't support query params easily in the filename unless we map them.
  // For simplicity, we fetch /all.

  // 2. Fetch Question Banks
  const banksData = await fetchAndSave('/question-banks/all');
  
  if (banksData) {
    // If banksData is a page object, the list is in banksData.content. If it's a direct list, it's banksData
    const banks = Array.isArray(banksData) ? banksData : (banksData.content || []);
    
    console.log(`\n📚 Found ${banks.length} question banks. Syncing questions...`);
    
    // 3. Fetch questions for each bank
    for (const bank of banks) {
      const bankId = bank.bankId || bank.id;
      if (bankId) {
        await fetchAndSave(`/questions/question-bank/${bankId}`);
      }
    }
  }

  // If there are subject-specific question APIs, sync them too
  const subjectsData = await fetchAndSave('/subjects/all'); 
  if (subjectsData) {
    const subjects = Array.isArray(subjectsData) ? subjectsData : (subjectsData.content || []);
    console.log(`\n📘 Found ${subjects.length} subjects. Syncing subject questions...`);
    for (const subject of subjects) {
      const subjectId = subject.subjectId || subject.id;
      if (subjectId) {
        await fetchAndSave(`/questions/subject/${subjectId}`);
      }
    }
  }

  console.log('\n✨ API Sync Completed!');
}

runSync();
