"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subjectSchema = void 0;
// Optional: Validation schema với Zod
var zod_1 = require("zod");
exports.subjectSchema = zod_1.z.object({
    code: zod_1.z.string()
        .min(1, 'Mã môn học không được để trống')
        .max(20, 'Mã môn học không quá 20 ký tự')
        .regex(/^[A-Z0-9]+$/, 'Mã môn học chỉ chứa chữ hoa và số'),
    name: zod_1.z.string()
        .min(1, 'Tên môn học không được để trống')
        .max(100, 'Tên môn học không quá 100 ký tự'),
    description: zod_1.z.string()
        .max(500, 'Mô tả không quá 500 ký tự')
        .optional()
        .or(zod_1.z.literal('')),
});
