import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, '../src');

const iconMapping = {
  "Activity": "MdLocalActivity",
  "AlertCircle": "MdErrorOutline",
  "AlertTriangle": "MdWarning",
  "AlignLeft": "MdFormatAlignLeft",
  "ArrowLeft": "MdArrowBack",
  "ArrowRight": "MdArrowForward",
  "ArrowRightCircle": "MdArrowCircleRight",
  "Award": "MdEmojiEvents",
  "BarChart": "MdBarChart",
  "BarChart3": "MdInsertChartOutlined",
  "Bell": "MdNotifications",
  "Book": "MdMenuBook",
  "BookCheck": "MdLibraryAddCheck",
  "BookMarked": "MdBookmark",
  "BookOpen": "MdAutoStories",
  "Bookmark": "MdBookmarkBorder",
  "Brain": "MdPsychology",
  "Briefcase": "MdWork",
  "Bug": "MdBugReport",
  "Building2": "MdBusiness",
  "Calculator": "MdCalculate",
  "Calendar": "MdCalendarToday",
  "CalendarDays": "MdCalendarMonth",
  "CheckCircle": "MdCheckCircle",
  "CheckCircle2": "MdCheckCircleOutline",
  "ChevronDown": "MdExpandMore",
  "ChevronLeft": "MdChevronLeft",
  "ChevronRight": "MdChevronRight",
  "ChevronUp": "MdExpandLess",
  "ClipboardCheck": "MdAssignmentTurnedIn",
  "ClipboardList": "MdAssignment",
  "Clock": "MdAccessTime",
  "Code": "MdCode",
  "Cookie": "MdCookie",
  "Copy": "MdContentCopy",
  "Cpu": "MdMemory",
  "CreditCard": "MdCreditCard",
  "Database": "MdStorage",
  "DollarSign": "MdAttachMoney",
  "Download": "MdDownload",
  "Edit": "MdEdit",
  "Edit2": "MdModeEdit",
  "Edit3": "MdEditNote",
  "ExternalLink": "MdOpenInNew",
  "Eye": "MdVisibility",
  "EyeOff": "MdVisibilityOff",
  "File": "MdInsertDriveFile",
  "FileJson": "MdDataObject",
  "FilePlus2": "MdNoteAdd",
  "FileQuestion": "MdHelpCenter",
  "FileText": "MdDescription",
  "Filter": "MdFilterList",
  "Fingerprint": "MdFingerprint",
  "Flag": "MdFlag",
  "Focus": "MdCenterFocusStrong",
  "Folder": "MdFolder",
  "FolderOpen": "MdFolderOpen",
  "FolderPlus": "MdCreateNewFolder",
  "Ghost": "MdFace",
  "Github": "MdCode",
  "Globe": "MdPublic",
  "GraduationCap": "MdSchool",
  "Grid": "MdGridView",
  "GripVertical": "MdDragIndicator",
  "Hash": "MdNumbers",
  "Heart": "MdFavoriteBorder",
  "HeartHandshake": "MdHandshake",
  "HelpCircle": "MdHelpOutline",
  "History": "MdHistory",
  "Home": "MdHome",
  "Image": "MdImage",
  "Info": "MdInfoOutline",
  "KeyRound": "MdVpnKey",
  "Layers": "MdLayers",
  "LayoutDashboard": "MdDashboard",
  "LayoutGrid": "MdGridView",
  "Library": "MdLocalLibrary",
  "Lightbulb": "MdLightbulbOutline",
  "Link": "MdLink",
  "List": "MdList",
  "ListChecks": "MdChecklist",
  "Loader2": "MdLoop",
  "Lock": "MdLockOutline",
  "LogIn": "MdLogin",
  "LogOut": "MdLogout",
  "Mail": "MdMailOutline",
  "MapPin": "MdLocationOn",
  "Menu": "MdMenu",
  "MessageCircle": "MdChatBubbleOutline",
  "MessageSquare": "MdChat",
  "MoreVertical": "MdMoreVert",
  "Palette": "MdPalette",
  "PenTool": "MdBrush",
  "Phone": "MdPhone",
  "PieChart": "MdPieChartOutline",
  "PlayCircle": "MdPlayCircleOutline",
  "Plus": "MdAdd",
  "PlusCircle": "MdAddCircleOutline",
  "Printer": "MdPrint",
  "Quote": "MdFormatQuote",
  "RefreshCcw": "MdRefresh",
  "RefreshCw": "MdSync",
  "Rocket": "MdRocketLaunch",
  "RotateCcw": "MdReplay",
  "Save": "MdSave",
  "Scale": "MdBalance",
  "ScrollText": "MdReceiptLong",
  "Search": "MdSearch",
  "Send": "MdSend",
  "Settings": "MdSettings",
  "Settings2": "MdTune",
  "Share2": "MdShare",
  "Shield": "MdShield",
  "ShieldAlert": "MdGppMaybe",
  "ShieldCheck": "MdGppGood",
  "Shuffle": "MdShuffle",
  "Smartphone": "MdSmartphone",
  "SortAsc": "MdArrowUpward",
  "SortDesc": "MdArrowDownward",
  "Sparkles": "MdAutoAwesome",
  "Star": "MdStarOutline",
  "Tag": "MdLocalOffer",
  "Target": "MdAdsClick",
  "ThumbsUp": "MdThumbUpOffAlt",
  "TimerReset": "MdTimer",
  "ToggleLeft": "MdToggleOff",
  "ToggleRight": "MdToggleOn",
  "Trash2": "MdDeleteOutline",
  "TrendingUp": "MdTrendingUp",
  "Trophy": "MdEmojiEvents",
  "Twitter": "MdForum",
  "Type": "MdTitle",
  "Upload": "MdUpload",
  "UploadCloud": "MdCloudUpload",
  "User": "MdPersonOutline",
  "User2": "MdPerson",
  "UserCircle": "MdAccountCircle",
  "UserCog": "MdManageAccounts",
  "UserPlus": "MdPersonAddAlt",
  "Users": "MdPeopleOutline",
  "Users2": "MdPeople",
  "Volume2": "MdVolumeUp",
  "Wand2": "MdAutoFixHigh",
  "X": "MdClose",
  "XCircle": "MdHighlightOff",
  "Zap": "MdFlashOn"
};

let filesUpdated = 0;

function processFile(fullPath) {
    let content = fs.readFileSync(fullPath, 'utf8');
    const importRegex = /import\s+{([^}]+)}\s+from\s+['"]lucide-react['"]/g;
    let match;
    let newContent = content;
    let modified = false;

    while ((match = importRegex.exec(content)) !== null) {
        const originalImportBlock = match[0];
        const innerContent = match[1];
        
        // Parse the inner parts
        const items = innerContent.split(',').map(s => s.trim()).filter(s => s);
        const newItems = items.map(item => {
            let originalName = item;
            let alias = item;
            if (item.includes(' as ')) {
                const parts = item.split(' as ');
                originalName = parts[0].trim();
                alias = parts[1].trim();
            } else {
                alias = originalName;
            }
            
            const mdIcon = iconMapping[originalName];
            if (!mdIcon) {
                console.warn(`WARNING: Mapping not found for ${originalName} in file ${fullPath}`);
                return item; // fallback to original (which will fail if we change the library, but we'll know)
            }
            return `${mdIcon} as ${alias}`;
        });
        
        // Format the new import string
        let newImportBlock = `import {\n  ${newItems.join(',\n  ')}\n} from 'react-icons/md'`;
        
        newContent = newContent.replace(originalImportBlock, newImportBlock);
        modified = true;
    }
    
    if (modified) {
        fs.writeFileSync(fullPath, newContent, 'utf8');
        filesUpdated++;
    }
}

function scanDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            scanDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            processFile(fullPath);
        }
    }
}

scanDir(srcDir);
console.log(`Updated ${filesUpdated} files.`);
