import fs from 'fs';
import readline from 'readline';

// Cấu hình
const inputFile = 'subjects.txt';      // File đầu vào
const outputFile = 'update_subjects.sql'; // File đầu ra
const tableName = 'subjects';
const batchSize = 500; // Số lượng bản ghi mỗi lần insert

// Hàm escape string cho MySQL
function escapeString(str) {
    if (str === null || str === undefined) return 'NULL';
    return "'" + str.replace(/\\/g, '\\\\')
                    .replace(/'/g, "\\'")
                    .replace(/"/g, '\\"')
                    .replace(/\n/g, '\\n')
                    .replace(/\r/g, '\\r') + "'";
}

// Hàm xử lý một dòng dữ liệu
function parseLine(line) {
    // Bỏ qua dòng trống
    if (!line.trim()) return null;
    
    // Tách theo tab
    const parts = line.split('\t');
    if (parts.length < 3) return null;
    
    const code = parts[0]?.trim();
    const name = parts[1]?.trim();
    const credit = parseInt(parts[2]?.trim(), 10);
    
    if (!code || !name || isNaN(credit)) return null;
    
    return { code, name, credit };
}

// Hàm tạo câu lệnh INSERT ... ON DUPLICATE KEY UPDATE
function generateInsertStatement(records) {
    if (records.length === 0) return '';
    
    let sql = `INSERT INTO \`${tableName}\` (\`code\`, \`name\`, \`credit\`) VALUES\n`;
    const values = [];
    
    for (const record of records) {
        values.push(`(${escapeString(record.code)}, ${escapeString(record.name)}, ${record.credit})`);
    }
    
    sql += values.join(',\n');
    sql += `\nON DUPLICATE KEY UPDATE \`name\` = VALUES(\`name\`), \`credit\` = VALUES(\`credit\`);\n\n`;
    
    return sql;
}

// Hàm đọc và xử lý file
async function processFile() {
    console.log(`Đang đọc file: ${inputFile}`);
    
    const fileStream = fs.createReadStream(inputFile, { encoding: 'utf8' });
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    
    const records = [];
    let lineNumber = 0;
    let skippedLines = 0;
    
    for await (const line of rl) {
        lineNumber++;
        // Bỏ qua dòng header nếu có
        if (lineNumber === 1 && (line.includes('Mã học phần') || line.includes('Tên học phần'))) {
            console.log('Đã bỏ qua dòng header');
            continue;
        }
        
        const record = parseLine(line);
        if (record) {
            records.push(record);
        } else if (line.trim()) {
            skippedLines++;
            console.log(`Dòng ${lineNumber} không hợp lệ, đã bỏ qua: ${line.substring(0, 50)}...`);
        }
    }
    
    console.log(`Đã đọc xong. Tổng số bản ghi hợp lệ: ${records.length}`);
    if (skippedLines > 0) console.log(`Số dòng bị bỏ qua: ${skippedLines}`);
    
    // Ghi ra file SQL theo từng batch
    const outputStream = fs.createWriteStream(outputFile, { encoding: 'utf8' });
    
    // Thêm header cho file SQL
    outputStream.write(`-- =====================================================\n`);
    outputStream.write(`-- File: ${outputFile}\n`);
    outputStream.write(`-- Generated: ${new Date().toLocaleString()}\n`);
    outputStream.write(`-- Table: ${tableName}\n`);
    outputStream.write(`-- Total records: ${records.length}\n`);
    outputStream.write(`-- =====================================================\n\n`);
    outputStream.write(`SET NAMES utf8mb4;\n`);
    outputStream.write(`SET FOREIGN_KEY_CHECKS = 0;\n\n`);
    
    // Xử lý theo batch
    for (let i = 0; i < records.length; i += batchSize) {
        const batch = records.slice(i, i + batchSize);
        const sql = generateInsertStatement(batch);
        outputStream.write(sql);
        console.log(`Đã xử lý batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(records.length / batchSize)}`);
    }
    
    outputStream.write(`SET FOREIGN_KEY_CHECKS = 1;\n`);
    outputStream.end();
    
    console.log(`\n✅ Đã tạo file SQL thành công: ${outputFile}`);
    console.log(`📊 Tổng số bản ghi: ${records.length}`);
    console.log(`💡 Câu lệnh sử dụng ON DUPLICATE KEY UPDATE - nếu mã code đã tồn tại, sẽ cập nhật tên và tín chỉ`);
}

// Chạy chương trình
processFile().catch(console.error);