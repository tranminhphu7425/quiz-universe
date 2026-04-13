const axios = require("axios");
const fs = require("fs");
const path = require("path");

const API_KEY = "AIzaSyD4LBXFHZ3bPAHmA3YNY8A7g5fSIXw7Hhk";
const FOLDER_URL = "https://drive.google.com/drive/folders/1NqnO17ZVH91Np0aCKXvBwIMOowt5bh6c?usp=sharing";

/** Lấy ID folder từ link Google Drive */
function extractId(url) {
    const match = url.match(/[-\w]{25,}/);
    return match ? match[0] : null;
}

/** Lấy danh sách file/folder */
async function listFiles(parentId) {
    const q = `'${parentId}' in parents and trashed=false`;
    const url =
        "https://www.googleapis.com/drive/v3/files" +
        `?q=${encodeURIComponent(q)}&fields=files(id,name,mimeType)&key=${API_KEY}`;

    try {
        const res = await axios.get(url);
        return res.data.files || [];
    } catch (error) {
        console.error(`❌ Lỗi khi đọc folder ${parentId}:`, error.response ? error.response.data : error.message);
        return [];
    }
}

/** Build cây thư mục (đệ quy) */
async function buildTree(folderId, basePath = "") {
    const files = await listFiles(folderId);
    const children = [];

    for (const f of files) {
        const currentPath = `${basePath}/${f.name}`;

        if (f.mimeType === "application/vnd.google-apps.folder") {
            // In ra tiến trình để người dùng không cảm thấy bị treo
            console.log(`📂 Đang quét: ${currentPath}`);
            
            const subChildren = await buildTree(f.id, currentPath);
            children.push({
                name: f.name,
                type: "folder",
                path: currentPath,
                driveId: f.id,
                children: subChildren
            });
        } else {
            children.push({
                name: f.name,
                type: getExt(f.name),
                path: currentPath,
                link: `https://drive.google.com/open?id=${f.id}`
            });
        }
    }

    return children;
}

/** Lấy extension file */
function getExt(name) {
    const parts = name.split(".");
    return parts.length > 1 ? parts.pop().toLowerCase() : "unknown";
}

/** Chạy chương trình chính */
async function main() {
    console.log("🚀 Bắt đầu quét Google Drive... (Vui lòng đợi, quá trình này có thể mất vài phút)");
    
    const folderId = extractId(FOLDER_URL);
    if (!folderId) return console.error("❌ Không tìm thấy ID trong URL!");

    const tree = await buildTree(folderId);

    // Xuất danh sách thư mục con vào key 'folders'
    const output = {
        folders: tree
    };

    // Đảm bảo thư mục public tồn tại
    const publicDir = path.join(process.cwd(), "public");
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
    }

    const filePath = path.join(publicDir, "files.json");
    fs.writeFileSync(filePath, JSON.stringify(output, null, 2), "utf8");

    console.log("\n✅ Hoàn thành! Đã tạo file:", filePath);
    console.log("📊 Bây giờ bạn có thể dùng dữ liệu này để hiển thị trên giao diện.");
}

main();