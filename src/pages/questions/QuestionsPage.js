"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = QuestionsPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var framer_motion_1 = require("framer-motion");
var lucide_react_1 = require("lucide-react");
// ====== Demo data (bạn có thể truyền qua props hoặc fetch API) ======
var demoQuestions = [
    {
        "id": 3,
        "stem": "Khái niệm tư tưởng Hồ Chí Minh lần đầu tiên được Đảng ta trình bày tại \nĐại hội Đảng toàn quốc lần thứ mấy?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:54",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 9,
                "label": "A",
                "content": "Đại hội Đảng Toàn Quốc lần thứ VI.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 10,
                "label": "B",
                "content": "Đại hội Đảng Toàn Quốc lần thứ VII.",
                "isCorrect": true,
                "sortOrder": 2
            },
            {
                "id": 11,
                "label": "C",
                "content": "Đại hội Đảng Toàn Quốc lần thứ IX.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 12,
                "label": "D",
                "content": "Đại hội Đảng Toàn Quốc lần thứ XI.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 4,
        "stem": "Tại Đại hội Đảng toàn quốc lần thứ mấy Đảng ta khẳng định: “Đảng lấy chủ \nnghĩa Marx-Lenin và tư tưởng Hồ Chí Minh làm nền tảng tư tưởng và kim chỉ nam \ncho hành động”?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:54",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 13,
                "label": "A",
                "content": "Đại hội Đảng Toàn Quốc lần thứ VI.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 14,
                "label": "B",
                "content": "Đại hội Đảng Toàn Quốc lần thứ VII.",
                "isCorrect": true,
                "sortOrder": 2
            },
            {
                "id": 15,
                "label": "C",
                "content": "Đại hội Đảng Toàn Quốc lần thứ IX.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 16,
                "label": "D",
                "content": "Đại hội Đảng Toàn Quốc lần thứ XI.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 5,
        "stem": "Đại hội Đảng toàn quốc lần thứ VII khẳng định:",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:54",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 17,
                "label": "A",
                "content": "“Đảng lấy chủ nghĩa Marx-Lenin và tư tưởng Hồ Chí Minh làm nền tảng tư tưởng cho\nhành động”.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 18,
                "label": "B",
                "content": "“Đảng lấy chủ nghĩa Marx-Lenin và tư tưởng Hồ Chí Minh làm kim chỉ nam cho hành\nđộng”.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 19,
                "label": "C",
                "content": "“Đảng lấy chủ nghĩa Marx-Lenin và tư tưởng Hồ Chí Minh làm nền tảng tư \ntưởng và kim chỉ nam cho hành động”.",
                "isCorrect": true,
                "sortOrder": 3
            },
            {
                "id": 20,
                "label": "D",
                "content": "“Đảng lấy tư tưởng Hồ Chí Minh làm nền tảng tư tưởng và kim chỉ nam cho hành \nđộng”",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 6,
        "stem": "Nguồn gốc tư tưởng lý luận của tư tưởng Hồ Chí Minh là:",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:54",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 21,
                "label": "A",
                "content": "Giá trị văn hóa dân tộc; tinh hoa văn hóa phương Tây; chủ nghĩa Marx-Lenin.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 22,
                "label": "B",
                "content": "Chủ nghĩa yêu nước Việt Nam; tinh hoa văn hóa nhân loại; chủ nghĩa Marx-Lenin.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 23,
                "label": "C",
                "content": "Chủ nghĩa yêu nước Việt Nam; tinh hoa văn hóa phương Đông; chủ nghĩa Marx-\nLenin.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 24,
                "label": "D",
                "content": "Giá trị văn hóa dân tộc; tinh hoa văn hóa nhân loại; chủ nghĩa Marx-Lenin.\r",
                "isCorrect": true,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 7,
        "stem": "Giá trị, ý nghĩa, sức hấp dẫn, sức sống lâu bền của tư tưởng Hồ Chí Minh là:",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:54",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 25,
                "label": "A",
                "content": "Tài sản tinh thần to lớn của nhân loại, mãi mãi soi đường cho sự nghiệp cách mạng \ngiành thắng lợi.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 26,
                "label": "B",
                "content": "Tài sản vật chất to lớn của Đảng và dân tộc, mãi mãi soi đường cho sự nghiệp cách \nmạng của nhân dân ta giành thắng lợi.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 27,
                "label": "C",
                "content": "Tài sản tinh thần to lớn của Đảng và dân tộc, mãi mãi soi đường cho sự nghiệp \ncách mạng của nhân dân ta giành thắng lợi.",
                "isCorrect": true,
                "sortOrder": 3
            },
            {
                "id": 28,
                "label": "D",
                "content": "Tài sản tinh thần to lớn của nhân loại, làm phong phú thêm kho tàng lý luận của Chủ \nnghĩa Marx-Lenin, mãi mãi soi đường cho sự nghiệp cách mạng của nhân dân ta giành \nthắng lợi.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 8,
        "stem": "Kiên trì con đường Hồ Chí Minh đã lựa chọn nghĩa là:",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:54",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 29,
                "label": "A",
                "content": "Giữ vững nền độc lập dân tộc.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 30,
                "label": "B",
                "content": "Thực hiện triệt để cuộc cách mạng dân tộc dân chủ nhân dân.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 31,
                "label": "C",
                "content": "Thực hiện mục tiêu độc lập gắn liền với chủ nghĩa xã hội.",
                "isCorrect": true,
                "sortOrder": 3
            },
            {
                "id": 32,
                "label": "D",
                "content": "Hội nhập với nền kinh tế thế giới.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 9,
        "stem": "Về Cao Bằng, Nguyễn Ái Quốc đã dùng bí danh gì để hoạt động:",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:54",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 33,
                "label": "A",
                "content": "Lý Thụy",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 34,
                "label": "B",
                "content": "Tống Văn Sơ",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 35,
                "label": "C",
                "content": "Chín Thầu",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 36,
                "label": "D",
                "content": "Già Thu hoặc Ông Ké",
                "isCorrect": true,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 10,
        "stem": "Tư tưởng Hồ Chí Minh có vị trí như thế nào trong hệ thống tư tưởng của \nĐảng Cộng sản Việt Nam:",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:54",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 37,
                "label": "A",
                "content": "Là một bộ phận trong hệ thống tư tưởng của Đảng.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 38,
                "label": "B",
                "content": "Là một bộ phận quan trọng trong hệ thống tư tưởng của Đảng.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 39,
                "label": "C",
                "content": "Là một bộ phận rất quan trọng trong hệ thống tư tưởng của Đảng.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 40,
                "label": "D",
                "content": "Là một bộ phận nền tảng, kim chỉ nam cho hành động của Đảng.\r",
                "isCorrect": true,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 11,
        "stem": "Hồ Chí Minh đã nêu mấy chuẩn mực đạo đức của người Việt Nam?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:54",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 41,
                "label": "A",
                "content": "4 chuẩn mực.",
                "isCorrect": true,
                "sortOrder": 1
            },
            {
                "id": 42,
                "label": "B",
                "content": "5 chuẩn mực",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 43,
                "label": "C",
                "content": "6 chuẩn mực",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 44,
                "label": "D",
                "content": "3 chuẩn bị.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 12,
        "stem": "Xã hội Việt Nam cuối thế kỷ XIX – đầu thế kỷ XX có 2 mâu thuẫn cơ bản \nnào?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:54",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 45,
                "label": "A",
                "content": "Mâu thuẫn giữa nông dân với địa chủ và giữa công nhân với tư sản.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 46,
                "label": "B",
                "content": "Mâu thuẫn giữa nông dân với địa chủ và giữa dân tộc với thực dân Pháp.",
                "isCorrect": true,
                "sortOrder": 2
            },
            {
                "id": 47,
                "label": "C",
                "content": "Mâu thuẫn giữa công nhân với tư sản và giữa dân tộc với thực dân Pháp.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 48,
                "label": "D",
                "content": "Mâu thuẫn giữa công nhân với tư sản.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 13,
        "stem": "Xã hội Việt Nam cuối thế kỷ XIX – đầu thế kỷ XX có 2 mâu thuẫn chủ yếu \nnào?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:54",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 49,
                "label": "A",
                "content": "Mâu thuẫn giữa nông dân với địa chủ.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 50,
                "label": "B",
                "content": "Mâu thuẫn giữa tư sản với tiểu tư sản.\r",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 51,
                "label": "C",
                "content": "Mâu thuẫn giữa toàn thể dân tộc với thực dân Pháp.",
                "isCorrect": true,
                "sortOrder": 3
            },
            {
                "id": 52,
                "label": "D",
                "content": "Mâu thuẫn giữa công nhân với tư sản.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 14,
        "stem": "Trước sự xâm lược của Thực dân Pháp, phong trào đấu tranh nào sau đây \ntheo hệ tư tưởng phong kiến?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:54",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 53,
                "label": "A",
                "content": "Phong trào Cần Vương.",
                "isCorrect": true,
                "sortOrder": 1
            },
            {
                "id": 54,
                "label": "B",
                "content": "Phong trào Đông Du.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 55,
                "label": "C",
                "content": "Phong trào Duy Tân.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 56,
                "label": "D",
                "content": "Phong trào Đông Kinh Nghĩa Thục.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 15,
        "stem": "Trước sự xâm lược của thực dân Pháp, phong trào đấu tranh nào sau đây \ntheo khuynh hướng dân chủ tư sản?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:54",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 57,
                "label": "A",
                "content": "Khởi nghĩa Ba Đình",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 58,
                "label": "B",
                "content": "Khởi nghĩa nông dân Yên Thế",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 59,
                "label": "C",
                "content": "Phong trào Đông Du",
                "isCorrect": true,
                "sortOrder": 3
            },
            {
                "id": 60,
                "label": "D",
                "content": "Khởi nghĩa Hương Khê",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 16,
        "stem": "Sự thất bại của phong trào yêu nước chống Pháp cuối thế kỷ XIX – đầu thế \nkỷ XX cho thấy cách mạng Việt Nam lâm vào tình trạng khủng hoảng sâu sắc về:",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:55",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 61,
                "label": "A",
                "content": "Kinh tế",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 62,
                "label": "B",
                "content": "Văn hóa",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 63,
                "label": "C",
                "content": "Đường lối",
                "isCorrect": true,
                "sortOrder": 3
            },
            {
                "id": 64,
                "label": "D",
                "content": "Tiềm lực quân sự",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 17,
        "stem": "Nguyễn Sinh Cung đổi tên là Nguyễn Tất Thành năm nào?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:55",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 65,
                "label": "A",
                "content": "1901",
                "isCorrect": true,
                "sortOrder": 1
            },
            {
                "id": 66,
                "label": "B",
                "content": "1905",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 67,
                "label": "C",
                "content": "1908",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 68,
                "label": "D",
                "content": "1911",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 18,
        "stem": "Nguyễn Sinh Cung cùng anh theo cha, mẹ đến Huế vào năm nào?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:55",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 69,
                "label": "A",
                "content": "Năm 1895",
                "isCorrect": true,
                "sortOrder": 1
            },
            {
                "id": 70,
                "label": "B",
                "content": "Năm 1898\r",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 71,
                "label": "C",
                "content": "Năm 1901",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 72,
                "label": "D",
                "content": "Năm 1905",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 19,
        "stem": "Nguyễn Tất Thành cùng anh Nguyễn Tấn Đạt đến Huế vào năm nào?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:55",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 73,
                "label": "A",
                "content": "Năm 1805",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 74,
                "label": "B",
                "content": "Năm 1906",
                "isCorrect": true,
                "sortOrder": 2
            },
            {
                "id": 75,
                "label": "C",
                "content": "Năm 1907",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 76,
                "label": "D",
                "content": "Năm 1908",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 20,
        "stem": "Nguyễn Tất Thành đầu tiên tiếp xúc với khẩu hiệu “TỰ DO – BÌNH ĐẲNG \n– BÁC ÁI” khi nào?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:55",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 77,
                "label": "A",
                "content": "Đến Huế lần thứ nhất",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 78,
                "label": "B",
                "content": "Đến Huế lần thứ hai",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 79,
                "label": "C",
                "content": "Khi học ở Trường tiểu học Pháp – bản xứ ở thành phố Vinh năm 1905",
                "isCorrect": true,
                "sortOrder": 3
            },
            {
                "id": 80,
                "label": "D",
                "content": "Đến Pháp năm 1911",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 21,
        "stem": "Động lực thôi thúc chàng thanh niên Nguyễn Tất Thành sang phương Tây \nđể tìm đường cứu nước là:",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:55",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 81,
                "label": "A",
                "content": "Khẩu hiệu “Tự do – bình đẳng – bác ai” trong cuộc đại cách mạng Pháp",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 82,
                "label": "B",
                "content": "Lòng yêu nước, thương dân",
                "isCorrect": true,
                "sortOrder": 2
            },
            {
                "id": 83,
                "label": "C",
                "content": "Thắng lợi của cuộc cách mạng tháng 10 Nga",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 84,
                "label": "D",
                "content": "Sự phát triển của nền kinh tế phương Tây",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 22,
        "stem": "Năm 1911 khi ra đi tìm đường Cứu nước Chủ tịch Hồ Chí Minh có tên là \ngì?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:55",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 85,
                "label": "A",
                "content": "Nguyễn Sinh Cung",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 86,
                "label": "B",
                "content": "Nguyễn Tất Thành\r",
                "isCorrect": true,
                "sortOrder": 2
            },
            {
                "id": 87,
                "label": "C",
                "content": "Nguyễn Ái Quốc",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 88,
                "label": "D",
                "content": "Nguyễn Văn Ba",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 23,
        "stem": "Nguyễn Tất Thành lấy tên là Nguyễn Ái Quốc khi nào?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:55",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 89,
                "label": "A",
                "content": "Khi lên tàu từ bến Nhà Rồng năm 1911.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 90,
                "label": "B",
                "content": "Khi viết Yêu sách 8 điểm gửi Hội nghị Versailles năm 1919\r",
                "isCorrect": true,
                "sortOrder": 2
            },
            {
                "id": 91,
                "label": "C",
                "content": "Khi tham gia sáng lập Đảng Cộng Sản Pháp 1920",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 92,
                "label": "D",
                "content": "Khi dự Đại hội lần thứ V Quốc tế cộng sản ở Liên Xô 1924",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 24,
        "stem": "Nguyễn Ái Quốc lấy tên là Hồ Chí Minh khi nào?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:55",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 93,
                "label": "A",
                "content": "Khi trở về nước năm 1941",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 94,
                "label": "B",
                "content": "Khi bị quân Tưởng Giới Thạch bắt 1942",
                "isCorrect": true,
                "sortOrder": 2
            },
            {
                "id": 95,
                "label": "C",
                "content": "Khi viết Tuyên ngôn độc lập năm 1945",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 96,
                "label": "D",
                "content": "Khi viết Di chúc năm 1945",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 25,
        "stem": "Hồ Chí Minh đã nêu mấy nguyên tắc xây dựng đạo đức?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:55",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 97,
                "label": "A",
                "content": "2 nguyên tắc",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 98,
                "label": "B",
                "content": "3 nguyên tắc",
                "isCorrect": true,
                "sortOrder": 2
            },
            {
                "id": 99,
                "label": "C",
                "content": "4 nguyên tắc",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 100,
                "label": "D",
                "content": "5 nguyên tắc",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 26,
        "stem": "Với Hồ Chí Minh, yếu tố lúc đầu đưa Người tin theo Lenin, tin theo Quốc tế\nthứ ba là:",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:55",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 101,
                "label": "A",
                "content": "Vốn hiểu biết sâu rộng cùng với năng lực trí tuệ sâu sắc của bản thân.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 102,
                "label": "B",
                "content": "Chủ nghĩa yêu nước Việt Nam",
                "isCorrect": true,
                "sortOrder": 2
            },
            {
                "id": 103,
                "label": "C",
                "content": "Bản chất khoa học và cách mạng của chủ nghĩa Marx-Lenin",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 104,
                "label": "D",
                "content": "Khát vọng giải phóng dân tộc",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 27,
        "stem": "Nguyễn Ái Quốc gia nhập Đảng Xã hội Pháp khoảng thời gian nào?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:55",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 105,
                "label": "A",
                "content": "Cuối năm 1917",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 106,
                "label": "B",
                "content": "Năm 1918",
                "isCorrect": true,
                "sortOrder": 2
            },
            {
                "id": 107,
                "label": "C",
                "content": "Năm 1919",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 108,
                "label": "D",
                "content": "Cuối năm 1920\r",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 28,
        "stem": "Thay mặt những người Việt Nam yêu nước tại Pháp, Nguyễn Ái Quốc viết \nYêu sách của nhân dân An Nam gửi đến Hội nghị Versailles vào tháng, năm nào?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:55",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 109,
                "label": "A",
                "content": "Tháng 6/1919",
                "isCorrect": true,
                "sortOrder": 1
            },
            {
                "id": 110,
                "label": "B",
                "content": "Tháng 7/1919",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 111,
                "label": "C",
                "content": "Tháng 6/1920",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 112,
                "label": "D",
                "content": "Tháng 7/1920",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 29,
        "stem": "Thay mặt những người Việt Nam yêu nước tại Pháp, Nguyễn Ái Quốc gửi \nđến Hội nghị Versailles bản yêu sách của nhân dân An Nam gồm mấy điểm?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:55",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 113,
                "label": "A",
                "content": "6 điểm",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 114,
                "label": "B",
                "content": "7 điểm",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 115,
                "label": "C",
                "content": "8 điểm",
                "isCorrect": true,
                "sortOrder": 3
            },
            {
                "id": 116,
                "label": "D",
                "content": "9 điểm",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 30,
        "stem": "Nguyễn Ái Quốc đọc “Sơ thảo lần thứ nhất Luận cương về vấn đề dân tộc \nvà vấn dề thuộc địa” của Lenin, tìm thấy con đường giải phóng dân tộc Việt Nam \nvào ngày tháng năm nào?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:55",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 117,
                "label": "A",
                "content": "Tháng 6/1920",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 118,
                "label": "B",
                "content": "Tháng 7/1920",
                "isCorrect": true,
                "sortOrder": 2
            },
            {
                "id": 119,
                "label": "C",
                "content": "Tháng 9/1920",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 120,
                "label": "D",
                "content": "Tháng 12/1920",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 31,
        "stem": "Nguyễn Ái Quốc tham dự Đại hội Tuors, tán thành Quốc tế 3, tham gia \nthành lập Đảng cộng sản Pháp khi nào?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:55",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 121,
                "label": "A",
                "content": "Tháng 12/1918",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 122,
                "label": "B",
                "content": "Tháng 12/1919",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 123,
                "label": "C",
                "content": "Tháng 12/1920",
                "isCorrect": true,
                "sortOrder": 3
            },
            {
                "id": 124,
                "label": "D",
                "content": "Tháng 12/1921",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 32,
        "stem": "Nguyễn Ái Quốc đến Mỹ năm nào?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:55",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 125,
                "label": "A",
                "content": "Năm 1911",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 126,
                "label": "B",
                "content": "Năm 1912",
                "isCorrect": true,
                "sortOrder": 2
            },
            {
                "id": 127,
                "label": "C",
                "content": "Năm 1913",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 128,
                "label": "D",
                "content": "Năm 1914",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 33,
        "stem": "Nguyễn Ái Quốc đến Anh năm nào?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:55",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 129,
                "label": "A",
                "content": "Năm 1911",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 130,
                "label": "B",
                "content": "Năm 1912",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 131,
                "label": "C",
                "content": "Năm 1913",
                "isCorrect": true,
                "sortOrder": 3
            },
            {
                "id": 132,
                "label": "D",
                "content": "Năm 1914",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 34,
        "stem": "Nguyễn Ái Quốc về Trung Quốc năm nào?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:55",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 133,
                "label": "A",
                "content": "1923",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 134,
                "label": "B",
                "content": "1924",
                "isCorrect": true,
                "sortOrder": 2
            },
            {
                "id": 135,
                "label": "C",
                "content": "1925",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 136,
                "label": "D",
                "content": "1926",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 35,
        "stem": "Nguyễn Ái Quốc về Pác Bó – Cao Bằng năm nào?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:55",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 137,
                "label": "A",
                "content": "Năm 1940",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 138,
                "label": "B",
                "content": "Năm 1941",
                "isCorrect": true,
                "sortOrder": 2
            },
            {
                "id": 139,
                "label": "C",
                "content": "Năm 1942",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 140,
                "label": "D",
                "content": "Năm 1943",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 36,
        "stem": "Nguyễn Tất Thành đã tham dự cuộc biểu tình chống thuế của nhân dân \nTrung Kỳ vào thời gian nào?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:55",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 141,
                "label": "A",
                "content": "Năm 1906",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 142,
                "label": "B",
                "content": "Năm 1901",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 143,
                "label": "C",
                "content": "Năm 1908",
                "isCorrect": true,
                "sortOrder": 3
            },
            {
                "id": 144,
                "label": "D",
                "content": "Năm 1909",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 37,
        "stem": "Nguyễn Ái Quốc dự Đại hội lần thứ V Quốc tế Cộng sản tại Liên Xô vào \nnăm nào?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:55",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 145,
                "label": "A",
                "content": "Năm 1923",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 146,
                "label": "B",
                "content": "Năm 1924",
                "isCorrect": true,
                "sortOrder": 2
            },
            {
                "id": 147,
                "label": "C",
                "content": "Năm 1925",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 148,
                "label": "D",
                "content": "Năm 1926",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 38,
        "stem": "Nguyễn Ái Quốc đã tán thành Quốc tế Cộng sản do ai sáng lập?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:55",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 149,
                "label": "A",
                "content": "Karl Marx",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 150,
                "label": "B",
                "content": "Friedrich Engels",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 151,
                "label": "C",
                "content": "V.I.Lenin",
                "isCorrect": true,
                "sortOrder": 3
            },
            {
                "id": 152,
                "label": "D",
                "content": "Stalin",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 39,
        "stem": "Chủ trương Quốc tế cộng sản của Lenin là?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:55",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 153,
                "label": "A",
                "content": "Đoàn kết vô sản với nhân dân thuộc địa; giúp đỡ phong trào giải phóng dân tộc ở\ncác nước thuộc địa",
                "isCorrect": true,
                "sortOrder": 1
            },
            {
                "id": 154,
                "label": "B",
                "content": "Thức tỉnh nhân dân các dân tộc thuộc địa",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 155,
                "label": "C",
                "content": "Giải phóng giai cấp vô sản ở chính quốc",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 156,
                "label": "D",
                "content": "Vạch trần tội ác của chủ nghĩa đế quốc",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 40,
        "stem": "Nguyễn Ái Quốc đã thành lập Hội Việt Nam cách mạng thanh niên ở đâu?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:55",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 157,
                "label": "A",
                "content": "Cao Bằng – Việt Nam",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 158,
                "label": "B",
                "content": "Thượng Hải – Trung Quốc",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 159,
                "label": "C",
                "content": "Hương Cảng – Trung Quốc",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 160,
                "label": "D",
                "content": "Quảng Châu – Trung Quốc",
                "isCorrect": true,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 41,
        "stem": "Nguyễn Ái Quốc triệu tập Hội nghị hợp nhất thành lập Đảng Cộng Sản Việt\nNam ở đâu?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:55",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 161,
                "label": "A",
                "content": "Cao Bằng – Việt Nam",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 162,
                "label": "B",
                "content": "Thượng Hải – Trung Quốc",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 163,
                "label": "C",
                "content": "Hương Cảng – Trung Quốc",
                "isCorrect": true,
                "sortOrder": 3
            },
            {
                "id": 164,
                "label": "D",
                "content": "Quảng Châu – Trung Quốc",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 42,
        "stem": "Theo Hồ Chí Minh, ưu điểm lớn nhất của chủ nghĩa Mác Lenin là:",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:55",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 165,
                "label": "A",
                "content": "Bản chất cách mạng",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 166,
                "label": "B",
                "content": "Bản chất khoa học",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 167,
                "label": "C",
                "content": "Chủ nghĩa nhân đạo triệt để",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 168,
                "label": "D",
                "content": "Phương pháp làm việc biện chứng\r",
                "isCorrect": true,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 43,
        "stem": "Theo Hổ Chí Minh, ưu điểm lớn nhất của chủ nghĩa Tam dân là:",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:55",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 169,
                "label": "A",
                "content": "Đấu tranh vì độc lập, tự do, hạnh phúc.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 170,
                "label": "B",
                "content": "Đánh đế quốc, thực dân.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 171,
                "label": "C",
                "content": "Đấu tranh giải phóng dân tộc thuộc địa.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 172,
                "label": "D",
                "content": "Chính sách phù hợp với điều kiện nước ta.",
                "isCorrect": true,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 44,
        "stem": "Theo Hồ Chí Minh, ưu điểm lớn nhất của Học Thuyết Khổng Tử là:",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:55",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 173,
                "label": "A",
                "content": "Tinh thần hiếu học",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 174,
                "label": "B",
                "content": "Tinh thần nhân nghĩa",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 175,
                "label": "C",
                "content": "Sự tu dưỡng đạo đức cá nhân",
                "isCorrect": true,
                "sortOrder": 3
            },
            {
                "id": 176,
                "label": "D",
                "content": "Quản lý xã hội bằng đạo đức",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 45,
        "stem": "Hồ Chí Minh gọi phép biện chứng là:",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:55",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 177,
                "label": "A",
                "content": "Nội dung quan trọng của chủ nghĩa Marx-Lenin.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 178,
                "label": "B",
                "content": "Nội dung rất quan trọng của chủ nghĩa Marx-Lenin.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 179,
                "label": "C",
                "content": "Linh hồn sống của chủ nghĩa Marx-Lenin.",
                "isCorrect": true,
                "sortOrder": 3
            },
            {
                "id": 180,
                "label": "D",
                "content": "Nền tảng của chủ nghĩa Marx-Lenin.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 46,
        "stem": "Nguyễn Ái Quốc đã thành lập Hội Việt Nam Cách mạng Thanh niên\nnăm nào?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:55",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 181,
                "label": "A",
                "content": "Năm 1924.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 182,
                "label": "B",
                "content": "Năm 1925.",
                "isCorrect": true,
                "sortOrder": 2
            },
            {
                "id": 183,
                "label": "C",
                "content": "Năm 1926.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 184,
                "label": "D",
                "content": "Năm 1927.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 47,
        "stem": "Giai đoạn hình thành tư tưởng yêu nước và chỉ hướng cách mạng của\nHồ Chí Minh là giai đoạn:",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:55",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 185,
                "label": "A",
                "content": "Trước năm 1911.",
                "isCorrect": true,
                "sortOrder": 1
            },
            {
                "id": 186,
                "label": "B",
                "content": "Từ 1911 đến 1920.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 187,
                "label": "C",
                "content": "Từ 1921 đến 1930.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 188,
                "label": "D",
                "content": "Từ 1930 đến 1945.\r",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 48,
        "stem": "Giai đoạn hình thành cơ bản tư tưởng Hồ Chí Minh về con đường\ncách mạng Việt Nam được tính từ:",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:55",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 189,
                "label": "A",
                "content": "Năm 1911 đến năm 1920.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 190,
                "label": "B",
                "content": "Năm 1921 đến năm 1930.",
                "isCorrect": true,
                "sortOrder": 2
            },
            {
                "id": 191,
                "label": "C",
                "content": "Năm 1930 đến năm 1945.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 192,
                "label": "D",
                "content": "Năm 1945 đến năm 1969.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 49,
        "stem": "Giai đoạn có ý nghĩa vạch đường đi cho cách mạng Việt Nam là giai\nđoạn:",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:55",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 193,
                "label": "A",
                "content": "Trước năm 1911.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 194,
                "label": "B",
                "content": "Từ 1911 đến 1920.",
                "isCorrect": true,
                "sortOrder": 2
            },
            {
                "id": 195,
                "label": "C",
                "content": "Từ 1921 đến 1930.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 196,
                "label": "D",
                "content": "Từ 1930 đến 1945.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 50,
        "stem": "Giai đoạn vượt qua thử thách giữ vững lập trưởng cứu nước giải\nphóng dân tộc là giai đoạn:",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:55",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 197,
                "label": "A",
                "content": "Từ 1911 đến 1920.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 198,
                "label": "B",
                "content": "Từ 1921 đến 1930.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 199,
                "label": "C",
                "content": "Từ 1930 đến 1941.",
                "isCorrect": true,
                "sortOrder": 3
            },
            {
                "id": 200,
                "label": "D",
                "content": "Từ 1941 đến 1969.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 51,
        "stem": "Tiền đề tư tưởng, lý luận giữ vai trò xuất phát hình thành tư tưởng\nHồ Chí Minh là:",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:55",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 201,
                "label": "A",
                "content": "Giá trị truyền thống dân tộc.",
                "isCorrect": true,
                "sortOrder": 1
            },
            {
                "id": 202,
                "label": "B",
                "content": "Văn hóa phương Đông.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 203,
                "label": "C",
                "content": "Văn hóa phương Tây.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 204,
                "label": "D",
                "content": "Chủ nghĩa Marx-Lenin.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 52,
        "stem": "Tiền để tư tưởng, lý luận quyết định nội dung, bản chất tư tưởng Hồ\nChí Minh là:",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:55",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 205,
                "label": "A",
                "content": "Giá trị truyền thống dân tộc.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 206,
                "label": "B",
                "content": "Văn hóa phương Đông.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 207,
                "label": "C",
                "content": "Văn hóa phương Tây.\r",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 208,
                "label": "D",
                "content": "Chủ nghĩa Marx-Lenin.",
                "isCorrect": true,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 53,
        "stem": "Sự kiện nào đánh dấu Nguyễn Ái Quốc tiếp thu chủ nghĩa  Marx-\nLenin trở thành người cộng sản?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:55",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 209,
                "label": "A",
                "content": "Gửi Yêu sách 8 điểm đến Hội nghị Versailles.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 210,
                "label": "B",
                "content": "Đọc Luận cương của Lenin.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 211,
                "label": "C",
                "content": "Bỏ phiếu tán thành Quốc tế Cộng sản.",
                "isCorrect": true,
                "sortOrder": 3
            },
            {
                "id": 212,
                "label": "D",
                "content": "Thành lập Đảng Cộng sản Việt Nam.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 54,
        "stem": "Sự kiện nào đánh dấu Nguyễn Ái Quốc trở thành chiến sỹ Cộng sản,\nchiến sỹ của quốc tế vô sản?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:55",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 213,
                "label": "A",
                "content": "Gửi Yêu sách 8 điểm đến Hội nghị Versailles.",
                "isCorrect": true,
                "sortOrder": 1
            },
            {
                "id": 214,
                "label": "B",
                "content": "Đọc Luận cương của Lenin.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 215,
                "label": "C",
                "content": "Bỏ phiếu tán thành Quốc tế Cộng sản.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 216,
                "label": "D",
                "content": "Thành lập Đảng Cộng sản Việt Nam.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 55,
        "stem": "Sự kiện đánh dấu sự thay đổi có tính chất bước ngoặc  trong nhận\nthức tư tưởng của Nguyễn Ái Quốc là",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:55",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 217,
                "label": "A",
                "content": "Gửi Yêu sách 8 điểm đến Hội nghị Versailles.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 218,
                "label": "B",
                "content": "Đọc Luận cương của Lenin.",
                "isCorrect": true,
                "sortOrder": 2
            },
            {
                "id": 219,
                "label": "C",
                "content": "Bỏ phiếu tán thành Quốc tế Cộng sản.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 220,
                "label": "D",
                "content": "Thành lập Đảng Cộng sản Việt Nam.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 56,
        "stem": "Nguyên tắc nào sau đây giúp cho mọi người tốt hơn, tiến bộ hơn,\nđoàn kết nhau hơn?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:55",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 221,
                "label": "A",
                "content": "Tập trung dân chủ.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 222,
                "label": "B",
                "content": "Tập thể lãnh đạo, cá nhân phụ trách.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 223,
                "label": "C",
                "content": "Tự phê bình và phê bình.",
                "isCorrect": true,
                "sortOrder": 3
            },
            {
                "id": 224,
                "label": "D",
                "content": "Kỷ luật nghiêm minh và tự giác.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 57,
        "stem": "Nhân tố nào sau đây thuộc phẩm chất trí tuệ đặc sắc nhất làm điều\nkiện cho Nguyễn Ái Quốc trở thành một nhà tư tưởng?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:55",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 225,
                "label": "A",
                "content": "Tình cảm mãnh liệt của một con người suốt đời yêu nước, thương dân.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 226,
                "label": "B",
                "content": "Tư duy độc lập, tự chủ sáng tạo, với đầu óc phê bình tin tưởng sáng suốt\ntrong nghiên cứu lý luận và tổng kết thực tiễn.",
                "isCorrect": true,
                "sortOrder": 2
            },
            {
                "id": 227,
                "label": "C",
                "content": "Sự khổ công học tập lý luận và thực tiễn.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 228,
                "label": "D",
                "content": "Ý chí kiên định của một chiến sĩ cộng sản nhiệt thành cách mạng.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 58,
        "stem": "Nguyên tắc nào sau đây được gọi là nguyên tắc tổ chức?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:55",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 229,
                "label": "A",
                "content": "Tập trung dân chủ.",
                "isCorrect": true,
                "sortOrder": 1
            },
            {
                "id": 230,
                "label": "B",
                "content": "Tập thể lãnh đạo, cá nhân phụ trách.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 231,
                "label": "C",
                "content": "Tự phê bình và phê bình",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 232,
                "label": "D",
                "content": "Kỷ luật nghiêm minh và tự giác.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 59,
        "stem": "Phát hiện điểm nhầm lẫn trong đoạn viết sau đây:",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:55",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 233,
                "label": "A",
                "content": "Ngay từ đầu chủ nghĩa cộng sản đã đưa Nguyễn Ái Quốc tin theo chủ nghĩa\nLenin, tin theo Quốc tế thứ ba.",
                "isCorrect": true,
                "sortOrder": 1
            },
            {
                "id": 234,
                "label": "B",
                "content": "Khi ra đi tìm đường cứu nước, Nguyễn Ái Quốc đã có một vốn học vấn và một\nnăng lực trí tuệ sắc sảo.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 235,
                "label": "C",
                "content": "Trong quá trình tìm đường cứu nước. Nguyễn Ái Quốc đã hoàn thiện cho minh\nbàn lĩnh tư duy độc lập, tự chủ, sáng tạo, nhờ đó khi tiếp thu chủ nghĩa Marx-Lenin\nđã không rơi vào giáo điều, sao chép.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 236,
                "label": "D",
                "content": "Nguyễn Ái Quốc tiếp thu lý luận  Marx-Lenin  theo phương pháp nhận thức\nMarxist.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 60,
        "stem": "Tìm một điểm viết  sai  sự kiện trong đoạn viết sau đây:  “Trong 10\nnăm đầu (1911-1920) của quá trình bôn ba tìm đường cứu nước, Nguyễn Ái\nQuốc đã",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:55",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 237,
                "label": "A",
                "content": "Đến Pháp - quê hương khẩu hiệu tự do, bình đẳng, bác ái",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 238,
                "label": "B",
                "content": "Đến nhiều nước ở châu Âu, châu Phi, châu Mỹ",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 239,
                "label": "C",
                "content": "Viết Yêu sách 8 điểm gửi Hội nghị Versailles",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 240,
                "label": "D",
                "content": "Sống, làm thuê và tự học hỏi ở Mỹ, Anh, Pháp, Liên Xô.\r",
                "isCorrect": true,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 61,
        "stem": "Tìm một điểm viết sai sự kiện trong đoạn viết sau đây:  “Trong 10\nnăm đầu (1911- 1920) của quá trình bôn ba tìm đường cứu nước, Nguyễn Ái\nQuốc đã",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:55",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 241,
                "label": "A",
                "content": "Trước tiên đến nước Pháp, nơi đã sản sinh ra tư tưởng tự do, bình đẳng, bác ái.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 242,
                "label": "B",
                "content": "Đến nhiều nước ở châu Âu, châu Phi, châu Mỹ.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 243,
                "label": "C",
                "content": "Tìm hiểu cuộc cách mạng Pháp và Mỹ.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 244,
                "label": "D",
                "content": "Chuẩn bị thành lập Đảng Cộng sản Việt Nam.",
                "isCorrect": true,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 62,
        "stem": "Tìm một điểm viết sai sự kiện trong đoạn viết sau đây:  “Trong 10\nnăm đầu (1911-1920) của quá trình bôn ba tìm đường cứu nước, Nguyễn Ái\nQuốc đã",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:55",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 245,
                "label": "A",
                "content": "Trước tiên đến nước Pháp, nơi đã sản sinh ra tư tưởng tự do, bình đẳng, bác ái.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 246,
                "label": "B",
                "content": "Đến nhiều nước ở châu Âu, châu Phi, châu Mỹ.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 247,
                "label": "C",
                "content": "Sống, làm thuê và tự học hỏi ở các nước Mỹ, Anh, Pháp.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 248,
                "label": "D",
                "content": "Viết tác phẩm Bản án chế độ thực dân Pháp.",
                "isCorrect": true,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 63,
        "stem": "Tìm một điểm viết sai sự kiện trong đoạn viết sau: \"Trong 10 năm\n1921-1930 của quá trình tìm đường cứu nước, Nguyễn Ái Quốc đã",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:56",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 249,
                "label": "A",
                "content": "Sáng lập Hội liên hiệp các dân tộc thuộc địa",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 250,
                "label": "B",
                "content": "Dự Đại hội V của Quốc tế cộng sản.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 251,
                "label": "C",
                "content": "Xuất bản Đường Kách mệnh.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 252,
                "label": "D",
                "content": "Sáng lập Đảng Cộng sản Đông Dương.",
                "isCorrect": true,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 64,
        "stem": "Tìm một điểm viết sai sự kiện trong đoạn viết sau: “Từ 1930-1945 của\nquá trình lãnh đạo cách mạng Việt Nam, Nguyễn Ái Quốc đã",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:56",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 253,
                "label": "A",
                "content": "Triệu tập Hội nghị Trung ương 8, để cao nhiệm vụ giải phóng giai cấp.",
                "isCorrect": true,
                "sortOrder": 1
            },
            {
                "id": 254,
                "label": "B",
                "content": "Lãnh đạo cách mạng tháng Tám thành công.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 255,
                "label": "C",
                "content": "Đọc Tuyên ngôn độc lập.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 256,
                "label": "D",
                "content": "Bị bắt giam ở Hồng Kông.\r",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 65,
        "stem": "Nguyên tắc nào sau đây được gọi là nguyên tắc lãnh đạo?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:56",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 257,
                "label": "A",
                "content": "Tập trung dân chủ.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 258,
                "label": "B",
                "content": "Tập thể lãnh đạo, cá nhân phụ trách.",
                "isCorrect": true,
                "sortOrder": 2
            },
            {
                "id": 259,
                "label": "C",
                "content": "Tự phê bình và phê bình.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 260,
                "label": "D",
                "content": "Kỷ luật nghiêm minh và tự giác.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 66,
        "stem": "Tác phẩm \"Bản án chế độ thực dân Pháp” xuất bản lần đầu tiên vào\nnăm nào? Bằng tiếng gì?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:56",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 261,
                "label": "A",
                "content": "Năm 1924 - Tiếng Nga.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 262,
                "label": "B",
                "content": "Năm 1925 – Tiếng Pháp.",
                "isCorrect": true,
                "sortOrder": 2
            },
            {
                "id": 263,
                "label": "C",
                "content": "Năm 1926 – Tiếng Anh.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 264,
                "label": "D",
                "content": "Năm 1927 – Tiếng Hàn.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 67,
        "stem": "Các bài giảng của Nguyễn Ái Quốc tại các lớp huấn luyện cán bộ\nđược tập hợp và xuất bản thành tác phẩm nào?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:56",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 265,
                "label": "A",
                "content": "Bản án chế độ thực dân Pháp.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 266,
                "label": "B",
                "content": "Đường Kách Mệnh.",
                "isCorrect": true,
                "sortOrder": 2
            },
            {
                "id": 267,
                "label": "C",
                "content": "Cương lĩnh thành lập Đảng.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 268,
                "label": "D",
                "content": "Luận cương tháng 10 năm 1930.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 68,
        "stem": "Nguyễn Ái Quốc bị thực dân Anh giam giữ ở Hồng Kông trong thời\ngian nào?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:56",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 269,
                "label": "A",
                "content": "6/1931-1/1932.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 270,
                "label": "B",
                "content": "6/1931-1/1933.",
                "isCorrect": true,
                "sortOrder": 2
            },
            {
                "id": 271,
                "label": "C",
                "content": "6/1931-1/1934.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 272,
                "label": "D",
                "content": "6/1931-1/1935.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 69,
        "stem": "Ai là người đã có công lớn trong việc giúp Nguyễn Ái Quốc thoát ra\nkhỏi nhà tù của thực dân Anh ở Hồng Kông?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:56",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 273,
                "label": "A",
                "content": "Luật sư Phan Văn Trường.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 274,
                "label": "B",
                "content": "Luật sư Nowell Pritt.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 275,
                "label": "C",
                "content": "Luật sư Loseby",
                "isCorrect": true,
                "sortOrder": 3
            },
            {
                "id": 276,
                "label": "D",
                "content": "Thomas Southorn (Phó Thống đốc Hồng Kông).",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 70,
        "stem": "Nguyễn Ái Quốc thành lập Hội Việt Nam cách mạng thanh niên năm\nnào?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:56",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 277,
                "label": "A",
                "content": "Năm 1925.",
                "isCorrect": true,
                "sortOrder": 1
            },
            {
                "id": 278,
                "label": "B",
                "content": "Năm 1926.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 279,
                "label": "C",
                "content": "Năm 1927.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 280,
                "label": "D",
                "content": "Năm 1928.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 71,
        "stem": "Phát hiện câu có sự nhầm lẫn khi nói về nguồn gốc văn hóa phương\nĐông trong tư tưởng Hồ Chí Minh",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:56",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 281,
                "label": "A",
                "content": "Tiếp thu những mặt tích cực của Nho.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 282,
                "label": "B",
                "content": "Tiếp thu lòng vị tha của Phật.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 283,
                "label": "C",
                "content": "Kế thừa lòng nhân ái, đức hy sinh của Hồi giáo.",
                "isCorrect": true,
                "sortOrder": 3
            },
            {
                "id": 284,
                "label": "D",
                "content": "Kế thừa chủ nghĩa tam dân của Tôn Dật Tiên.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 72,
        "stem": "Bản chất của CNTB “là một con đỉa có một cái vòi bám vào giai cấp\nvô sản ở chính quốc và một cái vòi khác bám vào giai cấp vô sản ở các nước\nthuộc địa. Nếu muốn giết con vật ấy, người ta phải đồng thời cắt cả hai cái\nvòi…”. Câu nói này được trích trong tác phẩm nào của Nguyễn Ái Quốc?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:56",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 285,
                "label": "A",
                "content": "Bản án chế độ thực dân Pháp.",
                "isCorrect": true,
                "sortOrder": 1
            },
            {
                "id": 286,
                "label": "B",
                "content": "Đường cách mệnh.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 287,
                "label": "C",
                "content": "Sửa đổi lối làm việc.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 288,
                "label": "D",
                "content": "Con rồng tre.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 73,
        "stem": "Vấn đề dân tộc trong tư tưởng Hồ Chí Minh là sự kết hợp nhuần\nnhuyễn giữa",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:56",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 289,
                "label": "A",
                "content": "Dân tộc với giai cấp.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 290,
                "label": "B",
                "content": "Độc lập dân tộc và chủ nghĩa xã hội.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 291,
                "label": "C",
                "content": "Chủ nghĩa yêu nước với chủ nghĩa quốc tế.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 292,
                "label": "D",
                "content": "Cả A, B, C đều đúng.",
                "isCorrect": true,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 74,
        "stem": "Vấn đề dân tộc trong tư tưởng Hồ Chí Minh là vấn đề:",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:56",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 293,
                "label": "A",
                "content": "Dân tộc thuộc địa",
                "isCorrect": true,
                "sortOrder": 1
            },
            {
                "id": 294,
                "label": "B",
                "content": "Dân tộc nói chung.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 295,
                "label": "C",
                "content": "Dân tộc phương Đông.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 296,
                "label": "D",
                "content": "Dân tộc tư sản.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 75,
        "stem": "Thực chất của vấn đề dân tộc thuộc địa trong tư tưởng Hồ Chí Minh\nlà:",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:56",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 297,
                "label": "A",
                "content": "Đòi quyền bình đẳng giữa các dân tộc.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 298,
                "label": "B",
                "content": "Đòi quyền tự do, dân chủ cho nhân dân.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 299,
                "label": "C",
                "content": "Đòi quyền tự trị dưới sự bảo hộ của Pháp.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 300,
                "label": "D",
                "content": "Đấu tranh giải phóng dân tộc, thành lập nhà nước dân tộc độc lập, trong\nđó nhân dân là chủ thể tối cao của quyền lực nhà nước.",
                "isCorrect": true,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 76,
        "stem": "Trong tư tưởng Hồ Chí Minh nhiệm vụ quan trọng hàng đầu của cách\nmạng Việt Nam là:",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:56",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 301,
                "label": "A",
                "content": "Giải phóng dân tộc.",
                "isCorrect": true,
                "sortOrder": 1
            },
            {
                "id": 302,
                "label": "B",
                "content": "Giải phóng giai cấp.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 303,
                "label": "C",
                "content": "Giải phóng con người.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 304,
                "label": "D",
                "content": "Giải phóng xã hội.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 77,
        "stem": "Hồ Chí Minh xác định cách mạng Việt Nam phải trải qua những thời\nkỳ nào?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:56",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 305,
                "label": "A",
                "content": "Cách mạng tư sản và cách mạng vô sản.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 306,
                "label": "B",
                "content": "Cách mạng giải phóng dân tộc và cách mạng xã hội chủ nghĩa,",
                "isCorrect": true,
                "sortOrder": 2
            },
            {
                "id": 307,
                "label": "C",
                "content": "Cách mạng tư sản và cách mạng ruộng đất.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 308,
                "label": "D",
                "content": "Cách mạng phong kiến và cách mạng vô sản.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 78,
        "stem": "Trong tư tưởng Hồ Chí Minh về giải phóng dân tộc, giải phóng giai\ncấp, giải phóng con người, giải phỏng xã hội, Hồ Chí Minh đặt lên hàng đầu\nnhiệm vụ nào?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:56",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 309,
                "label": "A",
                "content": "Giải phóng dân tộc.",
                "isCorrect": true,
                "sortOrder": 1
            },
            {
                "id": 310,
                "label": "B",
                "content": "Giải phóng giai cấp",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 311,
                "label": "C",
                "content": "Giải phóng con người.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 312,
                "label": "D",
                "content": "Giải phóng xã hội.\r",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 79,
        "stem": "Hồ Chí Minh đã dùng hình tượng gì dưới đây để mô tả mối quan hệ\ngiữa cách mạng giải phóng dân tộc ở các nước thuộc địa với cách vô sản ở\nchính quốc?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:56",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 313,
                "label": "A",
                "content": "Con bạch tuộc.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 314,
                "label": "B",
                "content": "Con Ho.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 315,
                "label": "C",
                "content": "Hai cánh của một con chim.",
                "isCorrect": true,
                "sortOrder": 3
            },
            {
                "id": 316,
                "label": "D",
                "content": "Con chim đại bàng.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 80,
        "stem": "Trong tư tưởng Hồ Chí Minh, Vấn đề dân tộc và vấn đề giai cấp có\nmối quan hệ với nhau như thế nào?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:56",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 317,
                "label": "A",
                "content": "Giải phóng dân tộc và giải phóng giai cấp cần được tiến hành song song.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 318,
                "label": "B",
                "content": "Giải phóng dân tộc không liên quan đến giải phóng giai cấp.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 319,
                "label": "C",
                "content": "Giải phóng dân tộc là tiền đề để giải phóng giai cấp.",
                "isCorrect": true,
                "sortOrder": 3
            },
            {
                "id": 320,
                "label": "D",
                "content": "Giải phóng giai cấp là tiền đề để giải phóng dân tộc.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 81,
        "stem": "\"Tất cả các dân tộc trên thế giới đều sinh ra bình đẳng, dân tộc nào\ncũng có quyển sống, quyền sung sựớng và quyền tự do\". Hồ Chí Minh nói câu\ntrên trong văn kiện nào?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:56",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 321,
                "label": "A",
                "content": "Bản án chế độ thực dân Pháp.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 322,
                "label": "B",
                "content": "Đường cách mệnh",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 323,
                "label": "C",
                "content": "Tuyên ngôn độc lập năm 1945.",
                "isCorrect": true,
                "sortOrder": 3
            },
            {
                "id": 324,
                "label": "D",
                "content": "Lời kêu gọi toàn quốc kháng chiến năm 1946.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 82,
        "stem": "Theo tư tưởng Hồ Chí Minh cách mạng giải phóng dân tộc muốn\ngiành được thắng lợi phải theo con đường nào?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:56",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 325,
                "label": "A",
                "content": "Con đường theo lập trường phong kiến.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 326,
                "label": "B",
                "content": "Con đường theo lập trường tư sản.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 327,
                "label": "C",
                "content": "Con đường cách mạng vô sản.",
                "isCorrect": true,
                "sortOrder": 3
            },
            {
                "id": 328,
                "label": "D",
                "content": "Con đường quan chủ lập hiến.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 83,
        "stem": "Trong tư tưởng Hồ Chí Minh cách mạng là sự nghiệp của",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:56",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 329,
                "label": "A",
                "content": "Giai cấp công nhân.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 330,
                "label": "B",
                "content": "Giai cấp nông dân.\r",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 331,
                "label": "C",
                "content": "Giai cấp công nhân, nông dân, tri thức,",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 332,
                "label": "D",
                "content": "Toàn dân, trên cơ sở liên minh công – nông.",
                "isCorrect": true,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 84,
        "stem": "Phong trào Đông Du (1906 – 1908) do ai lãnh đạo?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:56",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 333,
                "label": "A",
                "content": "Cụ Phan Bội Châu.",
                "isCorrect": true,
                "sortOrder": 1
            },
            {
                "id": 334,
                "label": "B",
                "content": "Cụ Phan Châu Trinh.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 335,
                "label": "C",
                "content": "Cụ Nguyễn Thái Học.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 336,
                "label": "D",
                "content": "Cụ Lương Văn Can.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 85,
        "stem": "Phong trào Duy Tân (1906 – 1908) do ai lãnh đạo?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:56",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 337,
                "label": "A",
                "content": "Cụ Phan Châu Trinh.",
                "isCorrect": true,
                "sortOrder": 1
            },
            {
                "id": 338,
                "label": "B",
                "content": "Cụ Nguyễn Thái Học.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 339,
                "label": "C",
                "content": "Cụ Lương Văn Can.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 340,
                "label": "D",
                "content": "Cụ Phan Bội Châu.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 86,
        "stem": "Phong trào Đông Kinh Nghĩa Thục (1907) do ai lãnh đạo?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:56",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 341,
                "label": "A",
                "content": "Cụ Phan Châu Trinh.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 342,
                "label": "B",
                "content": "Cụ Nguyễn Thái Học.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 343,
                "label": "C",
                "content": "Cụ Lương Văn Can.",
                "isCorrect": true,
                "sortOrder": 3
            },
            {
                "id": 344,
                "label": "D",
                "content": "Cụ Phan Bội Châu",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 87,
        "stem": "Từ năm 1920 đến năm 1945, Hồ Chí Minh bị bắt vào tù mấy lần?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:56",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 345,
                "label": "A",
                "content": "2 lần.",
                "isCorrect": true,
                "sortOrder": 1
            },
            {
                "id": 346,
                "label": "B",
                "content": "3 lần.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 347,
                "label": "C",
                "content": "4 lần.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 348,
                "label": "D",
                "content": "1 lần.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 88,
        "stem": "Một trong những nội dung cơ bản của Bản Yêu sách gồm 8 điểm của\nNguyễn Ái Quốc gởi tới Hội nghị Versailles là:",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:56",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 349,
                "label": "A",
                "content": "Đòi quyền độc lập dân tộc.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 350,
                "label": "B",
                "content": "Đòi quyền dân tộc tự trị.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 351,
                "label": "C",
                "content": "Đội quyển tự do.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 352,
                "label": "D",
                "content": "Đòi quyền tự do, dân chủ tối thiểu cho nhân dân.\r",
                "isCorrect": true,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 89,
        "stem": "Chọn cụm từ đúng điền vào chỗ trống “…….”. Hồ Chí Minh khẳng\nđịnh: “Tôi chỉ có một ham muốn, ham muốn tột bậc, là làm sao cho nước ta\nđược “….” dân ta được hoàn toàn tự do, đồng bào ta ai cũng có cơm ăn áo\nmặc, ai cũng được học hành”",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:56",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 353,
                "label": "A",
                "content": "Nhanh chóng độc lập.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 354,
                "label": "B",
                "content": "Thắng lợi.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 355,
                "label": "C",
                "content": "Hoàn toàn độc lập.",
                "isCorrect": true,
                "sortOrder": 3
            },
            {
                "id": 356,
                "label": "D",
                "content": "Giải phóng.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 90,
        "stem": "Nội dung cốt lõi trong nghiên cứu hệ thống các quan điểm lý luận về\ncách mạng Việt Nam của môn học tư tưởng Hồ Chí Minh là:",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:56",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 357,
                "label": "A",
                "content": "Tư tưởng về con dường cách mạng vô sản để giải phóng dân tộc.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 358,
                "label": "B",
                "content": "Tư tưởng về sự lãnh đạo của Đảng Cộng sản.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 359,
                "label": "C",
                "content": "Tư tưởng về chủ nghĩa xã hội.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 360,
                "label": "D",
                "content": "Tư tưởng về độc lập dân tộc gắn liền với chủ nghĩa xã hội.",
                "isCorrect": true,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 91,
        "stem": "Địa danh nào sau đây là quê hương của chủ tịch Hồ Chí Minh?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:56",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 361,
                "label": "A",
                "content": "Kim Liên – Nam Đàn – Nghệ An.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 362,
                "label": "B",
                "content": "Kim Liên – Thanh Chương – Nghệ An.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 363,
                "label": "C",
                "content": "Kim Liên – Nam Đàn – Nghệ Tĩnh.",
                "isCorrect": true,
                "sortOrder": 3
            },
            {
                "id": 364,
                "label": "D",
                "content": "Kim Liên – Thanh Chương — Hà Tĩnh.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 92,
        "stem": "Nguồn gốc tư tưởng lý luận của tư tưởng Hồ Chí Minh là:",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:56",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 365,
                "label": "A",
                "content": "Giá trị văn hóa dân tộc; tinh hoa văn hóa phương Tây; chủ nghĩa Marx-Lenin.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 366,
                "label": "B",
                "content": "Chủ nghĩa yêu nước Việt Nam; tinh hoa văn hóa nhân loại chủ nghĩa Mác-\nLenin.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 367,
                "label": "C",
                "content": "Chủ nghĩa yêu nước Việt Nam, tỉnh hoa văn hóa phương Đông; chủ nghĩa Mác-\nLenin.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 368,
                "label": "D",
                "content": "Giá trị văn hóa dân tộc; tinh hoa văn hóa nhân loại; chủ nghĩa  Marx-\nLenin.",
                "isCorrect": true,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 93,
        "stem": "Chọn câu trả lời đúng: Theo Hồ Chí Minh, “giặc nội xâm” bao gồm\nnhững loại nào?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:56",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 369,
                "label": "A",
                "content": "Tham ô.\r",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 370,
                "label": "B",
                "content": "Lãng phí.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 371,
                "label": "C",
                "content": "Quan liêu.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 372,
                "label": "D",
                "content": "Tất cả các đáp án A, B, C.",
                "isCorrect": true,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 94,
        "stem": "Về Cao Bằng, Nguyễn Ái Quốc đã dùng bí danh gì để hoạt động?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:56",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 373,
                "label": "A",
                "content": "Lý Thụy. (Trung Quốc)",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 374,
                "label": "B",
                "content": "Tống Văn Sơ. (Trung Quốc)",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 375,
                "label": "C",
                "content": "Chín Thầu. (Thái Lan)",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 376,
                "label": "D",
                "content": "Già Thu, Ông Ké.",
                "isCorrect": true,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 95,
        "stem": "Hồ Chí Minh đã nêu mấy chuẩn mực đạo đức của người Việt Nam?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:56",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 377,
                "label": "A",
                "content": "4 chuẩn mực.",
                "isCorrect": true,
                "sortOrder": 1
            },
            {
                "id": 378,
                "label": "B",
                "content": "5 chuẩn mực.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 379,
                "label": "C",
                "content": "6 chuẩn mực",
                "isCorrect": false,
                "sortOrder": 3
            }
        ]
    },
    {
        "id": 96,
        "stem": "Tại Đại hội Đảng toàn quốc lần thứ mấy Đảng ta khẳng định: “Đảng\nlấy chủ nghĩa Marx-Lenin và tự tưởng Hồ Chí Minh làm nền tảng tư tưởng và\nkim chỉ nam cho hành động”?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:56",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 380,
                "label": "A",
                "content": "Đại hội Đảng toàn quốc lần thứ VI.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 381,
                "label": "B",
                "content": "Đại hội Đảng toàn quốc lần thứ VII.",
                "isCorrect": true,
                "sortOrder": 2
            },
            {
                "id": 382,
                "label": "C",
                "content": "Đại hội Đảng toàn quốc lần thứ VIII.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 383,
                "label": "D",
                "content": "Đại hội Đảng toàn quốc lần thứ IX.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 97,
        "stem": "Huyện Bình Khê, nơi cụ Nguyễn Sinh Sắc - thân phụ của Hồ Chí\nMinh có thời kỳ làm quan tri huyện thuộc tỉnh nào?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:56",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 384,
                "label": "A",
                "content": "Quảng Nam",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 385,
                "label": "B",
                "content": "Quảng Ngãi.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 386,
                "label": "C",
                "content": "Quảng Bình.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 387,
                "label": "D",
                "content": "Bình Định.",
                "isCorrect": true,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 98,
        "stem": "Thân mẫu của Hồ Chí Minh là bà Hoàng Thị Loan, bà sinh được\nmấy người con?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:56",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 388,
                "label": "A",
                "content": "Hai người con.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 389,
                "label": "B",
                "content": "Ba người con.\r",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 390,
                "label": "C",
                "content": "Bốn người con.",
                "isCorrect": true,
                "sortOrder": 3
            },
            {
                "id": 391,
                "label": "D",
                "content": "Năm người con",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 99,
        "stem": "Thân mẫu của Hồ Chí Minh là bà Hoàng Thị Loan, bà mất ở đâu?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:56",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 392,
                "label": "A",
                "content": "Nghệ An.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 393,
                "label": "B",
                "content": "Huế.",
                "isCorrect": true,
                "sortOrder": 2
            },
            {
                "id": 394,
                "label": "C",
                "content": "Vinh.\r",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 395,
                "label": "D",
                "content": "Hà Tĩnh.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 100,
        "stem": "Xã hội Việt Nam cuối thế kỷ XIX - đầu thế kỷ XX có hai mâu thuẫn\ncơ bản nào?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:56",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 396,
                "label": "A",
                "content": "Mâu thuẫn giữa nông dân với địa chủ và giữa công nhân với tư sản.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 397,
                "label": "B",
                "content": "Mâu thuẫn giữa nông dân với địa chủ và giữa dân tộc với thực dân Pháp.",
                "isCorrect": true,
                "sortOrder": 2
            },
            {
                "id": 398,
                "label": "C",
                "content": "Mâu thuẫn giữa công nhân với tư sản và giữa dân tộc với thực dân Pháp.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 399,
                "label": "D",
                "content": "Mâu thuẫn giữa công nhân với tư sản và giữa tư sản với địa chủ.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 101,
        "stem": "Nguyễn Sinh Cung đổi tên là Nguyễn Tất Thành năm nào?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:56",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 400,
                "label": "A",
                "content": "Năm 1901",
                "isCorrect": true,
                "sortOrder": 1
            },
            {
                "id": 401,
                "label": "B",
                "content": "Năm 1905.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 402,
                "label": "C",
                "content": "Năm 1908.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 403,
                "label": "D",
                "content": "Năm 1911",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 102,
        "stem": "Nguyễn Tất Thành lấy tên là Nguyễn Ái Quốc khi nào?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:56",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 404,
                "label": "A",
                "content": "Khi lên tàu từ bến Nhà Rồng năm 1911.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 405,
                "label": "B",
                "content": "Khi viết Yêu sách 8 điểm gửi Hội nghị Versailles năm 1919.",
                "isCorrect": true,
                "sortOrder": 2
            },
            {
                "id": 406,
                "label": "C",
                "content": "Khi tham gia sáng lập Đảng Cộng sản Pháp năm 1920.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 407,
                "label": "D",
                "content": "Khi dự Đại hội lần thứ V Quốc tế Cộng sản ở Liên Xô năm 1924.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 103,
        "stem": "Nguyễn Ái Quốc lấy tên Hồ Chí Minh khi nào?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:56",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 408,
                "label": "A",
                "content": "Khi trở về nước năm 1941.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 409,
                "label": "B",
                "content": "Khi bị quân Tưởng Giới Thạch bắt 1942.",
                "isCorrect": true,
                "sortOrder": 2
            },
            {
                "id": 410,
                "label": "C",
                "content": "Khi viết Tuyên ngôn độc lập năm 1945.\r",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 411,
                "label": "D",
                "content": "Khi viết Di chúc năm 1965.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 104,
        "stem": "Hồ Chí Minh đã nêu mây nguyên tắc xây dựng đạo dức?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:56",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 412,
                "label": "A",
                "content": "2 nguyên tắc.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 413,
                "label": "B",
                "content": "3 nguyên tắc.",
                "isCorrect": true,
                "sortOrder": 2
            },
            {
                "id": 414,
                "label": "C",
                "content": "4 nguyên tắc.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 415,
                "label": "D",
                "content": "5 nguyên tắc.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 105,
        "stem": "Thay mặt những người Việt Nam yêu nước tại Pháp, Nguyễn Ái\nQuốc gửi đến Hội nghị  Versailles  bản yêu sách của nhân dân An Nam gồm\nmấy điểm?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:56",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 416,
                "label": "A",
                "content": "6 điểm",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 417,
                "label": "B",
                "content": "7 điểm.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 418,
                "label": "C",
                "content": "8 điểm",
                "isCorrect": true,
                "sortOrder": 3
            },
            {
                "id": 419,
                "label": "D",
                "content": "9 điểm.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 106,
        "stem": "Nguyễn Ái Quốc dọc “Sơ thảo lần thứ nhất những Luận cương về\nvấn đề dân tộc và vấn đề thuộc địa” của V.I.Lenin, tìm thấy con đường giải\nphóng cho dân tộc Việt Nam vào tháng, năm nào?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:56",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 420,
                "label": "A",
                "content": "Tháng 6/1920.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 421,
                "label": "B",
                "content": "Tháng 7/1920.",
                "isCorrect": true,
                "sortOrder": 2
            },
            {
                "id": 422,
                "label": "C",
                "content": "Tháng 9/1920.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 423,
                "label": "D",
                "content": "Tháng 12/1920.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 107,
        "stem": "Theo Hồ Chí Minh, ưu điểm lớn nhất của chủ nghĩa Marx-Lenin là",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:56",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 424,
                "label": "A",
                "content": "Bản chất cách mạng",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 425,
                "label": "B",
                "content": "Bản chất khoa học.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 426,
                "label": "C",
                "content": "Chủ nghĩa nhân đạo triệt dễ.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 427,
                "label": "D",
                "content": "Phương pháp làm việc biện chúng",
                "isCorrect": true,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 108,
        "stem": "Theo Hồ Chí Minh, ưu điểm lớn nhất của Học thuyết Khổng Tử là:",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:56",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 428,
                "label": "A",
                "content": "Tinh thần hiểu học.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 429,
                "label": "B",
                "content": "Tinh thần nhân nghĩa.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 430,
                "label": "C",
                "content": "Sự tu dưỡng đạo đức cá nhân.\r",
                "isCorrect": true,
                "sortOrder": 3
            }
        ]
    },
    {
        "id": 109,
        "stem": "Giai đoạn hình thành tư tưởng yêu nước và chỉ hướng cách mạng\ncủa Hồ Chí Minh là giai đoạn",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:56",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 431,
                "label": "A",
                "content": "Trước năm 1911.",
                "isCorrect": true,
                "sortOrder": 1
            },
            {
                "id": 432,
                "label": "B",
                "content": "Từ 1911 đến 1920.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 433,
                "label": "C",
                "content": "Từ 1921 đến 1930.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 434,
                "label": "D",
                "content": "Từ 1930 đến 1945.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 110,
        "stem": "Nguyên tắc nào sau đây được gọi là nguyên tắc tổ chức?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:56",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 435,
                "label": "A",
                "content": "Tập trung dân chủ",
                "isCorrect": true,
                "sortOrder": 1
            },
            {
                "id": 436,
                "label": "B",
                "content": "Tập thể lãnh đạo, cá nhân phụ trách,",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 437,
                "label": "C",
                "content": "Tự phê bình và phê bình.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 438,
                "label": "D",
                "content": "Kỷ luật nghiêm minh và tự giác.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 111,
        "stem": "Tìm một điểm viết sai sự kiện trong đoạn viết sau: “Trong 10 năm\n1921-1930 của quá trình tìm dường cứu nước, Nguyễn Ái Quốc đã",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:57",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 439,
                "label": "A",
                "content": "Sáng lập Hội liên hiệp các dân tộc thuộc địa.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 440,
                "label": "B",
                "content": "Dự Đại hội V của Quốc tế cộng sản.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 441,
                "label": "C",
                "content": "Xuất bản Đường Kách Mệnh.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 442,
                "label": "D",
                "content": "Sáng lập Đảng Cộng sản Đông Dương.",
                "isCorrect": true,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 112,
        "stem": "Nguyên tắc nào sau đây được gọi là nguyên tắc lãnh đạo?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:57",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 443,
                "label": "A",
                "content": "Tập trung dân chủ.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 444,
                "label": "B",
                "content": "Tập thể lãnh đạo, cá nhân phụ trách.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 445,
                "label": "C",
                "content": "Tự phê bình và phê bình.",
                "isCorrect": true,
                "sortOrder": 3
            },
            {
                "id": 446,
                "label": "D",
                "content": "Kỷ luật nghiêm minh và tự giác",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 113,
        "stem": "Tác phẩm “Bản án chế độ thực dân Pháp” xuất bản lần đầu tiên vào\nnăm nào? Bằng tiếng gì?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:57",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 447,
                "label": "A",
                "content": "Năm 1924 – Tiếng Nga.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 448,
                "label": "B",
                "content": "Năm 1925 – Tiếng Pháp.",
                "isCorrect": true,
                "sortOrder": 2
            },
            {
                "id": 449,
                "label": "C",
                "content": "Năm 1926 – Tiếng Anh.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 450,
                "label": "D",
                "content": "Năm 1927 – Tiếng Hán.\r",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 114,
        "stem": "Các bài giảng của Nguyễn Ái Quốc tại các lớp huấn luyện cán bộ\nđược tập hợp và xuất bản thành tác phẩm nào?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:57",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 451,
                "label": "A",
                "content": "Bản án chế độ thực dân Pháp.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 452,
                "label": "B",
                "content": "Đường Kách Mệnh",
                "isCorrect": true,
                "sortOrder": 2
            },
            {
                "id": 453,
                "label": "C",
                "content": "Cương lĩnh thành lập Đảng.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 454,
                "label": "D",
                "content": "Luận cương tháng 10 năm 1930.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 115,
        "stem": "Vấn đề dân tộc trong tư tưởng Hồ Chí Minh là vấn đề:",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:57",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 455,
                "label": "A",
                "content": "Dân tộc thuộc địa",
                "isCorrect": true,
                "sortOrder": 1
            },
            {
                "id": 456,
                "label": "B",
                "content": "Dân tộc nói chung.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 457,
                "label": "C",
                "content": "Dân tộc phương Đông.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 458,
                "label": "D",
                "content": "Dân tộc tư sản.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 116,
        "stem": "Theo tư  tưởng Hồ Chí Minh cách mạng giải phóng dân tộc muốn\ngiành được thắng lợi phải theo con đường nào?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:57",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 459,
                "label": "A",
                "content": "Con đường theo lập trường phong kiến.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 460,
                "label": "B",
                "content": "Con đường theo lập trường tư sản.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 461,
                "label": "C",
                "content": "Con đường cách mạng vô sản.",
                "isCorrect": true,
                "sortOrder": 3
            },
            {
                "id": 462,
                "label": "D",
                "content": "Con đường quân chủ lập hiến.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 117,
        "stem": "Từ năm 1920 đến năm 1945, Hồ Chí Minh bị bắt vào từ mấy lần?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:57",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 463,
                "label": "A",
                "content": "2 lần.",
                "isCorrect": true,
                "sortOrder": 1
            },
            {
                "id": 464,
                "label": "B",
                "content": "3 lần.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 465,
                "label": "C",
                "content": "4 lần.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 466,
                "label": "D",
                "content": "1 lần.",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 118,
        "stem": "Câu nói “Nước Việt Nam có quyền hưởng tự do và độc lập, và sự\nthật đã trở thành một nước tự do độc lập\" của Hồ Chí Minh được nói trong\ntác phẩm nào?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:57",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 467,
                "label": "A",
                "content": "Đường cách mệnh.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 468,
                "label": "B",
                "content": "Tuyên ngôn độc lập năm 1945.",
                "isCorrect": true,
                "sortOrder": 2
            },
            {
                "id": 469,
                "label": "C",
                "content": "Lời kêu gọi toàn quốc kháng chiến 1946.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 470,
                "label": "D",
                "content": "Sửa đổi lối làm việc 1947.\r",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 119,
        "stem": "Hồ Chí Minh bắt đầu viết Di chúc vào thời gian nào?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:57",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 471,
                "label": "A",
                "content": "Năm 1954,",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 472,
                "label": "B",
                "content": "Năm 1960",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 473,
                "label": "C",
                "content": "Năm 1965.",
                "isCorrect": true,
                "sortOrder": 3
            },
            {
                "id": 474,
                "label": "D",
                "content": "Năm 1969",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 120,
        "stem": "Hồ Chí Minh, lần đầu tiên đặt chân lên đất Pháp tại bến cảng nào?",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:57",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 475,
                "label": "A",
                "content": "Marseille",
                "isCorrect": true,
                "sortOrder": 1
            },
            {
                "id": 476,
                "label": "B",
                "content": "Le Havre",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 477,
                "label": "C",
                "content": "Dunkerque",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 478,
                "label": "D",
                "content": "Bordeaux",
                "isCorrect": false,
                "sortOrder": 4
            }
        ]
    },
    {
        "id": 121,
        "stem": "Chọn cụm từ dúng diễn vào chỗ trống “......” theo tư tưởng Hồ Chí\nMinh: “Toàn quốc đồng bảo hãy đứng dậy “...” mà tự giải phóng cho ta”.",
        "explanation": "",
        "questionType": "mcq_single",
        "status": "approved",
        "createdAt": "2025-08-19T17:07:57",
        "updatedAt": "2025-08-20T18:01:21",
        "options": [
            {
                "id": 479,
                "label": "A",
                "content": "Dựa vào sự giúp đỡ quốc tế.",
                "isCorrect": false,
                "sortOrder": 1
            },
            {
                "id": 480,
                "label": "B",
                "content": "Dựa vào sự đoàn kết toàn dân.",
                "isCorrect": false,
                "sortOrder": 2
            },
            {
                "id": 481,
                "label": "C",
                "content": "Dưới sự lãnh đạo của Đảng.",
                "isCorrect": false,
                "sortOrder": 3
            },
            {
                "id": 482,
                "label": "D",
                "content": "Đem sức ta.",
                "isCorrect": true,
                "sortOrder": 4
            }
        ]
    }
];
// ====== Page ======
function QuestionsPage(_a) {
    var _b = _a.questions, questions = _b === void 0 ? demoQuestions : _b;
    var _c = (0, react_1.useState)({}), picked = _c[0], setPicked = _c[1]; // qId -> optionId
    var _d = (0, react_1.useState)(false), submitted = _d[0], setSubmitted = _d[1];
    var _e = (0, react_1.useState)({}), answers = _e[0], setAnswers = _e[1];
    var _f = (0, react_1.useState)(false), navOpen = _f[0], setNavOpen = _f[1]; // ✅ trạng thái mở/đóng popup
    var PAGE_SIZE = 10;
    var pageSizeFAB = 50;
    var _g = (0, react_1.useState)(1), page = _g[0], setPage = _g[1];
    var total = questions.length;
    var pageCount = Math.ceil(total / PAGE_SIZE);
    var start = (page - 1) * PAGE_SIZE;
    var end = start + PAGE_SIZE;
    var isZone = function (index) { return (index >= start && index < end); };
    var pageQuestions = questions.slice(start, end);
    // {FAB}
    var startIndexFAB = Math.floor(start / pageSizeFAB) * pageSizeFAB;
    var endIndexFAB = startIndexFAB + pageSizeFAB;
    var currentQuestions = questions.slice(startIndexFAB, endIndexFAB);
    var answeredSet = new Set(Object.entries(picked)
        .filter(function (_a) {
        var optId = _a[1];
        return optId != null;
    })
        .map(function (_a) {
        var qId = _a[0];
        return Number(qId);
    }));
    // ✅ chuyển tới câu bất kỳ: đổi trang + scroll mượt
    var goToQuestion = function (qGlobalIndex, qId) {
        var _a;
        var targetPage = Math.floor(qGlobalIndex / PAGE_SIZE) + 1;
        if (targetPage !== page) {
            setPage(targetPage);
            // chờ DOM render xong rồi scroll
            setTimeout(function () {
                var _a;
                (_a = document.getElementById("q-".concat(qId))) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 0);
        }
        else {
            (_a = document.getElementById("q-".concat(qId))) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };
    var score = (0, react_1.useMemo)(function () {
        if (!submitted)
            return 0;
        var s = 0;
        for (var _i = 0, questions_1 = questions; _i < questions_1.length; _i++) {
            var q = questions_1[_i];
            var pickedOptionId = picked[q.id];
            var correct = q.options.find(function (o) { return o.isCorrect; });
            if (pickedOptionId && correct && pickedOptionId === correct.id)
                s += 1;
        }
        return s;
    }, [submitted, picked, questions]);
    var reset = function () {
        setPicked({});
        setSubmitted(false);
    };
    // Hàm xử lý khi chọn đáp án
    var handleSelectOption = function (questionId, optionId) {
        setAnswers(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[questionId] = optionId, _a)));
        });
    };
    // Tính số câu đã làm (có đáp án được chọn)
    var numAnswered = (0, react_1.useMemo)(function () { return Object.values(picked).filter(function (v) { return v !== null && v !== undefined; }).length; }, [picked]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "min-h-screen bg-slate-50 dark:bg-slate-900", children: [(0, jsx_runtime_1.jsxs)("section", { className: "relative  overflow-hidden", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute  inset-0 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" }), (0, jsx_runtime_1.jsxs)("div", { className: "relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-14 text-white md:flex-row md:justify-between", children: [(0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { type: "spring", stiffness: 160, damping: 18 }, children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/20 backdrop-blur", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Sparkles, { className: "h-4 w-4" }), " QuizUniverse \u2022 L\u00E0m tr\u1EAFc nghi\u1EC7m"] }), (0, jsx_runtime_1.jsxs)("h1", { className: "text-[2rem] md:text-[2.6rem] font-black leading-tight", children: ["B\u1ED9 c\u00E2u h\u1ECFi \u00F4n t\u1EADp ", (0, jsx_runtime_1.jsx)("span", { className: "bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 bg-clip-text text-transparent", children: "ML021" })] }), (0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-white/90", children: "Ch\u1ECDn \u0111\u00E1p \u00E1n cho t\u1EEBng c\u00E2u. N\u1ED9p b\u00E0i \u0111\u1EC3 xem \u0111i\u1EC3m v\u00E0 l\u1EDDi gi\u1EA3i." })] }), (0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.05 }, className: "flex items-center gap-3 flex-wrap", children: [(0, jsx_runtime_1.jsxs)("div", { className: "rounded-xl bg-white/10 px-4 py-2 text-sm ring-1 ring-white/20", children: ["T\u1ED5ng c\u00E2u: ", (0, jsx_runtime_1.jsx)("b", { children: total })] }), (0, jsx_runtime_1.jsxs)("div", { className: "rounded-xl bg-white/10 px-4 py-2 text-sm ring-1 ring-white/20", children: ["Tr\u1EA1ng th\u00E1i: ", (0, jsx_runtime_1.jsx)("b", { children: submitted ? "Đã nộp" : "Chưa nộp" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "rounded-xl bg-white/10 px-4 py-2 text-sm ring-1 ring-white/20", children: ["\u0110\u00E3 l\u00E0m: ", (0, jsx_runtime_1.jsx)("b", { children: numAnswered }), "/", total] })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute right-5 top-10 w-fit h-full", children: (0, jsx_runtime_1.jsxs)("div", { className: "sticky top-20 w-fit", children: [!navOpen && ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: function () { return setNavOpen(true); }, className: " z-40 grid h-12 w-12 place-items-center rounded-full bg-emerald-600 text-white shadow-lg hover:brightness-110", "aria-label": "M\u1EDF danh s\u00E1ch c\u00E2u h\u1ECFi", title: "Danh s\u00E1ch c\u00E2u h\u1ECFi", children: (0, jsx_runtime_1.jsx)(lucide_react_1.LayoutGrid, { className: "h-5 w-5" }) })), navOpen && ((0, jsx_runtime_1.jsx)("div", { className: " inset-0 z-50 h-3/4 my-auto", children: (0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { initial: { x: 360 }, animate: { x: 0 }, exit: { x: 360 }, transition: { type: "tween", duration: 0.2 }, className: " right-0 top-0 h-full w-[320px] bg-white shadow-xl dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 p-4 flex flex-col", children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-3 flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("h4", { className: "text-sm font-semibold text-slate-700 dark:text-slate-200", children: "Danh s\u00E1ch c\u00E2u h\u1ECFi" }), (0, jsx_runtime_1.jsx)("button", { className: "rounded-lg border border-slate-200 px-3 py-1 text-xs text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800", onClick: function () { return setNavOpen(false); }, children: "\u0110\u00F3ng" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mb-3 flex flex-wrap gap-2 text-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700", children: "Ch\u01B0a l\u00E0m" }), (0, jsx_runtime_1.jsx)("span", { className: "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-white bg-emerald-600", children: "\u0110\u00E3 ch\u1ECDn" }), submitted && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { className: "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-white bg-emerald-500", children: "\u0110\u00FAng" }), (0, jsx_runtime_1.jsx)("span", { className: "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-white bg-rose-500", children: "Sai" })] }))] }), (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-5 gap-2 overflow-auto", children: currentQuestions.map(function (q, idx) {
                                                    var _a;
                                                    var globalIndex = startIndexFAB + idx; // tính index toàn cục
                                                    var qNumber = globalIndex + 1; // số thứ tự câu
                                                    var pickedId = picked[q.id];
                                                    var hasPicked = pickedId != null;
                                                    var color = "";
                                                    if (submitted && hasPicked) {
                                                        var isCorrect = ((_a = q.options.find(function (o) { return o.isCorrect; })) === null || _a === void 0 ? void 0 : _a.id) === pickedId;
                                                        color = isCorrect ? "bg-emerald-500 text-white" : "bg-rose-500 text-white";
                                                    }
                                                    else if (hasPicked) {
                                                        color = "bg-emerald-700 text-white ";
                                                    }
                                                    else {
                                                        color = "border border-slate-300 text-slate-700 dark:text-slate-300 dark:border-slate-700";
                                                    }
                                                    var finalColor = color;
                                                    if (finalColor === "border border-slate-300 text-slate-700 dark:text-slate-300 dark:border-slate-700" && isZone(globalIndex)) {
                                                        finalColor = "bg-neutral-200 dark:bg-neutral-500";
                                                    }
                                                    return ((0, jsx_runtime_1.jsx)("button", { onClick: function () { return goToQuestion(globalIndex, q.id); }, className: "h-8 rounded-md text-sm font-semibold  ".concat(finalColor, "  "), title: "T\u1EDBi c\u00E2u ".concat(qNumber), children: qNumber }, q.id));
                                                }) }), (0, jsx_runtime_1.jsx)("div", { className: "mt-auto pt-3", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-2", children: [(0, jsx_runtime_1.jsx)("button", { onClick: function () { return setPage(function (p) { return Math.max(1, p - 1); }); }, disabled: page === 1, className: "rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800", children: "\u2190 Tr\u01B0\u1EDBc" }), (0, jsx_runtime_1.jsxs)("div", { className: "text-sm text-slate-600 dark:text-slate-300", children: ["Trang ", (0, jsx_runtime_1.jsx)("b", { children: page }), "/", (0, jsx_runtime_1.jsx)("b", { children: pageCount })] }), (0, jsx_runtime_1.jsx)("button", { onClick: function () { return setPage(function (p) { return Math.min(pageCount, p + 1); }); }, disabled: page === pageCount, className: "ml-auto rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800", children: "Sau \u2192" })] }) })] }) }))] }) }), (0, jsx_runtime_1.jsxs)("main", { className: " mx-auto max-w-5xl px-6 py-10", children: [(0, jsx_runtime_1.jsx)("div", { className: "mb-6 flex flex-wrap items-center gap-3", children: !submitted ? ((0, jsx_runtime_1.jsxs)("button", { onClick: function () { return setSubmitted(true); }, className: "inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-white shadow hover:brightness-110", children: ["N\u1ED9p b\u00E0i ", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, { className: "h-4 w-4" })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "mr-2 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:ring-emerald-800", children: ["\u0110i\u1EC3m: ", (0, jsx_runtime_1.jsx)("b", { children: score }), "/", (0, jsx_runtime_1.jsx)("b", { children: total })] }), (0, jsx_runtime_1.jsxs)("button", { onClick: reset, className: "inline-flex items-center gap-2 rounded-full bg-slate-800 px-5 py-2.5 text-white shadow hover:brightness-110 dark:bg-slate-700", children: ["L\u00E0m l\u1EA1i ", (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCcw, { className: "h-4 w-4" })] })] })) }), (0, jsx_runtime_1.jsx)("div", { className: "space-y-6", children: pageQuestions.map(function (q, idx) {
                                    var _a;
                                    return ((0, jsx_runtime_1.jsx)(QuestionCard, { index: start + idx + 1, q: q, pickedOptionId: (_a = picked[q.id]) !== null && _a !== void 0 ? _a : null, onPick: function (optionId) {
                                            setPicked(function (m) {
                                                var _a;
                                                return (__assign(__assign({}, m), (_a = {}, _a[q.id] = optionId, _a)));
                                            });
                                            setAnswers(function (m) {
                                                var _a;
                                                return (__assign(__assign({}, m), (_a = {}, _a[q.id] = optionId, _a)));
                                            }); // giữ đồng bộ với numAnswered
                                        }, onClear: function () {
                                            setPicked(function (m) {
                                                var _a;
                                                return (__assign(__assign({}, m), (_a = {}, _a[q.id] = null, _a)));
                                            });
                                            setAnswers(function (m) {
                                                var _a;
                                                return (__assign(__assign({}, m), (_a = {}, _a[q.id] = null, _a)));
                                            }); // cập nhật số câu đã làm
                                        }, showResult: submitted }, q.id));
                                }) }), (0, jsx_runtime_1.jsxs)("div", { className: "my-5 flex flex-wrap items-center gap-2", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", onClick: function () { return setPage(function (p) { return Math.max(1, p - 1); }); }, disabled: page === 1, className: "rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800", title: "Trang tr\u01B0\u1EDBc", children: "\u2190 Tr\u01B0\u1EDBc" }), Array.from({ length: pageCount }, function (_, i) { return i + 1; })
                                        .filter(function (p) { return Math.abs(p - page) <= 2 || p === 1 || p === pageCount; }) // hiển thị trang đầu/cuối và lân cận
                                        .reduce(function (acc, p, idx, arr) {
                                        if (idx > 0) {
                                            var prev = arr[idx - 1];
                                            if (typeof prev === "number" && typeof p === "number" && p - prev > 1)
                                                acc.push("…");
                                        }
                                        acc.push(p);
                                        return acc;
                                    }, [])
                                        .map(function (p, i) {
                                        return typeof p === "string" ? ((0, jsx_runtime_1.jsx)("span", { className: "px-2 text-slate-400", children: "\u2026" }, "ellipsis-".concat(i))) : ((0, jsx_runtime_1.jsx)("button", { onClick: function () { return setPage(p); }, className: "rounded-lg px-3 py-1.5 text-sm font-medium border\n              ".concat(p === page
                                                ? "bg-emerald-600 text-white border-emerald-600"
                                                : "border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"), title: "Trang ".concat(p), children: p }, p));
                                    }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: function () { return setPage(function (p) { return Math.min(pageCount, p + 1); }); }, disabled: page === pageCount, className: "rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800", title: "Trang sau", children: "Sau \u2192" }), (0, jsx_runtime_1.jsxs)("div", { className: "ml-auto text-sm text-slate-600 dark:text-slate-300", children: ["Trang ", (0, jsx_runtime_1.jsx)("b", { children: page }), "/", (0, jsx_runtime_1.jsx)("b", { children: pageCount }), " \u2022 C\u00E2u ", (0, jsx_runtime_1.jsx)("b", { children: start + 1 }), "\u2013", (0, jsx_runtime_1.jsx)("b", { children: Math.min(end, total) }), " / ", total] })] })] })] })] }));
}
// ====== Components ======
function QuestionCard(_a) {
    var index = _a.index, q = _a.q, pickedOptionId = _a.pickedOptionId, onPick = _a.onPick, onClear = _a.onClear, showResult = _a.showResult;
    var correct = q.options.find(function (o) { return o.isCorrect; });
    var isCorrect = showResult && pickedOptionId && correct && pickedOptionId === correct.id;
    var isWrong = showResult && pickedOptionId && correct && pickedOptionId !== correct.id;
    return ((0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { id: "q-".concat(q.id), initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { type: "spring", stiffness: 140, damping: 16 }, className: "rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm hover:shadow-md dark:border-slate-800 dark:bg-slate-900", children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-3 flex items-start justify-between gap-3", children: [(0, jsx_runtime_1.jsxs)("h3", { className: "text-base font-semibold text-slate-800 dark:text-slate-200", children: [(0, jsx_runtime_1.jsx)("span", { className: "mr-2 inline-flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/90 text-xs font-bold text-white", children: index }), (0, jsx_runtime_1.jsx)("span", { className: "whitespace-pre-line", children: q.stem })] }), showResult ? (isCorrect ? ((0, jsx_runtime_1.jsxs)("span", { className: "inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-emerald-700 ring-1 ring-emerald-300 dark:bg-emerald-900/30 dark:text-emerald-300 dark:ring-emerald-800", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle2, { className: "h-4 w-4" }), " \u0110\u00FAng"] })) : isWrong ? ((0, jsx_runtime_1.jsxs)("span", { className: "inline-flex items-center gap-1 rounded-full bg-rose-100 px-2 py-1 text-rose-700 ring-1 ring-rose-300 dark:bg-rose-900/30 dark:text-rose-300 dark:ring-rose-800", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.XCircle, { className: "h-4 w-4" }), " Sai"] })) : null) : (pickedOptionId !== null && ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onClear, className: "rounded-lg border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800", title: "X\u00F3a l\u1EF1a ch\u1ECDn c\u1EE7a c\u00E2u n\u00E0y", children: "X\u00F3a l\u1EF1a ch\u1ECDn" })))] }), (0, jsx_runtime_1.jsx)("div", { className: "mt-3 grid gap-2", children: q.options
                    .slice()
                    .sort(function (a, b) { return a.sortOrder - b.sortOrder; })
                    .map(function (opt) { return ((0, jsx_runtime_1.jsx)(OptionItem, { name: "q-".concat(q.id), opt: opt, checked: pickedOptionId === opt.id, disabled: showResult, onChange: function () { return onPick(opt.id); }, reveal: showResult, isCorrect: opt.isCorrect, isPicked: pickedOptionId === opt.id }, opt.id)); }) }), showResult && q.explanation && ((0, jsx_runtime_1.jsxs)("div", { className: "mt-4 rounded-xl bg-amber-50 p-3 text-amber-900 ring-1 ring-amber-200 dark:bg-amber-900/20 dark:text-amber-200 dark:ring-amber-800", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-sm font-semibold", children: "Gi\u1EA3i th\u00EDch" }), (0, jsx_runtime_1.jsx)("p", { className: "mt-1 text-sm leading-relaxed", children: q.explanation })] }))] }));
}
function OptionItem(_a) {
    var opt = _a.opt, checked = _a.checked, disabled = _a.disabled, onChange = _a.onChange, reveal = _a.reveal, isCorrect = _a.isCorrect, isPicked = _a.isPicked, groupName = _a.groupName;
    var state = reveal
        ? isCorrect
            ? "correct"
            : isPicked
                ? "wrong"
                : "neutral"
        : checked
            ? "active"
            : "idle";
    var classByState = {
        idle: "border-slate-200 hover:border-emerald-300 dark:border-slate-700 dark:hover:border-emerald-700",
        active: "border-emerald-400 bg-emerald-50 ring-1 ring-emerald-300 dark:bg-emerald-900/20 dark:border-emerald-700 dark:ring-emerald-800",
        correct: "border-emerald-400 bg-emerald-50 ring-1 ring-emerald-300 dark:bg-emerald-900/20 dark:border-emerald-700 dark:ring-emerald-800",
        wrong: "border-rose-300 bg-rose-50 ring-1 ring-rose-300 dark:bg-rose-900/20 dark:border-rose-700 dark:ring-rose-800",
        neutral: "border-slate-200 opacity-70 dark:border-slate-700",
    };
    return ((0, jsx_runtime_1.jsxs)("label", { className: "group flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition ".concat(classByState[state]), children: [(0, jsx_runtime_1.jsx)("input", { type: "radio", name: groupName, className: "mt-1 h-4 w-4 accent-emerald-600", checked: checked, onChange: onChange, disabled: disabled }), (0, jsx_runtime_1.jsx)("div", { className: "flex-1", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200", children: [(0, jsx_runtime_1.jsx)("span", { className: "inline-flex h-6 w-6 items-center justify-center rounded-md bg-slate-100 text-slate-700 group-hover:bg-emerald-100 group-hover:text-emerald-800 dark:bg-slate-800 dark:text-slate-300 dark:group-hover:bg-emerald-900/30 dark:group-hover:text-emerald-300", children: opt.label }), (0, jsx_runtime_1.jsx)("span", { children: opt.content })] }) })] }));
}
