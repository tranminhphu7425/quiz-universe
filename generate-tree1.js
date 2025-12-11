import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);



const ROOT_DIR = path.join(__dirname, "public", "resources");
const OUTPUT_FILE = path.join(__dirname, "public", "files.json");

// Lấy phần mở rộng file, bỏ dấu chấm
function getFileType(fileName) {
    const ext = path.extname(fileName).toLowerCase().replace(".", "");
    return ext || "unknown";
}

function scanFolder(folderPath, relativePath = "/resources") {
    const items = fs.readdirSync(folderPath, { withFileTypes: true });

    const children = items.map((item) => {
        const fullPath = path.join(folderPath, item.name);
        const itemRelativePath = path.join(relativePath, item.name).replace(/\\/g, "/");

        if (item.isDirectory()) {
            return {
                name: item.name,
                type: "folder",
                path: itemRelativePath,
                children: scanFolder(fullPath, itemRelativePath),
            };
        } else {
            return {
                name: item.name,
                type: getFileType(item.name),
                path: itemRelativePath,
            };
        }
    });

    return children;
}

function buildTree() {
    const folders = fs.readdirSync(ROOT_DIR, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => {
            const folderName = dirent.name;
            const folderPath = path.join(ROOT_DIR, folderName);
            const relativeFolderPath = `/resources/${folderName}`;

            return {
                name: folderName,
                path: relativeFolderPath,
                children: scanFolder(folderPath, relativeFolderPath),
            };
        });

    const result = { folders };
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2), "utf-8");
    console.log("✅ Đã tạo xong resources-tree.json");
}

buildTree();