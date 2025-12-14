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

    const res = await axios.get(url);
    return res.data.files;
}

/** Build cây thư mục */
async function buildTree(folderId, basePath = "") {
    const files = await listFiles(folderId);

    const folderTree = {
        name: "",
        type: "folder",
        path: "",
        children: []
    };

    for (const f of files) {
        const currentPath = `${basePath}/${f.name}`;

        if (f.mimeType === "application/vnd.google-apps.folder") {
            const subTree = await buildTree(f.id, currentPath);

            subTree.name = f.name;
            subTree.type = "folder";
            subTree.path = currentPath;

            folderTree.children.push(subTree);
        } else {
            folderTree.children.push({
                name: f.name,
                type: getExt(f.name),
                path: currentPath,
                link: `https://drive.google.com/open?id=${f.id}`
            });
        }
    }

    return folderTree;
}

/** Lấy extension file */
function getExt(name) {
    const parts = name.split(".");
    return parts.length > 1 ? parts.pop().toLowerCase() : "unknown";
}

/** Chạy chương trình */
async function main() {
    const folderId = extractId(FOLDER_URL);
    if (!folderId) return console.error("❌ Không tìm thấy ID trong URL!");

    const tree = await buildTree(folderId);

    // 👉 Xuất thẳng danh sách children, không tạo node gốc
    const output = {
        folders: tree.children
    };

    // ---- Xuất ra file public/files.json ----
    const filePath = path.join(process.cwd(), "public/files.json");
    fs.writeFileSync(filePath, JSON.stringify(output, null, 2), "utf8");

    console.log("✅ Đã tạo file:", filePath);
}

main();