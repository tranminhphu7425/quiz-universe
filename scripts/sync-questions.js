import fs from 'fs';
import path from 'path';

const API_QUESTIONBANKS_URL = 'http://localhost:8080/api/question-banks';
const API_QUESTIONS_BASE = 'http://localhost:8080/api/questions/question-bank';
const DATA_DIR = './public/data';

async function syncAllQuestions() {
  try {
    // 1. Ensure data directory exists
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    // 2. Fetch all question banks
    console.log('🔍 Fetching question banks list...');
    const banksResponse = await fetch(API_QUESTIONBANKS_URL);
    if (!banksResponse.ok) {
      throw new Error(`Failed to fetch banks: ${banksResponse.statusText}`);
    }
    
    const banksData = await banksResponse.json();
    const banks = banksData.content || [];

    if (banks.length === 0) {
      console.log('⚠️ No question banks found on server.');
      return;
    }

    console.log(`🚀 Found ${banks.length} question banks. Starting sync...`);

    // 3. For each bank, fetch and save its questions
    for (const bank of banks) {
      const bankId = bank.bankId;
      const fileName = `questionBank${bankId}.json`;
      const filePath = path.join(DATA_DIR, fileName);
      const url = `${API_QUESTIONS_BASE}/${bankId}`;

      console.log(`⏳ [${bankId}] Syncing questions for: "${bank.name}"...`);

      try {
        const qResponse = await fetch(url);
        if (!qResponse.ok) {
          console.error(`❌ Failed to fetch questions for Bank ${bankId}: ${qResponse.statusText}`);
          continue;
        }

        const questions = await qResponse.json();
        
        // Write data
        fs.writeFileSync(filePath, JSON.stringify(questions, null, 2), 'utf8');
        console.log(`✅ [${bankId}] Saved to ${fileName} (${questions.length} questions).`);
      } catch (err) {
        console.error(`❌ Error syncing Bank ${bankId}:`, err.message);
      }
    }

    console.log('\n✨ All questions synced successfully!');
  } catch (err) {
    console.error('💥 Critical error during sync:', err.message);
  }
}

// Execute
syncAllQuestions();
